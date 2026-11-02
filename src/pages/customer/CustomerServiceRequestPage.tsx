import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Button,
  Badge,
  FormField,
  Input,
  Select,
  Textarea,
  VoiceRecorder,
} from '@/components/common';
import { authService } from '@/services/authService';
import { complaintsService, ComplaintRecord } from '@/services/complaintsService';
import { useLanguage } from '@/context/LanguageContext';
import {
  FilePlus,
  Image as ImageIcon,
  CheckCircle2,
  ArrowRight,
  MapPin,
  UploadCloud,
  Building2,
  User,
  Phone,
  Factory,
  Calendar,
  Paperclip,
  Trash2,
  FileText,
  Video,
} from 'lucide-react';

const CATEGORIES = [
  'Equipment Breakdown',
  'Power & Electrical Failure',
  'Mechanical Jam / Failure',
  'Pneumatic & Compressed Air Malfunction',
  'Refrigeration / Chiller System Failure',
  'Supply & Resource Disruption',
  'Structural & Facility Safety',
  'Scheduled Maintenance Call',
  'Other Operational Malfunction',
];

const INDUSTRY_TYPES = [
  'Rice Milling & Grain Processing',
  'Cold Storage & Refrigeration Plants',
  'Biomass & Co-Generation Power',
  'Food Processing & Edible Oil Refineries',
  'Aquaculture Feeds & Agro Chemicals',
  'General Heavy Engineering & Fabrication',
];

interface AttachmentItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size: string;
}

export const CustomerServiceRequestPage: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const { t } = useLanguage();

  // Contact & Company Details (pre-filled from authenticated user profile, editable)
  const [companyName, setCompanyName] = useState(currentUser?.company || 'Prasanna Agro Industries Ltd.');
  const [contactPerson, setContactPerson] = useState(currentUser?.name || 'Venkat Prasanna');
  const [mobile, setMobile] = useState(currentUser?.phone || '+91 98765 01234');
  const [location, setLocation] = useState(currentUser?.location || 'Tadepalligudem Industrial Zone, AP');
  const [industryType, setIndustryType] = useState(currentUser?.industry || INDUSTRY_TYPES[0]);

  // Machine Problem Details
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [problemStartDate, setProblemStartDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  // Attachments (Photos, Videos, Documents)
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const [images, setImages] = useState<string[]>([]);

  // Voice Recording (Strict 6-step workflow, no speech-to-text)
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Submission State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState<ComplaintRecord | null>(null);

  if (!currentUser) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  // Handle Multi-file Upload (Photos, Videos, PDFs)
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.size > 20 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 20MB limit.`);
        return;
      }

      let detectedType: 'image' | 'video' | 'document' = 'document';
      if (file.type.startsWith('image/')) detectedType = 'image';
      else if (file.type.startsWith('video/')) detectedType = 'video';
      else if (file.type.includes('pdf') || file.type.includes('doc')) detectedType = 'document';

      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const newAtt: AttachmentItem = {
            id: `att-${Date.now()}-${Math.random()}`,
            name: file.name,
            type: detectedType,
            url: reader.result,
            size: sizeStr,
          };
          setAttachments((prev) => [...prev, newAtt]);
          if (detectedType === 'image') {
            setImages((prev) => [...prev, reader.result as string]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAttachment = (id: string) => {
    const target = attachments.find((a) => a.id === id);
    if (target && target.type === 'image') {
      setImages((prev) => prev.filter((img) => img !== target.url));
    }
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!companyName.trim()) {
      newErrors.companyName = 'Company / industry name is required.';
    }
    if (!contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person name is required.';
    }
    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile phone number is required.';
    }
    if (!location.trim()) {
      newErrors.location = 'Operating location or plant address is required.';
    }
    if (!title.trim()) {
      newErrors.title = 'Please enter a short title for the machine issue.';
    }
    if (!description.trim()) {
      newErrors.description = 'Detailed machine issue description is required.';
    } else if (description.trim().length < 15) {
      newErrors.description = 'Please provide at least 15 characters describing the issue.';
    }
    if (!problemStartDate) {
      newErrors.problemStartDate = 'Problem start date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const created = await complaintsService.submitComplaint({
        userId: currentUser.id,
        userName: contactPerson,
        companyName,
        contactPerson,
        userEmail: currentUser.email,
        userPhone: mobile,
        industryType,
        title,
        category,
        description,
        problemStartDate,
        location,
        images,
        attachments: attachments.map((a) => ({ name: a.name, url: a.url, type: a.type })),
        voiceRecording: audioUrl,
      });

      setSubmittedComplaint(created);
    } catch (err: unknown) {
      console.error('Submission failed:', err);
      alert('An error occurred while submitting your service request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Confirmation Screen
  if (submittedComplaint) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <Card variant="industrial" className="border-emerald-500/40 shadow-lg overflow-hidden">
          <div className="bg-emerald-600 px-6 py-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  {t('request.success_title')}
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
                  {t('request.success_desc')}
                </p>
              </div>
            </div>
            <Badge variant="default" className="bg-white/20 text-white border-white/30 text-xs uppercase font-mono">
              Live Dispatch
            </Badge>
          </div>

          <CardContent className="p-6 sm:p-8 space-y-6 bg-white">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-amber-800 font-bold block">
                  {t('request.request_id')}
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
                  {submittedComplaint.token}
                </span>
                <p className="text-xs text-amber-800 mt-1">
                  Keep this ID for tracking. VPE Operations has been notified.
                </p>
              </div>
              <Badge variant="amber" className="text-sm font-semibold py-1 px-3 self-start sm:self-auto">
                Status: {submittedComplaint.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 font-medium block">Company / Plant</span>
                <span className="text-slate-800 font-semibold">{submittedComplaint.companyName}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 font-medium block">Contact Person & Phone</span>
                <span className="text-slate-800 font-semibold">{submittedComplaint.contactPerson} ({submittedComplaint.userPhone})</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 font-medium block">Machine Issue</span>
                <span className="text-slate-800 font-semibold">{submittedComplaint.title}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 font-medium block">Problem Start Date</span>
                <span className="text-slate-800 font-semibold">{submittedComplaint.problemStartDate}</span>
              </div>
            </div>

            {submittedComplaint.voiceRecording && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-700">
                    Voice recording stored in backend (Pure audio, zero text conversion)
                  </span>
                </div>
                <audio controls src={submittedComplaint.voiceRecording} className="h-8 max-w-[200px]" />
              </div>
            )}
          </CardContent>

          <CardFooter className="bg-slate-50 p-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setSubmittedComplaint(null);
                setTitle('');
                setDescription('');
                setImages([]);
                setAttachments([]);
                setAudioUrl(null);
              }}
            >
              Submit Another Request
            </Button>
            <Link to={ROUTES.CUSTOMER.REQUESTS}>
              <Button variant="industrial" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t('request.view_dashboard')}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="amber" icon={<FilePlus className="w-3.5 h-3.5" />}>
            VPE Technical Dispatch
          </Badge>
          <span className="text-xs font-mono text-slate-500">
            Client: {currentUser.name}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('request.title')}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          {t('request.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Customer, Company & Location Details */}
        <Card variant="industrial">
          <CardHeader className="bg-slate-50 border-b border-slate-100 py-3.5 px-6">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-500" />
              <span>1. Customer & Industrial Plant Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                id="req-company"
                label={t('request.company_name')}
                required
                error={errors.companyName}
              >
                <Input
                  id="req-company"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Prasanna Agro Industries Ltd."
                  leftIcon={<Building2 className="w-4 h-4 text-slate-400" />}
                />
              </FormField>

              <FormField
                id="req-contact"
                label={t('request.contact_person')}
                required
                error={errors.contactPerson}
              >
                <Input
                  id="req-contact"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="Authorized Plant Manager / Supervisor"
                  leftIcon={<User className="w-4 h-4 text-slate-400" />}
                />
              </FormField>

              <FormField
                id="req-mobile"
                label={t('request.mobile')}
                required
                error={errors.mobile}
              >
                <Input
                  id="req-mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98765 00000"
                  leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
                />
              </FormField>

              <FormField
                id="req-industry"
                label={t('request.industry_type')}
                required
              >
                <Select
                  id="req-industry"
                  value={industryType}
                  onChange={(e) => setIndustryType(e.target.value)}
                >
                  {INDUSTRY_TYPES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </Select>
              </FormField>
            </div>

            <FormField
              id="req-location"
              label={t('request.location')}
              required
              error={errors.location}
              helperText="Exact plant location, mill shed number, or industrial zone coordinates."
            >
              <Input
                id="req-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Rice Processing Shed 2, Tadepalligudem Industrial Area, AP"
                leftIcon={<MapPin className="w-4 h-4 text-slate-400" />}
              />
            </FormField>
          </CardContent>
        </Card>

        {/* Section 2: Machine Breakdown & Issue Details */}
        <Card variant="industrial">
          <CardHeader className="bg-slate-50 border-b border-slate-100 py-3.5 px-6">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Factory className="w-4 h-4 text-amber-500" />
              <span>2. Machine Issue & Breakdown Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                id="req-category"
                label={t('request.category')}
                required
              >
                <Select
                  id="req-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField
                id="req-start-date"
                label={t('request.problem_start_date')}
                required
                error={errors.problemStartDate}
                helperText="When was the malfunction or unusual sound first observed?"
              >
                <Input
                  id="req-start-date"
                  type="date"
                  value={problemStartDate}
                  onChange={(e) => setProblemStartDate(e.target.value)}
                  leftIcon={<Calendar className="w-4 h-4 text-slate-400" />}
                />
              </FormField>
            </div>

            <FormField
              id="req-title"
              label="Machine Name / Issue Summary"
              required
              error={errors.title}
            >
              <Input
                id="req-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sortex Optical Sensor Failure on Channel 4 / Hydraulic Pressure Drop"
              />
            </FormField>

            <FormField
              id="req-desc"
              label={t('request.machine_issue')}
              required
              error={errors.description}
            >
              <Textarea
                id="req-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder={t('request.machine_issue_placeholder')}
              />
            </FormField>
          </CardContent>
        </Card>

        {/* Section 3: Voice Recording (Strict 6-Step Industrial Workflow) */}
        <VoiceRecorder
          audioUrl={audioUrl}
          onAudioChange={setAudioUrl}
        />

        {/* Section 4: Photo / Video / Document Attachments */}
        <Card variant="industrial">
          <CardHeader className="bg-slate-50 border-b border-slate-100 py-3.5 px-6">
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-amber-500" />
              <span>{t('request.attachments')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50/70 transition-colors">
              <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">
                {t('request.attachments_help')}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Upload up to 5 files (Max 20MB per file: JPG, PNG, MP4 video, PDF).
              </p>
              <label className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer shadow-sm">
                <Paperclip className="w-3.5 h-3.5" />
                <span>Select Photos / Videos / Docs</span>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Attachments Preview List */}
            {attachments.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-700 block">
                  Attached Files ({attachments.length}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {attachments.map((att) => (
                    <div
                      key={att.id}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        {att.type === 'image' && <ImageIcon className="w-4 h-4 text-blue-500 shrink-0" />}
                        {att.type === 'video' && <Video className="w-4 h-4 text-purple-500 shrink-0" />}
                        {att.type === 'document' && <FileText className="w-4 h-4 text-amber-500 shrink-0" />}
                        <span className="truncate font-medium text-slate-800">{att.name}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">({att.size})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(att.id)}
                        className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                        title="Remove attachment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Live SLA Guarantee: </span>
            A certified VPE field engineer is scheduled based on urgency and machine status.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link to={ROUTES.CUSTOMER.DASHBOARD} className="flex-1 sm:flex-none">
              <Button type="button" variant="outline" size="md" className="w-full justify-center">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="industrial"
              size="md"
              disabled={isSubmitting}
              leftIcon={<FilePlus className="w-4 h-4" />}
              className="flex-1 sm:flex-none justify-center cursor-pointer font-bold shadow-md"
            >
              {isSubmitting ? t('request.submitting') : t('request.submit_btn')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
