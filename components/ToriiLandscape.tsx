"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ToriiLandscape() {
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.8], [0, 1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]); // Parallax effect

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-end justify-center">
      {/* Background Mist */}
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-red-900/10 to-transparent" />

      <motion.div 
        style={{ opacity, y }}
        className="relative w-full max-w-7xl h-full flex items-end justify-between px-4 md:px-20 pb-0"
      >
        {/* Left Sakura Tree Silhouette */}
        <svg
          viewBox="0 0 200 300"
          className="w-1/3 md:w-1/4 h-auto text-[#1a1a1a] opacity-80"
          preserveAspectRatio="xMidYMax meet"
        >
          <path
            d="M100,300 C80,250 120,200 90,150 C70,120 40,140 20,110 C10,95 30,80 10,60 M90,150 C110,120 100,90 130,70 C150,55 120,40 140,20"
            stroke="currentColor"
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="20" cy="110" r="10" fill="#db2777" className="animate-pulse" />
          <circle cx="10" cy="60" r="12" fill="#be185d" />
          <circle cx="130" cy="70" r="8" fill="#9d174d" />
          <circle cx="140" cy="20" r="10" fill="#be185d" className="animate-pulse" />
          <circle cx="60" cy="100" r="15" fill="#db2777" opacity="0.6" />
        </svg>

        {/* Center Torii Gate */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full md:w-2/3 max-w-lg">
           <svg viewBox="0 0 300 250" className="w-full h-auto drop-shadow-2xl">
              {/* Pillars */}
              <rect x="60" y="20" width="15" height="230" rx="2" fill="#881337" />
              <rect x="225" y="20" width="15" height="230" rx="2" fill="#881337" />
              
              {/* Base Stones */}
              <rect x="50" y="245" width="35" height="5" fill="#171717" />
              <rect x="215" y="245" width="35" height="5" fill="#171717" />

              {/* Lower Lintel (Nuki) */}
              <rect x="55" y="70" width="190" height="12" fill="#881337" />

              {/* Upper Lintel (Kasagi/Shimaki) */}
              <path 
                d="M 20 30 Q 150 10 280 30 L 285 45 Q 150 25 15 45 Z" 
                fill="#9f1239" 
              />
              <rect x="140" y="45" width="20" height="25" fill="#881337" /> {/* Gakuzuka */}
           </svg>
        </div>

        {/* Right Sakura Tree Silhouette */}
        <svg
          viewBox="0 0 200 300"
          className="w-1/3 md:w-1/4 h-auto text-[#1a1a1a] opacity-80 transform scale-x-[-1]"
          preserveAspectRatio="xMidYMax meet"
        >
           <path
            d="M100,300 C80,250 120,200 90,150 C70,120 40,140 20,110 C10,95 30,80 10,60 M90,150 C110,120 100,90 130,70 C150,55 120,40 140,20"
            stroke="currentColor"
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="20" cy="110" r="10" fill="#db2777" className="animate-pulse" />
          <circle cx="10" cy="60" r="12" fill="#be185d" />
          <circle cx="130" cy="70" r="8" fill="#9d174d" />
          <circle cx="140" cy="20" r="10" fill="#be185d" className="animate-pulse" />
           <circle cx="60" cy="100" r="15" fill="#db2777" opacity="0.6" />
        </svg>

      </motion.div>
    </div>
  );
}