"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    title: "Automation & AI Ops",
    description:
      "Currently building out n8n workflows and AI agent pipelines (CrewAI, LangGraph) for operations teams, backed by FastAPI and Supabase.",
    span: "col-span-1 sm:col-span-2",
    highlight: true,
  },
  {
    title: "Full-Stack Development",
    description:
      "Next.js, TypeScript, Tailwind, NestJS, Laravel, and FastAPI, from interface to database.",
    span: "col-span-1",
  },
  {
    title: "Reporting & Dashboards",
    description:
      "Amazon QuickSight, data validation, and Excel, building dashboards clients actually read.",
    span: "col-span-1",
  },
  {
    title: "Client Support & Operations",
    description:
      "Inquiry resolution, escalation, and status reporting, handled clearly and at scale.",
    span: "col-span-1 sm:col-span-2",
  },
];

export default function Stack() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 font-body text-[0.8125rem] font-semibold uppercase tracking-[0.02em] text-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
            Capabilities
          </div>
          <h2 className="mt-4 font-display text-[clamp(2rem,1.6rem+1.8vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-ink">
            What I actually build.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {capabilities.map((cap, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={`rounded-2xl border px-6 py-7 transition-colors duration-200 ${
                cap.highlight
                  ? "border-accent-deep/25 bg-accent-soft hover:shadow-[0_12px_28px_-14px_rgba(242,84,45,0.18)]"
                  : "border-line bg-bg hover:border-accent-deep/30"
              } ${cap.span}`}
            >
              <h3 className="font-body text-[1.25rem] font-bold leading-[1.25] text-ink">
                {cap.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-[1.65] text-muted">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
