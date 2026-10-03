import { FC, useState, FormEvent } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { FormField } from '@/components/common/Form/FormField';
import { Input } from '@/components/common/Form/Input';
import { Textarea } from '@/components/common/Form/Textarea';
import { Select } from '@/components/common/Form/Select';
import { RatingInput } from './RatingInput';
import { ShieldCheck, CheckCircle2, Send, AlertCircle, FileCheck } from 'lucide-react';

export interface ReviewSubmissionPayload {
  serviceRecordId: string;
  rating: number;
  customerName: string;
  companyName: string;
  serviceCategory: string;
  title: string;
  feedback: string;
}

export interface ReviewSubmissionFormProps {
  onSuccess?: (payload: ReviewSubmissionPayload) => void;
}

/**
 * ReviewSubmissionForm — Customer review submission UI.
 * Enforces linking each review to a valid service record ID and displays clear
 * administrative approval policy notice. No fake API calls are simulated.
 */
export const ReviewSubmissionForm: FC<ReviewSubmissionFormProps> = ({ onSuccess }) => {
  const [serviceRecordId, setServiceRecordId] = useState('');
  const [rating, setRating] = useState(5);
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [title, setTitle] = useState('');
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!serviceRecordId.trim()) {
      newErrors.serviceRecordId = 'Valid Service Record / Work Order ID is required.';
    }
    if (!customerName.trim()) {
      newErrors.customerName = 'Your name is required.';
    }
    if (!companyName.trim()) {
      newErrors.companyName = 'Plant or company name is required.';
    }
    if (!serviceCategory) {
      newErrors.serviceCategory = 'Please select the service category.';
    }
    if (!title.trim()) {
      newErrors.title = 'Please provide a short summary title.';
    }
    if (!feedback.trim() || feedback.length < 15) {
      newErrors.feedback = 'Please provide detailed written feedback (at least 15 characters).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);

    if (onSuccess) {
      onSuccess({
        serviceRecordId,
        rating,
        customerName,
        companyName,
        serviceCategory,
        title,
        feedback,
      });
    }
  };

  const handleReset = () => {
    setServiceRecordId('');
    setRating(5);
    setCustomerName('');
    setCompanyName('');
    setServiceCategory('');
    setTitle('');
    setFeedback('');
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card variant="default" className="border-emerald-200 bg-emerald-50/40 p-6 sm:p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-1.5 max-w-md mx-auto">
          <h3 className="text-lg font-bold text-slate-900">Review Submitted for Verification</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Thank you, <span className="font-semibold text-slate-800">{customerName}</span>.
            Your feedback for Service Record <span className="font-mono font-semibold text-slate-800">#{serviceRecordId}</span> has
            been received. In accordance with our quality policies, reviews appear on the public directory
            following administrative verification against completed technician job logs.
          </p>
        </div>

        <div className="pt-2">
          <Button variant="secondary" size="sm" onClick={handleReset}>
            Submit Another Feedback
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="industrial" className="p-6 sm:p-8">
      <CardContent className="p-0 space-y-6">
        {/* Form Title & Protocol Note */}
        <div className="border-b border-slate-100 pb-4 space-y-1">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-slate-900">Submit a Service Feedback Review</h3>
          </div>
          <p className="text-xs text-slate-500">
            Ratings and feedback are authenticated against formal service job cards prior to public publication.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Top Row: Service Record ID & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="service-record-id"
              label="Service Record / Work Order ID"
              required
              error={errors.serviceRecordId}
              helperText="Found on your service completion sign-off slip (e.g. WO-2026-042)"
            >
              <Input
                id="service-record-id"
                placeholder="e.g. WO-2026-081"
                value={serviceRecordId}
                onChange={(e) => setServiceRecordId(e.target.value)}
                error={Boolean(errors.serviceRecordId)}
              />
            </FormField>

            <FormField
              id="service-category"
              label="Service Category"
              required
              error={errors.serviceCategory}
            >
              <Select
                id="service-category"
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
                error={Boolean(errors.serviceCategory)}
                placeholder="Select service performed..."
                options={[
                  { value: 'Rice Mill Machinery Overhaul', label: 'Rice Mill Machinery Overhaul' },
                  { value: 'Textile Equipment Servicing', label: 'Textile Equipment Servicing' },
                  { value: 'Cashew Plant Machinery Repair', label: 'Cashew Plant Machinery Repair' },
                  { value: 'Equipment Diagnostic & Inspection', label: 'Equipment Diagnostic & Inspection' },
                  { value: 'Emergency Breakdown Troubleshooting', label: 'Emergency Breakdown Troubleshooting' },
                  { value: 'General Plant Maintenance / AMC', label: 'General Plant Maintenance / AMC' },
                ]}
              />
            </FormField>
          </div>

          {/* Interactive Star Rating */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <span className="text-sm font-semibold text-slate-800 block">
              Overall Service Rating (1 to 5 Stars) *
            </span>
            <RatingInput
              id="rating-selector"
              value={rating}
              onChange={(newRating) => setRating(newRating)}
            />
          </div>

          {/* Customer Name & Plant / Company Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="customer-name"
              label="Your Full Name & Designation"
              required
              error={errors.customerName}
            >
              <Input
                id="customer-name"
                placeholder="e.g. Plant Manager / Engineer"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                error={Boolean(errors.customerName)}
              />
            </FormField>

            <FormField
              id="company-name"
              label="Company / Mill / Facility Name"
              required
              error={errors.companyName}
            >
              <Input
                id="company-name"
                placeholder="e.g. Sree Lakshmi Agro Mills"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                error={Boolean(errors.companyName)}
              />
            </FormField>
          </div>

          {/* Review Title */}
          <FormField
            id="review-title"
            label="Feedback Summary Title"
            required
            error={errors.title}
            helperText="e.g. Rapid troubleshooting of motor tripping and timely line restart"
          >
            <Input
              id="review-title"
              placeholder="Brief summary of your service experience"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={Boolean(errors.title)}
            />
          </FormField>

          {/* Written Feedback Textarea */}
          <FormField
            id="review-feedback"
            label="Detailed Written Feedback"
            required
            error={errors.feedback}
            helperText="Describe the technician's technical competence, timeliness, and equipment performance post-service."
          >
            <Textarea
              id="review-feedback"
              placeholder="Share your detailed feedback regarding the completed service..."
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              error={Boolean(errors.feedback)}
            />
          </FormField>

          {/* Administrative Verification Undertaking Notice */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong>Quality Verification Protocol:</strong> Submitted feedback is verified against completed on-site technician job cards and service logs. Unauthenticated reviews or entries without valid Work Order IDs will not be approved for public display.
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2 flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Admin moderation enforced</span>
            </span>

            <Button
              type="submit"
              variant="industrial"
              size="md"
              rightIcon={<Send className="w-4 h-4" />}
            >
              Submit for Admin Approval
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
