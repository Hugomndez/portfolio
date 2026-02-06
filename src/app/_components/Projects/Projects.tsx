import { getProjects } from '@/services/cms/contentful';
import { ProjectCard } from './ProjectCard';
import { ProjectCardSkeleton } from './ProjectCardSkeleton';
import styles from './Projects.module.css';

const Projects = async () => {
  const result = await getProjects();

  if (!result.ok) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>Projects</h2>
        <div className={styles.container}>
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <ProjectCardSkeleton key={`skeleton-${i}`} />
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
          <ProjectCard
            key={p._id}
            project={p}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
