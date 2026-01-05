# Backend - Portfolio Analyzer

NestJS backend API for the Portfolio Analyzer application.

## Tech Stack

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type safety
- **Google Gemini (Generative AI)** - Portfolio analysis and career insights
- **Axios** - HTTP client for GitHub API
- **Class Validator** - DTO validation
- **@nestjs/config** - Configuration management

## Project Structure

```
src/
├── modules/              # Feature modules
│   ├── analysis/         # Analysis orchestration
│   │   ├── dto/          # Data transfer objects
│   │   ├── analysis.controller.ts
│   │   ├── analysis.service.ts
│   │   └── analysis.module.ts
│   ├── ai/               # Gemini AI integration
│   │   ├── interfaces/   # AI response schemas
│   │   ├── ai.service.ts
│   │   └── ai.module.ts
│   ├── github/           # GitHub API integration
│   │   ├── github.service.ts
│   │   └── github.module.ts
│   └── scoring/          # Scoring algorithms
│       ├── strategies/   # Modular scoring strategies
│       ├── scoring.service.ts
│       └── scoring.module.ts
├── common/               # Shared utilities
│   ├── decorators/       # Custom decorators
│   ├── filters/          # Exception filters
│   ├── interceptors/     # Request/response interceptors
│   └── pipes/            # Validation pipes
├── config/               # Configuration
│   └── configuration.ts  # Environment config
├── app.module.ts         # Root module
└── main.ts               # Application entry point
```

## Getting Started

### Environment Setup

Create a `.env` file in the project root (not in packages/backend):

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
GITHUB_API_TOKEN=your_github_token_here
GITHUB_API_BASE_URL=https://api.github.com
```

**Getting a GitHub Token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo`, `read:user`
4. Copy the token to your `.env` file

### Install Dependencies

```bash
pnpm install
```

### Development

```bash
pnpm start:dev
```

The API will be available at [http://localhost:3001/api](http://localhost:3001/api)

### Build

```bash
pnpm build
```

### Production

```bash
pnpm start:prod
```

### Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

### Type Checking

```bash
pnpm type-check
```

### Linting

```bash
pnpm lint
```

## API Endpoints

### Health Check

```
GET /api/health
```

Returns server health status.

### Root

```
GET /api
```

Returns API information.

### Analyze Portfolio

```
POST /api/analysis/analyze
Content-Type: application/json

{
  "username": "github_username"
}
```

Analyzes a GitHub user's portfolio using modular scoring and AI-powered insights.

**Response Schema:**
```json
{
  "username": "example_user",
  "overallScore": 85,
  "scores": {
    "activity": 90,
    "projectQuality": 80,
    "techStackDiversity": 85,
    "consistency": 85
  },
  "strengths": ["Consistent contribution history", "Strong README documentation"],
  "weaknesses": ["Lack of recent project activity", "Limited variety in UI frameworks"],
  "recommendations": ["Expand your frontend portfolio with React/Vue projects", "Enhance repository documentation"],
  "aiInsights": {
    "overview": {
      "current": "You have a solid technical base with clear documentation.",
      "working": "Your documentation style is exceptionally clear and structured.",
      "fixFirst": "Improve the 'Stack' score by diversifying beyond vanilla JS."
    },
    "profileSummary": "A disciplined developer with a high focus on documentation quality.",
    "flagshipProjects": [
      {
        "name": "project-alpha",
        "reason": "Showcases complex algorithm implementation",
        "improvements": ["Add unit tests", "Include setup guide"]
      }
    ],
    "metricInsights": {
      "activity": "Your activity has been stable over the last 6 months.",
      "quality": "Documentation is a major strength.",
      "stack": "Consider exploring modern frameworks like React.",
      "consistency": "Good weekly commitment to coding."
    },
    "checklist": [
      { "item": "Add unit tests to Project Alpha", "metricTag": "Quality" }
    ]
  },
  "analyzedAt": "2026-01-05T20:00:00.000Z"
}
```

### Get Analysis (Future)

```
GET /api/analysis/:id
```

Retrieves a previously saved analysis. Will be implemented with database integration.

## Architecture

### Module Structure

The backend follows NestJS's modular architecture:

- **Analysis Module**: Orchestrates the portfolio analysis process
- **GitHub Module**: Handles all GitHub API interactions
- **Scoring Module**: Contains scoring algorithms and strategies

### Dependency Injection

NestJS's built-in DI container manages all dependencies:

```typescript
@Injectable()
export class AnalysisService {
  constructor(
    private readonly githubService: GithubService,
    private readonly scoringService: ScoringService
  ) {}
}
```

### Configuration

Environment-based configuration using `@nestjs/config`:

```typescript
const apiToken = this.configService.get('github.apiToken');
```

### Validation

Automatic DTO validation using `class-validator`:

```typescript
export class AnalyzePortfolioDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
```

## Scoring Algorithm

The scoring system evaluates four key areas:

### 1. Activity Score (25%)
- Number of public repositories
- Follower count
- Total stars across repositories
- Recent activity (events)

### 2. Project Quality Score (25%)
- Repository descriptions
- README quality
- Topics/tags
- Star count
- Recent updates

### 3. Tech Stack Diversity Score (25%)
- Number of different programming languages used
- Variety of technologies

### 4. Consistency Score (25%)
- Regular contribution pattern
- Number of active weeks
- Sustained activity over time

**Overall Score** = Average of all four scores (0-100)

## Development Guidelines

### Creating a New Module

```bash
nest generate module modules/feature-name
nest generate service modules/feature-name
nest generate controller modules/feature-name
```

### DTOs

- Place in `modules/[module-name]/dto/`
- Use `class-validator` decorators
- Export from module

### Services

- Business logic goes in services
- Keep controllers thin
- Use dependency injection

### Error Handling

- Use NestJS built-in exceptions
- Create custom exceptions when needed
- Use exception filters for global error handling

## Future Enhancements

- [ ] Add database integration (PostgreSQL + Prisma)
- [ ] Implement caching (Redis)
- [ ] Add authentication (JWT + GitHub OAuth)
- [ ] Integrate OpenAI for AI-powered analysis
- [ ] Add rate limiting
- [ ] Implement background jobs (Bull)
- [ ] Add comprehensive test coverage
- [ ] Create API documentation (Swagger)
- [ ] Add logging (Winston)
- [ ] Implement monitoring (Sentry)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `GITHUB_API_TOKEN` | GitHub personal access token | - |
| `GITHUB_API_BASE_URL` | GitHub API base URL | `https://api.github.com` |

## Scripts Reference

- `pnpm start:dev` - Start development server with watch mode
- `pnpm start:debug` - Start with debugging
- `pnpm build` - Build for production
- `pnpm start:prod` - Run production build
- `pnpm test` - Run unit tests
- `pnpm test:e2e` - Run E2E tests
- `pnpm test:cov` - Generate test coverage
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript compiler check

## Notes

- This project uses strict TypeScript configuration
- All endpoints use the `/api` prefix
- CORS is configured for the frontend URL
- Global validation pipe is enabled
- DTOs are automatically validated and transformed
