import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, GitMerge, GitPullRequest, CheckCircle2, Clock, Sparkles } from "lucide-react";

interface Contribution {
  org: string;
  repo: string;
  prNumber: string;
  title: string;
  impact: string;
  tech: string[];
  prUrl: string;
  status: "MERGED" | "ACTIVE / IN-REVIEW";
  category: "merged" | "active";
  icon: string;
}

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
    category: "merged",
    icon: "🧠",
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
    category: "merged",
    icon: "💻",
  },
  {
    org: "Microsoft",
    repo: "microsoft/winget-pkgs",
    prNumber: "PR #403418",
    title: "Windows Package Manager Manifest Additions & Validation",
    impact: "Engineered validated package manifests, installer verification scripts, and automated submission workflows.",
    tech: ["YAML", "PowerShell", "CI/CD"],
    prUrl: "https://github.com/microsoft/winget-pkgs/pull/403418",
    status: "MERGED",
    category: "merged",
    icon: "📦",
  },
  {
    org: "Microsoft",
    repo: "microsoft/winget-pkgs",
    prNumber: "PR #400574",
    title: "Winget Package Installer Automation Pipeline",
    impact: "Automated installer lifecycle checks, package schema synchronization, and telemetry logging.",
    tech: ["YAML", "PowerShell", "Package Automation"],
    prUrl: "https://github.com/microsoft/winget-pkgs/pull/400574",
    status: "MERGED",
    category: "merged",
    icon: "📦",
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
    category: "merged",
    icon: "☸️",
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
    category: "merged",
    icon: "⚛️",
  },
  {
    org: "Microsoft",
    repo: "dotnet/aspnetcore",
    prNumber: "PR #67810",
    title: "ASP.NET Core Web Framework Runtime Routing Optimization",
    impact: "Optimized internal routing logic and request pipeline throughput for ASP.NET Core framework runtime services.",
    tech: ["C#", "ASP.NET Core", "HTTP Pipelines"],
    prUrl: "https://github.com/dotnet/aspnetcore/pull/67810",
    status: "MERGED",
    category: "merged",
    icon: "🔷",
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
    category: "merged",
    icon: "🚀",
  },
  {
    org: "Open Source AI Tooling",
    repo: "SparshGarg999/NEXUS",
    prNumber: "Active RFC",
    title: "Multi-Agent Async WebSocket Telemetry Streaming Module",
    impact: "Active architectural PR adding asynchronous token-level citation streaming and task dependency graphs for multi-agent workflows.",
    tech: ["Python", "FastAPI", "WebSockets", "LangChain"],
    prUrl: "https://github.com/SparshGarg999/NEXUS",
    status: "ACTIVE / IN-REVIEW",
    category: "active",
    icon: "⚡",
  },
  {
    org: "Career-Ops Community",
    repo: "santifer/career-ops",
    prNumber: "Active PR",
    title: "Batch Candidate Profile Ingestion & Validation Pipeline",
    impact: "Open PR implementing batch resume parser schema validation, multi-threaded regex matching, and CLI progress indicators.",
    tech: ["TypeScript", "Node.js", "Jest"],
    prUrl: "https://github.com/santifer/career-ops/pulls",
    status: "ACTIVE / IN-REVIEW",
    category: "active",
    icon: "🔄",
  },
];

export const ContributionsMatrix: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "merged" | "active">("all");

  const filteredItems = contributions.filter(
    (c) => filter === "all" || c.category === filter
  );

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
              OPEN-SOURCE IMPACT & VERIFIED CODE CONTRIBUTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              Global Ecosystem <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-rose-400 to-pink-400">
                Contributions Matrix
              </span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                filter === "all"
                  ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All ({contributions.length})
            </button>
            <button
              onClick={() => setFilter("merged")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                filter === "merged"
                  ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  : "text-slate-400 hover:text-emerald-400"
              }`}
            >
              <CheckCircle2 size={13} />
              Merged PRs ({contributions.filter((c) => c.category === "merged").length})
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                filter === "active"
                  ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "text-slate-400 hover:text-amber-400"
              }`}
            >
              <Clock size={13} />
              Active / Open ({contributions.filter((c) => c.category === "active").length})
            </button>
          </div>
        </div>

        {/* Contributions Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredItems.map((c) => (
              <motion.div
                key={c.repo + c.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
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
                      {c.status === "MERGED" ? <GitMerge size={11} /> : <GitPullRequest size={11} />}
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
                    <span>View Merged PR ({c.prNumber})</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ContributionsMatrix;
