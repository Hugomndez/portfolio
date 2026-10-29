'use client';

import env from '@/utils/env/env.client';
import useAutoHide from '@/utils/hooks/use-auto-hide.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { Turnstile } from '@marsidev/react-turnstile';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import initFormValues from './constants';
import contactFormAction from './contact-form.action';
import styles from './contact.module.css';
import FormError from './form-error.component';
import InputField from './input-field.component';
import SuccessMessage from './success-message.component';
import TextAreaField from './text-area-field.component';
import type { ValidationSchema } from './validation.schema';
import { validationSchema } from './validation.schema';

const turnstileOptions = { action: 'submit-form', size: 'invisible', theme: 'dark' } as const;

const Contact = () => {
  const { formState, control, handleSubmit, reset, setError, clearErrors, setValue } =
    useForm<ValidationSchema>({
      defaultValues: initFormValues,
      delayError: 2500,
      mode: 'onChange',
      resolver: zodResolver(validationSchema),
    });

  const ref = useRef<TurnstileInstance | null>(null);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState<boolean>(false);

  useAutoHide({
    isVisible: isSuccessMessageVisible,
    onHide: () => setIsSuccessMessageVisible(false),
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
      setIsSuccessMessageVisible(true);
      clearErrors('root');
    } catch (error) {
      if (error instanceof Error) {
        setError('root', { type: 'api', message: error.message });
      }
    } finally {
      ref.current?.reset();
    }
  }

  function onTurnstileSuccess(token: string) {
    setValue('token', token, {
      shouldValidate: true,
    });
  }

  function onTurnstileExpire() {
    ref.current?.reset();
  }

  function onTurnstileError() {
    setError('root', {
      type: 'token',
      message: 'Captcha verification failed. Please try again.',
    });
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
          options={turnstileOptions}
          onSuccess={onTurnstileSuccess}
          onExpire={onTurnstileExpire}
          onError={onTurnstileError}
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
};

export default Contact;
