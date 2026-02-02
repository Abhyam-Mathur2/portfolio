"use client";

import { motion, MotionValue, useTransform, Variants } from "framer-motion";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";

interface InteractiveLetterProps {
  char: string;
  index: number;
  xTop: MotionValue<number>;
  xBottom: MotionValue<number>;
  separateDistance: MotionValue<number>;
  textOpacity: MotionValue<number>;
  baseOpacity: MotionValue<number>; // For the base unsplit text
  isGlobalCut: boolean; // State from parent if global scroll cut is active
  className?: string;
}

export interface InteractiveLetterHandle {
  cut: () => void;
  getBounds: () => DOMRect | null;
}

const InteractiveLetter = forwardRef<InteractiveLetterHandle, InteractiveLetterProps>(
  ({ char, xTop, xBottom, separateDistance, textOpacity, baseOpacity, isGlobalCut, className = "" }, ref) => {
    const [isSlashed, setIsSlashed] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Hoist useTransform hooks so they run unconditionally
    const yTop = useTransform(separateDistance, (val) => val * -0.5);
    const yBottom = useTransform(separateDistance, (val) => val * 0.5);

    useImperativeHandle(ref, () => ({
      cut: () => setIsSlashed(true),
      getBounds: () => containerRef.current?.getBoundingClientRect() ?? null,
    }));

    // Check if it's a space
    const isSpace = char === " ";

    // Animation for the "Bot Slash" destruction
    const slashVariants: Variants = {
      idle: { x: 0, y: 0, opacity: 1, rotate: 0 },
      slashedLeft: { 
        x: -20, 
        y: 20, 
        opacity: 0, 
        rotate: -15, 
        transition: { duration: 0.6, ease: [0.33, 0.66, 0.66, 1] as [number, number, number, number] } 
      },
      slashedRight: { 
        x: 20, 
        y: -20, 
        opacity: 0, 
        rotate: 15, 
        transition: { duration: 0.6, ease: [0.33, 0.66, 0.66, 1] as [number, number, number, number] } 
      }
    };

    if (isSpace) {
       return <span ref={containerRef} className="w-4 md:w-8 inline-block" />;
    }

    return (
      <div ref={containerRef} className={`relative inline-block px-[1px] md:px-[2px] ${className}`}>
        {/* State 1: Destroyed/Slashed by Bot */}
        {isSlashed ? (
          <div className="relative">
             {/* Left Half of Destruction */}
             <motion.span
                className="inline-block text-red-500" // Turns red when dying
                initial="idle"
                animate="slashedLeft"
                variants={slashVariants}
                style={{ clipPath: "polygon(0 0, 45% 0, 55% 100%, 0 100%)" }}
             >
                {char}
             </motion.span>
             {/* Right Half of Destruction */}
             <motion.span
                className="absolute top-0 left-0 text-white"
                initial="idle"
                animate="slashedRight"
                variants={slashVariants}
                style={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 55% 100%)" }}
             >
                {char}
             </motion.span>
             {/* Slash Flash */}
             <motion.div 
               initial={{ scale: 0, opacity: 1 }}
               animate={{ scale: 2, opacity: 0 }}
               className="absolute top-1/2 left-1/2 w-full h-1 bg-white shadow-[0_0_10px_#fff] rotate-45 pointer-events-none"
             />
          </div>
        ) : (
          /* State 2: Normal Operation (Scroll Split Capable) */
          <>
            {/* Base Text (Visible before scroll cut) */}
            <motion.span
              style={{ opacity: baseOpacity }}
              className={`absolute top-0 left-0 w-full h-full ${isGlobalCut ? "hidden" : "block"}`}
            >
              {char}
            </motion.span>

            {/* Split Top (Visible after scroll cut) */}
            <motion.span
              style={{ 
                x: xTop, 
                y: yTop, 
                opacity: textOpacity 
              }}
              className={`block ${!isGlobalCut ? "opacity-0" : "opacity-100"}`}
            >
              <span className="block" style={{ clipPath: "polygon(0 0, 100% 0, 100% 48%, 0 52%)" }}>
                {char}
              </span>
            </motion.span>

            {/* Split Bottom (Visible after scroll cut) */}
            <motion.span
              style={{ 
                x: xBottom, 
                y: yBottom, 
                opacity: textOpacity 
              }}
              className={`absolute top-0 left-0 w-full h-full ${!isGlobalCut ? "opacity-0" : "opacity-100"}`}
            >
              <span className="block" style={{ clipPath: "polygon(0 52%, 100% 48%, 100% 100%, 0 100%)" }}>
                {char}
              </span>
            </motion.span>
          </>
        )}
      </div>
    );
  }
);

InteractiveLetter.displayName = "InteractiveLetter";
export default InteractiveLetter;
