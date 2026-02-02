"use client";

import { motion, Variants } from "framer-motion";
import { Code, Server, Cloud, Cpu } from "lucide-react";
import DecryptingText from "./DecryptingText";
import InkSplash from "./InkSplash";

const Katana = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M 20 80 Q 50 50 80 10" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M 15 85 L 25 75" stroke="currentColor" strokeWidth="4" />
    <path d="M 18 82 L 22 78" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Shuriken = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M 50 20 L 60 40 L 80 50 L 60 60 L 50 80 L 40 60 L 20 50 L 40 40 Z" fill="currentColor" />
    <circle cx="50" cy="50" r="5" fill="#0a0a0a" />
  </svg>
);

const Kunai = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M 50 10 L 60 30 L 50 80 L 40 30 Z" fill="currentColor" />
    <circle cx="50" cy="85" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const Naginata = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <line x1="10" y1="90" x2="60" y2="40" stroke="currentColor" strokeWidth="2" />
    <path d="M 60 40 Q 80 20 90 10" stroke="currentColor" strokeWidth="3" fill="none" />
    <path d="M 58 42 L 62 38" stroke="currentColor" strokeWidth="4" />
  </svg>
);

const katanaVariants: Variants = {
  idle: { rotate: 12, x: 0, opacity: 0.1 },
  hover: {
    rotate: [12, -10, 45],
    x: [0, -20, 50],
    opacity: [0.1, 0.4, 0.1],
    transition: { duration: 0.4, ease: "easeInOut" }
  }
};

const shurikenVariants: Variants = {
  idle: { rotate: 0, x: 0, y: 0, opacity: 0.1 },
  hover: {
    rotate: 720,
    x: [-20, -150],
    y: [0, -50],
    opacity: [0.1, 0.5, 0],
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const kunaiVariants: Variants = {
  idle: { rotate: 45, x: 0, y: 0, opacity: 0.1 },
  hover: {
    x: [0, -200],
    y: [0, -200],
    opacity: [0.1, 0.5, 0],
    transition: { duration: 0.5, ease: "easeIn" }
  }
};

const naginataVariants: Variants = {
  idle: { rotate: 10, x: 0, opacity: 0.1 },
  hover: {
    rotate: [10, -45],
    originX: 1,
    originY: 1,
    opacity: [0.1, 0.3, 0.1],
    transition: { duration: 0.6, ease: "easeInOut" }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: {} // Propagates to children
};

const skills = [
  {
    category: "Languages",
    icon: <Code size={24} />,
    items: ["Java", "Python", "JavaScript", "C", "C++"],
    weapon: Katana,
    variants: katanaVariants
  },
  {
    category: "Web Mastery",
    icon: <Server size={24} />,
    items: ["React (Vite)", "HTML5/CSS3", "REST APIs", "Tailwind CSS"],
    weapon: Shuriken,
    variants: shurikenVariants
  },
  {
    category: "Cloud & Backend",
    icon: <Cloud size={24} />,
    items: ["AWS (Lambda, S3, DynamoDB)", "Supabase", "PostgreSQL"],
    weapon: Kunai,
    variants: kunaiVariants
  },
  {
    category: "Engineering",
    icon: <Cpu size={24} />,
    items: ["OOP", "DSA", "Git/GitHub", "SDLC"],
    weapon: Naginata,
    variants: naginataVariants
  },
];

export default function Skills() {

  return (
    <section id="skills" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <DecryptingText text="武器庫" className="text-sm text-red-500/70 mb-2 font-serif" />
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-white"
          >
            My <span className="text-red-600">Arsenal</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => {
            const Weapon = skill.weapon;
            return (
              <InkSplash key={skill.category} className="h-full">
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1a1a1a] border border-gray-800 p-6 rounded-sm hover:border-red-600 transition-colors group relative h-full flex flex-col overflow-hidden"
                >
                  {/* Weapon Watermark */}
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 pointer-events-none text-red-500 overflow-visible">
                    <motion.div
                      className="w-full h-full"
                      variants={skill.variants}
                    >
                      <Weapon className="w-full h-full" />
                    </motion.div>
                  </div>

                  <div className="text-red-600 mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {skill.icon}
                  </div>
                  <h3 className="font-serif text-xl text-white mb-4 border-b border-gray-800 pb-2 group-hover:border-red-600 transition-colors relative z-10">
                    {skill.category}
                  </h3>
                  <ul className="space-y-2 relative z-10">
                    {skill.items.map((item) => (
                      <li key={item} className="text-gray-400 text-sm flex items-center">
                        <span className="w-1 h-1 bg-red-600 mr-2 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </InkSplash>
            );
          })}
        </div>
      </div>
    </section>
  );
}
