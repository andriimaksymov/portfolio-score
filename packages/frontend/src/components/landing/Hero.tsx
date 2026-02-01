import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, FileText, Github, Linkedin, Upload } from 'lucide-react';

interface HeroProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    inputValue: string;
    setInputValue: (val: string) => void;
    isAnalyzing: boolean;
    loadingStep: number;
    onRunEngine: () => void;
    onFileUpload?: (file: File) => void;
}

export const Hero = ({ activeTab, setActiveTab, inputValue, setInputValue, isAnalyzing, loadingStep, onRunEngine, onFileUpload }: HeroProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onFileUpload) {
            onFileUpload(file);
        }
    };

    const renderInputArea = () => {
        switch (activeTab) {
            case 'github':
                return (
                    <div className="flex-1 flex items-center px-4 gap-3">
                        <Github className="w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="github.com/your-handle"
                            className="bg-transparent border-none outline-none w-full text-slate-200 placeholder:text-slate-600 py-3 text-sm md:text-base focus:ring-0"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>
                );
            case 'linkedin':
                return (
                    <div className="flex-1 flex items-center px-4 gap-3">
                        <Linkedin className="w-5 h-5 text-blue-500" />
                        <input
                            type="text"
                            placeholder="linkedin.com/in/your-profile"
                            className="bg-transparent border-none outline-none w-full text-slate-200 placeholder:text-slate-600 py-3 text-sm md:text-base focus:ring-0"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>
                );
            case 'cv':
                return (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 flex items-center px-4 gap-3 group cursor-pointer overflow-hidden"
                    >
                        <Upload className="w-5 h-5 text-purple-500 group-hover:animate-bounce flex-shrink-0" />
                        <span className="text-slate-400 py-3 text-sm truncate">
                            {inputValue || 'Click to upload Resume (PDF)'}
                        </span>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf"
                            onChange={handleFileChange}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="relative pt-48 pb-24 overflow-hidden">
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full h-[800px] bg-indigo-600/5 blur-[160px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-[10px] font-black text-indigo-400 mb-10 uppercase tracking-[0.2em] shadow-xl">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    Multi-Source Portfolio Analyzer • GitHub + LinkedIn + CV
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-9xl font-black mb-10 tracking-tighter leading-[0.85] text-white">
                    Your Complete <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500">
                        Dev Profile, Scored.
                    </span>
                </h1>

                <p className="max-w-3xl mx-auto text-base md:text-xl text-slate-400 mb-12 md:mb-16 leading-relaxed font-medium px-4">
                    Analyze your GitHub contributions, LinkedIn presence, and resume impact in one place.
                </p>

                <div id="demo" className="max-w-4xl mx-auto mb-20 relative">
                    {/* Analysis Overlay */}
                    {isAnalyzing && (
                        <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center p-8 border border-indigo-500/20">
                            <div className="w-64 h-2 bg-slate-900 rounded-full mb-6 overflow-hidden">
                                <div
                                    className="h-full bg-indigo-500 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                                    style={{ width: `${(loadingStep + 1) * 20}%` }}
                                />
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 animate-pulse text-center">
                                {[
                                    activeTab === 'cv' ? "Scanning PDF vectors..." : "Cloning repositories...",
                                    activeTab === 'cv' ? "Extracting career entities..." : "Analyzing commit semantics...",
                                    activeTab === 'cv' ? "Evaluating impact metrics..." : "Evaluating code quality...",
                                    activeTab === 'cv' ? "Matching market keywords..." : "Cross-referencing market data...",
                                    "Finalizing AI report..."
                                ][loadingStep]}
                            </div>
                        </div>
                    )}

                    <div className="flex p-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl md:rounded-3xl w-full sm:w-fit mx-auto mb-8 shadow-2xl overflow-x-auto no-scrollbar">
                        {[
                            { id: 'github', label: 'GitHub', icon: <Github size={14} /> },
                            { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={14} /> },
                            { id: 'cv', label: 'Resume', icon: <FileText size={14} /> }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setInputValue(''); }}
                                className={cn(
                                    "flex items-center gap-2 px-4 md:px-8 py-3 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap flex-1 sm:flex-none justify-center",
                                    activeTab === tab.id
                                        ? 'bg-white text-slate-950 shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                                        : 'text-slate-500 hover:text-slate-300'
                                )}
                            >
                                {tab.icon} <span className="hidden xs:inline">{tab.label}</span><span className="xs:hidden">{tab.id === 'github' ? 'GH' : tab.id === 'linkedin' ? 'LI' : 'CV'}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 p-3 bg-slate-900/50 border-2 border-slate-800 rounded-3xl md:rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] focus-within:border-blue-500/30 transition-all duration-700 relative z-10">
                        {renderInputArea()}
                        <Button
                            onClick={() => {
                                if (activeTab === 'github' && inputValue) {
                                    onRunEngine();
                                } else if (activeTab === 'linkedin' && inputValue) {
                                    onRunEngine();
                                } else if (activeTab === 'cv' && inputValue) {
                                    onRunEngine();
                                }
                            }}
                            disabled={isAnalyzing || !inputValue}
                            variant="demo"
                            size="xl"
                            className={cn(
                                "w-full md:w-auto",
                                isAnalyzing || !inputValue ? 'bg-slate-800 text-slate-500' : ''
                            )}
                        >
                            {isAnalyzing ? 'Processing...' : 'Run Analysis'}
                            <ArrowRight size={18} className={isAnalyzing ? 'animate-spin' : ''} />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
