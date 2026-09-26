import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | Justin Masiga",
  description: "This page doesn't exist.",
  robots: "noindex, nofollow",
  alternates: { canonical: undefined },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="text-6xl font-semibold tracking-[-0.04em]">404</h1>
      <p className="max-w-sm text-lg text-muted">There&apos;s nothing at this address. The homepage has everything.</p>
      <Link
        href="/"
        className="focus-ring rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-canvas transition-opacity hover:opacity-85"
      >
        Go to the homepage
      </Link>
    </main>
  );
}
