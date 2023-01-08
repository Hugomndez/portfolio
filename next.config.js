/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  experimental: { optimizeCss: true },
};

module.exports = nextConfig;
