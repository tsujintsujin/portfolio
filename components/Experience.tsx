"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    date: "June 2023 - Present",
    title: "Trade Dynamics - Associate Developer (Remote)",
    status: "ACTIVE",
    items: [
      "Develop standardized client form reports and reporting logic through code-based reporting.",
      "Build and maintain Amazon QuickSight dashboards used directly by clients for decision-making.",
      "Built the UI for conzuma.tradynamics.com and contributed to a Next.js + NestJS AI-assisted report generator.",
    ],
  },
  {
    date: "Mar 2022 - Aug 2022",
    title: "All About You Skin Clinic (Australia) - General Virtual Assistant",
    status: "COMPLETE",
    items: [
      "Managed 30+ client inquiries daily across email and social media.",
      "Tracked requests and follow-ups to keep client experience consistent.",
      "Proofread 35+ pages of manuals and SOPs for clarity.",
    ],
  },
  {
    date: "Feb 2021 - Dec 2021",
    title: "Pencil Learning Technologies (Singapore) - Graphic Artist",
    status: "COMPLETE",
    items: [
      "Delivered high-volume design output under strict deadlines and QC.",
      "Coordinated across teams to resolve issues fast and prevent rework.",
    ],
  },
];

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="experience" className="relative border-t border-line bg-surface">
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
              experience.log
            </div>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Real work, not filler.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            The verified record. Project case studies live in the section below
            and fill in as builds ship.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-4"
        >
          {experiences.map((exp, idx) => (
            <motion.article
              key={idx}
              variants={itemVariants}
              className="grid grid-cols-1 gap-4 rounded-2xl border border-line bg-bg p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:border-l-4 sm:border-l-accent"
            >
              <p className="font-mono text-xs text-faint sm:w-28">{exp.date}</p>
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-base font-medium text-ink">
                    {exp.title}
                  </h3>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.1em] ${
                      exp.status === "ACTIVE"
                        ? "border-accent/30 bg-accent-soft text-accent-deep"
                        : "border-line bg-surface text-muted"
                    }`}
                  >
                    {exp.status}
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {exp.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
