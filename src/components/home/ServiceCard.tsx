import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Service data structure.
 * Designed for easy migration to CMS/backend data sources.
 * The `icon` field accepts a Lucide React component or any ReactNode.
 */
export interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
}

export interface ServiceCardProps {
  service: ServiceCardData;
}

/**
 * ServiceCard — Reusable card for displaying individual industrial services.
 * Used on the Home page services overview and potentially on the Services page.
 */
export const ServiceCard: FC<ServiceCardProps> = ({ service }) => {
  return (
    <Link
      to={service.href}
      className="group block bg-white border border-slate-200 rounded-xl p-6 sm:p-7 hover:shadow-lg hover:border-amber-300 transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
      aria-label={`Learn more about ${service.title}`}
    >
      {/* Icon Container */}
      <div className="w-12 h-12 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-4 group-hover:bg-amber-100 group-hover:border-amber-300 transition-colors duration-200">
        {service.icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-800 transition-colors duration-200">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed mb-4">
        {service.description}
      </p>

      {/* Explore Link Indicator */}
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 group-hover:text-amber-800 transition-colors duration-200">
        Learn More
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
      </span>
    </Link>
  );
};
