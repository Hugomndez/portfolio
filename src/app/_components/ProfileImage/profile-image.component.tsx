import profileDesktop from '@/assets/images/hugo-mendez-profile-photo-large-low-res.webp';
import profileTablet from '@/assets/images/hugo-mendez-profile-photo-medium-low-res.webp';
import profileMobile from '@/assets/images/hugo-mendez-profile-photo-small-low-res.webp';
import type { ImageProps } from 'next/image';
import { getImageProps } from 'next/image';
import styles from './profile-image.module.css';

const ProfileImage = () => {
  const common = {
    className: styles.img,
    alt: 'Hugo Méndez - Full-Stack Developer Portfolio Picture',
    quality: 90,
    loading: 'eager',
    fetchPriority: 'high',
    placeholder: 'blur',
  } as const satisfies Omit<ImageProps, 'src'>;

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
    props: { srcSet: mobile, alt, ...rest },
  } = getImageProps({
    ...common,
    width: 174,
    height: 314,
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

      <img
        {...rest}
        alt={alt}
      />
    </picture>
  );
};

export default ProfileImage;
