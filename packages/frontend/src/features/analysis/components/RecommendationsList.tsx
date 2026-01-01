import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

interface RecommendationsListProps {
  recommendations: string[];
}

export default function RecommendationsList({ recommendations }: RecommendationsListProps) {
  if (recommendations.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No recommendations at this time. Your portfolio is looking great! 🎉
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="medium" sx={{ mb: 2 }}>
        💡 Recommendations
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Here are some actionable suggestions to improve your portfolio:
      </Typography>
      <List>
        {recommendations.map((recommendation, index) => (
          <ListItem key={index} sx={{ py: 1 }}>
            <ListItemIcon>
              <LightbulbIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={recommendation}
              primaryTypographyProps={{
                variant: 'body1',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
