import styles from './projects-test.module.css';

const data = [1, 2, 3, 4];

const SkeletonCard = () => (
  <article
    className={styles.card}
    aria-hidden='true'>
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

const ProjectCardSkeleton = () => data.map((item) => <SkeletonCard key={item} />);

export default ProjectCardSkeleton;
