import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { reactCompiler: true },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
