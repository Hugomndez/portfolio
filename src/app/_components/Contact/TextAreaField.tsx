import { TextAreaFieldProps } from 'app/_components/Contact/validationSchema';
import styles from './Contact.module.css';

export default function TextAreaField(Props: TextAreaFieldProps) {
  const { register, id, rows, placeholder, autoComplete, error } = Props;

  return (
    <label htmlFor={id}>
      <textarea
        className={error ? styles.invalidTextArea : ''}
        id={id}
        rows={rows}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(id)}
      />
      <span className={styles.invalidMessage}>{error ? error.message : <>&nbsp;</>}</span>
    </label>
  );
}
