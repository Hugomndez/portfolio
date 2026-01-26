import { getProjects } from '@/services/cms/contentful';
import Image from 'next/image';
import { LinkButton } from '../LinkButton';
import styles from './Projects.module.css';

const Projects = async () => {
  const result = await getProjects();

  if (!result.ok) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>Projects</h2>
        <div className={styles.container}>
          {[...Array(6)].map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className={styles.card}
              aria-hidden='true'>
              <div className={styles.overlay}>
                <div className={`${styles.skeletonImage} ${styles.skeleton}`} />
              </div>
              <div className={`${styles.skeletonTitle} ${styles.skeleton}`} />
              <div className={styles.stack}>
                <span className={`${styles.skeletonPill} ${styles.skeleton}`} />
                <span className={`${styles.skeletonPill} ${styles.skeleton}`} />
                <span className={`${styles.skeletonPill} ${styles.skeleton}`} />
              </div>
              <div className={styles.links}>
                <span className={`${styles.skeletonButton} ${styles.skeleton}`} />
                <span className={`${styles.skeletonButton} ${styles.skeleton}`} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const projects = result.data;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.container}>
        {projects.map((p) => (
          <div
            key={p.id}
            className={styles.card}>
            <div className={styles.overlay}>
              <Image
                className={styles.image}
                alt={p.image.title}
                quality='85'
                sizes='(min-width: 1110px) 540px,(min-width: 768px) 50vw, 100vw'
                width={p.image.width}
                height={p.image.height}
                placeholder={p.image.blurDataUrl ? 'blur' : undefined}
                blurDataURL={p.image.blurDataUrl}
                src={p.image.url}
              />
              <div className={styles.overlayLinks}>
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
            </div>
            <h3 className={styles.name}>{p.title}</h3>
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
