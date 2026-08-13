import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@arcjet/analyze-wasm", "@arcjet/analyze", "arcjet"],
  images: {
    remotePatterns: [
      {
        hostname: "abdullah-lms-2.t3.storage.dev",
      },
    ],
  },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
