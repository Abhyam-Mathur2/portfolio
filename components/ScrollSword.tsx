"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSword() {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null); // The pivot point / Grip
  const bladeRef = useRef<HTMLDivElement>(null);
  const scabbardRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "100vh top", // Longer scroll distance for smoother, slower feel
        scrub: 1.5, // Heavier scrub delay for "weight"
      }
    });

    // --- PHASE 1: The Grip Adjustment (0% - 30% scroll) ---
    // The handle rotates slightly, as if tensing the wrist.
    // Pivot is set via CSS transform-origin on the handle.
    
    // Handle Rotation (Anchor)
    tl.to(handleRef.current, {
      rotation: -2, // Very subtle tilt
      y: 20, // Slight drop
      ease: "power1.out",
      duration: 1
    }, 0);

    // Scabbard moves with handle but slightly delayed (lag)
    tl.to(scabbardRef.current, {
      rotation: -3,
      y: 25,
      x: 5,
      ease: "power1.out",
      duration: 1.2
    }, 0);


    // --- PHASE 2: The Draw (30% - 100% scroll) ---
    // The blade slides out, handle stabilizes.
    
    // Blade Unsheathing - Moving relative to scabbard
    // Blade moves separate from handle? No, blade is attached to handle.
    // Actually, in an unsheathing, the SCABBARD is often pulled back while the handle moves forward.
    // Or the Handle+Blade moves out.
    
    // Move Handle+Blade assembly OUT
    tl.to([handleRef.current, bladeRef.current], {
      x: -150, // Drawing motion (Up/Left due to rotation)
      y: -150,
      rotation: -5, // Final angle
      ease: "none", // Linear for direct control
      duration: 3
    }, 0.5); // Overlap start

    // Move Scabbard BACK (Recoil)
    tl.to(scabbardRef.current, {
      x: 40,
      y: 40,
      rotation: 0,
      ease: "none",
      duration: 3
    }, 0.5);

    // --- PARALLAX DEPTH ---
    // Shadow moves slower/less than the object
    tl.to(shadowRef.current, {
      x: -50,
      y: -50,
      opacity: 0, // Fades out as sword lifts
      duration: 4
    }, 0);


    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-visible opacity-40 mix-blend-soft-light grayscale"
    >
      {/* 
         Container: Rotated -45deg to establish the diagonal drawing line.
         The inner elements will move along X/Y relative to this axis.
      */}
      <div className="relative w-[800px] h-[800px] flex items-center justify-center rotate-[-45deg]">
        
        {/* --- LAYER 0: SHADOW (Furthest Back) --- */}
        <div 
          ref={shadowRef}
          className="absolute w-[650px] h-[40px] bg-black/40 blur-[20px] rounded-full translate-y-10 translate-x-10"
        />

        {/* --- LAYER 1: SCABBARD (Saya) --- */}
        {/* Origin: Bottom Right (where it connects to belt/hip conceptually) */}
        <div 
          ref={scabbardRef} 
          className="absolute w-[620px] h-[44px] bg-[#1a1a1a] rounded-full border border-[#222] shadow-2xl z-10 flex items-center origin-bottom-right"
        >
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_12px)] opacity-50" />
            <div className="absolute right-12 top-0 h-full w-24 bg-red-900/20" /> {/* Sageo */}
        </div>

        {/* --- LAYER 2: BLADE (Attached to Handle logic visually) --- */}
        <div ref={bladeRef} className="absolute w-[600px] h-[30px] z-15 flex items-center pointer-events-none origin-bottom-right">
             <div className="w-full h-[26px] bg-gradient-to-b from-[#555] via-[#777] to-[#444] rounded-l-full relative overflow-hidden shadow-inner border-t border-[#888]/20">
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#222] to-transparent opacity-60 wavy-line" />
            </div>
            {/* Habaki */}
            <div className="w-[18px] h-[30px] bg-[#6d6342] -ml-1 z-20 brightness-75" />
        </div>

        {/* --- LAYER 3: HANDLE (Tsuka) - The Anchor --- */}
        {/* This is the primary moving element "The Grip" */}
        <div 
          ref={handleRef} 
          className="absolute w-[200px] h-[36px] bg-[#080808] z-30 flex items-center origin-bottom-right translate-x-[290px]" // Positioned at the mouth of scabbard
        >
            {/* Tsuba (Guard) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[12px] h-[70px] bg-[#111] border border-[#333] rounded-md shadow-lg" />
            
            {/* Tsuka Body */}
            <div className="w-full h-full relative overflow-hidden border-y border-[#222] ml-3 rounded-r-sm">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(60deg,transparent,transparent_8px,#151515_8px,#151515_10px)] opacity-80" />
                <div className="absolute inset-0 bg-[repeating-linear-gradient(-60deg,transparent,transparent_8px,#151515_8px,#151515_10px)] opacity-80" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-950 rounded-full blur-[1px] opacity-80" />
            </div>

            {/* Kashira */}
            <div className="absolute right-0 top-0 h-full w-[12px] bg-[#6d6342] rounded-r-md brightness-75" />
        </div>

      </div>
    </div>
  );
}
