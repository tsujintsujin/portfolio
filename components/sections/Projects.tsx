"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Project = {
  title: string;
  cta: string;
  kicker: string;
  status: string;
  summary: string;
  highlights?: string[];
  techs: string[];
  href: string;
  external?: boolean;
  image: { src: string; width: number; height: number; alt: string };
};

const externalProps = (external?: boolean) =>
  external ? { target: "_blank" as const, rel: "noopener" } : {};

const projects: Project[] = [
  {
    title: "Retail POS & Back Office",
    cta: "Open the POS",
    kicker: "Own build",
    status: "DEMO AVAILABLE",
    summary:
      "A retail point-of-sale with the back office behind it — the terminal, the returns desk, the cash drawer, and everything that feeds them.",
    highlights: [
      "Build custom reports or pull prebuilt sales, tax, and inventory reports, exportable to CSV and pinnable to a live dashboard.",
      "Access the system from any browser since it's hosted online, with multiple roles including Admin, Manager, Cashier, and a read-only Demo account, each with their own permissions.",
      "Track customers with loyalty points and store credit, grouped into segments, and apply flexible discounts at the product, category, or cart level.",
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
    title: "Surge Freelancing Marketplace",
    cta: "Open Surge",
    kicker: "Pitch rebuild — spec work",
    status: "PITCH",
    summary:
      "A rebuild of the site for a Philippine VA marketplace — a company that trains Filipinos into virtual assistants, certifies them, and places them with clients.",
    highlights: [
      "24 pages: the academy and its 40+ courses, 14 training centres, digital products, the affiliate programme, services, blog and contact.",
      "A running ticker of the 24 services the company actually sells.",
      "Black and gold throughout, drawn from the company's own logo and course artwork.",
    ],
    techs: ["NEXT.JS 16", "REACT 19", "TYPESCRIPT", "TAILWIND"],
    href: "/surge",
    image: {
      src: "/work/surge/home.webp",
      width: 1600,
      height: 812,
      alt: "Surge marketplace homepage — black and gold hero reading 'Freedom and flexibility, trained into a career'",
    },
  },
  {
    title: "wedd.space",
    cta: "Open wedd.space",
    kicker: "Own product — SaaS",
    status: "DEMO AVAILABLE",
    summary:
      "A wedding online presence for couples. Gallery, their story, the schedule, the venues, the photos and RSVP.",
    highlights: [
      "Equipped with Google sign-in ensuring security for your account.",
      "Customizable templates, one click away from publishing your RSVP site.",
      "Equipped with a completeness check before the page goes live.",
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
      alt: "wedd.space marketing page — hero reading 'Save the date. Skip the group chat.' beside a save-the-date card and an RSVP tally",
    },
  },
];

const alsoShipped = [
  {
    title: "Culinary Symphony",
    summary: "Restaurant site — menu, about, and contact.",
    techs: ["NEXT.JS", "TAILWIND", "TYPESCRIPT"],
    status: "DEMO AVAILABLE",
    href: "/culinary-symphony",
    image: {
      src: "/work/culinary-symphony/home.webp",
      alt: "Culinary Symphony restaurant homepage",
    },
  },
];

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
              Built end to end, running now.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            What each one does, and what it holds. Every project below has a
            demo you can walk through.
          </p>
        </motion.div>

        <div className="space-y-16 lg:space-y-24">
          {projects.map((project, idx) => (
            <motion.article
              key={project.href}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12"
            >
              <a
                href={project.href}
                {...externalProps(project.external)}
                aria-label={`Open ${project.title}`}
                className={`focus-ring block cursor-pointer overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-accent-deep/30 hover:shadow-[0_18px_36px_-18px_rgba(242,84,45,0.28)] ${
                  idx % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={project.image.src}
                  width={project.image.width}
                  height={project.image.height}
                  alt={project.image.alt}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-auto w-full"
                />
              </a>

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

                <a
                  href={project.href}
                  {...externalProps(project.external)}
                  className="focus-ring mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-[180ms] ease-out hover:border-accent-deep/50 hover:text-accent-deep"
                >
                  {project.cta}
                  <span aria-hidden="true">{project.external ? "↗" : "→"}</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 border-t border-line pt-10 lg:mt-24">
          <p className="font-body text-[0.8125rem] font-semibold uppercase tracking-[0.02em] text-faint">
            Also shipped
          </p>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {alsoShipped.map((project) => (
              <motion.a
                key={project.href}
                href={project.href}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -6 }}
                className="focus-ring flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow duration-200 hover:border-accent-deep/30 hover:shadow-[0_12px_28px_-14px_rgba(242,84,45,0.18)]"
              >
                <div className="relative h-40 overflow-hidden border-b border-line">
                  <Image
                    src={project.image.src}
                    fill
                    alt={project.image.alt}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-1 flex-col px-5 py-5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                    <h3 className="font-body text-[1.125rem] font-bold leading-[1.25] text-ink">
                      {project.title}
                    </h3>
                    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-accent-deep">
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.875rem] leading-[1.6] text-muted">
                    {project.summary}
                  </p>
                  <p className="mt-auto pt-4 font-mono text-xs tracking-[0.04em] text-faint">
                    {project.techs.join(" · ")}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
