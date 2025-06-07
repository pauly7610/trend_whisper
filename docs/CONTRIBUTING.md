# Contributing Guide

Thank you for your interest in contributing to Trend Whisper! This guide outlines best practices for contributing code, documentation, or ideas.

---

## Getting Started
- Fork the repository and clone your fork.
- Use feature branches for new work.
- Ensure you have Docker and Docker Compose set up (see `DOCKER.md`).

---

## Development Workflow
1. Open a terminal in your project root.
2. Start the stack: `docker-compose up --build`
3. Make code changes in the appropriate service directory.
4. Use `docker-compose restart <service>` to reload a single service if needed.
5. Write clear commit messages and reference issues/PRs.

---

## Code Style
- **Python**: PEP8, use type hints where possible.
- **JavaScript/TypeScript**: Prettier, ESLint, and consistent formatting.
- **React**: Functional components, hooks, and modular structure.

---

## Pull Requests
- Make sure your branch is up to date with `main`.
- Run tests and ensure all services build and start.
- Describe your changes clearly in the PR description.

---

## Issues
- Use GitHub Issues for bugs, feature requests, and questions.
- Provide as much detail as possible, including logs and steps to reproduce.
