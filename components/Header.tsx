"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("about");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-4 z-50 mx-4">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl rounded-[1.75rem] border border-line bg-surface/90 shadow-[0_1px_2px_rgba(43,33,24,0.04),0_8px_24px_-12px_rgba(43,33,24,0.12)] backdrop-blur sm:rounded-full"
      >
        <div className="flex items-center justify-between px-5 py-3">
          <a href="#" className="focus-ring rounded-full font-body text-lg font-bold text-ink">
            Justin<span className="text-accent-deep">.</span>
          </a>

          <nav className="hidden items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.02em] sm:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`focus-ring cursor-pointer rounded-full px-2 py-2 transition-colors duration-[180ms] ease-out hover:text-ink ${
                  activeId === item.id ? "font-bold text-ink" : "text-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToSection("contact")}
              className="focus-ring hidden cursor-pointer rounded-full bg-accent-deep px-5 py-3 text-sm font-semibold text-white transition-opacity duration-[180ms] ease-out hover:opacity-90 sm:inline-flex"
            >
              Get in touch
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label="Menu"
              className="focus-ring flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors duration-[180ms] ease-out hover:border-accent-deep/40 sm:hidden"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="overflow-hidden border-t border-line sm:hidden"
            >
              <div className="flex flex-col gap-1 px-3 py-3">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`focus-ring min-h-11 cursor-pointer rounded-xl px-3 py-3 text-left text-[0.8125rem] font-semibold uppercase tracking-[0.02em] transition-colors duration-[180ms] ease-out hover:bg-bg-alt hover:text-ink ${
                      activeId === item.id ? "font-bold text-ink" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection("contact")}
                  className="focus-ring mt-1 min-h-11 cursor-pointer rounded-xl bg-accent-deep px-5 py-3 text-sm font-semibold text-white transition-opacity duration-[180ms] ease-out hover:opacity-90"
                >
                  Get in touch
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
