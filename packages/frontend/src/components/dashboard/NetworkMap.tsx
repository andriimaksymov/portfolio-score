import { Globe, Linkedin, Sparkles, UserCheck, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const NetworkMap = () => {
    return (
        <div className="grid md:grid-cols-12 gap-6 animate-fade-in">
            <div className="md:col-span-8 bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Linkedin className="text-blue-400" size={20} />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest text-white">Network Influence Map</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                        <Globe size={10} /> PUBLIC_VISIBILITY: TRUE
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50">
                        <div className="text-2xl font-black text-white">1,402</div>
                        <div className="text-[9px] text-slate-500 uppercase tracking-tighter">Engagements</div>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50">
                        <div className="text-2xl font-black text-blue-400">92%</div>
                        <div className="text-[9px] text-slate-500 uppercase tracking-tighter">Market Match</div>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50">
                        <div className="text-2xl font-black text-white">14</div>
                        <div className="text-[9px] text-slate-500 uppercase tracking-tighter">Active Leads</div>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50">
                        <div className="text-2xl font-black text-white">Top 1%</div>
                        <div className="text-[9px] text-slate-500 uppercase tracking-tighter">Industry Rank</div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                            <Sparkles size={12} className="text-amber-500" /> Optimal AI Headline
                        </h4>
                        <div className="p-5 bg-gradient-to-r from-blue-600/10 to-transparent border-l-2 border-blue-500 rounded-r-xl text-blue-100 text-sm font-medium leading-relaxed">
                            "Senior Platform Engineer @ScaleAI | Building High-Throughput Distributed Systems | Open Source Contributor for Cloud-Native Runtime Security"
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-800 flex items-start gap-3">
                            <UserCheck className="text-emerald-500 shrink-0 mt-1" size={16} />
                            <div>
                                <div className="text-[10px] font-bold uppercase text-slate-300">Sentiment Analysis</div>
                                <p className="text-[11px] text-slate-500 mt-1">Endorsements suggest high reliability in mission-critical environments.</p>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-800 flex items-start gap-3">
                            <Zap className="text-amber-500 shrink-0 mt-1" size={16} />
                            <div>
                                <div className="text-[10px] font-bold uppercase text-slate-300">Outreach Heat</div>
                                <p className="text-[11px] text-slate-500 mt-1">Recruiter hits increased by 34% following recent technical post updates.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:col-span-4 space-y-4">
                <Card className="p-6">
                    <div className="text-[10px] font-black text-slate-500 mb-6 uppercase tracking-widest">Recruiter Reachability</div>
                    <div className="space-y-5">
                        {[
                            { company: 'Meta', role: 'Staff Eng', score: 94 },
                            { company: 'OpenAI', role: 'Applied AI', score: 88 },
                            { company: 'Stripe', role: 'Infrastructure', score: 85 },
                            { company: 'Vercel', role: 'Product Eng', score: 79 }
                        ].map((hit, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[8px] font-black">{hit.company.substring(0, 2).toUpperCase()}</div>
                                <div className="flex-1">
                                    <div className="text-[10px] font-bold text-white">{hit.company}</div>
                                    <div className="text-[8px] text-slate-600 font-mono">{hit.role}</div>
                                </div>
                                <div className={`text-[10px] font-mono ${hit.score > 90 ? 'text-emerald-500' : 'text-blue-500'}`}>{hit.score}%</div>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="text-[10px] font-black text-slate-500 mb-3 uppercase tracking-widest">Top Keywords</div>
                    <div className="flex flex-wrap gap-1.5">
                        {['Distributed', 'Rust', 'Kubernetes', 'Scalability', 'Mentorship', 'FinTech'].map(k => (
                            <span key={k} className="text-[9px] px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-400">#{k}</span>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};
