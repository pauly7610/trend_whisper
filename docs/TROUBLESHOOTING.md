# Troubleshooting Guide

This document provides solutions to common problems encountered while running or developing the Trend Whisper platform.

---

## Docker Issues
- **Build fails**: Ensure you have the latest Docker and Docker Compose. Check for typos in Dockerfiles.
- **Port already in use**: Stop other applications using the port or change the port mapping in `docker-compose.yml`.
- **Service won't start**: Run `docker-compose logs <service>` for error details.

---

## Database Issues
- **Cannot connect to Postgres**: Ensure the `db` service is running. Check credentials in `docker-compose.yml`.
- **Migrations**: Use a Postgres client to connect and manage schema.

---

## Redis/Celery Issues
- **Celery tasks not running**: Ensure Redis is up and the celery-worker service is healthy.
- **Result not available**: Poll `/fetch-trends-result/{task_id}` and check Celery logs for errors.

---

## Frontend/Backend Communication
- **CORS errors**: Ensure backend services allow requests from the frontend origin.
- **API Gateway errors**: Check environment variables for correct backend URLs.

---

## General Advice
- Always check logs for details.
- Rebuild containers after dependency changes.
- If stuck, try `docker-compose down -v` and restart.
