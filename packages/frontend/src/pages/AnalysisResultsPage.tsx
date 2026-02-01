import GitHubAnalysisDashboard from '@/features/analysis/components/GitHubAnalysisDashboard';
import { useAnalyzePortfolio } from '@/features/analysis/hooks/useAnalyzePortfolio';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function AnalysisResultsPage() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { mutate: analyzePortfolio, data: analysis, isPending, isError, error } = useAnalyzePortfolio();

  useEffect(() => {
    if (!username) {
      navigate('/');
      return;
    }
    // Trigger analysis on mount
    analyzePortfolio({ username });
  }, [username, analyzePortfolio, navigate]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-slate-950">
        <div className="relative">
          <Sparkles size={48} className="text-indigo-500 animate-pulse" />
          <div className="absolute inset-0 animate-ping opacity-25">
            <Sparkles size={48} className="text-indigo-400" />
          </div>
        </div>
        <h6 className="text-[#94a3b8] font-black uppercase tracking-[0.2em]">
          Finalizing AI Report...
        </h6>
        <p className="text-slate-500 text-sm animate-pulse">Analyzing {username}'s engineering profile</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-slate-950 p-8 text-center">
        <h4 className="text-red-500 text-3xl font-black">
          Analysis Failed
        </h4>
        <p className="text-[#94a3b8] max-w-md">
          {error instanceof Error ? error.message : 'An unexpected error occurred while analyzing this profile.'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} /> Try Another Profile
        </button>
      </div>
    );
  }

  if (!analysis) return null;

  return <GitHubAnalysisDashboard analysis={analysis} />;
}
