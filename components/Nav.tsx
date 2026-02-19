"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/daily-draw", label: "Daily Draw" },
  { href: "/three-card-spread", label: "Three-Card Spread" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-purple-900/40 bg-slate-950/70 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span className="font-bold tracking-wider text-sm uppercase">Tarot</span>
        </Link>

        {/* Links */}
        <ul className="flex items-center gap-1">
          {LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm transition-colors
                    ${active
                      ? "bg-purple-900/50 text-purple-200 font-medium"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"}
                  `}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
