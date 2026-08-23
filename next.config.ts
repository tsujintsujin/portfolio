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
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
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
