
# Trend Intelligence Dashboard

A modern React-based trend intelligence platform for fashion and beauty retail analytics.

## Overview

This application provides comprehensive trend analysis and forecasting capabilities for fashion and beauty retailers. It features real-time trend monitoring, product assortment recommendations, and collaborative planning tools to help brands stay ahead of market movements.

## Key Features

### 📊 Trend Analytics
- Real-time trend detection across social media and fashion platforms
- Popularity scoring and momentum tracking
- Regional trend analysis (US, EU markets)
- Predictive forecasting with timeline projections

### 🛍️ Product Intelligence
- AI-powered product recommendations based on trending patterns
- Confidence scoring for assortment decisions
- Cross-category trend correlation analysis
- Inventory optimization suggestions

### 📈 Data Visualization
- Interactive trend charts and sparklines
- Comparative analysis tools
- Source breakdown analytics (TikTok, Instagram, Fashion Blogs)
- Export capabilities for reporting

### 🤝 Collaboration Tools
- Team feedback and annotation system
- Shared trend watchlists
- Export functionality for stakeholder reports
- Real-time collaboration features

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for responsive design
- **shadcn/ui** component library
- **Recharts** for data visualization
- **Lucide React** for icons
- **TanStack Query** for server state
- **React Router DOM** for routing

### Backend & Infra
- **FastAPI** (Python) for trend-analysis and audio-processing
- **Node.js/Express** for api-gateway and user-management
- **Celery** (Python) for background job queue (trend scraping)
- **PostgreSQL** for persistent data storage
- **Redis** for Celery broker and caching
- **Docker Compose** for multi-service orchestration

---

## Architecture Overview

```
[frontend] <--> [api-gateway] <--> [trend-analysis] <--> [db]
                              |                |
                              |                +--> [celery-worker] <--> [redis]
                              +--> [audio-processing]
                              +--> [user-management]
```

- **frontend**: React app (port 3000)
- **api-gateway**: Auth, proxy, and routing (port 8000)
- **trend-analysis**: Trend scraping and analytics API (port 8001)
- **celery-worker**: Background scraping jobs
- **audio-processing**: Audio transcription and ML (port 8002)
- **user-management**: User auth/profile service (port 8003)
- **db**: PostgreSQL (port 5432)
- **redis**: Redis (port 6379)

---

## Quickstart (Docker Compose)

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```
2. **Access endpoints:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - API Gateway: [http://localhost:8000](http://localhost:8000)
   - Trend Analysis API: [http://localhost:8001](http://localhost:8001)
   - Audio Processing API: [http://localhost:8002](http://localhost:8002)
   - User Management API: [http://localhost:8003](http://localhost:8003)
   - PostgreSQL: `localhost:5432` (user: `postgres`, pass: `postgres`, db: `trends`)
   - Redis: `localhost:6379`

3. **Environment variables:**
   - All services are pre-configured for local development via Compose.
   - Update secrets and URLs as needed in `docker-compose.yml` for production.

---

## Service Details

### trend-analysis
- FastAPI backend for scraping, trend analytics, and DB integration
- Exposes `/fetch-trends`, `/fetch-trends-result/{task_id}` for background scraping
- Uses Celery for long-running jobs (via Redis)

### celery-worker
- Python Celery worker for background scraping jobs
- Shares codebase and dependencies with trend-analysis

### api-gateway
- Node.js Express server
- Handles JWT authentication, proxies requests to backend services

### frontend
- React + Vite app
- Connects to api-gateway for all data/API calls

### audio-processing
- FastAPI backend for audio transcription and ML
- Exposes endpoints for audio file upload and processing

### user-management
- Node.js backend for user authentication and profile management

### db
- PostgreSQL 14-alpine
- Persistent storage for all backend services

### redis
- Redis for Celery broker/result backend and caching

---

## Development Workflow

- All code changes are reflected on rebuild (`docker-compose up --build`).
- For live reload, mount volumes or use dev commands as needed.
- Logs for each service are available via Docker Compose output.

---

## Extending the Stack

- Add new services by creating a Dockerfile and extending `docker-compose.yml`.
- Use environment variables for secrets and inter-service URLs.
- Add healthchecks, monitoring, or reverse proxies as needed.

---

## Troubleshooting

- If a service fails to start, check logs with `docker-compose logs <service>`.
- Ensure Docker Desktop or Docker Engine is running.
- For database migrations or admin, connect to the `db` service using any Postgres client.

---

## License

MIT (or your organization’s preferred license)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Main navigation
│   ├── TrendCard.tsx   # Trend display component
│   └── ...
├── pages/              # Route components
│   ├── Index.tsx       # Dashboard home
│   ├── TrendDetail.tsx # Individual trend analysis
│   ├── Analytics.tsx   # Analytics dashboard
│   └── ...
├── data/               # Mock data and types
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd trend-intelligence-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Trend Categories
- **Beauty**: Makeup trends, skincare routines, beauty tools
- **Apparel**: Clothing styles, seasonal fashion, silhouettes
- **Accessories**: Jewelry, bags, fashion accessories
- **Footwear**: Shoe trends, seasonal footwear, style movements

### Analytics Capabilities
- Social media sentiment analysis
- Growth trajectory forecasting
- Market saturation indicators
- Cross-demographic trend adoption rates

### Export Features
- JSON trend reports with forecasting data
- Comprehensive product recommendations
- Timeline analysis for business planning
- Confidence scoring for decision making

## Data Sources

The platform aggregates trend data from:
- Social media platforms (TikTok, Instagram)
- Fashion blogs and publications
- Retail performance data
- Consumer behavior analytics

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please open an issue in the repository or contact the development team.
