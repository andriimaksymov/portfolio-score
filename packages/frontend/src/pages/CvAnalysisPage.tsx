import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, CircularProgress, Button, Grid, Chip, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import client from '@/api/client';

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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
        <CircularProgress size={60} />
        <Typography variant="h5" sx={{ mt: 3 }}>Analyzing your CV...</Typography>
        <Typography color="text.secondary">Reading PDF content and checking for improvements.</Typography>
      </Box>
    );
  }

  if (analysisState.error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error" variant="h6">{analysisState.error}</Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>Go Back</Button>
      </Box>
    );
  }

  const { analysis, text } = analysisState;

  return (
    <Box maxWidth="xl" sx={{ mx: 'auto' }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
        Upload Another
      </Button>

      <Grid container spacing={3}>
        {/* Left Col: Analysis & Improvements */}
        <Grid item xs={12} md={5}>
          <Typography variant="h5" align="center" gutterBottom fontWeight="bold">AI Critique</Typography>
          <Paper sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>

            {/* Summary Score */}
            <Stack spacing={3} sx={{ mb: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography variant="subtitle1">PROFESSIONAL SCORE</Typography>
                <Typography variant="h3" color="primary.main" fontWeight="800">
                  {analysis.summary.professionalLikelihood}/100
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                {analysis.summary.critique}
              </Typography>
            </Stack>

            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>IMPROVEMENTS</Typography>
            {analysis.improvements.map((imp: any, i: number) => (
              <Paper key={i} variant="outlined" sx={{ p: 2, mb: 2, borderColor: imp.category === 'Impact' ? 'warning.light' : 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Chip label={imp.category} size="small" color={imp.category === 'Impact' ? 'warning' : 'default'} />
                </Box>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  Original: "{imp.quote}"
                </Typography>
                <Typography variant="body2" fontWeight="500" gutterBottom>
                  {imp.suggestion}
                </Typography>
                {imp.rewritten && (
                  <Box sx={{ mt: 1, p: 1, bgcolor: '#f5f5f5', borderRadius: 1, fontSize: '0.875rem' }}>
                    <strong>Try:</strong> {imp.rewritten}
                  </Box>
                )}
              </Paper>
            ))}

            {analysis.missingKeywords?.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>MISSING KEYWORDS</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {analysis.missingKeywords.map((kw: string) => (
                    <Chip key={kw} label={kw} color="error" variant="outlined" size="small" />
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Right Col: Document Preview */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
            CV Preview
          </Typography>
          <Paper sx={{ p: 2, height: '80vh', overflowY: 'auto', bgcolor: '#fafafa' }}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'serif', lineHeight: 1.8 }}>
              {/*
                   Naive highlighting implementation:
                   Check if any improvement quote exists in text and wrap it.
                 */}
              {text.split('\n').map((line: string, i: number) => {
                let lineContent: any = line;
                // Check matches
                analysis.improvements.forEach((imp: any) => {
                  if (line.includes(imp.quote)) {
                    const parts = line.split(imp.quote);
                    lineContent = (
                      <span>
                        {parts[0]}
                        <span style={{ backgroundColor: '#fff59d', padding: '2px 0' }}>{imp.quote}</span>
                        {parts[1]}
                      </span>
                    );
                  }
                });
                return <div key={i} style={{ marginBottom: '0.5em' }}>{lineContent}</div>;
              })}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
