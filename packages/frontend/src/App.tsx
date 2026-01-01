import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Future routes */}
          {/* <Route path="/analysis/:id" element={<AnalysisPage />} /> */}
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
