import { useState } from 'react';
import { Box, Container, Typography, Tab, Tabs, Paper, Chip, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import InsightsIcon from '@mui/icons-material/Insights';
import SpeedIcon from '@mui/icons-material/Speed';
import PortfolioInputForm from '@/features/portfolio/components/PortfolioInputForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function HomePage() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ mb: 8, textAlign: 'center', pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          fontWeight="800"
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Portfolio Analyzer
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}>
          Transform your developer profile into actionable insights. Get <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>AI-powered feedback</Box>, score your activity, and boost your career potential.
        </Typography>
      </Box>

      {/* Input Section using Tabs */}
      <Container maxWidth="md" sx={{ mb: 10 }}>
        <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="portfolio input source tabs"
            >
              <Tab icon={<GitHubIcon />} iconPosition="start" label="GitHub Profile" />
              <Tab icon={<LinkedInIcon />} iconPosition="start" label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>LinkedIn <Chip label="Coming Soon" size="small" color="default" sx={{ height: 20, fontSize: '0.625rem' }} /></Box>} />
              <Tab icon={<DescriptionIcon />} iconPosition="start" label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>CV / PDF <Chip label="Coming Soon" size="small" color="default" sx={{ height: 20, fontSize: '0.625rem' }} /></Box>} />
            </Tabs>
          </Box>

          <Box sx={{ p: { xs: 3, md: 5 }, bgcolor: 'background.default' }}>
            <TabPanel value={value} index={0}>
              <PortfolioInputForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <LinkedInIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  LinkedIn Analysis is Coming Soon
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We're working on parsing LinkedIn profiles to provide career-specific insights. Stay tuned!
                </Typography>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <DescriptionIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Resume Parsing is Coming Soon
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload your PDF resume to check for ATS compatibility and content strength.
                </Typography>
              </Box>
            </TabPanel>
          </Box>
        </Paper>
      </Container>


      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom fontWeight="bold" sx={{ mb: 6 }}>
          Why Analyze Your Portfolio?
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          <Paper elevation={0} sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ color: 'primary.main', mb: 2 }}>
              <AutoGraphIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Data-Driven Scoring
            </Typography>
            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
              We analyze your GitHub activity using advanced algorithms to calculate scores for Activity, Project Quality, Tech Stack Diversity, and Consistency. No more guessing how you stack up.
            </Typography>
          </Paper>

          <Paper elevation={0} sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ color: 'secondary.main', mb: 2 }}>
              <InsightsIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              AI Career Insights
            </Typography>
            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
              Leverage the power of AI to generate a professional summary, identify your key strengths, and get tailored career path recommendations based on your actual code.
            </Typography>
          </Paper>

          <Paper elevation={0} sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ color: 'success.main', mb: 2 }}>
              <SpeedIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Instant Feedback
            </Typography>
            <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
              Stop waiting for recruiter feedback. Get an instant, objective analysis of your developer profile to fix gaps before you apply for your dream job.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
