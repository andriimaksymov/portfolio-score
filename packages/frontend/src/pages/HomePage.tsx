import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { DashboardPreview } from '@/components/landing/DashboardPreview';
import { ApiDocs } from '@/components/landing/ApiDocs';
import { CallToAction } from '@/components/landing/CallToAction';
import { Footer } from '@/components/landing/Footer';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { TheDifference } from '@/components/landing/TheDifference';


const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('github');
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const handleRunEngine = () => {
    if (!inputValue && activeTab !== 'cv') return;
    if (activeTab === 'cv' && !selectedFile) return;

    setIsAnalyzing(true);
    setLoadingStep(0);

    const stepsCount = 5;
    let step = 0;

    const interval = setInterval(() => {
      if (step < stepsCount - 1) {
        step++;
        setLoadingStep(step);
      } else {
        clearInterval(interval);

        if (activeTab === 'github') {
          const username = inputValue.replace(/^(https?:\/\/)?(www\.)?github\.com\//, '').split('/')[0].trim();
          if (username) navigate(`/analysis/${username}`);
        } else if (activeTab === 'linkedin') {
          navigate(`/linkedin?url=${encodeURIComponent(inputValue)}`);
        } else if (activeTab === 'cv' && selectedFile) {
          navigate('/cv', { state: { file: selectedFile } });
        }

        setIsAnalyzing(false);
      }
    }, 600);
  };

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    setInputValue(file.name); // Set input value to file name for display
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 selection:text-white">
      <Navbar />
      <Hero
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        inputValue={inputValue}
        setInputValue={setInputValue}
        isAnalyzing={isAnalyzing}
        loadingStep={loadingStep}
        onRunEngine={handleRunEngine}
        onFileUpload={handleFileUpload}
      />
      <DashboardPreview activeTab={activeTab} />
      <HowItWorks />
      <TheDifference />
      <ApiDocs />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;
