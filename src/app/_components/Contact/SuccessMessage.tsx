import styles from './Contact.module.css';

export default function SuccessMessage({ messageShown }: { messageShown: boolean }) {
  return (
    <span
      className={styles.thankYouMessage}
      role={messageShown ? 'alert' : undefined}
      aria-live={messageShown ? 'polite' : undefined}>
      {messageShown ? 'Your message has been successfully sent!' : <>&nbsp;</>}
    </span>
  );
}
