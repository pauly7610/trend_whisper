# API Reference

This document describes the core API endpoints for the Trend Whisper platform. All endpoints are accessed via the API Gateway unless otherwise noted.

---

## Authentication
- JWT-based authentication is required for protected endpoints.
- Pass the token as an `Authorization: Bearer <token>` header.

---

## Trend Analysis Service

### `POST /fetch-trends`
- **Description:** Dynamically scrape trends for a given platform and query.
- **Body:**
  ```json
  {
    "platform": "tiktok|reddit|pinterest",
    "query": "string",
    "max_results": 10,
    "background": true
  }
  ```
- **Response:**
  - If `background: true`: `{ "task_id": "...", "status": "pending" }`
  - If `background: false` or omitted: `{ "results": [...] }`

### `GET /fetch-trends-result/{task_id}`
- **Description:** Poll for background scraping result.
- **Response:**
  ```json
  { "status": "pending|started|success|failure", "result": ... }
  ```

### `GET /trends`
- **Description:** Retrieve cached/batch trends

---

## Audio Processing Service

### `POST /transcribe`
- **Description:** Upload and transcribe audio
- **Body:** multipart/form-data (audio file)
- **Response:** `{ "transcription": "..." }`

---

## User Management Service

### `POST /register`
- **Description:** Register a new user
- **Body:** `{ "email": "...", "password": "..." }`

### `POST /login`
- **Description:** Authenticate and receive JWT
- **Body:** `{ "email": "...", "password": "..." }`

---

## API Gateway
- Proxies all requests, enforces JWT authentication, and routes to backend services.
