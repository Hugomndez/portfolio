import { Container } from '@/components/Container';
import { spaceGrotesk } from '@/fonts';
import '@/styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import type { ReactNode } from 'react';

type RootLayoutProps = {
  children: ReactNode;
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  familyName: 'Méndez',
  givenName: 'Hugo',
  worksFor: 'https://blueriver.com/',
  jobTitle: 'Full Stack Developer',
  alumniOf: 'https://www.uady.mx',
  image: 'https://hugomendez.dev/hugo-mendez-profile-photo-large-high-res.jpg',
  gender: 'http://schema.org/Male',
  sameAs: [
    'https://www.linkedin.com/in/hugomndez/',
    'https://www.instagram.com/hugomndez/',
    'https://github.com/Hugomndez',
  ],
};

export const viewport: Viewport = {
  themeColor: '#151515',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  title: 'Hugo Méndez - Full Stack Developer',
  description:
    'Personal developer portfolio showcasing my skills on HTML, CSS, JavaScript, TypeScript, React, NextJS, Web Performance, SEO and more...',
  creator: 'Hugo Méndez',
  metadataBase: new URL('https://hugomendez.dev'),
  alternates: {
    canonical: '/',
  },
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: '/favicon.ico',
  },
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
    emails: 'hello@hugomendez.dev',
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

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang='en'
      dir='ltr'
      data-scroll-behavior='smooth'
      className={spaceGrotesk.className}>
      <body>
        <Container>{children}</Container>
        <Script
          id='schema-json-ld'
          type='application/ld+json'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
        <Script
          id='umami-analytics'
          strategy='afterInteractive'
          src='https://analytics.umami.is/script.js'
          data-website-id='8110a8a7-c042-4ada-8306-ed6b7327a5b7'
          data-domains='hugomendez.dev'
        />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
