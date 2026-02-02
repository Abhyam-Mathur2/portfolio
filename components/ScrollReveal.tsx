"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ScrollReveal({ children }: { children: ReactNode }) {
    return (
        <div className="relative mx-auto max-w-4xl py-12 perspective-1000">
            {/* Scroll Top Roller */}
            <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ amount: 0.8 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-8 bg-gradient-to-b from-[#5c4033] via-[#8b5a2b] to-[#3e2723] rounded-full mx-auto relative z-20 shadow-xl flex items-center justify-between px-1"
            >
                {/* Gold Cap Left */}
                <div className="w-8 h-10 bg-gradient-to-r from-[#ffd700] to-[#b8860b] rounded-sm shadow-md border-r border-[#8b4513] relative -ml-2">
                    <div className="absolute inset-0 bg-black/10 rounded-sm" />
                </div>

                {/* Gold Cap Right */}
                <div className="w-8 h-10 bg-gradient-to-l from-[#ffd700] to-[#b8860b] rounded-sm shadow-md border-l border-[#8b4513] relative -mr-2">
                    <div className="absolute inset-0 bg-black/10 rounded-sm" />
                </div>
            </motion.div>

            {/* Scroll Body (Paper) */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                whileInView={{ height: "auto", opacity: 1 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
                className="relative bg-[#f5f5dc] text-black overflow-hidden shadow-2xl mx-4 origin-top border-x-[1px] border-[#d2b48c]"
                style={{
                    boxShadow: "inset 0 0 40px rgba(0,0,0,0.1)",
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05), transparent 5%, transparent 95%, rgba(0,0,0,0.05))`,
                }}
            >
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
                    style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/rice-paper-2.png")` }}
                />

                {/* Inner Padding/Content */}
                <div className="p-10 md:p-16 relative z-10 font-serif">
                    {children}
                </div>
            </motion.div>

            {/* Scroll Bottom Roller */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
                className="h-10 bg-gradient-to-b from-[#5c4033] via-[#8b5a2b] to-[#3e2723] rounded-full mx-auto relative z-20 shadow-2xl mt-[-15px] flex items-center justify-between px-1"
            >
                {/* Gold Cap Left */}
                <div className="w-10 h-12 bg-gradient-to-r from-[#ffd700] to-[#b8860b] rounded-sm shadow-lg border-r border-[#8b4513] relative -ml-3">
                    <div className="absolute inset-x-0 top-2 h-[1px] bg-[#8b4513]/30" />
                    <div className="absolute inset-x-0 bottom-2 h-[1px] bg-[#8b4513]/30" />
                </div>

                {/* Center Tassel */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 w-full flex justify-center pointer-events-none">
                    <div className="w-16 h-[2px] bg-[#8b4513] opacity-50" />
                    <div className="absolute top-2 w-1 h-24 bg-red-900 shadow-md flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-red-800 -top-1 absolute" />
                        <div className="w-4 h-6 border-x-2 border-red-950 absolute bottom-0 bg-red-800" />
                        <div className="w-full h-8 absolute top-[100%] bg-red-900/80 blur-[1px]" />
                    </div>
                </div>

                {/* Gold Cap Right */}
                <div className="w-10 h-12 bg-gradient-to-l from-[#ffd700] to-[#b8860b] rounded-sm shadow-lg border-l border-[#8b4513] relative -mr-3">
                    <div className="absolute inset-x-0 top-2 h-[1px] bg-[#8b4513]/30" />
                    <div className="absolute inset-x-0 bottom-2 h-[1px] bg-[#8b4513]/30" />
                </div>
            </motion.div>
        </div>
    );
}
