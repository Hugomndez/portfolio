import { LinkButton } from '../LinkButton';
import { ProfileImage } from '../ProfileImage';
import styles from './Intro.module.css';

const Intro = () => {
  return (
    <section className={styles.section}>
      <Circle />
      <ProfileImage />
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.spanBlock}>Nice to meet you! </span>
          I&rsquo;m <span className={styles.underline}>Hugo Méndez</span>.
        </h1>
        <p className={styles.subTitle}>
          Based in Mexico, I&rsquo;m a full stack developer with experience in the implementation of
          SEO principles and best practices building high-performance websites.
        </p>
        <LinkButton
          pathname='#contact'
          title='Contact me'
          isInternal
        />
      </div>
    </section>
  );
};

export default Intro;

const Circle = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='129'
      height='129'
      aria-hidden='true'
      className={styles.circle}>
      <circle
        cx='830.5'
        cy='585.5'
        r='64'
        fill='none'
        stroke='#FFF'
        transform='translate(-766 -521)'
      />
    </svg>
  );
};
