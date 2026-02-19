"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Moon, Sun } from "lucide-react";

const FEATURES = [
  {
    icon: Moon,
    title: "Daily Draw",
    description: "One card. One message. Let the universe speak to you today.",
    href: "/daily-draw",
    cta: "Draw a Card",
  },
  {
    icon: Sun,
    title: "Three-Card Spread",
    description: "Past, Present, Future — a timeless window into the arc of your story.",
    href: "/three-card-spread",
    cta: "Begin Spread",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function LandingPage() {
  return (
    <div className="relative min-h-[calc(100dvh-3.5rem)] flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[120px]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center gap-10 max-w-3xl"
      >
        {/* Logo mark */}
        <motion.div variants={item} className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full border border-purple-500/40 flex items-center justify-center"
          >
            <Sparkles className="w-9 h-9 text-purple-300" />
          </motion.div>
          <p className="text-xs tracking-[0.4em] uppercase text-purple-400/70 font-mono">
            The Oracle Awaits
          </p>
        </motion.div>

        {/* Headline */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-cinzel-decorative)] font-bold text-transparent bg-clip-text bg-gradient-to-b from-purple-200 via-violet-300 to-purple-500 leading-tight">
            Tarot
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            Draw from the ancient deck. Each card a mirror — reflecting truth, possibility, and the hidden currents of your path.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl"
        >
          {FEATURES.map(({ icon: Icon, title, description, href, cta }) => (
            <Link key={href} href={href} className="group block">
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="
                  relative overflow-hidden rounded-2xl p-6 h-full
                  bg-gradient-to-br from-slate-900/80 via-indigo-950/60 to-slate-900/80
                  border border-purple-800/40 hover:border-purple-600/60
                  transition-colors duration-300 text-left
                "
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-purple-500/5" />

                <Icon className="w-6 h-6 text-purple-400 mb-3" />
                <h2 className="text-white font-bold text-lg mb-1">{title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{description}</p>

                <span className="inline-flex items-center gap-1.5 text-purple-400 group-hover:text-purple-300 text-sm font-medium transition-colors">
                  {cta}
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Decorative footer text */}
        <motion.p
          variants={item}
          className="text-[11px] text-purple-600/50 tracking-[0.3em] uppercase font-mono"
        >
          78 cards · Major & Minor Arcana
        </motion.p>
      </motion.div>
    </div>
  );
}
