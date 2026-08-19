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
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-faint sm:flex-row lg:px-12">
        <p className="font-mono">
          © 2026 Justin Masiga. Full-Stack Developer &amp; AI Operations
          Engineer
        </p>
        <div className="flex gap-6">
          <button
            onClick={() => scrollToSection("about")}
            className="cursor-pointer transition-colors hover:text-ink"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="cursor-pointer transition-colors hover:text-ink"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="cursor-pointer transition-colors hover:text-ink"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="cursor-pointer transition-colors hover:text-ink"
          >
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
}
