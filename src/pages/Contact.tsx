import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle, Sparkles, MessageSquare, Github } from "lucide-react";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz6_hmNogiRhIAkAdfWU9q0wQb2WdEvswPCTHCd9U-giehtMTgKcmZq2NsQES-XYuxd/exec";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const body = new URLSearchParams(formData);
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative min-h-screen w-full bg-slate-950 text-white font-sans px-5 sm:px-8 md:px-14 py-20 sm:py-28 flex items-center justify-center border-t border-slate-900 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Heading & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest block mb-2">05. Connect & Collaborate</span>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                Let's Build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-indigo-400">
                  Something Exceptional
                </span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Whether you're looking for high-throughput enterprise automation, multi-agent AI architectures, or exploring strategic engineering roles, my inbox is open.
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-800 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-rose-400" />
                <a href="mailto:sparshgarg307@gmail.com" className="hover:text-rose-400 transition-colors">
                  sparshgarg307@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 fill-[#0A66C2] flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <a href="https://www.linkedin.com/in/sparsh-garg-2bb2483b2/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  linkedin.com/in/sparsh-garg-2bb2483b2
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Github size={15} className="text-slate-200" />
                <a href="https://github.com/SparshGarg999" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  github.com/SparshGarg999
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl shadow-xl shadow-black/40">
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1.5">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Jane"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1.5">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Doe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1.5">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1.5">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Inquiry / Engineering Opportunity"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1.5">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project or architecture..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(244,63,94,0.35)] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "sending" ? "Transmitting..." : "Send Message"}
                <Send size={13} />
              </button>

              {status === "success" && (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono pt-2">
                  <CheckCircle2 size={14} />
                  <span>Message delivered successfully! I will get back to you shortly.</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono pt-2">
                  <AlertCircle size={14} />
                  <span>Transmission error. Please reach out directly to sparshgarg307@gmail.com</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
