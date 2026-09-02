"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// scrollOffset shifts the centered target up (positive) or down (negative) by px.
// Omit it to just center the section normally.
const NAV_ITEMS = [
  { id: "about", label: "About", scrollOffset: 0 },
  { id: "experience", label: "Experience", scrollOffset: -20 },
  { id: "projects", label: "Projects", scrollOffset: 680 },
  { id: "contact", label: "Contact", scrollOffset: 0 },
];

export default function SideNav() {
  const [activeId, setActiveId] = useState("about");
  const [headerOutOfView, setHeaderOutOfView] = useState(false);
  const [pastContact, setPastContact] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const scrollOffset = NAV_ITEMS.find((item) => item.id === id)?.scrollOffset ?? 0;
    const rect = element.getBoundingClientRect();
    const targetY =
      window.scrollY + rect.top - (window.innerHeight - rect.height) / 2 - scrollOffset;
    window.scrollTo({ top: targetY, behavior: "smooth" });
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
          className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
        >
          <ul className="relative flex flex-col border-l border-line pl-5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`focus-ring group relative flex min-h-10 w-full cursor-pointer items-center py-1 pr-3 text-left font-display text-[0.9375rem] transition-colors duration-200 ease-out ${
                      isActive
                        ? "font-semibold italic text-accent-deep"
                        : "text-faint hover:text-ink"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="sideNavActiveTick"
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        aria-hidden="true"
                        className="absolute -left-5 inset-y-0 my-auto h-5 w-[3px] rounded-full bg-accent-deep"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="absolute -left-5 top-1/2 h-1.5 w-[3px] -translate-y-1/2 rounded-full bg-line transition-all duration-200 ease-out group-hover:h-2.5 group-hover:bg-faint"
                      />
                    )}
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
