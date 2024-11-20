import Link from 'next/link';
import styles from './LinkButton.module.css';

type LinkButtonProps = {
  path: string;
  title: string;
  internal: boolean;
};

const LinkButton = ({ path, title, internal = true }: LinkButtonProps) => {
  return (
    <Link
      href={path}
      target={internal ? undefined : '_blank'}
      rel={internal ? undefined : 'noreferrer'}
      tabIndex={0}
      className={styles.button}
      data-umami-event='Link button'
      data-umami-event-path={path}
      data-umami-event-title={title}>
      {title}
    </Link>
  );
};

export default LinkButton;
