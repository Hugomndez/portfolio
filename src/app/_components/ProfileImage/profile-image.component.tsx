import profileDesktop from '@/assets/images/hugo-mendez-profile-photo-large-low-res.webp';
import profileTablet from '@/assets/images/hugo-mendez-profile-photo-medium-low-res.webp';
import profileMobile from '@/assets/images/hugo-mendez-profile-photo-small-low-res.webp';
import { getImageProps, type ImageProps } from 'next/image';
import styles from './profile-image.module.css';

const ProfileImage = () => {
  const common: Omit<ImageProps, 'src'> = {
    className: styles.img,
    alt: 'Hugo Méndez - Full-Stack Developer Portfolio Picture',
    quality: 90,
    loading: 'eager',
    fetchPriority: 'high',
    placeholder: 'blur',
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

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 174,
    height: 383,
    overrideSrc: 'hugo-mendez-fullstack-developer-portafolio-profile-photo-small-low-res.webp',
    src: profileMobile,
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

      <source
        media='(min-width: 0px)'
        srcSet={mobile}
      />

      <img {...rest} />
    </picture>
  );
};

export default ProfileImage;
