import { FC } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { ShieldCheck, FileText, Clock, ExternalLink } from 'lucide-react';

export interface VendorRegistrationData {
  id: string;
  title: string;
  registrationType: string;
  issuingAuthority: string;
  registrationNumber: string;
  status: 'Verified' | 'Active Record' | 'Under Official Review';
  description: string;
  hasDocument: boolean;
  documentUrl?: string;
  documentLabel?: string;
}

export interface RegistrationCardProps {
  registration: VendorRegistrationData;
}

/**
 * RegistrationCard — Reusable component for displaying vendor registrations and statutory filings.
 * Structured to cleanly differentiate verified records from items awaiting official document upload.
 */
export const RegistrationCard: FC<RegistrationCardProps> = ({ registration }) => {
  const isVerified = registration.status === 'Verified' || registration.status === 'Active Record';

  return (
    <Card variant="default" className="h-full flex flex-col justify-between">
      <CardContent className="p-5 sm:p-6 space-y-4 flex-1">
        {/* Header Status & Type */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
            {registration.registrationType}
          </span>
          <Badge
            variant={isVerified ? 'success' : 'amber'}
            icon={isVerified ? <ShieldCheck className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
          >
            {registration.status}
          </Badge>
        </div>

        {/* Title & Authority */}
        <div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {registration.title}
          </h4>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Issuing Authority: <span className="text-slate-800">{registration.issuingAuthority}</span>
          </p>
        </div>

        {/* Description & Reference Number */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {registration.description}
        </p>

        <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3">
          <p className="text-[11px] font-mono text-slate-500 uppercase">Registration ID / Reference</p>
          <p className="text-xs font-mono font-bold text-slate-800 mt-0.5 break-all">
            {registration.registrationNumber}
          </p>
        </div>
      </CardContent>

      {/* Document Action Footer */}
      <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 bg-slate-50/50 mt-auto">
        {registration.hasDocument && registration.documentUrl ? (
          <a
            href={registration.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block"
          >
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              leftIcon={<FileText className="w-4 h-4 text-amber-600" />}
              rightIcon={<ExternalLink className="w-3.5 h-3.5 text-slate-400" />}
            >
              {registration.documentLabel || 'View Official Certificate'}
            </Button>
          </a>
        ) : (
          <div className="flex items-center justify-between text-xs text-slate-500 py-1">
            <span className="flex items-center gap-1.5 text-slate-500">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Official Document</span>
            </span>
            <span className="font-mono text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Pending Admin Upload
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};
