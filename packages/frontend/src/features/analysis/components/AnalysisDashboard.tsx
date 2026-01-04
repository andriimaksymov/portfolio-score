import { Box, Grid, Typography, Paper, Stack, Checkbox, FormControlLabel } from '@mui/material';
import OverallScore from './OverallScore';
import ScoreCard from './ScoreCard';
import StrengthsWeaknesses from './StrengthsWeaknesses';
import RecommendationsList from './RecommendationsList';
import AiInsightsCard from './AiInsightsCard';
import TimelineIcon from '@mui/icons-material/Timeline';
import ChecklistIcon from '@mui/icons-material/Checklist';
import type { AnalysisResult } from '../types/analysis.types';

interface AnalysisDashboardProps {
  analysis: AnalysisResult;
}

export default function AnalysisDashboard({ analysis }: AnalysisDashboardProps) {
  const { overallScore, scores, strengths, weaknesses, recommendations, aiInsights } = analysis;

  return (
    <Box>
      {/* Overall Score & Top Level Stats */}
      <OverallScore score={overallScore} />

      {/* AI Insights - Primary Value */}
      {aiInsights && <AiInsightsCard insights={aiInsights} />}

      {/* Detailed Scores Grid */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" fontWeight="800" sx={{ mb: 3, color: 'var(--text-primary)' }}>
          📊 Detailed Activity Metrics
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <ScoreCard
              label="Activity"
              score={scores.activity}
              description="Frequency and recency of your contributions."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ScoreCard
              label="Quality"
              score={scores.projectQuality}
              description="Documentation and structure of your projects."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ScoreCard
              label="Stack"
              score={scores.techStackDiversity}
              description="Breadth and depth of your technologies."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ScoreCard
              label="Consistency"
              score={scores.consistency}
              description="Predictability of your coding habits."
            />
          </Grid>
        </Grid>
      </Box>

      {/* Strengths & Weaknesses */}
      <StrengthsWeaknesses strengths={strengths} weaknesses={weaknesses} />

      {/* 30-60 Day Action Plan */}
      <Paper className="glass-card" sx={{ p: { xs: 3, md: 5 }, mb: 4, borderRadius: '24px' }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
          <TimelineIcon sx={{ color: 'var(--accent-primary)', fontSize: 32 }} />
          <Typography variant="h4" fontWeight="800" color="var(--text-primary)">
            30–60 Day Strategic Action Plan
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
              <Typography variant="h6" fontWeight="700" color="var(--accent-primary)" gutterBottom>
                Phase 1: Foundation (Days 1–15)
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                Focus on high-impact visual wins. Update READMEs for your top 3 repos and pin them to your profile. Clean up repository descriptions and add clear project titles.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
              <Typography variant="h6" fontWeight="700" color="var(--accent-primary)" gutterBottom>
                Phase 2: Depth (Days 16–45)
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                Ship one significant feature or refactor per week. Aim to increase your commit frequency. Deploy at least two projects to live URLs (Vercel, Netlify) and add links to repo descriptions.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
              <Typography variant="h6" fontWeight="700" color="var(--accent-primary)" gutterBottom>
                Phase 3: Impact (Days 46–60)
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                Contribute to one external open-source project. Summarize your top achievements into a LinkedIn post. Refine your bio to reflect the tech stack you want to be hired for.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Portfolio Checklist */}
      <Paper className="glass-card" sx={{ p: { xs: 3, md: 5 }, borderRadius: '24px', mb: 4 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
          <ChecklistIcon sx={{ color: 'var(--accent-primary)', fontSize: 32 }} />
          <Typography variant="h4" fontWeight="800" color="var(--text-primary)">
            Portfolio Readiness Checklist
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          {[
            'Polished READMEs for top 3 repositories',
            'Live demo links for all current major projects',
            'Professional profile photo and bio',
            'Accurate skill tags on repositories',
            'Pinned repositories reflecting current expertise',
            'Clean and consistent commit history'
          ].map((item, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: 'rgba(255, 255, 255, 0.3)',
                      '&.Mui-checked': { color: 'var(--accent-primary)' }
                    }}
                  />
                }
                label={
                  <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>
                    {item}
                  </Typography>
                }
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Recommendations */}
      <RecommendationsList recommendations={recommendations} />
    </Box>
  );
}
