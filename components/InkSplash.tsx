"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function InkSplash({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ink Splash SVG Layer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.2 : 0.8,
          rotate: isHovered ? 0 : 45
        }}
        transition={{ duration: 0.4, ease: "backOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10"
      >
        <svg viewBox="0 0 200 200" className="w-[150%] h-[150%] text-red-900/40 fill-current">
           <path d="M42.7,-63.3C54.5,-54.3,62.8,-40.7,68.6,-26.3C74.4,-11.9,77.7,3.3,73.5,16.8C69.3,30.3,57.6,42.1,45.1,51.8C32.6,61.5,19.3,69.1,4.7,72.4C-9.9,75.7,-25.8,74.7,-39.8,67.6C-53.8,60.5,-65.9,47.3,-72.6,31.7C-79.3,16.1,-80.6,-1.9,-74.5,-17.6C-68.4,-33.3,-54.9,-46.7,-40.9,-54.8C-26.9,-62.9,-12.4,-65.7,1.8,-68.2C16,-70.7,30.9,-72.3,42.7,-63.3Z" transform="translate(100 100)" />
        </svg>
      </motion.div>

      {/* Content */}
      {children}
    </div>
  );
}
