import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['@arcjet/analyze-wasm', '@arcjet/analyze', 'arcjet'],
  images: {
    remotePatterns: [
      {
        hostname: 'abdullah-lms.t3.storage.dev',
      },
    ],
  },
};

export default nextConfig;
