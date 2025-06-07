from celery import Celery
import os


REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6380/0")

celery_app = Celery(
    "trend_analysis",
    broker=REDIS_URL,
    backend=REDIS_URL
)

celery_app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
)


@celery_app.task(bind=True)
def fetch_trends_task(
    self,
    platform: str,
    query: str,
    max_results: int = 12,
    stealth: bool = True,
    headless: bool = True
):
    """
    Background task for scraping trends.
    Imports scrapers at runtime to avoid circular deps.
    """
    from scrapers import scrape_tiktok, scrape_reddit, scrape_pinterest
    if platform == "tiktok":
        return scrape_tiktok(
            query, max_results, stealth=stealth, headless=True
        )
    elif platform == "reddit":
        return scrape_reddit(query, max_results)
    elif platform == "pinterest":
        return scrape_pinterest(
            query,
            max_results,
            stealth=stealth,
            headless=True
        )  # noqa: E501
    else:
        raise ValueError(f"Unknown platform: {platform}")
