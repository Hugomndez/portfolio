import { Head, Html, Main, NextScript } from 'next/document';

const schema = `
{
  "@context": "http://schema.org",
  "@type": "Person",
  "familyName": "Méndez",
  "givenName": "Hugo",
  "worksFor": "https://www.nearshoretechnology.com",
  "jobTitle": "Frontend Developer",
  "alumniOf": "https://www.uady.mx",
  "image": "https://hugomendez.dev/hugo-mendez-profile-photo-large-high-res.jpg",
  "gender": "http://schema.org/Male",
  "sameAs": ["https://www.linkedin.com/in/hugomndez/","https://www.instagram.com/hugomndez/","https://github.com/Hugomndez"]
}
`;

export default function Document() {
  return (
    <Html dir='ltr'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: schema }}
        />
      </body>
    </Html>
  );
}
