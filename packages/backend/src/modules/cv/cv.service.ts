import { Injectable, Logger } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

const pdf = require('pdf-parse');

@Injectable()
export class CvService {
  private readonly logger = new Logger(CvService.name);

  constructor(private readonly aiService: AiService) {}

  async processCv(buffer: Buffer) {
    this.logger.log('Processing CV PDF...');

    try {
      const data = await pdf(buffer);
      const text = data.text;

      this.logger.log(`Extracted ${text.length} characters from PDF.`);

      // Send to AI for analysis
      const analysis = await this.aiService.generateCvAnalysis(text);

      return {
        fullText: text,
        analysis,
      };
    } catch (error) {
      this.logger.error('Failed to parse PDF', error);
      throw new Error('Failed to parse PDF file.');
    }
  }
}
