# Docker & DevOps Guide

This document explains how to use Docker and Docker Compose to run and manage the Trend Whisper platform.

---

## Prerequisites
- Docker Desktop or Docker Engine
- Docker Compose (v2 recommended)

---

## Build and Start All Services

From the project root:
```bash
docker-compose up --build
```

- This will build and start all services: frontend, api-gateway, trend-analysis, celery-worker, audio-processing, user-management, db, and redis.

---

## Stopping and Cleaning Up

To stop all services:
```bash
docker-compose down
```

To remove volumes (all data):
```bash
docker-compose down -v
```

---

## Common Commands
- View logs: `docker-compose logs -f <service>`
- Rebuild a single service: `docker-compose build <service>`
- Restart a single service: `docker-compose restart <service>`
- Open a shell in a container: `docker-compose exec <service> sh`

---

## Service Ports
- Frontend: http://localhost:3000
- API Gateway: http://localhost:8000
- Trend Analysis: http://localhost:8001
- Audio Processing: http://localhost:8002
- User Management: http://localhost:8003
- PostgreSQL: localhost:5432
- Redis: localhost:6379

---

## Environment Variables
- All core secrets and URLs are set in `docker-compose.yml`
- Update for production as needed

---

## Troubleshooting
- If a build fails, check your Docker version and context.
- If a service fails to start, check the logs with `docker-compose logs <service>`.
- Ensure ports are not in use by other applications.
