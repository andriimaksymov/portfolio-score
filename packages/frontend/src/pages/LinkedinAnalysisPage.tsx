import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Container,
  Grid,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarsIcon from '@mui/icons-material/Stars';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import client from '@/api/client';

export default function LinkedinAnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const targetUrl = queryParams.get('url');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!targetUrl) {
      setError('No LinkedIn URL provided.');
      setLoading(false);
      return;
    }

    const runAnalysis = async () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      try {
        const res = await client.post('/linkedin/analyze-url', { url: targetUrl });
        setData(res.data);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to analyze LinkedIn profile.');
        setLoading(false);
      }
    };

    runAnalysis();
  }, [targetUrl]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} thickness={4} sx={{ color: '#0a66c2' }} />
        <Typography variant="h5" fontWeight="700" sx={{ mt: 3, color: 'var(--text-primary)' }}>Analyzing LinkedIn Profile...</Typography>
        <Typography color="var(--text-secondary)">Scraping public data and running AI optimization.</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Paper className="glass-card" sx={{ p: 4, borderRadius: '24px' }}>
          <Typography color="error" variant="h6" gutterBottom>{error}</Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ mt: 2, borderRadius: '12px', textTransform: 'none' }}
          >
            Try Again
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!data?.analysis) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Paper className="glass-card" sx={{ p: 4, borderRadius: '24px' }}>
          <Typography variant="h6" gutterBottom>Analysis Unavailable</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            We could fetch the profile, but the AI analysis failed. This might be due to API limits or a temporary issue.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ borderRadius: '12px', textTransform: 'none' }}
          >
            Try Again
          </Button>
        </Paper>
      </Container>
    );
  }

  const { profile, analysis } = data;
  const overallScore = analysis.dimensions.overall;
  const scoreColor = overallScore >= 80 ? '#4caf50' : overallScore >= 60 ? '#0a66c2' : '#ff9800';

  return (
    <Box sx={{ pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 4, md: 8 },
          pb: { xs: 6, md: 10 },
          background: 'linear-gradient(to bottom, rgba(10, 102, 194, 0.05) 0%, transparent 100%)',
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
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: 4
            }}
          >
            <Box>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <LinkedInIcon sx={{ color: '#0a66c2', fontSize: 40 }} />
                <Typography variant="h3" fontWeight="800" sx={{ color: 'var(--text-primary)' }}>
                  LinkedIn Optimization Results
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ color: 'var(--text-secondary)', maxWidth: 600 }}>
                Analysis for <strong>{profile.fullName}</strong>. Seniority Guess: <strong>{analysis.summary.seniorityGuess}</strong>
              </Typography>
            </Box>

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
              Analyze Another Profile
            </Button>
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Main Score & Dimensions */}
          <Grid item xs={12} md={5}>
            <Stack spacing={4}>
              {/* Overall Score Card */}
              <Paper className="glass-card" sx={{ p: 4, borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${scoreColor}33 0%, transparent 70%)`,
                    filter: 'blur(40px)',
                    zIndex: 0
                  }}
                />

                <Stack spacing={3} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 160,
                      height: 160,
                      borderRadius: '50%',
                      border: `8px solid ${scoreColor}22`,
                      bgcolor: `${scoreColor}11`,
                    }}
                  >
                    <Typography variant="h2" fontWeight="900" sx={{ color: scoreColor, lineHeight: 1 }}>
                      {overallScore}
                    </Typography>
                    <Typography variant="caption" sx={{ color: scoreColor, fontWeight: 700, opacity: 0.8 }}>
                      SCORE / 100
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="700" sx={{ color: 'var(--text-primary)', mb: 1 }}>
                      {overallScore >= 80 ? 'All-Star Profile' : overallScore >= 60 ? 'Professional Grade' : 'Needs Optimization'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                      {analysis.summary.text}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              {/* Dimension Cards */}
              <Typography variant="h6" fontWeight="800" sx={{ mt: 2, mb: -2 }}>
                Dimension Breakdown
              </Typography>
              {Object.entries(analysis.dimensions).filter(([key]) => key !== 'overall').map(([key, dim]: [string, any]) => (
                <Paper key={key} className="glass-card" sx={{ p: 3, borderRadius: '20px' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                    <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-secondary)' }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Typography>
                    <Chip
                      label={`${dim.score}%`}
                      size="small"
                      sx={{
                        bgcolor: dim.score >= 80 ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                        color: dim.score >= 80 ? '#4caf50' : '#ff9800',
                        fontWeight: 800,
                        borderRadius: '6px'
                      }}
                    />
                  </Stack>
                  <Typography variant="body2" fontWeight="700" color="var(--text-primary)" sx={{ mb: 1 }}>
                    Status: {dim.status}
                  </Typography>
                  <List dense sx={{ py: 0 }}>
                    {dim.insights.map((insight: string, i: number) => (
                      <ListItem key={i} disableGutters sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <StarsIcon sx={{ fontSize: 14, color: '#0a66c2' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={insight}
                          primaryTypographyProps={{ variant: 'caption', color: 'var(--text-secondary)' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              ))}
            </Stack>
          </Grid>

          {/* Strategic Action Sections */}
          <Grid item xs={12} md={7}>
            <Stack spacing={4}>
              {/* Strategic Edits section */}
              <Box>
                <Typography variant="h5" fontWeight="800" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <TipsAndUpdatesIcon sx={{ color: '#0a66c2' }} />
                  Strategic Edits
                </Typography>

                <Stack spacing={3}>
                  {/* Headlines Card */}
                  <Paper className="glass-card" sx={{ p: 4, borderRadius: '24px', borderLeft: '4px solid #0a66c2' }}>
                    <Typography variant="h6" fontWeight="700" gutterBottom>Recommended Headlines</Typography>
                    <Typography variant="body2" color="var(--text-secondary)" sx={{ mb: 3 }}>
                      Try one of these punchy, keyword-optimized headlines to stand out to recruiters:
                    </Typography>
                    <Stack spacing={2}>
                      {analysis.recommendations.headlines.map((headline: string, i: number) => (
                        <Box
                          key={i}
                          sx={{
                            p: 2,
                            borderRadius: '12px',
                            bgcolor: 'rgba(10, 102, 194, 0.05)',
                            border: '1px solid rgba(10, 102, 194, 0.1)',
                            position: 'relative'
                          }}
                        >
                          <Typography variant="body2" color="var(--text-primary)" fontWeight="500">
                            {headline}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>

                  {/* About Section rewrite */}
                  <Paper className="glass-card" sx={{ p: 4, borderRadius: '24px' }}>
                    <Typography variant="h6" fontWeight="700" gutterBottom>About Section Optimization</Typography>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="caption" sx={{ color: '#ff9800', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
                        What's Missing:
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mt: 0.5 }}>
                        {analysis.recommendations.aboutSuggestions.missing}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 3, borderRadius: '16px', bgcolor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <Typography variant="caption" sx={{ color: 'var(--accent-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, mb: 1, display: 'block' }}>
                        The "Pitch-Perfect" Rewrite:
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.7 }}>
                        "{analysis.recommendations.aboutSuggestions.rewritten}"
                      </Typography>
                    </Box>
                  </Paper>

                  {/* Experience Edits */}
                  <Box>
                    <Typography variant="h6" fontWeight="700" sx={{ mb: 2, mt: 1 }}>Experience Bullet Optimization</Typography>
                    <Stack spacing={3}>
                      {analysis.recommendations.experienceEdits.map((item: any, i: number) => (
                        <Paper key={i} className="glass-card" sx={{ p: 3, borderRadius: '20px' }}>
                          <Typography variant="subtitle1" fontWeight="800" sx={{ color: '#0a66c2', mb: 2 }}>
                            {item.role} @ {item.company}
                          </Typography>
                          <List dense>
                            {item.improvements.map((bullet: string, j: number) => (
                              <ListItem key={j} disableGutters sx={{ alignItems: 'flex-start', mb: 1 }}>
                                <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                                  <TrendingUpIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                                </ListItemIcon>
                                <ListItemText
                                  primary={bullet}
                                  primaryTypographyProps={{ variant: 'body2', color: 'var(--text-secondary)', lineHeight: 1.6 }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </Box>

              {/* Action Plan */}
              <Box>
                <Typography variant="h5" fontWeight="800" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <AutoAwesomeIcon sx={{ color: '#0a66c2' }} />
                  30-60 Day Roadmap
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { title: 'This Week', items: analysis.actionPlan.thisWeek, color: '#ef4444' },
                    { title: 'Next 30 Days', items: analysis.actionPlan.next30Days, color: '#3b82f6' },
                    { title: 'Next 60 Days', items: analysis.actionPlan.next60Days, color: '#10b981' }
                  ].map((phase, i) => (
                    <Grid item xs={12} key={i}>
                      <Paper className="glass-card" sx={{ p: 3, borderRadius: '20px', borderLeft: `4px solid ${phase.color}` }}>
                        <Typography variant="subtitle2" fontWeight="800" sx={{ color: phase.color, mb: 1.5, textTransform: 'uppercase' }}>
                          {phase.title}
                        </Typography>
                        <List dense>
                          {phase.items.map((item: string, j: number) => (
                            <ListItem key={j} disableGutters sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 28 }}>
                                <CheckCircleOutlineIcon sx={{ fontSize: 16, color: 'var(--text-secondary)', opacity: 0.5 }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={item}
                                primaryTypographyProps={{ variant: 'body2', color: 'var(--text-secondary)' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Missing Keywords */}
              <Paper className="glass-card" sx={{ p: 4, borderRadius: '24px' }}>
                <Typography variant="h6" fontWeight="700" gutterBottom>Missing Keywords</Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3 }}>
                  Based on your seniority level, these skills are highly sought after by recruiters:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {analysis.missingKeywords.map((kw: string) => (
                    <Chip
                      key={kw}
                      label={kw}
                      sx={{
                        bgcolor: 'rgba(102, 102, 102, 0.1)',
                        color: 'var(--text-secondary)',
                        fontWeight: 600,
                        borderRadius: '8px'
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
