"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";
import Clapboard from "@/components/Clapboard";
import Countdown from "@/components/Countdown";
import CustomCursor from "@/components/CustomCursor";
import DustParticles from "@/components/DustParticles";
import MagneticCTA from "@/components/MagneticCTA";
import RotatingHeadline from "@/components/RotatingHeadline";
import Spotlight from "@/components/Spotlight";
import StudioBackdrop from "@/components/StudioBackdrop";

const ease = [0.16, 1, 0.3, 1] as const;
const THEME_KEY = "tbaa-theme";

export default function LaunchPoster() {
  const mouseX = useSpring(0, { damping: 28, stiffness: 70, mass: 1 });
  const mouseY = useSpring(0, { damping: 28, stiffness: 70, mass: 1 });
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    const next = saved === "dark";
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    setReady(true);
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
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const toggleTheme = useCallback(() => {
    setDark((d) => !d);
  }, []);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-cream text-ink transition-colors duration-500">
      <CustomCursor />
      <Spotlight />
      <div className="paper-overlay" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />

      <section className="relative flex h-full flex-col overflow-hidden">
        <StudioBackdrop mouseX={mouseX} mouseY={mouseY} dark={dark} />
        <DustParticles />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col px-5 py-5 sm:px-8 sm:py-6 md:px-12 md:py-8">
          <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="flex items-center gap-2 text-[9px] tracking-[0.16em] text-stone uppercase sm:text-[10px]"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="hidden sm:inline">
                Coming Soon // First Batch 2026
              </span>
              <span className="sm:hidden">Coming Soon</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease }}
            >
              <BrandLogo dark={dark} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="justify-self-end text-right text-[9px] tracking-[0.16em] text-stone uppercase sm:text-[10px]"
            >
              Studio Status{" "}
              <span className="font-medium text-accent">// Preparing</span>
            </motion.p>
          </header>

          <main className="flex min-h-0 flex-1 items-center py-4">
            <div className="grid w-full items-center gap-8 md:grid-cols-[1fr_1.1fr] md:gap-10 lg:gap-14">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <RotatingHeadline />

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.45, ease }}
                  className="mt-5 max-w-md text-sm leading-relaxed text-stone sm:mt-6 sm:text-[15px]"
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
                  className="mt-7 flex w-full max-w-lg flex-col items-center gap-5 sm:mt-8 md:items-start"
                >
                  <Countdown />
                  <div className="flex flex-col items-center gap-2.5 sm:flex-row md:justify-start">
                    <MagneticCTA
                      href="https://thebetteragency.in/"
                      label="Visit The Better Agency"
                      variant="primary"
                    />
                    {/* <MagneticCTA
                      href="https://thebetteragency.in/"
                      label="Visit The Better Agency"
                      variant="secondary"
                      external
                    /> */}
                  </div>
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

          <footer className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-mist-dark pt-4 text-[8px] tracking-[0.18em] text-stone uppercase sm:text-[9px]">
            <span>
              <span className="font-medium text-ink">Cohort</span> — Founding
              Batch
            </span>
            <span>
              <span className="font-medium text-ink">Format</span> — Studio +
              Live Drafts
            </span>
            <span>
              <span className="font-medium text-ink">Location</span> — Thrissur,
              India
            </span>
          </footer>
        </div>
      </section>
    </div>
  );
}
