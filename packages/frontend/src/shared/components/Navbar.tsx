import Logo from '@/assets/innovation-creativity-icon.svg?react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(() => ({
  color: '#fff',
  background: "#263238",
}));

export const Navbar = () => {
  return (
    <StyledAppBar 
      position="sticky" 
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box
            component={NavLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            <Logo
              style={{ width: 32, height: 32, fill: '#fff' }}
            />
            <Typography variant="h6" fontWeight={800}>
              SPARKFOLIO
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};
