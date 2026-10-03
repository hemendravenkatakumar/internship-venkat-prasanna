import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { CheckCircle2, ArrowRight, Layers, FileSpreadsheet } from 'lucide-react';
import { ROUTES } from '@/routes/paths';

export interface ChargeCategoryData {
  id: string;
  category: string;
  badge: string;
  badgeVariant?: 'amber' | 'default' | 'success' | 'info' | 'outline';
  icon: ReactNode;
  description: string;
  billingUnit: string;
  pricingStateText: string;
  rateBasisNote: string;
  inclusions: string[];
  ctaLabel?: string;
}

export interface ChargeCardProps {
  charge: ChargeCategoryData;
}

/**
 * ChargeCard — Reusable component for displaying commercial industrial service charge categories.
 * Formats pricing states, billing units, and scope inclusions without hardcoding fictional prices.
 */
export const ChargeCard: FC<ChargeCardProps> = ({ charge }) => {
  return (
    <Card variant="default" className="h-full flex flex-col justify-between hover:border-slate-300 transition-all duration-200">
      <CardContent className="p-5 sm:p-6 space-y-4 flex-1">
        {/* Header Badge & Unit */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <Badge variant={charge.badgeVariant || 'amber'} icon={charge.icon}>
            {charge.badge}
          </Badge>
          <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {charge.billingUnit}
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h4 className="text-lg font-bold text-slate-900 leading-snug">
            {charge.category}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            {charge.description}
          </p>
        </div>

        {/* Price State / Tariff Placeholder Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-semibold uppercase text-slate-500">
              Commercial Tariff Status
            </span>
            <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              Official Rate Structure
            </span>
          </div>
          <p className="text-sm sm:text-base font-extrabold text-slate-900">
            {charge.pricingStateText}
          </p>
          <p className="text-[11px] text-slate-500 leading-normal">
            {charge.rateBasisNote}
          </p>
        </div>

        {/* Inclusions List */}
        <div className="space-y-2 pt-1">
          <p className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Scope & Billing Inclusions</span>
          </p>
          <ul className="space-y-1.5 text-xs text-slate-600" role="list">
            {charge.inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      {/* Footer Action */}
      <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 bg-slate-50/50 mt-auto flex items-center justify-between gap-3">
        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
          <FileSpreadsheet className="w-3.5 h-3.5 text-slate-400" />
          <span>Statutory GST Additional</span>
        </span>

        <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
          <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            {charge.ctaLabel || 'Request Service Quote'}
          </Button>
        </Link>
      </div>
    </Card>
  );
};
