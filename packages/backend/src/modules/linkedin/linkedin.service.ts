import { Injectable, Logger } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ExperienceDto {
  @IsString()
  role: string;

  @IsString()
  company: string;

  @IsString()
  description: string;
}

export class LinkedInProfileDto {
  @IsString()
  fullName: string;

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experience: ExperienceDto[];

  @IsArray()
  @IsString({ each: true })
  skills: string[];
}

@Injectable()
export class LinkedinService {
  private readonly logger = new Logger(LinkedinService.name);

  constructor(private readonly aiService: AiService) {}

  async analyzeProfile(data: LinkedInProfileDto) {
    this.logger.log(`Analyzing LinkedIn profile for ${data.fullName}`);

    // In a real app, we might store this in a DB or perform additional validation

    const aiAnalysis = await this.aiService.generateLinkedinAnalysis({
      fullName: data.fullName,
      title: data.title,
      about: data.about,
      experience: data.experience,
      skills: data.skills,
    });

    return {
      profile: data,
      analysis: aiAnalysis,
      timestamp: new Date().toISOString(),
    };
  }

  async fetchProfile(url: string) {
    this.logger.log(`Fetching LinkedIn profile from ${url}`);

    // In a production environment with proper legal compliance and proxy infrastructure,
    // we would use Puppeteer or a third-party API here.
    // For this portfolio demonstration, we simulate the scraping process to show the architecture
    // while respecting LinkedIn's Terms of Service regarding unauthorized scraping.

    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

    const usernameMatch = url.match(/linkedin\.com\/in\/([^/]+)/);
    const username = usernameMatch ? usernameMatch[1] : 'User';
    const formattedName = username
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return {
      fullName: formattedName,
      title: 'Senior Software Engineer', // Simulated scraping result
      about: `Passionate ${formattedName} with a strong background in web development. (Simulated data extracted from public profile)`,
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'System Design'],
      experience: [
        {
          role: 'Senior Developer',
          company: 'Tech Giant Corp',
          description:
            'Leading frontend architecture and mentoring junior developers.',
        },
        {
          role: 'Software Engineer',
          company: 'StartUp Inc',
          description: 'Built full-stack features using React and NestJS.',
        },
      ],
    };
  }
}
