import { Injectable, Logger } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

import pdf from 'pdf-parse';

@Injectable()
export class CvService {
  private readonly logger = new Logger(CvService.name);

  constructor(private readonly aiService: AiService) {}

  async processCv(buffer: Buffer) {
    this.logger.log('Processing CV PDF...');

    try {
      const data: pdf.Result = await pdf(buffer);
      const text = data.text;

      this.logger.log(`Extracted ${text.length} characters from PDF.`);

      // Send to AI for analysis
      const analysis = await this.aiService.generateCvAnalysis(text);

      return {
        fullText: text,
        analysis,
      };
    } catch (error: any) {
      this.logger.error('Error during CV processing', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to process CV.';
      throw new Error(errorMessage);
    }
  }
}
