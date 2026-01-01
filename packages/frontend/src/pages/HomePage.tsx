import { Typography, Paper, Box } from '@mui/material';

export default function HomePage() {
  return (
    <Box>
      <Typography variant="h2" component="h1" gutterBottom>
        Portfolio Analyzer
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Analyze your developer portfolio and get actionable feedback
      </Typography>
      
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Welcome! 🚀
        </Typography>
        <Typography variant="body1" paragraph>
          This is the starting point for your Portfolio Analyzer application.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The project structure is ready. Next steps:
        </Typography>
        <Box component="ul" sx={{ mt: 2 }}>
          <li>
            <Typography variant="body2">Implement GitHub API integration</Typography>
          </li>
          <li>
            <Typography variant="body2">Build portfolio input form</Typography>
          </li>
          <li>
            <Typography variant="body2">Create analysis dashboard</Typography>
          </li>
          <li>
            <Typography variant="body2">Develop scoring algorithm</Typography>
          </li>
        </Box>
      </Paper>
    </Box>
  );
}
