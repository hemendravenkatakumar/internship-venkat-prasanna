import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

/**
 * Industry data structure.
 * Designed for easy migration to CMS/backend data sources.
 */
export interface IndustryCardData {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  href: string;
}

export interface IndustryCardProps {
  industry: IndustryCardData;
}

/**
 * IndustryCard — Reusable card for displaying industries served by VPE.
 * Used on the Home page industries section and potentially on the Industries page.
 */
export const IndustryCard: FC<IndustryCardProps> = ({ industry }) => {
  return (
    <Link
      to={industry.href}
      className="group flex items-start gap-4 bg-white border border-slate-200 rounded-xl p-5 sm:p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
      aria-label={`Learn more about our services for ${industry.name}`}
    >
      {/* Icon */}
      <div className="w-11 h-11 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-amber-50 group-hover:border-amber-200 group-hover:text-amber-700 transition-colors duration-200">
        {industry.icon}
      </div>

      {/* Text Content */}
      <div className="min-w-0">
        <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-amber-800 transition-colors duration-200">
          {industry.name}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {industry.description}
        </p>
      </div>
    </Link>
  );
};
