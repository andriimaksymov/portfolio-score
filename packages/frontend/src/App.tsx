import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import HomePage from './pages/HomePage';
import LinkedinAnalysisPage from './pages/LinkedinAnalysisPage';
import AnalysisResultsPage from './pages/AnalysisResultsPage';
import CvAnalysisPage from './pages/CvAnalysisPage';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/linkedin/results" element={<LinkedinAnalysisPage />} />
          <Route path="/cv/results" element={<CvAnalysisPage />} />
          <Route path="/results" element={<AnalysisResultsPage />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
