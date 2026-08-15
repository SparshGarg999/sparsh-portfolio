import React from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-white font-sans py-14 sm:py-16 px-5 sm:px-8 md:px-14 border-t border-slate-900 relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-rose-500 p-[1px]">
            <div className="w-full h-full bg-black rounded-[6px] flex items-center justify-center font-mono font-bold text-[10px] text-cyan-400">
              SG
            </div>
          </div>
          <div>
            <p className="font-bold text-white">Sparsh Garg</p>
            <p className="text-[10px] text-slate-500">AI Engineer @ Genpact</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/SparshGarg999" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Github size={14} />
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/sparsh-garg/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </a>
          <a href="https://leetcode.com/u/SparshGarg/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
            <span>LeetCode</span>
          </a>
          <a href="mailto:sparshgarg307@gmail.com" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
            <Mail size={14} />
            <span>Email</span>
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all text-[11px]"
        >
          <span>Back to Top</span>
          <ArrowUp size={12} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;