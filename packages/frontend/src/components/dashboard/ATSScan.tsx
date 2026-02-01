import { ArrowRight, FileText, Search, Settings } from 'lucide-react';


export const ATSScan = () => {
    return (
        <div className="flex flex-col animate-fade-in">
            <div className="grid md:grid-cols-12 gap-6 mb-6">
                <div className="md:col-span-4 bg-slate-950 p-8 rounded-3xl border border-slate-800 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-3 mb-8 w-full">
                        <div className="p-2 bg-purple-500/10 rounded-lg"><FileText className="text-purple-500" size={20} /></div>
                        <span className="font-black text-xs tracking-widest">ATS VALIDATION</span>
                    </div>
                    <div className="relative w-40 h-40 mb-8">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-900" />
                            <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="452" strokeDashoffset="54" className="text-purple-500 transition-all duration-1000" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-white">88</span>
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Score</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 w-full">
                        <div className="text-center p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-[9px] font-bold">PARSING:<br /><span className="text-emerald-500 uppercase tracking-widest">Excellent</span></div>
                        <div className="text-center p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-[9px] font-bold">KEYWORDS:<br /><span className="text-amber-500 uppercase tracking-widest">Partial</span></div>
                    </div>
                </div>

                <div className="md:col-span-8 bg-slate-950 p-8 rounded-3xl border border-slate-800">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-500/10 rounded-lg"><Search className="text-amber-500" size={20} /></div>
                            <span className="font-black text-xs tracking-widest uppercase">Semantic Gap Analysis</span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-600 bg-slate-900 px-3 py-1 rounded border border-slate-800">SCAN_ENGINE: 2.1.0</div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { skill: 'Cloud Architecture', status: 'present', val: 92 },
                            { skill: 'Microservices Design', status: 'present', val: 84 },
                            { skill: 'Test Driven Development', status: 'low_weight', val: 32 },
                            { skill: 'Security Compliance', status: 'missing', val: 0 }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="w-32 text-xs text-slate-400 font-bold group-hover:text-white transition-colors">{item.skill}</div>
                                <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.status === 'present' ? 'bg-emerald-500' : item.status === 'low_weight' ? 'bg-amber-500' : 'bg-slate-800'}`} style={{ width: `${item.val || 5}%` }} />
                                </div>
                                <div className="w-20 text-right">
                                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${item.status === 'present' ? 'bg-emerald-500/10 text-emerald-500' :
                                        item.status === 'low_weight' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'
                                        }`}>
                                        {item.status.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>
                        ))}

                        <div className="mt-8 p-6 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                                <Settings size={14} /> AI Structural Optimization
                            </h5>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                "Your <span className="text-white">Experience</span> section is technically sound but lacks <span className="text-white">Quantifiable Metrics</span>. Suggestion: Rewrite Bullet Point 2 in Role 'Platform Lead' to include % performance gains detected in associated GitHub repos."
                            </p>
                            <button className="mt-4 text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                                Download Optimized Version <ArrowRight size={10} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
