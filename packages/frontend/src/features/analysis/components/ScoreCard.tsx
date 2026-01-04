import { Paper, Typography, Box, LinearProgress, Chip, Stack } from '@mui/material';

interface ScoreCardProps {
  label: string;
  score: number;
  description: string;
}

const getStatusInfo = (score: number) => {
  if (score >= 80) return { label: 'Excellent', color: '#4caf50' };
  if (score >= 60) return { label: 'Good', color: '#2196f3' };
  if (score >= 40) return { label: 'Average', color: '#ff9800' };
  return { label: 'Poor', color: '#ef4444' };
};

export default function ScoreCard({ label, score, description }: ScoreCardProps) {
  const { label: statusLabel, color: statusColor } = getStatusInfo(score);

  return (
    <Paper
      className="glass-card"
      sx={{
        p: 3,
        height: '100%',
        borderRadius: '20px',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)'
        }
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" fontWeight="700" color="var(--text-primary)">
            {label}
          </Typography>
          <Chip
            label={statusLabel}
            size="small"
            sx={{
              bgcolor: `${statusColor}22`,
              color: statusColor,
              fontWeight: 700,
              fontSize: '0.7rem',
              borderRadius: '6px'
            }}
          />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 1 }}>
            <Typography variant="h4" fontWeight="800" color="var(--text-primary)">
              {score}
            </Typography>
            <Typography variant="body2" color="var(--text-secondary)">
              / 100
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={score}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              '& .MuiLinearProgress-bar': {
                bgcolor: statusColor,
                borderRadius: 4
              }
            }}
          />
        </Box>

        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {description}
        </Typography>
      </Stack>
    </Paper>
  );
}
