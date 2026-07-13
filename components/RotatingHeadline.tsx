"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const WORDS = [
  "Coming.",
  "Filming.",
  "Brewing.",
  "Loading.",
  "Almost Here.",
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
    <h1 className="font-display text-[clamp(2rem,8.5vw,4.75rem)] font-semibold leading-[1.02] tracking-tight text-ink">
      <span className="block">Something</span>
      <span className="block">Better is</span>
      <span className="relative mt-0.5 block min-h-[1.15em]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={WORDS[index]}
            className="block italic text-accent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease }}
          >
            {WORDS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}
