import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minimize2, Maximize2, Sparkles, Send } from "lucide-react";

interface CommandOutput {
  command: string;
  response: React.ReactNode;
  time: string;
}

export const CyberTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "sparsh --status",
      time: "10:42:15",
      response: (
        <div className="space-y-1 text-cyan-300">
          <p className="text-emerald-400 font-bold">● SYSTEM READY // SPARSH GARG AI CORE v3.5</p>
          <p>Role: Software Developer @ Genpact | Multi-Agent AI Architect</p>
          <p>Status: Merged contributor to TensorFlow, React, VS Code, Kubernetes</p>
          <p className="text-amber-300">Type <span className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded">help</span> to view available terminal commands.</p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen, isMinimized]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const time = new Date().toLocaleTimeString();
    let response: React.ReactNode = null;

    switch (cmd) {
      case "help":
      case "?":
        response = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
            <div><span className="text-cyan-400 font-bold">whoami</span> - Developer bio & current role</div>
            <div><span className="text-cyan-400 font-bold">contributions</span> - Merged PRs in Google, Meta, MS, K8s</div>
            <div><span className="text-cyan-400 font-bold">projects</span> - NEXUS AI, ExamArchitect, Portfolio</div>
            <div><span className="text-cyan-400 font-bold">skills</span> - Full technology stack & capabilities</div>
            <div><span className="text-cyan-400 font-bold">knight</span> - LeetCode Knight stats & rating</div>
            <div><span className="text-cyan-400 font-bold">contact</span> - Email, LinkedIn, GitHub links</div>
            <div><span className="text-cyan-400 font-bold">clear</span> - Clear terminal window</div>
          </div>
        );
        break;

      case "whoami":
        response = (
          <div className="space-y-1.5 text-slate-200">
            <p className="text-rose-400 font-bold">Sparsh Garg</p>
            <p>Software Developer at <span className="text-cyan-300 font-semibold">Genpact</span>, specializing in ServiceNow & Esker workflow automations with LLMs.</p>
            <p>Passionate about multi-agent systems, graph execution runtimes, and high-performance full-stack architectures.</p>
            <p>🏆 Smart India Hackathon 2022 National Runner-Up | LeetCode Knight (1900+ Rating)</p>
          </div>
        );
        break;

      case "contributions":
        response = (
          <div className="space-y-2 text-xs">
            <div className="border-l-2 border-emerald-500 pl-2">
              <p className="font-bold text-emerald-400">🧠 Google / TensorFlow [MERGED]</p>
              <p className="text-slate-300">Fixed XLA constant propagation & dtype coercion in graph execution (tf.stack, tf.math.multiply).</p>
            </div>
            <div className="border-l-2 border-emerald-500 pl-2">
              <p className="font-bold text-emerald-400">⚛️ Facebook / React [MERGED]</p>
              <p className="text-slate-300">Fixed DevTools Store crash on filtered Suspense boundaries in renderer.js.</p>
            </div>
            <div className="border-l-2 border-emerald-500 pl-2">
              <p className="font-bold text-emerald-400">💻 Microsoft / VS Code [MERGED]</p>
              <p className="text-slate-300">Editor UI optimizations and command routing enhancements.</p>
            </div>
            <div className="border-l-2 border-emerald-500 pl-2">
              <p className="font-bold text-emerald-400">☸️ Kubernetes [MERGED]</p>
              <p className="text-slate-300">Cluster orchestration utilities and developer tooling.</p>
            </div>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="space-y-2 text-xs text-slate-200">
            <p>🪐 <span className="text-cyan-400 font-bold">NEXUS AI</span> - Autonomous multi-agent research hub (Python, FastAPI, LangChain, Tavily AI)</p>
            <p>📐 <span className="text-cyan-400 font-bold">ExamArchitect</span> - AI academic syllabus parser & prediction engine (React, Gemini 2.5 Flash)</p>
            <p>🌐 <span className="text-cyan-400 font-bold">3D Cyber Portfolio</span> - Interactive Three.js WebGL universe with real-time telemetry</p>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-1.5 text-xs text-slate-200">
            <p><span className="text-emerald-400 font-semibold">Languages:</span> Python, C++, Java, TypeScript, JavaScript, Go, SQL</p>
            <p><span className="text-cyan-400 font-semibold">AI & Systems:</span> LangChain, TensorFlow, PyTorch, Multi-Agent RAG, LLM Pipelines</p>
            <p><span className="text-violet-400 font-semibold">Frameworks:</span> FastAPI, React, Next.js, Node.js, Express, TailwindCSS</p>
            <p><span className="text-amber-400 font-semibold">Cloud & Ops:</span> Kubernetes, Docker, ServiceNow, PostgreSQL, Redis, Git</p>
          </div>
        );
        break;

      case "knight":
        response = (
          <div className="text-amber-300 space-y-1 text-xs">
            <p className="font-bold text-amber-400">⚔️ LEETCODE KNIGHT BADGE ACQUIRED</p>
            <p>Peak Contest Rating: <span className="text-white font-bold">1900+</span></p>
            <p>Top 5% globally in algorithmic problem solving, graph theory, and dynamic programming.</p>
            <a href="https://leetcode.com/u/SparshGarg/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">
              View LeetCode Profile ➔
            </a>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-1 text-xs text-slate-200">
            <p>📧 Email: <a href="mailto:sparshgarg307@gmail.com" className="text-cyan-400 underline">sparshgarg307@gmail.com</a></p>
            <p>💼 LinkedIn: <a href="https://www.linkedin.com/in/sparsh-garg-2bb2483b2/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">linkedin.com/in/sparsh-garg-2bb2483b2</a></p>
            <p>🐙 GitHub: <a href="https://github.com/SparshGarg999" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">github.com/SparshGarg999</a></p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        response = (
          <p className="text-rose-400">
            Command not recognized: <span className="text-white">{cmd}</span>. Type <span className="text-cyan-400 font-bold">help</span> for a list of commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: inputVal, response, time }]);
    setInputVal("");
  };

  return (
    <>
      {/* Floating Cyber Terminal Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/90 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.35)] backdrop-blur-md text-cyan-300 hover:text-white hover:border-cyan-400 transition-all duration-300 font-mono text-xs font-bold"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
        </span>
        <Terminal size={15} />
        <span>CYBER TERMINAL</span>
      </motion.button>

      {/* Interactive 3D Cyber Terminal Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: isMinimized ? 200 : 0,
              scale: isMinimized ? 0.8 : 1,
              height: isMinimized ? "50px" : "auto",
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-20 left-4 md:left-8 z-50 w-[calc(100vw-2rem)] md:w-[620px] max-h-[520px] bg-slate-950/95 border border-cyan-500/40 rounded-xl shadow-[0_0_40px_rgba(0,240,255,0.25)] backdrop-blur-xl flex flex-col overflow-hidden font-mono"
          >
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-cyan-500/20 select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:opacity-100 cursor-pointer" onClick={() => setIsOpen(false)} />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:opacity-100 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)} />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-cyan-400" />
                  sparsh@cyber-core:~$ (bash)
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:text-white transition-colors"
                  aria-label="Minimize"
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:text-rose-400 transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            {!isMinimized && (
              <>
                <div className="flex-1 p-4 overflow-y-auto max-h-[380px] space-y-3 text-xs leading-relaxed">
                  {history.map((h, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center gap-2 text-slate-400 font-semibold">
                        <span className="text-cyan-400">sparsh@core:~$</span>
                        <span className="text-white">{h.command}</span>
                        <span className="text-[10px] text-slate-600 ml-auto">{h.time}</span>
                      </div>
                      <div className="pl-4">{h.response}</div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>

                {/* Command Input Field */}
                <form
                  onSubmit={handleCommand}
                  className="flex items-center gap-2 px-4 py-3 bg-slate-900/60 border-t border-cyan-500/20"
                >
                  <span className="text-cyan-400 font-bold text-xs">➜</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Type a command (help, whoami, contributions, knight)..."
                    className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
                  />
                  <button
                    type="submit"
                    className="text-cyan-400 hover:text-white transition-colors p-1"
                    aria-label="Execute command"
                  >
                    <Send size={13} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CyberTerminal;
