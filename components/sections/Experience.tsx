import Image from "next/image";
import { education, profile, roles } from "@/lib/content";

// The CV's real figures for the main role. Shown once, where they belong.
const tdFigures = [
  { value: "4", label: "national FMCG and pharma suppliers" },
  { value: "2,000+", label: "retail branches in the biggest feed" },
  { value: "₱5M+", label: "in sales logged a day by that client" },
  { value: "3 yrs", label: "as main report developer for two of them" },
];

export default function Experience() {
  const [main, ...earlier] = roles;

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="experience-title" className="text-[clamp(2.25rem,1.6rem+2.4vw,3.75rem)] font-semibold tracking-[-0.035em]">
            Experience
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{profile.background}</p>
          <p className="mt-8 text-sm text-muted">
            <span className="block font-medium text-ink">{education.degree}</span>
            {education.school}, {education.year}
          </p>
          <Image
            src="/justin-masiga.webp"
            alt="Justin Masiga, sitting on a bench in front of a stone wall"
            width={1200}
            height={1182}
            sizes="(min-width: 1024px) 380px, 90vw"
            className="mt-10 hidden aspect-square w-full max-w-sm rounded-[28px] object-cover ring-1 ring-line/10 lg:block"
          />
        </div>

        <div>
          {/* The role that matters most gets the weight */}
          <article className="glass rounded-[32px] p-6 sm:p-9">
            <p className="tabular text-sm text-muted">
              <time dateTime={main.start}>{main.period.split(" to ")[0]}</time> to{" "}
              <time dateTime={main.end}>{main.period.split(" to ")[1]}</time>
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">{main.title}</h3>
            <p className="text-[15px] text-muted">
              {main.company}, {main.place}
            </p>

            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line/10 py-6 sm:grid-cols-4">
              {tdFigures.map((f) => (
                <div key={f.label}>
                  <dd className="tabular text-[1.75rem] font-semibold leading-none tracking-[-0.03em]">{f.value}</dd>
                  <dt className="mt-2 text-[13px] leading-snug text-muted">{f.label}</dt>
                </div>
              ))}
            </dl>

            <ul className="mt-6 space-y-3.5">
              {main.points.map((p) => (
                <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            {main.seeIt && (
              <a href={main.seeIt.href} className="focus-ring mt-6 inline-block rounded text-[15px] font-medium text-accent-text hover:underline">
                {main.seeIt.label}
              </a>
            )}
          </article>

          {/* Earlier roles: a quieter timeline */}
          <ol className="relative mt-10 space-y-9 border-l border-line/15 pl-7 sm:ml-9">
            {earlier.map((r) => (
              <li key={r.company} className="relative">
                <span className="absolute -left-[33px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-muted" aria-hidden="true" />
                <p className="tabular text-sm text-muted">
                  <time dateTime={r.start}>{r.period.split(" to ")[0]}</time> to{" "}
                  <time dateTime={r.end}>{r.period.split(" to ")[1]}</time>
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-[-0.015em]">
                  {r.title}, <span className="font-normal text-muted">{r.company}</span>
                </h3>
                <p className="text-sm text-muted">{r.place}</p>
                {r.points.map((p) => (
                  <p key={p} className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
                {r.seeIt && (
                  <a href={r.seeIt.href} className="focus-ring mt-2 inline-block rounded text-[15px] font-medium text-accent-text hover:underline">
                    {r.seeIt.label}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
