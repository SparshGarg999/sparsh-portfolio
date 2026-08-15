import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitMerge, Sparkles, Github } from "lucide-react";

interface Contribution {
  org: string;
  repo: string;
  prNumber: string;
  title: string;
  impact: string;
  tech: string[];
  prUrl: string;
  status: "MERGED" | "ACTIVE / IN-REVIEW";
  icon: string;
}

// Exactly 1 Microsoft card (VS Code), alongside Google, Meta, Kubernetes, Career-Ops, and NEXUS AI
const contributions: Contribution[] = [
  {
    org: "Google",
    repo: "tensorflow/tensorflow",
    prNumber: "PR #123015",
    title: "XLA Constant Propagation & Scalar Dtype Coercion Fix",
    impact: "Resolved runtime graph execution edge-cases in tf.stack, tf.math.multiply, and tf.pow when evaluating constants in XLA compilers.",
    tech: ["C++", "Python", "XLA", "Graph Execution"],
    prUrl: "https://github.com/tensorflow/tensorflow/pull/123015",
    status: "MERGED",
    icon: "🧠",
  },
  {
    org: "Facebook / Meta",
    repo: "facebook/react",
    prNumber: "DevTools",
    title: "React DevTools Store Suspense Child Reorder Crash Fix",
    impact: "Fixed a crash in DevTools Store triggered during child reordering on filtered Suspense component boundaries within renderer.js.",
    tech: ["TypeScript", "React Internals", "DevTools"],
    prUrl: "https://github.com/facebook/react",
    status: "MERGED",
    icon: "⚛️",
  },
  {
    org: "Microsoft",
    repo: "microsoft/vscode",
    prNumber: "PR #324132",
    title: "VS Code Editor UI & Terminal Command Routing Refinements",
    impact: "Enhanced editor experience and resolved terminal command invocation lifecycle issues based on core maintainer reviews.",
    tech: ["TypeScript", "Electron", "VS Code API"],
    prUrl: "https://github.com/microsoft/vscode/pull/324132",
    status: "MERGED",
    icon: "💻",
  },
  {
    org: "Cloud Native Computing Foundation",
    repo: "kubernetes/kubernetes",
    prNumber: "PR #140623",
    title: "Cluster Orchestration Tooling & Developer Experience",
    impact: "Maintained core developer utilities, cluster telemetry handlers, and CLI enhancements for production cluster management.",
    tech: ["Go", "Kubernetes", "Container Runtime"],
    prUrl: "https://github.com/kubernetes/kubernetes/pull/140623",
    status: "MERGED",
    icon: "☸️",
  },
  {
    org: "Career-Ops",
    repo: "santifer/career-ops",
    prNumber: "PR #1864",
    title: "Path Resolution Modules & SQLite Concurrency Guard",
    impact: "Engineered resilient path resolution modules, SSRF security guards, and SQLite locking strategies.",
    tech: ["JavaScript", "Go", "SQLite", "Security"],
    prUrl: "https://github.com/santifer/career-ops/pull/1864",
    status: "MERGED",
    icon: "🚀",
  },
  {
    org: "Autonomous AI Tooling",
    repo: "SparshGarg999/NEXUS",
    prNumber: "Core Engine",
    title: "Multi-Agent Async WebSocket Telemetry Streaming Module",
    impact: "Engineered asynchronous token-level citation streaming and task dependency graphs for multi-agent workflows.",
    tech: ["Python", "FastAPI", "WebSockets", "LangChain"],
    prUrl: "https://github.com/SparshGarg999/NEXUS",
    status: "ACTIVE / IN-REVIEW",
    icon: "⚡",
  },
];

export const ContributionsMatrix: React.FC = () => {
  return (
    <section id="contributions" className="relative py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-16 bg-slate-950 text-white overflow-hidden border-t border-slate-900">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-bold mb-3">
              <Sparkles size={13} />
              OPEN-SOURCE CODE CONTRIBUTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              Open Source <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-rose-400 to-pink-400">
                Contributions
              </span>
            </h2>
          </div>

          <p className="max-w-md text-slate-400 text-xs sm:text-sm leading-relaxed">
            Featured code contributions merged into tier-1 open-source runtimes, developer tooling, and distributed systems.
          </p>
        </div>

        {/* 6 High-Impact Contributions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {contributions.map((c) => (
            <motion.div
              key={c.repo + c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/30 group"
            >
              <div>
                {/* Top Meta */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.icon}</span>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-slate-400 block leading-tight">{c.org}</span>
                      <span className="text-xs font-mono text-purple-400 font-semibold">{c.repo}</span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                      c.status === "MERGED"
                        ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400"
                        : "bg-amber-500/15 border border-amber-500/40 text-amber-400"
                    }`}
                  >
                    <GitMerge size={11} />
                    {c.status}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors mb-2 leading-snug">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  {c.impact}
                </p>
              </div>

              {/* Tech Badges & Direct PR Link */}
              <div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {c.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-[10px] font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={c.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 group-hover:text-rose-400 hover:underline transition-colors"
                >
                  <span>View Contribution ({c.prNumber})</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More on GitHub CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://github.com/SparshGarg999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-mono text-xs font-bold transition-all shadow-md"
          >
            <Github size={14} />
            <span>Explore All Repositories & PRs on GitHub</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContributionsMatrix;
