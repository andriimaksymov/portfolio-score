import { Grid, Paper, Typography, List, ListItem, ListItemText, Box, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

interface StrengthsWeaknessesProps {
  strengths: string[];
  weaknesses: string[];
}

const getWeaknessHint = (weakness: string): string | null => {
  const w = weakness.toLowerCase();
  if (w.includes('activity')) return 'Plan a weekly commit schedule and ship at least one small feature per week.';
  if (w.includes('documentation') || w.includes('readme')) return 'Write clear README files with setup steps, features, and screenshots.';
  if (w.includes('diversity') || w.includes('tech stack')) return 'Experiment with at least one new framework or language in a small side project.';
  if (w.includes('consistency') || w.includes('pattern')) return 'Use contribution graph as a tracker and aim for consistent streaks.';
  return null;
};

export default function StrengthsWeaknesses({ strengths, weaknesses }: StrengthsWeaknessesProps) {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {/* Strengths */}
      <Grid item xs={12} md={6}>
        <Paper className="glass-card" sx={{ p: { xs: 3, md: 4 }, height: '100%', borderRadius: '24px' }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
            <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 28 }} />
            <Typography variant="h5" fontWeight="800" color="var(--text-primary)">
              Strengths
            </Typography>
          </Stack>

          {strengths.length > 0 ? (
            <List sx={{ p: 0 }}>
              {strengths.map((strength, index) => (
                <ListItem key={index} sx={{ px: 0, py: 1.5, alignItems: 'flex-start' }}>
                  <ListItemText
                    primary={strength}
                    primaryTypographyProps={{
                      variant: 'body1',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      sx: { mb: 0.5 }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
              <Box sx={{ py: 2 }}>
                <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>
                  Foundational technical knowledge and motivation to self-evaluate and improve.
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>

      {/* Weaknesses */}
      <Grid item xs={12} md={6}>
        <Paper className="glass-card" sx={{ p: { xs: 3, md: 4 }, height: '100%', borderRadius: '24px' }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
            <WarningIcon sx={{ color: '#ff9800', fontSize: 28 }} />
            <Typography variant="h5" fontWeight="800" color="var(--text-primary)">
              Areas for Improvement
            </Typography>
          </Stack>

          {weaknesses.length > 0 ? (
            <List sx={{ p: 0 }}>
              {weaknesses.map((weakness, index) => {
                const hint = getWeaknessHint(weakness);
                return (
                  <ListItem key={index} sx={{ px: 0, py: 1.5, alignItems: 'flex-start' }}>
                    <ListItemText
                      primary={weakness}
                      primaryTypographyProps={{
                        variant: 'body1',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        sx: { mb: 0.5 }
                      }}
                      secondary={hint}
                      secondaryTypographyProps={{
                        variant: 'body2',
                        sx: { color: 'var(--text-secondary)', opacity: 0.8 }
                      }}
                    />
                  </ListItem>
                );
              })}
            </List>
          ) : (
              <Box sx={{ py: 2 }}>
                <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>
                Great job! No major weaknesses detected. 🎉
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
