import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

export default function CvUploadForm() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      navigate('/cv/results', { state: { file } });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      navigate('/cv/results', { state: { file } });
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Box
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        sx={{
          border: '2px dashed',
          borderColor: isDragging ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          p: 4,
          textAlign: 'center',
          bgcolor: isDragging ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255, 255, 255, 0.02)',
          transition: 'all 0.2s',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'var(--accent-primary)',
            bgcolor: 'rgba(255, 255, 255, 0.05)'
          }
        }}
        onClick={() => document.getElementById('cv-upload-input')?.click()}
      >
        <input
          type="file"
          id="cv-upload-input"
          accept=".pdf"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <DescriptionIcon sx={{ fontSize: 48, color: 'var(--text-secondary)', mb: 2 }} />
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Upload your CV
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3 }}>
          Drag & drop your resume (PDF) to get AI-powered feedback and score.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ 
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 700,
            px: 4
          }}
        >
          Select PDF
        </Button>
      </Box>
    </Box>
  );
}
