import apiClient from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import type { AnalysisResult, AnalyzePortfolioRequest } from '../types/analysis.types';

export const analyzePortfolio = async (
  request: AnalyzePortfolioRequest
): Promise<AnalysisResult> => {
  const response = await apiClient.post<AnalysisResult>(
    API_ENDPOINTS.ANALYZE_PORTFOLIO,
    request
  );
  return response.data;
};
