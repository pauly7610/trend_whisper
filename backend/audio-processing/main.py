from fastapi import (
    FastAPI, UploadFile, File, HTTPException, BackgroundTasks, Form
)
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.requests import Request
from pydantic import BaseModel
import whisper
import tempfile
import os
import logging
import json
import uuid
import redis as redis_lib
from typing import Optional

ALLOWED_AUDIO_TYPES = {
    "audio/wav", "audio/x-wav", "audio/mpeg", "audio/mp3",
    "audio/x-m4a", "audio/mp4", "audio/flac", "audio/x-flac"
}
MAX_FILE_SIZE_MB = 25

app = FastAPI()
model = whisper.load_model("base")

# Structured logging setup
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s %(message)s'
)


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
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TranscriptionResult(BaseModel):
    transcription: str
    confidence: float
    error: str = None
    job_id: str = None  # For async support
    user_context: dict = None


@app.post("/transcribe", response_model=TranscriptionResult)
async def transcribe_audio(
    file: UploadFile = File(...),
    user_context: Optional[str] = Form(None)
):
    # Validate content type
    if file.content_type not in ALLOWED_AUDIO_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported audio type: {file.content_type}"
        )
    # Validate file size (read in chunks)
    size = 0
    CHUNK_SIZE = 1024 * 1024
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        while True:
            chunk = await file.read(CHUNK_SIZE)
            if not chunk:
                break
            size += len(chunk)
            if size > MAX_FILE_SIZE_MB * 1024 * 1024:
                tmp.close()
                os.remove(tmp.name)
                return JSONResponse(
                    status_code=413,
                    content={
                        "transcription": "",
                        "confidence": 0.0,
                        "error": "File too large (>25MB)",
                        "job_id": None,
                        "user_context": None
                    }
                )
            tmp.write(chunk)
        tmp_path = tmp.name
    ctx = None
    if user_context:
        try:
            ctx = json.loads(user_context)
        except Exception:
            ctx = None
    try:
        result = model.transcribe(tmp_path)
        os.remove(tmp_path)
        return TranscriptionResult(
            transcription=result["text"],
            confidence=(
                result["segments"][0]["avg_logprob"]
                if result["segments"] else 0.0
            ),
            error=None,
            job_id=None,
            user_context=ctx
        )
    except Exception as exc:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
        return JSONResponse(
            status_code=500,
            content={
                "transcription": "",
                "confidence": 0.0,
                "error": str(exc),
                "job_id": None,
                "user_context": ctx
            }
        )


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/transcribe/async")
async def transcribe_audio_async(
    file: UploadFile = File(...),
    background_tasks: BackgroundTasks = None,
    user_context: Optional[str] = Form(None)
):
    # Validate content type
    if file.content_type not in ALLOWED_AUDIO_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported audio type: {file.content_type}"
        )
    size = 0
    CHUNK_SIZE = 1024 * 1024
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        while True:
            chunk = await file.read(CHUNK_SIZE)
            if not chunk:
                break
            size += len(chunk)
            if size > MAX_FILE_SIZE_MB * 1024 * 1024:
                tmp.close()
                os.remove(tmp.name)
                return JSONResponse(
                    status_code=413,
                    content={
                        "job_id": None,
                        "status": "failed",
                        "error": "File too large (>25MB)"
                    }
                )
            tmp.write(chunk)
    if user_context:
        try:
            json.loads(user_context)
        except Exception:
            pass
    job_id = str(uuid.uuid4())
    redis_conn = redis_lib.Redis(
        host='localhost',
        port=6380,
        db=0
    )
    redis_conn.hset(job_id, mapping={"status": "processing"})
    if background_tasks is not None:
        # background_tasks.add_task(process_transcription_job,
        # job_id, tmp.name, ctx)
        pass
    else:
        # asyncio.create_task(process_transcription_job
        # (job_id, tmp.name, ctx))
        pass
    return {
        "job_id": job_id,
        "status": "queued"
    }


@app.get("/transcribe/status/{job_id}")
async def transcribe_status(job_id: str):
    redis_conn = redis_lib.Redis(
        host='localhost',
        port=6380,
        db=0
    )
    data = redis_conn.hgetall(job_id)
    if not data:
        return JSONResponse(
            status_code=404,
            content={"error": "Job not found"}
        )
    # Convert bytes to str for keys/values
    data = {
        k.decode(): v.decode()
        for k, v in data.items()
    }
    return {
        "job_id": job_id,
        **data
    }
