import { FC, ReactNode } from 'react';

/**
 * Strength/value proposition data structure.
 * Designed for easy migration to CMS/backend data sources.
 */
export interface StrengthItemData {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface StrengthItemProps {
  strength: StrengthItemData;
}

/**
 * StrengthItem — Reusable component for displaying company strengths / value propositions.
 * Only verified company information should be passed as data.
 * Content placeholders are clearly structured for later editing.
 */
export const StrengthItem: FC<StrengthItemProps> = ({ strength }) => {
  return (
    <div className="flex items-start gap-4 p-5 sm:p-6 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-shadow duration-200">
      {/* Icon */}
      <div className="w-11 h-11 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
        {strength.icon}
      </div>

      {/* Content */}
      <div className="min-w-0">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          {strength.title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {strength.description}
        </p>
      </div>
    </div>
  );
};
