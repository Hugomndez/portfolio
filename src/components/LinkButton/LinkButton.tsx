import Link from 'next/link';
import styles from './LinkButton.module.css';

type LinkButtonProps = {
  path: string;
  title: string;
  internal: boolean;
};

const LinkButton = ({ path, title, internal = true }: LinkButtonProps) => {
  return internal ? (
    <a
      href={path}
      tabIndex={0}
      className={styles.button}>
      {title}
    </a>
  ) : (
    <Link
      href={path}
      prefetch={false}
      target='_blank'
      rel='noreferrer'
      tabIndex={0}
      className={styles.button}>
      {title}
    </Link>
  );
};

export default LinkButton;
