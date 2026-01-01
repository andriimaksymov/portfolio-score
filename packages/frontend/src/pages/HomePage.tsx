import { Box } from '@mui/material';
import PageHeader from '@/shared/components/PageHeader';
import PortfolioInputForm from '@/features/portfolio/components/PortfolioInputForm';

export default function HomePage() {
  return (
    <Box>
      <PageHeader
        title="Portfolio Analyzer"
        subtitle="Get instant feedback on your developer portfolio with AI-powered insights"
      />

      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <PortfolioInputForm />
      </Box>

      {/* Features Section */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
            mt: 4,
          }}
        >
          <Box>
            <Box sx={{ fontSize: 40, mb: 1 }}>📊</Box>
            <Box sx={{ fontWeight: 'medium', mb: 0.5 }}>Comprehensive Analysis</Box>
            <Box sx={{ fontSize: 14, color: 'text.secondary' }}>
              Get detailed scores across activity, quality, tech stack, and consistency
            </Box>
          </Box>
          <Box>
            <Box sx={{ fontSize: 40, mb: 1 }}>💡</Box>
            <Box sx={{ fontWeight: 'medium', mb: 0.5 }}>Actionable Insights</Box>
            <Box sx={{ fontSize: 14, color: 'text.secondary' }}>
              Receive personalized recommendations to improve your portfolio
            </Box>
          </Box>
          <Box>
            <Box sx={{ fontSize: 40, mb: 1 }}>⚡</Box>
            <Box sx={{ fontWeight: 'medium', mb: 0.5 }}>Instant Results</Box>
            <Box sx={{ fontSize: 14, color: 'text.secondary' }}>
              Analyze any GitHub profile in seconds with real-time data
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
