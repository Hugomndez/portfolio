import { Bar, Contact, Intro, Projects, Skills } from 'components';
import type { NextPage } from 'next';
import Head from 'next/head';
import Script from 'next/script';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>Frontend Developer - Hugo Méndez.</title>
        <meta
          name='title'
          content='Frontend Developer - Hugo Méndez.'
        />
        <meta
          name='description'
          content='Personal developer portfolio showcasing my skills on HTML, CSS, JavaScript, TypeScript, React, NextJS, Web Performance, SEO and more...'
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:locale'
          content='en_US'
        />
        <meta
          property='og:url'
          content='https://hugomendez.dev'
        />
        <meta
          property='og:title'
          content='Frontend Developer - Hugo Méndez.'
        />
        <meta
          property='og:description'
          content='Personal developer portfolio showcasing my skills on HTML, CSS, JavaScript, TypeScript, React, NextJS, Web Performance, SEO and more...'
        />
        <meta
          property='og:image'
          content='/hugo-mendez-profile-photo-large-high-res.jpg'
        />
        <meta
          property='profile:first_name'
          content='Hugo'
        />
        <meta
          property='profile:last_name'
          content='Méndez'
        />
        <meta
          property='profile:gender'
          content='male'
        />

        {/* <!-- Twitter --> */}
        <meta
          property='twitter:card'
          content='summary_large_image'
        />
        <meta
          property='twitter:url'
          content='https://hugomendez.dev'
        />
        <meta
          property='twitter:title'
          content='Frontend Developer - Hugo Méndez.'
        />
        <meta
          property='twitter:description'
          content='Personal developer portfolio showcasing my skills on HTML, CSS, JavaScript, TypeScript, React, NextJS, Web Performance, SEO and more...'
        />
        <meta
          property='twitter:image'
          content='/hugo-mendez-profile-photo-large-high-res.jpg'
        />
        <meta
          name='theme-color'
          content='#151515'
        />
        <link
          rel='canonical'
          href='https://hugomendez.dev'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <Script
        id='schema'
        strategy='afterInteractive'
        type='application/ld+json'>{`
          {
            "@context": "http://schema.org",
            "@type": "Person",
            "familyName": "Méndez",
            "givenName": "Hugo",
            "worksFor": "https://www.nearshoretechnology.com",
            "jobTitle": "Front-End Developer",
            "alumniOf": "https://www.uady.mx",
            "image": "/hugo-mendez-profile-photo-large-high-res.jpg",
            "gender": "http://schema.org/Male",
            "sameAs": ["https://www.linkedin.com/in/hugomndez/","https://www.instagram.com/hugomndez/","https://github.com/Hugomndez"]
          }
      `}</Script>
      <main>
        <Intro />
        <Skills />
        <Projects />
      </main>
      <footer>
        <Contact />
        <Bar />
      </footer>
    </>
  );
};

export default Home;
