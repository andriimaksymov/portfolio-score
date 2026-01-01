export interface AnalysisScore {
  overall: number;
  activity: number;
  projectQuality: number;
  techStackDiversity: number;
  consistency: number;
}

export interface AnalysisResult {
  username: string;
  overallScore: number;
  scores: {
    activity: number;
    projectQuality: number;
    techStackDiversity: number;
    consistency: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  analyzedAt: string;
}

export interface AnalyzePortfolioRequest {
  username: string;
}
