import { Avatar, Box, Typography, Stack, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { AnalysisResult } from '../../types/analysis.types';
import { GlassCard } from './styles';

interface HeroWidgetProps {
  analysis: AnalysisResult;
}

export default function HeroWidget({ analysis }: HeroWidgetProps) {
  const { profile, username, overallScore, aiInsights } = analysis;
  const theme = useTheme();

  // Score Gauge Data
  const scoreData = [
    { name: 'Score', value: overallScore },
    { name: 'Remaining', value: 100 - overallScore },
  ];
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#3b82f6';
    if (score >= 40) return '#f97316';
    return '#ef4444';
  };

  const scoreColor = getScoreColor(overallScore);

  return (
    <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', p: 4, gap: 4 }}>
      {/* Profile Section */}
      <Stack direction="row" flexWrap="wrap" alignItems="center" sx={{ minWidth: { md: '300px' } }}>
        <Avatar
          src={profile?.avatarUrl}
          alt={username}
          sx={{
            width: 100,
            height: 100,
            border: `3px solid ${theme.palette.background.paper}`,
          }}
        />
        <Box sx={{ py: { xs: 2, md: 0 }, px: { xs: 0, md: 2 } }}>
          <Typography variant="h4" fontWeight="800">
            {username}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {profile?.company || 'Developer'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
             {profile?.location}
          </Typography>
        </Box>
      </Stack>

      {/* Divider */}
      <Box sx={{ 
        width: { xs: '100%', md: '1px' }, 
        height: { xs: '1px', md: '80px' }, 
        bgcolor: 'rgba(255,255,255,0.1)' 
      }} />

      {/* Score Section */}
      <Stack direction="row" spacing={3} alignItems="center">
        <Box sx={{ width: 100, height: 100, position: 'relative' }}>
        <ResponsiveContainer width={100} height={100}>
            <PieChart>
              <Pie
                data={scoreData}
                cx="50%"
                cy="50%"
                innerRadius={36}
                outerRadius={46}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                <Cell key="score" fill={scoreColor} />
                <Cell key="remaining" fill="rgba(255,255,255,0.1)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h5" fontWeight="900" sx={{ lineHeight: 1 }}>
              {overallScore}
            </Typography>
          </Box>
        </Box>
        <Box>
            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 1 }}>
                Overall Score
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 200, color: 'text.secondary' }}>
                {overallScore < 40 ? 'Action needed to improve portfolio visibility.' : 'Good progress. Keep optimizing.'}
            </Typography>
        </Box>
      </Stack>

      {/* Vertical Divider */}
      <Box sx={{ 
        width: { xs: '100%', md: '1px' }, 
        height: { xs: '1px', md: '80px' }, 
        bgcolor: 'rgba(255,255,255,0.1)' 
      }} />

      {/* AI Summary Section */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="overline" sx={{ color: 'var(--accent-primary)', fontWeight: 700, letterSpacing: 1, mb: 1, display: 'block' }}>
            AI Executive Summary
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.6, fontWeight: 500 }}>
             "{aiInsights?.profileSummary || 'An emerging developer portfolio with potential. Focus on documentation and consistency to reach the next level.'}"
        </Typography>
      </Box>

    </GlassCard>
  );
}
