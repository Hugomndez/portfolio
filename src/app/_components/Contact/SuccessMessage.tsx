import styles from './contact.module.css';

export default function SuccessMessage({ messageShown }: { messageShown: boolean }) {
  return (
    <span className={styles.thankYouMessage}>
      {messageShown ? 'Your message has been successfully sent!' : <>&nbsp;</>}
    </span>
  );
}
