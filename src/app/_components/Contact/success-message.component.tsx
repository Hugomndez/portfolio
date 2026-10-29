import styles from './contact-test.module.css';

const SuccessMessage = ({ isVisible }: { isVisible: boolean }) => (
  <span
    data-testid='form-success-message'
    className={styles.thankYouMessage}
    role={isVisible ? 'alert' : undefined}
    aria-live={isVisible ? 'polite' : undefined}>
    {isVisible ? 'Your message has been successfully sent!' : <>&nbsp;</>}
  </span>
);

export default SuccessMessage;
