"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface SamuraiTextProps {
    text: string;
    kanji: string;
    className?: string; // Additional classes for the container
    textClassName?: string; // Classes for the English text
    kanjiClassName?: string; // Classes for the Kanji text
}

export default function SamuraiText({
    text,
    kanji,
    className = "",
    textClassName = "",
    kanjiClassName = ""
}: SamuraiTextProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={`relative inline-block cursor-default ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* English Text */}
            <motion.span
                className={`block whitespace-nowrap ${textClassName}`}
                initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                animate={{
                    opacity: isHovered ? 0 : 1,
                    y: isHovered ? -10 : 0,
                    filter: isHovered ? "blur(4px)" : "blur(0px)"
                }}
                transition={{ duration: 0.3 }}
            >
                {text}
            </motion.span>

            {/* Kanji Text (Absolute Overlay) */}
            <motion.span
                className={`absolute inset-0 flex items-center justify-center whitespace-nowrap font-japanese ${kanjiClassName}`}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 10,
                    filter: isHovered ? "blur(0px)" : "blur(4px)"
                }}
                transition={{ duration: 0.3 }}
            >
                {kanji}
            </motion.span>
        </motion.div>
    );
}
