'use client';

import type { UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';
import styles from './Contact.module.css';
import type { ValidationSchema } from './validationSchema';

export default function InputField(props: UseControllerProps<ValidationSchema>) {
  const { field, fieldState } = useController(props);

  return (
    <label htmlFor={field.name}>
      <input
        {...field}
        id={field.name}
        type={field.name === 'email' ? 'email' : 'text'}
        placeholder={field.name}
        autoComplete={field.name}
        className={fieldState.error ? styles.invalidInput : ''}
      />
      <span className={styles.invalidMessage}>
        {fieldState.error ? fieldState.error.message : <>&nbsp;</>}
      </span>
    </label>
  );
}
