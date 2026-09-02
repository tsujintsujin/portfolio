"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    date: "June 2023 - Sept 2026",
    title: "Trade Dynamics - Associate Developer (Remote)",
    status: "COMPLETE",
    items: [
      "Developed client specific financial reports and reporting logic through code-based reporting.",
      "Built and maintain Amazon QuickSight dashboards used directly by clients for business decision-making.",
      "Built the UI for conzuma.tradynamics.com and contributed to a Next.js + NestJS AI-assisted report generator.",
    ],
  },
  {
    date: "Mar 2022 - Aug 2022",
    title: "All About You Skin Clinic (Australia) - General Virtual Assistant",
    status: "COMPLETE",
    items: [
      "Managed 20+ client inquiries daily across email and social media.",
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
      "Daily usage of Adobe Illustrator and Photoshop.",
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
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="experience" className="relative border-t border-line bg-surface">
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
              Where I&apos;ve worked
            </div>
            <h2 className="mt-4 font-display text-[clamp(2rem,1.6rem+1.8vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-ink">
              Real work, not filler.
            </h2>
          </div>
    
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 space-y-5"
        >
          {experiences.map((exp, idx) => (
            <motion.article
              key={idx}
              variants={itemVariants}
              className="grid grid-cols-1 gap-3 rounded-[1.25rem] border border-line border-l-4 border-l-accent-deep bg-bg p-6 sm:grid-cols-[160px_1fr] sm:gap-6"
            >
              <p className="font-mono text-xs tracking-[0.04em] text-faint">
                {exp.date}
              </p>
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-body text-[1.25rem] font-bold leading-[1.25] text-ink">
                    {exp.title}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-body text-[0.6875rem] font-semibold ${
                      exp.status === "ACTIVE"
                        ? "bg-secondary-soft text-secondary-deep"
                        : "bg-bg-alt text-muted"
                    }`}
                  >
                    {exp.status === "ACTIVE" ? "Currently here" : "Wrapped up"}
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5 text-[0.9375rem] leading-[1.65] text-muted">
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
