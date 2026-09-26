"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Close, Download, Menu } from "@/components/ui/icons";
import { profile } from "@/lib/content";

const NAV = [
  { id: "work", label: "Work" },
  { id: "data", label: "Data" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-3 z-50 px-3 sm:top-4 sm:px-4">
      <header className="glass mx-auto max-w-6xl rounded-[28px] sm:rounded-full">
        <div className="flex items-center justify-between gap-3 py-2 pl-5 pr-2">
          <a href="#top" className="focus-ring rounded-md text-[15px] font-semibold tracking-tight">
            {profile.name}
          </a>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                aria-current={active === n.id ? "true" : undefined}
                className={`focus-ring rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === n.id ? "bg-ink/10 text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <a
              href={profile.cv}
              download
              className="focus-ring hidden items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-85 sm:inline-flex"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="focus-ring grid h-10 w-10 place-items-center rounded-full text-ink md:hidden"
            >
              {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              id="mobile-nav"
              aria-label="Main"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 border-t border-line/10 p-3">
                {NAV.map((n) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="focus-ring rounded-2xl px-4 py-3 text-[15px] text-ink transition-colors hover:bg-ink/5"
                  >
                    {n.label}
                  </a>
                ))}
                <a
                  href={profile.cv}
                  download
                  className="focus-ring mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3 text-[15px] font-medium text-canvas"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
