import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html dir='ltr'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          id='schema'
          strategy='beforeInteractive'
          type='application/ld+json'>{`
          {
            "@context": "http://schema.org",
            "@type": "Person",
            "familyName": "Méndez",
            "givenName": "Hugo",
            "worksFor": "https://www.nearshoretechnology.com",
            "jobTitle": "Front-End Developer",
            "alumniOf": "https://www.uady.mx",
            "image": "https://media-exp1.licdn.com/dms/image/C5603AQHTvSIE1_1XoQ/profile-displayphoto-shrink_800_800/0/1626647152594?e=1642032000&v=beta&t=nkibyRpQZVtuHVBxVQeUO5977CPFKChBmUTXy8vf4EQ",
            "gender": "http://schema.org/Male",
            "sameAs": ["https://www.linkedin.com/in/hugomndez/","https://www.instagram.com/hugomndez/","https://github.com/Hugomndez"]
          }
      `}</Script>
      </body>
    </Html>
  );
}
