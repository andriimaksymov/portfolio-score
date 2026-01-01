# Portfolio Analyzer

A professional full-stack application that analyzes developer portfolios through GitHub integration, providing structured feedback, scoring, and actionable recommendations.

## 🎯 Purpose

Portfolio Analyzer helps junior to mid-level developers understand their portfolio's strengths and weaknesses, offering data-driven insights to improve their career readiness and market competitiveness.

## ✨ Features

### Current (MVP)
- **GitHub Integration**: Fetch and analyze public GitHub profiles
- **Portfolio Analysis**: Evaluate projects, activity, tech stack diversity, and consistency
- **Scoring System**: Generate overall portfolio scores with detailed breakdowns
- **Recommendations**: Provide actionable suggestions for improvement
- **Modern UI**: Clean, responsive dashboard with loading and empty states

### Planned
- **AI-Powered Analysis**: Enhanced insights using OpenAI integration
- **Authentication**: GitHub OAuth for personalized experiences
- **History Tracking**: Store and compare analysis over time
- **CV Analysis**: Parse and evaluate resume data
- **Progress Reports**: Track improvement metrics

## 🏗️ Architecture

This project demonstrates production-ready patterns and best practices:

### Frontend (`packages/frontend`)
- **React 18** with **TypeScript** for type-safe UI development
- **Vite** for lightning-fast development and optimized builds
- **TanStack Query** for declarative server state management
- **Material-UI (MUI)** for comprehensive, customizable components
- **Feature-based structure** for scalability

### Backend (`packages/backend`)
- **NestJS** for enterprise-grade Node.js architecture
- **TypeScript** for end-to-end type safety
- **Modular design** with clear separation of concerns:
  - **Analysis Module**: Core business logic for portfolio evaluation
  - **GitHub Module**: GitHub API integration and data fetching
  - **Scoring Module**: Pluggable scoring strategies
- **DTO validation** with class-validator
- **Environment-based configuration**

### Key Architectural Decisions

1. **Monorepo Structure**: Keeps frontend and backend in sync while maintaining clear boundaries
2. **Feature-Based Organization**: Code is organized by feature, not by technical layer
3. **Dependency Injection**: NestJS DI container for testability and maintainability
4. **Type Safety**: Shared types and DTOs prevent runtime errors
5. **Separation of Concerns**: Controllers handle HTTP, services contain business logic

```
┌─────────────────┐
│   React UI      │
│  (Frontend)     │
└────────┬────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐
│  NestJS API     │
│  (Backend)      │
├─────────────────┤
│ Analysis Module │◄──┐
│ GitHub Module   │   │ Scoring
│ Scoring Module  │───┘ Strategies
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  GitHub API     │
└─────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0 (install with `npm install -g pnpm`)
- **GitHub Personal Access Token**: [Create one here](https://github.com/settings/tokens)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-score
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your GitHub token
   ```

4. **Start development servers**
   ```bash
   # Start both frontend and backend
   pnpm dev

   # Or start individually
   pnpm dev:frontend  # Frontend on http://localhost:5173
   pnpm dev:backend   # Backend on http://localhost:3001
   ```

## 📦 Project Structure

```
portfolio-score/
├── packages/
│   ├── frontend/          # React + Vite application
│   │   ├── src/
│   │   │   ├── features/  # Feature modules (analysis, portfolio)
│   │   │   ├── shared/    # Reusable components and utilities
│   │   │   ├── api/       # API client configuration
│   │   │   └── pages/     # Route components
│   │   └── README.md
│   │
│   └── backend/           # NestJS application
│       ├── src/
│       │   ├── modules/   # Feature modules
│       │   ├── common/    # Shared utilities
│       │   └── config/    # Configuration
│       └── README.md
│
├── .env.example           # Environment template
├── package.json           # Root workspace config
└── README.md             # This file
```

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start both frontend and backend
pnpm dev:frontend     # Start frontend only
pnpm dev:backend      # Start backend only

# Building
pnpm build            # Build both packages

# Code Quality
pnpm lint             # Lint all packages
pnpm format           # Format code with Prettier
pnpm format:check     # Check formatting
pnpm type-check       # TypeScript type checking
```

### Code Quality

This project enforces code quality through:
- **ESLint**: Catches common errors and enforces best practices
- **Prettier**: Ensures consistent code formatting
- **TypeScript**: Provides compile-time type safety
- **Strict Mode**: Enabled for maximum type safety

## 🧪 Testing

Testing infrastructure is prepared for:
- **Unit Tests**: Business logic and utilities
- **Integration Tests**: API endpoints
- **E2E Tests**: Critical user flows

*Testing implementation is planned for the next phase.*

## 📚 Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- TanStack Query (React Query)
- Material-UI (MUI)
- React Router v6
- Axios

### Backend
- NestJS
- TypeScript
- Class Validator
- Axios
- dotenv

### Development Tools
- ESLint
- Prettier
- pnpm

## 🗺️ Roadmap

### Phase 1: MVP ✅
- [x] Project initialization
- [ ] GitHub API integration
- [ ] Basic scoring algorithm
- [ ] Results dashboard UI
- [ ] Portfolio input form

### Phase 2: Enhancement
- [ ] AI-powered analysis (OpenAI)
- [ ] Advanced scoring strategies
- [ ] Detailed recommendations
- [ ] UI polish and animations

### Phase 3: Persistence
- [ ] Database integration (PostgreSQL + Prisma)
- [ ] GitHub OAuth authentication
- [ ] Analysis history
- [ ] User profiles

### Phase 4: Advanced Features
- [ ] CV parsing and analysis
- [ ] LinkedIn integration
- [ ] Industry benchmarking
- [ ] Exportable reports (PDF)
- [ ] Email notifications

### Phase 5: Production
- [ ] Comprehensive test coverage
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Deployment guides
- [ ] Monitoring and logging

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome! Please open an issue to discuss proposed changes.

## 📄 License

MIT License - feel free to use this project as a reference for your own work.

## 👤 Author

**Andrii Maksymov**

---

**Note**: This project is designed to showcase production-ready full-stack development skills. It prioritizes clean architecture, type safety, and scalability over quick hacks.
