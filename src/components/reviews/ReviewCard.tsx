import { FC } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { RatingDisplay } from './RatingDisplay';
import { ShieldCheck, FileCheck, Building2, User } from 'lucide-react';

export interface ApprovedReviewData {
  id: string;
  customerName: string;
  companyName: string;
  sector: string;
  rating: number; // 1 to 5
  serviceRecordId: string; // Linked service record / work order
  serviceCategory: string;
  reviewDate: string;
  title: string;
  comment: string;
  status: 'Approved';
}

export interface ReviewCardProps {
  review: ApprovedReviewData;
}

/**
 * ReviewCard — Reusable component for displaying verified, approved customer feedback.
 * Explicitly links the rating and comments to a validated on-site service record.
 */
export const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card variant="default" className="h-full flex flex-col justify-between hover:border-slate-300 transition-all duration-200">
      <CardContent className="p-5 sm:p-6 space-y-4 flex-1">
        {/* Rating & Verified Badge Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <RatingDisplay rating={review.rating} size="md" showNumeric />
          <Badge variant="success" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
            Verified Service
          </Badge>
        </div>

        {/* Review Title & Written Comment */}
        <div className="space-y-2">
          <h4 className="text-base font-bold text-slate-900 leading-snug">
            {review.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
            &ldquo;{review.comment}&rdquo;
          </p>
        </div>

        {/* Linked Service Record Box */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 space-y-1 text-xs">
          <div className="flex items-center justify-between text-slate-500 font-mono text-[11px]">
            <span className="flex items-center gap-1 font-semibold uppercase">
              <FileCheck className="w-3.5 h-3.5 text-amber-600" />
              Service Record Link
            </span>
            <span className="text-slate-700 font-bold">{review.serviceRecordId}</span>
          </div>
          <p className="text-slate-600 font-medium text-[11px]">
            Category: <span className="text-slate-800">{review.serviceCategory}</span> • {review.sector}
          </p>
        </div>
      </CardContent>

      {/* Reviewer Identity Footer */}
      <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 bg-slate-50/50 mt-auto flex items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-slate-900 truncate">{review.customerName}</p>
            <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
              <Building2 className="w-3 h-3 shrink-0" />
              {review.companyName}
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-slate-400 shrink-0">
          {review.reviewDate}
        </span>
      </div>
    </Card>
  );
};
