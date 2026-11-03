import type { Metadata, Viewport } from 'next';

import { ogImageUrl, siteConfig } from './site';

export const siteViewport: Viewport = {
  themeColor: '#151515',
  colorScheme: 'dark',
};

export const siteMetadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  creator: siteConfig.author,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: '/',
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        type: 'image/jpeg',
        width: 2000,
        height: 1335,
        alt: 'Hugo Méndez profile photo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    site: '@hugomendez_dev',
    creator: '@hugomendez_dev',
    images: {
      url: ogImageUrl,
      alt: 'Hugo Méndez profile photo',
    },
  },
};
