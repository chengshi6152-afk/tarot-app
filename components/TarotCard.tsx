"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { DrawnCard } from "@/lib/tarot-utils";
import CardBack from "@/components/CardBack";

type Props = {
  drawn: DrawnCard | null;
  isRevealed: boolean;
  label?: string;
  className?: string;
};

const CARD_W = "w-44 sm:w-48";
const CARD_H = "h-80 sm:h-[22rem]";

export default function TarotCard({ drawn, isRevealed, label, className = "" }: Props) {
  const isReversed = drawn?.orientation === "Reversed";

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {/* 3-D flip container */}
      <div className={`relative ${CARD_W} ${CARD_H}`} style={{ perspective: "1000px" }}>
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isRevealed ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* ── Card Back ───────────────────────────────────────────────── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl shadow-purple-900/50"
            style={{ backfaceVisibility: "hidden" }}
          >
            <CardBack />
          </div>

          {/* ── Card Front ──────────────────────────────────────────────── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden
              bg-gradient-to-b from-slate-900 to-slate-950
              border border-purple-600/30 shadow-2xl shadow-purple-900/50"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            {/* Artwork */}
            <div
              className="w-full h-4/5 relative overflow-hidden bg-amber-50"
              style={{ transform: isReversed ? "rotate(180deg)" : "none" }}
            >
              {drawn && (
                <Image
                  src={drawn.card.image}
                  alt={drawn.card.name}
                  fill
                  sizes="(max-width: 640px) 176px, 208px"
                  className="object-cover object-top"
                  priority
                />
              )}
            </div>

            {/* Name + orientation strip */}
            {drawn && (
              <div className="px-3 py-2 flex flex-col gap-0.5 bg-gradient-to-b from-slate-900/80 to-slate-950">
                <h3 className="text-center text-white font-bold text-sm leading-tight">
                  {drawn.card.name}
                </h3>
                <p className="text-center text-[10px] font-mono tracking-widest text-purple-300/60 uppercase">
                  {drawn.orientation}
                </p>
              </div>
            )}

            {/* Reversed ribbon */}
            <AnimatePresence>
              {isReversed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute bottom-0 inset-x-0 bg-rose-900/60 text-rose-300
                    text-[9px] text-center py-0.5 tracking-widest uppercase font-mono"
                >
                  Reversed
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Position label */}
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: isRevealed ? 1 : 0.4, y: 0 }}
          className="text-xs tracking-[0.2em] uppercase text-purple-400/80 font-mono"
        >
          {label}
        </motion.p>
      )}
    </div>
  );
}
