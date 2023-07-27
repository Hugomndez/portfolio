import { spaceGrotesk } from 'fonts';
import { Metadata } from 'next';
import Script from 'next/script';

import 'styles/globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

const schema = {
  '@context': 'http://schema.org',
  '@type': 'Person',
  familyName: 'Méndez',
  givenName: 'Hugo',
  worksFor: 'https://www.nearshoretechnology.com',
  jobTitle: 'Frontend Developer',
  alumniOf: 'https://www.uady.mx',
  image: 'https://hugomendez.dev/hugo-mendez-profile-photo-large-high-res.jpg',
  gender: 'http://schema.org/Male',
  sameAs: [
    'https://www.linkedin.com/in/hugomndez/',
    'https://www.instagram.com/hugomndez/',
    'https://github.com/Hugomndez',
  ],
};

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Hugo Méndez - Frontend Developer',
  description:
    'Personal developer portfolio showcasing my skills on HTML, CSS, JavaScript, TypeScript, React, NextJS, Web Performance, SEO and more...',
  colorScheme: 'dark',
  themeColor: '#151515',
  creator: 'Hugo Méndez',
  metadataBase: new URL('https://hugomendez.dev'),
  alternates: { canonical: '/', languages: { 'en-US': '/' } },
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hugomendez.dev',
    title: 'Hugo Méndez - Frontend Developer',
    description:
      'Personal developer portfolio showcasing my skills on HTML, CSS, JavaScript, TypeScript, React, NextJS, Web Performance, SEO and more...',
    siteName: 'Hugo Méndez - Frontend Developer',
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
    title: 'Hugo Méndez - Frontend Developer',
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
      lang='en-US'
      dir='ltr'
      className={spaceGrotesk.className}>
      <body>{children}</body>
      <Script
        id='schema-json-ld'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </html>
  );
};

export default RootLayout;
