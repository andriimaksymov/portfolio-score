import { Typography, MenuItem, Select, FormControl, Paper } from '@mui/material';
import { useState } from 'react';

export type TargetRole = 'Frontend' | 'Backend' | 'Full-stack' | 'Data' | 'Mobile' | 'Other';

interface RoleSelectorProps {
  onRoleChange: (role: TargetRole) => void;
}

export default function RoleSelector({ onRoleChange }: RoleSelectorProps) {
  const [role, setRole] = useState<TargetRole>('Full-stack');

  const handleChange = (event: any) => {
    const newRole = event.target.value as TargetRole;
    setRole(newRole);
    onRoleChange(newRole);
  };

  return (
    <Paper
      className="glass-card"
      sx={{
        p: 2,
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 4,
      }}
    >
      <Typography variant="subtitle2" fontWeight="700" color="var(--text-primary)" sx={{ minWidth: 'fit-content' }}>
        🎯 Target Role:
      </Typography>
      <FormControl size="small" fullWidth sx={{ maxWidth: 200 }}>
        <Select
          value={role}
          onChange={handleChange}
          sx={{
            color: 'var(--text-primary)',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--accent-primary)',
            },
            '.MuiSelect-icon': {
              color: 'var(--text-secondary)',
            },
          }}
        >
          <MenuItem value="Frontend">Frontend Engineer</MenuItem>
          <MenuItem value="Backend">Backend Engineer</MenuItem>
          <MenuItem value="Full-stack">Full-stack Developer</MenuItem>
          <MenuItem value="Mobile">Mobile Developer</MenuItem>
          <MenuItem value="Data">Data Scientist/Engineer</MenuItem>
          <MenuItem value="Other">Other / Specialist</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="caption" color="var(--text-secondary)" sx={{ display: { xs: 'none', sm: 'block' } }}>
        Selecting a role adjusts AI priorities & suggestions
      </Typography>
    </Paper>
  );
}
