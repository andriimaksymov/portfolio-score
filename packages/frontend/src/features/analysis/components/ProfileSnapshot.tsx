import { Box, Typography, Paper, Avatar, Stack } from '@mui/material';
import type { AnalysisResult } from '../types/analysis.types';

interface ProfileSnapshotProps {
  analysis: AnalysisResult;
}

export default function ProfileSnapshot({ analysis }: ProfileSnapshotProps) {
  const { profile, username, aiInsights } = analysis;

  return (
    <Paper
      className="glass-card animate-fade-up"
      sx={{
        p: { xs: 3, md: 4 },
        mb: 4,
        borderRadius: '24px',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative gradient background */}
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 150,
          height: 150,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      <Avatar
        src={profile.avatarUrl}
        alt={username}
        sx={{
          width: 100,
          height: 100,
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
          sx={{ mb: 1 }}
        >
          <Typography variant="h4" fontWeight="800" color="var(--text-primary)">
            {username}
          </Typography>
          {profile.company && (
            <Typography
              variant="subtitle1"
              sx={{ color: 'var(--text-secondary)', opacity: 0.8 }}
            >
              at {profile.company}
            </Typography>
          )}
        </Stack>

        <Typography
          variant="h6"
          fontWeight="600"
          sx={{
            mb: 1.5,
            background: 'linear-gradient(45deg, var(--accent-primary) 30%, #60a5fa 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            display: 'inline-block',
          }}
        >
          {aiInsights?.profileSummary || 'Software Developer'}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'var(--text-secondary)',
            maxWidth: '800px',
            fontStyle: profile.bio ? 'normal' : 'italic',
          }}
        >
          {profile.bio || 'No bio provided on GitHub.'}
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
          {profile.location && (
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
    </Paper>
  );
}
