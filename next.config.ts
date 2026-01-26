import type { NextConfig } from 'next';

import './src/utils/env/env.client';
import './src/utils/env/env.server';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
  experimental: { mcpServer: true },
};

export default nextConfig;
