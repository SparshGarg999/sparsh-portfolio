import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const CyberCreature: React.FC = () => {
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const creatureRef = useRef<HTMLDivElement>(null);

  // Mouse Eye Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!creatureRef.current) return;
      const rect = creatureRef.current.getBoundingClientRect();
      const creatureCenterX = rect.left + rect.width / 2;
      const creatureCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - creatureCenterX;
      const dy = e.clientY - creatureCenterY;
      const distance = Math.hypot(dx, dy);
      const maxOffset = 4.5;

      if (distance === 0) {
        setEyeOffset({ x: 0, y: 0 });
      } else {
        const clampedDist = Math.min(distance / 60, 1) * maxOffset;
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

  // Blink on global click + spontaneous periodic blinks
  useEffect(() => {
    const handleGlobalClick = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    };

    window.addEventListener("click", handleGlobalClick);

    const randomBlinkInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 160);
      }
    }, 3800);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      clearInterval(randomBlinkInterval);
    };
  }, []);

  return (
    <motion.div
      ref={creatureRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-5 left-5 z-40 flex items-center gap-2.5 cursor-pointer select-none pointer-events-auto group"
      title="Nova: Eyes track your cursor & blinks when you click!"
    >
      {/* Creature Avatar */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-12 h-12 rounded-2xl bg-gradient-to-b from-purple-900/90 via-slate-950 to-slate-950 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.35)] backdrop-blur-md flex items-center justify-center p-1.5 hover:border-rose-500/70 transition-colors"
      >
        {/* Antennas */}
        <div className="absolute -top-1.5 left-2.5 w-1.5 h-2.5 rounded-t-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)] animate-pulse" />
        <div className="absolute -top-1.5 right-2.5 w-1.5 h-2.5 rounded-t-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)] animate-pulse" />

        {/* Head Display */}
        <div className="relative w-9 h-8 rounded-xl bg-slate-950 border border-purple-500/40 flex items-center justify-center gap-1.5 px-1.5 shadow-inner">
          {/* Left Eye */}
          <div className="relative w-3 h-3 rounded-full bg-slate-900 border border-rose-500/50 flex items-center justify-center overflow-hidden">
            <motion.div
              animate={{
                x: eyeOffset.x,
                y: eyeOffset.y,
                scaleY: isBlinking ? 0.05 : 1,
              }}
              transition={{ duration: isBlinking ? 0.08 : 0.12, ease: "easeOut" }}
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 shadow-[0_0_5px_rgba(244,63,94,1)]"
            />
          </div>

          {/* Right Eye */}
          <div className="relative w-3 h-3 rounded-full bg-slate-900 border border-rose-500/50 flex items-center justify-center overflow-hidden">
            <motion.div
              animate={{
                x: eyeOffset.x,
                y: eyeOffset.y,
                scaleY: isBlinking ? 0.05 : 1,
              }}
              transition={{ duration: isBlinking ? 0.08 : 0.12, ease: "easeOut" }}
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 shadow-[0_0_5px_rgba(244,63,94,1)]"
            />
          </div>

          {/* Cute Smile Line */}
          <div className="absolute bottom-1 w-2 h-0.5 rounded-full bg-purple-400/80" />
        </div>

        {/* Online Status Dot */}
        <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
        </span>
      </motion.div>

      {/* Compact Hover Tooltip (Shown on hover only, preventing hero card overlap) */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden sm:flex flex-col bg-slate-950/95 border border-purple-500/40 px-2.5 py-1.5 rounded-xl shadow-xl backdrop-blur-md text-[10px] font-mono text-purple-200"
        >
          <span className="font-bold text-rose-400">Nova // Mascot</span>
          <span className="text-[9px] text-slate-400">Tracking cursor · Click anywhere to blink!</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CyberCreature;
