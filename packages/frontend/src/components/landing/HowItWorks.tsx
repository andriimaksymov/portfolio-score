import { Upload, BrainCircuit, Target, ArrowRight } from 'lucide-react';

export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32">
            <div className="text-center mb-12 md:mb-20 px-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-widest">
                    The Process
                </div>
                <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-white mb-6">
                    How It Works.
                </h2>
                <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
                    Three steps to get a deep analysis of your developer profile.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connection Lines (Desktop) */}
                <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-purple-500/20" />

                {/* Step 1: Submit */}
                <div className="relative">
                    <div className="bg-slate-900 border border-slate-800 rounded-[1.5rem] p-4 md:p-8 relative overflow-hidden group hover:border-indigo-500/50 transition-all">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative">
                            <div className="w-16 h-16 mb-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                <Upload className="text-indigo-400 w-8 h-8" />
                            </div>

                            <div className="absolute top-6 right-6 text-6xl font-black text-slate-800/50">01</div>

                            <h3 className="text-2xl font-black mb-4 text-white">Submit</h3>
                            <p className="text-slate-500 leading-relaxed mb-6">
                                Provide your GitHub username, LinkedIn URL (optional), or upload your resume (PDF). The more sources, the deeper the analysis.
                            </p>

                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest">GitHub</span>
                                <span className="px-3 py-1 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest">LinkedIn</span>
                                <span className="px-3 py-1 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest">CV / PDF</span>
                            </div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex absolute -right-4 top-24 z-10 w-8 h-8 items-center justify-center bg-slate-900 border border-slate-800 rounded-full">
                        <ArrowRight className="text-slate-600 w-4 h-4" />
                    </div>
                </div>

                {/* Step 2: AI Analysis */}
                <div className="relative">
                    <div className="bg-slate-900 border border-slate-800 rounded-[1.5rem] p-4 md:p-8 relative overflow-hidden group hover:border-blue-500/50 transition-all">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative">
                            <div className="w-16 h-16 mb-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                <BrainCircuit className="text-blue-400 w-8 h-8" />
                            </div>

                            <div className="absolute top-6 right-6 text-6xl font-black text-slate-800/50">02</div>

                            <h3 className="text-2xl font-black mb-4 text-white">AI Analysis</h3>
                            <p className="text-slate-500 leading-relaxed mb-6">
                                Three AI models (Gemini, Groq, OpenAI) analyze commit patterns, profile strength, and resume impact. If one fails, the next takes over.
                            </p>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs">
                                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                                    <span className="text-slate-400 font-medium">Gemini 2.0 Flash</span>
                                    <span className="ml-auto text-[10px] text-slate-600 font-bold uppercase">Primary</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-slate-400 font-medium">Groq Llama 3.3</span>
                                    <span className="ml-auto text-[10px] text-slate-600 font-bold uppercase">Fallback #1</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-slate-400 font-medium">OpenAI GPT-4o</span>
                                    <span className="ml-auto text-[10px] text-slate-600 font-bold uppercase">Fallback #2</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex absolute -right-4 top-24 z-10 w-8 h-8 items-center justify-center bg-slate-900 border border-slate-800 rounded-full">
                        <ArrowRight className="text-slate-600 w-4 h-4" />
                    </div>
                </div>

                {/* Step 3: Get Insights */}
                <div className="relative">
                    <div className="bg-slate-900 border border-slate-800 rounded-[1.5rem] p-4 md:p-8 relative overflow-hidden group hover:border-purple-500/50 transition-all">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative">
                            <div className="w-16 h-16 mb-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                <Target className="text-purple-400 w-8 h-8" />
                            </div>

                            <div className="absolute top-6 right-6 text-6xl font-black text-slate-800/50">03</div>

                            <h3 className="text-2xl font-black mb-4 text-white">Get Insights</h3>
                            <p className="text-slate-500 leading-relaxed mb-6">
                                Receive a detailed report with 4-metric scores, flagship project recommendations, and a specific action plan to improve your profile.
                            </p>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Activity</div>
                                    <div className="text-lg font-black text-white">85/100</div>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Quality</div>
                                    <div className="text-lg font-black text-white">72/100</div>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Stack</div>
                                    <div className="text-lg font-black text-white">90/100</div>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Consistency</div>
                                    <div className="text-lg font-black text-white">68/100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
