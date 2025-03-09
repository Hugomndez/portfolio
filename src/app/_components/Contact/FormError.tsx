'use client';

import type { UseFormStateProps } from 'react-hook-form';
import { useFormState } from 'react-hook-form';
import styles from './contact.module.css';
import type { ValidationSchema } from './validation.schema';

export default function FormError({ control }: UseFormStateProps<ValidationSchema>) {
  const { errors } = useFormState({ control });
  return (
    <span className={styles.invalidMessage}>{errors.root ? errors.root.message : <>&nbsp;</>}</span>
  );
}
