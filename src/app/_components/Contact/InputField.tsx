import { InputFieldProps } from 'app/_components/Contact/validationSchema';
import styles from './Contact.module.css';

export default function InputField(Props: InputFieldProps) {
  const { register, id, type, placeholder, autoComplete, error } = Props;

  return (
    <label htmlFor={id}>
      <input
        className={error ? styles.invalidInput : ''}
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(id)}
      />
      <span className={styles.invalidMessage}>{error ? error.message : <>&nbsp;</>}</span>
    </label>
  );
}
