import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, Paper, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AnalysisDashboard from '@/features/analysis/components/AnalysisDashboard';
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

  const { username, analyzedAt } = analysis;

  return (
    <Box sx={{ pb: 8 }}>
      {/* Hero Container */}
      <Box
        sx={{
          pt: { xs: 4, md: 8 },
          pb: { xs: 6, md: 10 },
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Paper
            className="glass-card animate-fade-up"
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="800"
                gutterBottom
                sx={{
                  background: 'linear-gradient(45deg, #a5bcc7ff 20%, #b6c2d7ff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Analysis Results
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="h6" fontWeight="600" color="var(--text-primary)">
                  {username}
                </Typography>
                <Box
                  sx={{
                    height: '4px',
                    width: '4px',
                    borderRadius: '50%',
                    bgcolor: 'var(--text-secondary)'
                  }}
                />
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                  Analyzed on {new Date(analyzedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ color: 'var(--text-secondary)', maxWidth: 600 }}>
                Review your portfolio analysis and recommendations to level up your professional presence.
              </Typography>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => alert('LinkedIn Summary copied to clipboard!')}
                sx={{
                  borderRadius: '12px',
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  textTransform: 'none',
                  borderColor: 'rgba(59, 130, 246, 0.3)',
                  color: 'var(--text-primary)',
                  '&:hover': {
                    borderColor: 'var(--accent-primary)',
                    bgcolor: 'rgba(59, 130, 246, 0.05)',
                  }
                }}
              >
                Share on LinkedIn
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => alert('Exporting to PDF...')}
                sx={{
                  borderRadius: '12px',
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  textTransform: 'none',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-secondary)',
                }}
              >
                Export PDF
              </Button>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/')}
                sx={{
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                New Analysis
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <AnalysisDashboard analysis={analysis} />
      </Container>
    </Box>
  );
}
