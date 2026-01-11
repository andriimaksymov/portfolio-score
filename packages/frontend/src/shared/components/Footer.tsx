import { Box, Container, Typography, Link, Grid, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Logo from '@/assets/innovation-creativity-icon.svg?react';

export const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 6, 
        mt: 'auto',
        bgcolor: '#263238',
        color: '#fff'
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Logo
                style={{ width: 28, height: 28, fill: '#fff' }}
              />
              <Typography variant="h6">
                SPARKFOLIO
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3 }}>
              Transform your developer profile into actionable insights. AI-powered analysis for modern developers.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" size="small" target="_blank" component={Link} href="https://github.com/andriimaksymov/portfolio-score"><GitHubIcon /></IconButton>
              <IconButton color="inherit" size="small" target="_blank" component={Link} href="https://linkedin.com/in/andriimaksymov"><LinkedInIcon /></IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Product</Typography>
                <Link href="#" color="inherit" display="block" sx={{ mb: 1, variant: 'body2', color: 'var(--text-secondary)' }}>Home</Link>
                <Link href="#how-it-works" color="inherit" display="block" sx={{ mb: 1, variant: 'body2', color: 'var(--text-secondary)' }}>How it works</Link>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Links</Typography>
                <Link href="https://github.com/andriimaksymov/portfolio-score" target="_blank" color="inherit" display="block" sx={{ mb: 1, variant: 'body2', color: 'var(--text-secondary)' }}>GitHub</Link>
                <Link href="https://linkedin.com/in/maksymov-andrii" target="_blank" color="inherit" display="block" sx={{ mb: 1, variant: 'body2', color: 'var(--text-secondary)' }}>LinkedIn</Link>
                <Link href="mailto:support@andrii.maksymov.1@gmail.com" color="inherit" display="block" sx={{ mb: 1, variant: 'body2', color: 'var(--text-secondary)' }}>Contact</Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
            © {new Date().getFullYear()} SparkFolio. Built with ♥ for developers.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
