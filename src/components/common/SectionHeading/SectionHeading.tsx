import React, { ReactNode } from 'react';
import { Badge } from '@/components/common/Badge';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center' | 'right';
  action?: ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  align = 'left',
  action,
  className = '',
}) => {
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 ${className}`}
    >
      <div className={`flex flex-col max-w-3xl ${alignmentClass}`}>
        {badge && (
          <div className="mb-3">
            <Badge variant="amber">{badge}</Badge>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0 mt-4 sm:mt-0">{action}</div>}
    </div>
  );
};
