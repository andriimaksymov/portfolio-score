import { Outlet, Route, Routes } from 'react-router-dom';
import AnalysisResultsPage from './pages/AnalysisResultsPage';
import CvAnalysisPage from './pages/CvAnalysisPage';
import HomePage from './pages/HomePage';
import LinkedinAnalysisPage from './pages/LinkedinAnalysisPage';

const MainLayout = () => (
  <div className="flex flex-col min-h-screen bg-transparent">
    <main className="flex-grow">
      <Outlet />
    </main>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<MainLayout />}>
        <Route path="/analysis/:username" element={<AnalysisResultsPage />} />
        <Route path="/linkedin" element={<LinkedinAnalysisPage />} />
        <Route path="/cv" element={<CvAnalysisPage />} />
      </Route>
    </Routes>
  );
}

export default App;
