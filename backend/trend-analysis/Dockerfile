FROM python:3.10-slim

# System dependencies (add if needed, e.g., ffmpeg)
WORKDIR /app

# Only copy requirements first to leverage Docker cache
COPY requirements.txt .

# Pre-install heavy ML dependencies for cache efficiency
RUN pip install --no-cache-dir transformers scikit-learn

# Install the rest of your dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Now copy the rest of your app
COPY . .

# Install Playwright browsers
RUN playwright install --with-deps

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
