import styles from './Contact.module.css';

export default function SuccessMessage({ isVisible }: { isVisible: boolean }) {
  return (
    <span
      data-testid={`form-success-message`}
      className={styles.thankYouMessage}
      role={isVisible ? 'alert' : undefined}
      aria-live={isVisible ? 'polite' : undefined}>
      {isVisible ? 'Your message has been successfully sent!' : <>&nbsp;</>}
    </span>
  );
}
