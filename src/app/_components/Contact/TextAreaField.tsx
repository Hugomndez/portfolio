'use client';

import type { UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';
import styles from './Contact.module.css';
import type { ValidationSchema } from './validation.schema';

export default function TextAreaField(props: UseControllerProps<ValidationSchema>) {
  const { field, fieldState } = useController(props);
  const hasError = !!fieldState.error;
  const errorId = `${field.name}-error`;

  return (
    <label htmlFor={field.name}>
      <textarea
        {...field}
        id={field.name}
        rows={3}
        placeholder={field.name}
        autoComplete='off'
        className={hasError ? styles.invalidTextArea : ''}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        aria-required={true}
        aria-label='Message'
      />
      <span
        id={errorId}
        data-testid={`${field.name}-error`}
        className={styles.invalidMessage}
        role={hasError ? 'alert' : undefined}
        aria-live={hasError ? 'polite' : undefined}
        aria-hidden={hasError ? undefined : true}>
        {hasError ? fieldState.error?.message : <>&nbsp;</>}
      </span>
    </label>
  );
}
