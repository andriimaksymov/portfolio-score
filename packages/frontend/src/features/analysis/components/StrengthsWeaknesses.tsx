import { Grid, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

interface StrengthsWeaknessesProps {
  strengths: string[];
  weaknesses: string[];
}

export default function StrengthsWeaknesses({ strengths, weaknesses }: StrengthsWeaknessesProps) {
  return (
    <Grid container spacing={3}>
      {/* Strengths */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h5" gutterBottom fontWeight="medium" sx={{ mb: 2 }}>
            ✨ Strengths
          </Typography>
          {strengths.length > 0 ? (
            <List>
              {strengths.map((strength, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary={strength}
                    primaryTypographyProps={{
                      variant: 'body1',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Keep building your portfolio to discover your strengths!
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>

      {/* Weaknesses */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h5" gutterBottom fontWeight="medium" sx={{ mb: 2 }}>
            ⚠️ Areas for Improvement
          </Typography>
          {weaknesses.length > 0 ? (
            <List>
              {weaknesses.map((weakness, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemIcon>
                    <WarningIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary={weakness}
                    primaryTypographyProps={{
                      variant: 'body1',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Great job! No major weaknesses detected. 🎉
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
