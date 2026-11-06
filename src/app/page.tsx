import Bar from '@/components/Bar/bar.component';
import Contact from '@/components/Contact/contact.component';
import Intro from '@/components/Intro/intro.component';
import Projects from '@/components/Projects/project.component';
import Skills from '@/components/Skills/skills.component';

const Page = () => (
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

export default Page;
