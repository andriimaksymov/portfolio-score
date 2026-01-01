import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
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
  private openai: OpenAI;
  private hasApiKey: boolean;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.hasApiKey = !!apiKey;

    if (this.hasApiKey) {
      this.openai = new OpenAI({
        apiKey: apiKey,
      });
    }
  }

  async generateAiAnalysis(
    profile: GithubProfile,
    repos: GithubRepo[],
    scores: AiAnalysisScores,
  ): Promise<AiAnalysisResponse | null> {
    if (!this.hasApiKey) {
      return null;
    }

    try {
      // Prepare a summary of the top 5 repos for the prompt
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

      const prompt = `
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
          "careerPath": "Suggestion for potential career paths or roles they fit best",
          "keyStrengths": ["Strength 1", "Strength 2"],
          "improvements": ["Improvement 1", "Improvement 2"]
        }
      `;

      const completion = await this.openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo', // Cost-effective model
        response_format: { type: 'json_object' },
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        return null;
      }

      return JSON.parse(content) as AiAnalysisResponse;
    } catch (error) {
      console.error('AI Analysis failed:', error);
      return null;
    }
  }
}
