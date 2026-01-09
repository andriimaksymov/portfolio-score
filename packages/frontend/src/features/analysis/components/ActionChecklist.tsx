import { Box, Paper, Typography, Stack, Checkbox, Grid, LinearProgress, Chip } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useState, useEffect } from 'react';

interface ChecklistItem {
  item: string;
  metricTag: string;
}

interface ActionChecklistProps {
  items?: ChecklistItem[];
  username: string;
}

export default function ActionChecklist({ items = [], username }: ActionChecklistProps) {
  const storageKey = `portfolio-checklist-${username}`;
  
  // Default items if AI didn't provide any
  const defaultItems: ChecklistItem[] = [
    { item: 'Polished READMEs for top 3 repositories', metricTag: 'Quality' },
    { item: 'Live demo links for all current major projects', metricTag: 'Quality' },
    { item: 'Professional profile photo and bio', metricTag: 'Stack' },
    { item: 'Accurate skill tags on repositories', metricTag: 'Stack' },
    { item: 'Pinned repositories reflecting current expertise', metricTag: 'Quality' },
    { item: 'Clean and consistent commit history', metricTag: 'Consistency' },
    { item: 'Contribute to an open-source project', metricTag: 'Activity' }
  ];

  const allItems = items.length > 0 ? items : defaultItems;
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setCompleted(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load checklist', e);
      }
    }
  }, [storageKey]);

  const toggleItem = (idx: number) => {
    const newCompleted = { ...completed, [idx]: !completed[idx] };
    setCompleted(newCompleted);
    localStorage.setItem(storageKey, JSON.stringify(newCompleted));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  const totalCount = allItems.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <Paper className="glass-card" sx={{ p: { xs: 3, md: 5 }, borderRadius: '24px', mb: 4 }}>
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        alignItems={{ xs: 'flex-start', sm: 'center' }} 
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <ChecklistIcon sx={{ color: 'var(--accent-primary)', fontSize: 32 }} />
          <Typography variant="h4" fontWeight="800" color="var(--text-primary)">
            Portfolio Readiness Checklist
          </Typography>
        </Stack>

        <Box sx={{ minWidth: { sm: 200 }, width: { xs: '100%', sm: 'auto' } }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="caption" fontWeight="700" color="var(--text-secondary)">
              PROGRESS: {completedCount}/{totalCount} DONE
            </Typography>
            <Typography variant="caption" fontWeight="700" color="var(--accent-primary)">
              {progress}%
            </Typography>
          </Stack>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 6, 
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.05)',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'var(--accent-primary)',
                borderRadius: 3
              }
            }} 
          />
        </Box>
      </Stack>

      <Grid container spacing={2}>
        {allItems.map((check, idx) => (
          <Grid item xs={12} sm={6} key={idx}>
            <Box
              onClick={() => toggleItem(idx)}
              sx={{
                p: 1.5,
                borderRadius: '12px',
                bgcolor: completed[idx] ? 'rgba(34, 197, 94, 0.05)' : 'rgba(255,255,255,0.02)',
                border: '1px solid',
                borderColor: completed[idx] ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.05)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  bgcolor: completed[idx] ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255,255,255,0.04)',
                  borderColor: completed[idx] ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.1)',
                }
              }}
            >
              <Checkbox
                checked={!!completed[idx]}
              />
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: completed[idx] ? 'var(--text-secondary)' : 'var(--text-primary)',
                    textDecoration: completed[idx] ? 'line-through' : 'none',
                    fontWeight: 500
                  }}
                >
                  {check.item}
                </Typography>
              </Box>
              <Chip 
                label={check.metricTag} 
                size="small" 
                sx={{ 
                  height: 20, 
                  fontSize: '0.65rem', 
                  fontWeight: 700, 
                  bgcolor: 'rgba(255,255,255,0.05)',
                  color: 'var(--text-secondary)',
                  opacity: completed[idx] ? 0.5 : 1
                }} 
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
