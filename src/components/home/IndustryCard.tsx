import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { IndustrialImage } from '@/components/common/IndustrialImage';
import { Badge } from '@/components/common/Badge';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export interface IndustryCardData {
  id: string;
  name: string;
  description?: string;
  icon?: ReactNode;
  href?: string;
  imageUrl?: string;
  imageAlt?: string;
  servicesProvided?: string;
  verifiedExperience?: string;
  vendorStatus?: 'Registered' | 'Pending' | 'Not Registered';
}

export interface IndustryCardProps {
  industry: IndustryCardData;
}

export const IndustryCard: FC<IndustryCardProps> = ({ industry }) => {
  const getBadgeVariant = (status?: string) => {
    switch (status) {
      case 'Registered':
        return 'success';
      case 'Pending':
        return 'amber';
      case 'Not Registered':
      default:
        return 'default';
    }
  };

  return (
    <div className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300">
      {/* Industry Image */}
      {industry.imageUrl && (
        <div className="relative overflow-hidden aspect-[16/10] bg-slate-100">
          <IndustrialImage
            src={industry.imageUrl}
            alt={industry.imageAlt || industry.name}
            aspectRatio="auto"
            className="h-44 w-full object-cover"
          />
          {industry.vendorStatus && (
            <div className="absolute top-2.5 right-2.5">
              <Badge
                variant={getBadgeVariant(industry.vendorStatus)}
                icon={
                  industry.vendorStatus === 'Registered' ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )
                }
              >
                {industry.vendorStatus}
              </Badge>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {industry.icon && (
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                {industry.icon}
              </div>
            )}
            <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
              {industry.name}
            </h3>
          </div>

          {industry.description && (
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {industry.description}
            </p>
          )}

          {industry.servicesProvided && (
            <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs space-y-1">
              <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                Services Provided:
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                {industry.servicesProvided}
              </p>
            </div>
          )}

          {industry.verifiedExperience && (
            <p className="text-[11px] text-slate-500 italic">
              Experience: {industry.verifiedExperience}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            VPE Industrial Sector
          </span>
          <Link
            to={industry.href || ROUTES.PUBLIC.INDUSTRIES}
            className="text-xs font-semibold text-amber-700 hover:text-amber-900 inline-flex items-center gap-1 transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
