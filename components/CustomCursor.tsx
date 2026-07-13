"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CursorMode = "rec" | "action" | "cut" | "roll";

const LABELS: Record<CursorMode, string> = {
  rec: "REC ●",
  action: "ACTION",
  cut: "CUT",
  roll: "ROLL",
};

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [mode, setMode] = useState<CursorMode>("rec");
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setActive(true);
    document.documentElement.classList.add("cursor-studio");

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const el = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor]"
      ) as HTMLElement | null;
      const kind = el?.dataset.cursor;
      if (kind === "button") setMode("action");
      else if (kind === "clapboard") setMode("cut");
      else if (kind === "logo") setMode("roll");
      else setMode("rec");
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      document.documentElement.classList.remove("cursor-studio");
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (!active) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[100] hidden mix-blend-difference md:block"
      animate={{ x: pos.x + 14, y: pos.y + 14 }}
      transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.2 }}
    >
      <span className="rounded-sm bg-ink px-1.5 py-0.5 font-body text-[8px] font-medium tracking-[0.18em] text-cream uppercase">
        {LABELS[mode]}
      </span>
    </motion.div>
  );
}
