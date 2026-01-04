import { useState } from 'react';
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

const DashboardMockup = () => (
  <Box sx={{ position: 'relative', width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {/* Main Card */}
    <Paper
      className="glass-card animate-float"
      sx={{
        width: '80%',
        p: 3,
        zIndex: 2,
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.12)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: 'var(--accent-primary)' }}>JD</Avatar>
        <Box>
          <Typography variant="h6" fontWeight="bold">John Developer</Typography>
          <Typography variant="body2" color="var(--text-secondary)">Overall Score: 88/100</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        {[
          { label: 'Activity', value: 85, color: '#3b82f6' },
          { label: 'Quality', value: 92, color: '#22c55e' },
          { label: 'Diversity', value: 78, color: '#f59e0b' },
          { label: 'Consistency', value: 95, color: '#8b5cf6' }
        ].map((stat) => (
          <Box key={stat.label} sx={{ p: 1.5, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
            <Typography variant="caption" color="var(--text-secondary)" display="block">{stat.label}</Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ color: stat.color }}>{stat.value}%</Typography>
            <Box sx={{ width: '100%', height: 4, bgcolor: 'rgba(255, 255, 255, 0.1)', mt: 1, borderRadius: 1 }}>
              <Box sx={{ width: `${stat.value}%`, height: '100%', bgcolor: stat.color, borderRadius: 1 }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
    {/* Decorative blobs */}
    <Box sx={{ position: 'absolute', top: '10%', right: '5%', width: 120, height: 120, background: 'radial-gradient(circle, #3b82f633 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(20px)' }} />
    <Box sx={{ position: 'absolute', bottom: '10%', left: '5%', width: 150, height: 150, background: 'radial-gradient(circle, #22c55e22 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(30px)' }} />
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
                AI-powered analysis of your GitHub portfolio.
              </Typography>
              <Typography variant="h6">
                Transform your developer profile into actionable insights. Get AI-powered feedback, score your activity, and boost your career potential.
              </Typography>

              <Box sx={{ mb: 6 }}>
                <Tabs
                  value={source}
                  onChange={handleSourceChange}
                  sx={{
                    mb: 4,
                    '& .MuiTabs-indicator': {
                      bgcolor: 'var(--accent-primary)',
                      height: 3,
                      borderRadius: '3px'
                    },
                    '& .MuiTab-root': {
                      color: 'var(--text-secondary)',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      '&.Mui-selected': { color: 'var(--text-primary)' }
                    }
                  }}
                >
                  <Tab icon={<GitHubIcon />} iconPosition="start" label="GitHub" />
                  <Tab icon={<LinkedInIcon />} iconPosition="start" label="LinkedIn" />
                  <Tab icon={<DescriptionIcon />} iconPosition="start" label="CV / Resume" />
                </Tabs>

                <Box className="animate-fade-up" key={source}>
                  {source === 0 && <PortfolioInputForm />}
                  {source === 1 && <LinkedinInputForm />}
                  {source === 2 && <CvUploadForm />}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <DashboardMockup />
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
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Analyze my profile
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
