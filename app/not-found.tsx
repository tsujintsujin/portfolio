import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Justin Masiga",
  description: "This page doesn't exist.",
  robots: "noindex, nofollow",
  alternates: { canonical: undefined },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-4xl font-black text-ink">404</h1>
      <p className="max-w-sm text-muted">
        This page doesn&apos;t exist. Head back to the homepage.
      </p>
      <Link
        href="/"
        className="focus-ring rounded-full bg-accent-deep px-6 py-3 text-sm font-semibold text-white transition-opacity duration-[180ms] ease-out hover:opacity-90"
      >
        Back to homepage
      </Link>
    </main>
  );
}
