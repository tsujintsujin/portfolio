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
        source: "/((?!dashboard|pos-system|surge).*)",
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
