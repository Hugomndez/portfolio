import { LinkButton } from 'components';
import Image from 'next/image';
import dPImg from '../../assets/images/thumbnail-project-1-large.webp';
import eLImg from '../../assets/images/thumbnail-project-2-large.webp';
import tWAImg from '../../assets/images/thumbnail-project-3-large.webp';
import eWAImg from '../../assets/images/thumbnail-project-4-large.webp';
import mGImg from '../../assets/images/thumbnail-project-5-large.webp';
import aGSImg from '../../assets/images/thumbnail-project-6-large.webp';
import styles from './Projects.module.css';

interface Project {
  name: string;
  thumbnail: { url: string; width: number; height: number; alt: string };
  techStack: string[];
  sourceUrl: string;
  liveUrl: string;
}

const portfolio: Project[] = [
  {
    name: 'Design Portfolio',
    thumbnail: {
      url: dPImg.src,
      width: dPImg.width,
      height: dPImg.height,
      alt: 'Design Portfolio Thumbnail',
    },
    techStack: ['html', 'css'],
    sourceUrl: '/',
    liveUrl: '/',
  },
  {
    name: 'E-Learning Landing Page',
    thumbnail: {
      url: eLImg.src,
      width: eLImg.width,
      height: eLImg.height,
      alt: 'E-Learning Landing Page Thumbnail',
    },
    techStack: ['html', 'css'],
    sourceUrl: '/',
    liveUrl: '/',
  },
  {
    name: 'Todo Web App',
    thumbnail: {
      url: tWAImg.src,
      width: tWAImg.width,
      height: tWAImg.height,
      alt: 'Todo Web App Thumbnail',
    },
    techStack: ['html', 'css', 'javascript'],
    sourceUrl: '/',
    liveUrl: '/',
  },
  {
    name: 'Entertainment Web App',
    thumbnail: {
      url: eWAImg.src,
      width: eWAImg.width,
      height: eWAImg.height,
      alt: 'Entertainment Web App Thumbnail',
    },
    techStack: ['html', 'css', 'javascript'],
    sourceUrl: '/',
    liveUrl: '/',
  },
  {
    name: 'Memory Game',
    thumbnail: {
      url: mGImg.src,
      width: mGImg.width,
      height: mGImg.height,
      alt: 'Memory Game Thumbnail',
    },
    techStack: ['html', 'css', 'javascript'],
    sourceUrl: '/',
    liveUrl: '/',
  },
  {
    name: 'Art Gallery Showcase',
    thumbnail: {
      url: aGSImg.src,
      width: aGSImg.width,
      height: aGSImg.height,
      alt: 'Art Gallery Showcase Thumbnail',
    },
    techStack: ['html', 'css', 'javascript'],
    sourceUrl: '/',
    liveUrl: '/',
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
                  path={p.liveUrl}
                  title='View Project'
                />
                <LinkButton
                  path={p.sourceUrl}
                  title='View Code'
                />
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
                path={p.liveUrl}
                title='View Project'
              />
              <LinkButton
                path={p.sourceUrl}
                title='View Code'
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
