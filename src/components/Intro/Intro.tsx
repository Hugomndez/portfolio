import Link from 'next/link';
import profileDesktop from '../../assets/images/image-profile-desktop.webp';
import profileMobile from '../../assets/images/image-profile-mobile.webp';
import profileTablet from '../../assets/images/image-profile-tablet.webp';
import styles from './Intro.module.css';

const Intro = () => {
  return (
    <section className={styles.section}>
      <picture>
        <source
          srcSet={profileDesktop.src}
          media='(min-width: 1140px)'
        />
        <source
          srcSet={profileTablet.src}
          media='(min-width: 768px)'
        />
        <img
          className={styles.img}
          src={profileMobile.src}
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
