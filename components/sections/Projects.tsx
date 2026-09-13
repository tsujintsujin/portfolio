"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Project = {
  title: string;
  cta?: string;
  kicker: string;
  status: string;
  summary: string;
  highlights?: string[];
  clients?: { name: string; href: string }[];
  techs: string[];
  href?: string;
  external?: boolean;
  image: { src: string; width: number; height: number; alt: string };
};

const externalProps = (external?: boolean) =>
  external ? { target: "_blank" as const, rel: "noopener" } : {};

const projects: Project[] = [
  {
    title: "Retail POS & Back Office",
    cta: "Open the POS",
    kicker: "Personal build",
    status: "DEMO",
    summary:
      "A retail point-of-sale with the back office and reporting system built in Next.js, Prisma, and Postgres. Designed for small retail businesses to manage sales, inventory, and customer loyalty.",
    highlights: [
      "Capable of building custom reports or pull prebuilt sales, tax, and inventory reports, exportable to CSV and pinnable to a live dashboard.",
      "Access the system from any browser, with multiple roles including Admin, Manager, Cashier, each with their own permissions.",
    ],
    techs: ["NEXT.JS 16", "PRISMA 7", "POSTGRES", "TYPESCRIPT", "TAILWIND"],
    href: "/pos-system",
    image: {
      src: "/work/pos-system/dashboard.webp",
      width: 1600,
      height: 804,
      alt: "POS back-office dashboard showing sales totals and a revenue-versus-previous-period chart",
    },
  },
  {
    title: "TheJobStash",
    cta: "Open TheJobStash",
    kicker: "Own product - SaaS",
    status: "LIVE",
    summary:
      "Upload your resume and we look for jobs that actually match your skills, experience, and location. We show you the jobs you qualify for, and the ones you almost qualify for, with exactly what blocked each one.",
    highlights: [
      "Pulls thousands of listings from 10+ sources and counting.",
      "Runs on n8n automation, with a custom Next.js front-end and a Cloudflare Worker for the API.",
      "Credit based with google sign-in, so you can save your searches and get notified when new jobs are found.",
    ],
    techs: ["NEXT.JS", "CLOUDFLARE WORKERS", "D1", "PYTHON", "TYPESCRIPT"],
    href: "https://thejobstash.com",
    external: true,
    image: {
      src: "/work/thejobstash/home.webp",
      width: 1600,
      height: 805,
      alt: "TheJobStash homepage - jobs that actually match your resume",
    },
  },
  {
    title: "Surge Freelancing Marketplace",
    cta: "Open Surge",
    kicker: "Pitch rebuild - spec work",
    status: "PITCH",
    summary:
      "A rebuild of the site for a Philippine VA marketplace - a company that trains Filipinos into virtual assistants, certifies them, and places them with clients.",
    highlights: [
      "24 pages: the academy and its 40+ courses, 14 training centres, digital products, the affiliate programme, services, blog and contact.",
    ],
    techs: ["NEXT.JS 16", "REACT 19", "TYPESCRIPT", "TAILWIND"],
    href: "/surge",
    image: {
      src: "/work/surge/home.webp",
      width: 1600,
      height: 812,
      alt: "Surge marketplace homepage - black and gold hero reading 'Freedom and flexibility, trained into a career'",
    },
  },
  {
    title: "Aqua Beauty Salon Centre",
    kicker: "Pitch build - spec work",
    status: "PITCH",
    summary:
      "A website with a working booking engine for a Tagum City salon.",
    highlights: [
      "Five-step booking: pick services, a specialist, a date and a time, with a live timeline of what time slot are still open.",
      "Reservation confirmation and reminders sent via email and SMS.",
      "A front desk console with a schedule board, bookings export, insights, clients, team hours and the full menu.",
    ],
    techs: ["NEXT.JS 15", "REACT 19", "PRISMA", "TYPESCRIPT", "TAILWIND"],
    image: {
      src: "/work/aqua/home.webp",
      width: 1600,
      height: 805,
      alt: "Aqua Beauty Salon Centre homepage",
    },
  },
  {
    title: "wedd.space",
    cta: "Open wedd.space",
    kicker: "Own product",
    status: "LIVE",
    summary:
      "A online wedding presence for couples. Gallery, their story, the schedule, the venues, the photos and RSVP.",
    clients: [
      {
        name: "Leisther & Cristine",
        href: "https://www.wedd.space/leisthercristine",
      },
    ],
    highlights: [
      "Sites are custom built upon order.",
    ],
    techs: [
      "NEXT.JS 16",
      "REACT 19",
      "SUPABASE",
      "TYPESCRIPT",
      "TAILWIND",
      "CLOUDINARY",
    ],
    href: "https://wedd.space",
    external: true,
    image: {
      src: "/work/wedd-space/home.webp",
      width: 1600,
      height: 805,
      alt: "wedd.space marketing page - hero reading 'Save the date. Skip the group chat.' beside a save-the-date card and an RSVP tally",
    },
  },
];

function ProjectImage({ image }: { image: Project["image"] }) {
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      sizes="(min-width: 1024px) 45vw, 100vw"
      className="h-auto w-full"
    />
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 pb-12 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 font-body text-[0.8125rem] font-semibold uppercase tracking-[0.02em] text-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
              Projects
            </div>
            <h2 className="mt-4 font-display text-[clamp(2rem,1.6rem+1.8vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-ink">
              Built end to end.
            </h2>
          </div>
        </motion.div>

        <div className="space-y-16 lg:space-y-24">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12"
            >
              {project.href ? (
                <a
                  href={project.href}
                  {...externalProps(project.external)}
                  aria-label={`Open ${project.title}`}
                  className={`focus-ring block cursor-pointer overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-accent-deep/30 hover:shadow-[0_18px_36px_-18px_rgba(242,84,45,0.28)] ${
                    idx % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <ProjectImage image={project.image} />
                </a>
              ) : (
                <div
                  className={`overflow-hidden rounded-2xl border border-line bg-surface ${
                    idx % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <ProjectImage image={project.image} />
                </div>
              )}

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-accent-deep">
                    {project.status}
                  </span>
                  <span className="font-mono text-xs tracking-[0.04em] text-faint">
                    {project.kicker}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-semibold leading-[1.15] tracking-[-0.01em] text-ink">
                  {project.title}
                </h3>

                <p className="mt-3 text-[0.9375rem] leading-[1.65] text-muted">
                  {project.summary}
                </p>

                {project.clients && (
                  <p className="mt-2 text-[0.9375rem] leading-[1.65] text-muted">
                    Clients:{" "}
                    {project.clients.map((client, i) => (
                      <span key={client.href}>
                        {i > 0 && ", "}
                        <a
                          href={client.href}
                          target="_blank"
                          rel="noopener"
                          className="focus-ring font-medium text-accent-deep underline underline-offset-2 hover:text-ink"
                        >
                          {client.name}
                        </a>
                      </span>
                    ))}
                  </p>
                )}

                {project.highlights && (
                  <ul className="mt-5 space-y-2.5 border-l-2 border-line pl-5 text-[0.875rem] leading-[1.55] text-muted">
                    {project.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                )}

                <p className="mt-6 font-mono text-xs tracking-[0.04em] text-faint">
                  {project.techs.join(" · ")}
                </p>

                {project.href && (
                  <a
                    href={project.href}
                    {...externalProps(project.external)}
                    className="focus-ring mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-[180ms] ease-out hover:border-accent-deep/50 hover:text-accent-deep"
                  >
                    {project.cta}
                    <span aria-hidden="true">{project.external ? "↗" : "→"}</span>
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
