import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Wrench, CheckCircle2, ArrowRight, Layers, FileCheck } from 'lucide-react';
import { ROUTES } from '@/routes/paths';

export interface ServiceExperienceData {
  id: string;
  category: string;
  sector: string;
  serviceType: string;
  scopeSummary: string;
  machineryHandled: string[];
  executionScope: string[];
  documentationStatus: string;
}

export interface ExperienceCardProps {
  experience: ServiceExperienceData;
}

/**
 * ExperienceCard — Reusable component for displaying real service capability and project track records.
 * Presents verifiable equipment categories and technical scopes without inventing fake customer names.
 */
export const ExperienceCard: FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <Card variant="industrial" className="h-full flex flex-col justify-between">
      <CardContent className="p-5 sm:p-6 space-y-5 flex-1">
        {/* Category & Sector Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <Badge variant="amber" icon={<Wrench className="w-3.5 h-3.5" />}>
            {experience.sector}
          </Badge>
          <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {experience.serviceType}
          </span>
        </div>

        {/* Title */}
        <div>
          <h4 className="text-lg font-bold text-slate-900 leading-snug">
            {experience.category}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            {experience.scopeSummary}
          </p>
        </div>

        {/* Machinery Handled */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Machinery & Systems Serviced</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {experience.machineryHandled.map((m) => (
              <span
                key={m}
                className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Execution Highlights */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Technical Execution</span>
          </p>
          <ul className="space-y-1.5 text-xs text-slate-600" role="list">
            {experience.executionScope.map((scope) => (
              <li key={scope} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1 shrink-0" aria-hidden="true" />
                <span>{scope}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      {/* Footer Documentation Status & Action */}
      <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 bg-slate-50/50 mt-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
          <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{experience.documentationStatus}</span>
        </span>

        <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST} className="w-full sm:w-auto">
          <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            Request Similar Service
          </Button>
        </Link>
      </div>
    </Card>
  );
};
