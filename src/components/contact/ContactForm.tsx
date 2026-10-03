import { FC, useState, FormEvent, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { FormField } from '@/components/common/Form/FormField';
import { Input } from '@/components/common/Form/Input';
import { Textarea } from '@/components/common/Form/Textarea';
import { Select } from '@/components/common/Form/Select';
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Phone,
  Mail,
  MapPin,
  User,
  ShieldCheck,
} from 'lucide-react';

export interface ContactEnquiryPayload {
  name: string;
  company: string;
  industry: string;
  mobile: string;
  email: string;
  location: string;
  enquiryType: string;
  message: string;
}

export interface ContactFormProps {
  onSubmitEnquiry?: (payload: ContactEnquiryPayload) => Promise<void> | void;
  externalLoading?: boolean;
  externalError?: string | null;
}

/**
 * ContactForm — Production industrial enquiry form.
 * Features thorough field validation, connected ARIA error states,
 * and handles Loading, Success, Validation, and Error states cleanly.
 * Ready to connect directly to backend REST endpoints.
 */
export const ContactForm: FC<ContactFormProps> = ({
  onSubmitEnquiry,
  externalLoading = false,
  externalError = null,
}) => {
  const [formData, setFormData] = useState<ContactEnquiryPayload>({
    name: '',
    company: '',
    industry: '',
    mobile: '',
    email: '',
    location: '',
    enquiryType: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);

  const isLoading = externalLoading || internalLoading;
  const currentError = externalError || internalError;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (internalError) {
      setInternalError(null);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name and designation are required.';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company, mill, or facility name is required.';
    }

    if (!formData.industry) {
      newErrors.industry = 'Please select your industrial sector.';
    }

    // Mobile validation: digits only, at least 10 digits
    const cleanedMobile = formData.mobile.replace(/[\s-]/g, '');
    if (!cleanedMobile) {
      newErrors.mobile = 'Mobile contact number is required.';
    } else if (!/^\+?[0-9]{10,14}$/.test(cleanedMobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    }

    // Email validation if entered or required for formal quotes
    if (!formData.email.trim()) {
      newErrors.email = 'Official email address is required for enquiry confirmation.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid work email address.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Plant location (City, District, State) is required.';
    }

    if (!formData.enquiryType) {
      newErrors.enquiryType = 'Please select the purpose of your enquiry.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide details of your enquiry (at least 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setInternalLoading(true);
      setInternalError(null);

      if (onSubmitEnquiry) {
        await onSubmitEnquiry(formData);
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to transmit enquiry. Please try again.';
      setInternalError(message);
    } finally {
      setInternalLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      company: '',
      industry: '',
      mobile: '',
      email: '',
      location: '',
      enquiryType: '',
      message: '',
    });
    setErrors({});
    setIsSuccess(false);
    setInternalError(null);
  };

  // SUCCESS STATE
  if (isSuccess) {
    return (
      <Card variant="default" className="border-emerald-200 bg-emerald-50/40 p-6 sm:p-10 text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h3 className="text-xl font-bold text-slate-900">Enquiry Transmitted Successfully</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>.
            Your industrial service enquiry for <span className="font-semibold text-slate-900">{formData.company}</span> has
            been recorded. Our engineering dispatch desk will review your facility requirements and contact you via{' '}
            <span className="font-mono font-medium text-slate-800">{formData.mobile}</span> or{' '}
            <span className="font-mono font-medium text-slate-800">{formData.email}</span>.
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Button variant="secondary" size="sm" onClick={handleReset}>
            Submit Another Enquiry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="industrial" className="p-6 sm:p-8">
      <CardContent className="p-0 space-y-6">
        {/* Header Title */}
        <div className="border-b border-slate-100 pb-4 space-y-1">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Submit a Service Enquiry
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Fill in your plant details below. Our technical dispatch desk reviews all submissions.
          </p>
        </div>

        {/* ERROR STATE BANNER */}
        {currentError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-red-900" role="alert">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <strong className="block font-bold">Transmission Error</strong>
              <span>{currentError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Row 1: Name & Designation + Company / Plant Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="contact-name"
              label="Full Name & Designation"
              required
              error={errors.name}
            >
              <Input
                id="contact-name"
                name="name"
                placeholder="e.g. Plant Manager / Chief Engineer"
                value={formData.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                leftIcon={<User className="w-4 h-4 text-slate-400" />}
                disabled={isLoading}
              />
            </FormField>

            <FormField
              id="contact-company"
              label="Company / Mill / Plant Name"
              required
              error={errors.company}
            >
              <Input
                id="contact-company"
                name="company"
                placeholder="e.g. Sree Venkata Agro Industries"
                value={formData.company}
                onChange={handleChange}
                error={Boolean(errors.company)}
                leftIcon={<Building2 className="w-4 h-4 text-slate-400" />}
                disabled={isLoading}
              />
            </FormField>
          </div>

          {/* Row 2: Industry Sector + Enquiry Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="contact-industry"
              label="Industry Sector"
              required
              error={errors.industry}
            >
              <Select
                id="contact-industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                error={Boolean(errors.industry)}
                placeholder="Select plant industry..."
                disabled={isLoading}
                options={[
                  { value: 'Rice Mills', label: 'Rice Mills & Grain Processing' },
                  { value: 'Textile & Cloth', label: 'Textile & Spinning Industries' },
                  { value: 'Cashew Processing', label: 'Cashew Processing Plants' },
                  { value: 'General Manufacturing', label: 'General Manufacturing & Agro-Plants' },
                  { value: 'Other Industrial Facility', label: 'Other Industrial Facility' },
                ]}
              />
            </FormField>

            <FormField
              id="contact-enquiry-type"
              label="Enquiry Purpose"
              required
              error={errors.enquiryType}
            >
              <Select
                id="contact-enquiry-type"
                name="enquiryType"
                value={formData.enquiryType}
                onChange={handleChange}
                error={Boolean(errors.enquiryType)}
                placeholder="Select purpose..."
                disabled={isLoading}
                options={[
                  { value: 'General Service Consultation', label: 'General Service Consultation' },
                  { value: 'Emergency Breakdown Assistance', label: 'Emergency Breakdown Assistance' },
                  { value: 'Scheduled Preventive Maintenance', label: 'Scheduled Preventive Maintenance' },
                  { value: 'Annual Maintenance Contract (AMC)', label: 'Annual Maintenance Contract (AMC)' },
                  { value: 'Vendor Empanelment / Registration', label: 'Vendor Empanelment / Supplier Onboarding' },
                ]}
              />
            </FormField>
          </div>

          {/* Row 3: Mobile Contact + Official Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="contact-mobile"
              label="Mobile Number (Direct Contact)"
              required
              error={errors.mobile}
              helperText="10-digit number for technician dispatch & callback"
            >
              <Input
                id="contact-mobile"
                name="mobile"
                type="tel"
                placeholder="e.g. 9876543210"
                value={formData.mobile}
                onChange={handleChange}
                error={Boolean(errors.mobile)}
                leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
                disabled={isLoading}
              />
            </FormField>

            <FormField
              id="contact-email"
              label="Official Work Email"
              required
              error={errors.email}
              helperText="For commercial quotation & job card documentation"
            >
              <Input
                id="contact-email"
                name="email"
                type="email"
                placeholder="e.g. manager@plant.com"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                disabled={isLoading}
              />
            </FormField>
          </div>

          {/* Row 4: Plant Location */}
          <FormField
            id="contact-location"
            label="Plant / Facility Location"
            required
            error={errors.location}
            helperText="City, District, State, or Industrial Area"
          >
            <Input
              id="contact-location"
              name="location"
              placeholder="e.g. Industrial Development Area, Phase II"
              value={formData.location}
              onChange={handleChange}
              error={Boolean(errors.location)}
              leftIcon={<MapPin className="w-4 h-4 text-slate-400" />}
              disabled={isLoading}
            />
          </FormField>

          {/* Row 5: Detailed Enquiry Message */}
          <FormField
            id="contact-message"
            label="Enquiry Details & Machinery Symptoms"
            required
            error={errors.message}
            helperText="Specify equipment model, observed failure symptoms, or service requirements."
          >
            <Textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder="Describe your machinery issue, required maintenance scope, or service timeframe..."
              value={formData.message}
              onChange={handleChange}
              error={Boolean(errors.message)}
              disabled={isLoading}
            />
          </FormField>

          {/* Dispatch Notice Strip */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct engineer dispatch review</span>
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              No Automated Bots
            </span>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Fields marked with <span className="text-red-600 font-bold">*</span> are required for service dispatch.
            </p>

            <Button
              type="submit"
              variant="industrial"
              size="lg"
              isLoading={isLoading}
              rightIcon={<Send className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Submit Service Enquiry
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
