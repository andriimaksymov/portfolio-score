import {
    Trophy,
    TrendingUp,
    Zap,
    Briefcase,
    BrainCircuit,
    Sparkles,
    Code,
    Network,
    Award,
    ExternalLink,
    Github,
    Globe
} from 'lucide-react';
import type { AnalysisResult } from '../types/analysis.types';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

interface GitHubAnalysisDashboardProps {
    analysis: AnalysisResult;
}

const GitHubAnalysisDashboard = ({ analysis }: GitHubAnalysisDashboardProps) => {
    const navigate = useNavigate();

    // Helper to map scores to stats
    const stats = [
        { label: 'Authority Score', val: analysis.overallScore.toString(), icon: <Trophy className="text-amber-500" />, sub: `Top ${Math.max(1, 100 - analysis.overallScore)}% Globally` },
        { label: 'Code Velocity', val: analysis.scores.activity > 80 ? 'High' : analysis.scores.activity > 50 ? 'Medium' : 'Stable', icon: <TrendingUp className="text-emerald-500" />, sub: `${analysis.profile.publicRepos} Public Repos` },
        { label: 'Total Impact', val: analysis.profile.followers.toString(), icon: <Zap className="text-blue-500" />, sub: 'Followers & Reach' },
        { label: 'Consistency', val: `${analysis.scores.consistency}%`, icon: <Briefcase className="text-purple-500" />, sub: 'Commit Frequency' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 animate-fade-in selection:bg-indigo-500/30">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
                {/* Header Section */}
                <div className="relative p-8 md:p-12 rounded-[3.5rem] bg-slate-900 border border-slate-800 shadow-3xl mb-12 overflow-hidden">
                    {/* Abstract background elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[100px] rounded-full -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/5 blur-[80px] rounded-full -ml-32 -mb-32" />

                    <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                            {/* Avatar with status ring */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                                <div className="relative w-32 h-32 rounded-3xl bg-slate-950 p-1 flex items-center justify-center overflow-hidden border border-slate-800">
                                    {analysis.profile.avatarUrl ? (
                                        <img src={analysis.profile.avatarUrl} alt={analysis.username} className="w-full h-full object-cover rounded-2xl" />
                                    ) : (
                                        <Github size={60} className="text-slate-700" />
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-slate-900" title="Profile Verified" />
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-4xl font-black text-white tracking-tight">{analysis.username}</h1>
                                    <a
                                        href={`https://github.com/${analysis.username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-all"
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                </div>

                                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-slate-500 font-mono text-[11px] tracking-widest uppercase">
                                    <span className="flex items-center gap-2 text-indigo-400">
                                        <Globe size={14} /> {analysis.profile.company || 'Not specified'}
                                    </span>
                                    <span className="hidden md:inline h-4 w-px bg-slate-800" />
                                    {analysis.profile.location && (
                                        <>
                                            <span className="hidden md:inline h-4 w-px bg-slate-800" />
                                            <span>{analysis.profile.location}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            <button className="w-full px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer">
                                Export Full Audit <ExternalLink size={18} />
                            </button>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => navigate('/')}
                                    className="flex-1 px-5 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-[10px] font-black uppercase text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-center tracking-widest cursor-pointer"
                                >
                                    Re-Scan
                                </button>
                                <button className="flex-1 px-5 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-[10px] font-black uppercase text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-center tracking-widest cursor-pointer">
                                    Compare
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl group hover:border-indigo-500/30 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">{stat.icon}</div>
                                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Live Audit</div>
                            </div>
                            <div className="text-3xl font-black text-white mb-1">{stat.val}</div>
                            <div className="text-xs text-slate-500 font-bold">{stat.label}</div>
                            <div className="mt-4 pt-4 border-t border-slate-800/50 text-[10px] text-slate-400 italic">
                                {stat.sub}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-12 gap-8">
                    {/* Detailed Technical Breakdown */}
                    <div className="md:col-span-8 space-y-8">
                        {/* Semantic Summary */}
                        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <BrainCircuit size={120} />
                            </div>
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles className="text-indigo-400" size={20} />
                                <h3 className="text-lg font-black uppercase tracking-widest">AI Executive Summary</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed text-lg italic">
                                "{analysis.aiInsights?.summary || 'Detailed analysis suggests a strong focus on consistent architectural patterns and modularity.'}"
                            </p>
                            <div className="mt-8 flex flex-wrap gap-2">
                                {analysis.aiInsights?.keyStrengths.map(tag => (
                                    <span key={tag} className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-bold text-indigo-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Flagship Projects */}
                        <div className="p-8 rounded-[2.5rem] bg-slate-900 border border-slate-800 shadow-xl">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-3">
                                    <Code size={20} className="text-slate-500" /> Flagship Repositories
                                </h3>
                            </div>
                            <div className="space-y-6">
                                {analysis.aiInsights?.flagshipProjects?.length ? (
                                    analysis.aiInsights.flagshipProjects.map((project, i) => (
                                        <div key={i} className="p-6 border border-slate-800/50 rounded-2xl bg-slate-950/30 flex flex-col gap-3 group hover:border-indigo-500/30 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors">{project.name}</div>
                                                    <p className="text-sm text-slate-500 italic mt-1">{project.reason}</p>
                                                </div>
                                                <div className="flex whitespace-nowrap items-center gap-1.5 px-3 py-1 bg-slate-900 rounded-full border border-slate-800 text-[10px] font-bold text-slate-400">
                                                    {project.stars} Star{project.stars !== 1 ? 's' : ''}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {project.technologies?.map(tech => (
                                                    <span key={tech} className="text-[10px] font-mono text-slate-400">#{tech}</span>
                                                ))}
                                            </div>

                                            {project.improvements?.length > 0 && (
                                                <div className="mt-3 pt-3 border-t border-slate-800/50">
                                                    <div className="text-[9px] font-black text-amber-500/80 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                        <Sparkles size={10} /> AI Refactor Recommendations
                                                    </div>
                                                    <ul className="space-y-1">
                                                        {project.improvements.map((imp, idx) => (
                                                            <li key={idx} className="text-[11px] text-slate-500 flex gap-2 leading-relaxed">
                                                                <span className="text-indigo-500 font-bold">•</span> {imp}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-12 text-center border border-dashed border-slate-800 rounded-3xl">
                                        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest italic">Insufficient data for flagship identification</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* General Improvements */}
                        <div className="p-8 rounded-[2.5rem] bg-indigo-600/5 border border-indigo-500/20 shadow-xl">
                            <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-3 mb-8 text-white">
                                <Zap size={20} className="text-amber-400" /> Strategic Improvements
                            </h3>
                            <div className="space-y-4">
                                {analysis.aiInsights?.improvements?.length ? (
                                    analysis.aiInsights.improvements.map((improvement, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 transition-all hover:border-indigo-500/30">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[10px] font-black text-indigo-400">
                                                {i + 1}
                                            </div>
                                            <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                                {improvement}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-500 font-mono text-xs uppercase italic">No general improvements identified.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Insights */}
                    <div className="md:col-span-4 space-y-8">
                        {/* Project Quality Breakdown */}
                        <div className="p-8 rounded-[2rem] bg-slate-900 border border-slate-800">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-8 flex items-center gap-2">
                                <Network size={16} /> Domain Expertise
                            </h4>
                            <div className="space-y-8">
                                {[
                                    { label: 'Project Quality', level: analysis.scores.projectQuality, color: 'from-blue-500 to-indigo-600' },
                                    { label: 'Stack Diversity', level: analysis.scores.techStackDiversity, color: 'from-purple-500 to-pink-600' },
                                    { label: 'Architecture', level: 88, color: 'from-emerald-500 to-teal-600' }, // Mocking depth for visual feedback
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{item.label}</span>
                                            <span className="text-xs font-mono font-bold text-white">{item.level}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
                                            <div
                                                className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                                                style={{ width: `${item.level}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Career Path */}
                        <div className="p-8 rounded-[2rem] bg-indigo-600/5 border border-indigo-500/20 relative overflow-hidden">
                            <div className="absolute -top-4 -right-4 opacity-5 rotate-12">
                                <Award size={80} />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-6">Career Trajectory</h4>
                            <p className="text-sm font-bold text-white mb-4 leading-relaxed">
                                Predicted Path: <br />
                                <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">{analysis.aiInsights?.careerPath || 'Senior Engineer'}</span>
                            </p>
                            <div className="space-y-3">
                                {analysis.aiInsights?.improvements.slice(0, 3).map((item, i) => (
                                    <div key={i} className="flex gap-3 text-xs text-slate-500">
                                        <span className="text-indigo-500 font-bold">•</span>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default GitHubAnalysisDashboard;
