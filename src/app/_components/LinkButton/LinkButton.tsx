import type { Route } from 'next';
import Link from 'next/link';
import styles from './LinkButton.module.css';

type InternalLinkProps<T extends string> = {
  pathname: Route<T>;
  title: string;
  isInternal: true;
};

type ExternalLinkProps = {
  href: string;
  title: string;
  isInternal: false;
};

type LinkButtonProps<T extends string> = InternalLinkProps<T> | ExternalLinkProps;

const LinkButton = <T extends string>(props: LinkButtonProps<T>) => {
  if (props.isInternal === false) {
    return (
      <a
        href={props.href}
        target='_blank'
        rel='noopener noreferrer'
        className={styles.button}
        data-umami-event='Link button'
        data-umami-event-path={props.href}
        data-umami-event-title={props.title}>
        {props.title}
      </a>
    );
  }

  return (
    <Link
      href={props.pathname}
      className={styles.button}
      data-umami-event='Link button'
      data-umami-event-path={String(props.pathname)}
      data-umami-event-title={props.title}>
      {props.title}
    </Link>
  );
};

export default LinkButton;
