"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LAUNCH_AT = new Date("2026-07-31T10:00:00+05:30").getTime();

type Unit = { label: string; value: string };

const PLACEHOLDER: Unit[] = [
  { label: "Days", value: "--" },
  { label: "Hours", value: "--" },
  { label: "Minutes", value: "--" },
];

function getUnits(ms: number): Unit[] {
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  return [
    { label: "Days", value: String(days).padStart(2, "0") },
    { label: "Hours", value: String(hours).padStart(2, "0") },
    { label: "Minutes", value: String(minutes).padStart(2, "0") },
  ];
}

function FlipDigit({ value }: { value: string }) {
  return (
    <span className="relative inline-block h-[1.35em] w-[1.55em] overflow-hidden rounded-md border border-mist-dark bg-white/60 text-center font-display text-2xl font-semibold tabular-nums text-ink shadow-[0_1px_0_rgba(17,17,17,0.04)] sm:text-3xl">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Countdown() {
  const [units, setUnits] = useState<Unit[]>(PLACEHOLDER);

  useEffect(() => {
    const tick = () => setUnits(getUnits(LAUNCH_AT - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-[10px] tracking-[0.2em] text-stone uppercase">
        Launching In
      </p>
      <div className="flex items-end gap-3 sm:gap-4">
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center gap-1.5">
            <div className="flex gap-0.5">
              {unit.value.split("").map((digit, i) => (
                <FlipDigit key={`${unit.label}-${i}`} value={digit} />
              ))}
            </div>
            <span className="text-[8px] tracking-[0.18em] text-stone-light uppercase">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
