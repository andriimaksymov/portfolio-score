import { Box, Container, Grid } from '@mui/material';
import type { ReactNode } from 'react';

interface DashboardGridProps {
  hero: ReactNode;
  health: ReactNode;
  roadmap: ReactNode;
  projects: ReactNode;
}

export default function DashboardGrid({ hero, health, roadmap, projects }: DashboardGridProps) {
  return (
    <Box sx={{ pb: 8, pt: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Hero Section - Top Full Width */}
          <Grid item xs={12}>
            {hero}
          </Grid>

          {/* Main Content Grid - Bento Style */}
          {/* Left Column: Health & Stats */}
          <Grid item xs={12} lg={4} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {health}
          </Grid>

          {/* Middle Column: Roadmap & Actions */}
          <Grid item xs={12} lg={5} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {roadmap}
          </Grid>

          {/* Right Column: Featured Projects & Extra */}
          <Grid item xs={12} lg={3} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {projects}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
