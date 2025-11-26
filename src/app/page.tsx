import { Bar, Contact, Intro, Projects, Skills } from '@/components';

export default function Page() {
  return (
    <>
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
