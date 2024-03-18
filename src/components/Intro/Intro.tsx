import { LinkButton } from 'components';
import profileDesktop from '../../assets/images/hugo-mendez-profile-photo-large-low-res.webp';
import profileTablet from '../../assets/images/hugo-mendez-profile-photo-medium-low-res.webp';
import profileMobile from '../../assets/images/hugo-mendez-profile-photo-small-low-res.webp';
import styles from './Intro.module.css';

const Intro = () => {
  return (
    <section className={styles.section}>
      <Circle />

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
          height={383}
          fetchPriority='high'
          loading='eager'
          decoding='sync'
          alt='Hugo Méndez profile photo'
        />
      </picture>

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
          path='#contact'
          title='Contact me'
          internal
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
