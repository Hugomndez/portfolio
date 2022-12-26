import { Contact, Intro, Projects, Skills } from 'components';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta
          name='description'
          content='My developer portfolio.'
        />
        <meta
          name='theme-color'
          content='#151515'
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
      </footer>
    </>
  );
};

export default Home;
