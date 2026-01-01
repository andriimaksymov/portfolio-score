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

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI | null = null;
  private gemini: GoogleGenerativeAI | null = null;

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

  private async tryGemini(
    client: GoogleGenerativeAI,
    prompt: string,
  ): Promise<AiAnalysisResponse | null> {
    const model = client.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = result.response; // Removed await as per lint feedback
    const text = response.text();

    // Clean up potential markdown code blocks if Gemini returns them
    const jsonString = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(jsonString) as AiAnalysisResponse;
  }

  private async tryOpenAI(
    client: OpenAI,
    prompt: string,
  ): Promise<AiAnalysisResponse | null> {
    const completion = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    if (!content) return null;

    return JSON.parse(content) as AiAnalysisResponse;
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
