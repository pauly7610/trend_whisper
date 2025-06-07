FROM python:3.10-slim

# System dependencies & ffmpeg in one step, clean up after
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Only copy requirements first to leverage Docker cache
COPY requirements.txt .

# Pre-install heavy ML dependencies for cache efficiency
RUN pip install --no-cache-dir torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cpu
RUN pip install --no-cache-dir openai-whisper

# Install the rest of your dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Now copy the rest of your app
COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]