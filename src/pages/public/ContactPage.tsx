import { FC } from 'react';
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
import { useLanguage } from '@/context/LanguageContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Wrench,
  ArrowRight,
  ShieldCheck,
  Building2,
  UserCheck,
  FileCheck,
} from 'lucide-react';

export const ContactPage: FC = () => {
  const { t, language } = useLanguage();
  const isTe = language === 'te';

  return (
    <>
      {/* ================================================================
          SECTION 1: HERO & BREADCRUMB
          ================================================================ */}
      <section
        aria-labelledby="contact-hero-title"
        className="bg-slate-900 text-white relative overflow-hidden"
      >
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
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-slate-400">
                <li>
                  <Link to={ROUTES.PUBLIC.HOME} className="hover:text-white transition-colors">
                    {t('nav.home')}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-amber-400 font-semibold">{t('nav.contact')}</li>
              </ol>
            </nav>

            <div className="max-w-3xl space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="amber" icon={<Phone className="w-3 h-3" />}>
                  {isTe ? 'ఆపరేషన్స్ & సర్వీస్ డెస్క్' : 'Field Operations & Dispatch Desk'}
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  +91 9866227780
                </span>
              </div>

              <h1
                id="contact-hero-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
              >
                {t('contact.page_title')}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {t('contact.page_subtitle')}
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                  <Button
                    variant="industrial"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    {t('request.submit_btn')}
                  </Button>
                </Link>
                <a href="#enquiry-form-section">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                  >
                    {isTe ? 'విచారణ ఫారమ్' : 'Send Direct Enquiry'}
                  </Button>
                </a>
                <Link to={ROUTES.PUBLIC.SERVICES}>
                  <Button
                    variant="ghost"
                    size="lg"
                    leftIcon={<Wrench className="w-4 h-4" />}
                    className="text-slate-300 hover:text-white hover:bg-white/10"
                  >
                    {t('home.cta_explore')}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>{t('company.support_availability')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>GSTIN Registered Enterprise (37ADYPY2158A1Z1)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>26 Verified Industrial Client Records Across Key Sectors</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 2: CONTACT DETAILS & ENQUIRY FORM GRID
          ================================================================ */}
      <section id="enquiry-form-section" aria-labelledby="contact-grid-title" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-24">
        <Container size="2xl">
          <SectionHeading
            badge={isTe ? 'నేరుగా సంప్రదించండి' : 'Direct Inquiries'}
            title={isTe ? 'మా ఇంజనీరింగ్ బృందాన్ని సంప్రదించండి' : 'Get in Touch with Our Engineering Team'}
            subtitle={isTe ? 'యంత్ర సమస్యల గురించి లేదా సేవా విచారణల గురించి నేరుగా సంప్రదించండి.' : 'Submit an equipment service enquiry or reach out through our operational communication channels.'}
            align="left"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column (5 cols): Official Company Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <Card variant="default">
                <CardContent className="p-6 sm:p-7 space-y-6">
                  <div>
                    <Badge variant="amber">{isTe ? 'సంస్థ వివరాలు' : 'Enterprise Identity'}</Badge>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
                      Venkata Prasanna Enterprises
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Industrial Service & Maintenance Management
                    </p>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-700 divide-y divide-slate-100">
                    {/* Location */}
                    <div className="flex items-start gap-3.5 pt-3 first:pt-0">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">{t('contact.location_title')}</span>
                        <p className="text-slate-700 font-medium">
                          Andhra Pradesh, India
                        </p>
                      </div>
                    </div>

                    {/* Phone / Contact Channel */}
                    <div className="flex items-start gap-3.5 pt-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                        <Phone className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">{t('contact.phone_title')}</span>
                        <a
                          href="tel:+919866227780"
                          className="text-amber-800 font-mono font-bold text-base hover:text-amber-900 block"
                        >
                          +91 9866227780
                        </a>
                        <p className="text-[11px] text-slate-500">
                          {isTe ? 'కాల్ లేదా వాట్సాప్ ద్వారా సంప్రదించవచ్చు' : 'Available for phone calls & technical dispatch'}
                        </p>
                      </div>
                    </div>

                    {/* Official Email */}
                    <div className="flex items-start gap-3.5 pt-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">{t('contact.email_title')}</span>
                        <a
                          href="mailto:venkataprasannaenterprises@gmail.com"
                          className="text-amber-700 hover:text-amber-800 font-medium font-mono text-xs break-all underline underline-offset-2"
                        >
                          venkataprasannaenterprises@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Founder & Lead Engineer */}
                    <div className="flex items-start gap-3.5 pt-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                        <UserCheck className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">{t('company.founder_title')}</span>
                        <p className="text-slate-800 font-bold">
                          {t('company.founder')}
                        </p>
                      </div>
                    </div>

                    {/* GSTIN */}
                    <div className="flex items-start gap-3.5 pt-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                        <FileCheck className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">{t('contact.gstin_title')}</span>
                        <p className="text-slate-900 font-mono font-bold">
                          37ADYPY2158A1Z1
                        </p>
                      </div>
                    </div>

                    {/* Operating Hours */}
                    <div className="flex items-start gap-3.5 pt-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">{isTe ? 'సేవా లభ్యత' : 'Service Availability'}</span>
                        <p className="text-slate-600 font-medium text-xs text-emerald-700">
                          {t('company.support_availability')}
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
                  <h4>{isTe ? 'తక్షణ యంత్ర సమస్య ఎదురైందా?' : 'Have an Immediate Machine Failure?'}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isTe
                    ? 'మెషిన్ సమస్య, ఫోటోలు లేదా ఆడియో రికార్డింగ్‌తో వెంటనే సర్వీస్ అభ్యర్థన టికెట్ సృష్టించండి.'
                    : 'For active machine breakdowns requiring prompt on-site engineering triage, submit a dedicated Service Request ticket with machine serial numbers and symptoms.'}
                </p>
                <div className="pt-1">
                  <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                    <Button variant="industrial" size="sm" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                      {t('request.submit_btn')}
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            {/* Right Column (7 cols): Validated Contact & Enquiry Form */}
            <div className="lg:col-span-7 space-y-4">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
