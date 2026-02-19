"use client";

import { motion } from "framer-motion";
import CardBack from "@/components/CardBack";

type Props = {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
};

// Matches TarotCard dimensions exactly so they feel like the same card
const W = 176; // px — w-44
const H = 320; // px — h-80

// Shadow cards: [ { xOffset, yOffset, dim } ] furthest → nearest
const SHADOW_CARDS = [
  { x: -7, y: 10, dim: 0.18 },
  { x: -4, y:  6, dim: 0.32 },
  { x: -1, y:  3, dim: 0.52 },
];

export default function CardDeck({
  onClick,
  disabled = false,
  label = "Draw a Card",
}: Props) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -6 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className={`
        group relative flex flex-col items-center gap-5
        focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {/* Card stack */}
      <div
        className="relative"
        style={{ width: W, height: H }}
      >
        {/* Ambient glow under the deck — intensifies on hover */}
        <motion.div
          className="absolute inset-x-4 bottom-0 h-12 rounded-full blur-2xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)" }}
          initial={{ opacity: 0.25 }}
          whileHover={{ opacity: disabled ? 0.25 : 0.55 }}
          transition={{ duration: 0.4 }}
        />

        {/* Shadow cards (furthest → nearest, behind the top card) */}
        {SHADOW_CARDS.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              transform: `translateX(${s.x}px) translateY(${s.y}px)`,
              zIndex: i,
            }}
          >
            <CardBack dim={s.dim} />
          </div>
        ))}

        {/* Top card — full brightness, with hover shimmer overlay */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ zIndex: SHADOW_CARDS.length }}
        >
          <CardBack />

          {/* Shimmer on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, transparent 40%, rgba(167,139,250,0.07) 50%, transparent 60%)",
              backgroundSize: "200% 200%",
            }}
            initial={{ backgroundPosition: "200% 200%" }}
            whileHover={{ backgroundPosition: disabled ? "200% 200%" : "-50% -50%" }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>

      {/* Label */}
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-purple-200 font-semibold tracking-wide text-sm sm:text-base
          group-hover:text-white transition-colors duration-200">
          {label}
        </span>
        <span className="text-purple-500/60 text-[10px] tracking-[0.25em] uppercase font-mono">
          {disabled ? "Reading in progress…" : "Click to reveal"}
        </span>
      </div>
    </motion.button>
  );
}
