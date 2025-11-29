import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  // -------------------------
  // 🔁 Redirects SEO
  // -------------------------
  async redirects() {
    return [
      {
        source: "/raccomandata/bologna-cmp",
        destination: "/raccomandata/cmp/bologna",
        permanent: true,
      },
      {
        source: "/raccomandata/catania-cmp",
        destination: "/raccomandata/cmp/catania",
        permanent: true,
      },
      {
        source: "/raccomandata/cmp-borromeo",
        destination: "/raccomandata/cmp/borromeo",
        permanent: true,
      },
      {
        source: "/raccomandata/cmp-cagliari",
        destination: "/raccomandata/cmp/cagliari",
        permanent: true,
      },
      {
        source: "/raccomandata/cmp-verona",
        destination: "/raccomandata/cmp/verona",
        permanent: true,
      },
      {
        source: "/raccomandata/market",
        destination: "/raccomandata-market",
        permanent: true,
      },
      {
        source: "/raccomandata/milano-roserio-cmp",
        destination: "/raccomandata/cmp/roserio",
        permanent: true,
      },
      {
        source: "/raccomandata/napoli-cmp",
        destination: "/raccomandata/cmp/napoli",
        permanent: true,
      },
      {
        source: "/raccomandata/roma-cmp",
        destination: "/raccomandata/cmp/roma",
        permanent: true,
      },
      {
        source: "/raccomandata/torino-cmp",
        destination: "/raccomandata/cmp/torino",
        permanent: true,
      },
    ];
  },

  // -------------------------
  //  No index staging
  // -------------------------
  async headers() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "arauze.vercel.app",
          },
        ],
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
