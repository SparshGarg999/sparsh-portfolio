import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Bot, X, Send, Sparkles, RefreshCw } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string | React.ReactNode;
  time: string;
}

export const UnifiedAICyberHub: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"ai" | "cli">("ai");
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Nova, Sparsh Garg's autonomous AI agent companion. Ask me anything about his work as an AI Engineer at Genpact, merged PRs in TensorFlow & VS Code, or switch to CLI mode for shell commands.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const novaButtonRef = useRef<HTMLButtonElement>(null);

  // Nova Cursor Eye Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!novaButtonRef.current) return;
      const rect = novaButtonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);
      const maxOffset = 3.5;

      if (dist === 0) {
        setEyeOffset({ x: 0, y: 0 });
      } else {
        const clampedDist = Math.min(dist / 80, 1) * maxOffset;
        const angle = Math.atan2(dy, dx);
        setEyeOffset({
          x: Math.cos(angle) * clampedDist,
          y: Math.sin(angle) * clampedDist,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Nova Blink on Global Click + Periodic Blinks
  useEffect(() => {
    const handleGlobalClick = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    };

    window.addEventListener("click", handleGlobalClick);

    const randomBlink = setInterval(() => {
      if (Math.random() > 0.5) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 160);
      }
    }, 3600);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      clearInterval(randomBlink);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen, mode]);

  const quickPrompts = [
    "What is Sparsh's role at Genpact?",
    "Show merged PRs in Google & Meta",
    "What is NEXUS AI?",
    "How to contact Sparsh?",
  ];

  const handleCommandOrQuery = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = { role: "user", content: query, time };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");

    if (mode === "cli") {
      // CLI Terminal Commands
      const cmd = query.toLowerCase();
      let response: React.ReactNode = null;

      switch (cmd) {
        case "help":
        case "?":
          response = (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300 font-mono">
              <div><span className="text-purple-400 font-bold">whoami</span> - Developer bio</div>
              <div><span className="text-purple-400 font-bold">contributions</span> - Merged PR list</div>
              <div><span className="text-purple-400 font-bold">projects</span> - NEXUS & ExamArchitect</div>
              <div><span className="text-purple-400 font-bold">skills</span> - Full technology stack</div>
              <div><span className="text-purple-400 font-bold">knight</span> - LeetCode stats (1900+)</div>
              <div><span className="text-purple-400 font-bold">contact</span> - Email & LinkedIn</div>
              <div><span className="text-purple-400 font-bold">clear</span> - Clear terminal</div>
            </div>
          );
          break;

        case "whoami":
          response = (
            <div className="space-y-1 text-slate-200 text-xs font-mono">
              <p className="text-rose-400 font-bold">Sparsh Garg</p>
              <p>AI Engineer at <span className="text-purple-300 font-semibold">Genpact</span>, architecting autonomous multi-agent AI systems and LLM intelligence pipelines.</p>
              <p>LeetCode Knight (1900+ Rating) | SIH '22 National Runner-Up</p>
            </div>
          );
          break;

        case "contributions":
          response = (
            <div className="space-y-1.5 text-xs font-mono">
              <p className="text-emerald-400 font-bold">🧠 Google TensorFlow: <a href="https://github.com/tensorflow/tensorflow/pull/123015" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline">PR #123015 [MERGED]</a></p>
              <p className="text-emerald-400 font-bold">💻 Microsoft VS Code: <a href="https://github.com/microsoft/vscode/pull/324132" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline">PR #324132 [MERGED]</a></p>
              <p className="text-emerald-400 font-bold">☸️ Kubernetes: <a href="https://github.com/kubernetes/kubernetes/pull/140623" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline">PR #140623 [MERGED]</a></p>
              <p className="text-emerald-400 font-bold">⚛️ Facebook React: <a href="https://github.com/facebook/react" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline">DevTools Fix [MERGED]</a></p>
              <p className="text-emerald-400 font-bold">🚀 Career-Ops: <a href="https://github.com/santifer/career-ops/pull/1864" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline">PR #1864 [MERGED]</a></p>
            </div>
          );
          break;

        case "projects":
          response = (
            <div className="space-y-1 text-xs font-mono text-slate-200">
              <p>🪐 <a href="https://github.com/SparshGarg999/NEXUS" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-bold underline">NEXUS AI</a> - Autonomous multi-agent research hub</p>
              <p>📐 <a href="https://github.com/SparshGarg999/ExamArchitect" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-bold underline">ExamArchitect</a> - AI syllabus parser & prediction engine</p>
              <p>🌐 <a href="https://github.com/SparshGarg999/sparsh-portfolio" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-bold underline">3D Cyber Portfolio</a> - Three.js WebGL Interactive Universe</p>
            </div>
          );
          break;

        case "skills":
          response = (
            <div className="space-y-1 text-xs font-mono text-slate-200">
              <p><span className="text-emerald-400 font-bold">AI & ML:</span> LangChain, Multi-Agent RAG, Tavily AI, TensorFlow, PyTorch</p>
              <p><span className="text-purple-400 font-bold">Languages:</span> Python, C++, Java, TypeScript, JavaScript, Go, SQL</p>
              <p><span className="text-rose-400 font-bold">Systems & Cloud:</span> FastAPI, React, Next.js, Kubernetes, Docker, PostgreSQL</p>
            </div>
          );
          break;

        case "knight":
          response = (
            <div className="text-amber-300 space-y-1 text-xs font-mono">
              <p className="font-bold text-amber-400">⚔️ LEETCODE KNIGHT BADGE (1900+ RATING)</p>
              <p>Top 5% globally in algorithmic problem solving and dynamic programming.</p>
              <a href="https://leetcode.com/u/SparshGarg/" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline">
                View LeetCode Profile ➔
              </a>
            </div>
          );
          break;

        case "contact":
          response = (
            <div className="space-y-1 text-xs font-mono text-slate-200">
              <p>📧 Email: <a href="mailto:sparshgarg307@gmail.com" className="text-purple-300 underline">sparshgarg307@gmail.com</a></p>
              <p>💼 LinkedIn: <a href="https://www.linkedin.com/in/sparsh-garg/" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline">linkedin.com/in/sparsh-garg</a></p>
              <p>🐙 GitHub: <a href="https://github.com/SparshGarg999" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline">github.com/SparshGarg999</a></p>
            </div>
          );
          break;

        case "clear":
          setMessages([]);
          return;

        default:
          response = (
            <p className="text-rose-400 text-xs font-mono">
              Command not found: <span className="text-white">{cmd}</span>. Type <span className="text-purple-400 font-bold">help</span> for command list.
            </p>
          );
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response, time }]);
    } else {
      // Natural Language AI Mode
      setIsTyping(true);
      setTimeout(() => {
        const q = query.toLowerCase();
        let reply = "";
        if (q.includes("genpact") || q.includes("role") || q.includes("work") || q.includes("job")) {
          reply = "Sparsh is an AI Engineer at Genpact, architecting autonomous multi-agent AI systems, Large Language Model workflows, and advanced RAG pipelines for enterprise automation.";
        } else if (q.includes("open source") || q.includes("pr") || q.includes("tensorflow") || q.includes("react") || q.includes("vscode") || q.includes("kubernetes")) {
          reply = "Sparsh has merged PRs in tier-1 repositories: Google TensorFlow (PR #123015), Facebook React (DevTools Fix), Microsoft VS Code (PR #324132), Kubernetes (PR #140623), and Career-Ops (PR #1864)!";
        } else if (q.includes("nexus") || q.includes("project")) {
          reply = "NEXUS is an autonomous multi-agent AI research engine built with Python, FastAPI, LangChain, and Tavily AI that performs live synthesis and report generation.";
        } else if (q.includes("knight") || q.includes("leetcode") || q.includes("rating")) {
          reply = "Sparsh is a LeetCode Knight with a peak rating of 1900+, placing him in the top 5% globally in algorithmic problem solving.";
        } else if (q.includes("contact") || q.includes("email") || q.includes("hire")) {
          reply = "You can contact Sparsh directly at sparshgarg307@gmail.com or on LinkedIn at linkedin.com/in/sparsh-garg/!";
        } else {
          reply = "Sparsh Garg is an AI Engineer at Genpact and a LeetCode Knight specializing in multi-agent AI systems, Python, FastAPI, React, C++, and high-performance engineering. Ask me anything!";
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: reply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
        ]);
        setIsTyping(false);
      }, 450);
    }
  };

  return (
    <>
      {/* Floating Interactive Nova Mascot & AI Hub Trigger Button */}
      <motion.button
        ref={novaButtonRef}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 p-2 pr-4 rounded-full bg-slate-950/90 border border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.45)] backdrop-blur-xl text-white hover:border-rose-500/70 transition-all duration-300 font-mono text-xs font-bold pointer-events-auto group"
        aria-label="Toggle Nova AI Agent Hub"
        title="Nova: Sparsh's AI Agent Hub · Click to Chat!"
      >
        {/* Nova Avatar Head with Tracking Eyes */}
        <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-b from-purple-900/90 via-slate-950 to-slate-950 border border-purple-500/60 flex items-center justify-center p-1 shadow-inner">
          {/* Antennas */}
          <div className="absolute -top-1 left-2 w-1 h-2 rounded-t-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.8)] animate-pulse" />
          <div className="absolute -top-1 right-2 w-1 h-2 rounded-t-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.8)] animate-pulse" />

          {/* Face Plate */}
          <div className="relative w-8 h-7 rounded-lg bg-slate-950 border border-purple-500/40 flex items-center justify-center gap-1.5 px-1">
            {/* Left Eye */}
            <div className="relative w-2.5 h-2.5 rounded-full bg-slate-900 border border-rose-500/50 flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{
                  x: eyeOffset.x,
                  y: eyeOffset.y,
                  scaleY: isBlinking ? 0.05 : 1,
                }}
                transition={{ duration: isBlinking ? 0.08 : 0.12, ease: "easeOut" }}
                className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 shadow-[0_0_4px_rgba(244,63,94,1)]"
              />
            </div>

            {/* Right Eye */}
            <div className="relative w-2.5 h-2.5 rounded-full bg-slate-900 border border-rose-500/50 flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{
                  x: eyeOffset.x,
                  y: eyeOffset.y,
                  scaleY: isBlinking ? 0.05 : 1,
                }}
                transition={{ duration: isBlinking ? 0.08 : 0.12, ease: "easeOut" }}
                className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 shadow-[0_0_4px_rgba(244,63,94,1)]"
              />
            </div>
          </div>

          {/* Active Ping Dot */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
        </div>

        {/* Text Pill */}
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
            NOVA // AI HUB
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </span>
          <span className="text-[9px] text-slate-400 font-mono">Ask AI or run CLI</span>
        </div>
      </motion.button>

      {/* Unified Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-20 right-4 sm:right-8 z-50 w-[calc(100vw-2rem)] sm:w-[480px] h-[530px] bg-slate-950/95 border border-purple-500/40 rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.3)] backdrop-blur-xl flex flex-col overflow-hidden font-sans"
          >
            {/* Header with Mode Switcher */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-purple-500/20 select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 cursor-pointer" onClick={() => setIsOpen(false)} />
                <div className="w-3 h-3 rounded-full bg-amber-500 cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-1 text-xs font-mono font-bold text-slate-300">
                  Nova // Sparsh Garg AI Agent
                </span>
              </div>

              {/* Mode Toggle Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-950 border border-slate-800">
                <button
                  onClick={() => setMode("ai")}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all flex items-center gap-1 ${
                    mode === "ai"
                      ? "bg-purple-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Bot size={11} />
                  AI Chat
                </button>
                <button
                  onClick={() => setMode("cli")}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all flex items-center gap-1 ${
                    mode === "cli"
                      ? "bg-rose-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Terminal size={11} />
                  Terminal
                </button>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed font-sans">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 flex-shrink-0 mt-0.5">
                      {mode === "cli" ? <Terminal size={12} /> : <Bot size={12} />}
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 ${
                      m.role === "user"
                        ? "bg-purple-600 text-white rounded-br-none font-sans"
                        : "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-md"
                    }`}
                  >
                    {typeof m.content === "string" ? <p>{m.content}</p> : m.content}
                    <span className="text-[9px] opacity-60 mt-1 block text-right font-mono">{m.time}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-center text-slate-400 text-xs font-mono">
                  <RefreshCw size={12} className="animate-spin text-purple-400" />
                  <span>Nova is reasoning...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts (in AI Mode) */}
            {mode === "ai" && (
              <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800/80 flex gap-1.5 overflow-x-auto no-scrollbar">
                {quickPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleCommandOrQuery(p)}
                    className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-purple-600/30 hover:border-purple-500/40 border border-slate-700 text-[10px] text-slate-300 hover:text-white transition-all whitespace-nowrap flex-shrink-0"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommandOrQuery();
              }}
              className="flex items-center gap-2 p-3 bg-slate-950 border-t border-purple-500/20 font-mono"
            >
              <span className="text-purple-400 font-bold text-xs">{mode === "cli" ? "➜" : "💬"}</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={
                  mode === "cli"
                    ? "Type command (help, whoami, contributions, knight)..."
                    : "Ask Nova anything about Sparsh Garg..."
                }
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-xl bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white transition-colors"
                aria-label="Send"
              >
                <Send size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UnifiedAICyberHub;
