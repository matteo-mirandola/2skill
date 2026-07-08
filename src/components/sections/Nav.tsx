"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedLogo } from "./AnimatedLogo";

type NavLink = { label: string; href: string };

const defaultLinks: NavLink[] = [
  { label: "Our approach", href: "#how" },
  { label: "The proof", href: "#proof" },
  { label: "Platform", href: "#platform" },
];

export function Nav({ links = defaultLinks }: { links?: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line/80 bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <AnimatedLogo />

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#book"
          className="group relative inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg transition duration-200 ease-out hover:bg-violet active:scale-[0.97]"
        >
          Send us a message

        </a>
      </nav>
    </motion.header>
  );
}
