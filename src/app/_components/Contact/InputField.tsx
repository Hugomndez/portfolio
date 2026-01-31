'use client';

import type { UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';
import styles from './Contact.module.css';
import type { ValidationSchema } from './validation.schema';

export default function InputField(props: UseControllerProps<ValidationSchema>) {
  const { field, fieldState } = useController(props);
  const hasError = !!fieldState.error;
  const errorId = `${field.name}-error`;
  const ariaLabel = field.name === 'email' ? 'Email address' : 'Name';

  return (
    <label htmlFor={field.name}>
      <input
        {...field}
        id={field.name}
        type={field.name === 'email' ? 'email' : 'text'}
        placeholder={field.name}
        autoComplete={field.name}
        className={hasError ? styles.invalidInput : ''}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        aria-required={true}
        aria-label={ariaLabel}
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
