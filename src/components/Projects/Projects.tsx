import { LinkButton } from 'components';
import Image, { type StaticImageData } from 'next/image';
import mGImg from '../../assets/images/thumbnail-3code-website.webp';
import aGAImg from '../../assets/images/thumbnail-advice-generator-app.webp';
import eLImg from '../../assets/images/thumbnail-batatabit-website.webp';
import aGSImg from '../../assets/images/thumbnail-bv-properties-website.webp';
import dFrImg from '../../assets/images/thumbnail-devfinder-app.webp';
import tWAImg from '../../assets/images/thumbnail-faq-accordion-card.webp';
import dPImg from '../../assets/images/thumbnail-interactive-app.webp';
import eWAImg from '../../assets/images/thumbnail-interactive-rating-component.webp';
import styles from './Projects.module.css';

type Project = {
  name: string;
  thumbnail: { url: StaticImageData; alt: string };
  techStack: string[];
  sourceCodeUrl?: string;
  liveSiteUrl: string;
};

const data: Project[] = [
  {
    name: 'B&V Properties | WebApp',
    thumbnail: {
      url: aGSImg,
      alt: 'B&VProperties Thumbnail',
    },
    techStack: ['nextJS', 'typescript', 'headless CMS'],
    liveSiteUrl: 'https://www.bvpropertiescozumel.com',
  },
  {
    name: '3Code | Website',
    thumbnail: {
      url: mGImg,
      alt: '3Code website Thumbnail',
    },
    techStack: ['html5', 'css3', 'javascript'],
    liveSiteUrl: 'https://3code.us',
  },
  {
    name: 'Batatabit | POC',
    thumbnail: {
      url: eLImg,
      alt: 'Batatabit website thumbnail',
    },
    techStack: ['nextjs', 'typescript', 'css modules'],
    sourceCodeUrl: 'https://github.com/Hugomndez/next-batatabit',
    liveSiteUrl: 'https://next-batatabit.vercel.app',
  },
  {
    name: 'DevFinder',
    thumbnail: {
      url: dFrImg,
      alt: 'DevFinder app thumbnail challenge by frontend mentor.',
    },
    techStack: ['nextjs', 'typescript', 'css modules'],
    sourceCodeUrl: 'https://github.com/Hugomndez/devfinder',
    liveSiteUrl: 'https://devfinder-kohl.vercel.app',
  },
  {
    name: 'Interactive CC Form',
    thumbnail: {
      url: dPImg,
      alt: 'Interactive app thumbnail challenge by frontend mentor.',
    },
    techStack: ['nextjs', 'typescript', 'css modules'],
    sourceCodeUrl: 'https://github.com/Hugomndez/interactive-frontend',
    liveSiteUrl: 'https://interactive-frontend.vercel.app',
  },
  {
    name: 'FAQ Accordion Card ',
    thumbnail: {
      url: tWAImg,
      alt: 'FAQ accordion card app thumbnail challenge by frontend mentor.',
    },
    techStack: ['nextjs', 'typescript', 'css modules'],
    sourceCodeUrl: 'https://github.com/Hugomndez/faq-accordion-card',
    liveSiteUrl: 'https://faq-accordion-card-neon-omega.vercel.app',
  },
  {
    name: 'Rating Card Component ',
    thumbnail: {
      url: eWAImg,
      alt: 'Interactive rating component thumbnail challenge by frontend mentor.',
    },
    techStack: ['nextjs', 'typescript', 'css modules'],
    sourceCodeUrl: 'https://github.com/Hugomndez/interactive-rating-component',
    liveSiteUrl: 'https://interactive-rating-component-jet-alpha.vercel.app',
  },
  {
    name: 'Advice Generator App',
    thumbnail: {
      url: aGAImg,
      alt: 'Advice generator app thumbnail challenge by frontend mentor.',
    },
    techStack: ['html5', 'css3', 'javascript'],
    sourceCodeUrl: 'https://github.com/Hugomndez/advice-generator-app',
    liveSiteUrl: 'https://advice-generator-app-mocha.vercel.app',
  },
];

const Projects = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.container}>
        {data.map((item, idx) => (
          <div
            key={idx}
            className={styles.card}>
            <div className={styles.overlay}>
              <Image
                className={styles.image}
                src={item.thumbnail.url}
                alt={item.thumbnail.alt}
                placeholder='blur'
              />
              <div className={styles.overlayLinks}>
                <LinkButton
                  path={item.liveSiteUrl}
                  title='View Project'
                  internal={false}
                />
                {item.sourceCodeUrl && (
                  <LinkButton
                    path={item.sourceCodeUrl}
                    title='View Code'
                    internal={false}
                  />
                )}
              </div>
            </div>
            <h3 className={styles.name}>{item.name}</h3>
            <div className={styles.stack}>
              {item.techStack.map((t, i) => (
                <p
                  key={i}
                  className={styles.tech}>
                  {t}
                </p>
              ))}
            </div>
            <div className={styles.links}>
              <LinkButton
                path={item.liveSiteUrl}
                title='View Project'
                internal={false}
              />
              {item.sourceCodeUrl && (
                <LinkButton
                  path={item.sourceCodeUrl}
                  title='View Code'
                  internal={false}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
