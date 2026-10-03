import { FC, useState } from 'react';
import { Star } from 'lucide-react';

export interface RatingInputProps {
  id?: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const ratingLabels: Record<number, string> = {
  1: '1 star — Poor service resolution',
  2: '2 stars — Fair / needs improvement',
  3: '3 stars — Satisfactory service execution',
  4: '4 stars — Very good technical quality',
  5: '5 stars — Excellent engineering & fast uptime',
};

/**
 * RatingInput — Interactive, accessible 1 to 5 star rating selector.
 * Supports hover preview, keyboard navigation, and explicit label announcement.
 */
export const RatingInput: FC<RatingInputProps> = ({
  id = 'service-rating',
  value,
  onChange,
  disabled = false,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const activeRating = hoverRating !== null ? hoverRating : value;

  return (
    <div className="space-y-1.5">
      <div
        id={id}
        role="radiogroup"
        aria-label="Service Star Rating (1 to 5 stars)"
        className="flex items-center gap-1.5"
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= activeRating;
          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={value === star}
              aria-label={ratingLabels[star]}
              disabled={disabled}
              onClick={() => onChange(star)}
              onMouseEnter={() => !disabled && setHoverRating(star)}
              onMouseLeave={() => !disabled && setHoverRating(null)}
              className="p-1 rounded-md transition-transform hover:scale-110 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Star
                className={`w-6 h-6 transition-colors duration-150 ${
                  isFilled
                    ? 'fill-amber-400 text-amber-500'
                    : 'fill-slate-100 text-slate-300 hover:text-amber-300'
                }`}
              />
            </button>
          );
        })}
      </div>

      <p className="text-xs text-slate-500 font-medium">
        {value > 0 ? ratingLabels[value] : 'Select a rating from 1 to 5 stars'}
      </p>
    </div>
  );
};
