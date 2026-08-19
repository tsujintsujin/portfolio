"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Automation Pipeline",
    description: "Full write-up coming soon.",
    techs: ["N8N", "FASTAPI", "SUPABASE"],
    image: "https://picsum.photos/seed/masiga-automation-pipeline/800/500",
    status: "COMING SOON",
  },
  {
    title: "Client Reporting Dashboard",
    description: "Full write-up coming soon.",
    techs: ["NEXT.JS", "QUICKSIGHT", "POSTGRES"],
    image: "https://picsum.photos/seed/masiga-client-dashboard/800/500",
    status: "COMING SOON",
  },
  {
    title: "AI Agent Workflow",
    description: "Full write-up coming soon.",
    techs: ["CREWAI", "LANGGRAPH", "FASTAPI"],
    image: "https://picsum.photos/seed/masiga-ai-agent-workflow/800/500",
    status: "COMING SOON",
  },
];

export default function Projects() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="projects" className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 pb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
              projects.index
            </div>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
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
          className="grid grid-cols-1 gap-5 lg:grid-cols-3"
        >
          {projects.map((project, idx) => (
            <motion.article
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all hover:shadow-[0_8px_24px_-12px_rgba(11,15,23,0.14)] cursor-pointer"
            >
              <div className="relative overflow-hidden h-40 bg-gradient-to-br from-accent/10 to-accent-light/10">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col px-5 py-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-base font-medium text-ink">
                    {project.title}
                  </h3>
                  <span className="shrink-0 rounded-full border border-line bg-bg px-2.5 py-0.5 font-mono text-[10px] tracking-[0.1em] text-faint">
                    {project.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-auto pt-4">
                  <p className="font-mono text-[10px] tracking-[0.1em] text-faint">
                    {project.techs.join(" · ")}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
