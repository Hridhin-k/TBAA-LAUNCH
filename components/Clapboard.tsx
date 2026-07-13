"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type ClapboardProps = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  onToggleTheme?: () => void;
  dark?: boolean;
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function Clapboard({
  mouseX,
  mouseY,
  onToggleTheme,
  dark = false,
}: ClapboardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [shake, setShake] = useState(false);

  const stickOpen = useMotionValue(0);
  const stickSpring = useSpring(stickOpen, { stiffness: 180, damping: 18 });
  const rotateX = useTransform(mouseY, [-1, 1], [5, -5]);
  const rotateY = useTransform(mouseX, [-1, 1], [-7, 7]);
  const floatY = useSpring(0, { stiffness: 40, damping: 12 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const t1 = setTimeout(() => stickOpen.set(-26), 450);
    const t2 = setTimeout(() => {
      stickOpen.set(0);
      setShake(true);
    }, 1500);
    const t3 = setTimeout(() => setShake(false), 1780);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [prefersReducedMotion, stickOpen]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let frame = 0;
    let raf = 0;
    const breathe = () => {
      frame += 0.012;
      floatY.set(Math.sin(frame) * 4);
      raf = requestAnimationFrame(breathe);
    };
    raf = requestAnimationFrame(breathe);
    return () => cancelAnimationFrame(raf);
  }, [floatY, prefersReducedMotion]);

  const handleEnter = () => {
    setHovered(true);
    if (!prefersReducedMotion) stickOpen.set(-8);
  };

  const handleLeave = () => {
    setHovered(false);
    stickOpen.set(0);
  };

  const handleClick = () => {
    if (!prefersReducedMotion) {
      stickOpen.set(-20);
      setTimeout(() => {
        stickOpen.set(0);
        setShake(true);
        setTimeout(() => setShake(false), 260);
      }, 180);
    }
    onToggleTheme?.();
  };

  return (
    <motion.button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      data-cursor="clapboard"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{
        opacity: 1,
        scale: hovered ? 1.025 : 1,
        x: shake ? [0, -2, 2, -1, 0] : 0,
      }}
      transition={{
        opacity: { duration: 0.95, ease },
        scale: { duration: 0.35, ease },
        x: shake ? { duration: 0.26 } : { duration: 0.5 },
      }}
      className="relative mx-auto block w-[min(90vw,380px)] border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-accent/35 sm:w-[420px] md:w-[460px] lg:w-[500px]"
      style={{
        y: prefersReducedMotion ? undefined : floatY,
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformPerspective: 900,
        filter: dark
          ? hovered
            ? "drop-shadow(0 24px 36px rgba(0,0,0,0.55)) drop-shadow(0 0 18px rgba(212,120,79,0.18))"
            : "drop-shadow(0 16px 28px rgba(0,0,0,0.45)) drop-shadow(0 0 12px rgba(212,120,79,0.1))"
          : hovered
            ? "drop-shadow(0 28px 40px rgba(17,17,17,0.28))"
            : "drop-shadow(0 18px 28px rgba(17,17,17,0.16))",
      }}
    >
      <svg viewBox="0 0 340 250" className="h-auto w-full" fill="none">
        <defs>
          <linearGradient id="slateBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c1c1c" />
            <stop offset="100%" stopColor="#0e0e0e" />
          </linearGradient>
        </defs>

        <rect x="28" y="62" width="284" height="160" rx="12" fill="url(#slateBody)" />
        {dark ? (
          <rect
            x="28"
            y="62"
            width="284"
            height="160"
            rx="12"
            fill="none"
            stroke="#d4784f"
            strokeOpacity="0.28"
            strokeWidth="1.25"
          />
        ) : null}

        <text
          x="48"
          y="92"
          fill="#8a8680"
          fontSize="9"
          fontFamily="var(--font-body), system-ui"
          letterSpacing="2.2"
        >
          PRODUCTION
        </text>
        <text
          x="248"
          y="92"
          fill="#8a8680"
          fontSize="9"
          fontFamily="var(--font-body), system-ui"
          letterSpacing="1.5"
        >
          EXT. DAY
        </text>
        <text
          x="48"
          y="118"
          fill="#f4f1ea"
          fontSize="22"
          fontFamily="var(--font-display), Georgia, serif"
          fontStyle="italic"
          fontWeight="500"
        >
          The Better Academy
        </text>

        <text
          x="48"
          y="152"
          fill="#8a8680"
          fontSize="8"
          fontFamily="var(--font-body), system-ui"
          letterSpacing="2"
        >
          SCENE
        </text>
        <text
          x="120"
          y="152"
          fill="#8a8680"
          fontSize="8"
          fontFamily="var(--font-body), system-ui"
          letterSpacing="2"
        >
          TAKE
        </text>
        <text
          x="192"
          y="152"
          fill="#8a8680"
          fontSize="8"
          fontFamily="var(--font-body), system-ui"
          letterSpacing="2"
        >
          ROLL
        </text>

        <text
          x="48"
          y="176"
          fill="#f4f1ea"
          fontSize="20"
          fontFamily="var(--font-display), system-ui"
          fontWeight="600"
        >
          01
        </text>
        <text
          x="120"
          y="176"
          fill="#f4f1ea"
          fontSize="20"
          fontFamily="var(--font-display), system-ui"
          fontWeight="600"
        >
          01
        </text>
        <text
          x="192"
          y="176"
          fill="#b85c38"
          fontSize="20"
          fontFamily="var(--font-display), system-ui"
          fontWeight="600"
        >
          A
        </text>

        <text
          x="48"
          y="204"
          fill="#8a8680"
          fontSize="8"
          fontFamily="var(--font-body), system-ui"
          letterSpacing="2"
        >
          DATE
        </text>
        <text
          x="220"
          y="204"
          fill="#f4f1ea"
          fontSize="11"
          fontFamily="var(--font-display), system-ui"
          fontWeight="600"
          letterSpacing="1"
        >
          LAUNCH 2026
        </text>

        <motion.g style={{ rotate: stickSpring, transformOrigin: "40px 62px" }}>
          <rect x="28" y="34" width="284" height="30" rx="4" fill="#111" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <path
              key={i}
              d={`M${44 + i * 32} 64 L${60 + i * 32} 34`}
              stroke={i % 2 === 0 ? "#f4f1ea" : "#111"}
              strokeWidth="14"
            />
          ))}
          <rect
            x="28"
            y="34"
            width="284"
            height="30"
            rx="4"
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="1"
          />
        </motion.g>
      </svg>

    </motion.button>
  );
}
