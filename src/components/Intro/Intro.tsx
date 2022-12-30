import { LinkButton } from 'components';
import profileDesktop from '../../assets/images/image-profile-desktop.webp';
import profileMobile from '../../assets/images/image-profile-mobile.webp';
import profileTablet from '../../assets/images/image-profile-tablet.webp';
import styles from './Intro.module.css';

const Intro = () => {
  return (
    <section className={styles.section}>
      <Circle />
      <Rings />

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
          decoding='async'
          alt='Profile Image'
        />
      </picture>

      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.spanBlock}>Nice to</span> meet you! I’m{' '}
          <span className={styles.underline}>Adam Keyes</span>.
        </h1>
        <p className={styles.subTitle}>
          Based in the UK, I’m a front-end developer passionate about building
          accessible web apps that users love.
        </p>

        <LinkButton
          path='#contact'
          title='Contact me'
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
