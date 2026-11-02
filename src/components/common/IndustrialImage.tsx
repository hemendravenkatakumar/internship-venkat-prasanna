import React, { useState } from 'react';
import { INDUSTRIAL_FALLBACK_SVG } from '@/config/images';

export interface IndustrialImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  aspectRatio?: 'video' | 'square' | '4/3' | 'wide' | 'auto';
  objectFit?: 'cover' | 'contain';
  caption?: string;
}

export const IndustrialImage: React.FC<IndustrialImageProps> = ({
  src,
  alt = 'VPE Industrial Machinery Service',
  className = '',
  fallbackSrc = INDUSTRIAL_FALLBACK_SVG,
  aspectRatio = 'video',
  objectFit = 'cover',
  caption,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'video':
        return 'aspect-video';
      case 'square':
        return 'aspect-square';
      case '4/3':
        return 'aspect-[4/3]';
      case 'wide':
        return 'aspect-[21/9]';
      case 'auto':
      default:
        return '';
    }
  };

  return (
    <figure className="relative overflow-hidden w-full group">
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setImgSrc(fallbackSrc);
          }
        }}
        className={`w-full ${getAspectClass()} object-${objectFit} transition-transform duration-500 group-hover:scale-105 ${className}`}
        {...props}
      />
      {caption && (
        <figcaption className="text-[10px] text-slate-400 bg-slate-900/90 px-2 py-0.5 absolute bottom-0 inset-x-0 truncate">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
