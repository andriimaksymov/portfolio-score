import Illustration from '@/assets/illustration.svg?react';
import CvUploadForm from '@/features/portfolio/components/CvUploadForm';
import LinkedinInputForm from '@/features/portfolio/components/LinkedinInputForm';
import PortfolioInputForm from '@/features/portfolio/components/PortfolioInputForm';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DescriptionIcon from '@mui/icons-material/Description';
import GitHubIcon from '@mui/icons-material/GitHub';
import InsightsIcon from '@mui/icons-material/Insights';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SpeedIcon from '@mui/icons-material/Speed';
import { Box, Button, Container, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useRef, useState } from 'react';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Paper
    className="glass-card"
    sx={{
      p: 4,
      height: '100%',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.4)' }
    }}
  >
    <Box sx={{ color: 'var(--accent-primary)', mb: 2 }}>{icon}</Box>
    <Typography variant="h6" gutterBottom fontWeight="bold">{title}</Typography>
    <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{description}</Typography>
  </Paper>
);

export default function HomePage() {
  const [source, setSource] = useState(0);
  const githubInputRef = useRef<{ focus: () => void }>(null);
  const inputSectionRef = useRef<HTMLDivElement>(null);

  const handleAnalyzeClick = () => {
    // Switch to GitHub tab if not already there
    setSource(0);

    // Smooth scroll to input section
    inputSectionRef.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });

    // Focus input after a short delay to allow for scroll/tab change
    setTimeout(() => {
      githubInputRef.current?.focus();
    }, 500);
  };

  const handleSourceChange = (_: React.SyntheticEvent, newValue: number) => {
    setSource(newValue);
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box bgcolor='#F5F7FA' sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 6 } }}>
        <Grid container spacing={8} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={7} className="animate-fade-up">
            <Typography
              component="h1"
              variant="h2"
              fontWeight="800"
              gutterBottom
            >
              Elevate Your Career with AI-Powered Portfolio Analysis.
            </Typography>
            <Typography variant="h6">
              Gain a competitive edge with deep insights into your GitHub, LinkedIn, and CV. Let AI-guided analysis transform your professional presence.
            </Typography>

            <Box id="analyzer-input" ref={inputSectionRef} sx={{ mb: 6 }}>
              <Tabs
                value={source}
                onChange={handleSourceChange}
                sx={{
                  mb: 4,
                }}
              >
                <Tab icon={<GitHubIcon />} iconPosition="start" label="GitHub" />
                <Tab icon={<LinkedInIcon />} iconPosition="start" label="LinkedIn" />
                <Tab icon={<DescriptionIcon />} iconPosition="start" label="CV / Resume" />
              </Tabs>

              <Box key={source}>
                {source === 0 && <PortfolioInputForm ref={githubInputRef} />}
                {source === 1 && <LinkedinInputForm />}
                {source === 2 && <CvUploadForm />}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md="auto">
            <Illustration />
          </Grid>
        </Grid>
      </Box>

      {/* How it works */}
      <Box id="how-it-works" sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" fontWeight="800" gutterBottom sx={{ mb: 8 }}>
            How it works
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                step: '01',
                title: 'Connect your GitHub',
                desc: 'Enter your GitHub username to fetch your public repositories and activity.'
              },
              {
                step: '02',
                title: 'We analyze your code',
                desc: 'Advanced algorithms score your Activity, Project Quality, Tech Stack Diversity, and Consistency.'
              },
              {
                step: '03',
                title: 'Get actionable insights',
                desc: 'Review your scores, strengths, and AI-generated recommendations to improve your portfolio.'
              }
            ].map((item) => (
              <Grid item xs={12} md={4} key={item.step}>
                <Box sx={{ position: 'relative', p: 4, height: '100%' }}>
                  <Typography variant="h1" sx={{ position: 'absolute', top: 0, left: 0, opacity: 0.05, fontWeight: 900, fontSize: '6rem', lineHeight: 1 }}>
                    {item.step}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>{item.title}</Typography>
                  <Typography sx={{ color: 'var(--text-secondary)' }}>{item.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why analyze your portfolio */}
      <Box id="why-analyze" sx={{ py: { xs: 10, md: 16 }, bgcolor: '#F5F7FA' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" fontWeight="800" gutterBottom sx={{ mb: 8 }}>
            Why analyze your portfolio?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={<AutoGraphIcon sx={{ fontSize: 40 }} />}
                title="Data-Driven Scoring"
                description="We calculate scores for Activity, Project Quality, Tech Stack Diversity, and Consistency using advanced algorithms, so you see objective metrics instead of guessing."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={<InsightsIcon sx={{ fontSize: 40 }} />}
                title="AI Career Insights"
                description="AI generates a professional summary, identifies key strengths, and suggests career paths based on your actual GitHub code."
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard
                icon={<SpeedIcon sx={{ fontSize: 40 }} />}
                title="Instant Feedback"
                description="Stop waiting for recruiter feedback. Get an instant, objective analysis of your developer profile to fix gaps before you apply for your dream job."
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box sx={{ py: { xs: 10, md: 16 }, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h3" fontWeight="800" gutterBottom>
            Ready to level up?
          </Typography>
          <Typography sx={{ color: 'var(--text-secondary)', mb: 6 }}>
            Join thousands of developers using SparkFolio to improve their professional presence.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleAnalyzeClick}
            sx={{
              py: 2,
              px: 6,
              borderRadius: '12px',
              fontWeight: 700,
              textTransform: 'none'
            }}
          >
            Analyze my GitHub
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
