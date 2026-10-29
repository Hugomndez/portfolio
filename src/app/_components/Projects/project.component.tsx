import ProjectList from './project-list.component';
import styles from './projects.module.css';

const Projects = () => (
  <section className={styles.section}>
    <h2 className={styles.title}>Projects</h2>
    <div className={styles.container}>
      <ProjectList />
    </div>
  </section>
);

export default Projects;
