import styles from './Projects.module.css';

export const ProjectCardSkeleton = () => {
  return (
    <article className={styles.card} aria-hidden="true">
      <div className={styles.overlay}>
        <div className={`${styles.skeletonImage} ${styles.skeleton}`} />
      </div>
      <header className={styles.cardHeader}>
        <div className={`${styles.skeletonTitle} ${styles.skeleton}`} />
      </header>
      <ul className={styles.stack}>
        <li className={`${styles.skeletonPill} ${styles.skeleton}`} />
        <li className={`${styles.skeletonPill} ${styles.skeleton}`} />
        <li className={`${styles.skeletonPill} ${styles.skeleton}`} />
      </ul>
      <footer className={styles.cardFooter}>
        <div className={styles.actions}>
          <span className={`${styles.skeletonButton} ${styles.skeleton}`} />
          <span className={`${styles.skeletonButton} ${styles.skeleton}`} />
        </div>
      </footer>
    </article>
  );
};
