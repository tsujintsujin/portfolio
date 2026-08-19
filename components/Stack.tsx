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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
            capabilities.stack
          </div>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
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
              className={`rounded-2xl px-6 py-7 transition-all ${
                cap.highlight
                  ? "border border-accent/30 bg-accent-soft"
                  : "border border-line bg-bg hover:border-accent/30"
              } ${cap.span}`}
            >
              <h3 className="font-display text-lg font-medium text-ink">
                {cap.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
