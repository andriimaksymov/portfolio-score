import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, InputAdornment, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function LinkedinInputForm() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim() || !url.includes('linkedin.com/in/')) {
      setError('Please enter a valid LinkedIn profile URL (e.g., linkedin.com/in/username)');
      return;
    }
    setError('');
    navigate(`/linkedin/results?url=${encodeURIComponent(url.trim())}`);
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
          gap: 1.5
        }}
      >
        <TextField
          fullWidth
          placeholder="linkedin.com/in/your-profile"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError('');
          }}
          error={!!error}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkedInIcon sx={{ color: 'var(--text-secondary)' }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            minWidth: 160,
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 700,
          }}
        >
          Analyze Profile
        </Button>
      </Box>
      {error && (
        <Typography variant="caption" sx={{ mt: 1, color: '#ef4444', display: 'block', px: 1 }}>
          {error}
        </Typography>
      )}
      <Typography variant="caption" sx={{ mt: 2, color: 'var(--text-secondary)', display: 'block', textAlign: 'center', opacity: 0.6 }}>
        Only public profiles can be analyzed. Private data is never accessed.
      </Typography>
    </Box>
  );
}
