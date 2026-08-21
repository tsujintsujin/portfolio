"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="relative overflow-hidden">
      <div className="texture-dots pointer-events-none absolute inset-0"></div>
      <div className="hero-atmosphere"></div>

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 lg:px-12 lg:pb-24 lg:pt-20">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-secondary-deep/30 bg-secondary-soft px-3 py-1.5 font-body text-[0.8125rem] font-semibold text-secondary-deep"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-secondary motion-safe:animate-pulse"></span>
              Available for freelance &amp; contract work
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-6 font-display tracking-[-0.02em] text-ink"
            >
              <span className="block text-[clamp(2.75rem,2rem+3.5vw,5.5rem)] font-black leading-[0.95]">
                Justin Masiga
              </span>
              <span className="mt-3 block font-normal italic leading-[1.3] text-accent-deep text-[clamp(1.25rem,1rem+1vw,1.75rem)]">
                Full-Stack Developer &amp; AI Operations Engineer
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-lg font-body text-[1.125rem] leading-[1.65] text-muted"
            >
              I build reporting dashboards, client tools, and automation pipelines
              so operations teams stop repeating themselves. Remote, based in the
              Philippines.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => scrollToSection("contact")}
                className="focus-ring cursor-pointer rounded-full bg-accent-deep px-6 py-3 text-sm font-semibold text-white transition-opacity duration-[180ms] ease-out hover:opacity-90"
              >
                Start a project
              </button>
              <a
                href="mailto:justin.masiga.94@gmail.com"
                className="focus-ring cursor-pointer rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors duration-[180ms] ease-out hover:border-accent-deep/50 hover:text-accent-deep"
              >
                Email directly
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center gap-4 border-t border-line pt-6"
            >
              <a
                href="https://www.linkedin.com/in/justin-m-992772236/"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                className="focus-ring cursor-pointer rounded-full text-muted transition-colors duration-[180ms] ease-out hover:text-accent-deep"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.75h4V23h-4V8.75zM8.5 8.75h3.83v1.95h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V23h-4v-6.36c0-1.52-.03-3.47-2.12-3.47-2.12 0-2.45 1.66-2.45 3.36V23h-4V8.75z" />
                </svg>
              </a>
              <a
                href="https://github.com/tsujintsujin"
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
                className="focus-ring cursor-pointer rounded-full text-muted transition-colors duration-[180ms] ease-out hover:text-accent-deep"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.14c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.08.78 2.18v3.23c0 .3.21.66.79.55A10.51 10.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          <div className="relative grid grid-cols-2 gap-4 lg:grid-cols-1">
            <div className="pointer-events-none absolute -inset-1 col-span-2 -z-10 -rotate-6 rounded-lg border-2 border-dashed border-accent-deep/40 lg:col-span-1"></div>

            <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface lg:aspect-[5/4]">
              <Image
                src="/JustinM.jpg"
                alt="Justin Masiga portrait"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/95 px-3 py-1.5 font-mono text-xs tracking-[0.04em] text-muted backdrop-blur">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-accent-deep"
                  aria-hidden="true"
                >
                  <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                Davao de Oro, PH
              </div>
            </div>

            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-2 grid grid-cols-1 gap-3 rounded-2xl border border-line bg-surface p-4 lg:col-span-1"
            >
              <div className="flex flex-col-reverse">
                <dt className="mt-1 text-[11px] leading-tight text-faint">
                  Remote dev &amp; support
                </dt>
                <dd className="font-mono text-lg font-bold text-ink">3+ yrs</dd>
              </div>
            </motion.dl>
          </div>
        </div>
      </div>
    </section>
  );
}
