import { Intro } from 'components';
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
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>

      <main>
        <Intro />
      </main>
    </>
  );
};

export default Home;
