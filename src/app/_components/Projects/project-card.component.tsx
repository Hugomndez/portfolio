import type { ProjectWithBlur } from '@/services/cms/contentful.types';
import Image from 'next/image';
import { LinkButton } from '../LinkButton';
import styles from './projects-test.module.css';

export type ProjectCardProps = {
  project: ProjectWithBlur;
};

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <article className={styles.card}>
    <div className={styles.overlay}>
      <Image
        className={styles.image}
        alt={project.image.title}
        quality={85}
        sizes='(min-width: 1110px) 540px,(min-width: 768px) 50vw, 100vw'
        width={project.image.width}
        height={project.image.height}
        placeholder={project.image.blurDataUrl}
        fetchPriority='low'
        decoding='async'
        overrideSrc={project.image.fileName}
        src={project.image.url}
      />
    </div>
    <header className={styles.cardHeader}>
      <h3 className={styles.name}>{project.title}</h3>
    </header>
    <ul className={styles.stack}>
      {project.techStack.map((tech) => (
        <li
          key={tech}
          className={styles.tech}>
          {tech}
        </li>
      ))}
    </ul>
    <footer className={styles.cardFooter}>
      <div className={styles.actions}>
        <LinkButton
          href={project.liveSiteUrl}
          title='View Project'
          isInternal={false}
        />
        {project.sourceCodeUrl && (
          <LinkButton
            href={project.sourceCodeUrl}
            title='View Code'
            isInternal={false}
          />
        )}
      </div>
    </footer>
  </article>
);
