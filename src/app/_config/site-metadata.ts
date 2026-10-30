import type { Metadata, Viewport } from 'next';

export const siteViewport: Viewport = {
  themeColor: '#151515',
  colorScheme: 'dark',
};

export const siteMetadata: Metadata = {
  title: 'Hugo Méndez - Full Stack Developer',
  description:
    'Personal developer portfolio showcasing my skills on HTML, CSS, JavaScript, TypeScript, React, NextJS, Web Performance, SEO and more...',
  creator: 'Hugo Méndez',
  metadataBase: new URL('https://hugomendez.dev'),
  alternates: {
    canonical: '/',
  },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Hugo Méndez - Full Stack Developer',
    description:
      'Personal developer portfolio showcasing my skills on HTML, CSS, JavaScript, TypeScript, React, NextJS, Web Performance, SEO and more...',
    siteName: 'Hugo Méndez - Full Stack Developer',
    images: [
      {
        url: 'https://hugomendez.dev/hugo-mendez-profile-photo-large-high-res.jpg',
        secureUrl: 'https://hugomendez.dev/hugo-mendez-profile-photo-large-high-res.jpg',
        type: 'image/jpeg',
        width: 2000,
        height: 1335,
        alt: 'Hugo Méndez profile photo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hugo Méndez - Full Stack Developer',
    description:
      'Personal developer portfolio showcasing my skills on HTML, CSS, JavaScript, TypeScript, React, NextJS, Web Performance, SEO and more...',
    site: '@hugomendez_dev',
    creator: '@hugomendez_dev',
    images: {
      url: 'https://hugomendez.dev/hugo-mendez-profile-photo-large-high-res.jpg',
      alt: 'Hugo Méndez profile photo',
    },
  },
};
