import React from "react";
import { Github, Mail, ArrowUp } from "lucide-react";

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
          <a href="https://www.linkedin.com/in/sparsh-garg-2bb2483b2/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0A66C2] transition-colors flex items-center gap-1.5" title="LinkedIn Profile">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
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