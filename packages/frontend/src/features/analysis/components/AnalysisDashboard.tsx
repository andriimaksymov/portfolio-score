import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { AnalysisResult } from '../types/analysis.types';
import ActionChecklist from './ActionChecklist';
import AiInsightsCard from './AiInsightsCard';
import FlagshipProjects from './FlagshipProjects';
import MetricsChart from './MetricsChart';
import OverallScore from './OverallScore';
import ProfileSnapshot from './ProfileSnapshot';
import RecommendationsList from './RecommendationsList';
import ScoreCard from './ScoreCard';
import StrengthsWeaknesses from './StrengthsWeaknesses';

interface AnalysisDashboardProps {
  analysis: AnalysisResult;
}

export default function AnalysisDashboard({ analysis }: AnalysisDashboardProps) {
  const navigate = useNavigate();

  const { scores, strengths, weaknesses, recommendations, aiInsights } = analysis;

  return (
    <Box>
      <Box px={6} py={2}>
        <Button
          size="large"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          New Analysis
        </Button>
      </Box>

      {/* Profile Snapshot - Top Identity */}
      <ProfileSnapshot analysis={analysis} />

      {/* Overall Score & Top Level Stats */}
      <OverallScore analysis={analysis} />

      {/* Profile Shape & Detailed Metrics */}
      <Box px={6}>
        <Typography variant="h5" fontWeight="800" sx={{ mb: 3, color: 'var(--text-primary)' }}>
          📊 Metrics & Analysis
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5} lg={4}>
            <MetricsChart scores={scores} />
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <ScoreCard
                  label="Activity"
                  score={scores.activity}
                  description="Frequency and recency of your contributions."
                  insight={aiInsights?.metricInsights.activity}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ScoreCard
                  label="Quality"
                  score={scores.projectQuality}
                  description="Documentation and structure of your projects."
                  insight={aiInsights?.metricInsights.quality}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ScoreCard
                  label="Stack"
                  score={scores.techStackDiversity}
                  description="Breadth and depth of your technologies."
                  insight={aiInsights?.metricInsights.stack}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ScoreCard
                  label="Consistency"
                  score={scores.consistency}
                  description="Predictability of your coding habits."
                  insight={aiInsights?.metricInsights.consistency}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box px={6}>
        {/* Flagship Projects */}
        {aiInsights?.flagshipProjects && (
          <FlagshipProjects projects={aiInsights.flagshipProjects} />
        )}

        {/* AI Insights - Primary Value */}
        {aiInsights && <AiInsightsCard insights={aiInsights} />}

        {/* Strengths & Weaknesses */}
        <StrengthsWeaknesses strengths={strengths} weaknesses={weaknesses} />

        {/* 30-60 Day Action Plan */}
        <Box sx={{ mb: 6 }}>
          <ActionChecklist items={aiInsights?.checklist} username={analysis.username} />
          <RecommendationsList recommendations={recommendations} />
        </Box>
      </Box>
    </Box>
  );
}
