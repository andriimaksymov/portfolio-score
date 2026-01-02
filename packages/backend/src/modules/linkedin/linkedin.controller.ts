import { Controller, Post, Body } from '@nestjs/common';
import { LinkedinService, LinkedInProfileDto } from './linkedin.service';

@Controller('linkedin')
export class LinkedinController {
  constructor(private readonly linkedinService: LinkedinService) {}

  @Post('analyze')
  async analyze(@Body() profile: LinkedInProfileDto) {
    return this.linkedinService.analyzeProfile(profile);
  }

  @Post('fetch')
  async fetch(@Body('url') url: string) {
    return this.linkedinService.fetchProfile(url);
  }
}
