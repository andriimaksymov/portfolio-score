import { Box, Paper, Typography, Stack, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import type { AnalysisResult } from '../types/analysis.types';

interface OverallScoreProps {
  analysis: AnalysisResult;
}

const getScoreColor = (score: number): string => {
  if (score >= 80) return '#4caf50'; // Expert/Advanced
  if (score >= 60) return '#3b82f6'; // Intermediate/Developing
  if (score >= 40) return '#ff9800'; // Beginner
  return '#ef4444'; // Needs focus
};

const getScoreLabel = (score: number): string => {
  if (score >= 90) return 'Expert';
  if (score >= 80) return 'Advanced';
  if (score >= 60) return 'Intermediate';
  if (score >= 40) return 'Developing';
  return 'Emerging';
};

const getScoreMessage = (score: number): string => {
  if (score >= 80) return 'Outstanding portfolio! You have a strong professional presence.';
  if (score >= 60) return 'Solid foundation. A few strategic tweaks could boost your impact.';
  if (score >= 40) return 'Good start. Focus on documentation and consistency to level up.';
  return 'Your portfolio is in the early stages. Follow the plan to build momentum.';
};

export default function OverallScore({ analysis }: OverallScoreProps) {
  const { overallScore: score, aiInsights } = analysis;
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <Box p={6}>
      <Paper
        sx={{
          p: { xs: 4, md: 5 },
          borderRadius: '24px',
          position: 'relative',
          overflow: 'hidden',
          mb: 3
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={6}
          alignItems="center"
          sx={{ position: 'relative', zIndex: 1 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 160,
              height: 160,
              borderRadius: '50%',
              border: `8px solid ${color}22`,
              bgcolor: `${color}11`,
              flexShrink: 0
            }}
          >
            <Typography
              variant="h3"
              fontWeight="900"
              sx={{ color: color, lineHeight: 1, mb: 0.5 }}
            >
              {score}
            </Typography>
            <Typography
              variant="caption"
              fontWeight="700"
              sx={{ color: color, textTransform: 'uppercase', letterSpacing: 1 }}
            >
              {label}
            </Typography>
          </Box>

          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flexGrow: 1 }}>
            <Typography variant="overline" sx={{ color: 'var(--text-secondary)', letterSpacing: 2, fontWeight: 700 }}>
              Portfolio Reputation Score
            </Typography>
            <Typography variant="h4" fontWeight="800" color="var(--text-primary)" sx={{ mb: 1, mt: 0.5 }}>
              Level: {label}
            </Typography>
            <Typography variant="h6" sx={{ color: 'var(--text-secondary)', fontWeight: 400, maxWidth: 600 }}>
              {getScoreMessage(score)}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Overview Section */}
      {aiInsights?.overview && (
        <Grid container spacing={3} className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <Grid item xs={12} md={4}>
            <Paper className="glass-card" sx={{ p: 3, height: '100%', borderRadius: '16px' }}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 1.5 }}>
                <InfoIcon sx={{ color: 'var(--accent-primary)', mt: 0.3 }} />
                <Typography variant="subtitle1" fontWeight="700" color="var(--text-primary)">
                  Where you are now
                </Typography>
              </Stack>
              <Typography variant="body2" color="var(--text-secondary)" sx={{ lineHeight: 1.6 }}>
                {aiInsights.overview.current}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="glass-card" sx={{ p: 3, height: '100%', borderRadius: '16px' }}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 1.5 }}>
                <CheckCircleIcon sx={{ color: 'var(--accent-secondary)', mt: 0.3 }} />
                <Typography variant="subtitle1" fontWeight="700" color="var(--text-primary)">
                  What is working
                </Typography>
              </Stack>
              <Typography variant="body2" color="var(--text-secondary)" sx={{ lineHeight: 1.6 }}>
                {aiInsights.overview.working}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="glass-card" sx={{ p: 3, height: '100%', borderRadius: '16px' }}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 1.5 }}>
                <PriorityHighIcon sx={{ color: '#ef4444', mt: 0.3 }} />
                <Typography variant="subtitle1" fontWeight="700" color="var(--text-primary)">
                  What to fix first
                </Typography>
              </Stack>
              <Typography variant="body2" color="var(--text-secondary)" sx={{ lineHeight: 1.6 }}>
                {aiInsights.overview.fixFirst}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
