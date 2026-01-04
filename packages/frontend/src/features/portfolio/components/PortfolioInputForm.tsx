import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useAnalyzePortfolio } from '@/features/analysis/hooks/useAnalyzePortfolio';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import ErrorAlert from '@/shared/components/ErrorAlert';

const PortfolioInputForm = forwardRef((_, ref) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { mutate, isPending, isError, error: apiError } = useAnalyzePortfolio();
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    mutate({ username: username.trim() });
  };

  const getErrorMessage = () => {
    if (apiError) {
      if ('response' in apiError && apiError.response) {
        const response = apiError.response as { status: number; data?: { message?: string } };
        if (response.status === 404) {
          return `GitHub user "${username}" not found.`;
        }
        return response.data?.message || 'Failed to analyze portfolio.';
      }
      return 'Failed to analyze portfolio.';
    }
    return '';
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 3,
          position: 'relative'
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!error}
          disabled={isPending}
          inputRef={inputRef}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GitHubIcon sx={{ color: 'var(--text-secondary)' }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          color='secondary'
          disabled={isPending}
          sx={{
            minWidth: 160,
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 700,
          }}
        >
          {isPending ? <LoadingSpinner size={24} color="inherit" /> : 'Analyze profile'}
        </Button>
      </Box>

      {error && (
        <Box sx={{ mt: 1, color: '#ef4444', fontSize: '0.875rem' }}>{error}</Box>
      )}

      {isError && (
        <Box sx={{ mt: 2 }}>
          <ErrorAlert message={getErrorMessage()} onRetry={() => mutate({ username })} />
        </Box>
      )}
    </Box>
  );
});

export default PortfolioInputForm;
