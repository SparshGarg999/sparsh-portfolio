import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const CyberCreature: React.FC = () => {
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const creatureRef = useRef<HTMLDivElement>(null);

  // Mouse Eye Tracking across the whole screen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!creatureRef.current) return;
      const rect = creatureRef.current.getBoundingClientRect();
      const creatureCenterX = rect.left + rect.width / 2;
      const creatureCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - creatureCenterX;
      const dy = e.clientY - creatureCenterY;
      const distance = Math.hypot(dx, dy);
      const maxOffset = 3.5;

      if (distance === 0) {
        setEyeOffset({ x: 0, y: 0 });
      } else {
        const clampedDist = Math.min(distance / 80, 1) * maxOffset;
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
    }, 3500);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      clearInterval(randomBlinkInterval);
    };
  }, []);

  return (
    <div
      ref={creatureRef}
      className="relative flex items-center justify-center cursor-pointer select-none pointer-events-auto group"
      title="Nova: Eyes track your cursor & blinks on clicks!"
    >
      {/* Sleek Top-Bar Cyber Creature Mascot */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-8 h-8 rounded-xl bg-gradient-to-b from-purple-900/90 via-slate-950 to-slate-950 border border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.35)] backdrop-blur-md flex items-center justify-center p-1 hover:border-rose-500/80 transition-colors"
      >
        {/* Antennas */}
        <div className="absolute -top-1 left-1.5 w-1 h-2 rounded-t-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.8)] animate-pulse" />
        <div className="absolute -top-1 right-1.5 w-1 h-2 rounded-t-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.8)] animate-pulse" />

        {/* Head Display */}
        <div className="relative w-6 h-5 rounded-lg bg-slate-950 border border-purple-500/40 flex items-center justify-center gap-1 px-1 shadow-inner">
          {/* Left Eye */}
          <div className="relative w-2 h-2 rounded-full bg-slate-900 border border-rose-500/50 flex items-center justify-center overflow-hidden">
            <motion.div
              animate={{
                x: eyeOffset.x,
                y: eyeOffset.y,
                scaleY: isBlinking ? 0.05 : 1,
              }}
              transition={{ duration: isBlinking ? 0.08 : 0.12, ease: "easeOut" }}
              className="w-1 h-1 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 shadow-[0_0_4px_rgba(244,63,94,1)]"
            />
          </div>

          {/* Right Eye */}
          <div className="relative w-2 h-2 rounded-full bg-slate-900 border border-rose-500/50 flex items-center justify-center overflow-hidden">
            <motion.div
              animate={{
                x: eyeOffset.x,
                y: eyeOffset.y,
                scaleY: isBlinking ? 0.05 : 1,
              }}
              transition={{ duration: isBlinking ? 0.08 : 0.12, ease: "easeOut" }}
              className="w-1 h-1 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 shadow-[0_0_4px_rgba(244,63,94,1)]"
            />
          </div>
        </div>

        {/* Online Status Dot */}
        <span className="absolute -bottom-0.5 -right-0.5 flex h-1.5 w-1.5">
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500" />
        </span>
      </motion.div>
    </div>
  );
};

export default CyberCreature;
