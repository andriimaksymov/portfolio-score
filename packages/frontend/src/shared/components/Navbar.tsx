import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/logo.png';

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
          <Box
            component={NavLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              '&:hover': { opacity: 0.9 }
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Portfolio Analyzer Logo"
              sx={{ width: 32, height: 32, borderRadius: '6px' }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 800,
                letterSpacing: '.05rem',
                color: 'inherit',
                background: 'linear-gradient(45deg, #a5bcc7ff 20%, #b6c2d7ff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              PORTFOLIO ANALYZER
            </Typography>
          </Box>

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
