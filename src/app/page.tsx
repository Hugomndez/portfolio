import { Bar, Contact, Intro, Projects, Skills } from 'components';
import Script from 'next/script';

export default function Page() {
  return (
    <>
      <Script
        id='umami-analytics'
        src='https://analytics.umami.is/script.js'
        data-website-id='8110a8a7-c042-4ada-8306-ed6b7327a5b7'
        data-domains='hugomendez.dev'
      />
      <header>
        <Intro />
      </header>
      <main>
        <Skills />
        <Projects />
      </main>
      <footer>
        <Contact />
        <Bar />
      </footer>
    </>
  );
}
