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
└── lib/                   # Utility functions
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
- **flagship-cards**: Identification of top projects with specific AI-generated refactor advice.
- **strategic-improvements**: A categorized roadmap for profile enhancement.

### LinkedIn Analysis Dashboard
- **market-positioning**: AI evaluation of profile traction and technical narrative.

### CV / ATS Scan Dashboard
- **entity-extraction**: Visual breakdown of skills, impact metrics, and missing keywords.

## 🛣 Roadmap Progress
- [x] Full migration from MUI to Tailwind v4 ✅
- [x] Multi-source support (GitHub, LinkedIn, CV) ✅
- [x] Premium dark-mode dashboard designs ✅
- [x] Responsive tablet and mobile layouts ✅
- [ ] Interactive Export (PDF) generation
- [ ] Comparison mode (Benchmarking against peers)
