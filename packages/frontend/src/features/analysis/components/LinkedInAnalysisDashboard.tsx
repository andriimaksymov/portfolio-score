import {
    Users,
    Sparkles,
    TrendingUp,
    Briefcase,
    Target,
    ShieldCheck,
    Globe,
    CheckCircle2,
    Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

interface LinkedInAnalysisDashboardProps {
    analysis: any;
    profile: any;
}

const LinkedInAnalysisDashboard = ({ analysis, profile }: LinkedInAnalysisDashboardProps) => {
    const navigate = useNavigate();

    // Helper to map backend data to UI
    const {
        summary = { text: '', seniorityGuess: '' },
        dimensions = { overall: 0, profile: { score: 0, status: '', insights: [] }, headline: { score: 0, status: '', insights: [] }, experience: { score: 0, status: '', insights: [] }, skills: { score: 0, status: '', insights: [] }, branding: { score: 0, status: '', insights: [] } },
        recommendations = { headlines: [], aboutSuggestions: { missing: '', rewritten: '' }, experienceEdits: [] },
        missingKeywords = [],
        actionPlan = { thisWeek: [], next30Days: [], next60Days: [] }
    } = analysis || {};

    const stats = [
        { label: 'Overall Reach', val: (dimensions?.overall || 0).toString(), icon: <TrendingUp className="text-blue-500" />, sub: summary?.seniorityGuess || 'Analyzing...' },
        { label: 'Profile Strength', val: (dimensions?.profile?.score || 0).toString(), icon: <Users className="text-indigo-500" />, sub: dimensions?.profile?.status || 'Verification Pending' },
        { label: 'Market Visibility', val: (dimensions?.headline?.score || 0).toString(), icon: <Zap className="text-amber-500" />, sub: dimensions?.headline?.status || 'Scanning...' },
        { label: 'Trust Factor', val: (dimensions?.branding?.score || 0).toString(), icon: <ShieldCheck className="text-emerald-500" />, sub: dimensions?.branding?.status || 'Audit Live' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 animate-fade-in">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">

                {/* Header Section */}
                <div className="relative p-8 md:p-12 rounded-[3.5rem] bg-slate-900 border border-slate-800 shadow-3xl mb-12 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full -mr-20 -mt-20" />

                    <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {profile?.avatarUrl ? (
                                <img
                                    src={profile.avatarUrl}
                                    alt={profile.fullName}
                                    className="w-32 h-32 rounded-3xl border border-blue-500/20 object-cover shadow-2xl"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-3xl bg-blue-600/10 p-1 flex items-center justify-center border border-blue-500/20">
                                    <Users size={60} className="text-blue-400" />
                                </div>
                            )}
                            <div className="text-center md:text-left">
                                <h1 className="text-4xl font-black text-white tracking-tight mb-2">
                                    {profile?.fullName ? `${profile.fullName}'s Influence Audit` : 'Network Influence Audit'}
                                </h1>
                                <p className="text-slate-500 font-mono text-[11px] tracking-widest uppercase flex items-center gap-2">
                                    <Globe size={14} className="text-blue-400" /> {summary.seniorityGuess}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 px-8 py-4 rounded-2xl bg-slate-800 border border-slate-700 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-700 transition-all"
                            >
                                Re-Scan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl group hover:border-blue-500/30 transition-all flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">{stat.icon}</div>
                                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Live Audit</div>
                            </div>
                            <div className="text-3xl font-black text-white mb-1">{stat.val}</div>
                            <div className="text-xs text-slate-500 font-bold mb-4">{stat.label}</div>

                            {/* Insight List */}
                            <div className="space-y-2 mt-auto">
                                {(stat.label === 'Overall Reach' ? [summary.seniorityGuess] :
                                    stat.label === 'Profile Strength' ? dimensions.profile?.insights :
                                        stat.label === 'Market Visibility' ? dimensions.headline?.insights :
                                            stat.label === 'Trust Factor' ? dimensions.branding?.insights : []
                                )?.map((insight: string, idx: number) => (
                                    <div key={idx} className="flex gap-2 items-start text-[10px] text-slate-400 leading-tight">
                                        <div className="w-1 h-1 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                                        {insight}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-12 gap-8">
                    {/* Main Insights */}
                    <div className="md:col-span-8 space-y-8">
                        {/* Semantic Summary */}
                        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-900/20 to-slate-950 border border-blue-500/20 shadow-2xl relative">
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles className="text-blue-400" size={20} />
                                <h3 className="text-lg font-black uppercase tracking-widest text-white">AI Executive Narrative</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed text-lg italic">
                                "{summary.text}"
                            </p>
                        </div>

                        {/* Recommendations */}
                        <div className="p-8 rounded-[2.5rem] bg-slate-900 border border-slate-800">
                            <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-3 mb-8">
                                <Target size={20} className="text-amber-500" /> AI Optimization Strategy
                            </h3>
                            <div className="space-y-6">
                                <div className="p-5 bg-slate-950 border-l-4 border-blue-500 rounded-r-2xl">
                                    <div className="text-xs font-black text-blue-400 uppercase mb-2">Headline Suggestions</div>
                                    <ul className="space-y-3">
                                        {recommendations.headlines.map((h: string, i: number) => (
                                            <li key={i} className="text-sm text-slate-300 font-medium list-disc ml-4">"{h}"</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-5 bg-slate-950 border-l-4 border-amber-500 rounded-r-2xl">
                                    {recommendations.aboutSuggestions.missing || recommendations.aboutSuggestions.rewritten ? (
                                        <>
                                            <div className="text-xs font-black text-amber-400 uppercase mb-2">About Section Gap</div>
                                            <p className="text-sm text-slate-300 italic mb-2 font-bold">{recommendations.aboutSuggestions.missing}</p>
                                            <p className="text-xs text-slate-500 leading-relaxed font-mono">Suggested Rewrite: "{recommendations.aboutSuggestions.rewritten}"</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-xs font-black text-amber-400 uppercase mb-2">About Section Gap</div>
                                            <p className="text-slate-500 text-sm animate-pulse">Extracting Semantic Career Entities</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Experience Optimization */}
                        <div className="p-8 rounded-[2.5rem] bg-slate-900 border border-slate-800 shadow-xl">
                            <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-3 mb-8">
                                <Briefcase size={20} className="text-blue-500" /> Work Experience Optimization
                            </h3>
                            <div className="space-y-8">
                                {recommendations.experienceEdits?.length ? (
                                    recommendations.experienceEdits.map((edit: any, i: number) => (
                                        <div key={i} className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-blue-500/30 transition-colors">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="text-white font-black text-sm uppercase tracking-tight">{edit.role}</h4>
                                                    <p className="text-blue-400 text-xs font-bold">{edit.company}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Optimized Bullet Points (STAR Method)</div>
                                                {edit.improvements.map((imp: string, j: number) => (
                                                    <div key={j} className="flex gap-3 text-sm text-slate-300 leading-relaxed font-medium">
                                                        <span className="text-emerald-500 font-bold">•</span>
                                                        {imp}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-12 text-center border border-dashed border-slate-800 rounded-3xl">
                                        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest italic">No experience edits identified</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="md:col-span-4 space-y-8">
                        {/* Action Plan */}
                        <div className="p-8 rounded-[2rem] bg-slate-900 border border-slate-800">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-8 flex items-center gap-2">
                                <TrendingUp size={16} /> Roadmap (Next 60 Days)
                            </h4>
                            <div className="space-y-6">
                                {actionPlan.thisWeek.concat(actionPlan.next30Days).concat(actionPlan.next60Days).map((plan: string, i: number) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckCircle2 size={12} className="text-blue-500" />
                                        </div>
                                        <span className="text-xs text-slate-400 leading-relaxed">{plan}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Keywords */}
                        <div className="p-8 rounded-[2rem] bg-indigo-600/5 border border-indigo-500/20 relative overflow-hidden">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-6 font-mono">Missing Visibility Keywords</h4>
                            <div className="flex flex-wrap gap-2">
                                {missingKeywords.map((kw: string) => (
                                    <span key={kw} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-[10px] font-bold text-indigo-300 uppercase">
                                        {kw}
                                    </span>
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

export default LinkedInAnalysisDashboard;
