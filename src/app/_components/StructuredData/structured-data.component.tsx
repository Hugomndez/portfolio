import type { Graph, Person, WebSite } from 'schema-dts';
import Script from 'next/script';
import { ogImageUrl, siteConfig } from '@/config/site';
import { socialLinks } from '@/config/social-links';

const websiteSchema: WebSite = {
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  'name': siteConfig.name,
  'url': siteConfig.url,
  'description': siteConfig.description,
  'creator': {
    '@id': `${siteConfig.url}/#person`,
  },
  'mainEntity': {
    '@id': `${siteConfig.url}/#person`,
  },
};

const personSchema: Person = {
  '@type': 'Person',
  '@id': `${siteConfig.url}/#person`,
  'name': siteConfig.author,
  'givenName': 'Hugo',
  'familyName': 'Méndez',
  'gender': 'Male',
  'image': ogImageUrl,
  'knowsLanguage': ['English', 'Spanish'],
  'hasOccupation': {
    '@type': 'Occupation',
    'name': 'Full Stack Developer',
  },
  'knowsAbout': ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'NextJS', 'Web Performance', 'SEO'],
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Cozumel',
    'addressRegion': 'Quintana Roo',
    'addressCountry': 'MX',
  },
  'url': siteConfig.url,
  'sameAs': [siteConfig.url, ...socialLinks.map(({ url }) => url)],
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
