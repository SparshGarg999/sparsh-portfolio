import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, GitMerge, Award, Cpu, ShieldCheck, Sparkles, Code2, Layers3, Globe } from "lucide-react";

// 3D & Cyber Components
import HeaderNav from "@/components/HeaderNav";
import ThreeBackground from "@/components/ThreeBackground";
import CyberCreature from "@/components/CyberCreature";
import UnifiedAICyberHub from "@/components/UnifiedAICyberHub";
import ContributionsMatrix from "@/components/ContributionsMatrix";
import SelectedWorks from "./SelectedWorks";
import Contact from "./Contact";
import Footer from "./Footer";

// --- Role Rotator ---
const FocusRotator = () => {
  const focuses = [
    "Autonomous Multi-Agent AI Architectures",
    "Enterprise ServiceNow & Esker Workflows",
    "High-Performance Open-Source Runtimes",
    "Scalable Full-Stack Engineering Systems",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % focuses.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center relative h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={focuses[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-rose-400 to-pink-400 font-extrabold"
        >
          {focuses[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export const Index: React.FC = () => {
  return (
    <div className="min-h-screen relative bg-slate-950 text-white selection:bg-purple-500 selection:text-white font-sans pt-16 sm:pt-20">
      {/* Pinned Fixed Top Navigation (Clean, No Numbers) */}
      <HeaderNav />

      {/* Interactive Cursor-Tracking & Blinking Cyber Mascot (Nova) */}
      <CyberCreature />

      {/* Single Unified AI Cyber Assistant & Terminal Hub */}
      <UnifiedAICyberHub />

      {/* --- HERO SECTION WITH 3D PURPLE GLOBE & RED ORBITS --- */}
      <section className="relative min-h-[90vh] sm:min-h-[92vh] flex flex-col justify-between px-5 sm:px-8 md:px-14 py-16 sm:py-20 overflow-hidden bg-slate-950">
        {/* Three.js 3D WebGL Purple Globe & Neon Red Orbits with Shockwave Bursts */}
        <ThreeBackground interactive={true} />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[300px] bg-gradient-to-b from-purple-500/15 via-rose-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="h-4 sm:h-8" />

        {/* Hero Headline Content */}
        <div className="relative z-10 max-w-4xl my-auto">
          {/* Badge Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-[11px] sm:text-xs font-bold mb-4 sm:mb-6 backdrop-blur-md"
          >
            <Sparkles size={12} className="text-rose-400 animate-spin" />
            <span>SOFTWARE DEVELOPER @ GENPACT · LEETCODE KNIGHT · OPEN SOURCE</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.95] mb-4 sm:mb-6"
          >
            DRIVEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-purple-300">
              BY LOGIC.
            </span>
          </motion.h1>

          {/* Grammatically Crisp Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-xl md:text-2xl font-semibold text-slate-300 mb-6 sm:mb-8"
          >
            Specializing in <FocusRotator />
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <a
              href="#contributions"
              className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(168,85,247,0.35)] flex items-center gap-2"
            >
              <span>Code Contributions</span>
              <GitMerge size={14} />
            </a>

            <a
              href="#work"
              className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-mono font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <span>Featured Projects</span>
              <ArrowUpRight size={14} />
            </a>

            <a
              href="#contact"
              className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-transparent hover:bg-purple-500/10 border border-purple-500/40 text-purple-300 hover:text-white font-mono font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2"
            >
              <span>Get In Touch</span>
              <Mail size={14} />
            </a>
          </motion.div>
        </div>

        {/* Hero Credential Strip */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl max-w-5xl mt-6"
        >
          <div className="border-r border-slate-800 pr-2 sm:pr-4">
            <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-bold mb-1">
              <Award size={13} />
              <span>LEETCODE KNIGHT</span>
            </div>
            <p className="text-lg sm:text-2xl font-black text-white">1900+ Rating</p>
            <p className="text-[10px] font-mono text-slate-400">Top 5% Global Algorithmic Rank</p>
          </div>

          <div className="md:border-r border-slate-800 pr-2 sm:pr-4">
            <div className="flex items-center gap-1.5 text-purple-400 font-mono text-[11px] font-bold mb-1">
              <GitMerge size={13} />
              <span>OPEN SOURCE</span>
            </div>
            <p className="text-lg sm:text-2xl font-black text-white">Google & Meta</p>
            <p className="text-[10px] font-mono text-slate-400">TensorFlow, React, VS Code</p>
          </div>

          <div className="border-r border-slate-800 pr-2 sm:pr-4">
            <div className="flex items-center gap-1.5 text-rose-400 font-mono text-[11px] font-bold mb-1">
              <Cpu size={13} />
              <span>ENTERPRISE AI</span>
            </div>
            <p className="text-lg sm:text-2xl font-black text-white">Genpact</p>
            <p className="text-[10px] font-mono text-slate-400">ServiceNow & LLM Automations</p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-bold mb-1">
              <ShieldCheck size={13} />
              <span>SIH '22 RUNNER-UP</span>
            </div>
            <p className="text-lg sm:text-2xl font-black text-white">National Award</p>
            <p className="text-[10px] font-mono text-slate-400">Smart India Hackathon</p>
          </div>
        </motion.div>
      </section>

      {/* --- ABOUT & EXECUTIVE SUMMARY SECTION --- */}
      <section id="about" className="py-20 md:py-28 px-5 sm:px-8 md:px-14 bg-slate-950 border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block mb-2">Background & Journey</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Architecting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400">
                  Intelligent Systems
                </span>
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              <p>
                I am a Software Developer at <strong className="text-white font-semibold">Genpact</strong>, engineering autonomous multi-agent AI systems, ServiceNow workflows, and Esker order-to-cash automations integrated with Large Language Models.
              </p>
              <p>
                As a core open-source contributor, I have authored merged PRs in tier-1 repositories including <strong className="text-white">Google TensorFlow</strong> (XLA constant propagation), <strong className="text-white">Facebook React</strong> (DevTools Store Suspense fix), <strong className="text-white">Microsoft VS Code & Winget</strong>, and <strong className="text-white">Kubernetes</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-xs font-mono text-slate-400 uppercase">Education</p>
                  <p className="text-base font-bold text-white mt-1">B.Tech in Computer Science</p>
                  <p className="text-xs text-slate-400">JECRC (2020–2024) • CGPA: 9.13</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-xs font-mono text-slate-400 uppercase">Competitive Programming</p>
                  <p className="text-base font-bold text-amber-400 mt-1">LeetCode Knight (1900+)</p>
                  <p className="text-xs text-slate-400">SIH 2022 National Runner-Up</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OPEN-SOURCE CODE CONTRIBUTIONS (TOP 6) --- */}
      <ContributionsMatrix />

      {/* --- FEATURED 3D SYSTEMS & PROJECTS --- */}
      <div id="work">
        <SelectedWorks />
      </div>

      {/* --- CATEGORIZED TECH STACK --- */}
      <section id="skills" className="py-20 md:py-28 px-5 sm:px-8 md:px-14 bg-slate-950 border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block mb-2">Tech Stack</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Categorized Engineering Arsenal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Category 1: AI & ML */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
                  <Cpu size={18} />
                </div>
                <h3 className="text-sm font-mono font-bold text-white uppercase mb-3">AI & Multi-Agent</h3>
                <div className="flex flex-wrap gap-1.5">
                  {["LangChain", "Multi-Agent RAG", "Tavily AI", "TensorFlow", "PyTorch", "Prompt Engineering"].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-md bg-slate-800/80 text-[11px] font-mono text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Category 2: Languages */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                  <Code2 size={18} />
                </div>
                <h3 className="text-sm font-mono font-bold text-white uppercase mb-3">Languages & Core</h3>
                <div className="flex flex-wrap gap-1.5">
                  {["Python", "C++", "Java", "TypeScript", "JavaScript", "Go", "SQL"].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-md bg-slate-800/80 text-[11px] font-mono text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Category 3: Frameworks */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                  <Layers3 size={18} />
                </div>
                <h3 className="text-sm font-mono font-bold text-white uppercase mb-3">Frameworks & Web</h3>
                <div className="flex flex-wrap gap-1.5">
                  {["FastAPI", "React", "Next.js", "Three.js", "Node.js", "Express", "TailwindCSS"].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-md bg-slate-800/80 text-[11px] font-mono text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Category 4: Cloud & Ops */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <Globe size={18} />
                </div>
                <h3 className="text-sm font-mono font-bold text-white uppercase mb-3">Cloud & Enterprise</h3>
                <div className="flex flex-wrap gap-1.5">
                  {["Kubernetes", "Docker", "ServiceNow", "PostgreSQL", "MongoDB", "Git / GitHub"].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-md bg-slate-800/80 text-[11px] font-mono text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <div id="contact">
        <Contact />
      </div>

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
};

export default Index;