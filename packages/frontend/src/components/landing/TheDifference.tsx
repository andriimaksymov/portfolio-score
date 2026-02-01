import { Shield, Zap, Code2, Heart } from 'lucide-react';

export const TheDifference = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-32">
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-widest">
                    Why This Tool
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
                    What Makes It Different.
                </h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                    Built with reliability, privacy, and accessibility as core principles.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Multi-Source */}
                <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-indigo-500/50 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative">
                        <div className="w-12 h-12 mb-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                            <Code2 className="text-indigo-400 w-6 h-6" />
                        </div>

                        <h3 className="text-xl font-black mb-3 text-white">Multi-Source</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4">
                            Analyze GitHub + LinkedIn + CV in one place. Competitors only look at GitHub.
                        </p>

                        <div className="pt-4 border-t border-slate-800">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-600 uppercase">Competitors</span>
                                <span className="ml-auto text-xs font-medium text-slate-500">1 source</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] font-bold text-indigo-400 uppercase">DevScore</span>
                                <span className="ml-auto text-xs font-bold text-white">3 sources</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Reliability */}
                <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-blue-500/50 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative">
                        <div className="w-12 h-12 mb-6 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            <Zap className="text-blue-400 w-6 h-6" />
                        </div>

                        <h3 className="text-xl font-black mb-3 text-white">Triple Fallback</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4">
                            3-tier AI architecture (Gemini → Groq → OpenAI) ensures 99%+ uptime.
                        </p>

                        <div className="pt-4 border-t border-slate-800">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-600 uppercase">Competitors</span>
                                <span className="ml-auto text-xs font-medium text-slate-500">1 provider</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] font-bold text-blue-400 uppercase">DevScore</span>
                                <span className="ml-auto text-xs font-bold text-white">3 providers</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Open Source */}
                <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative">
                        <div className="w-12 h-12 mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <Heart className="text-emerald-400 w-6 h-6" />
                        </div>

                        <h3 className="text-xl font-black mb-3 text-white">Always Free</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4">
                            Open-source and free forever. No subscriptions, no paywalls, no tracking.
                        </p>

                        <div className="pt-4 border-t border-slate-800">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-600 uppercase">Competitors</span>
                                <span className="ml-auto text-xs font-medium text-slate-500">$50-200/mo</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] font-bold text-emerald-400 uppercase">DevScore</span>
                                <span className="ml-auto text-xs font-bold text-white">$0</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Privacy */}
                <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-purple-500/50 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative">
                        <div className="w-12 h-12 mb-6 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                            <Shield className="text-purple-400 w-6 h-6" />
                        </div>

                        <h3 className="text-xl font-black mb-3 text-white">Privacy-First</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4">
                            Stateless architecture. Your data is processed and never stored long-term.
                        </p>

                        <div className="pt-4 border-t border-slate-800">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-600 uppercase">Competitors</span>
                                <span className="ml-auto text-xs font-medium text-slate-500">Stored</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] font-bold text-purple-400 uppercase">DevScore</span>
                                <span className="ml-auto text-xs font-bold text-white">Ephemeral</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
