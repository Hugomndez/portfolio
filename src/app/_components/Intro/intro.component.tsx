import LinkButton from '../LinkButton/link-button.component';
import ProfileImage from '../ProfileImage/profile-image.component';

import styles from './intro.module.css';

const Circle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="129" height="129" aria-hidden="true" className={styles.circle}>
    <circle cx="830.5" cy="585.5" r="64" fill="none" stroke="#FFF" transform="translate(-766 -521)" />
  </svg>
);

const Intro = () => (
  <section className={styles.section}>
    <Circle />
    <ProfileImage />
    <div className={styles.content}>
      <h1 className={styles.title}>
        <span className={styles.spanBlock}>
          Hi, I&rsquo;m <span className={styles.underline}>Hugo Méndez</span>.
        </span>
        I build and modernize <span className={styles.staticTerms}>websites and web apps.</span>
        <span className={styles.animatedTerms} aria-hidden="true">
          <span>websites.</span>
          <span>web apps.</span>
        </span>
      </h1>
      <p className={styles.subTitle}>
        I help businesses build, improve, and maintain fast, reliable web experiences to reach more people and serve
        customers better.
      </p>
      <div className={styles.actions}>
        <LinkButton pathname="#contact" title="Tell me about your project" isInternal />
        <LinkButton pathname="#projects" title="Explore my work" isInternal />
      </div>
    </div>
  </section>
);

export default Intro;
