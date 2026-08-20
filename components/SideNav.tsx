"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function SideNav() {
  const [activeId, setActiveId] = useState("about");
  const [headerOutOfView, setHeaderOutOfView] = useState(false);
  const [pastContact, setPastContact] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    if (!header || !footer) return;

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        setHeaderOutOfView(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    const footerObserver = new IntersectionObserver(
      ([entry]) => setPastContact(entry.isIntersecting),
      { threshold: 0 }
    );

    headerObserver.observe(header);
    footerObserver.observe(footer);
    return () => {
      headerObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

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

  const visible = headerOutOfView && !pastContact;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-label="Section navigation"
          className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 rounded-2xl border border-line bg-surface/90 p-2 shadow-[0_1px_2px_rgba(43,33,24,0.04),0_8px_24px_-12px_rgba(43,33,24,0.12)] backdrop-blur lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              aria-current={activeId === item.id ? "true" : undefined}
              className={`focus-ring flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.02em] transition-colors duration-150 ease-out ${
                activeId === item.id
                  ? "bg-accent-soft text-accent-deep"
                  : "text-muted hover:text-ink"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-150 ease-out ${
                  activeId === item.id ? "bg-accent-deep" : "bg-line"
                }`}
              />
              {item.label}
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
