import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './Contact.module.css';

const validationSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(30, 'Name is to long'),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Sorry, invalid format here' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const initValues: ValidationSchema = {
  name: '',
  email: '',
  message: '',
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, errors, isSubmitSuccessful },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    delayError: 2500,
    defaultValues: initValues,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>Contact</h2>
        <p className={styles.text}>
          I would love to hear about your project and how I could help. Please
          fill in the form, and I’ll get back to you as soon as possible.
        </p>
      </div>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='name'>
          <input
            className={errors.name ? styles.invalidInput : ''}
            type='text'
            placeholder='Name'
            {...register('name')}
          />
          <span className={styles.invalidMessage}>
            {errors.name ? errors.name?.message : <>&nbsp;</>}
          </span>
        </label>
        <label htmlFor='email'>
          <input
            className={errors.email ? styles.invalidInput : ''}
            type='email'
            placeholder='Email'
            {...register('email')}
          />
          <span className={styles.invalidMessage}>
            {errors.email ? errors.email?.message : <>&nbsp;</>}
          </span>
        </label>

        <label htmlFor='message'>
          <textarea
            className={errors.message ? styles.invalidInput : ''}
            rows={3}
            placeholder='Message'
            {...register('message')}
          />
          <span className={styles.invalidMessage}>
            {errors.message ? errors.message?.message : <>&nbsp;</>}
          </span>
        </label>

        <button
          type='submit'
          tabIndex={0}
          disabled={!isDirty || !isValid}>
          Send Message
        </button>
      </form>
      <Rings />
    </section>
  );
};

export default Contact;

const Rings = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='530'
      height='129'
      className={styles.rings}>
      <g
        fill='none'
        fillRule='evenodd'
        stroke='#FFF'
        opacity='.25'>
        <ellipse
          cx='265'
          cy='40'
          rx='264.5'
          ry='39.5'
        />
        <ellipse
          cx='265'
          cy='52'
          rx='264.5'
          ry='39.5'
        />
        <ellipse
          cx='265'
          cy='65'
          rx='264.5'
          ry='39.5'
        />
        <ellipse
          cx='265'
          cy='77'
          rx='264.5'
          ry='39.5'
        />
        <ellipse
          cx='265'
          cy='89'
          rx='264.5'
          ry='39.5'
        />
      </g>
    </svg>
  );
};
