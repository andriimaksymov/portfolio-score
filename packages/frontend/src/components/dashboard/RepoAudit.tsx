import { Activity, Code2, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const RepoAudit = () => {
    return (
        <div className="grid md:grid-cols-12 gap-6 animate-fade-in">
            <div className="md:col-span-4 space-y-4">
                <Card className="p-6 shadow-inner">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-bold">Code Velocity (LTM)</div>
                    <div className="flex items-center gap-2">
                        <Activity className="text-emerald-500 w-5 h-5" />
                        <span className="text-3xl font-black">243 Commits</span>
                    </div>
                    <div className="mt-4 flex gap-1 h-12 items-end">
                        {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60, 40, 55, 75].map((h, i) => (
                            <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500/10 to-emerald-500/40 rounded-t-sm" style={{ height: `${h}%` }} />
                        ))}
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-4 font-bold">Semantic Expertise</div>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500"><span>System Architecture</span><span>88%</span></div>
                            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[88%]" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500"><span>API Reliability</span><span>94%</span></div>
                            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[94%]" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500"><span>Concurrency Control</span><span>72%</span></div>
                            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 w-[72%]" />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="md:col-span-8 bg-slate-950 p-8 rounded-2xl border border-slate-800 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-sm tracking-tighter">
                        <Code2 size={16} /> REPOSITORY IMPACT AUDIT
                    </div>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <div className="w-2 h-2 rounded-full bg-slate-800" />
                    </div>
                </div>
                <div className="space-y-3 flex-1">
                    {[
                        { name: 'nebula-engine', desc: 'Custom WASM runtime for heavy compute', rank: 'A+', color: 'text-emerald-400' },
                        { name: 'react-gl-transition', desc: 'GPU accelerated transitions for React', rank: 'A', color: 'text-blue-400' },
                        { name: 'distributed-queue-py', desc: 'Zero-dependency async broker', rank: 'B+', color: 'text-slate-400' }
                    ].map((repo, i) => (
                        <div key={i} className="p-4 border border-slate-800/50 rounded-xl bg-slate-900/30 flex justify-between items-center group hover:border-slate-700 transition-colors">
                            <div>
                                <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{repo.name}</div>
                                <div className="text-[10px] text-slate-500 italic">{repo.desc}</div>
                            </div>
                            <div className={`font-mono text-sm font-black ${repo.color}`}>{repo.rank}</div>
                        </div>
                    ))}
                    <div className="p-6 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/10 rounded-2xl mt-6 relative overflow-hidden">
                        <Sparkles className="absolute top-2 right-2 w-12 h-12 text-indigo-500/10" />
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase mb-2 tracking-widest">Technical Synthesis</h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            Analysis of these repositories suggests a strong focus on <span className="text-white font-bold">consistent architectural patterns</span>. The commit history reflects a preference for modularity and defensive coding. Expertise in <span className="text-white">low-level performance optimization</span> is evident across multiple projects.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
