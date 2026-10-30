import Script from 'next/script';
import type { Graph, Person, WebSite } from 'schema-dts';

const websiteSchema: WebSite = {
  '@type': 'WebSite',
  '@id': 'https://hugomendez.dev/#website',
  name: 'Hugo Méndez - Full Stack Developer',
  url: 'https://hugomendez.dev',
  description:
    'Personal developer portfolio showcasing my skills on HTML, CSS, JavaScript, TypeScript, React, NextJS, Web Performance, SEO and more...',
  creator: {
    '@id': 'https://hugomendez.dev/#person',
  },
  mainEntity: {
    '@id': 'https://hugomendez.dev/#person',
  },
};

const personSchema: Person = {
  '@type': 'Person',
  '@id': 'https://hugomendez.dev/#person',
  name: 'Hugo Méndez',
  givenName: 'Hugo',
  familyName: 'Méndez',
  gender: 'Male',
  image: 'https://hugomendez.dev/hugo-mendez-profile-photo-large-high-res.jpg',
  knowsLanguage: ['English', 'Spanish'],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Full Stack Developer',
  },
  knowsAbout: [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'React',
    'NextJS',
    'Web Performance',
    'SEO',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cozumel',
    addressRegion: 'Quintana Roo',
    addressCountry: 'MX',
  },
  url: 'https://hugomendez.dev',
  sameAs: [
    'https://hugomendez.dev',
    'https://www.linkedin.com/in/hugomndez/',
    'https://www.instagram.com/hugomndez/',
    'https://github.com/Hugomndez',
  ],
};

const graph: Graph = {
  '@context': 'https://schema.org',
  '@graph': [websiteSchema, personSchema],
};

const serializedGraph = { __html: JSON.stringify(graph) };

const StructuredData = () => (
  <Script
    id="structured-data-json-ld"
    type="application/ld+json"
    strategy="beforeInteractive"
    dangerouslySetInnerHTML={serializedGraph}
  />
);

export default StructuredData;
