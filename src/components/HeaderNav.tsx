import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import CyberCreature from "./CyberCreature";

export const HeaderNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Contributions", href: "#contributions" },
    { name: "Projects", href: "#work" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-purple-500/20 py-3 shadow-lg shadow-black/40"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
        {/* Brand Logo with Nova Mascot integrated */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-rose-500 p-[1px]">
              <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center font-mono font-black text-xs text-purple-400 group-hover:text-white transition-colors">
                SG
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-black text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5 leading-none">
                SPARSH GARG
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              </span>
              <span className="text-[9px] font-mono text-slate-400 leading-tight">Software Developer @ Genpact</span>
            </div>
          </a>

          {/* Nova Cyber Mascot Embedded at Top */}
          <div className="hidden sm:block pl-1 border-l border-slate-800">
            <CyberCreature />
          </div>
        </div>

        {/* Desktop Nav Links (Clean, No Numbers) */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs font-semibold text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-purple-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA & Socials */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="https://github.com/SparshGarg999"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/50 transition-all"
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/sparsh-garg/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-purple-400 hover:border-purple-500/50 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} />
          </a>
          <a
            href="#contact"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(168,85,247,0.35)]"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <CyberCreature />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 border-b border-purple-500/30 px-6 py-5 flex flex-col gap-4 font-mono text-sm"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-purple-400 py-1 flex items-center justify-between border-b border-slate-900"
              >
                <span>{link.name}</span>
              </a>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-lg bg-purple-600 text-white font-bold text-xs uppercase"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HeaderNav;
