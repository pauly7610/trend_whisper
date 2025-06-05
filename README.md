
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

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for responsive design
- **UI Components**: shadcn/ui component library
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **State Management**: TanStack Query for server state
- **Routing**: React Router DOM

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
