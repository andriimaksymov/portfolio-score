import { Eye, Globe } from 'lucide-react';
import { RepoAudit } from '../dashboard/RepoAudit';
import { NetworkMap } from '../dashboard/NetworkMap';
import { ATSScan } from '../dashboard/ATSScan';

interface DashboardPreviewProps {
    activeTab: string;
}

export const DashboardPreview = ({ activeTab }: DashboardPreviewProps) => {
    return (
        <section className="max-w-7xl mx-auto px-6 pb-40">
            <div className="relative group">
                <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 blur-[100px] rounded-full opacity-50 transition-opacity group-hover:opacity-70" />

                <div className="relative bg-slate-950 border border-slate-800/80 rounded-[4rem] overflow-hidden shadow-2xl">
                    {/* Console Header */}
                    <div className="border-b border-slate-800 px-10 py-8 flex flex-col md:flex-row items-center justify-between bg-slate-950/80 backdrop-blur-md gap-4">
                        <div className="flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`w-10 h-10 rounded-full border-4 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400`}>
                                        {i}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h3 className="text-base font-black uppercase tracking-widest text-white">
                                    Demo Preview: <span className="text-blue-500 font-mono tracking-normal">{activeTab.toUpperCase()}</span>
                                </h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Example Analysis Results</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors text-slate-400">
                                <Eye size={18} />
                            </button>
                            <button className="px-6 py-3 bg-slate-900 rounded-xl border border-slate-800 text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2">
                                <Globe size={14} /> Shared View
                            </button>
                        </div>
                    </div>

                    <div className="p-8 md:p-16">
                        {activeTab === 'github' && <RepoAudit />}
                        {activeTab === 'linkedin' && <NetworkMap />}
                        {activeTab === 'cv' && <ATSScan />}
                    </div>
                </div>
            </div>
        </section>
    )
}
