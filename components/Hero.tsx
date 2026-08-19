"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="relative overflow-hidden">
      <div className="grid-texture pointer-events-none absolute inset-0"></div>

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 lg:px-12 lg:pb-24 lg:pt-20">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] text-faint"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse"></span>
              AVAILABLE FOR FREELANCE &amp; CONTRACT WORK
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-6 font-display font-medium tracking-tight text-ink"
            >
              <span className="block text-[2.5rem] leading-[1.05] sm:text-[3.25rem] lg:text-[3.75rem]">
                Justin Masiga
              </span>
              <span className="mt-2 block text-xl leading-snug text-accent sm:text-2xl lg:text-[1.75rem]">
                Full-Stack Developer &amp; AI Operations Engineer
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted"
            >
              I build reporting dashboards, client tools, and automation pipelines
              so operations teams stop repeating themselves. Remote, based in the
              Philippines.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="mailto:justin.masiga.94@gmail.com"
                className="cursor-pointer rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
              >
                Email me
              </a>
              <button
                onClick={() => scrollToSection("experience")}
                className="cursor-pointer rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
              >
                See experience
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center gap-4 border-t border-line pt-6"
            >
              <p className="cursor-pointer font-mono text-[11px] tracking-[0.1em] text-faint transition-colors hover:text-accent">
                justinmasiga.vercel.app
              </p>
              <span className="text-line">&middot;</span>
              <a
                href="https://www.linkedin.com/in/justinmasiga"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                className="cursor-pointer text-muted transition-colors hover:text-accent"
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
                className="cursor-pointer text-muted transition-colors hover:text-accent"
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

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface lg:aspect-[5/4]"
            >
              <Image
                src="/JustinM.jpg"
                alt="Justin Masiga portrait"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/95 px-3 py-1.5 font-mono text-[11px] text-muted backdrop-blur">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-accent"
                  aria-hidden="true"
                >
                  <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                Davao de Oro, PH
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="col-span-2 grid grid-cols-2 gap-3 rounded-2xl border border-line bg-surface p-4 lg:col-span-1"
            >
              <div>
                <dd className="font-mono text-lg font-medium text-ink">3+ yrs</dd>
                <dd className="mt-1 text-[11px] leading-tight text-faint">
                  Remote dev &amp; support
                </dd>
              </div>
              <div>
                <dd className="font-mono text-lg font-medium text-ink">2018</dd>
                <dd className="mt-1 text-[11px] leading-tight text-faint">
                  B.S. Comp. Science
                </dd>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
