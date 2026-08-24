import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { fraunces, figtree, spaceMono } from "./fonts";
import Toaster from "@/components/Toaster";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://justin94.space"),
  title: "Justin Masiga | Full-Stack Developer & AI Operations Engineer",
  description:
    "Justin Masiga, full-stack developer and AI operations engineer building dashboards, client tools, and automation pipelines. Based in Davao de Oro, Philippines.",
  robots: "index, follow",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Justin Masiga | Full-Stack Developer & AI Operations Engineer",
    description:
      "Full-stack developer and AI operations engineer building dashboards, client tools, and automation pipelines. Based in Davao de Oro, Philippines.",
    url: "/",
    images: ["/JustinM.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Justin Masiga | Full-Stack Developer & AI Operations Engineer",
    description:
      "Full-stack developer and AI operations engineer building dashboards, client tools, and automation pipelines.",
    images: ["/JustinM.jpg"],
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
                  image: "https://justin94.space/JustinM.jpg",
                  email: "mailto:justin.masiga.94@gmail.com",
                  address: {
                    "@type": "PostalAddress",
                    addressRegion: "Davao de Oro",
                    addressCountry: "PH",
                  },
                  sameAs: [
                    "https://github.com/tsujintsujin",
                    "https://www.linkedin.com/in/justin-m-992772236/",
                  ],
                  knowsAbout: [
                    "Full-Stack Web Development",
                    "Next.js",
                    "AI Automation & Operations",
                    "n8n Workflow Automation",
                    "Amazon QuickSight",
                    "Dashboard Engineering",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://justin94.space/#website",
                  url: "https://justin94.space/",
                  name: "Justin Masiga | Full-Stack Developer & AI Operations Engineer",
                  description:
                    "Justin Masiga, full-stack developer and AI operations engineer building dashboards, client tools, and automation pipelines. Based in Davao de Oro, Philippines.",
                  publisher: { "@id": "https://justin94.space/#person" },
                  inLanguage: "en",
                },
                {
                  "@type": "ProfilePage",
                  "@id": "https://justin94.space/#profilepage",
                  url: "https://justin94.space/",
                  name: "Justin Masiga | Full-Stack Developer & AI Operations Engineer",
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
      <body className="bg-bg text-ink font-body antialiased">
        {children}
        <Toaster />
        <CustomCursor />
      </body>
    </html>
  );
}
