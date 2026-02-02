"use client";

import { motion } from "framer-motion";
import DecryptingText from "./DecryptingText";

const experiences = [
  {
    role: "Tech Intern",
    company: "Democratic News Live",
    period: "Dec 2025 – Present",
    desc: [
      "Contributing to CorruptX, a secure investigative journalism platform.",
      "Building video ingestion pipelines and secure backend APIs.",
      "Focused on system reliability and data integrity.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "D.R.D Security Pvt. Ltd.",
    period: "Jun 2025 – Jul 2025",
    desc: [
      "Improved dashboard usability using reusable UI components.",
      "Ensured reliable frontend-backend communication via structured APIs.",
    ],
  },
  {
    role: "Social Intern",
    company: "Shiv Devi Social & Educational Welfare Society",
    period: "Jun 2024 – Jul 2024",
    desc: [
      "Participated in hygiene awareness campaigns and community outreach.",
      "Organized donation drives and essential supplies distribution.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <DecryptingText text="歴史" className="text-sm text-red-500/70 mb-2 font-serif" />
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-white"
          >
            Campaign <span className="text-red-600">History</span>
          </motion.h2>
        </div>

        <div className="space-y-12 relative border-l border-gray-800 ml-3 md:ml-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Dot */}
              <div className="absolute -left-[5px] top-2 w-3 h-3 bg-red-600 rounded-full shadow-[0_0_10px_#dc143c]" />
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white font-serif">{exp.role}</h3>
                <span className="text-sm text-red-400 font-mono">{exp.period}</span>
              </div>
              
              <h4 className="text-lg text-gray-400 mb-4">{exp.company}</h4>
              
              <ul className="space-y-2">
                {exp.desc.map((item, i) => (
                  <li key={i} className="text-gray-300 text-sm list-disc list-inside marker:text-red-900">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
