"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/#impact", label: "Impact" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/#recognition", label: "Recognition" },
  { href: "/#process", label: "How I Work" },
  { href: "/#philosophy", label: "Philosophy" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-seam bg-ink/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="focus-ring group flex items-baseline gap-2 rounded-sm">
          <span className="font-display text-[15px] font-semibold tracking-tight text-paper">
            Tanmay Londhe
          </span>
          <span className="hidden font-label text-[10px] font-semibold uppercase tracking-caps text-mist transition-colors group-hover:text-ember sm:inline">
            Enterprise Automation & AI
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="focus-ring rounded-sm font-label text-[13px] font-semibold text-mist transition-colors hover:text-paper"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="focus-ring rounded-full border border-ember/50 px-4 py-1.5 font-label text-[13px] font-semibold text-ember transition-all hover:bg-ember hover:text-ink"
          >
            Let&apos;s talk
          </Link>
        </nav>

        <button
          className="focus-ring rounded-sm p-2 text-mist md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-seam bg-ink/95 backdrop-blur-md md:hidden"
            aria-label="Mobile"
          >
            <div className="wrap flex flex-col gap-1 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring rounded-sm py-2 font-label text-sm font-semibold text-mist hover:text-paper"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
