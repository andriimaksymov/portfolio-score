import { Box, Paper, Typography } from '@mui/material';
import { CircularProgress as MuiCircularProgress } from '@mui/material';

interface OverallScoreProps {
  score: number;
  username: string;
}

const getScoreColor = (score: number): string => {
  if (score >= 70) return '#4caf50';
  if (score >= 50) return '#ff9800';
  return '#f44336';
};

const getScoreGrade = (score: number): string => {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
};

const getScoreMessage = (score: number): string => {
  if (score >= 80) return 'Outstanding portfolio! Keep up the excellent work.';
  if (score >= 70) return 'Great portfolio! A few improvements could make it even better.';
  if (score >= 50) return 'Good foundation. Focus on the recommendations to improve.';
  return 'There\'s room for improvement. Follow the recommendations below.';
};

export default function OverallScore({ score, username }: OverallScoreProps) {
  return (
    <Paper
      sx={{
        p: 4,
        textAlign: 'center',
        background: `linear-gradient(135deg, ${getScoreColor(score)}15 0%, ${getScoreColor(score)}05 100%)`,
        border: `2px solid ${getScoreColor(score)}30`,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Portfolio Analysis for{' '}
        <Box component="span" sx={{ color: getScoreColor(score), fontWeight: 'bold' }}>
          {username}
        </Box>
      </Typography>

      <Box sx={{ position: 'relative', display: 'inline-flex', my: 3 }}>
        <MuiCircularProgress
          variant="determinate"
          value={100}
          size={200}
          thickness={4}
          sx={{ color: 'grey.200' }}
        />
        <MuiCircularProgress
          variant="determinate"
          value={score}
          size={200}
          thickness={4}
          sx={{
            color: getScoreColor(score),
            position: 'absolute',
            left: 0,
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h2" component="div" fontWeight="bold" sx={{ color: getScoreColor(score) }}>
            {score}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {getScoreGrade(score)}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
        {getScoreMessage(score)}
      </Typography>
    </Paper>
  );
}
