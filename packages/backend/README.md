# DevScore Backend - AI Career Intelligence API

A modular **NestJS** application orchestrating multi-source developer data extraction and high-reasoning AI analysis.

## 🚀 Capabilities

### ⚡️ AI Orchestration
- **Triple-Fallback Logic**: Seamlessly switches between **OpenAI**, **Google Gemini**, and **Groq** to maintain high availability.
- **Structured Outputs**: Predictable JSON responses for complex career intelligence.

### 🔍 Data Extraction
- **GitHub Module**: Full-repo technical health extraction and commit semantic analysis.
- **LinkedIn Module**: Targeted extraction of professional profile history and narrative.
- **CV / PDF Module**: High-fidelity PDF parsing using `pdf-parse`.

## 🛠 Tech Stack
- **Framework**: [NestJS 11](https://nestjs.com/)
- **Runtime**: Node.js 20+
- **AI Libraries**: `@google/genai`, `openai`, `groq-sdk`
- **Parsing**: `cheerio`, `pdf-parse`
- **Validation**: `class-validator`, `class-transformer`

## 📦 Project Structure
```
src/
├── modules/
│   ├── ai/               # AI Service with multi-model fallback logic
│   ├── github/           # GitHub API data fetching & repo audit
│   ├── linkedin/         # LinkedIn scraper & profile analyzer
│   ├── cv/               # PDF upload & parser orchestration
│   ├── analysis/         # Core evaluation & scoring logic
│   └── scoring/          # Dimensions: Activity, Quality, Stack, Consistency
├── common/               # Middlewares, Interceptors, and Filters
└── config/               # Environment-based configuration
```

## 🚀 Getting Started

### Environment Variables
Create a `.env` file in the project root:
```env
PORT=3001
GITHUB_API_TOKEN=your_token
OPENAI_API_KEY=your_key
GEMINI_API_KEY=your_key
GROQ_API_KEY=your_key
```

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm start:dev
```
API Root: `http://localhost:3001/api`

## 📡 API Endpoints

### GitHub Analysis
`POST /api/analysis/analyze`
- Body: `{ "username": "string" }`

### LinkedIn Analysis
`POST /api/linkedin/analyze-url`
- Body: `{ "url": "string" }`

### CV Analysis
`POST /api/cv/upload`
- Multipart/Form-Data: `file: PDF`

## 🧠 Scoring Strategy
Dimensions are weighted 25% each:
1. **Activity**: Commitment frequency and volume.
2. **Quality**: Documentation, README clarity, and repo health (stars/topics).
3. **Stack**: Language diversity and framework modernity.
4. **Consistency**: Long-term sustained engineering output.

---
**Author**: Andrii Maksymov
