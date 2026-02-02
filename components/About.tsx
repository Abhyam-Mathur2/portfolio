"use client";

import { motion } from "framer-motion";
import DecryptingText from "./DecryptingText";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 px-4">
        <ScrollReveal>
          <div className="flex flex-col mb-8 text-center md:text-left">
            <DecryptingText text="道" className="text-sm text-red-700 mb-1 font-serif font-bold" />
            <h2 className="font-serif text-4xl md:text-5xl text-red-900 border-l-4 border-red-800 pl-4 inline-block">
              The Path
            </h2>
          </div>

          <div className="space-y-6 text-gray-800 text-lg leading-relaxed font-medium font-serif">
            <p>
              Like a swordsmith folding steel to create the perfect blade, I refine my code through constant practice and learning. I am <strong className="text-black text-xl">Abhyam Mathur</strong>, a pre-final year B.Tech CSE student at <span className="text-red-700 font-bold">UPES Dehradun</span>.
            </p>
            <p>
              My journey is defined by <em className="text-black font-semibold">Kaizen</em> — continuous improvement. From mastering the fundamentals of <span className="text-black font-semibold">Object-Oriented Programming</span> to architecting serverless solutions on <span className="text-black font-semibold">AWS</span>, I seek perfection in every line of code.
            </p>
            <p>
              Currently, I am honing my skills as a Tech Intern at <span className="text-black font-semibold">Democratic News Live</span>, building secure platforms for investigative journalism. Whether it&apos;s crafting responsive frontends with React or optimizing backend logic with Python, I approach every challenge with focus and discipline.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Background Japanese Calligraphy Style Text (Decoration) */}
      <div className="absolute top-10 right-0 text-[#1a1a1a] font-serif text-[20rem] leading-none select-none -z-0 opacity-20 pointer-events-none">
        道
      </div>
    </section>
  );
}
