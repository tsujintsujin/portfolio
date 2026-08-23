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
        source: "/((?!dashboard).*)",
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
