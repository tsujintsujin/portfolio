"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import DeviceMockup from "@/components/work/DeviceMockup";
import PhoneCarousel from "@/components/work/PhoneCarousel";
import { ArrowUpRight } from "@/components/ui/icons";
import { projects, type Project } from "@/lib/projects";

const shots = projects.map((p) => ({ name: p.name, src: `/work/${p.id}/phone.webp`, alt: `${p.name} on a phone` }));

function linkLabel(p: Project) {
  return p.external ? `Visit ${p.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}` : "Open the live demo";
}

// The written half of a project: problem, what was built, the mockup of the feature that matters.
function Details({ p, priority }: { p: Project; priority?: boolean }) {
  return (
    <article aria-labelledby={`work-${p.id}`}>
      <p className="text-sm text-muted">{p.kind}</p>
      <h3 id={`work-${p.id}`} className="mt-1 text-[clamp(1.6rem,1.2rem+1.2vw,2.25rem)] font-semibold tracking-[-0.025em]">
        {p.name}
      </h3>

      <div className="mt-6">
        <DeviceMockup
          desktop={`/work/${p.id}/mock-desktop.webp`}
          mobile={`/work/${p.id}/mock-mobile.webp`}
          alt={p.feature}
          priority={priority}
        />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-1 min-[1480px]:grid-cols-2">
        <div>
          <h4 className="text-[15px] font-semibold">The problem</h4>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.problem}</p>
        </div>
        <div>
          <h4 className="text-[15px] font-semibold">What I built</h4>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.solution}</p>
        </div>
      </div>
      {p.decision && (
        <div className="mt-6 border-l-2 border-accent/60 pl-4">
          <h4 className="text-[15px] font-semibold">The call that mattered</h4>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.decision}</p>
        </div>
      )}

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
          {p.stack.map((s) => (
            <li key={s} className="rounded-full border border-line/10 px-2.5 py-1 text-xs text-muted">
              {s}
            </li>
          ))}
        </ul>
        <a
          href={p.url}
          {...(p.external ? { target: "_blank", rel: "noopener" } : {})}
          className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-85"
        >
          {linkLabel(p)}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export default function Work() {
  const [index, setIndex] = useState(0);
  const current = projects[index];

  return (
    <section id="work" aria-labelledby="work-title" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <h2 id="work-title" className="text-[clamp(2.25rem,1.6rem+2.4vw,3.75rem)] font-semibold tracking-[-0.035em]">
          Selected work
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Five projects, told the way I&apos;d explain them across a table: what was broken, and what I built to fix it.
        </p>

        {/* Desktop: the phone carousel picks the project, the panel explains it */}
        <div className="mt-16 hidden items-center gap-12 lg:flex lg:flex-col xl:flex-row xl:items-start xl:gap-10">
          <div className="shrink-0 xl:sticky xl:top-28 xl:-ml-8">
            <PhoneCarousel shots={shots} onChange={setIndex} />
          </div>
          <div className="glass w-full min-w-0 flex-1 rounded-[32px] p-8 xl:p-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Details p={current} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Phones and tablets: every project as its own card */}
        <div className="mt-12 flex flex-col gap-6 lg:hidden">
          {projects.map((p, i) => (
            <div key={p.id} className="glass rounded-[28px] p-5 sm:p-8">
              <Details p={p} priority={i === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
