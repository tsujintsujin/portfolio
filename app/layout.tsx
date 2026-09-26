import type { Metadata, Viewport } from "next";
import "./globals.css";
import { geist, geistMono } from "./fonts";
import { projects } from "@/lib/projects";

const TITLE = "Justin Masiga | Full-Stack Developer & AI Operations Engineer";
const DESCRIPTION =
  "Full-stack developer and AI operations engineer in the Philippines. Three years building Amazon QuickSight dashboards for national FMCG and pharma suppliers, plus production web apps, AI agents and n8n automation. Available for full-time and contract work.";

export const metadata: Metadata = {
  metadataBase: new URL("https://justin94.space"),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Justin Masiga",
    "full-stack developer Philippines",
    "AI operations engineer",
    "Amazon QuickSight developer",
    "Next.js developer",
    "n8n automation",
    "AI chat agent",
    "remote developer Philippines",
  ],
  authors: [{ name: "Justin Masiga", url: "https://justin94.space" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Justin",
    lastName: "Masiga",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Justin Masiga",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Justin Masiga, full-stack developer and AI operations engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000", // dark is the default theme whatever the OS setting
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Dark is the default; apply a saved "light" choice before first paint so the page never flashes. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://justin94.space/#person",
                  name: "Justin Masiga",
                  jobTitle: "Full-Stack Developer & AI Operations Engineer",
                  url: "https://justin94.space/",
                  image: "https://justin94.space/justin-masiga.webp",
                  email: "mailto:justin.masiga.94@gmail.com",
                  description: DESCRIPTION,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Maco",
                    addressRegion: "Davao de Oro",
                    addressCountry: "PH",
                  },
                  alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "St. Mary's College of Tagum",
                  },
                  hasOccupation: {
                    "@type": "Occupation",
                    name: "Full-Stack Developer and AI Operations Engineer",
                    occupationLocation: { "@type": "Country", name: "Philippines" },
                    skills: "Next.js, React, TypeScript, NestJS, Laravel, Python, Amazon QuickSight, MySQL, Cloudflare Workers, n8n, Claude API, Workers AI",
                  },
                  subjectOf: {
                    "@type": "DigitalDocument",
                    name: "Justin Masiga CV",
                    url: "https://justin94.space/Justin_Masiga_CV.pdf",
                    encodingFormat: "application/pdf",
                  },
                  sameAs: [
                    "https://github.com/tsujintsujin",
                    "https://www.linkedin.com/in/justin-m-992772236/",
                  ],
                  knowsAbout: [
                    "Full-stack web development",
                    "Next.js",
                    "TypeScript",
                    "Business intelligence",
                    "Amazon QuickSight",
                    "MySQL stored procedures",
                    "Sales force automation reporting",
                    "AI agents",
                    "n8n workflow automation",
                    "Cloudflare Workers",
                  ],
                },
                {
                  "@type": "ItemList",
                  "@id": "https://justin94.space/#work",
                  name: "Selected work by Justin Masiga",
                  itemListElement: projects.map((p, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    item: {
                      "@type": "CreativeWork",
                      name: p.name,
                      description: p.solution,
                      url: p.url.startsWith("http") ? p.url : `https://justin94.space${p.url}`,
                      creator: { "@id": "https://justin94.space/#person" },
                    },
                  })),
                },
                {
                  "@type": "WebSite",
                  "@id": "https://justin94.space/#website",
                  url: "https://justin94.space/",
                  name: TITLE,
                  description: DESCRIPTION,
                  publisher: { "@id": "https://justin94.space/#person" },
                  inLanguage: "en",
                },
                {
                  "@type": "ProfilePage",
                  "@id": "https://justin94.space/#profilepage",
                  url: "https://justin94.space/",
                  name: TITLE,
                  isPartOf: { "@id": "https://justin94.space/#website" },
                  mainEntity: { "@id": "https://justin94.space/#person" },
                },
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                var KEY = 'scrollY';
                var isReload = false;
                try {
                  var nav = performance.getEntriesByType('navigation')[0];
                  isReload = nav
                    ? nav.type === 'reload'
                    : !!(performance.navigation && performance.navigation.type === 1);
                } catch (e) {}

                window.addEventListener('load', function() {
                  if (isReload) {
                    var saved = sessionStorage.getItem(KEY);
                    if (saved !== null) {
                      var root = document.documentElement;
                      var prev = root.style.scrollBehavior;
                      root.style.scrollBehavior = 'auto';
                      window.scrollTo(0, parseInt(saved, 10) || 0);
                      root.style.scrollBehavior = prev;
                    }
                  } else {
                    sessionStorage.removeItem(KEY);
                  }
                });
                var save = function() {
                  try { sessionStorage.setItem(KEY, String(window.scrollY)); } catch (e) {}
                };
                window.addEventListener('scroll', save, { passive: true });
                window.addEventListener('pagehide', save);
                window.addEventListener('beforeunload', save);
              } catch (e) {}
            })();`,
          }}
        />
      </head>
      <body>
        <div className="ambient" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
