"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";
import DecryptingText from "./DecryptingText";
import SamuraiBot from "./SamuraiBot";
import InteractiveLetter, { InteractiveLetterHandle } from "./InteractiveLetter";
import SamuraiText from "./SamuraiText";
import { useState, useRef, useEffect } from "react";

export default function Hero() {
  const { scrollY } = useScroll();
  const [isCut, setIsCut] = useState(false);

  const nameString = "ABHYAM MATHUR";
  const taglineString = "Forging scalable digital solutions with the precision of a blade.";

  // Refs for collision detection
  const nameRefs = useRef<(InteractiveLetterHandle | null)[]>([]);
  const taglineRefs = useRef<(InteractiveLetterHandle | null)[]>([]);

  // Initialize refs in an effect instead of during render
  useEffect(() => {
    if (nameRefs.current.length !== nameString.length) {
      nameRefs.current = Array(nameString.length).fill(null);
    }
    if (taglineRefs.current.length !== taglineString.length) {
      taglineRefs.current = Array(taglineString.length).fill(null);
    }
  }, [nameString.length, taglineString.length]);

  // Text Separation Logic (Scroll based)
  const separateDistance = useTransform(scrollY, [150, 400], [0, 60]);
  const xTop = useTransform(scrollY, [150, 400], [0, -40]);
  const xBottom = useTransform(scrollY, [150, 400], [0, 40]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Base opacity
  const baseOpacity = useTransform(scrollY, [0, 150], [1, 1]);

  // Dummy values for tagline
  const zeroVal = useMotionValue(0);
  const oneVal = useMotionValue(1);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 150 && !isCut) setIsCut(true);
    if (latest < 150 && isCut) setIsCut(false);
  });

  const handleSlash = (x: number, y: number) => {
    // Collision logic for Name
    nameRefs.current.forEach((letter) => {
      if (letter) {
        const bounds = letter.getBounds();
        if (bounds) {
          const centerX = bounds.left + bounds.width / 2;
          const centerY = bounds.top + bounds.height / 2;
          if (Math.hypot(x - centerX, y - centerY) < 80) letter.cut();
        }
      }
    });
    // Collision logic for Tagline
    taglineRefs.current.forEach((letter) => {
      if (letter) {
        const bounds = letter.getBounds();
        if (bounds) {
          const centerX = bounds.left + bounds.width / 2;
          const centerY = bounds.top + bounds.height / 2;
          if (Math.hypot(x - centerX, y - centerY) < 50) letter.cut();
        }
      }
    });
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#05050f]"
    >
      {/* --- LAYER 1: Cinematic Samurai Background --- */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 grayscale-[20%]"
        style={{
          backgroundImage: "url('/hero-bg.png')",
        }}
      />

      {/* --- LAYER 2: Cinematic Gradient Overlay (Top/Bottom fade) --- */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background: "linear-gradient(to bottom, rgba(5, 5, 15, 0.9) 0%, rgba(5, 5, 15, 0.4) 50%, rgba(5, 5, 15, 0.9) 100%)"
        }}
      />

      {/* --- LAYER 3: Atmosphere (Vignette & Red Glow) --- */}
      <div className="absolute inset-0 z-2 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_20%,_rgba(0,0,0,0.9)_100%)]" />
      <div className="absolute inset-0 z-2 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,_rgba(220,20,60,0.15)_0%,_transparent_60%)] mix-blend-screen" />

      {/* --- LAYER 4: Interactive Bot --- */}
      <SamuraiBot onSlash={handleSlash} />

      {/* --- LAYER 5: Content --- */}
      <div className="relative z-10 text-center px-4 w-full max-w-7xl mt-10">

        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6 flex flex-col items-center gap-2"
        >
          <SamuraiText
            text="The Code Ronin"
            kanji="コードの浪人"
            textClassName="font-shojumaru text-red-500 tracking-[0.2em] uppercase text-sm md:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            kanjiClassName="text-red-500 text-lg md:text-xl"
          />
          {/* Decrypting Text removed as it is now part of the hover effect */}
        </motion.div>

        {/* Main Name Area */}
        <div className="relative py-4 select-none flex justify-center items-center min-h-[160px]">
          <div className="font-haruto text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter flex justify-center z-10">
            {nameString.split("").map((char, i) => (
              <InteractiveLetter
                key={i}
                ref={(el) => { nameRefs.current[i] = el; }}
                char={char}
                index={i}
                xTop={xTop}
                xBottom={xBottom}
                separateDistance={separateDistance}
                textOpacity={textOpacity}
                baseOpacity={baseOpacity}
                isGlobalCut={isCut}
                className={i >= 7 ? "text-red-600 drop-shadow-[0_0_15px_rgba(220,20,60,0.5)]" : "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"}
              />
            ))}
          </div>

          {/* Slash Effects (Visual Only) */}
          <motion.div
            style={{
              opacity: useTransform(scrollY, [140, 160, 200], [0, 1, 0]),
              scaleX: useTransform(scrollY, [140, 180], [0, 1.2]),
              scaleY: useTransform(scrollY, [150, 200], [1, 0]),
            }}
            className="absolute top-[52%] left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-cyan-100 to-transparent shadow-[0_0_30px_#0ff] mix-blend-screen rotate-[-2deg] z-30 pointer-events-none"
          />
          <motion.div
            style={{
              opacity: useTransform(scrollY, [160, 300], [0.8, 0]),
            }}
            className="absolute top-[52%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_10px_#f00] rotate-[-2deg] z-20 pointer-events-none"
          />
        </div>

        {/* Tagline - Now Interactive with Word Wrapping */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8 text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light flex flex-wrap justify-center gap-x-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-relaxed"
        >
          {taglineString.split(" ").map((word, wordIndex) => (
            <div key={wordIndex} className="flex whitespace-nowrap">
              {word.split("").map((char, charIndex) => {
                // Calculate a unique global index for the refs
                // This is a bit tricky with nested maps, so we can just push to ref array linearly if we want, 
                // but simpler is to just append to the ref array in order.
                // We need to find the correct index in the original string.
                const globalIndex = taglineString.indexOf(word) + charIndex;
                // Note: indexOf might find the first occurrence. A robust way is linear counter.
                return (
                  <InteractiveLetter
                    key={`${wordIndex}-${charIndex}`}
                    // We need to map this back to the linear ref array correctly.
                    // Let's use a data attribute or just let the handleSlash find it by spatial lookup?
                    // The current handleSlash uses the ref array index. 
                    // We need to maintain the ref array order matching the string order.
                    ref={(el) => {
                      // To get the correct linear index:
                      let count = 0;
                      const words = taglineString.split(" ");
                      for (let i = 0; i < wordIndex; i++) count += words[i].length + 1; // +1 for space
                      taglineRefs.current[count + charIndex] = el;
                    }}
                    char={char}
                    index={globalIndex} // visual index only
                    xTop={zeroVal}
                    xBottom={zeroVal}
                    separateDistance={zeroVal}
                    textOpacity={oneVal}
                    baseOpacity={oneVal}
                    isGlobalCut={false}
                    className="text-gray-300 hover:text-red-500 transition-colors duration-300"
                  />
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, delay: 2, repeat: Infinity }}
        className="absolute bottom-10 z-20"
      >
        <ChevronDown className="text-white/70 w-8 h-8 drop-shadow-lg" />
      </motion.div>
    </section>
  );
}
