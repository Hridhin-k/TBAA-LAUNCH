"use client";

import { useEffect, useState } from "react";

const LAUNCH_AT = new Date("2026-07-31T10:00:00+05:30").getTime();

type Unit = { label: string; value: string };

const PLACEHOLDER: Unit[] = [
  { label: "Days", value: "--" },
  { label: "Hrs", value: "--" },
  { label: "Min", value: "--" },
  { label: "Sec", value: "--" },
];

function getUnits(ms: number): Unit[] {
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return [
    { label: "Days", value: String(days).padStart(2, "0") },
    { label: "Hrs", value: String(hours).padStart(2, "0") },
    { label: "Min", value: String(minutes).padStart(2, "0") },
    { label: "Sec", value: String(seconds).padStart(2, "0") },
  ];
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
    <div className="flex w-full max-w-sm items-stretch justify-center gap-1.5 sm:max-w-none sm:gap-2.5" aria-live="polite">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-xl bg-[#1a1a1a] px-2 py-2.5 sm:min-w-[4.75rem] sm:flex-none sm:px-3.5 sm:py-3.5"
        >
          <span className="font-display text-[1.35rem] font-semibold leading-none tracking-tight text-[#f7f5f1] tabular-nums sm:text-[1.85rem]">
            {unit.value}
          </span>
          <span className="mt-1.5 text-[8px] font-medium tracking-[0.16em] text-accent uppercase sm:mt-2 sm:text-[9px] sm:tracking-[0.2em]">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
