import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
import Groq from 'groq-sdk';
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

export interface LinkedinDimension {
  score: number;
  status: string;
  insights: string[];
}

export interface LinkedinAnalysisResponse {
  summary: {
    text: string;
    seniorityGuess: string;
  };
  dimensions: {
    profile: LinkedinDimension;
    headline: LinkedinDimension;
    experience: LinkedinDimension;
    skills: LinkedinDimension;
    branding: LinkedinDimension;
    overall: number;
  };
  recommendations: {
    headlines: string[];
    aboutSuggestions: {
      missing: string;
      rewritten: string;
    };
    experienceEdits: {
      role: string;
      company: string;
      improvements: string[];
    }[];
  };
  missingKeywords: string[];
  actionPlan: {
    thisWeek: string[];
    next30Days: string[];
    next60Days: string[];
  };
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI | null = null;
  private gemini: GoogleGenAI | null = null;
  private groq: Groq | null = null;

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

    // Initialize Groq (Fallback for Gemini)
    const groqKey = this.configService.get<string>('GROQ_API_KEY');
    if (groqKey) {
      this.groq = new Groq({ apiKey: groqKey });
      this.logger.log('Groq AI initialized');
    }

    if (!this.gemini && !this.openai && !this.groq) {
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

    // 2. Try Groq Second (if Gemini fails)
    if (this.groq) {
      try {
        const result = (await this.tryGroq(
          this.groq,
          prompt,
        )) as AiAnalysisResponse;
        if (result) return result;
      } catch (error) {
        this.logger.error('Groq analysis failed, falling back...', error);
      }
    }

    // 3. Try OpenAI Third
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

    // 4. No providers succeeded
    this.logger.error('All AI analysis providers failed.');
    return null;
  }

  async generateLinkedinAnalysis(
    data: LinkedinAnalysisRequest,
  ): Promise<LinkedinAnalysisResponse | null> {
    const prompt = `
      You are an expert Career Coach and LinkedIn Profile Optimizer.
      Analyze the following profile and improve it for maximum impact and recruitment visibility.
      
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
       1. Rate the profile across 5 dimensions (0-100): Profile Completeness, Headline Quality, Experience Impact, Skills Relevance, Personal Branding.
       2. Provide 2-3 specific insights for each dimension.
       3. Suggest 3-5 high-impact headlines tailored to their seniority.
       4. Analyze the "About" section: identify what is missing (metrics, outcomes) and provide a polished rewrite.
       5. For each job role, provide 2-3 improved bullet points using the STAR method with metrics.
       6. Suggest missing high-value keywords (only if truthful).
       7. Generate a 30-60 day LinkedIn action plan.
       8. Guess their current seniority level (Junior, Mid, Senior, Lead/Staff, Manager).
       
      Return STRICT JSON:
      {
        "summary": { "text": "1-2 paragraph professional summary", "seniorityGuess": "..." },
        "dimensions": {
          "profile": { "score": 85, "status": "Strong", "insights": ["...", "..."] },
          "headline": { "score": 70, "status": "Good", "insights": ["...", "..."] },
          "experience": { "score": 60, "status": "Needs Improvement", "insights": ["...", "..."] },
          "skills": { "score": 90, "status": "Excellent", "insights": ["...", "..."] },
          "branding": { "score": 50, "status": "Average", "insights": ["...", "..."] },
          "overall": 71
        },
        "recommendations": {
          "headlines": ["...", "..."],
          "aboutSuggestions": { "missing": "...", "rewritten": "..." },
          "experienceEdits": [
            { "role": "...", "company": "...", "improvements": ["Bullet 1", "Bullet 2"] }
          ]
        },
        "missingKeywords": ["...", "..."],
        "actionPlan": {
          "thisWeek": ["...", "..."],
          "next30Days": ["...", "..."],
          "next60Days": ["...", "..."]
        }
      }
    `;

    // 1. Try OpenAI First (since Gemini/Groq might have quota issues)
    if (this.openai) {
      try {
        const result = (await this.tryOpenAI(
          this.openai,
          prompt,
        )) as LinkedinAnalysisResponse;
        this.logger.log(`OpenAI LinkedIn analysis success: ${!!result}`);
        if (result) return result;
      } catch (e) {
        this.logger.error('OpenAI LinkedIn analysis failed', e);
      }
    }

    // 2. Try Gemini Second
    if (this.gemini) {
      try {
        const result = (await this.tryGemini(
          this.gemini,
          prompt,
        )) as LinkedinAnalysisResponse;
        this.logger.log(`Gemini LinkedIn analysis success: ${!!result}`);
        if (result) return result;
      } catch (e) {
        this.logger.error('Gemini LinkedIn analysis failed, trying Groq...', e);
      }
    }

    // 3. Try Groq Third
    if (this.groq) {
      try {
        const result = (await this.tryGroq(
          this.groq,
          prompt,
        )) as LinkedinAnalysisResponse;
        this.logger.log(`Groq LinkedIn analysis success: ${!!result}`);
        if (result) return result;
      } catch (e) {
        this.logger.error('Groq LinkedIn analysis failed', e);
      }
    }

    // 4. No providers succeeded
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
        this.logger.error('Gemini CV Analysis failed, trying Groq...', e);
      }
    }

    // 2. Try Groq
    if (this.groq) {
      try {
        const result = (await this.tryGroq(
          this.groq,
          prompt,
        )) as CvAnalysisResponse;
        if (result) {
          this.logger.log('Groq CV analysis succeeded');
          return result;
        }
      } catch (e) {
        this.logger.error('Groq CV Analysis failed', e);
      }
    }

    // 3. Try OpenAI
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

    // 4. No providers succeeded
    this.logger.error('All CV AI analysis providers failed.');
    throw new Error(
      'AI Analysis failed. Please ensure your API keys are configured correctly.',
    );
  }

  private async tryGemini(client: GoogleGenAI, prompt: string): Promise<any> {
    const modelName = 'gemini-2.0-flash'; // Fixed from 2.5 which doesn't exist yet
    this.logger.log(`Calling Gemini API (New SDK) with model: ${modelName}`);
    try {
      const response = await client.models.generateContent({
        model: modelName,
        contents: prompt,
      });
      const text = response.text;
      if (!text) {
        this.logger.warn(
          `Gemini returned empty response for model ${modelName}`,
        );
        return null;
      }

      this.logger.debug(`Gemini Response Text: ${text}`);
      const jsonString = text.replace(/```json\n?|\n?```/g, '').trim();
      return JSON.parse(jsonString);
    } catch (error: any) {
      this.logger.error(
        `Gemini generation/parsing failed for ${modelName}: ${(error as Error)?.message || 'Unknown error'}`,
      );
      return null;
    }
  }

  private async tryGroq(client: Groq, prompt: string): Promise<any> {
    const modelName = 'llama-3.3-70b-versatile';
    this.logger.log(`Calling Groq API with model: ${modelName}`);
    try {
      const completion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: modelName,
        response_format: { type: 'json_object' },
      });
      const content = completion.choices[0].message.content;
      if (!content) return null;
      return JSON.parse(content);
    } catch (error: any) {
      this.logger.error(
        `Groq generation/parsing failed for ${modelName}: ${(error as Error)?.message || 'Unknown error'}`,
      );
      return null;
    }
  }

  private async tryOpenAI(client: OpenAI, prompt: string): Promise<any> {
    this.logger.log('Calling OpenAI API (gpt-4o)');
    try {
      const completion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
      });
      const content = completion.choices[0].message.content;
      if (!content) return null;
      return JSON.parse(content);
    } catch (error: any) {
      this.logger.error(
        `OpenAI generation/parsing failed: ${(error as Error)?.message || 'Unknown error'}`,
      );
      return null;
    }
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

    const primaryTech = [
      ...new Set(repos.map((r) => r.language).filter(Boolean)),
    ].slice(0, 5);
    const lastRepo = repos.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    )[0];

    return `
      Analyze this developer's GitHub portfolio to provide a personalized, encouraging, and honest assessment.
      
      User Profile:
      - Username: ${profile.login}
      - Bio: ${profile.bio || 'None'}
      - Public Repos: ${profile.public_repos}
      - Followers: ${profile.followers}
      - Company: ${profile.company || 'None'}
      - Primary Tech (detected): ${primaryTech.join(', ')}
      - Most recently updated repo: ${lastRepo?.name || 'N/A'} (last updated: ${lastRepo?.updated_at || 'N/A'})
      
      Metric Scores (0-100):
      - Activity: ${scores.activity}
      - Project Quality: ${scores.projectQuality}
      - Tech Stack Diversity: ${scores.techStackDiversity}
      - Consistency: ${scores.consistency}
      
      Top Repositories:
      ${JSON.stringify(topRepos, null, 2)}
      
      IMPORTANT: In your response, mention specific repository names (e.g., "${topRepos[0]?.name || 'your projects'}"), technologies you see used (like ${primaryTech[0] || 'your core stack'}), and specific activity patterns.
      Avoid generic advice. If they use Next.js, talk about Next.js. If their last commit was 3 months ago, mention that.

      Provide a JSON response with the following structure:
      {
        "summary": "2-3 sentences professional summary of their coding style and strengths",
        "careerPath": "Suggestion for potential career paths or roles they fit best",
        "keyStrengths": ["Strength 1", "Strength 2", "Strength 3"],
        "improvements": ["Improvement 1", "Improvement 2", "Improvement 3"],
        "overview": {
          "current": "1-sentence summary of where they are now",
          "working": "1-sentence summary of what is working well",
          "fixFirst": "1-sentence summary of the most critical thing to improve"
        },
        "profileSummary": "A one-line punchy AI-written summary for a profile card (e.g., 'Full-stack builder with a passion for UX')",
        "flagshipProjects": [
          {
            "name": "Repo Name representing a flagship project",
            "reason": "Why this should be a flagship project",
            "url": "https://github.com/username/repo",
            "stars": 12,
            "technologies": Array of stack technologies from repo,
            "improvements": ["Specific improvement 1", "Specific improvement 2"]
          }
        ],
        "metricInsights": {
          "activity": "Explain why they got the activity score of ${scores.activity}, citing evidence",
          "quality": "Explain why they got the quality score of ${scores.projectQuality}, citing evidence like READMEs or structure",
          "stack": "Explain why they got the stack score of ${scores.techStackDiversity}, mentioning their specific tech",
          "consistency": "Explain why they got the consistency score of ${scores.consistency}, citing their commit patterns"
        },
        "checklist": [
          { "item": "Specific task like 'Update README for ${topRepos[0]?.name || 'your main project'}'", "metricTag": "Quality" },
          { "item": "Another specific task", "metricTag": "Activity" }
        ]
      }
    `;
  }
}
