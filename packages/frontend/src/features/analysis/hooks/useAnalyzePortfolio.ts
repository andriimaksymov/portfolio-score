import { useMutation } from '@tanstack/react-query';
import { analyzePortfolio } from '../api/analysisApi';
import type { AnalyzePortfolioRequest } from '../types/analysis.types';

export const useAnalyzePortfolio = () => {
  return useMutation({
    mutationFn: (request: AnalyzePortfolioRequest) => analyzePortfolio(request),
  });
};
