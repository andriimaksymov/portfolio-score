import { Github, Settings, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate(`/#${id}`);
        }
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 py-3' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div
                    className="flex items-center gap-3 group cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tighter">DevScore</span>
                </div>
                <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
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
                <button className="md:hidden p-2 text-slate-400 cursor-pointer hover:text-white transition-colors">
                    <Settings size={20} />
                </button>
            </div>
        </nav>
    );
};
