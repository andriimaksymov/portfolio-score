import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import client from '@/api/client';
import LinkedInAnalysisDashboard from '../features/analysis/components/LinkedInAnalysisDashboard';

export default function LinkedinAnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const targetUrl = queryParams.get('url');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!targetUrl) {
      setError('No LinkedIn URL provided.');
      setLoading(false);
      return;
    }

    const runAnalysis = async () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      try {
        const res = await client.post('/linkedin/analyze-url', { url: targetUrl });
        setData(res.data);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to analyze LinkedIn profile.');
        setLoading(false);
      }
    };

    runAnalysis();
  }, [targetUrl]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-slate-950">
        <div className="relative">
          <Sparkles size={48} className="text-blue-500 animate-pulse" />
          <div className="absolute inset-0 animate-ping opacity-25">
            <Sparkles size={48} className="text-blue-400" />
          </div>
        </div>
        <h6 className="text-[#94a3b8] font-black uppercase tracking-[0.2em]">
          Mapping Network...
        </h6>
        <p className="text-slate-500 text-sm animate-pulse">Running AI Career Intelligence</p>
      </div>
    );
  }

  if (error || !data?.analysis) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-slate-950 text-white p-8 text-center">
        <h5 className="text-2xl font-black mb-4">ANALYSIS_FAILED</h5>
        <p className="text-red-500 mb-8 max-w-md">{error || 'The AI engine encountered a sector timeout. Please verify your profile visibility.'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 rounded-2xl bg-slate-800 border border-slate-700 text-white font-black text-xs uppercase tracking-[0.2em] cursor-pointer hover:bg-slate-700 transition-colors"
        >
          Return to Terminal
        </button>
      </div>
    );
  }

  return <LinkedInAnalysisDashboard analysis={data.analysis} profile={data.profile} />;
}
