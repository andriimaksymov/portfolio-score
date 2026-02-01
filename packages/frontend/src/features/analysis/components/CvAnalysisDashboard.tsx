import {
    FileSearch,
    Sparkles,
    AlertCircle,
    BrainCircuit,
    Layers,
    FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

interface CvAnalysisDashboardProps {
    analysis: any;
    text: string;
}

const CvAnalysisDashboard = ({ analysis, text }: CvAnalysisDashboardProps) => {
    const navigate = useNavigate();

    // Mapping backend data to UI
    const { summary, improvements, missingKeywords } = analysis;
    const score = summary.professionalLikelihood;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 animate-fade-in">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">

                {/* Header Section */}
                <div className="relative p-8 md:p-12 rounded-[3.5rem] bg-slate-900 border border-slate-800 shadow-3xl mb-12 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 blur-[100px] rounded-full -mr-20 -mt-20" />

                    <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="relative w-32 h-32 flex-shrink-0">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="60"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray="377"
                                        strokeDashoffset={377 - (377 * (score || 0)) / 100}
                                        className="text-purple-500 transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-black text-white">{score || 0}</span>
                                    <span className="text-[8px] font-black uppercase text-slate-500 tracking-tighter">Match</span>
                                </div>
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="text-4xl font-black text-white tracking-tight mb-2">ATS Compatibility Audit</h1>
                                <p className="text-slate-500 font-mono text-[11px] tracking-widest uppercase flex items-center gap-2">
                                    <Layers size={14} className="text-purple-400" /> RESUME_VERSION_FINAL <span className="text-slate-800">|</span> <span className="text-emerald-500">PARSING_SUCCESS</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
                            >
                                Upload New
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-12 gap-8">
                    {/* Main Insights */}
                    <div className="md:col-span-8 space-y-8">
                        {/* AI Executive Summary */}
                        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5"><BrainCircuit size={120} /></div>
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles className="text-purple-400" size={20} />
                                <h3 className="text-lg font-black uppercase tracking-widest text-white">AI Content Critique</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed text-lg italic">
                                "{summary.critique}"
                            </p>
                        </div>

                        {/* Improvements */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-3 px-4">
                                <FileSearch size={22} className="text-emerald-500" /> Strategic Enhancements
                            </h3>
                            {improvements.map((imp: any, i: number) => (
                                <div key={i} className="p-8 rounded-[2.5rem] bg-slate-900 border border-slate-800 group hover:border-purple-500/30 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-black text-purple-400 uppercase tracking-widest">
                                            {imp.category}
                                        </span>
                                        <AlertCircle size={16} className="text-slate-700" />
                                    </div>
                                    <p className="text-sm text-slate-500 italic mb-6">"{imp.suggestion}"</p>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                                            <div className="text-[10px] font-black text-slate-600 uppercase mb-2">Current</div>
                                            <p className="text-xs text-slate-400 font-mono break-words">"{imp.quote}"</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                                            <div className="text-[10px] font-black text-emerald-500 uppercase mb-2">Suggested Rewrite</div>
                                            <p className="text-xs text-slate-200 font-medium break-words">"{imp.rewritten}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="md:col-span-4 space-y-8">
                        {/* Industry Keywords */}
                        <div className="p-8 rounded-[2rem] bg-slate-900 border border-slate-800">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8 flex items-center gap-2 font-mono">
                                Keyword Density Gap
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {missingKeywords.map((kw: string) => (
                                    <div key={kw} className="px-3 py-1 bg-rose-500/5 border border-rose-500/10 rounded-lg flex items-center gap-2 group hover:border-rose-500/30 transition-all">
                                        <div className="w-1 h-1 rounded-full bg-rose-500 opacity-50" />
                                        <span className="text-[11px] font-bold text-slate-400 group-hover:text-rose-400">{kw}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Preview Document */}
                        <div className="p-8 rounded-[2rem] bg-slate-950 border border-slate-800">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                                <FileText size={14} /> Full Text Scan
                            </h4>
                            <div className="h-64 overflow-y-auto pr-2 custom-scrollbar">
                                <p className="text-[10px] font-mono text-slate-600 leading-relaxed whitespace-pre-wrap">
                                    {text}
                                </p>
                            </div>
                        </div>

                        {/* Signature */}
                        <div className="p-6 rounded-[2rem] bg-indigo-600 border border-indigo-400 shadow-xl shadow-indigo-600/20 text-center group cursor-pointer active:scale-95 transition-all">
                            <FileSearch className="text-white mx-auto mb-4" />
                            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Premium Unlock</h4>
                            <p className="text-[10px] text-indigo-100 mb-6 px-4">Get the AI-reconstructed PDF version of this resume.</p>
                            <button className="w-full py-3 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CvAnalysisDashboard;
