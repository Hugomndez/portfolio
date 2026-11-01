import type { NextConfig } from 'next';

import './src/utils/env/env.client';
import './src/utils/env/env.server';

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  logging: { fetches: { fullUrl: true, hmrRefreshes: true }, browserToTerminal: true },
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
  turbopack: {
    resolveAlias: {
      '../build/polyfills/polyfill-module': './src/utils/modern-polyfill.js',
      'next/dist/build/polyfills/polyfill-module': './src/utils/modern-polyfill.js',
    },
  },
  experimental: {
    inlineCss: true,
    mcpServer: true,
    turbopackRustReactCompiler: true,
    turbopackGc: true,
    turbopackLazyDynamicImports: true,
    turbopackPluginRuntimeStrategy: 'forceWorkerThreads',
    useTypeScriptCli: true,
  },
};

export default nextConfig;
