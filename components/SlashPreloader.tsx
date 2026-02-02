"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SakuraRain from "./SakuraRain";

export default function SlashPreloader() {
  const [isPresent, setIsPresent] = useState(true);
  const [isSlashing, setIsSlashing] = useState(false);

  useEffect(() => {
    // Start slash animation slightly before shutters open
    const slashTimer = setTimeout(() => setIsSlashing(true), 500);
    // Total duration of preloader sequence
    const timer = setTimeout(() => setIsPresent(false), 1200);
    return () => {
      clearTimeout(timer);
      clearTimeout(slashTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isPresent && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.4 } }}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <SakuraRain />
            <div className="absolute inset-0 bg-black/40" />
            {/* Hinomaru (Red Sun) - Subtle Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="w-[60vh] h-[60vh] rounded-full bg-red-600 blur-[80px]"
              />
            </div>
          </div>

          {/* Top Half of Shutter */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1], delay: 0.6 }}
            className="absolute top-0 left-0 w-full h-1/2 bg-black z-[60]"
          />

          {/* Bottom Half of Shutter */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1], delay: 0.6 }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-black z-[60]"
          />

          {/* The Tension Line (Pre-slash) */}
          {!isSlashing && (
            <div className="absolute inset-0 z-[70] flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.5 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="w-full h-[1px] bg-red-600/50 shadow-[0_0_15px_rgba(255,0,0,0.5)]"
              />
            </div>
          )}

          {/* Blade Streak Effect */}
          <AnimatePresence>
            {isSlashing && (
              <motion.div
                initial={{ scaleX: 0, scaleY: 0, opacity: 1, rotate: -5 }}
                animate={{
                  scaleX: [0, 1.5, 2],
                  scaleY: [1, 15, 0],
                  opacity: [1, 1, 0],
                  x: [-500, 0, 500],
                  y: [50, 0, -50]
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute z-[80] w-[150%] h-[2px] bg-white shadow-[0_0_40px_rgba(255,255,255,1),0_0_10px_rgba(0,255,255,0.8)] mix-blend-screen pointer-events-none"
                style={{ clipPath: "polygon(0 45%, 100% 0, 100% 55%, 0 100%)" }}
              />
            )}
          </AnimatePresence>

          {/* Slash Particles (Red ink/blood spray) */}
          <AnimatePresence>
            {isSlashing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[75] pointer-events-none"
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, scale: 1 }}
                    animate={{
                      x: (Math.random() - 0.5) * 800,
                      y: (Math.random() - 0.5) * 400,
                      scale: 0,
                      opacity: 0
                    }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-600 rounded-full"
                    style={{
                      left: `${50 + (Math.random() - 0.5) * 10}%`,
                      top: `${50 + (Math.random() - 0.5) * 5}%`,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* The Flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isSlashing ? { opacity: [0, 1, 0] } : {}}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-white z-[90] pointer-events-none"
          />

          {/* Slashing Text Effect */}
          <div className="absolute z-[65] flex items-center justify-center w-full h-full">
            <motion.div
              animate={isSlashing ? {} : {
                x: [0, -1, 1, -1, 1, 0],
                transition: { duration: 0.1, repeat: Infinity, repeatDelay: 0.5 }
              }}
              className="relative flex items-center justify-center w-full h-full"
            >

              {/* Invisible Sizing Layer */}
              <div className="relative flex flex-col items-center opacity-0 pointer-events-none select-none text-6xl md:text-8xl font-bold font-serif tracking-[0.4em]">
                <span>BUSHIDO</span>
                <span className="absolute top-full text-sm md:text-base font-sans tracking-[0.1em] mt-4 uppercase whitespace-nowrap">
                  The Way of the Warrior
                </span>
              </div>

              {/* Top Half */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  y: -400,
                  x: -200,
                  rotate: -15,
                  opacity: 0,
                  filter: "blur(15px)",
                  transition: { duration: 0.6, ease: [0.7, 0, 0.3, 1], delay: 0 }
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 48%, 0 52%)",
                  transform: isSlashing ? "translateY(-5px) rotate(-1deg)" : "translateY(0)"
                }}
              >
                <div className="absolute text-[12rem] md:text-[20rem] text-red-700/30 font-japanese pointer-events-none -z-10 select-none">
                  武士道
                </div>
                <div className="relative flex flex-col items-center">
                  <span className={`font-serif text-6xl md:text-8xl tracking-[0.4em] font-bold text-white transition-all duration-300 ${isSlashing ? "drop-shadow-[0_0_30px_rgba(220,20,60,0.8)]" : "drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"}`}>BUSHIDO</span>
                  <span className="absolute top-full text-sm md:text-base font-sans tracking-[0.1em] text-red-600 font-medium mt-4 uppercase whitespace-nowrap">
                    The Way of the Warrior
                  </span>
                </div>
              </motion.div>

              {/* Bottom Half */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  y: 400,
                  x: 200,
                  rotate: 15,
                  opacity: 0,
                  filter: "blur(15px)",
                  transition: { duration: 0.6, ease: [0.7, 0, 0.3, 1], delay: 0 }
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  clipPath: "polygon(0 52%, 100% 48%, 100% 100%, 0 100%)",
                  transform: isSlashing ? "translateY(5px) rotate(1deg)" : "translateY(0)"
                }}
              >
                <div className="absolute text-[12rem] md:text-[20rem] text-red-700/30 font-japanese pointer-events-none -z-10 select-none">
                  武士道
                </div>
                <div className="relative flex flex-col items-center">
                  <span className={`font-serif text-6xl md:text-8xl tracking-[0.4em] font-bold text-white transition-all duration-300 ${isSlashing ? "drop-shadow-[0_0_30px_rgba(220,20,60,0.8)]" : "drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"}`}>BUSHIDO</span>
                  <span className="absolute top-full text-sm md:text-base font-sans tracking-[0.1em] text-red-600 font-medium mt-4 uppercase whitespace-nowrap">
                    The Way of the Warrior
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
