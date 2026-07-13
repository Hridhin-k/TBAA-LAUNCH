"use client";

import type { ReactNode } from "react";
import { motion, type MotionValue, useTransform } from "framer-motion";

type StudioBackdropProps = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  dark?: boolean;
};

type Floater = {
  id: string;
  className: string;
  depth: number;
  float: "a" | "b";
  svg: ReactNode;
};

const floaters: Floater[] = [
  {
    id: "reel",
    className: "left-[4%] top-[22%] hidden w-28 sm:block md:w-36",
    depth: 22,
    float: "a",
    svg: (
      <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
        <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="60" cy="60" r="12" stroke="currentColor" strokeWidth="1.4" />
        {[
          { cx: 84, cy: 60 },
          { cx: 72, cy: 81 },
          { cx: 48, cy: 81 },
          { cx: 36, cy: 60 },
          { cx: 48, cy: 39 },
          { cx: 72, cy: 39 },
        ].map((hole) => (
          <circle
            key={`${hole.cx}-${hole.cy}`}
            cx={hole.cx}
            cy={hole.cy}
            r="5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        ))}
        <path
          d="M90 78c10 8 18 18 14 30"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "lens",
    className: "right-[5%] top-[18%] hidden w-24 sm:block md:w-32",
    depth: -20,
    float: "b",
    svg: (
      <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
        <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="60" cy="60" r="28" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="60" cy="60" r="16" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="60" cy="60" r="6" fill="#b85c38" opacity="0.5" />
        <path d="M60 20v8M60 92v8M20 60h8M92 60h8" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    id: "storyboard",
    className: "left-[6%] bottom-[20%] hidden w-28 sm:block md:w-36",
    depth: 16,
    float: "b",
    svg: (
      <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
        <rect x="18" y="22" width="84" height="76" rx="4" stroke="currentColor" strokeWidth="1.4" />
        <path d="M18 40h84M60 40v58M18 70h84" stroke="currentColor" strokeWidth="1.1" />
        <text x="26" y="34" fill="currentColor" fontSize="8" letterSpacing="1">
          SB
        </text>
      </svg>
    ),
  },
  {
    id: "boom",
    className: "right-[7%] bottom-[22%] hidden w-28 sm:block md:w-36",
    depth: -18,
    float: "a",
    svg: (
      <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
        <path d="M20 96L88 28" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="96" cy="24" rx="14" ry="10" stroke="currentColor" strokeWidth="1.4" />
        <path d="M88 28l10 8" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="20" cy="96" r="4" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: "script",
    className: "left-[18%] top-[12%] hidden w-20 md:block md:w-24",
    depth: 12,
    float: "a",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
        <rect x="24" y="14" width="52" height="72" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M34 30h32M34 40h28M34 50h30M34 60h20" stroke="currentColor" strokeWidth="1.1" />
        <path d="M30 18l8-6h36v6" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    id: "chair",
    className: "right-[16%] top-[42%] hidden w-20 lg:block lg:w-24",
    depth: -14,
    float: "b",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
        <path d="M30 28h40v18H30z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M34 46v30M66 46v30M28 76h44" stroke="currentColor" strokeWidth="1.3" />
        <path d="M38 22h24" stroke="currentColor" strokeWidth="1.2" />
        <text x="36" y="40" fill="currentColor" fontSize="7" letterSpacing="0.5">
          DIR
        </text>
      </svg>
    ),
  },
  {
    id: "grade",
    className: "left-[42%] bottom-[10%] hidden w-20 md:block md:w-24",
    depth: 10,
    float: "a",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
        <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1.3" />
        <path d="M50 22a28 28 0 0 1 24 14L50 50Z" fill="#b85c38" opacity="0.25" />
        <path d="M74 36a28 28 0 0 1-10 30L50 50Z" fill="currentColor" opacity="0.12" />
        <circle cx="50" cy="50" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "camera",
    className: "right-[28%] bottom-[12%] hidden w-24 md:block md:w-28",
    depth: -12,
    float: "b",
    svg: (
      <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
        <rect x="18" y="40" width="52" height="36" rx="5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M70 48l28-12v40L70 68V48Z" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="34" cy="32" r="10" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="54" cy="32" r="10" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="90" cy="58" r="3" fill="#b85c38" />
      </svg>
    ),
  },
];

export default function StudioBackdrop({
  mouseX,
  mouseY,
  dark = false,
}: StudioBackdropProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="projector-light absolute -left-10 -top-10 h-[55vh] w-[55vw]" />
      <div className="vignette-studio absolute inset-0" />

      {floaters.map((item) => (
        <FloaterItem
          key={item.id}
          item={item}
          mouseX={mouseX}
          mouseY={mouseY}
          dark={dark}
        />
      ))}
    </div>
  );
}

function FloaterItem({
  item,
  mouseX,
  mouseY,
  dark,
}: {
  item: Floater;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  dark: boolean;
}) {
  const x = useTransform(mouseX, [-1, 1], [-item.depth, item.depth]);
  const y = useTransform(mouseY, [-1, 1], [-item.depth * 0.75, item.depth * 0.75]);

  return (
    <motion.div
      style={{ x, y }}
      className={`absolute text-ink ${dark ? "opacity-[0.12]" : "opacity-[0.06]"} ${item.float === "a" ? "animate-float-a" : "animate-float-b"} ${item.className}`}
    >
      {item.svg}
    </motion.div>
  );
}
