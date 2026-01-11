import { Paper, styled } from '@mui/material';

export const GlassCard = styled(Paper)(() => ({
  background: '#F5F7FA',
  boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.2)',
  borderRadius: '24px',
  overflow: 'hidden',
  transition: 'transform 0.2s ease-in-out, border-color 0.2s ease-in-out',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.15)',
  }
}));

export const WidgetHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const WidgetContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
}));
