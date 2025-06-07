# System Architecture

This document describes the high-level architecture of the Trend Whisper platform, including all major components, their interactions, and key design decisions.

## Overview

The platform is a modular, microservice-oriented system for trend intelligence, analytics, and media processing in the fashion and beauty retail space.

### Main Components
- **Frontend**: React + Vite SPA, connects to API Gateway
- **API Gateway**: Node.js Express, authentication and proxying
- **Trend Analysis**: FastAPI, dynamic scraping, analytics, and DB
- **Celery Worker**: Python, background scraping jobs
- **Audio Processing**: FastAPI, audio transcription and ML
- **User Management**: Node.js, user authentication and profiles
- **Database**: PostgreSQL, persistent storage
- **Redis**: Broker for Celery and caching

## Data Flow
1. **User** interacts with the **Frontend** (React app)
2. Frontend sends requests to **API Gateway**
3. API Gateway authenticates and proxies requests to:
    - **Trend Analysis** for trend scraping/analytics
    - **Audio Processing** for transcription
    - **User Management** for auth/profile
4. **Trend Analysis** may trigger background jobs via **Celery Worker** (through Redis)
5. All persistent data is stored in **PostgreSQL**
6. **Redis** is used for job queueing and caching

## Diagram
```
[User] <-> [Frontend] <-> [API Gateway] <-> [Trend Analysis] <-> [DB]
                                         |                |
                                         |                +-> [Celery Worker] <-> [Redis]
                                         +-> [Audio Processing]
                                         +-> [User Management]
```

## Key Design Decisions
- **Microservices**: Each major domain is a separate service for scalability and maintainability.
- **API Gateway**: Central entrypoint for authentication and routing.
- **Background Jobs**: Celery handles long-running scraping tasks asynchronously.
- **Containerization**: All services are Dockerized and orchestrated with Docker Compose.
- **Postgres JSONB**: Flexible schema for trend and engagement data.
- **Security**: JWT authentication at the gateway, environment variables for secrets.
