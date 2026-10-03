import { FC } from 'react';
import { Star } from 'lucide-react';

export interface RatingDisplayProps {
  rating: number; // 1 to 5
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumeric?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

/**
 * RatingDisplay — Reusable component for displaying 1 to 5 star ratings.
 * Accessible with proper ARIA labels and SVG star representations.
 */
export const RatingDisplay: FC<RatingDisplayProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumeric = false,
  className = '',
}) => {
  const safeRating = Math.max(1, Math.min(maxRating, Math.round(rating)));

  return (
    <div
      role="img"
      aria-label={`Rating: ${safeRating} out of ${maxRating} stars`}
      className={`inline-flex items-center gap-1 text-amber-500 ${className}`}
    >
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: maxRating }).map((_, index) => {
          const isFilled = index < safeRating;
          return (
            <Star
              key={index}
              className={`${sizeClasses[size]} ${
                isFilled
                  ? 'fill-amber-400 text-amber-500'
                  : 'fill-slate-100 text-slate-300'
              }`}
            />
          );
        })}
      </div>

      {showNumeric && (
        <span className="text-xs font-bold text-slate-700 ml-1.5 font-mono">
          {safeRating}.0 / {maxRating}.0
        </span>
      )}
    </div>
  );
};
