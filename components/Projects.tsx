"use client";

import { motion, Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";
import DecryptingText from "./DecryptingText";

const Castle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {/* Base Foundation (Ishigaki - Stone Wall) */}
    <path d="M 10 90 L 90 90 L 85 70 L 15 70 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />

    {/* Main Keep - Lower Tier */}
    <path d="M 20 70 L 22 50 L 78 50 L 80 70" fill="none" stroke="currentColor" strokeWidth="1.5" />
    {/* Lower Roof (Chidori Hafu) */}
    <path d="M 15 50 Q 50 40 85 50 L 80 48 Q 50 38 20 48 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />

    {/* Middle Tier */}
    <path d="M 30 48 L 30 35 L 70 35 L 70 48" fill="none" stroke="currentColor" strokeWidth="1.5" />
    {/* Middle Roof (Kara Hafu - Curved) */}
    <path d="M 25 35 Q 50 25 75 35" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

    {/* Top Tier */}
    <path d="M 40 30 L 40 15 L 60 15 L 60 30" fill="none" stroke="currentColor" strokeWidth="1.5" />
    {/* Top Roof */}
    <path d="M 35 15 L 50 5 L 65 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />

    {/* Shachihoko (Roof Ornaments) */}
    <path d="M 35 15 L 32 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M 65 15 L 68 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />

    {/* Windows / Details */}
    <rect x="45" y="20" width="10" height="5" stroke="currentColor" strokeWidth="1" fill="none" />
    <rect x="35" y="40" width="6" height="4" stroke="currentColor" strokeWidth="1" fill="none" />
    <rect x="59" y="40" width="6" height="4" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

const WarFan = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M 50 90 L 50 60" stroke="currentColor" strokeWidth="4" />
    <path d="M 10 30 Q 50 10 90 30 L 50 60 Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="60" r="3" fill="currentColor" />
    <path d="M 50 60 L 20 30" stroke="currentColor" strokeWidth="1" />
    <path d="M 50 60 L 80 30" stroke="currentColor" strokeWidth="1" />
    <path d="M 50 60 L 50 20" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const castleVariants: Variants = {
  idle: { scale: 1, y: 0, opacity: 0.1 },
  hover: {
    scale: 1.1,
    y: -10,
    opacity: [0.1, 0.3, 0.1],
    transition: { duration: 0.6, ease: "easeInOut" }
  }
};

const warFanVariants: Variants = {
  idle: { rotate: -10, opacity: 0.1 },
  hover: {
    rotate: [-10, 10, -10],
    opacity: [0.1, 0.3, 0.1],
    transition: { duration: 0.8, ease: "easeInOut", repeat: Infinity }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  hover: {}
};

const projects = [
  {
    title: "Nagar Rakshak",
    type: "Civic Issue Reporting Platform",
    period: "Aug 2025 – Sept 2025",
    tech: ["React", "TypeScript", "Supabase", "Gemini AI", "Leaflet"],
    desc: "A platform for reporting civic issues with AI-based severity detection and image validation. Features multilingual support and RBAC.",
    link: "https://nagarrakshakfy.netlify.app",
    color: "from-red-900 to-black",
    symbol: Castle,
    variants: castleVariants
  },
  {
    title: "Agrasar",
    type: "AI-Powered Rural Services",
    period: "Nov 2025",
    tech: ["AI", "Chatbot", "UI/UX"],
    desc: "AI-powered platform to improve rural access to government schemes. Built GramSathi chatbot for guidance and optimized UI for low-connectivity.",
    link: "#",
    color: "from-blue-900 to-black",
    symbol: WarFan,
    variants: warFanVariants
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <DecryptingText text="征服" className="text-sm text-red-500/70 mb-2 font-serif" />
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-white"
          >
            Recent <span className="text-red-600">Conquests</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden bg-[#151515] border border-gray-800 rounded-lg hover:border-red-600 transition-all duration-500"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

              {/* Conquest Symbol Watermark */}
              <div className="absolute -bottom-4 -right-4 w-40 h-40 pointer-events-none text-gray-600/50">
                <motion.div
                  className="w-full h-full"
                  variants={project.variants}
                >
                  <project.symbol className="w-full h-full" />
                </motion.div>
              </div>

              <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-serif text-white group-hover:text-red-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{project.type}</p>
                  </div>
                  <div className="flex space-x-3">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-mono bg-black/50 border border-gray-700 px-2 py-1 text-gray-400 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
