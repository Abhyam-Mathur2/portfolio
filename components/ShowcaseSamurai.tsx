"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ShowcaseSamurai() {
  const { scrollY } = useScroll();
  
  // Parallax: Moves up slower than scroll, creates depth
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  
  // Scale: Grows slightly as you scroll (Zoom in effect)
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  
  // Opacity: Fades out eventually
  const opacity = useTransform(scrollY, [300, 600], [1, 0]);

  return (
    <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0 overflow-hidden">
      {/* Background Kanji - Large and subtle */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute top-1/4 text-[20rem] font-japanese text-red-600 select-none blur-sm"
      >
        武士
      </motion.div>

      <motion.div 
        style={{ y, scale, opacity }}
        className="relative h-[90vh] w-full max-w-[1000px] flex items-end justify-center"
      >
        {/* The Samurai Figure */}
        {/* Using a high-contrast image and blending it to look like a cutout */}
        <Image 
          src="https://images.unsplash.com/photo-1598556836316-8b3383042079?q=80&w=1200&auto=format&fit=crop" 
          alt="Showcase Samurai"
          width={1000}
          height={1200}
          className="h-full w-auto object-contain object-bottom drop-shadow-[0_0_50px_rgba(0,0,0,1)]"
          style={{
             // Use mask to fade bottom
             maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
             WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
             // Blend into the dark background
             mixBlendMode: "normal", 
             filter: "brightness(0.6) contrast(1.2) grayscale(0.2)"
          }}
        />
        
        {/* Front Mist/Fog - Moving clouds at the bottom */}
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />
      </motion.div>
    </div>
  );
}
