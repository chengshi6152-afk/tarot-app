import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Tarot — The Oracle Awaits",
  description: "Explore the mystical world of tarot with daily draws and three-card spreads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${cinzelDecorative.variable} font-[family-name:var(--font-cinzel)] antialiased`}>
        <Nav />
        <main className="relative z-10 pt-14">
          {children}
        </main>
      </body>
    </html>
  );
}
