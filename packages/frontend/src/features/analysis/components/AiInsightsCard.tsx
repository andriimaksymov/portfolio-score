import { Paper, Typography, Box, Chip, Stack, List, ListItem, ListItemIcon, ListItemText, Grid } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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

  // Split summary into paragraphs for better readability
  const paragraphs = insights.summary
    .split('.')
    .filter(p => p.trim().length > 0)
    .reduce((acc: string[][], curr, i) => {
      const idx = Math.floor(i / 2); // 2 sentences per paragraph
      if (!acc[idx]) acc[idx] = [];
      acc[idx].push(curr.trim() + '.');
      return acc;
    }, [])
    .map(p => p.join(' '));

  return (
    <Paper 
      className="glass-card"
      sx={{ 
        p: { xs: 3, md: 5 }, 
        mb: 4, 
        borderRadius: '24px',
        borderLeft: '4px solid var(--accent-primary)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AutoAwesomeIcon sx={{ color: 'var(--accent-primary)', mr: 2, fontSize: 32 }} />
        <Typography variant="h4" fontWeight="800" color="var(--text-primary)">
          AI Career Insights
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="overline" sx={{ color: 'var(--text-secondary)', letterSpacing: 2, display: 'block', mb: 1 }}>
          High-level Summary
        </Typography>
        {paragraphs.map((p, i) => (
          <Typography key={i} variant="body1" sx={{ color: 'var(--text-secondary)', mb: 2, lineHeight: 1.7, fontSize: '1.1rem' }}>
            {p}
          </Typography>
        ))}
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              borderRadius: '16px',
              bgcolor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              height: '100%'
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <TrendingUpIcon sx={{ color: 'var(--accent-primary)' }} />
              <Typography variant="h6" fontWeight="700">Recommended Path</Typography>
            </Stack>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {insights.careerPath.split(',').map((path, i) => (
                <Chip
                  key={i}
                  label={path.trim()}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(59, 130, 246, 0.1)',
                    color: 'var(--accent-primary)',
                    fontWeight: 600
                  }}
                />
              ))}
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              This path aligns with your current focus on technical implementation and core engineering skills.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              borderRadius: '16px',
              bgcolor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              height: '100%'
            }}
          >
            <Typography variant="overline" sx={{ color: 'var(--text-secondary)', letterSpacing: 2 }}>
              Key Takeaways
            </Typography>
            <List dense>
              {insights.keyStrengths.slice(0, 3).map((strength, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleOutlineIcon sx={{ color: 'var(--accent-primary)', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={strength}
                    primaryTypographyProps={{ variant: 'body2', color: 'var(--text-secondary)' }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
