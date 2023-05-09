import { Bar, Contact, Intro, Projects, Skills } from 'components';
import { type NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>Hugo Méndez - Frontend Developer.</title>
        <meta
          name='title'
          content='Hugo Méndez - Frontend Developer.'
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
          content='Hugo Méndez - Frontend Developer.'
        />
        <meta
          property='og:description'
          content='Personal developer portfolio showcasing my skills on HTML, CSS, JavaScript, TypeScript, React, NextJS, Web Performance, SEO and more...'
        />
        <meta
          property='og:image'
          content='https://hugomendez.dev/hugo-mendez-profile-photo-large-high-res.jpg'
        />
        <meta
          property='og:image:secure_url'
          content='https://hugomendez.dev/hugo-mendez-profile-photo-large-high-res.jpg'
        />
        <meta
          property='og:image:type'
          content='image/jpeg'
        />
        <meta
          property='og:image:width'
          content='2000'
        />
        <meta
          property='og:image:height'
          content='1335'
        />
        <meta
          property='og:image:alt'
          content='Hugo Méndez profile photo'
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
          content='Hugo Méndez - Frontend Developer.'
        />
        <meta
          property='twitter:description'
          content='Personal developer portfolio showcasing my skills on HTML, CSS, JavaScript, TypeScript, React, NextJS, Web Performance, SEO and more...'
        />
        <meta
          property='twitter:image'
          content='https://hugomendez.dev/hugo-mendez-profile-photo-large-high-res.jpg'
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
