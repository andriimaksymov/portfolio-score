import { Box, Typography, Paper, Stack, Button, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

interface FlagshipProjectsProps {
  projects: {
    name: string;
    reason: string;
    improvements: string[];
  }[];
}

export default function FlagshipProjects({ projects }: FlagshipProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" fontWeight="800" sx={{ mb: 3, color: 'var(--text-primary)' }}>
        🚀 Recommended Flagship Projects
      </Typography>
      <Stack spacing={3}>
        {projects.map((project, idx) => (
          <Paper
            key={idx}
            className="glass-card animate-fade-up"
            sx={{
              p: 3,
              borderRadius: '20px',
              borderLeft: '4px solid var(--accent-primary)',
            }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="flex-start">
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="h6" fontWeight="800" color="var(--text-primary)">
                    {project.name}
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<GitHubIcon />}
                    component={Link}
                    href={`https://github.com/${project.name}`}
                    target="_blank"
                    sx={{ color: 'var(--text-secondary)', textTransform: 'none', fontWeight: 600 }}
                  >
                    View
                  </Button>
                </Stack>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 2, lineHeight: 1.6 }}>
                  <strong>Why highlight this?</strong> {project.reason}
                </Typography>
              </Box>

              <Box sx={{ flex: 1, minWidth: { sm: '300px' } }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <TipsAndUpdatesIcon sx={{ color: 'var(--accent-secondary)', fontSize: '1.2rem' }} />
                  <Typography variant="subtitle2" fontWeight="700" color="var(--text-primary)">
                    Suggested Enhancements
                  </Typography>
                </Stack>
                <Stack spacing={1}>
                  {project.improvements.map((improvement, i) => (
                    <Box
                      key={i}
                      sx={{
                        p: 1.5,
                        borderRadius: '12px',
                        bgcolor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <Typography variant="body2" color="var(--text-secondary)">
                        {improvement}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
