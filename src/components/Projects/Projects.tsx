import { LinkButton } from 'components';
import Image from 'next/image';
import mGImg from '../../assets/images/thumbnail-3code-website.webp';
import eLImg from '../../assets/images/thumbnail-batatabit-website.webp';
import aGSImg from '../../assets/images/thumbnail-bv-properties-website.webp';
import tWAImg from '../../assets/images/thumbnail-faq-accordion-card.webp';
import dPImg from '../../assets/images/thumbnail-interactive-app.webp';
import eWAImg from '../../assets/images/thumbnail-interactive-rating-component.webp';
import styles from './Projects.module.css';

interface Project {
  name: string;
  thumbnail: { url: string; width: number; height: number; alt: string };
  techStack: string[];
  sourceCodeUrl?: string;
  liveSiteUrl: string;
}

const portfolio: Project[] = [
  {
    name: 'Interactive CC Form',
    thumbnail: {
      url: dPImg.src,
      width: dPImg.width,
      height: dPImg.height,
      alt: 'Interactive app thumbnail challenge by frontend mentor.',
    },
    techStack: ['nextjs', 'typescript', 'css modules'],
    sourceCodeUrl: 'https://github.com/Hugomndez/interactive-frontend',
    liveSiteUrl: 'https://interactive-frontend.vercel.app',
  },
  {
    name: 'Batatabit | POC',
    thumbnail: {
      url: eLImg.src,
      width: eLImg.width,
      height: eLImg.height,
      alt: 'Batatabit website thumbnail',
    },
    techStack: ['nextjs', 'typescript', 'css modules'],
    sourceCodeUrl: 'https://github.com/Hugomndez/next-batatabit',
    liveSiteUrl: 'https://next-batatabit.vercel.app',
  },
  {
    name: 'FAQ Accordion Card ',
    thumbnail: {
      url: tWAImg.src,
      width: tWAImg.width,
      height: tWAImg.height,
      alt: 'FAQ accordion card app thumbnail challenge by frontend mentor.',
    },
    techStack: ['nextjs', 'typescript', 'css modules'],
    sourceCodeUrl: 'https://github.com/Hugomndez/faq-accordion-card',
    liveSiteUrl: 'https://faq-accordion-card-neon-omega.vercel.app',
  },
  {
    name: 'Rating Card Component ',
    thumbnail: {
      url: eWAImg.src,
      width: eWAImg.width,
      height: eWAImg.height,
      alt: 'Interactive rating component thumbnail challenge by frontend mentor.',
    },
    techStack: ['nextjs', 'typescript', 'css modules'],
    sourceCodeUrl: 'https://github.com/Hugomndez/interactive-rating-component',
    liveSiteUrl: 'https://interactive-rating-component-jet-alpha.vercel.app',
  },
  {
    name: '3Code | Website',
    thumbnail: {
      url: mGImg.src,
      width: mGImg.width,
      height: mGImg.height,
      alt: '3Code website Thumbnail',
    },
    techStack: ['html5', 'css3', 'javascript'],
    liveSiteUrl: 'https://3code.us',
  },
  {
    name: 'B&VProperties | Website',
    thumbnail: {
      url: aGSImg.src,
      width: aGSImg.width,
      height: aGSImg.height,
      alt: 'B&VProperties Thumbnail',
    },
    techStack: ['Joomla', 'YOOTheme Pro'],
    liveSiteUrl: 'https://www.bvpropertiescozumel.com',
  },
];

const Projects = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.container}>
        {portfolio.map((p, idx) => (
          <div
            key={idx}
            className={styles.card}>
            <div className={styles.overlay}>
              <Image
                className={styles.image}
                src={p.thumbnail.url}
                width={p.thumbnail.width}
                height={p.thumbnail.height}
                alt={p.thumbnail.alt}
              />
              <div className={styles.overlayLinks}>
                <LinkButton
                  path={p.liveSiteUrl}
                  title='View Project'
                  internal={false}
                />
                {p.sourceCodeUrl && (
                  <LinkButton
                    path={p.sourceCodeUrl}
                    title='View Code'
                    internal={false}
                  />
                )}
              </div>
            </div>
            <h3 className={styles.name}>{p.name}</h3>
            <div className={styles.stack}>
              {p.techStack.map((t, i) => (
                <p
                  key={i}
                  className={styles.tech}>
                  {t}
                </p>
              ))}
            </div>
            <div className={styles.links}>
              <LinkButton
                path={p.liveSiteUrl}
                title='View Project'
                internal={false}
              />
              {p.sourceCodeUrl && (
                <LinkButton
                  path={p.sourceCodeUrl}
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
