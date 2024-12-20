'use client';

import type { UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';
import styles from './Contact.module.css';
import type { ValidationSchema } from './validationSchema';

export default function TextAreaField(props: UseControllerProps<ValidationSchema>) {
  const { field, fieldState } = useController(props);

  return (
    <label htmlFor={field.name}>
      <textarea
        {...field}
        id={field.name}
        rows={3}
        placeholder={field.name}
        autoComplete='off'
        className={fieldState.error ? styles.invalidTextArea : ''}
      />
      <span className={styles.invalidMessage}>
        {fieldState.error ? fieldState.error.message : <>&nbsp;</>}
      </span>
    </label>
  );
}
