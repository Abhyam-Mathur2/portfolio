"use client";

import { motion } from "framer-motion";

export default function Katana({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 500 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blade */}
      <path
        d="M 20 60 Q 250 55 480 30 L 490 35 Q 250 65 20 70 Z"
        fill="#e5e5e5"
        stroke="#999"
        strokeWidth="1"
      />
      {/* Handle (Tsuka) */}
      <rect x="0" y="58" width="80" height="14" rx="2" fill="#1a1a1a" transform="rotate(-2 40 65)" />
      {/* Tsuba (Handguard) */}
      <circle cx="85" cy="64" r="8" fill="#d4af37" transform="rotate(-2 85 64)" />
      {/* Blade Shine/Hamon */}
      <path
         d="M 90 60 Q 250 56 470 32"
         fill="none"
         stroke="#fff"
         strokeWidth="2"
         opacity="0.6"
      />
    </motion.svg>
  );
}
