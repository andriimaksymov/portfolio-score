import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { analyzePortfolio } from '../api/analysisApi';
import type { AnalyzePortfolioRequest } from '../types/analysis.types';

export const useAnalyzePortfolio = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (request: AnalyzePortfolioRequest) => analyzePortfolio(request),
    onSuccess: (data) => {
      // Navigate to results page with the analysis data
      navigate('/results', { state: { analysis: data } });
    },
  });
};
