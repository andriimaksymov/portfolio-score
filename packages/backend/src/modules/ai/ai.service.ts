import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
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
  private gemini: GoogleGenerativeAI | null = null;
  private geminiModel: any = null; // Added for direct model access

  constructor(private configService: ConfigService) {
    this.initializeClients();
  }

  private initializeClients() {
    // Initialize Gemini (High Priority)
    const geminiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (geminiKey) {
      this.gemini = new GoogleGenerativeAI(geminiKey);
      this.logger.log('Gemini AI initialized');
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
      this.logger.warn('No AI API keys found. Using Mock Mode.');
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
        const result = await this.tryGemini(this.gemini, prompt);
        if (result) return result;
      } catch (error) {
        this.logger.error('Gemini analysis failed, falling back...', error);
      }
    }

    // 2. Try OpenAI Second
    if (this.openai) {
      try {
        const result = await this.tryOpenAI(this.openai, prompt);
        if (result) return result;
      } catch (error) {
        this.logger.error('OpenAI analysis failed, falling back...', error);
      }
    }

    // 3. Fallback to Mock Data
    this.logger.warn('Returning mock AI analysis data.');
    return this.getMockAnalysis();
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
        const result = await this.tryGemini(this.gemini, prompt);
        if (result) return result; // Cast for now, practically same JSON parsing logic
      } catch (e) {
        this.logger.error(e);
      }
    }

    if (this.openai) {
      try {
        const result = await this.tryOpenAI(this.openai, prompt);
        if (result) return result;
      } catch (e) {
        this.logger.error(e);
      }
    }

    // Mock fallback
    return {
      summary: {
        original: data.about,
        improved: `Passionate ${data.title} with a proven track record of delivering high-quality solutions. Expert in ${data.skills.slice(0, 3).join(', ')}.`,
        critique: 'Original summary was too brief.',
      },
      experience: data.experience.map((e) => ({
        role: e.role,
        company: e.company,
        original: e.description,
        improved: `Championed development of key features at ${e.company}, resulting in 20% efficiency increase. Led team in adopting ${data.skills[0] || 'modern tech'}.`,
        suggestions: ['Add specific metrics', 'Mention team size'],
      })),
      skills: {
        missing: ['Cloud Architecture', 'System Design'],
        trending: ['AI Integration', 'Performance Optimization'],
      },
      courses: [
        {
          title: 'Advanced System Design',
          platform: 'Coursera',
          url: 'https://coursera.org/search?query=system%20design',
          reason: 'Critical for senior roles',
        },
      ],
    };
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
      ${text.substring(0, 10000)}
    `;

    // 1. Try Gemini
    if (this.gemini) {
      try {
        const result = await this.tryGemini(this.gemini, prompt);
        if (result) return result;
      } catch (e) {
        this.logger.error('Gemini CV Analysis failed', e);
      }
    }

    // 2. Try OpenAI
    if (this.openai) {
      try {
        const result = await this.tryOpenAI(this.openai, prompt);
        if (result) return result;
      } catch (e) {
        this.logger.error('OpenAI CV Analysis failed', e);
      }
    }

    // 3. Fallback Mock
    return {
      summary: {
        professionalLikelihood: 65,
        critique:
          'The CV has good content but lacks quantifiable impact. It reads more like a job description than a list of achievements.',
      },
      improvements: [
        {
          category: 'Impact',
          quote: text.substring(0, 50), // Fallback quote
          suggestion: 'Quantify this achievement with numbers.',
          rewritten: 'Improved X by Y%.',
        },
      ],
      missingKeywords: ['CI/CD', 'Unit Testing'],
    };
  }

  private async tryGemini(
    client: GoogleGenerativeAI,
    prompt: string,
  ): Promise<any> {
    const model = client.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
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

  private getMockAnalysis(): AiAnalysisResponse {
    return {
      summary:
        'This developer demonstrates a solid foundation in web development with a focus on modern JavaScript frameworks. Their portfolio shows inconsistent activity but high-quality individual projects.',
      careerPath: 'Frontend Developer or Junior Full Stack Engineer',
      keyStrengths: [
        'Strong understanding of component-based architecture',
        'Experience with modern build tools',
        'Attention to project documentation',
      ],
      improvements: [
        'Increase consistency of contributions',
        'Expand technical breadth beyond primary stack',
        'Engage more with the open source community',
      ],
    };
  }
}
