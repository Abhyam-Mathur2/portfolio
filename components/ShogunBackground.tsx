"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ShogunBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative h-[85vh] w-full max-w-[800px] flex items-end justify-center z-0"
      >
        {/* Realistic Samurai Photo - Local Asset */}
        <Image 
          src="/samurai.jpg" 
          alt="Samurai Warrior"
          width={800}
          height={1000}
          priority
          className="h-full w-auto object-contain object-bottom opacity-70 drop-shadow-2xl"
          style={{
             filter: "contrast(1.2) brightness(0.6)" // Subtle adjustment to blend
          }}
        />
        
        {/* Gradient Overlay to blend feet into darkness */}
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </motion.div>
    </div>
  );
}
