import { skills } from "@/lib/content";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="pb-24 lg:pb-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="glass rounded-[32px] p-6 sm:p-10">
          <h2 id="skills-title" className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
            What I work with
          </h2>
          <dl className="mt-8 divide-y divide-line/10">
            {skills.map((s) => (
              <div key={s.group} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                <dt className="text-[15px] font-medium">{s.group}</dt>
                <dd className="text-[15px] leading-relaxed text-muted">{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
