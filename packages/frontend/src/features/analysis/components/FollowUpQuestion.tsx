import { Box, Typography, Paper, TextField, IconButton, Stack, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

export default function FollowUpQuestion() {
  const [question, setQuestion] = useState('');

  const handleSend = () => {
    if (!question.trim()) return;
    // For now, just clear the input as a placeholder for actual chat logic
    alert('Follow-up questions will be handled by the AI in the full version!');
    setQuestion('');
  };

  return (
    <Box sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h5" fontWeight="800" sx={{ mb: 3, color: 'var(--text-primary)' }}>
        💬 Ask a Follow-up
      </Typography>
      <Paper
        className="glass-card"
        sx={{
          p: 3,
          borderRadius: '24px',
          border: '1px solid var(--accent-primary)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar sx={{ bgcolor: 'var(--accent-primary)', width: 40, height: 40 }}>AI</Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="var(--text-primary)" fontWeight="600" sx={{ mb: 1 }}>
              Antigravity AI
            </Typography>
            <Typography variant="body2" color="var(--text-secondary)" sx={{ mb: 2 }}>
              Need clarification on a recommendation? Ask me anything about your analysis or what to build next.
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="e.g., 'What specific Next.js features should I use in my portfolio?'"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'var(--text-primary)',
                  bgcolor: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--accent-primary)',
                  },
                },
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
              <IconButton
                onClick={handleSend}
                disabled={!question.trim()}
                sx={{
                  color: 'var(--accent-primary)',
                  '&.Mui-disabled': { color: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                <SendIcon />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
