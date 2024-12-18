import profileDesktop from 'app/_assets/images/hugo-mendez-profile-photo-large-low-res.webp';
import profileTablet from 'app/_assets/images/hugo-mendez-profile-photo-medium-low-res.webp';
import profileMobile from 'app/_assets/images/hugo-mendez-profile-photo-small-low-res.webp';
import Image, { getImageProps } from 'next/image';
import styles from './profile-image.module.css';

const ProfileImage = () => {
  const common = {
    alt: 'Hugo Méndez profile photo',
  };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: profileDesktop,
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...common,
    src: profileTablet,
  });

  return (
    <picture className={styles.picture}>
      <source
        media='(min-width: 1140px)'
        srcSet={desktop}
      />
      <source
        media='(min-width: 768px)'
        srcSet={tablet}
      />

      <Image
        alt={common.alt}
        className={styles.img}
        placeholder='blur'
        width={174}
        height={383}
        priority
        src={profileMobile}
      />
    </picture>
  );
};

export default ProfileImage;
