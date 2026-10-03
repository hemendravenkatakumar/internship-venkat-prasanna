import { ElementType, forwardRef, HTMLAttributes } from 'react';
import { TypographyVariant } from '@/types';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: ElementType;
  className?: string;
  color?: 'default' | 'muted' | 'inverse' | 'brand' | 'amber' | 'danger' | 'success';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

const defaultElementMap: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  lead: 'p',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  mono: 'code',
};

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight',
  h2: 'text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-snug',
  h3: 'text-xl sm:text-2xl font-bold tracking-normal leading-snug',
  h4: 'text-lg sm:text-xl font-semibold leading-normal',
  h5: 'text-base sm:text-lg font-semibold leading-normal',
  h6: 'text-sm sm:text-base font-semibold uppercase tracking-wider',
  lead: 'text-lg sm:text-xl text-slate-600 font-normal leading-relaxed',
  body: 'text-base text-slate-700 leading-relaxed',
  'body-sm': 'text-sm text-slate-600 leading-normal',
  caption: 'text-xs text-slate-500 font-medium tracking-wide',
  mono: 'font-mono text-xs sm:text-sm bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded border border-slate-200',
};

const colorClasses: Record<NonNullable<TypographyProps['color']>, string> = {
  default: 'text-slate-900',
  muted: 'text-slate-600',
  inverse: 'text-white',
  brand: 'text-slate-950',
  amber: 'text-amber-700',
  danger: 'text-red-600',
  success: 'text-emerald-700',
};

const weightClasses: Record<NonNullable<TypographyProps['weight']>, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ variant = 'body', as, className = '', color, weight, children, ...props }, ref) => {
    const Component = as || defaultElementMap[variant] || 'p';
    const computedColor = color ? colorClasses[color] : '';
    const computedWeight = weight ? weightClasses[weight] : '';

    return (
      <Component
        ref={ref}
        className={`${variantClasses[variant]} ${computedColor} ${computedWeight} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';
