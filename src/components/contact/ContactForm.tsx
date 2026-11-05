import { FC, useState, FormEvent, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { FormField } from '@/components/common/Form/FormField';
import { Input } from '@/components/common/Form/Input';
import { Textarea } from '@/components/common/Form/Textarea';
import { Select } from '@/components/common/Form/Select';
import { useLanguage } from '@/context/LanguageContext';
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

export const ContactForm: FC<ContactFormProps> = ({
  onSubmitEnquiry,
  externalLoading = false,
  externalError = null,
}) => {
  const { t, language } = useLanguage();
  const isTe = language === 'te';

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
      newErrors.name = isTe ? 'పూర్తి పేరు నమోదు చేయాలి.' : 'Full name and designation are required.';
    }

    if (!formData.company.trim()) {
      newErrors.company = isTe ? 'కంపెనీ లేదా పరిశ్రమ పేరు అవసరం.' : 'Company, mill, or facility name is required.';
    }

    if (!formData.industry) {
      newErrors.industry = isTe ? 'పరిశ్రమ విభాగాన్ని ఎంచుకోండి.' : 'Please select your industrial sector.';
    }

    const cleanedMobile = formData.mobile.replace(/[\s-]/g, '');
    if (!cleanedMobile) {
      newErrors.mobile = isTe ? 'మొబైల్ నంబర్ అవసరం.' : 'Mobile contact number is required.';
    } else if (!/^\+?[0-9]{10,14}$/.test(cleanedMobile)) {
      newErrors.mobile = isTe ? 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి.' : 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.email.trim()) {
      newErrors.email = isTe ? 'అధికారిక ఈమెయిల్ అవసరం.' : 'Official email address is required for enquiry confirmation.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = isTe ? 'దయచేసి సరైన ఈమెయిల్ చిరునామా నమోదు చేయండి.' : 'Please enter a valid work email address.';
    }

    if (!formData.location.trim()) {
      newErrors.location = isTe ? 'ప్లాంట్ లొకేషన్ వివరాలు నమోదు చేయండి.' : 'Plant location (City, District, State) is required.';
    }

    if (!formData.enquiryType) {
      newErrors.enquiryType = isTe ? 'విచారణ ఉద్దేశాన్ని ఎంచుకోండి.' : 'Please select the purpose of your enquiry.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = isTe ? 'దయచేసి కనీసం 10 అక్షరాలలో సమస్యను వివరించండి.' : 'Please provide details of your enquiry (at least 10 characters).';
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
      const message = err instanceof Error ? err.message : (isTe ? 'సమర్పణలో లోపం ఏర్పడింది. మళ్లీ ప్రయత్నించండి.' : 'Unable to transmit enquiry. Please try again.');
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
          <h3 className="text-xl font-bold text-slate-900">
            {isTe ? 'విచారణ విజయవంతంగా సమర్పించబడింది' : 'Enquiry Transmitted Successfully'}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {isTe ? (
              <>
                ధన్యవాదాలు, <span className="font-semibold text-slate-900">{formData.name}</span> గారు.
                మీ పరిశ్రమ <span className="font-semibold text-slate-900">{formData.company}</span> కొరకు సర్వీస్ విచారణ నమోదైంది.
                మా ఇంజనీరింగ్ బృందం <span className="font-mono font-medium text-slate-800">{formData.mobile}</span> ద్వారా మిమ్మల్ని సంప్రదిస్తుంది.
              </>
            ) : (
              <>
                Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>.
                Your industrial service enquiry for <span className="font-semibold text-slate-900">{formData.company}</span> has
                been recorded. Our engineering dispatch desk will review your facility requirements and contact you via{' '}
                <span className="font-mono font-medium text-slate-800">{formData.mobile}</span> or{' '}
                <span className="font-mono font-medium text-slate-800">{formData.email}</span>.
              </>
            )}
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Button variant="secondary" size="sm" onClick={handleReset}>
            {isTe ? 'మరొక విచారణ పంపండి' : 'Submit Another Enquiry'}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="industrial" className="p-6 sm:p-8">
      <CardContent className="p-0 space-y-6">
        <div className="border-b border-slate-100 pb-4 space-y-1">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {t('contact.form_title')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {isTe
              ? 'మీ ప్లాంట్ మరియు యంత్ర వివరాలను పూరించండి. మా సాంకేతిక బృందం సమీక్షిస్తుంది.'
              : 'Fill in your plant details below. Our technical dispatch desk reviews all submissions.'}
          </p>
        </div>

        {currentError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-red-900" role="alert">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <strong className="block font-bold">{isTe ? 'లోపం సంభవించింది' : 'Transmission Error'}</strong>
              <span>{currentError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Row 1: Name & Designation + Company / Plant Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="contact-name"
              label={isTe ? 'పూర్తి పేరు & హోదా' : 'Full Name & Designation'}
              required
              error={errors.name}
            >
              <Input
                id="contact-name"
                name="name"
                placeholder={isTe ? 'ఉదా. ప్లాంట్ మేనేజర్ / ఇంజనీర్' : 'e.g. Plant Manager / Chief Engineer'}
                value={formData.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                leftIcon={<User className="w-4 h-4 text-slate-400" />}
                disabled={isLoading}
              />
            </FormField>

            <FormField
              id="contact-company"
              label={isTe ? 'కంపెనీ / మిల్లు పేరు' : 'Company / Mill / Plant Name'}
              required
              error={errors.company}
            >
              <Input
                id="contact-company"
                name="company"
                placeholder={isTe ? 'ఉదా. శ్రీ లలిత రైస్ ఇండస్ట్రీ' : 'e.g. Sri Lalitha Rice Industry'}
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
              label={isTe ? 'పరిశ్రమ విభాగం' : 'Industry Sector'}
              required
              error={errors.industry}
            >
              <Select
                id="contact-industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                error={Boolean(errors.industry)}
                placeholder={isTe ? 'పరిశ్రమను ఎంచుకోండి...' : 'Select plant industry...'}
                disabled={isLoading}
                options={[
                  { value: 'Rice Mills', label: isTe ? 'వరి మిల్లులు & ధాన్యపు ప్రాసెసింగ్' : 'Rice Mills & Grain Processing' },
                  { value: 'Textile & Cloth', label: isTe ? 'టెక్స్‌టైల్స్ & స్పిన్నింగ్ మిల్లులు' : 'Textile & Spinning Industries' },
                  { value: 'Cashew Processing', label: isTe ? 'జీడిపప్పు ప్రాసెసింగ్ ప్లాంట్లు' : 'Cashew Processing Plants' },
                  { value: 'Food & Edible Oils', label: isTe ? 'ఫుడ్ ప్రాసెసింగ్ & తినదగిన నూనెలు' : 'Food & Edible Oils' },
                  { value: 'Paper Mills', label: isTe ? 'పేపర్ మిల్లు పరిశ్రమ' : 'Paper Mills & Pulp Plants' },
                  { value: 'Steel & Metallurgy', label: isTe ? 'స్టీల్ & మెటలర్జీ ప్లాంట్లు' : 'Steel & Heavy Metallurgy' },
                  { value: 'Dairy & Cold Chain', label: isTe ? 'డెయిరీ & కోల్డ్ స్టోరేజ్' : 'Dairy & Ammonia Cold Storage' },
                  { value: 'Industrial Equipment', label: isTe ? 'ఎయిర్ కంప్రెసర్లు & పరికరాలు' : 'Air Compressors & Heavy Equipment' },
                  { value: 'Other Industrial Facility', label: isTe ? 'ఇతర పారిశ్రామిక ప్లాంట్' : 'Other Industrial Facility' },
                ]}
              />
            </FormField>

            <FormField
              id="contact-enquiry-type"
              label={isTe ? 'విచారణ ఉద్దేశం' : 'Enquiry Purpose'}
              required
              error={errors.enquiryType}
            >
              <Select
                id="contact-enquiry-type"
                name="enquiryType"
                value={formData.enquiryType}
                onChange={handleChange}
                error={Boolean(errors.enquiryType)}
                placeholder={isTe ? 'ఉద్దేశాన్ని ఎంచుకోండి...' : 'Select purpose...'}
                disabled={isLoading}
                options={[
                  { value: 'General Service Consultation', label: isTe ? 'సాధారణ సర్వీస్ సంప్రదింపు' : 'General Service Consultation' },
                  { value: 'Emergency Breakdown Assistance', label: isTe ? 'అత్యవసర బ్రేక్‌డౌన్ సహాయం' : 'Emergency Breakdown Assistance' },
                  { value: 'Scheduled Preventive Maintenance', label: isTe ? 'షెడ్యూల్ చేసిన నివారణ నిర్వహణ' : 'Scheduled Preventive Maintenance' },
                  { value: 'Annual Maintenance Contract (AMC)', label: isTe ? 'వార్షిక నిర్వహణ ఒప్పందం (AMC)' : 'Annual Maintenance Contract (AMC)' },
                  { value: 'Vendor Empanelment / Registration', label: isTe ? 'వెండర్ రిజిస్ట్రేషన్ / ఎంప్లాయిమెంట్' : 'Vendor Empanelment / Supplier Onboarding' },
                ]}
              />
            </FormField>
          </div>

          {/* Row 3: Mobile Contact + Official Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="contact-mobile"
              label={isTe ? 'మొబైల్ నంబర్' : 'Mobile Number (Direct Contact)'}
              required
              error={errors.mobile}
              helperText={isTe ? 'డిస్పాచ్ & కాల్‌బ్యాక్ కోసం 10 అంకెల నంబర్' : '10-digit number for technician dispatch & callback'}
            >
              <Input
                id="contact-mobile"
                name="mobile"
                type="tel"
                placeholder="e.g. 9866227780"
                value={formData.mobile}
                onChange={handleChange}
                error={Boolean(errors.mobile)}
                leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
                disabled={isLoading}
              />
            </FormField>

            <FormField
              id="contact-email"
              label={isTe ? 'అధికారిక ఈమెయిల్' : 'Official Work Email'}
              required
              error={errors.email}
              helperText={isTe ? 'కొటేషన్ మరియు జాబ్ కార్డ్ కోసం' : 'For commercial quotation & job card documentation'}
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
            label={isTe ? 'ప్లాంట్ / పరిశ్రమ లొకేషన్' : 'Plant / Facility Location'}
            required
            error={errors.location}
            helperText={isTe ? 'నగరం, జిల్లా, రాష్ట్రం లేదా పారిశ్రామిక ప్రాంతం' : 'City, District, State, or Industrial Area'}
          >
            <Input
              id="contact-location"
              name="location"
              placeholder={isTe ? 'ఉదా. తెనాలి / గుంటూరు / విశాఖపట్నం' : 'e.g. Tenali / Guntur / Visakhapatnam'}
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
            label={isTe ? 'సమస్య లేదా సర్వీస్ అవసరాల వివరాలు' : 'Enquiry Details & Machinery Symptoms'}
            required
            error={errors.message}
            helperText={isTe ? 'యంత్ర మోడల్, సమస్య లక్షణాలు మరియు అవసరమైన సర్వీస్ రాయండి' : 'Specify equipment model, observed failure symptoms, or service requirements.'}
          >
            <Textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder={isTe ? 'మీ యంత్ర సమస్య లేదా విచారణ వివరాలు రాయండి...' : 'Describe your machinery issue, required maintenance scope, or service timeframe...'}
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
              <span>{isTe ? 'ఇంజనీరింగ్ బృందం నేరుగా సమీక్షిస్తుంది' : 'Direct engineer dispatch review'}</span>
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              VPE Engineering Desk
            </span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              {isTe ? '* గుర్తు ఉన్న ఫీల్డులు తప్పనిసరి.' : 'Fields marked with * are required for service dispatch.'}
            </p>

            <Button
              type="submit"
              variant="industrial"
              size="lg"
              isLoading={isLoading}
              rightIcon={<Send className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              {t('contact.submit_btn')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
