import Link from 'next/link';
import styles from './Intro.module.css';

const Intro = () => {
  return (
    <section className={styles.section}>
      <picture>
        <source
          srcSet='/images/image-profile-desktop.webp'
          media='(min-width: 1140px)'
        />
        <source
          srcSet='/images/image-profile-tablet.webp'
          media='(min-width: 768px)'
        />
        <img
          className={styles.img}
          src='/images/image-profile-mobile.webp'
          width={174}
          decoding='async'
          alt='Profile Image'
        />
      </picture>

      <div className={styles.content}>
        <h1 className={styles.title}>
          Nice to meet you! I’m{' '}
          <span className={styles.underline}>Adam Keyes</span>.
        </h1>
        <p className={styles.subTitle}>
          Based in the UK, I’m a front-end developer passionate about building
          accessible web apps that users love.
        </p>
        <Link
          href='/'
          className={styles.button}>
          Contact me
        </Link>
      </div>
    </section>
  );
};

export default Intro;
