import { Box, Card, CardContent, Typography, LinearProgress } from '@mui/material';

interface ScoreCardProps {
  label: string;
  score: number;
  description?: string;
}

const getScoreColor = (score: number): string => {
  if (score >= 70) return 'success.main';
  if (score >= 50) return 'warning.main';
  return 'error.main';
};

const getScoreLabel = (score: number): string => {
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  if (score >= 30) return 'Needs Improvement';
  return 'Poor';
};

export default function ScoreCard({ label, score, description }: ScoreCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {label}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
          <Typography variant="h3" component="div" sx={{ color: getScoreColor(score), fontWeight: 'bold' }}>
            {score}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ ml: 0.5 }}>
            /100
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={score}
          sx={{
            height: 8,
            borderRadius: 1,
            mb: 1,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              bgcolor: getScoreColor(score),
            },
          }}
        />

        <Typography variant="body2" color="text.secondary" fontWeight="medium">
          {getScoreLabel(score)}
        </Typography>

        {description && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
