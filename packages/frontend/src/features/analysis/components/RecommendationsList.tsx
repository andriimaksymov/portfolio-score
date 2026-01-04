import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Stack, Box } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LaunchIcon from '@mui/icons-material/Launch';
import CodeIcon from '@mui/icons-material/Code';

interface RecommendationsListProps {
  recommendations: string[];
}

export default function RecommendationsList({ recommendations }: RecommendationsListProps) {
  const extraRecommendations = [
    'Create 2–3 complete, polished projects with live demos and clear documentation.',
    'Pin your best repositories on GitHub to highlight your strongest work.',
    'Contribute to open-source projects to demonstrate collaboration and real-world impact.'
  ];

  const allRecommendations = [...recommendations, ...extraRecommendations];

  if (allRecommendations.length === 0) {
    return (
      <Paper className="glass-card" sx={{ p: 4, textAlign: 'center', borderRadius: '24px' }}>
        <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>
          No recommendations at this time. Your portfolio is looking great! 🎉
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className="glass-card" sx={{ p: { xs: 3, md: 5 }, borderRadius: '24px' }}>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
        <LightbulbIcon sx={{ color: '#ffeb3b', fontSize: 32 }} />
        <Typography variant="h4" fontWeight="800" color="var(--text-primary)">
          Actionable Recommendations
        </Typography>
      </Stack>

      <Typography variant="body1" sx={{ color: 'var(--text-secondary)', mb: 4, fontSize: '1.1rem' }}>
        Here are some concrete steps you can take to significantly improve your portfolio's impact:
      </Typography>

      <List sx={{ p: 0 }}>
        {allRecommendations.map((recommendation, index) => {
          let icon = <CodeIcon sx={{ color: 'var(--accent-primary)', fontSize: 24 }} />;
          if (recommendation.toLowerCase().includes('demo')) {
            icon = <LaunchIcon sx={{ color: 'var(--accent-primary)', fontSize: 22 }} />;
          }

          return (
            <ListItem key={index} sx={{ px: 0, py: 2, alignItems: 'flex-start' }}>
              <ListItemIcon sx={{ minWidth: 44, mt: 0.5 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    bgcolor: 'rgba(59, 130, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {icon}
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={recommendation}
                primaryTypographyProps={{
                  variant: 'body1',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  lineHeight: 1.6
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
