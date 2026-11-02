import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { IndustrialImage } from '@/components/common/IndustrialImage';
import { ArrowRight, Wrench } from 'lucide-react';

export interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
  href?: string;
  imageUrl?: string;
  imageAlt?: string;
  isOffered?: boolean;
}

export interface ServiceCardProps {
  service: ServiceCardData;
}

export const ServiceCard: FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-amber-300 transition-all duration-300">
      {/* Service Image with lazy loading and fallback */}
      {service.imageUrl && (
        <div className="relative overflow-hidden aspect-video bg-slate-100">
          <IndustrialImage
            src={service.imageUrl}
            alt={service.imageAlt || service.title}
            aspectRatio="video"
            objectFit="cover"
          />
          {service.isOffered === false && (
            <span className="absolute top-2 right-2 bg-slate-900/80 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">
              Configurable Service
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {service.icon && (
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
              {service.icon}
            </div>
          )}

          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
            {service.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {service.description}
          </p>
        </div>

        {/* Buttons: View Details & Request Service */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <Link
            to={service.href || ROUTES.PUBLIC.SERVICES}
            className="text-xs font-semibold text-slate-700 hover:text-amber-700 inline-flex items-center gap-1 transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to={ROUTES.CUSTOMER.SERVICE_REQUEST}
            className="text-xs font-bold text-amber-900 bg-amber-100/80 hover:bg-amber-200/90 px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1 transition-colors"
          >
            <Wrench className="w-3 h-3 text-amber-700" />
            <span>Request Service</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
