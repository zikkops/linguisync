"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const FULL_TITLE = "LinguiSync";
const SPLIT_INDEX = 6; // "Lingui" | "Sync"
const TYPE_SPEED_MS = 110;
const TITLE_START_DELAY_MS = 1800;

const LANGUAGES = ["English", "العربية", "Français", "Italiano", "中文", "Español"];
const ROLL_INTERVAL_MS = 2200;
const ROLL_TRANSITION_MS = 600;
const ROW_HEIGHT_REM = 2.75;

export function AnimatedHeroTitle({ align = "left" }: { align?: "left" | "center" }) {
  const [started, setStarted] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "rolling">("typing");

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), TITLE_START_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (typedCount >= FULL_TITLE.length) {
      const t = setTimeout(() => setPhase("rolling"), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTypedCount((c) => c + 1), TYPE_SPEED_MS);
    return () => clearTimeout(t);
  }, [started, typedCount]);

  const typed = FULL_TITLE.slice(0, typedCount);
  const typedLingui = typed.slice(0, SPLIT_INDEX);
  const typedSync = typed.slice(SPLIT_INDEX);

  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <h1
        className="animate-fade-in-up font-display text-6xl font-semibold italic text-white sm:text-7xl md:text-8xl"
        style={{ animationDelay: `${TITLE_START_DELAY_MS}ms` }}
      >
        <span>{typedLingui}</span>
        <span className="font-sans not-italic font-semibold text-accent-500">{typedSync}</span>
        <span
          aria-hidden
          className={cn(
            "ml-1 inline-block font-sans not-italic font-light text-accent-400 transition-opacity duration-300",
            started && phase === "typing" ? "animate-caret opacity-100" : "opacity-0"
          )}
        >
          |
        </span>
      </h1>

      <div
        className={cn(
          "mt-5 flex items-center gap-3 text-xl text-navy-300 transition-all duration-700 ease-out md:text-2xl",
          align === "center" ? "justify-center" : "justify-start",
          phase === "rolling" ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        <span>Now speaking</span>
        <LanguageRoll active={phase === "rolling"} />
      </div>
    </div>
  );
}

function LanguageRoll({ active }: { active: boolean }) {
  const [index, setIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setIndex((i) => i + 1), ROLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [active]);

  useEffect(() => {
    if (index !== LANGUAGES.length) return;
    const t = setTimeout(() => {
      setWithTransition(false);
      setIndex(0);
    }, ROLL_TRANSITION_MS);
    return () => clearTimeout(t);
  }, [index]);

  useEffect(() => {
    if (withTransition) return;
    const raf = requestAnimationFrame(() => setWithTransition(true));
    return () => cancelAnimationFrame(raf);
  }, [withTransition]);

  const displayList = [...LANGUAGES, LANGUAGES[0]];

  return (
    <div
      className="min-w-[7.5rem] overflow-hidden md:min-w-[9rem]"
      style={{ height: `${ROW_HEIGHT_REM}rem` }}
    >
      <div
        style={{
          transform: `translateY(-${index * ROW_HEIGHT_REM}rem)`,
          transition: withTransition ? `transform ${ROLL_TRANSITION_MS}ms ease` : "none",
        }}
      >
        {displayList.map((lang, i) => (
          <div
            key={i}
            dir="ltr"
            className="flex items-center whitespace-nowrap font-display italic text-accent-400"
            style={{ height: `${ROW_HEIGHT_REM}rem` }}
          >
            {lang}
          </div>
        ))}
      </div>
    </div>
  );
}
