import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      className="glass-nav"
      sx={{ 
        background: 'rgba(5, 8, 22, 0.7)', 
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              fontWeight: 800,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              background: 'linear-gradient(45deg, #3b82f6 30%, #22c55e 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            PORTFOLIO ANALYZER
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={NavLink} to="/" color="inherit" sx={{ fontWeight: 500 }}>
              Home
            </Button>
            <Button href="#how-it-works" color="inherit" sx={{ fontWeight: 500 }}>
              How it works
            </Button>
            <Button href="#why-analyze" color="inherit" sx={{ fontWeight: 500 }}>
              Features
            </Button>
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: 'var(--accent-primary)',
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'var(--accent-primary)',
                  filter: 'brightness(1.1)'
                }
              }}
            >
              Get Started
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
