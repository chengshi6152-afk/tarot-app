"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { drawThreeCardSpread, DrawnCard } from "@/lib/tarot-utils";
import TarotCard from "@/components/TarotCard";
import CardInterpretation from "@/components/CardInterpretation";
import { RefreshCw, ChevronDown } from "lucide-react";

type Spread = {
  past: DrawnCard;
  present: DrawnCard;
  future: DrawnCard;
};

type Phase = "idle" | "revealed";

const POSITIONS: Array<{ key: keyof Spread; label: string; delay: number }> = [
  { key: "past", label: "Past", delay: 0 },
  { key: "present", label: "Present", delay: 0.25 },
  { key: "future", label: "Future", delay: 0.5 },
];

export default function ThreeCardSpreadPage() {
  const [spread, setSpread] = useState<Spread | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [revealedCount, setRevealedCount] = useState(0);
  const [selected, setSelected] = useState<keyof Spread | null>(null);

  function handleBegin() {
    const s = drawThreeCardSpread();
    setSpread(s);
    setRevealedCount(0);
    setSelected(null);

    // Stagger card reveals
    [0, 250, 500].forEach((delay, i) => {
      setTimeout(() => {
        setRevealedCount((c) => c + 1);
        if (i === 2) setPhase("revealed");
      }, delay + 300);
    });
  }

  function handleReset() {
    setPhase("idle");
    setSpread(null);
    setRevealedCount(0);
    setSelected(null);
  }

  const selectedCard = selected && spread ? spread[selected] : null;

  return (
    <div className="relative min-h-[calc(100dvh-3.5rem)] flex flex-col items-center px-4 py-12 gap-10">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-24">
        <div className="w-[600px] h-[400px] rounded-full bg-indigo-900/20 blur-[120px]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center"
      >
        <p className="text-xs tracking-[0.35em] uppercase text-purple-500/70 font-mono mb-2">
          Spread · Three Cards
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Past · Present · Future
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
          Three cards drawn from the full deck — each a chapter in your unfolding story.
        </p>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {phase === "idle" ? (
            /* ── Idle: big CTA button ── */
            <motion.button
              key="cta"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={handleBegin}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="
                px-10 py-4 rounded-2xl
                bg-gradient-to-br from-purple-900/80 to-indigo-900/80
                border border-purple-700/50 hover:border-purple-500/70
                text-white font-semibold tracking-wide text-sm sm:text-base
                shadow-xl shadow-purple-900/30 hover:shadow-purple-700/30
                transition-all duration-300
              "
            >
              Begin the Spread
            </motion.button>
          ) : (
            /* ── Revealed: three cards in a row ── */
            <motion.div
              key="spread"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-10 w-full"
            >
              {/* Cards row */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6 sm:gap-8 w-full">
                {spread && POSITIONS.map(({ key, label }, idx) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 + 0.1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <TarotCard
                      drawn={spread[key]}
                      isRevealed={revealedCount > idx}
                      label={label}
                    />
                    {/* Select button appears after reveal */}
                    <AnimatePresence>
                      {revealedCount > idx && (
                        <motion.button
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + idx * 0.1 }}
                          onClick={() =>
                            setSelected((prev) => (prev === key ? null : key))
                          }
                          className={`
                            flex items-center gap-1 text-[11px] font-mono tracking-widest uppercase px-3 py-1 rounded-full
                            border transition-colors duration-200
                            ${selected === key
                              ? "bg-purple-800/60 border-purple-500/60 text-purple-200"
                              : "border-purple-800/40 text-purple-500/70 hover:text-purple-300 hover:border-purple-600/60"}
                          `}
                        >
                          <ChevronDown
                            className={`w-3 h-3 transition-transform duration-200 ${selected === key ? "rotate-180" : ""}`}
                          />
                          Interpret
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Interpretation panel */}
              <AnimatePresence mode="wait">
                {selectedCard && selected && (
                  <motion.div
                    key={selected}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-xl"
                  >
                    <CardInterpretation
                      drawn={selectedCard}
                      position={POSITIONS.find((p) => p.key === selected)?.label}
                      inline
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reset */}
              {phase === "revealed" && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  onClick={handleReset}
                  className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-200 transition-colors font-mono tracking-wider uppercase"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  New spread
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
