import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { AnalysisResult } from '../types/analysis.types';
import DashboardGrid from './CommandCenter/DashboardGrid';
import FeaturedProjectWidget from './CommandCenter/FeaturedProjectWidget';
import HeroWidget from './CommandCenter/HeroWidget';
import PriorityRoadmapWidget from './CommandCenter/PriorityRoadmapWidget';
import TechnicalHealthWidget from './CommandCenter/TechnicalHealthWidget';

interface AnalysisDashboardProps {
  analysis: AnalysisResult;
}

export default function AnalysisDashboard({ analysis }: AnalysisDashboardProps) {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'transparent' }}>
      {/* Navigation - kept simple/top-left */}
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        <Button
          size="small"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
        >
          Back to Home
        </Button>
      </Container>


      <DashboardGrid
        hero={<HeroWidget analysis={analysis} />}
        health={<TechnicalHealthWidget scores={analysis.scores} />}
        roadmap={<PriorityRoadmapWidget analysis={analysis} />}
        projects={<FeaturedProjectWidget analysis={analysis} />}
      />
    </Box>
  );
}
