import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useAnalyzePortfolio } from '@/features/analysis/hooks/useAnalyzePortfolio';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import ErrorAlert from '@/shared/components/ErrorAlert';

export default function PortfolioInputForm() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { mutate, isPending, isError, error: apiError } = useAnalyzePortfolio();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    if (username.trim().length < 2) {
      setError('Username must be at least 2 characters');
      return;
    }

    // Submit
    mutate({ username: username.trim() });
  };

  const getErrorMessage = () => {
    if (apiError) {
      // Type guard for Axios error
      if ('response' in apiError && apiError.response) {
        const response = apiError.response as { status: number; data?: { message?: string } };
        if (response.status === 404) {
          return `GitHub user "${username}" not found. Please check the username and try again.`;
        }
        return response.data?.message || 'Failed to analyze portfolio. Please try again.';
      }
      return 'Failed to analyze portfolio. Please try again.';
    }
    return '';
  };

  if (isPending) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <LoadingSpinner message={`Analyzing ${username}'s portfolio...`} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          This may take a few moments while we fetch and analyze GitHub data
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 4 }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom fontWeight="medium">
          Analyze Your Portfolio
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Enter your GitHub username to get detailed feedback on your developer portfolio
        </Typography>

        <TextField
          fullWidth
          label="GitHub Username"
          placeholder="e.g., octocat"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!error}
          helperText={error}
          disabled={isPending}
          InputProps={{
            startAdornment: <GitHubIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{ mb: 3 }}
        />

        {isError && <ErrorAlert message={getErrorMessage()} onRetry={() => mutate({ username })} />}

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isPending}
          sx={{ py: 1.5 }}
        >
          Analyze Portfolio
        </Button>
      </Box>
    </Paper>
  );
}
