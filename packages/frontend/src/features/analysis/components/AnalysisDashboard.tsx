import { Box, Grid, Typography, Chip } from '@mui/material';
import OverallScore from './OverallScore';
import ScoreCard from './ScoreCard';
import StrengthsWeaknesses from './StrengthsWeaknesses';
import RecommendationsList from './RecommendationsList';
import AiInsightsCard from './AiInsightsCard';
import type { AnalysisResult } from '../types/analysis.types';

interface AnalysisDashboardProps {
  analysis: AnalysisResult;
}

export default function AnalysisDashboard({ analysis }: AnalysisDashboardProps) {
  const { username, overallScore, scores, strengths, weaknesses, recommendations, analyzedAt, aiInsights } = analysis;

  return (
    <Box>
      {/* AI Insights Section - Top Priority */}
      {aiInsights && <AiInsightsCard insights={aiInsights} />}

      {/* Overall Score */}
      <OverallScore score={overallScore} username={username} />

      {/* Analyzed Date */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4 }}>
        <Chip
          label={`Analyzed on ${new Date(analyzedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}`}
          variant="outlined"
          size="small"
        />
      </Box>

      {/* Individual Scores */}
      <Typography variant="h5" gutterBottom fontWeight="medium" sx={{ mb: 2 }}>
        📊 Detailed Scores
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <ScoreCard
            label="Activity"
            score={scores.activity}
            description="Based on repos, followers, stars, and recent activity"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ScoreCard
            label="Project Quality"
            score={scores.projectQuality}
            description="Repository documentation, descriptions, and maintenance"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ScoreCard
            label="Tech Stack"
            score={scores.techStackDiversity}
            description="Diversity of programming languages and technologies"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ScoreCard
            label="Consistency"
            score={scores.consistency}
            description="Regular contribution pattern and sustained activity"
          />
        </Grid>
      </Grid>

      {/* Strengths & Weaknesses */}
      <StrengthsWeaknesses strengths={strengths} weaknesses={weaknesses} />

      {/* Recommendations */}
      <Box sx={{ mt: 4 }}>
        <RecommendationsList recommendations={recommendations} />
      </Box>
    </Box>
  );
}
