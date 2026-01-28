import type { ProjectWithBlur } from '@/services/cms/contentful.types';
import Image from 'next/image';
import { LinkButton } from '../LinkButton';
import styles from './Projects.module.css';

export type ProjectCardProps = {
  project: ProjectWithBlur;
};

export const ProjectCard = ({ project: p }: ProjectCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.overlay}>
        <Image
          className={styles.image}
          alt={p.image.title}
          quality={85}
          sizes='(min-width: 1110px) 540px,(min-width: 768px) 50vw, 100vw'
          width={p.image.width}
          height={p.image.height}
          placeholder={p.image.blurDataUrl ? 'blur' : undefined}
          blurDataURL={p.image.blurDataUrl}
          src={p.image.url}
        />
      </div>
      <header className={styles.cardHeader}>
        <h3 className={styles.name}>{p.title}</h3>
      </header>
      <ul className={styles.stack}>
        {p.techStack.map((t) => (
          <li
            key={t}
            className={styles.tech}>
            {t}
          </li>
        ))}
      </ul>
      <footer className={styles.cardFooter}>
        <div className={styles.actions}>
          <LinkButton
            href={p.liveSiteUrl}
            title='View Project'
            isInternal={false}
          />
          {p.sourceCodeUrl && (
            <LinkButton
              href={p.sourceCodeUrl}
              title='View Code'
              isInternal={false}
            />
          )}
        </div>
      </footer>
    </article>
  );
};
