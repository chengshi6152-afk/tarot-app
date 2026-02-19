"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { drawCard, DrawnCard } from "@/lib/tarot-utils";
import TarotCard from "@/components/TarotCard";
import CardDeck from "@/components/CardDeck";
import CardInterpretation from "@/components/CardInterpretation";
import { RefreshCw } from "lucide-react";

type Phase = "idle" | "revealing" | "done";

export default function DailyDrawPage() {
  const [drawn, setDrawn] = useState<DrawnCard | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  function handleDraw() {
    if (phase !== "idle") return;
    const card = drawCard();
    setDrawn(card);
    setPhase("revealing");
    // Brief pause before flipping, so the user sees the card appear
    setTimeout(() => setPhase("done"), 300);
  }

  function handleReset() {
    setPhase("idle");
    setDrawn(null);
  }

  return (
    <div className="relative min-h-[calc(100dvh-3.5rem)] flex flex-col items-center px-4 py-12 gap-10">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-24">
        <div className="w-[400px] h-[400px] rounded-full bg-violet-900/20 blur-[100px]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center"
      >
        <p className="text-xs tracking-[0.35em] uppercase text-purple-500/70 font-mono mb-2">
          Daily Oracle
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Daily Draw
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
          Still your mind. Focus on a question or intention, then draw your card.
        </p>
      </motion.div>

      {/* Main area */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xl">
        <AnimatePresence mode="wait">
          {phase === "idle" ? (
            <motion.div
              key="deck"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <CardDeck onClick={handleDraw} />
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-8 w-full"
            >
              {/* Card flip */}
              <TarotCard
                drawn={drawn}
                isRevealed={phase === "done"}
              />

              {/* Interpretation — fades in after flip */}
              <AnimatePresence>
                {phase === "done" && drawn && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="w-full"
                  >
                    <CardInterpretation drawn={drawn} inline />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reset */}
              {phase === "done" && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={handleReset}
                  className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-200 transition-colors font-mono tracking-wider uppercase"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Draw again
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
