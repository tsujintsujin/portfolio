"use client";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 pt-10 lg:px-12">
        <p className="font-display text-2xl italic text-ink/70">
          Let&apos;s build something worth shipping.
        </p>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-faint sm:flex-row lg:px-12">
        <p className="font-mono">
          © 2026 Justin Masiga. Full-Stack Developer &amp; AI Operations
          Engineer
        </p>
        <div className="flex gap-6">
          <button
            onClick={() => scrollToSection("about")}
            className="focus-ring cursor-pointer rounded transition-colors duration-[180ms] ease-out hover:text-accent-deep"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="focus-ring cursor-pointer rounded transition-colors duration-[180ms] ease-out hover:text-accent-deep"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="focus-ring cursor-pointer rounded transition-colors duration-[180ms] ease-out hover:text-accent-deep"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="focus-ring cursor-pointer rounded transition-colors duration-[180ms] ease-out hover:text-accent-deep"
          >
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
}
