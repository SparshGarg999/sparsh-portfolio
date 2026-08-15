import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles, User, RefreshCw } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
  time: string;
}

export const AIAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Sparsh Garg's AI Assistant. Ask me anything about his enterprise AI automations at Genpact, merged open-source PRs in TensorFlow & React, or algorithmic problem solving!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    "What is Sparsh's role at Genpact?",
    "Tell me about his Open Source PRs",
    "What is NEXUS AI?",
    "How to contact Sparsh?",
  ];

  const generateAnswer = (prompt: string): string => {
    const q = prompt.toLowerCase();
    if (q.includes("genpact") || q.includes("role") || q.includes("work") || q.includes("job")) {
      return "Sparsh is currently a Software Developer at Genpact, specializing in enterprise workflow automations across ServiceNow and Esker, integrating Large Language Models (LLMs) and multi-agent RAG pipelines for business automation.";
    }
    if (q.includes("open source") || q.includes("pr") || q.includes("tensorflow") || q.includes("react") || q.includes("vscode") || q.includes("kubernetes")) {
      return "Sparsh has multiple merged pull requests in major industry repositories: Google TensorFlow (XLA constant propagation), Facebook React (DevTools Store crash fix), Microsoft VS Code (editor UI and command routing), Microsoft Winget Packages, and Kubernetes!";
    }
    if (q.includes("nexus") || q.includes("project")) {
      return "NEXUS is an autonomous multi-agent AI research hub built with Python, FastAPI, LangChain, and Tavily AI that performs deep topic research, peer critiques, and generates citation-backed intelligence briefs.";
    }
    if (q.includes("knight") || q.includes("leetcode") || q.includes("rating")) {
      return "Sparsh is a LeetCode Knight with a peak rating of 1900+, placing him in the top 5% globally in data structures, graph theory, and dynamic programming algorithms.";
    }
    if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach")) {
      return "You can reach Sparsh directly at sparshgarg307@gmail.com, connect on LinkedIn at linkedin.com/in/sparsh-garg/, or submit a message through the contact form below!";
    }
    return "Sparsh Garg is a Software Developer at Genpact and a LeetCode Knight specializing in multi-agent AI systems, Python, FastAPI, React, C++, and enterprise workflow automation. Feel free to ask about his projects or open-source work!";
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = { role: "user", content: query, time };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAnswer(query);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating AI Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-rose-600 to-indigo-600 shadow-[0_0_25px_rgba(244,63,94,0.45)] text-white hover:brightness-110 transition-all duration-300 font-sans text-xs font-bold"
        aria-label="Toggle AI Cyber Assistant"
      >
        <Bot size={18} />
        <span className="hidden sm:inline">AI CYBER ASSISTANT</span>
      </motion.button>

      {/* Interactive AI Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-20 right-4 md:right-8 z-50 w-[calc(100vw-2rem)] md:w-[400px] h-[520px] bg-slate-950/95 border border-rose-500/40 rounded-2xl shadow-[0_0_40px_rgba(244,63,94,0.25)] backdrop-blur-xl flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-rose-900/50 via-slate-900 to-indigo-900/50 border-b border-rose-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1">
                    Sparsh Garg AI Hub
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-slate-400">Interactive Intelligence Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 flex-shrink-0 mt-0.5">
                      <Bot size={13} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 leading-relaxed ${
                      m.role === "user"
                        ? "bg-rose-600 text-white rounded-br-none"
                        : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md"
                    }`}
                  >
                    <p>{m.content}</p>
                    <span className="text-[9px] opacity-60 mt-1 block text-right">{m.time}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-center text-slate-400 text-xs">
                  <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                    <RefreshCw size={12} className="animate-spin" />
                  </div>
                  <span>Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2 bg-slate-900/70 border-t border-slate-800/80 flex gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-rose-600/30 hover:border-rose-500/40 border border-slate-700 text-[10px] text-slate-300 hover:text-white transition-all whitespace-nowrap flex-shrink-0"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 p-3 bg-slate-950 border-t border-rose-500/20"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask anything about Sparsh..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-xl bg-rose-600 hover:bg-rose-500 flex items-center justify-center text-white transition-colors"
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

export default AIAssistantWidget;
