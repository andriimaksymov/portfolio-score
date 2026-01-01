export interface AiAnalysisResponse {
  summary: string;
  careerPath: string;
  keyStrengths: string[];
  improvements: string[];
}

export interface AiAnalysisScores {
  activity: number;
  projectQuality: number;
  techStackDiversity: number;
  consistency: number;
}
