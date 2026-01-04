import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import HomePage from './pages/HomePage';
import LinkedinAnalysisPage from './pages/LinkedinAnalysisPage';
import AnalysisResultsPage from './pages/AnalysisResultsPage';
import CvAnalysisPage from './pages/CvAnalysisPage';
import { Navbar } from './shared/components/Navbar';
import { Footer } from './shared/components/Footer';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'transparent' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/linkedin/results" element={<LinkedinAnalysisPage />} />
          <Route path="/cv/results" element={<CvAnalysisPage />} />
          <Route path="/results" element={<AnalysisResultsPage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
