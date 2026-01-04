import { useState, useRef } from 'react';
import { Box, Container, Typography, Grid, Paper, Button, Avatar, Tabs, Tab } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import InsightsIcon from '@mui/icons-material/Insights';
import SpeedIcon from '@mui/icons-material/Speed';
import PortfolioInputForm from '@/features/portfolio/components/PortfolioInputForm';
import CvUploadForm from '@/features/portfolio/components/CvUploadForm';
import LinkedinInputForm from '@/features/portfolio/components/LinkedinInputForm';

const AnalysisPreview = () => (
  <Box sx={{ position: 'relative', width: '100%', minHeight: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {/* Background Glow */}
    <Box sx={{ position: 'absolute', width: '120%', height: '120%', background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />

    <Paper
      className="glass-card animate-float"
      sx={{
        width: '90%',
        p: 4,
        zIndex: 2,
        background: 'rgba(5, 8, 22, 0.6)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 56, height: 56, bgcolor: '#a5bcc7', boxShadow: '0 0 20px rgba(165, 188, 199, 0.3)' }}>
            <GitHubIcon sx={{ fontSize: 32, color: '#050816' }} />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="900" sx={{ color: '#fff', letterSpacing: -0.5 }}>octocat/verified</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22c55e', animation: 'pulse 2s infinite' }} />
              Analysis Engine Online
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h3" fontWeight="900" sx={{ color: '#a5bcc7', mt: -0.5 }}>94</Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase' }}>Precision Score</Typography>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {[
          { icon: <AutoGraphIcon />, label: 'Architecture', value: 'Exceptional', color: '#3b82f6' },
          { icon: <InsightsIcon />, label: 'Impact', value: 'High Growth', color: '#22c55e' }
        ].map((item) => (
          <Grid item xs={6} key={item.label}>
            <Box sx={{ p: 2, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: item.color }}>
                {item.icon}
                <Typography variant="caption" fontWeight="700" sx={{ opacity: 0.8 }}>{item.label}</Typography>
              </Box>
              <Typography variant="subtitle1" fontWeight="800" sx={{ color: '#fff' }}>{item.value}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, p: 2, borderRadius: '16px', bgcolor: 'rgba(165, 188, 199, 0.05)', border: '1px solid rgba(165, 188, 199, 0.1)' }}>
        <Typography variant="caption" sx={{ color: '#a5bcc7', fontWeight: 800, display: 'block', mb: 1 }}>AI INSIGHT</Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, fontStyle: 'italic' }}>
          "Strong contribution consistency with focus on distributed systems. Recommend highlighting scalability patterns in top repositories."
        </Typography>
      </Box>
    </Paper>
  </Box>
);

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
      <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6} className="animate-fade-up">
              <Typography
                component="h1"
                variant="h2"
                fontWeight="800"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.1,
                  mb: 3,
                  background: 'linear-gradient(45deg, #a5bcc7ff 20%, #b6c2d7ff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Elevate Your Career with AI-Powered Portfolio Analysis.
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, color: 'var(--text-secondary)', maxWidth: '90%', lineHeight: 1.6 }}>
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

                <Box className="animate-fade-up" key={source}>
                  {source === 0 && <PortfolioInputForm ref={githubInputRef} />}
                  {source === 1 && <LinkedinInputForm />}
                  {source === 2 && <CvUploadForm />}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <AnalysisPreview />
            </Grid>
          </Grid>
        </Container>
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
      <Box id="why-analyze" sx={{ py: { xs: 10, md: 16 }, bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
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
            Join thousands of developers using Portfolio Analyzer to improve their professional presence.
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
