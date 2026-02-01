export interface AiAnalysisResponse {
  summary: string;
  careerPath: string;
  keyStrengths: string[];
  improvements: string[];
  overview: {
    current: string;
    working: string;
    fixFirst: string;
  };
  profileSummary: string;
  flagshipProjects: {
    name: string;
    reason: string;
    url: string;
    stars: number;
    technologies: string[];
    improvements: string[];
  }[];
  metricInsights: {
    activity: string;
    quality: string;
    stack: string;
    consistency: string;
  };
  checklist: {
    item: string;
    metricTag: string;
  }[];
}

export interface AiAnalysisScores {
  activity: number;
  projectQuality: number;
  techStackDiversity: number;
  consistency: number;
}
