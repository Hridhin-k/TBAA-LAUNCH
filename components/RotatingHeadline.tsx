"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const WORDS = [
  "Coming",
  "Filming",
  "Brewing",
  "Loading",
  "Almost Here",
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

export default function RotatingHeadline() {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, 2800);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <h1 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-semibold leading-[0.95] tracking-tight text-ink">
      <span className="block overflow-hidden pb-0.5">
        <motion.span
          className="block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          Something
        </motion.span>
      </span>
      <span className="block overflow-hidden pb-0.5">
        <motion.span
          className="block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.24, ease }}
        >
          Better is
        </motion.span>
      </span>
      <span className="relative mt-1 block h-[1.05em] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={WORDS[index]}
            className="absolute left-0 right-0 block text-accent md:right-auto"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -28 }}
            transition={{ duration: 0.55, ease }}
          >
            {WORDS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}
