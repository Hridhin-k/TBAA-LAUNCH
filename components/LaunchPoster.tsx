"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import Clapboard from "@/components/Clapboard";
import Countdown from "@/components/Countdown";
import CustomCursor from "@/components/CustomCursor";
import DustParticles from "@/components/DustParticles";
import MagneticCTA from "@/components/MagneticCTA";
import RotatingHeadline from "@/components/RotatingHeadline";
import Spotlight from "@/components/Spotlight";
import StudioBackdrop from "@/components/StudioBackdrop";

const ease = [0.16, 1, 0.3, 1] as const;

const DIRECTOR_QUOTES = [
  "Cut. Reset. Make it better.",
  "The brief is the beginning — not the idea.",
  "Taste is a muscle. Train it daily.",
  "Ship the work. Then sharpen it.",
];

export default function LaunchPoster() {
  const mouseX = useSpring(0, { damping: 28, stiffness: 70, mass: 1 });
  const mouseY = useSpring(0, { damping: 28, stiffness: 70, mass: 1 });

  const [directorMode, setDirectorMode] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    document.documentElement.classList.toggle("director-mode", directorMode);
    return () => document.documentElement.classList.remove("director-mode");
  }, [directorMode]);

  useEffect(() => {
    if (!directorMode) return;
    const id = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % DIRECTOR_QUOTES.length);
    }, 4500);
    return () => clearInterval(id);
  }, [directorMode]);

  const handleFiveClicks = useCallback(() => {
    setDirectorMode(true);
  }, []);

  return (
    <div
      className={`relative h-dvh w-full overflow-hidden bg-cream text-ink transition-colors duration-700 ${directorMode ? "director-surface" : ""}`}
    >
      <CustomCursor />
      <Spotlight />
      <div className="paper-overlay" aria-hidden="true" />
      <div
        className={`film-grain ${directorMode ? "film-grain-strong" : ""}`}
        aria-hidden="true"
      />

      <section className="relative flex h-full flex-col overflow-hidden">
        <StudioBackdrop
          mouseX={mouseX}
          mouseY={mouseY}
          directorMode={directorMode}
        />
        <DustParticles />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col px-5 py-5 sm:px-8 sm:py-7 md:px-12 md:py-10">
          <header className="flex items-center justify-between">
            <motion.span
              data-cursor="logo"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-base font-semibold tracking-tight text-ink sm:text-lg"
            >
              Better.Academy
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease }}
              className="text-[9px] tracking-[0.16em] text-stone uppercase sm:text-[10px]"
            >
              Studio Status{" "}
              <span className="font-medium text-accent">
                {directorMode ? "// Director Mode" : "// Preparing"}
              </span>
            </motion.p>
          </header>

          <main className="flex min-h-0 flex-1 items-center py-4 md:py-6">
            <div className="grid w-full items-center gap-6 md:grid-cols-[1fr_1.15fr] md:gap-8 lg:gap-12">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease }}
                  className="mb-3 flex items-center gap-2 text-[10px] tracking-[0.14em] text-stone uppercase sm:mb-4 sm:text-[11px]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Coming Soon · First batch 2026
                </motion.p>

                <RotatingHeadline />

                <AnimatePresence>
                  {directorMode && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 max-w-md font-display text-sm italic text-accent"
                    >
                      “{DIRECTOR_QUOTES[quoteIndex]}”
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.55, ease }}
                  className="mt-6 flex w-full max-w-md flex-col items-center gap-5 sm:mt-8 md:items-start"
                >
                  <Countdown />
                  <MagneticCTA
                    href="https://thebetteragency.in/"
                    label="Visit The Better Agency"
                    variant="primary"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease }}
                className="flex w-full items-center justify-center md:justify-end"
              >
                <Clapboard
                  mouseX={mouseX}
                  mouseY={mouseY}
                  onFiveClicks={handleFiveClicks}
                />
              </motion.div>
            </div>
          </main>

          <footer className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-mist-dark pt-4 text-[8px] tracking-[0.18em] text-stone uppercase sm:text-[9px]">
            <span>
              <span className="font-medium text-ink">Cohort</span> · Founding
              Batch
            </span>
            <span>
              <span className="font-medium text-ink">Format</span> · Studio +
              Live Briefs
            </span>
            <span>
              <span className="font-medium text-ink">Location</span> · Thrissur,
              India
            </span>
          </footer>
        </div>
      </section>
    </div>
  );
}
