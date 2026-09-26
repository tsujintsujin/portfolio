import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line/10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © 2026 {profile.name}. {profile.role}.
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="#work" className="focus-ring rounded hover:text-ink">Work</a>
          <a href="#data" className="focus-ring rounded hover:text-ink">Data</a>
          <a href="#experience" className="focus-ring rounded hover:text-ink">Experience</a>
          <a href="#contact" className="focus-ring rounded hover:text-ink">Contact</a>
          <a href={profile.cv} download className="focus-ring rounded hover:text-ink">CV</a>
        </nav>
      </div>
    </footer>
  );
}
