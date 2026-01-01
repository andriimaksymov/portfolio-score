import { IsString, IsNotEmpty } from 'class-validator';

export class AnalyzePortfolioDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
