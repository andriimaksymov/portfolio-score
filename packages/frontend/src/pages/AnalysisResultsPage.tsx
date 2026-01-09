import AnalysisDashboard from '@/features/analysis/components/AnalysisDashboard';
import type { AnalysisResult } from '@/features/analysis/types/analysis.types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Stack } from '@mui/material';
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
    <Stack spacing={2} p={6}>
      <div>
        <Button
          size="large"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          New Analysis
        </Button>
      </div>

      <AnalysisDashboard analysis={analysis} />
    </Stack>
  );
}
