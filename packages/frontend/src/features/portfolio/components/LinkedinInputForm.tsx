import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, InputAdornment, Chip, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function LinkedinInputForm() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isComingSoon] = useState(true); // Toggle this when ready

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComingSoon) return;

    if (!url.trim() || !url.includes('linkedin.com/in/')) {
      setError('Please enter a valid LinkedIn profile URL');
      return;
    }
    navigate(`/linkedin/results?url=${encodeURIComponent(url.trim())}`);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      {isComingSoon ? (
        <Box 
          sx={{ 
            p: 4, 
            textAlign: 'center', 
            borderRadius: '16px', 
            bgcolor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Chip 
            label="COMING SOON" 
            size="small" 
            sx={{ 
              position: 'absolute', 
              top: 12, 
              right: 12, 
              bgcolor: 'var(--accent-primary)',
              fontWeight: 800,
              fontSize: '0.65rem'
            }} 
          />
          <LinkedInIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.2)', mb: 2 }} />
          <Typography variant="h6" fontWeight="bold" sx={{ color: 'var(--text-secondary)' }}>
            LinkedIn Optimizer
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3 }}>
            We're upgrading our LinkedIn integration. Join the waitlist to be notified.
          </Typography>
          <Button 
            disabled 
            variant="outlined" 
            sx={{ borderRadius: '12px', textTransform: 'none' }}
          >
            Coming Soon
          </Button>
        </Box>
      ) : (
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
            onChange={(e) => setUrl(e.target.value)}
            error={!!error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkedInIcon sx={{ color: 'var(--text-secondary)' }} />
                </InputAdornment>
              ),
              sx: {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '& fieldset': { border: 'none' }
              }
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ 
              minWidth: 160,
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 700
            }}
          >
            Analyze Profile
          </Button>
        </Box>
      )}
      {error && (
        <Typography variant="caption" sx={{ mt: 1, color: '#ef4444', display: 'block' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
