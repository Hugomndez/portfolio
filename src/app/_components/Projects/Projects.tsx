import { getProjects } from '@/services/cms/contentful';
import Image from 'next/image';
import { LinkButton } from '../LinkButton';
import styles from './Projects.module.css';

const Projects = async () => {
  const projects = await getProjects();

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
                placeholder='blur'
                blurDataURL={p.image.blurDataUrl}
                src={p.image.url}
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
