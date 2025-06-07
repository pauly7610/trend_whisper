# Trend Whisper Backend Monorepo

This backend implements a hybrid Python/FastAPI and Node.js/Express microservices architecture for speech-to-trend analysis.

## Structure
- `api-gateway/` - Node.js/Express (REST, WebSocket, gRPC client)
- `audio-processing/` - Python/FastAPI (Whisper.cpp, gRPC server)
- `trend-analysis/` - Python/FastAPI (NLP/ML, gRPC server)
- `user-management/` - Node.js/Express (Auth, user data)
- `data-service/` - Shared DB connectors
- `common/` - Protobufs, config, shared utils
- `docker/` - Dockerfiles for each service
- `scripts/` - DevOps, CI/CD, orchestration

See each directory for more details.

---

## API Usage Examples

### Audio Processing (Transcription)
- **POST** `/transcribe` (multipart/form-data)
  - Request: audio file upload
  - Response: `{ "transcription": "...", "confidence": 0.98 }`

### Trend Analysis
- **POST** `/analyze` (application/json)
  - Request: `{ "transcription": "...", "confidence": 0.98 }`
  - Response: `{ "trends": ["AI", "ML"], "summary": "...", "confidence": 0.9 }`

### Health Checks
- **GET** `/health` (all services)

---

## Protobuf Contract (gRPC)
See `common/proto/trendwhisper.proto` for service and message definitions, including error handling and user context.

---

## Developer Instructions

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for JS services)
- Python 3.10+ (for Python services)

### Build & Run All Services
```sh
docker-compose build
docker-compose up
```

### Run a Service Locally (Example: Audio Processing)
```sh
cd backend/audio-processing
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Test Endpoints
- Use Postman or curl to test `/transcribe` and `/analyze` endpoints.
- Example curl:
```sh
curl -F "file=@sample.wav" http://localhost:8000/transcribe
```

### Extending the System
- Add new proto messages/services to `common/proto/trendwhisper.proto`.
- Implement new endpoints in the relevant service directory.
- Update Dockerfiles and requirements as needed.

---

## Contributing
- Fork, branch, and submit PRs for review.
- See each service's README for detailed contribution guidelines.
