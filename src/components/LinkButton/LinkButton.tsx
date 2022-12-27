import Link from 'next/link';
import styles from './LinkButton.module.css';

type LinkButtonProps = {
  path: string;
  title: string;
};
const LinkButton = ({ path, title }: LinkButtonProps) => {
  return (
    <Link
      href={path}
      tabIndex={0}
      className={styles.button}>
      {title}
    </Link>
  );
};

export default LinkButton;
