import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@arcjet/analyze-wasm", "@arcjet/analyze", "arcjet"],
};

export default nextConfig;
