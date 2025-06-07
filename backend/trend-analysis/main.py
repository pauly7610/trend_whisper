# flake8: noqa
from fastapi import FastAPI, Body, Request
from pydantic import BaseModel
from typing import List, Optional
import re
import logging
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from collections import Counter, defaultdict
import asyncio
from db import get_db_pool, create_trends_table
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from scrapers import scrape_tiktok_hashtag, scrape_reddit_subreddit
import requests
from celery.result import AsyncResult
from celery_worker import celery_app


app = FastAPI()

# Structured logging setup
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s %(message)s'
)


# --- PostgreSQL DB Setup ---
@app.on_event("startup")
async def startup_event():
    app.state.db_pool = await get_db_pool()
    await create_trends_table(app.state.db_pool)
    logging.info("PostgreSQL trends table initialized.")


@app.middleware("http")
async def log_requests(request: Request, call_next):
    user = request.headers.get('Authorization', 'anonymous')
    logging.info(f"{request.method} {request.url.path} user={user}")
    try:
        response = await call_next(request)
        logging.info(
            f"{request.method} {request.url.path} "
            f"status={response.status_code}"
        )
        return response
    except Exception as exc:
        logging.error(
            f"{request.method} {request.url.path} "
            f"ERROR: {exc}"
        )
        return JSONResponse(status_code=500, content={"error": str(exc)})


# CORS (optional, for frontend integration)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:4173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:4173",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- In-memory analytics store (replace with persistent storage in prod) ---
trend_counter = Counter()
user_trend_counter = defaultdict(Counter)


# --- Scraping Logic (real) ---
async def batch_scrape_and_store(pool):
    trends = []
    # TikTok (async)
    trends += await scrape_tiktok_hashtag("90sfit")
    # Reddit (sync)
    trends += scrape_reddit_subreddit("streetwear")
    async with pool.acquire() as conn:
        for trend in trends:
            await conn.execute(
                '''
                INSERT INTO trends (
                    platform, trend, description, thumbnail_url,
                    engagement, timestamp, extra
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                ''',
                trend["platform"],
                trend["trend"],
                trend["description"],
                trend["thumbnail_url"],
                trend["engagement"],
                trend["timestamp"],
                trend["extra"]
            )
    return len(trends)


@app.post("/fetch-trends")
async def fetch_trends(
    request: Request,
    body: dict = Body(...),
):
    """
    Dynamically scrape trends for a user-specified platform and query,
    store and return results.
    If background=true is set,
    enqueue as a Celery task and return task_id.
    """
    platform = body.get("platform")
    query = body.get("query")
    max_results = int(body.get("max_results", 10))
    use_stealth = bool(body.get("use_stealth", True))
    headless = True  # Always run headless in Docker
    background = bool(body.get("background", False))

    if background:
        # Enqueue background Celery task
        task = celery_app.send_task(
            "celery_worker.fetch_trends_task",
            args=[platform, query, max_results, use_stealth, headless],
        )
        return {"task_id": task.id, "status": "pending"}
    else:
        # Synchronous scrape (legacy)
        results = []
        if not platform or not query:
            return {"error": "platform and query are required"}
        pool = request.app.state.db_pool
        # Route to correct scraper
        try:
            if platform.lower() == "tiktok":
                from scrapers import scrape_tiktok_hashtag
                results = await scrape_tiktok_hashtag(
                    query,
                    max_results,
                    use_stealth=use_stealth,
                    headless=True
                )
            elif platform.lower() == "reddit":
                from scrapers import scrape_reddit_subreddit
                results = scrape_reddit_subreddit(query, max_results)
            elif platform.lower() == "pinterest":
                # from scrapers import scrape_pinterest_board  # unused, removed
                url = f"https://api.pinterest.com/v3/search/pins/?q={query}&limit={max_results}"  # noqa: E501
                resp = requests.get(url)
                results = resp.json()
            else:
                return {"error": f"Unknown platform: {platform}"}
            # Store results in DB for caching/future queries
            async with pool.acquire() as conn:
                for trend in results:
                    await conn.execute(
                        '''
                        INSERT INTO trends (
                            platform, trend, description, thumbnail_url,
                            engagement, timestamp, extra
                        )
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                        ''',
                        trend["platform"],
                        trend["trend"],
                        trend["description"],
                        trend["thumbnail_url"],
                        trend["engagement"],
                        trend["timestamp"],
                        trend["extra"]
                    )
            return {"status": "ok", "results": results}
        except Exception as e:
            return {"error": str(e)}


@app.get("/fetch-trends-result/{task_id}")
async def fetch_trends_result(task_id: str):
    """
    Poll for Celery background task result for trend scraping.
    """
    res = AsyncResult(task_id, app=celery_app)
    if res.state == "PENDING":
        return {"status": "pending", "result": None}
    elif res.state == "STARTED":
        return {"status": "started", "result": None}
    elif res.state == "SUCCESS":
        return {"status": "success", "result": res.result}
    elif res.state == "FAILURE":
        return {"status": "failure", "error": str(res.info)}
    else:
        return {"status": res.state, "result": None}


@app.get("/trends")
async def get_trends(request: Request, limit: int = 20):
    pool = request.app.state.db_pool
    async with pool.acquire() as conn:
        rows = await conn.fetch(
            '''
            SELECT platform, trend, description, thumbnail_url,
            engagement, timestamp, extra
            FROM trends ORDER BY timestamp DESC LIMIT $1
        ''', limit)
        return [dict(row) for row in rows]


# --- Scheduler: scrape every 3 days ---
scheduler = AsyncIOScheduler()


@scheduler.scheduled_job('interval', days=3)
def scheduled_batch_scrape():
    loop = asyncio.get_event_loop()
    pool = app.state.db_pool
    loop.create_task(batch_scrape_and_store(pool))


@app.on_event("startup")
async def start_scheduler():
    scheduler.start()


# --- Models ---


class UserContext(BaseModel):
    user_id: Optional[str] = None
    session_id: Optional[str] = None


class TrendRequest(BaseModel):
    transcription: str
    confidence: float
    user_context: Optional[UserContext] = None


class TrendResult(BaseModel):
    trends: List[str]
    summary: str
    confidence: float
    error: Optional[str] = None
    user_context: Optional[dict] = None


# --- Text Preprocessing ---


def normalize_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


# --- Placeholder NLP/ML Functions ---


def extract_trends(text: str) -> List[str]:
    # TODO: Replace with real NER/topic modeling
    keywords = ["ai", "ml", "data", "trend", "analysis"]
    found = [kw for kw in keywords if kw in text]
    return found or ["general"]


def summarize_text(text: str) -> str:
    # TODO: Replace with real summarization
    return text[:100] + ("..." if len(text) > 100 else "")


def estimate_confidence(text: str, req_conf: float) -> float:
    # TODO: Replace with real confidence estimation
    return min(1.0, max(0.5, req_conf))


@app.post("/analyze", response_model=TrendResult)
def analyze_trends(req: TrendRequest):
    try:
        norm_text = normalize_text(req.transcription)
        trends = extract_trends(norm_text)
        summary = summarize_text(norm_text)
        conf = estimate_confidence(norm_text, req.confidence)
        # Log user context if present
        user_ctx = None
        if req.user_context:
            if hasattr(req.user_context, 'model_dump'):
                user_ctx = req.user_context.model_dump()
            else:
                user_ctx = dict(req.user_context)
            print(f"User context: {user_ctx}")
        # Update analytics store
        for t in trends:
            trend_counter[t] += 1
            if req.user_context and req.user_context.user_id:
                user_trend_counter[req.user_context.user_id][t] += 1
        return TrendResult(
            trends=trends,
            summary=summary,
            confidence=conf,
            error=None,
            user_context=user_ctx
        )
    except Exception as e:
        return TrendResult(
            trends=[],
            summary="",
            confidence=0.0,
            error=str(e),
            user_context=None
        )


@app.get("/analytics/top-trends")
def top_trends(limit: int = 10):
    # Return the most common trends system-wide
    return {"top_trends": trend_counter.most_common(limit)}


@app.get("/analytics/user-stats/{user_id}")
def user_stats(user_id: str, limit: int = 10):
    # Return the most common trends for a given user
    user_stats = user_trend_counter.get(user_id, [])
    if not user_stats:
        return {"user_id": user_id, "top_trends": []}
    return {
        "user_id": user_id,
        "top_trends": Counter(user_stats).most_common(limit)
    }


@app.get("/health")
def health():
    return {"status": "ok"}
