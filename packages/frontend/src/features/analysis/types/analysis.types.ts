export interface AnalysisScore {
  overall: number;
  activity: number;
  projectQuality: number;
  techStackDiversity: number;
  consistency: number;
}

export interface AiInsights {
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

export interface AnalysisResult {
  username: string;
  profile: {
    avatarUrl: string;
    bio: string | null;
    followers: number;
    company: string | null;
    location: string | null;
    publicRepos: number;
  };
  overallScore: number;
  scores: {
    activity: number;
    projectQuality: number;
    techStackDiversity: number;
    consistency: number;
  };
  aiInsights?: AiInsights;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  analyzedAt: string;
}

export interface AnalyzePortfolioRequest {
  username: string;
}

export interface CvAnalysisResult {
  summary: {
    critique: string;
    professionalLikelihood: number;
  };
  improvements: {
    category: string;
    suggestion: string;
    quote: string;
    rewritten: string;
  }[];
  missingKeywords: string[];
}

export interface LinkedInProfile {
  fullName: string;
  avatarUrl?: string;
}

export interface LinkedInAnalysisResult {
  summary: {
    text: string;
    seniorityGuess: string;
  };
  dimensions: {
    overall: number;
    profile: { score: number; status: string; insights: string[] };
    headline: { score: number; status: string; insights: string[] };
    experience: { score: number; status: string; insights: string[] };
    skills: { score: number; status: string; insights: string[] };
    branding: { score: number; status: string; insights: string[] };
  };
  recommendations: {
    headlines: string[];
    aboutSuggestions: {
      missing: string;
      rewritten: string;
    };
    experienceEdits: {
      role: string;
      company: string;
      improvements: string[];
    }[];
  };
  missingKeywords: string[];
  actionPlan: {
    thisWeek: string[];
    next30Days: string[];
    next60Days: string[];
  };
}
