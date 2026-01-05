import { Box, Paper, Typography } from '@mui/material';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

interface MetricsChartProps {
  scores: {
    activity: number;
    projectQuality: number;
    techStackDiversity: number;
    consistency: number;
  };
}

export default function MetricsChart({ scores }: MetricsChartProps) {
  const data = [
    { subject: 'Activity', A: scores.activity, fullMark: 100 },
    { subject: 'Quality', A: scores.projectQuality, fullMark: 100 },
    { subject: 'Stack', A: scores.techStackDiversity, fullMark: 100 },
    { subject: 'Consistency', A: scores.consistency, fullMark: 100 },
  ];

  return (
    <Paper
      className="glass-card animate-fade-up"
      sx={{
        p: 3,
        borderRadius: '24px',
        height: '100%',
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" fontWeight="700" sx={{ mb: 2, color: 'var(--text-primary)' }}>
        Profile Shape
      </Typography>
      <Box sx={{ flex: 1, width: '100%', height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 600 }}
            />
            <Radar
              name="Score"
              dataKey="A"
              stroke="var(--accent-primary)"
              fill="var(--accent-primary)"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Box>
      <Typography variant="caption" sx={{ mt: 2, color: 'var(--text-secondary)', textAlign: 'center' }}>
        Visualize your expertise balance across key metrics
      </Typography>
    </Paper>
  );
}
