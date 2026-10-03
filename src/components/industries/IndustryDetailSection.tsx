import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { ArrowRight, CheckCircle2, AlertCircle, Wrench, Cpu, ShieldCheck } from 'lucide-react';

export interface IndustryDetailData {
  id: string;
  anchorId: string;
  badge: string;
  name: string;
  tagline: string;
  overview: string;
  icon: ReactNode;
  keyMachinery: string[];
  operationalChallenges: string[];
  vpeSolutions: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface IndustryDetailSectionProps {
  industry: IndustryDetailData;
  reverseLayout?: boolean;
}

/**
 * IndustryDetailSection — Reusable component for presenting sector-specific engineering coverage.
 * Highlights machinery types, common operational failure points, and VPE on-site service solutions.
 */
export const IndustryDetailSection: FC<IndustryDetailSectionProps> = ({
  industry,
  reverseLayout = false,
}) => {
  return (
    <article
      id={industry.anchorId}
      aria-labelledby={`industry-heading-${industry.id}`}
      className="scroll-mt-24 py-12 sm:py-16 border-b border-slate-200 last:border-b-0"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${
          reverseLayout ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Primary Column: Sector Overview, Common Failure Points & VPE Solutions */}
        <div className={`lg:col-span-7 space-y-6 ${reverseLayout ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="amber" icon={industry.icon}>
                {industry.badge}
              </Badge>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                Industrial Sector Coverage
              </span>
            </div>

            <h3
              id={`industry-heading-${industry.id}`}
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
            >
              {industry.name}
            </h3>

            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              {industry.tagline}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {industry.overview}
          </p>

          {/* Operational Challenges Box */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-amber-950 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
              Common Plant Challenges in this Sector
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-900" role="list">
              {industry.operationalChallenges.map((challenge) => (
                <li key={challenge} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" aria-hidden="true" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* VPE Dedicated Engineering Solutions */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-600" aria-hidden="true" />
              VPE Specialized Servicing & Solutions
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="list">
              {industry.vpeSolutions.map((solution) => (
                <li key={solution} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Link to={industry.ctaHref || '/customer/service-request'}>
              <Button
                variant="industrial"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {industry.ctaLabel || `Request ${industry.name} Service`}
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="md">
                Consult With Engineer
              </Button>
            </Link>
          </div>
        </div>

        {/* Secondary Column: Machinery Serviced & Plant Standards */}
        <div className={`lg:col-span-5 space-y-5 ${reverseLayout ? 'lg:order-1' : 'lg:order-2'}`}>
          {/* Machinery Serviced Card */}
          <Card variant="default">
            <CardContent className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <div className="w-8 h-8 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Cpu className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Key Machinery Serviced</h4>
                  <p className="text-xs text-slate-500">Core processing and auxiliary equipment</p>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700" role="list">
                {industry.keyMachinery.map((machine) => (
                  <li key={machine} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" aria-hidden="true" />
                    <span>{machine}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Operational Quality Assurance */}
          <Card variant="flat">
            <CardContent className="p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2.5 border-b border-slate-200/80 pb-3">
                <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Plant Performance Focus</h4>
                  <p className="text-xs text-slate-500">Service targets for this sector</p>
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-700" role="list">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Minimizing unexpected line stoppages during peak production shifts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Preventing abrasive and thermal wear before catastrophic failure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>On-site safety clearance and documented maintenance logs</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
};
