"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";
import Clapboard from "@/components/Clapboard";
import Countdown from "@/components/Countdown";
import MagneticCTA from "@/components/MagneticCTA";
import RotatingHeadline from "@/components/RotatingHeadline";
import StudioBackdrop from "@/components/StudioBackdrop";
import { AGENCY_URL } from "@/lib/site";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const Spotlight = dynamic(() => import("@/components/Spotlight"), {
  ssr: false,
});
const DustParticles = dynamic(() => import("@/components/DustParticles"), {
  ssr: false,
});

const ease = [0.16, 1, 0.3, 1] as const;
const THEME_KEY = "tbaa-theme";

export default function LaunchPoster() {
  const mouseX = useSpring(0, { damping: 28, stiffness: 70, mass: 1 });
  const mouseY = useSpring(0, { damping: 28, stiffness: 70, mass: 1 });
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);
  const [fxReady, setFxReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    const next = saved === "dark";
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    setReady(true);

    let cancelled = false;
    const enableFx = () => {
      if (!cancelled) setFxReady(true);
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enableFx, { timeout: 1200 });
    } else {
      timeoutId = setTimeout(enableFx, 400);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  }, [dark, ready]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const toggleTheme = useCallback(() => {
    setDark((d) => !d);
  }, []);

  return (
    <div className="relative min-h-dvh w-full bg-cream text-ink transition-colors duration-500 md:h-dvh md:overflow-hidden">
      {fxReady ? (
        <>
          <CustomCursor />
          <Spotlight />
          <DustParticles />
        </>
      ) : null}
      <div className="paper-overlay" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      <section
        className="relative flex min-h-dvh flex-col md:h-full md:overflow-hidden"
        aria-label="The Better Academy launch"
      >
        <StudioBackdrop mouseX={mouseX} mouseY={mouseY} dark={dark} />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-4 sm:px-8 sm:py-6 md:h-full md:px-12 md:py-8">
          <header className="relative z-20 flex shrink-0 flex-col gap-3">
            <div className="flex items-center justify-between gap-3 text-[9px] tracking-[0.14em] text-stone uppercase sm:text-[10px] sm:tracking-[0.16em]">
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
                className="flex min-w-0 items-center gap-2"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="truncate">
                  <span className="sm:hidden">Coming Soon</span>
                  <span className="hidden sm:inline">
                    Coming Soon // First Batch 2026
                  </span>
                </span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
                className="shrink-0 text-right"
              >
                <span className="font-medium text-accent">
                  <span className="sm:hidden">Preparing</span>
                  <span className="hidden sm:inline">Studio Status // Preparing</span>
                </span>
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease }}
              className="flex justify-center"
            >
              <BrandLogo dark={dark} />
            </motion.div>
          </header>

          <main className="flex min-h-0 flex-1 flex-col justify-center py-5 md:py-4">
            <div className="grid w-full items-center gap-6 md:grid-cols-[1fr_1.1fr] md:gap-10 lg:gap-14">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <RotatingHeadline />

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.45, ease }}
                  className="mt-4 max-w-md text-sm leading-relaxed text-stone sm:mt-6 sm:text-[15px]"
                >
                  A founding cohort for people who&apos;d rather build the real
                  thing than watch another tutorial. Live drafts, working
                  critique, and a studio behind it that&apos;s already shipped
                  for clients.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.6, ease }}
                  className="mt-5 flex w-full max-w-lg flex-col items-center gap-4 sm:mt-8 sm:gap-5 md:items-start"
                >
                  <Countdown />
                  <MagneticCTA
                    href={AGENCY_URL}
                    label="Visit The Better Agency"
                    variant="primary"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease }}
                className="flex w-full items-center justify-center md:justify-end"
              >
                <Clapboard
                  mouseX={mouseX}
                  mouseY={mouseY}
                  onToggleTheme={toggleTheme}
                  dark={dark}
                />
              </motion.div>
            </div>
          </main>

          <footer className="mt-4 grid shrink-0 grid-cols-1 gap-2 border-t border-mist-dark pt-3 text-center text-[8px] tracking-[0.16em] text-stone uppercase sm:mt-0 sm:grid-cols-3 sm:gap-x-4 sm:pt-4 sm:text-left sm:text-[9px] sm:tracking-[0.18em]">
            <span>
              <span className="font-medium text-ink">Cohort</span> — Founding
              Batch
            </span>
            <span className="sm:text-center">
              <span className="font-medium text-ink">Format</span> — Studio +
              Live Drafts
            </span>
            <span className="sm:text-right">
              <span className="font-medium text-ink">Location</span> — Thrissur,
              India
            </span>
          </footer>
        </div>
      </section>
    </div>
  );
}
