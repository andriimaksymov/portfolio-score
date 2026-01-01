import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AnalysisDashboard from '@/features/analysis/components/AnalysisDashboard';
import PageHeader from '@/shared/components/PageHeader';
import type { AnalysisResult } from '@/features/analysis/types/analysis.types';

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
    <Box>
      <PageHeader
        title="Analysis Results"
        subtitle="Review your portfolio analysis and recommendations"
        action={
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
          >
            Analyze Another
          </Button>
        }
      />

      <AnalysisDashboard analysis={analysis} />
    </Box>
  );
}
