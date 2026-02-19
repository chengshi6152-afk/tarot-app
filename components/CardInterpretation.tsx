"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DrawnCard } from "@/lib/tarot-utils";
import { BookOpen, RotateCcw, X } from "lucide-react";

type Props = {
  drawn: DrawnCard | null;
  position?: string; // e.g. "Past", "Present", "Future"
  onReset?: () => void;
  /** If true renders inline (no modal chrome). */
  inline?: boolean;
};

export default function CardInterpretation({ drawn, position, onReset, inline = false }: Props) {
  if (!drawn) return null;

  const isReversed = drawn.orientation === "Reversed";

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`
        relative rounded-2xl overflow-hidden
        bg-gradient-to-br from-slate-900/90 via-indigo-950/80 to-slate-900/90
        border border-purple-700/40 backdrop-blur-md
        ${inline ? "p-5" : "p-6 sm:p-8"}
      `}
    >
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1">
          {position && (
            <p className="text-[10px] tracking-[0.25em] uppercase text-purple-500 font-mono mb-1">
              {position}
            </p>
          )}
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
            {drawn.card.name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`
                text-xs font-mono px-2 py-0.5 rounded-full border
                ${isReversed
                  ? "text-rose-300 border-rose-700/60 bg-rose-950/40"
                  : "text-emerald-300 border-emerald-700/60 bg-emerald-950/40"}
              `}
            >
              {drawn.orientation}
            </span>
            <span className="text-xs text-purple-400/60 font-mono">
              {drawn.card.arcana === "Major"
                ? `Major Arcana · ${drawn.card.number}`
                : `${drawn.card.suit} · ${drawn.card.arcana}`}
            </span>
          </div>
        </div>

        {onReset && (
          <button
            onClick={onReset}
            className="shrink-0 p-2 rounded-lg text-purple-400 hover:text-white hover:bg-purple-800/40 transition-colors"
            aria-label="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-800/50 to-transparent mb-4" />

      {/* Meaning */}
      <div className="flex gap-3">
        <BookOpen className="shrink-0 w-4 h-4 text-purple-400 mt-0.5" />
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {drawn.meaning}
        </p>
      </div>

      {/* Both meanings (collapsed) */}
      <details className="mt-4 group">
        <summary className="text-xs text-purple-500/70 hover:text-purple-400 cursor-pointer list-none flex items-center gap-1 select-none transition-colors">
          <X className="w-3 h-3 group-open:rotate-45 transition-transform duration-200" />
          <span className="font-mono tracking-wider uppercase">
            {isReversed ? "See upright meaning" : "See reversed meaning"}
          </span>
        </summary>
        <p className="mt-2 text-slate-400 text-sm leading-relaxed pl-4 border-l border-purple-800/50">
          {isReversed ? drawn.card.upright : drawn.card.reversed}
        </p>
      </details>

      {/* Bottom accent */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </motion.div>
  );

  return <AnimatePresence mode="wait">{inner}</AnimatePresence>;
}
