import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitMerge, CheckCircle, Code2, Cpu, Globe, Terminal, Sparkles } from "lucide-react";

interface Contribution {
  org: string;
  repo: string;
  title: string;
  impact: string;
  tech: string[];
  prUrl: string;
  status: "MERGED";
  badgeColor: string;
  icon: string;
}

const contributions: Contribution[] = [
  {
    org: "Google",
    repo: "tensorflow/tensorflow",
    title: "XLA Constant Propagation & Scalar Dtype Coercion Fix",
    impact: "Resolved runtime graph execution edge-cases in tf.stack, tf.math.multiply, and tf.pow when evaluating constants in XLA compilers.",
    tech: ["C++", "Python", "XLA", "Graph Execution"],
    prUrl: "https://github.com/tensorflow/tensorflow",
    status: "MERGED",
    badgeColor: "from-amber-500/20 to-orange-500/20 border-orange-500/40 text-orange-400",
    icon: "🧠",
  },
  {
    org: "Facebook / Meta",
    repo: "facebook/react",
    title: "React DevTools Store Suspense Child Reorder Crash Fix",
    impact: "Fixed a crash in DevTools Store triggered during child reordering on filtered Suspense component boundaries within renderer.js.",
    tech: ["TypeScript", "React Internals", "DevTools"],
    prUrl: "https://github.com/facebook/react",
    status: "MERGED",
    badgeColor: "from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-400",
    icon: "⚛️",
  },
  {
    org: "Microsoft",
    repo: "microsoft/vscode",
    title: "VS Code Editor UI & Terminal Command Routing Refinements",
    impact: "Enhanced editor experience and resolved terminal command invocation lifecycle issues based on core maintainer reviews.",
    tech: ["TypeScript", "Electron", "VS Code API"],
    prUrl: "https://github.com/microsoft/vscode",
    status: "MERGED",
    badgeColor: "from-blue-500/20 to-indigo-500/20 border-blue-500/40 text-blue-400",
    icon: "💻",
  },
  {
    org: "Microsoft",
    repo: "microsoft/winget-pkgs",
    title: "Windows Package Manager Manifest & Automation Pipeline",
    impact: "Engineered validated package manifests, installer verification scripts, and automated submission workflows.",
    tech: ["YAML", "PowerShell", "CI/CD"],
    prUrl: "https://github.com/microsoft/winget-pkgs",
    status: "MERGED",
    badgeColor: "from-sky-500/20 to-blue-600/20 border-sky-500/40 text-sky-400",
    icon: "📦",
  },
  {
    org: "Cloud Native Computing Foundation",
    repo: "kubernetes/kubernetes",
    title: "Cluster Orchestration Tooling & Developer Experience",
    impact: "Maintained core developer utilities and CLI enhancements for production cluster management.",
    tech: ["Go", "Kubernetes", "Container Runtime"],
    prUrl: "https://github.com/kubernetes/kubernetes",
    status: "MERGED",
    badgeColor: "from-indigo-500/20 to-blue-500/20 border-indigo-500/40 text-indigo-400",
    icon: "☸️",
  },
  {
    org: "Microsoft",
    repo: "dotnet/aspnetcore",
    title: "ASP.NET Core Web Framework Runtime Routing Optimization",
    impact: "Optimized internal routing logic and request pipeline throughput for ASP.NET Core framework runtime services.",
    tech: ["C#", "ASP.NET Core", "HTTP Pipelines"],
    prUrl: "https://github.com/dotnet/aspnetcore",
    status: "MERGED",
    badgeColor: "from-purple-500/20 to-violet-500/20 border-purple-500/40 text-purple-400",
    icon: "🔷",
  },
  {
    org: "Career-Ops",
    repo: "santifer/career-ops",
    title: "Path Resolution Modules & Concurrency Guard Engine",
    impact: "Engineered resilient path resolution modules, SSRF security guards, and SQLite locking strategies (PR #1864).",
    tech: ["JavaScript", "Go", "SQLite", "Security"],
    prUrl: "https://github.com/santifer/career-ops/pull/1864",
    status: "MERGED",
    badgeColor: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400",
    icon: "🚀",
  },
];

export const ContributionsMatrix: React.FC = () => {
  return (
    <section id="contributions" className="relative py-28 px-6 md:px-12 lg:px-16 bg-slate-950 text-white overflow-hidden">
      {/* Ambient Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold mb-4">
              <Sparkles size={13} />
              OPEN-SOURCE IMPACT & MERGED CONTRIBUTIONS
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
              Engineered for <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-rose-500">
                Global Ecosystems
              </span>
            </h2>
          </div>
          <p className="max-w-md text-slate-400 text-sm leading-relaxed">
            Verified merged code contributions across the world's most critical open-source software libraries, runtimes, and developer tooling.
          </p>
        </div>

        {/* Contributions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributions.map((c, i) => (
            <motion.div
              key={c.repo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/40 hover:shadow-cyan-500/10"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{c.icon}</span>
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-400 block">{c.org}</span>
                      <span className="text-xs font-mono text-cyan-400 font-semibold">{c.repo}</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] font-bold">
                    <GitMerge size={12} />
                    {c.status}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-200 mb-2">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {c.impact}
                </p>
              </div>

              {/* Tech Stack Tags & Link */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
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
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 group-hover:text-cyan-300 hover:underline transition-colors"
                >
                  <span>Explore Repository / PR</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContributionsMatrix;
