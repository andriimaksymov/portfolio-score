import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import client from '@/api/client';
import CvAnalysisDashboard from '../features/analysis/components/CvAnalysisDashboard';

export default function CvAnalysisPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [analysisState, setAnalysisState] = useState<{
    loading: boolean;
    text: string;
    analysis: any;
    error: string | null;
  }>({
    loading: true,
    text: '',
    analysis: null,
    error: null,
  });

  const file = location.state?.file;

  useEffect(() => {
    if (!file) {
      setAnalysisState(s => ({ ...s, loading: false, error: 'No file provided' }));
      return;
    }

    const uploadAndAnalyze = async () => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await client.post('/cv/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        setAnalysisState({
          loading: false,
          text: res.data.fullText,
          analysis: res.data.analysis,
          error: null
        });
      } catch (err: any) {
        console.error(err);
        setAnalysisState({
          loading: false,
          text: '',
          analysis: null,
          error: err.response?.data?.message || 'Failed to analyze CV'
        });
      }
    };

    uploadAndAnalyze();
  }, [file]);

  if (analysisState.loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-slate-950">
        <div className="relative">
          <Sparkles size={48} className="text-purple-500 animate-pulse" />
          <div className="absolute inset-0 animate-ping opacity-25">
            <Sparkles size={48} className="text-purple-400" />
          </div>
        </div>
        <h6 className="text-[#94a3b8] font-black uppercase tracking-[0.2em]">
          Parsing PDF Vectors...
        </h6>
        <p className="text-slate-500 text-sm animate-pulse">Extracting Semantic Career Entities</p>
      </div>
    );
  }

  if (analysisState.error || !analysisState.analysis) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-slate-950 text-white p-8 text-center">
        <h5 className="text-2xl font-black mb-4">PARSING_FAILED</h5>
        <p className="text-red-500 mb-8 max-w-md">{analysisState.error || 'The document format is incompatible with our current vector engine.'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 rounded-2xl bg-slate-800 border border-slate-700 text-white font-black text-xs uppercase tracking-[0.2em] cursor-pointer hover:bg-slate-700 transition-colors"
        >
          Return to Terminal
        </button>
      </div>
    );
  }

  return <CvAnalysisDashboard analysis={analysisState.analysis} text={analysisState.text} />;
}
