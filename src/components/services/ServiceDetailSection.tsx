import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { ArrowRight, CheckCircle2, Wrench, FileText, Cpu } from 'lucide-react';

/**
 * Detailed service specification interface.
 * Decoupled data model ready to be served from a CMS or REST API.
 */
export interface DetailedServiceData {
  id: string;
  anchorId: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  scopeItems: string[];
  equipmentCovered: string[];
  deliverables: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface ServiceDetailSectionProps {
  service: DetailedServiceData;
  reverseLayout?: boolean;
}

/**
 * ServiceDetailSection — Reusable component for displaying in-depth service specifications.
 * Presents scope of work, machinery covered, deliverables, and service request actions.
 */
export const ServiceDetailSection: FC<ServiceDetailSectionProps> = ({
  service,
  reverseLayout = false,
}) => {
  return (
    <article
      id={service.anchorId}
      aria-labelledby={`heading-${service.id}`}
      className="scroll-mt-24 py-12 sm:py-16 border-b border-slate-200 last:border-b-0"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${
          reverseLayout ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Left / Primary Column: Service Identity & Description */}
        <div className={`lg:col-span-7 space-y-6 ${reverseLayout ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="amber" icon={service.icon}>
                {service.badge}
              </Badge>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                Industrial Service Category
              </span>
            </div>

            <h3
              id={`heading-${service.id}`}
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
            >
              {service.title}
            </h3>

            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              {service.subtitle}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {service.description}
          </p>

          {/* Scope of Work Breakdown */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-600" aria-hidden="true" />
              Scope of Work Included
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="list">
              {service.scopeItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Link to={service.ctaHref || '/customer/service-request'}>
              <Button
                variant="industrial"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {service.ctaLabel || 'Request This Service'}
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="md">
                Inquire Details
              </Button>
            </Link>
          </div>
        </div>

        {/* Right / Secondary Column: Equipment Covered & Deliverables */}
        <div className={`lg:col-span-5 space-y-5 ${reverseLayout ? 'lg:order-1' : 'lg:order-2'}`}>
          {/* Equipment Types Covered Card */}
          <Card variant="default">
            <CardContent className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <div className="w-8 h-8 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Cpu className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Equipment Covered</h4>
                  <p className="text-xs text-slate-500">Machinery evaluated under this service</p>
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-700" role="list">
                {service.equipmentCovered.map((eq) => (
                  <li key={eq} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Documentation & Deliverables Card */}
          <Card variant="flat">
            <CardContent className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-200/80 pb-3">
                <div className="w-8 h-8 rounded-md bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Service Deliverables</h4>
                  <p className="text-xs text-slate-500">Documented output provided to plant management</p>
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-700" role="list">
                {service.deliverables.map((del) => (
                  <li key={del} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
};
