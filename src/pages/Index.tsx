import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, Terminal, Bot, Sparkles, ChevronDown, Award, GitMerge, Cpu, ShieldCheck } from "lucide-react";

// 3D & Cyber Components
import ThreeBackground from "@/components/ThreeBackground";
import CyberTerminal from "@/components/CyberTerminal";
import AIAssistantWidget from "@/components/AIAssistantWidget";
import ContributionsMatrix from "@/components/ContributionsMatrix";
import SelectedWorks from "./SelectedWorks";
import SkillsPhilosophy from "./SkillsPhilosophy";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Navigation from "@/components/Navigation";

// --- Rotating Role Pill ---
const TextRotator = () => {
  const roles = [
    "Multi-Agent AI Architect",
    "Software Developer @ Genpact",
    "Open Source Contributor (Google, Meta, MS)",
    "LeetCode Knight (1900+ Rating)",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center relative h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-rose-400 font-extrabold uppercase tracking-wide"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

// --- Brand Header Logo ---
const BrandLogo = () => (
  <div className="fixed top-6 left-6 md:top-8 md:left-10 z-50 mix-blend-difference pointer-events-auto">
    <a href="#" className="flex items-center gap-2 group">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-rose-500 p-[1px]">
        <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center font-mono font-black text-xs text-cyan-400 group-hover:text-white transition-colors">
          SG
        </div>
      </div>
      <h1 className="font-mono font-black text-lg md:text-xl tracking-tight text-white flex items-center gap-1">
        SPARSH GARG
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
      </h1>
    </a>
  </div>
);

// --- Live Availability Badge ---
const AvailabilityBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="fixed top-7 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md z-40"
  >
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
    </span>
    <span className="font-mono font-bold text-[10px] tracking-widest uppercase text-slate-300">
      Available for High-Impact Roles & AI Automations
    </span>
  </motion.div>
);

// --- Social Quick Links ---
const SocialStrip = () => {
  const socials = [
    { label: "GitHub", href: "https://github.com/SparshGarg999" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sparsh-garg/" },
    { label: "LeetCode", href: "https://leetcode.com/u/SparshGarg/" },
    { label: "Email", href: "mailto:sparshgarg307@gmail.com" },
  ];
  return (
    <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-5 z-30">
      <span className="w-[1px] h-12 bg-gradient-to-b from-transparent to-cyan-500/50" />
      {socials.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? "_self" : "_blank"}
          rel="noopener noreferrer"
          className="group text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-slate-400 hover:text-cyan-400 transition-colors"
          style={{ writingMode: "vertical-rl" }}
        >
          {label}
        </a>
      ))}
      <span className="w-[1px] h-12 bg-gradient-to-t from-transparent to-cyan-500/50" />
    </div>
  );
};

export const Index: React.FC = () => {
  return (
    <div className="min-h-screen relative bg-slate-950 text-white selection:bg-cyan-500 selection:text-black">
      <BrandLogo />
      <AvailabilityBadge />
      <Navigation />
      <SocialStrip />

      {/* Floating Interactive 3D Tools */}
      <CyberTerminal />
      <AIAssistantWidget />

      {/* --- HERO SECTION WITH 3D THREE.JS CANVAS --- */}
      <section className="relative min-h-screen flex flex-col justify-between px-6 py-24 md:px-16 md:py-20 overflow-hidden bg-slate-950">
        {/* Interactive Three.js WebGL Particle Core */}
        <ThreeBackground interactive={true} />

        {/* Ambient Top Glow Overlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-500/15 via-rose-500/10 to-transparent blur-3xl pointer-events-none" />

        {/* Top Spacer */}
        <div className="h-10" />

        {/* Center Hero Content */}
        <div className="relative z-10 max-w-5xl my-auto">
          {/* Badge Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold mb-6 backdrop-blur-md"
          >
            <Sparkles size={13} className="text-cyan-300 animate-spin" />
            <span>INTERACTIVE 3D WEBGL PORTFOLIO & AI HUB</span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-6"
          >
            DRIVEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              BY LOGIC.
            </span>
          </motion.h1>

          {/* Dynamic Role Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-2xl md:text-3xl font-semibold text-slate-300 mb-8 max-w-3xl"
          >
            I engineer <TextRotator />
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#contributions"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] flex items-center gap-2"
            >
              <span>Explore Merged PRs</span>
              <GitMerge size={15} />
            </a>

            <a
              href="#work"
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white font-mono font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <span>View 3D Projects</span>
              <ArrowUpRight size={15} />
            </a>

            <a
              href="#contact"
              className="px-6 py-3.5 rounded-xl bg-transparent hover:bg-rose-500/10 border border-rose-500/40 text-rose-400 hover:text-rose-300 font-mono font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2"
            >
              <span>Contact Me</span>
              <Mail size={15} />
            </a>
          </motion.div>
        </div>

        {/* Hero Bottom Credential Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-xl max-w-5xl"
        >
          <div className="border-r border-slate-800/80 pr-4">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold mb-1">
              <Award size={14} />
              <span>LEETCODE KNIGHT</span>
            </div>
            <p className="text-xl md:text-2xl font-black text-white">1900+ Rating</p>
            <p className="text-[10px] font-mono text-slate-400">Top 5% Global Contestant</p>
          </div>

          <div className="border-r border-slate-800/80 pr-4">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1">
              <GitMerge size={14} />
              <span>OPEN SOURCE</span>
            </div>
            <p className="text-xl md:text-2xl font-black text-white">Google & Meta</p>
            <p className="text-[10px] font-mono text-slate-400">TensorFlow, React, VS Code</p>
          </div>

          <div className="border-r border-slate-800/80 pr-4">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold mb-1">
              <Cpu size={14} />
              <span>ENTERPRISE AI</span>
            </div>
            <p className="text-xl md:text-2xl font-black text-white">Genpact</p>
            <p className="text-[10px] font-mono text-slate-400">ServiceNow & LLM Automations</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold mb-1">
              <ShieldCheck size={14} />
              <span>NATIONAL AWARDS</span>
            </div>
            <p className="text-xl md:text-2xl font-black text-white">SIH '22 Runner-Up</p>
            <p className="text-[10px] font-mono text-slate-400">Smart India Hackathon</p>
          </div>
        </motion.div>
      </section>

      {/* --- OPEN-SOURCE MERGED PR MATRIX --- */}
      <ContributionsMatrix />

      {/* --- FEATURED 3D SYSTEMS & PROJECTS --- */}
      <div id="work">
        <SelectedWorks />
      </div>

      {/* --- SKILLS & PHILOSOPHY --- */}
      <div id="philosophy">
        <SkillsPhilosophy />
      </div>

      {/* --- ABOUT & BACKGROUND DATA --- */}
      <div id="about">
        <About />
      </div>

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