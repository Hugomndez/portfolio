import { Bar } from '@/components/Bar';
import { Contact } from '@/components/Contact';
import { Intro } from '@/components/Intro';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';

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
