import client from '@/api/client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { Box, Button, Chip, CircularProgress, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CvAnalysisPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [analysisState, setAnalysisState] = useState<{
    loading: boolean;
    text: string;
    analysis: any;
    error: string | null;
  }>({
    loading: true,
    text: '',
    analysis: null,
    error: null,
  });

  const file = location.state?.file;

  useEffect(() => {
    if (!file) {
      setAnalysisState(s => ({ ...s, loading: false, error: 'No file provided' }));
      return;
    }

    const uploadAndAnalyze = async () => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await client.post('/cv/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        setAnalysisState({
          loading: false,
          text: res.data.fullText,
          analysis: res.data.analysis,
          error: null
        });
      } catch (err: any) {
        console.error(err);
        setAnalysisState({
          loading: false,
          text: '',
          analysis: null,
          error: err.response?.data?.message || 'Failed to analyze CV'
        });
      }
    };

    uploadAndAnalyze();
  }, [file]);

  if (analysisState.loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} thickness={4} sx={{ color: 'var(--accent-primary)' }} />
        <Typography variant="h5" fontWeight="700" sx={{ mt: 3, color: 'var(--text-primary)' }}>Analyzing your CV...</Typography>
        <Typography color="var(--text-secondary)">Extracting experience and matching against job markets.</Typography>
      </Box>
    );
  }

  if (analysisState.error) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Paper className="glass-card" sx={{ p: 4, borderRadius: '24px' }}>
          <Typography color="error" variant="h6" gutterBottom>{analysisState.error}</Typography>
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

  const { analysis, text } = analysisState;
  const score = analysis.summary.professionalLikelihood;
  const scoreColor = score >= 70 ? '#4caf50' : score >= 50 ? '#ff9800' : '#ef4444';

  return (
    <Box p={6} sx={{ pb: 8 }}>
      <Button
        color='secondary'
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 4 }}
      >
        Back to Home
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Stack spacing={4}>
            {/* Professional Score Card */}
            <Paper className="glass-card" sx={{ p: { xs: 4, md: 5 }, borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
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

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    border: `6px solid ${scoreColor}22`,
                    bgcolor: `${scoreColor}11`,
                    flexShrink: 0
                  }}
                >
                  <Typography variant="h2" fontWeight="900" sx={{ color: scoreColor }}>
                    {score}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                  <Typography variant="overline" sx={{ color: 'var(--text-secondary)', letterSpacing: 2 }}>
                    Professional Score
                  </Typography>
                  <Typography variant="h5" fontWeight="700" sx={{ color: 'var(--text-primary)', mb: 1 }}>
                    {score >= 80 ? 'Strong Candidate Profile' : score >= 60 ? 'Competitive Profile' : 'Foundational Profile'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text-secondary)', maxWidth: 450 }}>
                    Based on keyword matching, experience density, and document structure.
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            {/* AI Critique Section */}
            <Paper className="glass-card" sx={{ p: { xs: 3, md: 5 }, borderRadius: '24px', borderLeft: '4px solid var(--accent-primary)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AutoAwesomeIcon sx={{ color: 'var(--accent-primary)', mr: 2, fontSize: 32 }} />
                <Typography variant="h4" fontWeight="800" color="var(--text-primary)">
                  AI Critique
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                {analysis.summary.critique.split('\n\n').map((p: string, i: number) => (
                  <Typography key={i} variant="body1" sx={{ color: 'var(--text-secondary)', mb: 2, lineHeight: 1.7, fontSize: '1.05rem' }}>
                    {p}
                  </Typography>
                ))}
              </Box>

              <Box sx={{ p: 3, borderRadius: '16px', bgcolor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <Typography variant="overline" sx={{ color: 'var(--text-secondary)', letterSpacing: 2, mb: 1, display: 'block' }}>
                  Key Takeaways
                </Typography>
                <List dense>
                  {[
                    'Proven experience with modern front-end stack (React, TypeScript)',
                    'Success in leading end-to-end greenfield projects',
                    'Opportunity to quantify impact with specific business metrics'
                  ].map((item, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleOutlineIcon sx={{ color: 'var(--accent-primary)', fontSize: 20 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{ variant: 'body2', color: 'var(--text-secondary)' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>

            {/* Improvements Section */}
            <Box>
              <Typography variant="h5" fontWeight="800" sx={{ mb: 3, color: 'var(--text-primary)' }}>
                🎯 Line-by-Line Improvements
              </Typography>
              <Stack spacing={3}>
                {analysis.improvements.map((imp: any, i: number) => {
                  const clean = (str: string) => str?.replace(/^["']|["']$/g, '').replace(/\.\.$/, '.').trim() || '';
                  const cleanQuote = clean(imp.quote);
                  const cleanSuggestion = clean(imp.suggestion);
                  const cleanRewritten = clean(imp.rewritten);

                  return (
                    <Paper key={i} className="glass-card" sx={{ p: 3, borderRadius: '20px' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle2" fontWeight="700" color="var(--accent-primary)" sx={{ textTransform: 'uppercase' }}>
                          {imp.category || 'Content Optimization'}
                        </Typography>
                        <Chip label="Impact Focus" size="small" sx={{ bgcolor: 'rgba(255,152,0,0.1)', color: '#ff9800', fontWeight: 600, fontSize: '0.7rem' }} />
                      </Box>

                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 2, fontStyle: 'italic', fontWeight: 500 }}>
                        {cleanSuggestion || 'Clarify the scale and impact of your work with more specific details.'}
                      </Typography>

                      <Stack spacing={2}>
                        <Box sx={{ p: 2, borderRadius: '12px', bgcolor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: 1, mb: 1, display: 'block' }}>
                            Original
                          </Typography>
                          <Typography variant="body2" color="var(--text-secondary)">
                            {cleanQuote}
                          </Typography>
                        </Box>
                        {cleanRewritten && (
                          <Box sx={{ p: 2, borderRadius: '12px', bgcolor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                            <Typography variant="caption" sx={{ color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: 1, mb: 1, display: 'block', fontWeight: 700 }}>
                              Try This
                            </Typography>
                            <Typography variant="body2" color="var(--text-primary)" fontWeight="500">
                              {cleanRewritten}
                            </Typography>
                          </Box>
                        )}
                      </Stack>
                    </Paper>
                  );
                })}
              </Stack>
            </Box>

            {/* Missing Keywords Card */}
            {analysis.missingKeywords?.length > 0 && (
              <Paper className="glass-card" sx={{ p: 4, borderRadius: '24px' }}>
                <Typography variant="h5" fontWeight="800" gutterBottom>
                  Missing Keywords
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3 }}>
                  These terms are commonly found in senior engineering roles. Consider incorporating them into your experience bullets where they reflect your real contributions.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {analysis.missingKeywords.map((kw: string) => (
                    <Chip
                      key={kw}
                      label={kw}
                      sx={{
                        bgcolor: 'rgba(255, 82, 82, 0.1)',
                        color: '#ff5252',
                        fontWeight: 600,
                        borderRadius: '8px',
                        '&:hover': { bgcolor: 'rgba(255, 82, 82, 0.2)' }
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} lg={5}>
          {/* CV Preview Section */}
          <Box sx={{ position: { lg: 'sticky' }, top: 100 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
              <HistoryEduIcon sx={{ color: 'var(--text-secondary)' }} />
              <Typography variant="h5" fontWeight="800">
                CV Preview
              </Typography>
            </Stack>
            <Paper
              className="glass-card"
              sx={{
                p: 4,
                height: { xs: '500px', lg: '80vh' },
                overflowY: 'auto',
                borderRadius: '24px',
                bgcolor: 'rgba(0, 0, 0, 0.2)'
              }}
            >
              <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {text.split('\n').map((line: string, i: number) => {
                  // Highlight logic
                  const isSectionHeader = /^[A-Z\s]{4,20}$/.test(line.trim()) && line.trim().length > 0;

                  let content: any = line;
                  analysis.improvements.forEach((imp: any) => {
                    if (line.includes(imp.quote)) {
                      const parts = line.split(imp.quote);
                      content = (
                        <span>
                          {parts[0]}
                          <span style={{ backgroundColor: 'rgba(255, 152, 0, 0.2)', color: 'var(--text-primary)', padding: '2px 0', borderBottom: '2px solid #ff9800' }}>
                            {imp.quote}
                          </span>
                          {parts[1]}
                        </span>
                      );
                    }
                  });

                  return (
                    <div
                      key={i}
                      style={{
                        marginBottom: '0.4em',
                        fontWeight: isSectionHeader ? 800 : 400,
                        color: isSectionHeader ? 'var(--text-primary)' : 'inherit',
                        fontSize: isSectionHeader ? '1.1rem' : '1rem',
                        marginTop: isSectionHeader ? '1.5em' : '0'
                      }}
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
