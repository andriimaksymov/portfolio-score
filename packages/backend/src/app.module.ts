import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalysisModule } from './modules/analysis/analysis.module';
import { GithubModule } from './modules/github/github.module';
import { ScoringModule } from './modules/scoring/scoring.module';

import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AnalysisModule,
    GithubModule,
    ScoringModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
