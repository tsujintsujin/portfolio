"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Automation Pipeline",
    description: "Full write-up coming soon.",
    techs: ["N8N", "FASTAPI", "SUPABASE"],
    status: "COMING SOON",
    featured: true,
  },
  {
    title: "Client Reporting Dashboard",
    description: "Full write-up coming soon.",
    techs: ["NEXT.JS", "QUICKSIGHT", "POSTGRES"],
    status: "COMING SOON",
  },
  {
    title: "AI Agent Workflow",
    description: "Full write-up coming soon.",
    techs: ["CREWAI", "LANGGRAPH", "FASTAPI"],
    status: "COMING SOON",
  },
];

function ProjectPlaceholder({ tech }: { tech: string }) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(252,229,218,0.7) 0px, rgba(252,229,218,0.7) 14px, rgba(227,243,234,0.6) 14px, rgba(227,243,234,0.6) 28px)",
      }}
    >
      <span className="rounded-full border border-line bg-surface/90 px-3 py-1.5 font-mono text-xs tracking-[0.04em] text-muted backdrop-blur">
        {tech}
      </span>
    </div>
  );
}

export default function Projects() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 pb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 font-body text-[0.8125rem] font-semibold uppercase tracking-[0.02em] text-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
              Projects
            </div>
            <h2 className="mt-4 font-display text-[clamp(2rem,1.6rem+1.8vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-ink">
              Selected work, in progress.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Placeholder slots for builds currently in the pipeline. Real
            write-ups replace these as each project ships.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]"
        >
          <motion.article
            variants={itemVariants}
            whileHover={{ y: -6, rotate: -1 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow duration-200 hover:border-accent-deep/30 hover:shadow-[0_12px_28px_-14px_rgba(242,84,45,0.18)]"
          >
            <div className="relative h-56 overflow-hidden lg:h-72">
              <ProjectPlaceholder tech={featured.techs[0]} />
            </div>
            <div className="flex flex-1 flex-col px-6 py-6">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-body text-[1.5rem] font-bold leading-[1.25] text-ink">
                  {featured.title}
                </h3>
                <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-accent-deep">
                  {featured.status}
                </span>
              </div>
              <p className="mt-2 max-w-lg text-[0.9375rem] leading-[1.65] text-muted">
                {featured.description}
              </p>
              <div className="mt-auto pt-4">
                <p className="font-mono text-xs tracking-[0.04em] text-faint">
                  {featured.techs.join(" · ")}
                </p>
              </div>
            </div>
          </motion.article>

          <div className="grid grid-cols-1 gap-5 lg:grid-rows-2">
            {rest.map((project, idx) => (
              <motion.article
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, rotate: -1 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow duration-200 hover:border-accent-deep/30 hover:shadow-[0_12px_28px_-14px_rgba(242,84,45,0.18)]"
              >
                <div className="relative h-32 overflow-hidden">
                  <ProjectPlaceholder tech={project.techs[0]} />
                </div>
                <div className="flex flex-1 flex-col px-5 py-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-body text-[1.25rem] font-bold leading-[1.25] text-ink">
                      {project.title}
                    </h3>
                    <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-accent-deep">
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-auto pt-4">
                    <p className="font-mono text-xs tracking-[0.04em] text-faint">
                      {project.techs.join(" · ")}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
