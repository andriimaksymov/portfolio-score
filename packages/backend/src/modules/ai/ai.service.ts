import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
import {
  GithubProfile,
  GithubRepo,
} from '../github/interfaces/github.interfaces';

import {
  AiAnalysisResponse,
  AiAnalysisScores,
} from './interfaces/ai.interfaces';

export interface CvAnalysisResponse {
  summary: {
    professionalLikelihood: number; // 0-100 score of how "senior/professional" it sounds
    critique: string;
  };
  improvements: {
    category: 'Impact' | 'Clarity' | 'Formatting' | 'Skills';
    quote: string; // The exact text from CV to highlight
    suggestion: string; // How to rewrite it
    rewritten?: string; // Example rewrite
  }[];
  missingKeywords: string[];
}

export interface LinkedinAnalysisRequest {
  fullName: string;
  title: string;
  about: string;
  experience: {
    role: string;
    company: string;
    description: string;
  }[];
  skills: string[];
}

export interface LinkedinAnalysisResponse {
  summary: {
    original: string;
    improved: string;
    critique: string;
  };
  experience: {
    role: string;
    company: string;
    original: string;
    improved: string;
    suggestions: string[];
  }[];
  skills: {
    missing: string[];
    trending: string[];
  };
  courses: {
    title: string;
    platform: string;
    url: string; // Placeholder or generated
    reason: string;
  }[];
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI | null = null;
  private gemini: GoogleGenAI | null = null;

  constructor(private configService: ConfigService) {
    this.initializeClients();
  }

  private initializeClients() {
    // Initialize Gemini (High Priority)
    const geminiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (geminiKey) {
      this.gemini = new GoogleGenAI({
        apiKey: geminiKey,
        apiVersion: 'v1',
      });
      this.logger.log('Gemini AI initialized successfully (New SDK, v1)');
    } else {
      this.logger.warn('GEMINI_API_KEY not found in configuration');
    }

    // Initialize OpenAI (Fallback)
    const openaiKey =
      this.configService.get<string>('OPENAI_API_KEY') ||
      this.configService.get<string>('openai.apiKey');

    if (openaiKey) {
      this.openai = new OpenAI({ apiKey: openaiKey });
      this.logger.log('OpenAI initialized');
    }

    if (!this.gemini && !this.openai) {
      this.logger.warn(
        'No AI API keys found. AI features will be unavailable.',
      );
    }
  }

  async generateAiAnalysis(
    profile: GithubProfile,
    repos: GithubRepo[],
    scores: AiAnalysisScores,
  ): Promise<AiAnalysisResponse | null> {
    const prompt = this.buildPrompt(profile, repos, scores);

    // 1. Try Gemini First
    if (this.gemini) {
      try {
        const result = (await this.tryGemini(
          this.gemini,
          prompt,
        )) as AiAnalysisResponse;
        if (result) return result;
      } catch (error) {
        this.logger.error('Gemini analysis failed, falling back...', error);
      }
    }

    // 2. Try OpenAI Second
    if (this.openai) {
      try {
        const result = (await this.tryOpenAI(
          this.openai,
          prompt,
        )) as AiAnalysisResponse;
        if (result) return result;
      } catch (error) {
        this.logger.error('OpenAI analysis failed, falling back...', error);
      }
    }

    // 3. No providers succeeded
    this.logger.error('All AI analysis providers failed.');
    return null;
  }

  async generateLinkedinAnalysis(
    data: LinkedinAnalysisRequest,
  ): Promise<LinkedinAnalysisResponse | null> {
    const prompt = `
      You are an expert Career Coach and LinkedIn Profile Optimizer.
      Analyze the following profile and improve it for maximum impact and ATS visibility.
      
      User Profile:
      Name: ${data.fullName}
      Current Title: ${data.title}
      About: "${data.about}"
      Skills: ${data.skills.join(', ')}
      
      Experience:
      ${data.experience
        .map(
          (exp) => `
        - Role: ${exp.role} at ${exp.company}
        - Description: "${exp.description}"
      `,
        )
        .join('\n')}
      
      TASKs:
       1. Rewrite the "About" section to be pitch-perfect.
       2. For EACH experience, rewrite the description to use strong action verbs and metrics (STAR method).
       3. Identify missing HIGH-VALUE skills based on their title/role.
       4. Recommend 3 specific courses (with real URL patterns if possible, e.g. Udemy/Coursera search links) to close gaps.
       
      Return STRICT JSON:
      {
        "summary": { "original": "...", "improved": "...", "critique": "..." },
        "experience": [
            { "role": "...", "company": "...", "original": "...", "improved": "...", "suggestions": ["..."] }
        ],
        "skills": { "missing": ["..."], "trending": ["..."] },
        "courses": [
            { "title": "...", "platform": "...", "url": "...", "reason": "..." }
        ]
      }
    `;

    // Reuse the existing multi-provider strategy
    if (this.gemini) {
      try {
        const result = (await this.tryGemini(
          this.gemini,
          prompt,
        )) as LinkedinAnalysisResponse;
        if (result) return result;
      } catch (e) {
        this.logger.error(e);
      }
    }

    if (this.openai) {
      try {
        const result = (await this.tryOpenAI(
          this.openai,
          prompt,
        )) as LinkedinAnalysisResponse;
        if (result) return result;
      } catch (e) {
        this.logger.error(e);
      }
    }

    // 3. No providers succeeded
    this.logger.error('All LinkedIn AI analysis providers failed.');
    return null;
  }

  async generateCvAnalysis(text: string): Promise<CvAnalysisResponse> {
    const prompt = `
      Analyze the following CV text for a Software Engineer role.
      Focus on finding WEAK points that need improvement.
      For each improvement, quote the EXACT text segment from the CV so we can highlight it.

      Return structured JSON:
      {
        "summary": {
          "professionalLikelihood": 0-100,
          "critique": "Overall feedback"
        },
        "improvements": [
          {
            "category": "Impact", 
            "quote": "Responsible for maintaining servers...",
            "suggestion": "Too passive. Use STAR method.",
            "rewritten": "Reduced server downtime by 40% by implementing automated health checks."
          }
        ],
        "missingKeywords": ["Docker", "Kubernetes"]
      }

      CV TEXT:
      ${text.substring(0, 30000)}
    `;

    // 1. Try Gemini
    this.logger.log(
      `Attempting Gemini CV analysis (Gemini Client: ${!!this.gemini})`,
    );
    if (this.gemini) {
      try {
        const result = (await this.tryGemini(
          this.gemini,
          prompt,
        )) as CvAnalysisResponse;
        if (result) {
          this.logger.log('Gemini CV analysis succeeded');
          return result;
        }
      } catch (e) {
        this.logger.error('Gemini CV Analysis failed', e);
      }
    }

    // 2. Try OpenAI
    if (this.openai) {
      try {
        const result = (await this.tryOpenAI(
          this.openai,
          prompt,
        )) as CvAnalysisResponse;
        if (result) return result;
      } catch (e) {
        this.logger.error('OpenAI CV Analysis failed', e);
      }
    }

    // 3. No providers succeeded
    this.logger.error('All CV AI analysis providers failed.');
    throw new Error(
      'AI Analysis failed. Please ensure your API keys are configured correctly.',
    );
  }

  private async tryGemini(client: GoogleGenAI, prompt: string): Promise<any> {
    const modelName = 'gemini-2.5-flash';
    this.logger.log(`Calling Gemini API (New SDK) with model: ${modelName}`);
    const response = await client.models.generateContent({
      model: modelName,
      contents: prompt,
    });
    const text = response.text;
    if (!text) return null;
    const jsonString = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(jsonString);
  }

  private async tryOpenAI(client: OpenAI, prompt: string): Promise<any> {
    const completion = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      response_format: { type: 'json_object' },
    });
    const content = completion.choices[0].message.content;
    if (!content) return null;
    return JSON.parse(content);
  }

  private buildPrompt(
    profile: GithubProfile,
    repos: GithubRepo[],
    scores: AiAnalysisScores,
  ): string {
    const topRepos = repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        topics: repo.topics,
      }));

    return `
      Analyze this developer portfolio:
      
      Profile:
      - Bio: ${profile.bio || 'None'}
      - Public Repos: ${profile.public_repos}
      - Followers: ${profile.followers}
      - Company: ${profile.company || 'None'}
      
      Scores (0-100):
      - Activity: ${scores.activity}
      - Project Quality: ${scores.projectQuality}
      - Tech Stack Diversity: ${scores.techStackDiversity}
      - Consistency: ${scores.consistency}
      
      Top Repositories:
      ${JSON.stringify(topRepos, null, 2)}
      
      Please provide a JSON response with the following structure:
      {
        "summary": "2-3 sentences professional summary of their coding style and strengths",
        "careerPath": "Suggestion for potential career paths or roles they fit best (e.g. Senior Frontend Engineer, Full Stack Developer)",
        "keyStrengths": ["Strength 1", "Strength 2", "Strength 3"],
        "improvements": ["Improvement 1", "Improvement 2", "Improvement 3"]
      }
    `;
  }
}
