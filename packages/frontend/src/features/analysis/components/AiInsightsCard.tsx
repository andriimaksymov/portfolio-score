import { Paper, Typography, Box, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface AiInsightsCardProps {
  insights: {
    summary: string;
    careerPath: string;
    keyStrengths: string[];
    improvements: string[];
  };
}

export default function AiInsightsCard({ insights }: AiInsightsCardProps) {
  if (!insights) return null;

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 3, 
        mb: 4, 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderLeft: '6px solid #6a11cb'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <AutoAwesomeIcon sx={{ color: '#6a11cb', mr: 1, fontSize: 28 }} />
        <Typography variant="h5" component="h2" fontWeight="bold" color="#333">
          AI Career Insights
        </Typography>
      </Box>

      <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', color: '#444' }}>
        "{insights.summary}"
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TrendingUpIcon sx={{ color: '#2575fc', mr: 1 }} />
          <Typography variant="h6" fontSize="1rem" fontWeight="bold">
            Recommended Career Path
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          {insights.careerPath}
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          Key Strengths Detected:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {insights.keyStrengths.map((strength, index) => (
            <Chip 
              key={index} 
              label={strength} 
              size="small" 
              color="primary" 
              variant="outlined" 
              sx={{ bgcolor: 'rgba(255,255,255,0.5)' }} 
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
