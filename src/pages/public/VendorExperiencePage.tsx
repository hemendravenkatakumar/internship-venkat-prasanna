import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Container,
  SectionHeading,
  Button,
  Badge,
} from '@/components/common';
import {
  RegistrationCard,
  VendorRegistrationData,
  ExperienceCard,
  ServiceExperienceData,
} from '@/components/vendor';
import { VPE_COMPANIES } from '@/data/vpeCompanies';
import { useLanguage } from '@/context/LanguageContext';
import {
  ShieldCheck,
  Wrench,
  ArrowRight,
  Phone,
  Building2,
  CheckCircle2,
  FileCheck,
  AlertCircle,
  Clock,
  UserCheck,
} from 'lucide-react';

/* ==========================================================================
 * VENDOR REGISTRATIONS & STATUTORY DATA
 * ========================================================================== */

const APPROVED_REGISTRATIONS: VendorRegistrationData[] = [
  {
    id: 'reg-gst',
    title: 'Goods & Services Tax (GST) Registration',
    registrationType: 'Statutory Taxation',
    issuingAuthority: 'Government of India / State Tax Department',
    registrationNumber: 'GSTIN: 37ADYPY2158A1Z1',
    status: 'Active Record',
    description:
      'Statutory compliance for inter-state and intra-state commercial industrial service contracting, equipment servicing billing, and input tax credit compliance.',
    hasDocument: false,
    documentLabel: 'View GST Certificate',
  },
  {
    id: 'reg-msme',
    title: 'MSME / Udyam Enterprise Registration',
    registrationType: 'Enterprise Recognition',
    issuingAuthority: 'Ministry of Micro, Small and Medium Enterprises',
    registrationNumber: 'Udyam Registration on Record (Verified by Administration)',
    status: 'Active Record',
    description:
      'Registered under industrial machine maintenance, repair, and technical plant engineering service activities under the Micro, Small and Medium Enterprises framework.',
    hasDocument: false,
    documentLabel: 'View Udyam Certificate',
  },
  {
    id: 'reg-commercial',
    title: 'Industrial Service Vendor Commercial Registration',
    registrationType: 'Commercial Operations',
    issuingAuthority: 'Local Municipal & Industrial Regulatory Body',
    registrationNumber: 'Commercial Establishment Record on File',
    status: 'Verified',
    description:
      'Formal enterprise establishment for executing on-site plant maintenance, machinery overhauls, and annual maintenance contracts for manufacturing entities.',
    hasDocument: false,
    documentLabel: 'View Establishment Record',
  },
  {
    id: 'reg-safety',
    title: 'Industrial Safety & Compliance Undertaking',
    registrationType: 'Safety & Environmental',
    issuingAuthority: 'Plant Safety & Industrial Standards Guidelines',
    registrationNumber: 'Safety Protocol Undertaking Documentation',
    status: 'Active Record',
    description:
      'Standardized field engineering safety procedures covering Personal Protective Equipment (PPE), Lock-Out/Tag-Out (LOTO) isolation, and on-site electrical safety clearances.',
    hasDocument: false,
    documentLabel: 'View Safety Undertaking',
  },
];

const SERVICE_EXPERIENCES: ServiceExperienceData[] = [
  {
    id: 'exp-rice-mill',
    category: 'Rice Mill Line Overhaul & Alignment',
    sector: 'Rice Processing Industry',
    serviceType: 'On-Site Overhaul',
    scopeSummary:
      'Executed pre-season mechanical overhauls and dynamic balancing for high-capacity rice processing lines operating under abrasive husk dust conditions.',
    machineryHandled: [
      'Rubber Roll De-hullers',
      'Paddy Separators',
      'Emery Cone Polishers',
      'Grain Bucket Elevators',
      'Sortex Cyclone Blowers',
    ],
    executionScope: [
      'Shaft alignment and heavy bearing replacements',
      'Husk suction blower impeller balancing and vibration reduction',
      'Elevator belt retensioning and pulley alignment',
      'Post-service test run verification under operational grain load',
    ],
    documentationStatus: 'Work Order & Test Log Filed',
  },
  {
    id: 'exp-textile',
    category: 'Textile Spinning Frame & Loom Maintenance',
    sector: 'Textile & Cloth Manufacturing',
    serviceType: 'Electromechanical Service',
    scopeSummary:
      'Preventive motor de-linting, stator thermal checks, and high-speed spindle bearing renewals in high-humidity ambient shed conditions.',
    machineryHandled: [
      'Ring Spinning Frames',
      'Rapier Weaving Looms',
      'Air-Jet Weaving Machines',
      'Auto-Coner Winders',
      'Motor Control Panels',
    ],
    executionScope: [
      'Motor stator insulation resistance (megger) testing',
      'Precision spindle drive alignment and run-out checking',
      'Gearbox oil change, flush, and seal renewal',
      'Panel contactor retorquing and thermal scan validation',
    ],
    documentationStatus: 'Inspection Checklist & Field Log Active',
  },
  {
    id: 'exp-cashew',
    category: 'Cashew Boiler & Processing Line Servicing',
    sector: 'Cashew Processing Industry',
    serviceType: 'Mechanical & Steam Service',
    scopeSummary:
      'Scheduled maintenance on corrosive CNSL liquid contact assemblies, steam line manifolds, and automatic shelling units.',
    machineryHandled: [
      'Raw Nut Steam Cookers',
      'Automatic Shelling Cutters',
      'Borma Hot Air Dryers',
      'Peeling Drums',
      'Grading Sifters',
    ],
    executionScope: [
      'CNSL-resistant bearing replacement on cutting assemblies',
      'Steam valve packing renewal and boiler manifold inspection',
      'Automatic cutter blade alignment and drive chain adjustment',
      'Heating coil cleaning and temperature sensor calibration',
    ],
    documentationStatus: 'Maintenance Log on Record',
  },
  {
    id: 'exp-compressor',
    category: 'Industrial Air Compressor & Gas System Maintenance',
    sector: 'Heavy Utilities & Cold Storage',
    serviceType: 'Pressure & Overhaul Service',
    scopeSummary:
      'Complete diagnostic servicing for screw compressors, refrigeration chillers, and ammonia pipeline safety manifolds.',
    machineryHandled: [
      'Rotary Screw Air Compressors',
      'Ammonia Refrigeration Compressors',
      'Air Dryers & Desiccant Towers',
      'Pressure Safety Relief Valves',
      'Chilled Water Pumps',
    ],
    executionScope: [
      'Compressor valve plate overhaul and clearance tuning',
      'Ammonia refrigerant leak detection and manifold pressure testing',
      'Oil separator element replacement and lubricant filtration',
      'Safety relief valve pressure threshold verification',
    ],
    documentationStatus: 'Compliance Test Certificate Logged',
  },
];

export const VendorExperiencePage: FC = () => {
  const { t, language } = useLanguage();
  const isTe = language === 'te';

  // 11 confirmed vendor registration companies from Word document
  const confirmedCompanies = VPE_COMPANIES.filter((c) => c.isVendorRegistered);

  return (
    <>
      {/* ================================================================
          SECTION 1: PAGE HERO
          ================================================================ */}
      <section
        aria-labelledby="vendor-hero-title"
        className="bg-slate-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="vendor-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vendor-grid)" />
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
                <li className="text-amber-400 font-semibold">{t('nav.vendor_experience')}</li>
              </ol>
            </nav>

            <div className="max-w-3xl space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="amber" icon={<FileCheck className="w-3 h-3" />}>
                  {isTe ? 'అధికారిక చట్టబద్ధ రికార్డులు' : 'Statutory & Commercial Compliance'}
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  GSTIN: 37ADYPY2158A1Z1
                </span>
              </div>

              <h1
                id="vendor-hero-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
              >
                {t('vendor.page_title')}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {t('vendor.page_subtitle')}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                  <Button
                    variant="industrial"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    {t('home.cta_request')}
                  </Button>
                </Link>
                <Link to={ROUTES.PUBLIC.INDUSTRIES}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                  >
                    {t('nav.industries')} (26)
                  </Button>
                </Link>
                <Link to={ROUTES.PUBLIC.CONTACT}>
                  <Button
                    variant="ghost"
                    size="lg"
                    leftIcon={<Phone className="w-4 h-4" />}
                    className="text-slate-300 hover:text-white hover:bg-white/10"
                  >
                    {t('home.call_desk')}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>GSTIN Registered Enterprise (37ADYPY2158A1Z1)</span>
                </div>
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Founder & Lead Engineer: Y Srinivas (+91 9866227780)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>11 Confirmed Corporate & Plant Vendor Registrations</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 2: CONFIRMED VENDOR REGISTRATIONS (11 COMPANIES)
          ================================================================ */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge={isTe ? 'ధృవీకరించబడిన క్లయింట్లు' : 'Verified Vendor Empanelment'}
            title={t('vendor.experience_title')}
            subtitle={t('vendor.experience_subtitle')}
            align="left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {confirmedCompanies.map((c) => (
              <div
                key={c.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-emerald-400 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">
                      {isTe ? c.sectorTe : c.sector}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Completed</span>
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 pt-1">
                    {isTe ? c.nameTe : c.name}
                  </h4>
                </div>

                <div className="pt-4 border-t border-slate-200/60 mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{t('companies.experience')}:</span>
                  {c.experience ? (
                    <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {isTe ? c.experienceTe : c.experience}
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">Established</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 3: STATUTORY & TAXATION REGISTRATION CARDS
          ================================================================ */}
      <section aria-labelledby="approved-registrations-title" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge="Official Credentials"
            title="Approved Registrations & Compliance Records"
            subtitle="Verified statutory filings and administrative credentials enabling formal commercial operations."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {APPROVED_REGISTRATIONS.map((reg) => (
              <RegistrationCard key={reg.id} registration={reg} />
            ))}
          </div>

          <div className="mt-8 bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 sm:p-5 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              <strong>Administrative Verification Note:</strong> Official GST certificate copies (GSTIN: 37ADYPY2158A1Z1),
              commercial invoices, and bank mandate documentation are provided by Founder Y Srinivas (venkataprasannaenterprises@gmail.com)
              to authorized procurement departments.
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 4: COMPANY EXPERIENCE & TECHNICAL SCOPE
          ================================================================ */}
      <section aria-labelledby="experience-title" className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge="Field Track Record"
            title="Industrial Service Experience & Work Capabilities"
            subtitle="Demonstrated technical execution across key manufacturing sectors. In adherence with corporate non-disclosure standards, scopes of work are presented by machinery classification."
            align="left"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {SERVICE_EXPERIENCES.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 5: PRIMARY SERVICE REQUEST CALL TO ACTION
          ================================================================ */}
      <section aria-labelledby="vendor-cta-title" className="py-16 sm:py-20 bg-slate-900 text-white">
        <Container size="2xl">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="amber" icon={<Wrench className="w-3 h-3" />}>
              {t('home.cta_badge')}
            </Badge>

            <h2
              id="vendor-cta-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
            >
              Deploy VPE for Your Plant&apos;s Next Maintenance Requirement
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Whether you need urgent breakdown diagnostics, scheduled preventive
              servicing, or a seasonal machinery overhaul, our qualified engineering
              team is prepared for rapid on-site mobilization.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                <Button
                  variant="industrial"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  {t('request.submit_btn')}
                </Button>
              </Link>
              <Link to={ROUTES.PUBLIC.SERVICES}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                >
                  {t('home.cta_explore')}
                </Button>
              </Link>
              <Link to={ROUTES.PUBLIC.CONTACT}>
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Phone className="w-4 h-4" />}
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                >
                  {t('home.get_in_touch')}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 6: CORPORATE CONTACT & EMPANELMENT CTA
          ================================================================ */}
      <section aria-labelledby="empanelment-cta-title" className="py-14 sm:py-18 bg-white border-t border-slate-200">
        <Container size="2xl">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-3">
                <Badge variant="outline" icon={<Building2 className="w-3 h-3" />}>
                  Procurement & Corporate Vendor Empanelment
                </Badge>
                <h3 id="empanelment-cta-title" className="text-xl sm:text-2xl font-bold text-slate-900">
                  Require Formal Vendor Registration Documents for Your Plant?
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Our administrative office provides complete vendor registration dossiers
                  including GST certificates (37ADYPY2158A1Z1), MSME memorandums, bank mandates, and safety
                  undertakings to procurement teams initiating formal supplier onboarding.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Link to={ROUTES.PUBLIC.CONTACT} className="w-full sm:w-auto">
                  <Button variant="primary" size="md" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                    {t('home.get_in_touch')}
                  </Button>
                </Link>
                <Link to={ROUTES.PUBLIC.ABOUT} className="w-full sm:w-auto">
                  <Button variant="secondary" size="md" fullWidth>
                    {t('home.about_learn_more')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
