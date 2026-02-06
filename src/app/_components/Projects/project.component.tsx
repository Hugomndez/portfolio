import { Suspense } from 'react';
import styles from './Projects.module.css';
import { ProjectCardSkeleton } from './project-card-skeleton.component';
import ProjectList from './project-list.component';

const Projects = async () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.container}>
        <Suspense fallback={<ProjectCardSkeleton />}>
          <ProjectList />
        </Suspense>
      </div>
    </section>
  );
};

export default Projects;
