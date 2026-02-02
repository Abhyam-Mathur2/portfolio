"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function CentralKatana() {
  const { scrollY } = useScroll();
  
  // Parallax effect: The sword moves slower than the scroll, creating depth
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  
  // The shine on the blade moves as you scroll
  const shineY = useTransform(scrollY, [0, 500], ["0%", "100%"]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <motion.div 
        style={{ y }}
        className="relative h-[120vh] w-[200px] flex justify-center items-center"
      >
        <svg viewBox="0 0 100 800" className="h-full w-auto drop-shadow-[0_0_30px_rgba(220,20,60,0.3)]">
           <defs>
              <linearGradient id="bladeGrad" x1="0" y1="0" x2="1" y2="0">
                 <stop offset="0%" stopColor="#888" />
                 <stop offset="50%" stopColor="#fff" />
                 <stop offset="55%" stopColor="#ddd" />
                 <stop offset="100%" stopColor="#666" />
              </linearGradient>
              <linearGradient id="handleGrad" x1="0" y1="0" x2="1" y2="0">
                 <stop offset="0%" stopColor="#111" />
                 <stop offset="50%" stopColor="#222" />
                 <stop offset="100%" stopColor="#000" />
              </linearGradient>
              <pattern id="tsukaWrap" width="20" height="20" patternUnits="userSpaceOnUse">
                 <path d="M0,10 L10,0 L20,10 L10,20 Z" fill="#333" />
                 <circle cx="10" cy="10" r="2" fill="#d4af37" />
              </pattern>
           </defs>

           {/* Blade (Vertical) */}
           <path d="M 45 150 L 45 780 Q 50 800 55 780 L 55 150 Z" fill="url(#bladeGrad)" />
           
           {/* Hamon (Temper line) */}
           <path d="M 48 150 Q 50 200 48 250 Q 52 300 48 350 Q 52 400 48 450 Q 52 500 48 550 Q 52 600 48 650 Q 52 700 48 750 L 50 780" fill="none" stroke="#fff" strokeWidth="1" opacity="0.6" />

           {/* Habaki (Collar) */}
           <rect x="44" y="130" width="12" height="20" fill="#d4af37" />

           {/* Tsuba (Guard) - Circular detailed */}
           <circle cx="50" cy="130" r="35" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
           <circle cx="50" cy="130" r="30" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="5,5" />
           <path d="M 50 100 L 50 160 M 20 130 L 80 130" stroke="#000" strokeWidth="10" opacity="0.3" />

           {/* Tsuka (Handle) */}
           <rect x="40" y="-100" width="20" height="230" fill="url(#handleGrad)" />
           <rect x="40" y="-100" width="20" height="230" fill="url(#tsukaWrap)" opacity="0.5" />
           
           {/* Kashira (Pommel) */}
           <rect x="38" y="-110" width="24" height="15" rx="2" fill="#d4af37" />
           
           {/* Dynamic Shine Overlay */}
           <mask id="bladeMask">
             <path d="M 45 150 L 45 780 Q 50 800 55 780 L 55 150 Z" fill="white" />
           </mask>
        </svg>
        
        {/* Moving Shine div overlaid on SVG area using mask logic (simulated with absolute div) */}
        <motion.div 
           className="absolute top-[18%] left-[48%] w-[4%] h-[60%] bg-gradient-to-b from-transparent via-white to-transparent mix-blend-overlay pointer-events-none"
           style={{ top: shineY }}
        />
      </motion.div>
    </div>
  );
}
