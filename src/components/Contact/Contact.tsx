'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm, type FieldError } from 'react-hook-form';
import { RECAPTCHA_KEY, initFormValues } from 'services/constants';
import { validationSchema, type ValidationSchema } from 'types/validationSchema';
import { FormError, InputField, SuccessMessage, TextAreaField } from '../Contact';
import styles from './Contact.module.css';

export default function Contact() {
  const { register, handleSubmit, reset, getValues, setError, clearErrors, formState } =
    useForm<ValidationSchema>({
      resolver: zodResolver(validationSchema),
      mode: 'onChange',
      delayError: 2500,
      defaultValues: initFormValues,
    });

  const { isDirty, isValid, errors, isSubmitting, isSubmitSuccessful } = formState;

  const [isSuccessMessageShown, setSuccessMessageShown] = useState<boolean>(false);

  const reCaptchaRef = useRef<ReCAPTCHA | null>(null);

  const { name, email, message, root } = errors;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(initFormValues);
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (isSuccessMessageShown) {
      timeoutId = setTimeout(() => {
        setSuccessMessageShown(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSuccessMessageShown]);

  async function onSubmit(data: ValidationSchema) {
    const token = await reCaptchaRef.current?.executeAsync();

    if (!token) {
      setError('root', {
        type: 'token',
        message: 'Failed to execute reCaptcha. Please try again.',
      });

      reCaptchaRef.current?.reset();

      return;
    }

    try {
      await submitForm(data, token);

      setSuccessMessageShown(true);
      clearErrors('root');
    } catch (error) {
      if (error instanceof Error) {
        setError('root', { type: 'api', message: error.message });
      }
    } finally {
      reCaptchaRef.current?.reset();
    }
  }

  return (
    <section
      className={styles.section}
      id='contact'>
      <div className={styles.content}>
        <h2 className={styles.title}>Contact</h2>
        <p className={styles.text}>
          I would love to hear about your project and how I could help. Please fill in the form, and
          I’ll get back to you as soon as possible.
        </p>
      </div>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}>
        <ReCAPTCHA
          ref={reCaptchaRef}
          sitekey={RECAPTCHA_KEY}
          size='invisible'
          theme='dark'
        />
        <InputField
          register={register}
          id='name'
          type='text'
          placeholder='Name'
          autoComplete='name'
          error={name}
        />
        <InputField
          register={register}
          id='email'
          type='email'
          placeholder='Email'
          autoComplete='email'
          error={email}
        />
        <TextAreaField
          register={register}
          id='message'
          rows={3}
          placeholder='Your message'
          autoComplete='off'
          error={message}
        />
        <button
          type='submit'
          tabIndex={0}
          disabled={!isDirty || !isValid || isSubmitting}
          data-umami-event='Submit button'
          data-umami-event-name={getValues('name')}
          data-umami-event-email={getValues('email')}
          data-umami-event-message={getValues('message')}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        <FormError error={root as FieldError} />
        <SuccessMessage messageShown={isSuccessMessageShown} />
      </form>
    </section>
  );
}

async function submitForm(data: ValidationSchema, token: string) {
  const response = await fetch('/api', {
    method: 'POST',
    body: JSON.stringify({ ...data, token }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.name || 'An error occurred. Please try again.');
  }
}
