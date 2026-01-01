import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { GithubModule } from '../github/github.module';
import { ScoringModule } from '../scoring/scoring.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [GithubModule, ScoringModule, AiModule],
  controllers: [AnalysisController],
  providers: [AnalysisService],
  exports: [AnalysisService],
})
export class AnalysisModule {}
