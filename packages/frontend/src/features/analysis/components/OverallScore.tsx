import { Box, Paper, Typography, Stack } from '@mui/material';

interface OverallScoreProps {
  score: number;
}

const getScoreColor = (score: number): string => {
  if (score >= 70) return '#4caf50';
  if (score >= 50) return '#ff9800';
  return '#ef4444';
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

export default function OverallScore({ score }: OverallScoreProps) {
  const color = getScoreColor(score);
  const grade = getScoreGrade(score);

  return (
    <Paper
      className="glass-card"
      sx={{
        p: { xs: 4, md: 6 },
        borderRadius: '24px',
        mb: 4,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background circle */}
      <Box
        sx={{ 
          position: 'absolute', 
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
          filter: 'blur(40px)',
          zIndex: 0
        }}
      />

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        alignItems="center"
        sx={{ position: 'relative', zIndex: 1 }}
      >
        <Box
          sx={{ 
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'center',
            width: 140,
            height: 140,
            borderRadius: '50%',
            border: `8px solid ${color}22`,
            bgcolor: `${color}11`,
            flexShrink: 0
          }}
        >
          <Typography
            variant="h1"
            fontWeight="900"
            sx={{ color: color, lineHeight: 1 }}
          >
            {grade}
          </Typography>
        </Box>

        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flexGrow: 1 }}>
          <Typography variant="overline" sx={{ color: 'var(--text-secondary)', letterSpacing: 2 }}>
            Overall Portfolio Score
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            alignItems="baseline"
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            sx={{ mb: 1 }}
          >
            <Typography variant="h2" fontWeight="800" color="var(--text-primary)">
              {score}
            </Typography>
            <Typography variant="h5" color="var(--text-secondary)">
              / 100
            </Typography>
          </Stack>
          <Typography variant="h6" sx={{ color: 'var(--text-secondary)', fontWeight: 400, maxWidth: 500 }}>
            {getScoreMessage(score)}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
