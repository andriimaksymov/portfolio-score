import AnalysisDashboard from '@/features/analysis/components/AnalysisDashboard';
import type { AnalysisResult } from '@/features/analysis/types/analysis.types';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AnalysisResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis as AnalysisResult | undefined;

  // If no analysis data, redirect to home
  if (!analysis) {
    navigate('/');
    return null;
  }

  return (
    <AnalysisDashboard analysis={analysis} />
  );
}
