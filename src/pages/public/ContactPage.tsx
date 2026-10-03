import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Container,
  SectionHeading,
  Button,
  Badge,
  Card,
  CardContent,
} from '@/components/common';
import { ContactForm } from '@/components/contact';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Wrench,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileText,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const ContactPage: FC = () => {
  // State simulation for form state preview (Loading, Error) for developers
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  return (
    <>
      {/* ================================================================
          SECTION 1: HERO & BREADCRUMB
          Contact positioning and primary CTAs.
          ================================================================ */}
      <section
        aria-labelledby="contact-hero-title"
        className="bg-slate-900 text-white relative overflow-hidden"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contact-grid" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contact-grid)" />
          </svg>
        </div>

        <Container size="2xl">
          <div className="relative z-10 py-14 sm:py-18 lg:py-22">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-slate-400">
                <li>
                  <Link to={ROUTES.PUBLIC.HOME} className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-amber-400 font-semibold">Contact & Dispatch</li>
              </ol>
            </nav>

            <div className="max-w-3xl space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="amber" icon={<Phone className="w-3 h-3" />}>
                  Field Operations & Dispatch Desk
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  Direct Engineering Communication
                </span>
              </div>

              <h1
                id="contact-hero-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
              >
                Contact &{' '}
                <span className="text-amber-400">Field Service Dispatch</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Connect directly with Venkata Prasanna Enterprises for on-site machinery
                maintenance, emergency breakdown dispatch, Annual Maintenance Contracts,
                and corporate vendor empanelment.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                  <Button
                    variant="industrial"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Submit Service Request Form
                  </Button>
                </Link>
                <a href="#enquiry-form-section">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                  >
                    Send Direct Enquiry
                  </Button>
                </a>
                <Link to={ROUTES.PUBLIC.SERVICES}>
                  <Button
                    variant="ghost"
                    size="lg"
                    leftIcon={<Wrench className="w-4 h-4" />}
                    className="text-slate-300 hover:text-white hover:bg-white/10"
                  >
                    Explore Service Scope
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Operating Strip */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Prompt field technician dispatch for plant breakdowns</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>On-site assessments across Rice, Textile & Cashew mills</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Formal documentation for corporate vendor onboarding</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 2: CONTACT DETAILS & ENQUIRY FORM GRID
          Two-column layout: Company Details + Validated Enquiry Form.
          ================================================================ */}
      <section id="enquiry-form-section" aria-labelledby="contact-grid-title" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-24">
        <Container size="2xl">
          <SectionHeading
            badge="Direct Inquiries"
            title="Get in Touch with Our Engineering Team"
            subtitle="Submit an equipment service enquiry or reach out through our operational communication channels."
            align="left"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column (5 cols): Official Company Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              {/* Primary Contact Details Card */}
              <Card variant="default">
                <CardContent className="p-6 sm:p-7 space-y-6">
                  <div>
                    <Badge variant="amber">Enterprise Identity</Badge>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
                      Venkata Prasanna Enterprises
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Industrial Equipment Service & Maintenance Management
                    </p>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-700 divide-y divide-slate-100">
                    {/* Location Information */}
                    <div className="flex items-start gap-3.5 pt-3 first:pt-0">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">Service Base & Location</span>
                        <p className="text-slate-600 leading-relaxed">
                          Industrial Area, Operational Service Center
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          Exact facility municipal address updated upon administrative confirmation
                        </p>
                      </div>
                    </div>

                    {/* Phone / Contact Channel */}
                    <div className="flex items-start gap-3.5 pt-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                        <Phone className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">Phone & Emergency Dispatch</span>
                        <p className="text-slate-600 leading-relaxed font-mono">
                          Direct phone channel active during operational hours
                        </p>
                        <p className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                          Official direct line on file / Contact via Enquiry Form
                        </p>
                      </div>
                    </div>

                    {/* Official Email */}
                    <div className="flex items-start gap-3.5 pt-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">Official Email Communication</span>
                        <a
                          href="mailto:support@venkataprasannaenterprises.com"
                          className="text-amber-700 hover:text-amber-800 font-medium font-mono text-xs break-all underline underline-offset-2"
                        >
                          support@venkataprasannaenterprises.com
                        </a>
                        <p className="text-[11px] text-slate-400">
                          For commercial RFPs, AMC inquiries, and vendor registrations
                        </p>
                      </div>
                    </div>

                    {/* Operating Hours */}
                    <div className="flex items-start gap-3.5 pt-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">Operating Hours & Availability</span>
                        <p className="text-slate-600">
                          General Consultation: Mon – Sat, 08:00 – 19:00
                        </p>
                        <p className="text-slate-600 font-medium text-[11px] text-emerald-700">
                          Emergency Breakdown Dispatch: Priority coverage for critical line shutdowns
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fast Service Request Banner Card */}
              <Card variant="industrial" className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Wrench className="w-5 h-5 text-amber-600" />
                  <h4>Have an Immediate Machine Failure?</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  For active machine breakdowns requiring prompt on-site engineering triage,
                  submit a dedicated Service Request ticket with machine serial numbers and symptoms.
                </p>
                <div className="pt-1">
                  <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                    <Button variant="industrial" size="sm" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Create Service Request Ticket
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Vendor Empanelment Note */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Corporate Procurement & Empanelment</span>
                </div>
                <p className="leading-relaxed">
                  Plant procurement teams requiring statutory GST filings, Udyam certificates,
                  or formal vendor registration dossiers can request onboarding packets via the
                  enquiry form.
                </p>
                <Link
                  to={ROUTES.PUBLIC.VENDOR_EXPERIENCE}
                  className="text-amber-700 font-semibold hover:text-amber-800 inline-flex items-center gap-1 mt-1 underline underline-offset-2"
                >
                  <span>Review Vendor Registrations</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Right Column (7 cols): Validated Contact & Enquiry Form */}
            <div className="lg:col-span-7 space-y-4">
              {/* Developer State Switcher for Verification of Form States */}
              <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-xs shadow-xs">
                <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                  Form State Simulation:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormLoading(false);
                      setFormError(null);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      !formLoading && !formError ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormLoading(true);
                      setFormError(null);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      formLoading ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Loading
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormLoading(false);
                      setFormError('Simulated network transmission error. Please retry submission.');
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      formError ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Error State
                  </button>
                </div>
              </div>

              {/* The Actual ContactForm Component */}
              <ContactForm
                externalLoading={formLoading}
                externalError={formError}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 3: PRIMARY SERVICE REQUEST CALL TO ACTION
          Direct conversion guiding users to the request submission route.
          ================================================================ */}
      <section aria-labelledby="service-request-banner" className="py-16 sm:py-20 bg-slate-900 text-white">
        <Container size="2xl">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="amber" icon={<Wrench className="w-3 h-3" />}>
              Dedicated Service Portal
            </Badge>

            <h2
              id="service-request-banner"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
            >
              Ready to Book On-Site Machine Maintenance?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Skip general enquiry and submit a formal service request directly.
              Our engineering team prepares an itemized diagnostic and travel estimate
              prior to dispatch.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                <Button
                  variant="industrial"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Submit Formal Service Request
                </Button>
              </Link>
              <Link to={ROUTES.PUBLIC.SERVICE_CHARGES}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                >
                  Review Service Tariffs
                </Button>
              </Link>
              <Link to={ROUTES.PUBLIC.ABOUT}>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-slate-300 hover:text-white hover:bg-white/10"
                >
                  About VPE Engineering
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 4: FAQ & CLARIFICATION STRIP
          ================================================================ */}
      <section aria-labelledby="faq-title" className="py-14 sm:py-18 bg-white border-t border-slate-200">
        <Container size="2xl">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <h3 id="faq-title" className="text-xl sm:text-2xl font-bold text-slate-900">
                Frequently Asked Dispatch Questions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm text-slate-700">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900">How quickly can an engineer mobilize?</h4>
                <p className="text-slate-600 leading-relaxed">
                  For emergency breakdown calls involving complete line shutdowns,
                  technicians are mobilized on priority based on distance slab from our
                  operational base. Scheduled maintenance is booked in advance.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900">What information is needed for quotation?</h4>
                <p className="text-slate-600 leading-relaxed">
                  Plant location, machinery type/model, observed symptoms (e.g. vibration,
                  motor trip, seized shaft), and service urgency. Itemized estimates are
                  provided before dispatch.
                </p>
              </div>
            </div>

            <div className="mt-4 bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <strong>Confidentiality Note:</strong> All client facility details, machine serials,
                and technical operating parameters submitted through this portal are treated as
                confidential industrial property.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer rendered by PublicLayout */}
    </>
  );
};
