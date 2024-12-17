import profileDesktop from 'app/_assets/images/hugo-mendez-profile-photo-large-low-res.webp';
import profileTablet from 'app/_assets/images/hugo-mendez-profile-photo-medium-low-res.webp';
import profileMobile from 'app/_assets/images/hugo-mendez-profile-photo-small-low-res.webp';
import Image, { getImageProps } from 'next/image';
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
    placeholder: 'blur',
    blurDataURL: profileDesktop.blurDataURL,
    src: profileDesktop.src,
    width: profileDesktop.width,
    height: profileDesktop.height,
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...common,
    placeholder: 'blur',
    blurDataURL: profileTablet.blurDataURL,
    src: profileTablet.src,
    width: profileTablet.width,
    height: profileTablet.height,
  });
  const {
    props: { alt, srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    className: styles.img,
    placeholder: 'blur',
    blurDataURL: profileMobile.blurDataURL,
    src: profileMobile.src,
    width: 174,
    height: 383,
    fetchPriority: 'high',
    loading: 'eager',
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
      <Image
        {...rest}
        alt={alt}
      />
    </picture>
  );
};

export default ProfileImage;
