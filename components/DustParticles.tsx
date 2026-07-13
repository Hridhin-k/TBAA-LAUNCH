"use client";

import { useEffect, useState } from "react";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 1 + (i % 3),
  delay: (i % 7) * 0.8,
  duration: 10 + (i % 5) * 2,
}));

export default function DustParticles() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduce);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="dust-particle absolute rounded-full bg-ink/20"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
