"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface DecryptingTextProps {
  text: string;
  className?: string;
}

const chars = "アィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ";

export default function DecryptingText({ text, className = "" }: DecryptingTextProps) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const animate = () => {
      interval = setInterval(() => {
        setDisplayText(() =>
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };

    // Animate on mount
    animate();

    // Re-animate on hover if desired, or just cleaner cleanup
    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.span
      className={`font-japanese ${className}`}
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      viewport={{ once: true }}
    >
      {displayText}
    </motion.span>
  );
}
