# DevScore Frontend - Premium Career Intelligence

The frontend for **DevScore**, a high-fidelity React application designed for deep-tier technical audit visualization. Migrated from MUI to **Tailwind CSS v4** for maximum performance and a custom, glassmorphism aesthetic.

## 💎 Design Philosophy
- **Performance First**: Zero-overhead styling using Tailwind CSS v4.
- **Micro-Interactions**: Smooth transitions and hover states for a premium, application-like feel.
- **Information Density**: Clean, modular dashboards that present complex AI insights without cognitive overload.

## 🛠 Tech Stack
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [TanStack Query v5](https://tanstack.com/query/latest)
- **Data Fetching**: Axios
- **Testing**: [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/), [Playwright](https://playwright.dev/)

## 📦 Project Structure
```
src/
├── api/                   # Global API client configuration
├── components/
│   ├── landing/           # Home page sections (Hero, Navbar, Footer, etc.)
│   ├── ui/                # Core UI primitives (Button, Card, etc.)
│   └── dashboard/         # Shared dashboard preview components
├── features/
│   └── analysis/          # Core Feature: Analysis Dashboards
│       ├── api/           # Feature-specific hooks
│       ├── components/    # GitHub, LinkedIn, and CV Dashboards
│       ├── types/         # Domain-specific TypeScript interfaces
│       └── hooks/         # Logic for analysis state management
├── pages/                 # Full-page route components
├── lib/                   # Utility functions
└── e2e/                   # Playwright E2E tests
```

## 🚀 Getting Started

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev
```
Accessible at `http://localhost:5173`.

### Testing
```bash
# Unit Tests
pnpm test

# End-to-End Tests
pnpm test:e2e
```

### Production Build
```bash
pnpm build
```

## 🎨 Styling with Tailwind v4
The project utilizes the modern Tailwind v4 `@theme` block in `index.css`. 
- **Custom Accents**: Indigo, Purple, and Slate palettes.
- **Shadows**: Custom "Premium" shadows for glass cards.
- **Glassmorphism**: Native backdrop-blur utilities combined with border-slate-800/50.

## ✨ Key Interactive Features

### GitHub Analysis Dashboard
- **Impact Roadmap**: Strategic improvements categorized by effort and impact.
- **Technical Summary**: High-level executive summary of code quality.

### LinkedIn Analysis Dashboard
- **Growth Summary**: AI evaluation of profile trajectory and gaps.
- **Network Visibility**: Insights into professional reach.

### CV / ATS Scan Dashboard
- **Technical Summary**: Detailed breakdown of resume strength and missing keywords.

## 🛣 Roadmap Progress
- [x] Full migration from MUI to Tailwind v4 ✅
- [x] Multi-source support (GitHub, LinkedIn, CV) ✅
- [x] Premium dark-mode dashboard designs ✅
- [x] Responsive tablet and mobile layouts ✅
- [x] Comprehensive Test Coverage (Unit + E2E) ✅
- [ ] Interactive Export (PDF) generation
- [ ] Comparison mode (Benchmarking against peers)
