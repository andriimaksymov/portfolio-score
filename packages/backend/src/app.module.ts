import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalysisModule } from './modules/analysis/analysis.module';
import { GithubModule } from './modules/github/github.module';
import { ScoringModule } from './modules/scoring/scoring.module';

import { AiModule } from './modules/ai/ai.module';
import { LinkedinModule } from './modules/linkedin/linkedin.module';
import { CvModule } from './modules/cv/cv.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../.env', '.env'],
      load: [configuration],
    }),
    AnalysisModule,
    GithubModule,
    ScoringModule,
    AiModule,
    LinkedinModule,
    CvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
