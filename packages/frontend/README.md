# Frontend - Portfolio Analyzer

React + TypeScript frontend for the Portfolio Analyzer application.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Query** - Server state management
- **Material-UI (MUI)** - Component library
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Emotion** - CSS-in-JS (MUI dependency)

## Project Structure

```
src/
├── features/              # Feature-based modules
│   ├── analysis/          # Analysis results feature
│   │   ├── components/    # Feature-specific components
│   │   ├── hooks/         # Feature-specific hooks
│   │   ├── types/         # Feature-specific types
│   │   └── api/           # Feature-specific API calls
│   └── portfolio/         # Portfolio input feature
│       ├── components/
│       ├── hooks/
│       └── types/
├── shared/                # Shared utilities
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Shared hooks
│   ├── utils/             # Helper functions
│   └── types/             # Shared types
├── api/                   # API configuration
│   ├── client.ts          # Axios instance
│   └── endpoints.ts       # API endpoints
├── pages/                 # Route components
│   └── HomePage.tsx
├── App.tsx                # Main app component
└── main.tsx               # Entry point
```

## Getting Started

### Install Dependencies

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Type Checking

```bash
pnpm type-check
```

### Linting

```bash
pnpm lint
```

## Development Guidelines

### Component Organization

- **Feature Components**: Place in `features/[feature-name]/components/`
- **Shared Components**: Place in `shared/components/`
- **Page Components**: Place in `pages/`

### State Management

- **Server State**: Use TanStack Query (React Query)
- **Client State**: Use React hooks (useState, useReducer)
- **Global State**: Context API (when needed)

### API Calls

1. Define endpoints in `api/endpoints.ts`
2. Create API functions in feature's `api/` folder
3. Use TanStack Query hooks for data fetching

Example:

```typescript
// features/analysis/api/analysisApi.ts
import apiClient from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';

export const analyzePortfolio = async (username: string) => {
  const response = await apiClient.post(API_ENDPOINTS.ANALYZE_PORTFOLIO, {
    username,
  });
  return response.data;
};

// features/analysis/hooks/useAnalyzePortfolio.ts
import { useMutation } from '@tanstack/react-query';
import { analyzePortfolio } from '../api/analysisApi';

export const useAnalyzePortfolio = () => {
  return useMutation({
    mutationFn: analyzePortfolio,
  });
};
```

### Styling

- Use MUI's `sx` prop for component-specific styles
- Use MUI theme for consistent design tokens
- Avoid inline styles

### Path Aliases

Use `@/` prefix for absolute imports:

```typescript
import apiClient from '@/api/client';
import Button from '@/shared/components/Button';
```

## Key Features

### React Query Configuration

- Automatic refetch disabled on window focus
- 1 retry on failed requests
- 5-minute stale time

### MUI Theme

- Light mode by default
- Primary color: `#1976d2`
- Secondary color: `#dc004e`

### API Proxy

Development server proxies `/api` requests to `http://localhost:3001`

## Future Enhancements

- [ ] Add authentication flow
- [ ] Implement error boundaries
- [ ] Add loading skeletons
- [ ] Create reusable form components
- [ ] Add unit tests (Vitest)
- [ ] Add E2E tests (Playwright)
- [ ] Implement dark mode toggle
- [ ] Add internationalization (i18n)

## Environment Variables

Create a `.env.local` file for local development:

```env
# No environment variables needed yet
# Future: VITE_API_URL, VITE_GITHUB_CLIENT_ID, etc.
```

## Scripts Reference

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript compiler check

## Notes

- This project uses strict TypeScript configuration
- All components should be functional components with hooks
- Prefer composition over inheritance
- Keep components small and focused
