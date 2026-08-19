import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Justin Masiga | Full-Stack Developer & AI Operations Engineer",
  description:
    "Justin Masiga, full-stack developer and AI operations engineer building dashboards, client tools, and automation pipelines. Based in Davao de Oro, Philippines.",
  robots: "index, follow",
  canonical: "https://justinmasiga.vercel.app/",
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%230B0F17'/%3E%3Ctext x='16' y='22' font-family='monospace' font-size='16' font-weight='700' fill='%23FF5A1F' text-anchor='middle'%3EJ%3C/text%3E%3C/svg%3E"
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
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
