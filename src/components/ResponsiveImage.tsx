import React, { useEffect, useRef, useState } from 'react';

export function getCategoryCoverImage(category?: string, customHeroImage?: string): string {
  if (customHeroImage && customHeroImage.trim().length > 0) {
    return customHeroImage;
  }
  switch (category) {
    case 'non_life':
    case 'motor':
      return '/assets/oic/hero_motor.jpg';
    case 'property':
    case 'engineering':
      return '/assets/oic/hero_engineering.jpg';
    case 'marine':
      return '/assets/oic/hero_marine.jpg';
    case 'life_health':
    case 'personal':
      return '/assets/oic/hero_life.jpg';
    case 'agri_micro':
      return '/assets/oic/cat_agri_micro.jpg';
    case 'halal_takaful':
      return '/assets/oic/cat_takaful.jpg';
    default:
      return '/assets/oic/hero_homepage.png';
  }
}

export function getPosterImageUrl(src: string): string {
  return src || '/assets/oic/hero_homepage.png';
}

export function toWebpAssetPath(src: string): string | null {
  if (!src || !src.startsWith('/assets/oic/')) return null;
  if (/\.(jpe?g|png)(\?.*)?$/i.test(src)) {
    return src.replace(/\.(jpe?g|png)(\?.*)?$/i, '.webp$2');
  }
  return null;
}

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  pictureClassName?: string;
  onFallbackError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = '100vw',
  priority = false,
  className = '',
  pictureClassName = 'block w-full h-full',
  onFallbackError,
  width,
  height,
  ...rest
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(priority);
  const webpSrc = toWebpAssetPath(src);

  useEffect(() => {
    if (priority || imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [src, priority]);

  return (
    <picture className={pictureClassName}>
      {webpSrc && <source type="image/webp" srcSet={webpSrc} sizes={sizes} />}
      <img
        ref={imgRef}
        src={src}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          setLoaded(true);
          if (onFallbackError) {
            onFallbackError(e);
          } else if (e.currentTarget.dataset.origRetried !== '1') {
            e.currentTarget.dataset.origRetried = '1';
            e.currentTarget.src = '/assets/oic/hero_homepage.png';
          }
        }}
        className={`${className} ${
          priority ? '' : `transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`
        }`}
        {...rest}
      />
    </picture>
  );
};
