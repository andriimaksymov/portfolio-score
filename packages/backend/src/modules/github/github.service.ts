import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GithubService {
  private readonly apiBaseUrl: string;
  private readonly apiToken: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiBaseUrl =
      this.configService.get<string>('github.apiBaseUrl') ||
      'https://api.github.com';
    this.apiToken = this.configService.get<string>('github.apiToken') || '';
  }

  async getUserData(username: string) {
    try {
      const headers = this.apiToken
        ? { Authorization: `token ${this.apiToken}` }
        : {};

      // Fetch user profile
      const userResponse = await firstValueFrom(
        this.httpService.get(`${this.apiBaseUrl}/users/${username}`, {
          headers,
        }),
      );

      // Fetch user repositories
      const reposResponse = await firstValueFrom(
        this.httpService.get(
          `${this.apiBaseUrl}/users/${username}/repos?per_page=100&sort=updated`,
          { headers },
        ),
      );

      // Fetch user events (for activity analysis)
      const eventsResponse = await firstValueFrom(
        this.httpService.get(
          `${this.apiBaseUrl}/users/${username}/events/public?per_page=100`,
          { headers },
        ),
      );

      return {
        profile: userResponse.data,
        repositories: reposResponse.data,
        events: eventsResponse.data,
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException(`GitHub user '${username}' not found`);
      }
      throw error;
    }
  }
}
