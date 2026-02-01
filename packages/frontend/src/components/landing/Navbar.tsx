import { Github, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate(`/#${id}`);
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-500 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 py-3">
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center">
                <div
                    className="flex items-center gap-2 md:gap-3 group cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 md:p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                        <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <span className="text-xl md:text-2xl font-black text-white tracking-tighter">DevScore</span>
                </div>
                <div className="hidden lg:flex items-center gap-10 ml-auto text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    <button
                        onClick={() => scrollToSection('how-it-works')}
                        className="hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                        How It Works
                    </button>
                    <button
                        onClick={() => scrollToSection('demo')}
                        className="hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                        Analyzer
                    </button>
                    <button
                        onClick={() => scrollToSection('api')}
                        className="hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                        Architecture
                    </button>
                    <a
                        href="https://github.com/andriimaksymov"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-slate-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-xl hover:bg-slate-800"
                    >
                        <Github size={14} /> Source
                    </a>
                </div>
                <div className="flex ml-auto items-center gap-3">
                    <a
                        href="https://github.com/andriimaksymov"
                        target="_blank"
                        rel="noreferrer"
                        className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <Github size={20} />
                    </a>
                </div>
            </div>
        </nav>
    );
};
