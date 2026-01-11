import { Avatar, Box, Container, Stack, Typography } from '@mui/material';
import type { AnalysisResult } from '../types/analysis.types';

interface ProfileSnapshotProps {
  analysis: AnalysisResult;
}

export default function ProfileSnapshot({ analysis }: ProfileSnapshotProps) {
  const { profile, username, aiInsights } = analysis;

  return (
    <Box bgcolor="#F5F7FA">
      <Container maxWidth="xl">
        <Stack direction="row" spacing={4} p={6}>
          <Avatar
            src={profile?.avatarUrl}
            alt={username}
            sx={{
              width: 140,
              height: 140,
              border: '4px solid var(--surface-glass-border)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              zIndex: 1,
            }}
          />

          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, zIndex: 1 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              alignItems="center"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              <Typography variant="h4" fontWeight="800" color="var(--text-primary)">
                {username}
              </Typography>
              {profile?.company && (
                <Typography variant="subtitle1" sx={{ color: 'var(--text-secondary)', opacity: 0.8 }}>
                  at {profile?.company}
                </Typography>
              )}
            </Stack>
            <Typography variant="body2" gutterBottom>
              {profile?.bio || 'No bio provided on GitHub.'}
            </Typography>

            <Typography variant="subtitle1" fontWeight="600">
              {aiInsights?.profileSummary || 'Software Developer'}
            </Typography>

            <Stack
              direction="row"
              spacing={3}
              sx={{ mt: 2 }}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              <Box>
                <Typography variant="h6" fontWeight="700" color="var(--text-primary)">
                  {profile.publicRepos}
                </Typography>
                <Typography variant="caption" color="var(--text-secondary)">
                  Repositories
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="700" color="var(--text-primary)">
                  {profile.followers}
                </Typography>
                <Typography variant="caption" color="var(--text-secondary)">
                  Followers
                </Typography>
              </Box>
              {profile?.location && (
                <Box>
                  <Typography variant="h6" fontWeight="700" color="var(--text-primary)">
                    {profile.location}
                  </Typography>
                  <Typography variant="caption" color="var(--text-secondary)">
                    Location
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
