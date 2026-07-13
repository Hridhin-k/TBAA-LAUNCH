"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function Spotlight() {
  const prefersReducedMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: 50, y: 40 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] transition-[background] duration-300"
      style={{
        background: `radial-gradient(520px circle at ${pos.x}% ${pos.y}%, rgba(253,252,250,0.45) 0%, rgba(247,245,241,0) 55%)`,
      }}
    />
  );
}
