import Link from 'next/link';
import styles from './LinkButton.module.css';

type LinkButtonProps = {
  path: string;
  title: string;
  internal: boolean;
};
const LinkButton = ({ path, title, internal = true }: LinkButtonProps) => {
  return internal ? (
    <Link
      href={path}
      scroll={false}
      tabIndex={0}
      className={styles.button}>
      {title}
    </Link>
  ) : (
    <a
      href={path}
      target='_blank'
      rel='noreferrer'
      tabIndex={0}
      className={styles.button}>
      {title}
    </a>
  );
};

export default LinkButton;
