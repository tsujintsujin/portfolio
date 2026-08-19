import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { fraunces, figtree, spaceMono } from "./fonts";
import Toaster from "@/components/Toaster";

export const metadata: Metadata = {
  title: "Justin Masiga | Full-Stack Developer & AI Operations Engineer",
  description:
    "Justin Masiga, full-stack developer and AI operations engineer building dashboards, client tools, and automation pipelines. Based in Davao de Oro, Philippines.",
  robots: "index, follow",
  alternates: { canonical: "https://justinmasiga.vercel.app/" },
  openGraph: {
    type: "website",
    title: "Justin Masiga | Full-Stack Developer & AI Operations Engineer",
    description:
      "Full-stack developer and AI operations engineer building dashboards, client tools, and automation pipelines. Based in Davao de Oro, Philippines.",
    url: "https://justinmasiga.vercel.app/",
  },
  twitter: {
    card: "summary",
    title: "Justin Masiga | Full-Stack Developer & AI Operations Engineer",
    description:
      "Full-stack developer and AI operations engineer building dashboards, client tools, and automation pipelines.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${fraunces.variable} ${figtree.variable} ${spaceMono.variable}`}
    >
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%232B2118'/%3E%3Ctext x='16' y='22' font-family='monospace' font-size='16' font-weight='700' fill='%23F2542D' text-anchor='middle'%3EJ%3C/text%3E%3C/svg%3E"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Justin Masiga",
              jobTitle: "Full-Stack Developer & AI Operations Engineer",
              url: "https://justinmasiga.vercel.app",
              email: "mailto:justin.masiga.94@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressRegion: "Davao de Oro",
                addressCountry: "PH",
              },
              sameAs: [
                "https://github.com/tsujintsujin",
                "https://www.linkedin.com/in/justinmasiga",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-bg text-ink font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
