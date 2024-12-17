import profileDesktop from 'app/_assets/images/hugo-mendez-profile-photo-large-low-res.webp';
import profileTablet from 'app/_assets/images/hugo-mendez-profile-photo-medium-low-res.webp';
import profileMobile from 'app/_assets/images/hugo-mendez-profile-photo-small-low-res.webp';
import { getImageProps } from 'next/image';
import styles from './profile-image.module.css';

const ProfileImage = () => {
  const common = {
    alt: 'Hugo Méndez profile photo',
    quality: 85,
  };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: profileDesktop.width,
    height: profileDesktop.height,
    src: profileDesktop.src,
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...common,
    width: profileTablet.width,
    height: profileTablet.height,
    src: profileTablet.src,
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    src: profileMobile.src,
    className: styles.img,
    fetchPriority: 'high',
    loading: 'eager',
    width: 174,
    height: 383,
    style: {
      color: 'transparent',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${profileTablet.blurDataURL})`,
    },
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
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...rest} />
    </picture>
  );
};

export default ProfileImage;
