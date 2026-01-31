'use client';

import type { UseFormStateProps } from 'react-hook-form';
import { useFormState } from 'react-hook-form';
import styles from './Contact.module.css';
import type { ValidationSchema } from './validation.schema';

export default function FormError({ control }: UseFormStateProps<ValidationSchema>) {
  const { errors } = useFormState({ control });
  return (
    <span
      data-testid={`form-error-message`}
      className={styles.invalidMessage}
      role={errors.root ? 'alert' : undefined}
      aria-live={errors.root ? 'polite' : undefined}>
      {errors.root ? errors.root.message : <>&nbsp;</>}
    </span>
  );
}
