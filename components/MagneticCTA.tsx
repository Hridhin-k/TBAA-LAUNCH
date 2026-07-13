"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

type MagneticCTAProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  external?: boolean;
};

export default function MagneticCTA({
  href,
  label,
  variant = "primary",
  external = false,
}: MagneticCTAProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const x = useSpring(0, { damping: 20, stiffness: 140, mass: 0.7 });
  const y = useSpring(0, { damping: 20, stiffness: 140, mass: 0.7 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const distanceX = clientX - (left + width / 2);
    const distanceY = clientY - (top + height / 2);

    if (Math.hypot(distanceX, distanceY) < 110) {
      setIsHovered(true);
      x.set(distanceX * 0.22);
      y.set(distanceY * 0.22);
    } else {
      handleMouseLeave();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const isPrimary = variant === "primary";
  const arrow = external || variant === "secondary" ? "↗" : "→";

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="button"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsHovered(true)}
      onBlur={handleMouseLeave}
      style={prefersReducedMotion ? undefined : { x, y }}
      className={
        isPrimary
          ? "inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-sm font-semibold tracking-tight text-cream outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent/40 sm:px-7 sm:text-base"
          : "inline-flex items-center gap-2 rounded-full border border-mist-dark bg-transparent px-6 py-3 font-display text-sm font-semibold tracking-tight text-ink outline-none transition-colors hover:border-ink/40 focus-visible:ring-2 focus-visible:ring-accent/40 sm:px-7 sm:text-base"
      }
    >
      <span>{label}</span>
      <span className="sr-only"> (opens in a new tab)</span>
      <motion.span
        animate={{ x: isHovered ? 3 : 0, y: isHovered && external ? -2 : 0 }}
        transition={{ ease: "easeOut", duration: 0.25 }}
        aria-hidden="true"
      >
        {arrow}
      </motion.span>
    </motion.a>
  );
}
