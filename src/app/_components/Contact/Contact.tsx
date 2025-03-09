'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { RECAPTCHA_KEY, initFormValues } from './constants';
import { contactFormAction } from './contact-form.action';
import styles from './contact.module.css';
import FormError from './FormError';
import InputField from './InputField';
import SuccessMessage from './SuccessMessage';
import TextAreaField from './TextAreaField';
import type { ValidationSchema } from './validation.schema';
import { validationSchema } from './validation.schema';

export default function Contact() {
  const { control, handleSubmit, reset, getValues, setError, clearErrors, formState } =
    useForm<ValidationSchema>({
      resolver: zodResolver(validationSchema),
      mode: 'onChange',
      delayError: 2500,
      defaultValues: initFormValues,
    });

  const { isDirty, isValid, isSubmitting, isSubmitSuccessful } = formState;

  const [isSuccessMessageShown, setSuccessMessageShown] = useState<boolean>(false);

  const reCaptchaRef = useRef<ReCAPTCHA | null>(null);

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

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    formData.append('token', token);

    try {
      await contactFormAction(formData);

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
          control={control}
          name='name'
        />
        <InputField
          control={control}
          name='email'
        />
        <TextAreaField
          control={control}
          name='message'
        />
        <small>
          This site is protected by reCAPTCHA and the Google{' '}
          <a href='https://policies.google.com/privacy'>Privacy Policy</a> and{' '}
          <a href='https://policies.google.com/terms'>Terms of Service</a> apply.
        </small>
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
        <FormError control={control} />
        <SuccessMessage messageShown={isSuccessMessageShown} />
      </form>
    </section>
  );
}
