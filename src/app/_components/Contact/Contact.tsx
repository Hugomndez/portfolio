'use client';

import { env } from '@/utils/env/env.client';
import { useAutoHide } from '@/utils/hooks/useAutoHide';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { initFormValues } from './constants';
import { contactFormAction } from './contact-form.action';
import styles from './Contact.module.css';
import FormError from './FormError';
import InputField from './InputField';
import SuccessMessage from './SuccessMessage';
import TextAreaField from './TextAreaField';
import type { ValidationSchema } from './validation.schema';
import { validationSchema } from './validation.schema';

export default function Contact() {
  const { formState, control, handleSubmit, reset, setError, clearErrors, setValue } =
    useForm<ValidationSchema>({
      resolver: zodResolver(validationSchema),
      mode: 'onBlur',
      defaultValues: initFormValues,
    });

  const ref = useRef<TurnstileInstance | null>(null);
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState<boolean>(false);

  useAutoHide({
    isVisible: isSuccessMessageVisible,
    onHide: () => setSuccessMessageVisible(false),
  });

  async function onSubmit(data: ValidationSchema) {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    formData.append('token', data.token);

    try {
      await contactFormAction(formData);

      reset(initFormValues);
      setSuccessMessageVisible(true);
      clearErrors('root');
    } catch (error) {
      if (error instanceof Error) {
        setError('root', { type: 'api', message: error.message });
      }
    } finally {
      ref.current?.reset();
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
        data-testid='contact-form'
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}>
        <Turnstile
          ref={ref}
          siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          options={{ theme: 'dark', action: 'submit-form', size: 'invisible' }}
          onSuccess={(token) => {
            setValue('token', token, {
              shouldValidate: true,
            });
          }}
          onExpire={() => {
            ref.current?.reset();
          }}
          onError={() => {
            setError('root', {
              type: 'token',
              message: 'Captcha verification failed. Please try again.',
            });
          }}
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
        <button
          type='submit'
          disabled={formState.isSubmitting}
          data-umami-event='Submit Contact'>
          {formState.isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        <FormError control={control} />
        <SuccessMessage isVisible={isSuccessMessageVisible} />
      </form>
    </section>
  );
}
