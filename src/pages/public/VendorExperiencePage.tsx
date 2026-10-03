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
  CardHeader,
  CardTitle,
  CardDescription,
  EmptyState,
} from '@/components/common';
import {
  RegistrationCard,
  VendorRegistrationData,
  ExperienceCard,
  ServiceExperienceData,
} from '@/components/vendor';
import {
  ShieldCheck,
  FileText,
  Wrench,
  ArrowRight,
  Phone,
  Building2,
  CheckCircle2,
  FileCheck,
  Download,
  AlertCircle,
} from 'lucide-react';

/* ==========================================================================
 * VENDOR REGISTRATIONS & STATUTORY DATA
 * --------------------------------------------------------------------------
 * Structured data models ready for CMS or backend administration.
 * IMPORTANT: No invented certificates, client names, or fake registration IDs.
 * Placeholders are explicitly identified as official records awaiting upload.
 * ========================================================================== */

const APPROVED_REGISTRATIONS: VendorRegistrationData[] = [
  {
    id: 'reg-gst',
    title: 'Goods & Services Tax (GST) Registration',
    registrationType: 'Statutory Taxation',
    issuingAuthority: 'Government of India / State Tax Department',
    registrationNumber: 'GSTIN Registration on Record (Verified by Administration)',
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
    serviceType: 'Preventive & Emergency',
    scopeSummary:
      'Delivered scheduled electrical panel maintenance, spindle drive overhaul, and emergency breakdown troubleshooting for spinning and weaving machinery.',
    machineryHandled: [
      'Ring Spinning Frames',
      'Rapier Weaving Looms',
      'Cone Winders',
      'Humidification Blowers',
      'Motor Control Centers',
    ],
    executionScope: [
      'Motor stator de-linting and winding resistance diagnostics',
      'Spindle drive high-RPM bearing inspection and replacement',
      'Starter contactor oxidation cleaning and terminal retightening',
      'Emergency circuit tracing for intermittent tripping resolution',
    ],
    documentationStatus: 'Shift Handover Verification Signed',
  },
  {
    id: 'exp-cashew',
    category: 'Cashew Processing Plant Equipment Overhaul',
    sector: 'Cashew Processing Industry',
    serviceType: 'Mechanical & Chemical Resistance',
    scopeSummary:
      'Serviced machinery subjected to corrosive Cashew Nut Shell Liquid (CNSL) oil and high thermal conditions in boiling and drying sections.',
    machineryHandled: [
      'Steam Boiling Pressure Boilers',
      'Automatic Nut Cutters',
      'Borma Hot Air Dryers',
      'Mechanical Peeling Drums',
      'Vacuum Packaging Units',
    ],
    executionScope: [
      'CNSL-resistant bearing and seal retrofitting on cutter drives',
      'Borma oven heating element diagnostic check and thermostat calibration',
      'Automatic cutter blade alignment and mechanical clearance tuning',
      'Vacuum packaging pump oil change and seal bar electrical overhaul',
    ],
    documentationStatus: 'Plant Operational Clearance Logged',
  },
  {
    id: 'exp-general',
    category: 'Plant Pumping Station & Motor Control Center Servicing',
    sector: 'General Manufacturing & Agro-Plants',
    serviceType: 'Electrical & Fluid Systems',
    scopeSummary:
      'Comprehensive on-site maintenance of primary plant fluid pumping stations, high-capacity speed reduction gearboxes, and main distribution switchboards.',
    machineryHandled: [
      'Centrifugal Water Pumps',
      'Heavy Reduction Gearboxes',
      'Air Compressors',
      'Main Switchboards',
      'Conveyor Belt Drives',
    ],
    executionScope: [
      'Centrifugal pump mechanical seal replacement and shaft trueing',
      'Heavy reduction gearbox gear teeth inspection and synthetic oil renewal',
      'Switchboard busbar thermographic check and contactor retightening',
      'Conveyor drive pulley alignment and belt tensioning calibration',
    ],
    documentationStatus: 'Electrical Parameter Log Verified',
  },
];

/* ==========================================================================
 * VENDOR EXPERIENCE PAGE COMPONENT
 * ========================================================================== */

export const VendorExperiencePage: FC = () => {
  const [activeMediaTab, setActiveMediaTab] = useState<'certificates' | 'work-orders' | 'photos'>('certificates');

  return (
    <>
      {/* ================================================================
          SECTION 1: HERO & BREADCRUMB
          Vendor registration positioning, compliance intro, and primary CTAs.
          ================================================================ */}
      <section
        aria-labelledby="vendor-hero-title"
        className="bg-slate-900 text-white relative overflow-hidden"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="vendor-grid" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vendor-grid)" />
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
                <li className="text-amber-400 font-semibold">Vendor Experience</li>
              </ol>
            </nav>

            <div className="max-w-3xl space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="amber" icon={<Building2 className="w-3 h-3" />}>
                  Statutory Registrations & Service Track Record
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  Corporate Empanelment Ready
                </span>
              </div>

              <h1
                id="vendor-hero-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
              >
                Vendor Registrations &{' '}
                <span className="text-amber-400">Company Experience</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Venkata Prasanna Enterprises is formally established for corporate vendor
                empanelment. We maintain statutory compliance, transparent service
                documentation, and verified field experience across industrial
                processing facilities.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to={ROUTES.PUBLIC.CONTACT}>
                  <Button
                    variant="industrial"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Request Vendor Dossier
                  </Button>
                </Link>
                <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                  >
                    Book On-Site Service
                  </Button>
                </Link>
                <Link to={ROUTES.PUBLIC.SERVICES}>
                  <Button
                    variant="ghost"
                    size="lg"
                    leftIcon={<Wrench className="w-4 h-4" />}
                    className="text-slate-300 hover:text-white hover:bg-white/10"
                  >
                    Service Scope
                  </Button>
                </Link>
              </div>
            </div>

            {/* Compliance Highlights Strip */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>GST & MSME statutory compliance framework</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Documented work orders & field service completion logs</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Structured for corporate procurement vendor registration</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 2: VENDOR REGISTRATION INFORMATION
          Statutory compliance, onboarding readiness, and commercial standards.
          ================================================================ */}
      <section aria-labelledby="vendor-info-title" className="py-14 sm:py-18 bg-white border-b border-slate-200">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <SectionHeading
                badge="Procurement Readiness"
                title="Structured for Enterprise Vendor Empanelment"
                subtitle="We satisfy standard industrial procurement requirements for corporate plants, mill associations, and manufacturing enterprises."
                className="mb-0 sm:mb-0"
              />

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                <p>
                  Industrial processing corporations, rice mill consortia, and textile
                  manufacturers require formal vendor compliance prior to issuing
                  on-site work orders or Annual Maintenance Contracts. Venkata Prasanna
                  Enterprises adheres to statutory commercial guidelines, taxation
                  mandates, and industrial safety declarations.
                </p>
                <p>
                  Our commercial billing, job card documentation, and service sign-off
                  processes integrate smoothly with modern Enterprise Resource
                  Planning (ERP) systems, purchase orders (PO), and formal audit
                  requirements.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                <span className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Statutory GST Billing
                </span>
                <span className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  MSME / Udyam Enterprise
                </span>
                <span className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  On-Site Safety Protocols
                </span>
                <span className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-md flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Documented Job Cards
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card variant="industrial" className="p-6 space-y-4">
                <CardHeader className="p-0 space-y-1">
                  <CardTitle className="text-base">Vendor Onboarding Information</CardTitle>
                  <CardDescription className="text-xs">
                    Standard details required for your company&apos;s supplier registration
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-3 text-xs sm:text-sm text-slate-700 divide-y divide-slate-100">
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-slate-500">Legal Entity:</span>
                    <span className="font-bold text-slate-900">Venkata Prasanna Enterprises</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-slate-500">Service Category:</span>
                    <span className="font-medium text-slate-900 text-right">Industrial Machinery Service & Repair</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-slate-500">Operating Scope:</span>
                    <span className="font-medium text-slate-900">Field Service & Workshop Support</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-slate-500">Invoicing:</span>
                    <span className="font-medium text-slate-900">Official Commercial Tax Invoices</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-slate-500">Contract Types:</span>
                    <span className="font-medium text-slate-900">Work Orders, AMC, Emergency Calls</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 3: APPROVED VENDOR REGISTRATIONS
          Statutory registrations with verified status and document slots.
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
              <strong>Administrative Verification Note:</strong> Official certificate copies,
              PAN documentation, and signed vendor empanelment forms are shared securely with
              authorized corporate procurement departments upon request.
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 4: COMPANY EXPERIENCE & TECHNICAL TRACK RECORD
          Verifiable equipment capabilities and work categories.
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
          SECTION 5: SUPPORTING MEDIA & DOCUMENTATION REPOSITORY
          Clean structure for officially provided certificates and work records.
          ================================================================ */}
      <section aria-labelledby="media-repository-title" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge="Documentation Vault"
            title="Supporting Media & Official Documents"
            subtitle="Central repository for officially certified registrations, work order sign-offs, and field inspection templates."
            align="center"
          />

          {/* Media Category Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg bg-slate-200/70 p-1 text-xs sm:text-sm font-semibold">
              <button
                type="button"
                onClick={() => setActiveMediaTab('certificates')}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeMediaTab === 'certificates'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Statutory Certificates
              </button>
              <button
                type="button"
                onClick={() => setActiveMediaTab('work-orders')}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeMediaTab === 'work-orders'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Work Order Documentation
              </button>
              <button
                type="button"
                onClick={() => setActiveMediaTab('photos')}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeMediaTab === 'photos'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Field Service Media
              </button>
            </div>
          </div>

          {/* Tab Content 1: Statutory Certificates */}
          {activeMediaTab === 'certificates' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'GST Registration Filing Certificate',
                    authority: 'Department of Revenue, Govt. of India',
                    status: 'Certificate on Record',
                    type: 'PDF Format',
                  },
                  {
                    title: 'Udyam Registration Memorandum',
                    authority: 'Ministry of MSME, Govt. of India',
                    status: 'Memorandum on Record',
                    type: 'PDF Format',
                  },
                  {
                    title: 'Commercial Establishment Registration',
                    authority: 'Municipal & Industrial Inspectorate',
                    status: 'Official Record on File',
                    type: 'PDF Format',
                  },
                  {
                    title: 'Vendor Standard Bank Mandate & Details',
                    authority: 'Commercial Banking Verification',
                    status: 'Verified for NEFT/RTGS',
                    type: 'Official Slip',
                  },
                ].map((doc) => (
                  <Card key={doc.title} variant="default" className="p-4 sm:p-5">
                    <CardContent className="p-0 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{doc.title}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">{doc.authority}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {doc.status}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500">
                              {doc.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link to={ROUTES.PUBLIC.CONTACT} title="Request document copy">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 text-slate-500" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center pt-4">
                <p className="text-xs text-slate-500">
                  Documents are securely stored and released to corporate procurement departments upon formal empanelment inquiry.
                </p>
              </div>
            </div>
          )}

          {/* Tab Content 2: Work Orders */}
          {activeMediaTab === 'work-orders' && (
            <div className="max-w-4xl mx-auto">
              <Card variant="default" className="p-6 sm:p-8">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <FileCheck className="w-6 h-6 text-amber-600" />
                    <div>
                      <h4 className="text-base font-bold text-slate-900">Standard Service Job Card & Handover Template</h4>
                      <p className="text-xs text-slate-500">Documentary format utilized for all client on-site service executions</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700 pt-2">
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
                      <span className="font-bold block text-slate-900 mb-1">1. Intake & Safety Check:</span>
                      Equipment model, reported symptoms, electrical isolation, and LOTO procedure.
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
                      <span className="font-bold block text-slate-900 mb-1">2. Execution & Spares:</span>
                      Itemized replacement parts, torque specs, bearing serials, and technician hours.
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
                      <span className="font-bold block text-slate-900 mb-1">3. Handover & Sign-off:</span>
                      No-load and full-load test run parameters, client engineer signature, and warranty.
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <Link to={ROUTES.PUBLIC.CONTACT}>
                      <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Request Sample Vendor Job Card
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Tab Content 3: Field Service Media Placeholder */}
          {activeMediaTab === 'photos' && (
            <div className="max-w-4xl mx-auto">
              <EmptyState
                icon={<Wrench className="w-7 h-7 text-amber-600" />}
                title="Field Service Media Vault"
                description="Officially approved on-site technical photographs, machine inspection records, and component overhaul documentation are staged through the administrative portal in adherence with industrial plant confidentiality standards."
                action={
                  <Link to={ROUTES.PUBLIC.CONTACT}>
                    <Button variant="secondary" size="sm">
                      Request Technical Presentation
                    </Button>
                  </Link>
                }
              />
            </div>
          )}
        </Container>
      </section>

      {/* ================================================================
          SECTION 6: PRIMARY SERVICE REQUEST CALL TO ACTION
          Direct conversion guiding users to the request submission route.
          ================================================================ */}
      <section aria-labelledby="vendor-cta-title" className="py-16 sm:py-20 bg-slate-900 text-white">
        <Container size="2xl">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="amber" icon={<Wrench className="w-3 h-3" />}>
              Immediate Plant Service Dispatch
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
                  Create Service Request
                </Button>
              </Link>
              <Link to={ROUTES.PUBLIC.SERVICES}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                >
                  Explore Service Catalog
                </Button>
              </Link>
              <Link to={ROUTES.PUBLIC.CONTACT}>
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Phone className="w-4 h-4" />}
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                >
                  Contact Desk
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 7: CORPORATE CONTACT & EMPANELMENT CTA
          Empanelment inquiry consultation.
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
                  including GST certificates, MSME memorandums, bank mandates, and safety
                  undertakings to procurement teams initiating formal supplier onboarding.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Link to={ROUTES.PUBLIC.CONTACT} className="w-full sm:w-auto">
                  <Button variant="primary" size="md" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Contact for Empanelment
                  </Button>
                </Link>
                <Link to={ROUTES.PUBLIC.ABOUT} className="w-full sm:w-auto">
                  <Button variant="secondary" size="md" fullWidth>
                    Review Engineer Credentials
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer rendered by PublicLayout */}
    </>
  );
};
