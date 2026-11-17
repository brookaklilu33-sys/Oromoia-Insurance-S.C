import React, { useState } from 'react';

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
  const [loaded, setLoaded] = useState(priority);

  return (
    <picture className={pictureClassName}>
      <img
        src={src}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
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
          priority ? '' : `transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`
        }`}
        {...rest}
      />
    </picture>
  );
};
