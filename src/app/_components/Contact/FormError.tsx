import type { FieldError } from 'react-hook-form';
import styles from './Contact.module.css';

export default function FormError({ error }: { error?: FieldError }) {
  return <span className={styles.invalidMessage}>{error ? error.message : <>&nbsp;</>}</span>;
}
