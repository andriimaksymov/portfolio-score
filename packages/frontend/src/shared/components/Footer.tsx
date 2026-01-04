import { Box, Container, Typography, Link, Grid, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

export const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 6, 
        mt: 'auto',
        bgcolor: 'rgb(5, 8, 22)',
        color: '#fff'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, background: 'linear-gradient(45deg, #3b82f6 30%, #22c55e 90%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              PORTFOLIO ANALYZER
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3 }}>
              Transform your developer profile into actionable insights. AI-powered analysis for modern developers.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" size="small"><GitHubIcon /></IconButton>
              <IconButton color="inherit" size="small"><LinkedInIcon /></IconButton>
              <IconButton color="inherit" size="small"><TwitterIcon /></IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Product</Typography>
                <Link href="#" color="inherit" display="block" sx={{ mb: 1, variant: 'body2', color: 'var(--text-secondary)' }}>Home</Link>
                <Link href="#how-it-works" color="inherit" display="block" sx={{ mb: 1, variant: 'body2', color: 'var(--text-secondary)' }}>How it works</Link>
                <Link href="#why-analyze" color="inherit" display="block" sx={{ mb: 1, variant: 'body2', color: 'var(--text-secondary)' }}>Features</Link>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Legal</Typography>
                <Link href="#" color="inherit" display="block" sx={{ mb: 1, variant: 'body2', color: 'var(--text-secondary)' }}>Privacy Policy</Link>
                <Link href="#" color="inherit" display="block" sx={{ mb: 1, variant: 'body2', color: 'var(--text-secondary)' }}>Terms of Service</Link>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Contact</Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>support@portfolio.dev</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
            © {new Date().getFullYear()} Portfolio Analyzer. Built with ♥ for developers.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
