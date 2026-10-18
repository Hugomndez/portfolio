import styles from './Projects.module.css';
import ProjectList from './project-list.component';

const Projects = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.container}>
        <ProjectList />
      </div>
    </section>
  );
};

export default Projects;
