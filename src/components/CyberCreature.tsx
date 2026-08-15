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
      const maxOffset = 5; // Max pupil travel distance in px

      if (distance === 0) {
        setEyeOffset({ x: 0, y: 0 });
      } else {
        const clampedDist = Math.min(distance / 50, 1) * maxOffset;
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
      setTimeout(() => setIsBlinking(false), 180);
    };

    window.addEventListener("click", handleGlobalClick);

    const randomBlinkInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 180);
      }
    }, 3500);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      clearInterval(randomBlinkInterval);
    };
  }, []);

  return (
    <motion.div
      ref={creatureRef}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-3 cursor-pointer select-none pointer-events-auto group"
      title="Cyber Companion: Eyes follow your cursor & blinks when you click!"
    >
      {/* Creature Avatar */}
      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-b from-purple-900/90 via-slate-950 to-slate-950 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.35)] backdrop-blur-md flex items-center justify-center p-2">
        {/* Antenna / Cyber Horns */}
        <div className="absolute -top-2 left-3 w-1.5 h-3 rounded-t-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" />
        <div className="absolute -top-2 right-3 w-1.5 h-3 rounded-t-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" />

        {/* Head Display / Face Plate */}
        <div className="relative w-11 h-9 rounded-xl bg-slate-950 border border-purple-500/40 flex items-center justify-center gap-2 px-2 shadow-inner">
          {/* Left Eye Socket */}
          <div className="relative w-3.5 h-3.5 rounded-full bg-slate-900 border border-rose-500/50 flex items-center justify-center overflow-hidden">
            {/* Pupil */}
            <motion.div
              animate={{
                x: eyeOffset.x,
                y: eyeOffset.y,
                scaleY: isBlinking ? 0.05 : 1,
              }}
              transition={{ duration: isBlinking ? 0.08 : 0.15, ease: "easeOut" }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 shadow-[0_0_6px_rgba(244,63,94,1)]"
            />
          </div>

          {/* Right Eye Socket */}
          <div className="relative w-3.5 h-3.5 rounded-full bg-slate-900 border border-rose-500/50 flex items-center justify-center overflow-hidden">
            {/* Pupil */}
            <motion.div
              animate={{
                x: eyeOffset.x,
                y: eyeOffset.y,
                scaleY: isBlinking ? 0.05 : 1,
              }}
              transition={{ duration: isBlinking ? 0.08 : 0.15, ease: "easeOut" }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 shadow-[0_0_6px_rgba(244,63,94,1)]"
            />
          </div>

          {/* Cute Smile Line */}
          <div className="absolute bottom-1 w-2.5 h-0.5 rounded-full bg-purple-400/80" />
        </div>

        {/* Status Indicator */}
        <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
        </span>
      </div>

      {/* Speech Bubble on Hover or Interaction */}
      <div className="hidden sm:flex flex-col bg-slate-900/90 border border-purple-500/30 px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-md text-[11px] font-mono text-purple-200">
        <span className="font-bold text-rose-400">Byte // Cyber Companion</span>
        <span className="text-[10px] text-slate-400">Watching cursor · Click to blink!</span>
      </div>
    </motion.div>
  );
};

export default CyberCreature;
