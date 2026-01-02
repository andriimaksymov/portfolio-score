import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, CircularProgress, Stepper, Step, StepLabel, Button, Divider, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import client from '@/api/client';

const STEPS = ['Fetching Profile Data', 'Analyzing with AI', 'Generating Insights'];

export default function LinkedinAnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const targetUrl = queryParams.get('url');

  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!targetUrl) {
      setError('No LinkedIn URL provided.');
      return;
    }

    const runAnalysisChain = async () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      try {
        // Step 1: Fetch
        setActiveStep(0);
        const fetchRes = await client.post('/linkedin/fetch', { url: targetUrl });
        const profile = fetchRes.data;
        setProfileData(profile);

        // Step 2: Analyze
        setActiveStep(1);
        // Small delay to let UI show step 1 completion feel
        await new Promise(r => setTimeout(r, 800));
        
        const analyzeRes = await client.post('/linkedin/analyze', profile);
        setAnalysisResult(analyzeRes.data);

        // Step 3: Complete
        setActiveStep(2);
        await new Promise(r => setTimeout(r, 800)); // Just for UX
        setActiveStep(3); // Done

      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to process LinkedIn profile.');
      }
    };

    runAnalysisChain();
  }, [targetUrl]);

  if (error) {
    return (
      <Box maxWidth="md" mx="auto" mt={4}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Box>
    );
  }

  if (activeStep < 3) {
    return (
      <Box maxWidth="md" mx="auto" mt={8} textAlign="center">
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Analyzing Profile...
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 6 }}>
          Please wait while our AI agents review your experience and skills.
        </Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      </Box>
    );
  }

  // Final Results View
  return (
    <Box maxWidth="lg" mx="auto">
       <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 3 }}>
        Analyze Another
      </Button>

      {/* Summary Section */}
      <Paper sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">Professional Summary</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 4 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>ORIGINAL</Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f5f5f5' }}>
              <Typography variant="body2">{profileData?.about || 'No summary provided'}</Typography>
            </Paper>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="primary" gutterBottom>AI IMPROVED</Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#e3f2fd', borderColor: '#90caf9' }}>
               <Typography variant="body2">{analysisResult?.analysis?.summary?.improved}</Typography>
            </Paper>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              critique: {analysisResult?.analysis?.summary?.critique}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Experience Section */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>Experience Enhancements</Typography>
      
      {analysisResult?.analysis?.experience?.map((exp: any, index: number) => (
        <Paper key={index} sx={{ p: 4, mb: 3, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>{exp.role} at {exp.company}</Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 4, mt: 2 }}>
             <Box>
                <Typography variant="subtitle2" color="text.secondary">ORIGINAL</Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mt: 1 }}>{exp.original}</Typography>
             </Box>
             <Box>
                <Typography variant="subtitle2" color="primary">AI ENHANCED (STAR Method)</Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mt: 1, fontWeight: 500 }}>{exp.improved}</Typography>
                
                {exp.suggestions?.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" fontWeight="bold">SUGGESTIONS:</Typography>
                    <ul style={{ margin: '4px 0', paddingLeft: 20 }}>
                      {exp.suggestions.map((s: string, i: number) => (
                        <li key={i}><Typography variant="caption">{s}</Typography></li>
                      ))}
                    </ul>
                  </Box>
                )}
             </Box>
          </Box>
        </Paper>
      ))}

      {/* Skills Gap */}
      <Paper sx={{ p: 4, borderRadius: 3, bgcolor: '#fff3e0' }}>
         <Typography variant="h6" gutterBottom fontWeight="bold" color="warning.dark">Skills Gap Analysis</Typography>
         <Typography variant="body2" paragraph>
           Based on your role as <b>{profileData?.title}</b>, you might be missing these high-value skills:
         </Typography>
         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
           {analysisResult?.analysis?.skills?.missing?.map((skill: string) => (
             <Box key={skill} sx={{ px: 2, py: 0.5, bgcolor: 'warning.main', color: 'white', borderRadius: 10, fontSize: '0.875rem' }}>
               {skill}
             </Box>
           ))}
         </Box>
         
         {analysisResult?.analysis?.courses?.length > 0 && (
           <Box sx={{ mt: 3 }}>
             <Typography variant="subtitle2" gutterBottom>Recommended Learning Resources</Typography>
             {analysisResult.analysis.courses.map((course: any, i: number) => (
               <Box key={i} sx={{  mb: 1 }}>
                 <Typography variant="body2">
                   • <a href={course.url} target="_blank" rel="noreferrer" style={{ fontWeight: 'bold' }}>{course.title}</a> ({course.platform}) - {course.reason}
                 </Typography>
               </Box>
             ))}
           </Box>
         )}
      </Paper>

    </Box>
  );
}
