# DevScore (Full-Stack Portfolio Intelligence)

**DevScore** is a premium full-stack platform that performs deep-tier analysis of technical careers. By integrating **GitHub**, **LinkedIn**, and **Resume (PDF)** data, it provides developers with a 360-degree technical audit, AI-driven strategic roadmaps, and actionable refactor recommendations.

---

## 🚀 Vision
Bridge the gap between engineering history and professional impact. DevScore isn't just a scraper; it's a career intelligence engine that translates complex code patterns and professional experience into a quantifiable technical signature.

## ✨ Core Capabilities

### ⚡️ Multi-Source Analysis
- **GitHub Audit**: Deep-semantic analysis of commit history, repository quality, and architecture patterns.
- **LinkedIn Intelligence**: Extracts professional trajectory and market positioning from public profiles.
- **CV Vector Scanning**: High-fidelity PDF parsing that identifies "Semantic Career Entities" and impact metrics.

### 🧠 Triple-Fallback AI Engine
- Utilizes a robust fallback architecture (**OpenAI GPT-4o** → **Google Gemini 1.5 Pro** → **Groq Llama 3**) to ensure 99%+ uptime and high-reasoning accuracy.
- **Project Refactor Advice**: Specific, actionable technical advice for individual repositories.
- **Strategic Improvements**: A 3-tier roadmap (Immediate Fixes → Working On → Current Strengths).

### 💎 Premium Interface
- **Modern Dark Aesthetic**: A high-fidelity, glassmorphism UI built with **Tailwind CSS v4**.
- **Performance First**: Zero-overhead design—migrated from MUI to pure Tailwind for maximum responsiveness and minimal bundle weight.
- **Dynamic Previews**: Real-time analysis simulations and interactive dashboards.

---

## 🏗️ Architecture

### Frontend (`packages/frontend`)
- **React 19**: Utilizing the latest concurrent features and hook patterns.
- **Tailwind CSS v4**: Modern utility-first styling with high-performance CSS-in-JS alternatives.
- **TanStack Query (v5)**: Robust server state management and caching.
- **Lucide Icons**: Consistent, lightweight vector iconography.

### Backend (`packages/backend`)
- **NestJS**: Enterprise-grade modular Node.js framework.
- **AI Orchestration**: Custom service layer for handling multi-LLM fallbacks and prompt engineering.
- **PDF Vector Engine**: `pdf-parse` integration for extraction of structured data from CVs.
- **Cheerio + Scrapers**: Targeted data extraction for LinkedIn profile intelligence.

---

## 🛠️ Tech Stack & Dependencies

### **Frontend**
- **Core**: React 19, TypeScript, Vite 7
- **Styling**: Tailwind CSS v4, Lucide React
- **Data**: TanStack Query, Axios
- **Routing**: React Router v6

### **Backend**
- **Core**: NestJS 11, TypeScript
- **AI**: OpenAI SDK, Google Generative AI, Groq SDK
- **Parsing**: PDF-Parse, Cheerio
- **Validation**: Class Validator, Class Transformer

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: >= 20.x
- **pnpm**: >= 8.x
- **API Keys**: (Required for AI features) `OPENAI_API_KEY`, `GEMINI_API_KEY`, or `GROQ_API_KEY`.

### 2. Installation
```bash
git clone https://github.com/andriimaksymov/portfolio-score.git
cd portfolio-score
pnpm install
```

### 3. Environment Configuration
Create a `.env` file in the root:
```env
# AI Keys
OPENAI_API_KEY=your_key
GEMINI_API_KEY=your_key
GROQ_API_KEY=your_key

# GitHub Integration
GITHUB_API_TOKEN=your_token
```

### 4. Development
```bash
# Start Frontend & Backend concurrently
pnpm dev

# Accessible at:
# Frontend: http://localhost:5173
# API:      http://localhost:3001/api
```

---

## 🗺️ Roadmap Progress

### **Phase 1: Foundation (GitHub) ✅**
- [x] GitHub API Semantic Scraper
- [x] Tech Stack Diversity Scoring
- [x] Flagship Repository Identification

### **Phase 2: Multi-Source Expansion ✅**
- [x] **LinkedIn Integration**: Profile intelligence and trajectory analysis.
- [x] **CV Scanning**: Support for PDF resume parsing and entity extraction.
- [x] **Strategic UI**: Migration to Tailwind v4 for a premium, lightweight experience.

### **Phase 3: Deep Reasoning ✅**
- [x] Project-specific Refactor Recommendations
- [x] Automated Strategic Improvement Roadmaps
- [x] Multi-LLM Fallback Architecture

---

## 👤 Author
**Andrii Maksymov**
- [LinkedIn](https://www.linkedin.com/in/maksymov-andrii/)
- [GitHub](https://github.com/andriimaksymov)

---
**Note**: This project is built to demonstrate production-ready full-stack capabilities, focusing on AI orchestration, architectural scalability, and premium UI/UX design.
