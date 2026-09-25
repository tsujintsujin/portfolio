import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/dashboard",
        destination: "https://justinmasiga-dashboard.vercel.app/dashboard",
      },
      {
        source: "/dashboard/:path*",
        destination: "https://justinmasiga-dashboard.vercel.app/dashboard/:path*",
      },
      {
        source: "/culinary-symphony",
        destination: "https://culinary-symphony.vercel.app/culinary-symphony",
      },
      {
        source: "/culinary-symphony/:path*",
        destination: "https://culinary-symphony.vercel.app/culinary-symphony/:path*",
      },
      {
        source: "/justinandjecery",
        destination: "https://justinandjecery.vercel.app/justinandjecery",
      },
      {
        source: "/justinandjecery/:path*",
        destination: "https://justinandjecery.vercel.app/justinandjecery/:path*",
      },
      {
        source: "/pos-system",
        destination: "https://pos-system-ruddy-eight.vercel.app/pos-system",
      },
      {
        source: "/pos-system/:path*",
        destination: "https://pos-system-ruddy-eight.vercel.app/pos-system/:path*",
      },
      {
        source: "/surge",
        destination: "https://surge-tsujintsujins-projects.vercel.app/surge",
      },
      {
        source: "/surge/:path*",
        destination: "https://surge-tsujintsujins-projects.vercel.app/surge/:path*",
      },
      {
        // Aqua pitch build runs on Cloudflare Workers (basePath /aqua), not Vercel.
        source: "/aqua",
        destination: "https://aqua.justin-masiga-94.workers.dev/aqua",
      },
      {
        source: "/aqua/:path*",
        destination: "https://aqua.justin-masiga-94.workers.dev/aqua/:path*",
      },
      {
        // Bates Landscaping remodel pitch (basePath /bates). Everything it loads is same-origin,
        // so the catch-all CSP below covers it.
        source: "/bates",
        destination: "https://bates-landscaping.vercel.app/bates",
      },
      {
        source: "/bates/:path*",
        destination: "https://bates-landscaping.vercel.app/bates/:path*",
      },
    ];
  },
  async headers() {
    const baseHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];
    return [
      {
        // Dashboard proxy needs to reach Supabase (auth + data) directly from the browser.
        source: "/dashboard/:path*",
        headers: [
          ...baseHeaders,
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src 'self' 'unsafe-inline'${
              process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : ""
            }; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://*.supabase.co; frame-ancestors 'none';`,
          },
        ],
      },
      {
        // Product/receipt-logo images are arbitrary admin-entered HTTPS URLs (no fixed
        // host — see pos-system/app/(catalog)/products/[id]/page.tsx), so img-src needs
        // https: broadly, same reasoning as the Dashboard block above.
        source: "/pos-system/:path*",
        headers: [
          ...baseHeaders,
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src 'self' 'unsafe-inline'${
              process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : ""
            }; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';`,
          },
        ],
      },
      {
        // The Surge pitch embeds Google Maps on the contact page and all 14
        // training-centre pages. The catch-all CSP below sets no frame-src, so it
        // falls back to default-src 'self' and those iframes are blocked.
        source: "/surge/:path*",
        headers: [
          ...baseHeaders,
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src 'self' 'unsafe-inline'${
              process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : ""
            }; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-src https://maps.google.com https://www.google.com; frame-ancestors 'none';`,
          },
        ],
      },
      {
        // Aqua: menu photos come from Cloudinary and customer avatars from Google
        // (img-src https:), and Google sign-in loads its script, stylesheet and
        // button iframe from accounts.google.com.
        source: "/aqua/:path*",
        headers: [
          ...baseHeaders,
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' https://accounts.google.com${
              process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : ""
            }; style-src 'self' 'unsafe-inline' https://accounts.google.com; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://accounts.google.com; frame-src https://accounts.google.com; frame-ancestors 'none';`,
          },
        ],
      },
      {
        source: "/((?!dashboard|pos-system|surge|aqua).*)",
        headers: [
          ...baseHeaders,
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src 'self' 'unsafe-inline'${
              process.env.NODE_ENV !== "production" ? " 'unsafe-eval'" : ""
            }; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
