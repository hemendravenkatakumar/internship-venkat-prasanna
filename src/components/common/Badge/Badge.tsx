import { HTMLAttributes, forwardRef, ReactNode } from 'react';

export type BadgeVariant = 'default' | 'amber' | 'success' | 'danger' | 'info' | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  icon?: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-800 border border-slate-200',
  amber: 'bg-amber-100 text-amber-900 border border-amber-200 font-semibold',
  success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  danger: 'bg-red-50 text-red-800 border border-red-200',
  info: 'bg-blue-50 text-blue-800 border border-blue-200',
  outline: 'bg-transparent text-slate-700 border border-slate-300',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', icon, className = '', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
