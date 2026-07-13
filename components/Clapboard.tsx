"use client";

import { useEffect, useRef, useState } from "react";
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
  onClack?: () => void;
  onFiveClicks?: () => void;
  onHoverChange?: (hovered: boolean) => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function Clapboard({
  mouseX,
  mouseY,
  onClack,
  onFiveClicks,
  onHoverChange,
}: ClapboardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"enter" | "open" | "closed">("enter");
  const [hovered, setHovered] = useState(false);
  const [shake, setShake] = useState(0);
  const clicks = useRef(0);

  const stickOpen = useMotionValue(0);
  const stickSpring = useSpring(stickOpen, { stiffness: 180, damping: 18 });

  const rotateX = useTransform(mouseY, [-1, 1], [6, -6]);
  const rotateY = useTransform(mouseX, [-1, 1], [-8, 8]);
  const floatY = useSpring(0, { stiffness: 40, damping: 12 });

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("closed");
      stickOpen.set(0);
      onClack?.();
      return;
    }

    const t1 = setTimeout(() => {
      setPhase("open");
      stickOpen.set(-28);
    }, 500);
    const t2 = setTimeout(() => {
      stickOpen.set(0);
      setPhase("closed");
      setShake(1);
      onClack?.();
    }, 1600);
    const t3 = setTimeout(() => setShake(0), 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [prefersReducedMotion, stickOpen, onClack]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let frame = 0;
    let raf = 0;
    const breathe = () => {
      frame += 0.012;
      floatY.set(Math.sin(frame) * 5);
      raf = requestAnimationFrame(breathe);
    };
    raf = requestAnimationFrame(breathe);
    return () => cancelAnimationFrame(raf);
  }, [floatY, prefersReducedMotion]);

  const handleEnter = () => {
    setHovered(true);
    onHoverChange?.(true);
    if (!prefersReducedMotion && phase === "closed") stickOpen.set(-8);
  };

  const handleLeave = () => {
    setHovered(false);
    onHoverChange?.(false);
    if (phase === "closed") stickOpen.set(0);
  };

  const handleClick = () => {
    clicks.current += 1;
    if (clicks.current >= 5) {
      clicks.current = 0;
      onFiveClicks?.();
    }

    if (prefersReducedMotion) {
      onClack?.();
      return;
    }

    stickOpen.set(-22);
    setTimeout(() => {
      stickOpen.set(0);
      setShake(1);
      onClack?.();
      setTimeout(() => setShake(0), 280);
    }, 220);
  };

  return (
    <motion.button
      type="button"
      aria-label="Studio clapboard — click to mark the take"
      data-cursor="clapboard"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{
        opacity: 1,
        scale: hovered ? 1.03 : 1,
        y: shake ? [0, -2, 2, -1, 0] : 0,
      }}
      transition={{
        opacity: { duration: 1, ease },
        scale: { duration: 0.4, ease },
        y: shake ? { duration: 0.28 } : { duration: 0.6 },
      }}
      className="relative mx-auto block w-[min(88vw,420px)] cursor-none border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-accent/30 sm:w-[440px] md:w-[480px] lg:w-[520px]"
      style={{
        y: prefersReducedMotion ? undefined : floatY,
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformPerspective: 900,
        filter: hovered
          ? "drop-shadow(0 28px 40px rgba(17,17,17,0.22))"
          : "drop-shadow(0 18px 28px rgba(17,17,17,0.14))",
      }}
    >
      <svg viewBox="0 0 320 280" className="h-auto w-full" fill="none">
        <defs>
          <linearGradient id="slateBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0d0d0d" />
          </linearGradient>
          <linearGradient id="slateFace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#141414" />
          </linearGradient>
        </defs>

        {/* Body */}
        <rect
          x="36"
          y="78"
          width="248"
          height="168"
          rx="10"
          fill="url(#slateBody)"
        />
        <rect
          x="48"
          y="96"
          width="224"
          height="132"
          rx="4"
          fill="url(#slateFace)"
          stroke="#3a3a3a"
          strokeWidth="1"
        />

        {/* Labels */}
        <text
          x="60"
          y="118"
          fill="#8f8b83"
          fontSize="9"
          fontFamily="var(--font-body), system-ui"
          letterSpacing="2"
        >
          PRODUCTION
        </text>
        <text
          x="60"
          y="138"
          fill="#f7f5f1"
          fontSize="16"
          fontFamily="var(--font-display), system-ui"
          fontWeight="600"
        >
          THE BETTER ACADEMY
        </text>
        <text
          x="60"
          y="168"
          fill="#8f8b83"
          fontSize="9"
          fontFamily="var(--font-body), system-ui"
          letterSpacing="2"
        >
          SCENE
        </text>
        <text
          x="120"
          y="168"
          fill="#8f8b83"
          fontSize="9"
          fontFamily="var(--font-body), system-ui"
          letterSpacing="2"
        >
          TAKE
        </text>
        <text
          x="180"
          y="168"
          fill="#8f8b83"
          fontSize="9"
          fontFamily="var(--font-body), system-ui"
          letterSpacing="2"
        >
          ROLL
        </text>
        <text
          x="60"
          y="190"
          fill="#f7f5f1"
          fontSize="18"
          fontFamily="var(--font-display), system-ui"
          fontWeight="600"
        >
          01
        </text>
        <text
          x="120"
          y="190"
          fill="#f7f5f1"
          fontSize="18"
          fontFamily="var(--font-display), system-ui"
          fontWeight="600"
        >
          01
        </text>
        <text
          x="180"
          y="190"
          fill="#b85c38"
          fontSize="18"
          fontFamily="var(--font-display), system-ui"
          fontWeight="600"
        >
          A
        </text>
        <text
          x="60"
          y="214"
          fill="#8f8b83"
          fontSize="9"
          fontFamily="var(--font-body), system-ui"
          letterSpacing="2"
        >
          DATE · LAUNCH 2026
        </text>
        <line
          x1="60"
          y1="224"
          x2="250"
          y2="224"
          stroke="#3a3a3a"
          strokeWidth="1"
        />

        {/* Hinge stick */}
        <motion.g
          style={{ rotate: stickSpring, transformOrigin: "48px 78px" }}
        >
          <rect x="36" y="48" width="248" height="32" rx="4" fill="#111" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path
              key={i}
              d={`M${52 + i * 32} 80 L${68 + i * 32} 48`}
              stroke={i % 2 === 0 ? "#f7f5f1" : "#111"}
              strokeWidth="14"
            />
          ))}
          <rect
            x="36"
            y="48"
            width="248"
            height="32"
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
