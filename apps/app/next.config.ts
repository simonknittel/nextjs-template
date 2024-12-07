import { type NextConfig } from "next";
import "./src/env";
import { env } from "./src/env";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  cleanDistDir: true,

  poweredByHeader: false,

  // eslint-disable-next-line @typescript-eslint/require-await
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
        ...(env.NODE_ENV === "production"
          ? [
              {
                key: "Strict-Transport-Security",
                value: "max-age=31536000; includeSubDomains; preload",
              },
            ]
          : []),
        // TODO: Implement CSP
      ],
    },
  ],

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  output: "standalone",

  images: {
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 60 * 60 * 24 * 31, // cache uploaded images for 31 days
  },
};

export default nextConfig;
