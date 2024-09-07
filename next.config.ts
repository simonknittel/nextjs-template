import { type NextConfig } from "next";
import "./src/env";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  cleanDistDir: true,

  poweredByHeader: false,

  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        // TODO: Reenable on prod
        // {
        //   key: "Strict-Transport-Security",
        //   value: "max-age=31536000; includeSubDomains; preload",
        // },
      ],
    },
  ],

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
