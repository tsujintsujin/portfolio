"use client";

import { motion } from "framer-motion";

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-4 z-50 mx-4">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-line bg-surface/90 px-5 py-3 shadow-[0_1px_2px_rgba(11,15,23,0.04),0_8px_24px_-12px_rgba(11,15,23,0.12)] backdrop-blur"
      >
        <a href="#" className="font-mono text-sm tracking-[0.15em] text-ink">
          JUSTIN<span className="text-accent">.</span>DEV
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted sm:flex">
          <button
            onClick={() => scrollToSection("about")}
            className="cursor-pointer transition-colors hover:text-ink"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="cursor-pointer transition-colors hover:text-ink"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="cursor-pointer transition-colors hover:text-ink"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="cursor-pointer transition-colors hover:text-ink"
          >
            Contact
          </button>
        </nav>
        <button
          onClick={() => scrollToSection("contact")}
          className="cursor-pointer rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
        >
          Get in touch
        </button>
      </motion.header>
    </div>
  );
}
