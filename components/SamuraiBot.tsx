"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SamuraiBotProps {
  onSlash?: (x: number, y: number) => void;
}

export default function SamuraiBot({ onSlash }: SamuraiBotProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSlashing, setIsSlashing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset the bot slightly from the cursor so it doesn't block view
      // Use pageX/Y to align with the document/Hero section
      setMousePos({ x: e.pageX + 30, y: e.pageY + 30 });
    };

    const handleClick = (e: MouseEvent) => {
      setIsSlashing(true);
      if (onSlash) {
        // Pass the click coordinates (adjusted to target center of bot or cursor)
        onSlash(e.pageX, e.pageY);
      }
      setTimeout(() => setIsSlashing(false), 400); // Reset after animation
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
    };
  }, [onSlash]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      <motion.div
        className="absolute w-24 h-24"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          rotate: isSlashing ? 360 : 0, // Spin on slash
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
          mass: 0.5, // Lightweight feel
        }}
      >
        {/* The Bot Visual (SVG) */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(220,20,60,0.6)]">
            {/* Hovering Drone Body */}
            <defs>
              <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#333" />
                <stop offset="50%" stopColor="#111" />
                <stop offset="100%" stopColor="#000" />
              </linearGradient>
            </defs>
            
            {/* Kabuto (Helmet) Wings */}
            <path d="M 20 40 Q 10 20 30 10 L 50 20 L 70 10 Q 90 20 80 40" fill="#dc143c" stroke="#fff" strokeWidth="1" />
            
            {/* Main Head */}
            <circle cx="50" cy="50" r="20" fill="url(#metal)" stroke="#444" strokeWidth="2" />
            
            {/* Glowing Eye */}
            <path d="M 40 50 Q 50 55 60 50" stroke="#0ff" strokeWidth="3" fill="none" className="animate-pulse" />
            <circle cx="50" cy="45" r="3" fill="#f00" className="animate-ping" />

            {/* Floating Hands/Weapon Emitters */}
            <circle cx="20" cy="60" r="5" fill="#222" stroke="#dc143c" />
            <circle cx="80" cy="60" r="5" fill="#222" stroke="#dc143c" />
        </svg>

        {/* Slash Effect (Triggered on Click) */}
        <AnimatePresence>
          {isSlashing && (
            <motion.div
              initial={{ opacity: 1, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 0, scale: 2.5, rotate: 45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none"
            >
              {/* Crescent Slash Shape */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M 10 90 Q 50 10 90 90"
                  fill="none"
                  stroke="#0ff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 10px #0ff)" }}
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
