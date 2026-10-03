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
import { ServiceCard } from '@/components/home/ServiceCard';
import {
  ServiceDetailSection,
  DetailedServiceData,
} from '@/components/services';
import type { ServiceCardData } from '@/components/home/ServiceCard';
import {
  Wrench,
  Search,
  AlertTriangle,
  Settings,
  CalendarCheck,
  Zap,
  ArrowRight,
  Phone,
  ShieldCheck,
  Clock,
  ClipboardList,
  Layers,
  FileCheck,
} from 'lucide-react';

/* ==========================================================================
 * SERVICES CATALOG DATA
 * --------------------------------------------------------------------------
 * Structured data models ready to be loaded from a CMS or REST API.
 * NO fake pricing, simulated customer reviews, or unverified claims are added.
 * ========================================================================== */

/**
 * Top-level quick navigation cards for the service catalog.
 */
const SERVICE_CATALOG_CARDS: ServiceCardData[] = [
  {
    id: 'inspection',
    title: 'Inspection',
    description:
      'Systematic on-site condition assessment and mechanical/electrical evaluations to detect wear, structural fatigue, and potential component failures.',
    icon: <Search className="w-6 h-6" />,
    href: '#service-inspection',
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description:
      'Root-cause diagnostic evaluations for unexpected machine shutdowns, motor trips, electrical anomalies, and mechanical resistance.',
    icon: <AlertTriangle className="w-6 h-6" />,
    href: '#service-troubleshooting',
  },
  {
    id: 'repair',
    title: 'Repair',
    description:
      'Precision restoration and component replacement for industrial machinery, motor drives, pumps, conveyors, and mechanical assemblies.',
    icon: <Wrench className="w-6 h-6" />,
    href: '#service-repair',
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    description:
      'Scheduled preventive maintenance programs designed to preserve machine tolerances, minimize downtime, and extend equipment lifecycle.',
    icon: <Settings className="w-6 h-6" />,
    href: '#service-maintenance',
  },
  {
    id: 'installation',
    title: 'Installation & Commissioning',
    description:
      'Professional mounting, wiring interconnection, alignment, pre-start testing, and operational handover for newly installed plant equipment.',
    icon: <Zap className="w-6 h-6" />,
    href: '#service-installation',
  },
  {
    id: 'amc',
    title: 'Annual Maintenance Contracts (AMC)',
    description:
      'Structured annual contracts providing scheduled periodic servicing, priority technical dispatch, and preventive maintenance records.',
    icon: <CalendarCheck className="w-6 h-6" />,
    href: '#service-amc',
  },
];

/**
 * In-depth specifications for each service category.
 */
const DETAILED_SERVICES: DetailedServiceData[] = [
  {
    id: 'inspection',
    anchorId: 'service-inspection',
    badge: 'Diagnostic & Safety',
    title: 'Industrial Equipment Inspection',
    subtitle: 'Comprehensive condition assessment to identify component wear before catastrophic failure occurs.',
    description:
      'Our equipment inspection service provides manufacturing plants with systematic, on-site evaluations of mechanical, electrical, and structural systems. Using structured inspection checklists, our field engineers examine critical machinery components to detect early warning signs such as excessive vibration, bearing degradation, misalignments, loose terminations, and abnormal thermal patterns.',
    icon: <Search className="w-4 h-4" />,
    scopeItems: [
      'Visual examination of structural frames, weldments, and mounting hardware',
      'Mechanical drivetrain assessment (pulleys, sprockets, belts, and chain tension)',
      'Bearing condition checks, housing play, and lubrication verification',
      'Electrical connection tightness, terminal oxidation, and conductor insulation checks',
      'Thermal observation of operating motor housings and control panels',
      'Safety interlock, emergency stop, and mechanical guard verification',
    ],
    equipmentCovered: [
      'Rice processing equipment (hullers, separators, polishers, sortex)',
      'Textile machinery (spinning frames, looms, carding systems)',
      'Cashew processing units (cutters, dryers, peeling drums)',
      'Industrial conveyor belts, bucket elevators, and screw feeders',
      'Single-phase and three-phase induction motor installations',
    ],
    deliverables: [
      'Itemized equipment condition report with severity-ranked observations',
      'Preventive action checklist prioritizing urgent versus routine interventions',
      'Written recommendations for replacement parts and wear thresholds',
    ],
    ctaLabel: 'Request Equipment Inspection',
    ctaHref: ROUTES.CUSTOMER.SERVICE_REQUEST,
  },
  {
    id: 'troubleshooting',
    anchorId: 'service-troubleshooting',
    badge: 'Fault Diagnostics',
    title: 'Industrial Troubleshooting & Diagnostics',
    subtitle: 'Systematic root-cause fault diagnosis when plant equipment exhibits abnormal behavior or unexpected tripping.',
    description:
      'When production lines stall or equipment trips unexpectedly, superficial fixes often lead to repeated shutdowns. Our troubleshooting service applies methodical engineering diagnostics to isolate root causes — whether originating from electrical supply variations, control circuit faults, mechanical binding, motor overload, or sensor malfunctions. We work to rapidly identify the failure mechanism and restore safe operational stability.',
    icon: <AlertTriangle className="w-4 h-4" />,
    scopeItems: [
      'Motor circuit insulation and winding resistance testing',
      'Control panel circuit tracing, contactor, and relay verification',
      'Investigation of intermittent motor trips, overheating, and breaker trips',
      'Identification of mechanical friction, jamming, and torque overload points',
      'Limit switch, optical sensor, and proximity sensor diagnostic checks',
      'Transient voltage and phase balance checks at machine inputs',
    ],
    equipmentCovered: [
      'Motor control centers (MCC) and star-delta starters',
      'Drive motors, pumps, and industrial blower fans',
      'Automated sorting and optical inspection sensors',
      'Conveyor drive systems and speed reduction gearboxes',
      'Drying chamber temperature controllers and heating elements',
    ],
    deliverables: [
      'Diagnostic report identifying primary root cause and secondary contributing factors',
      'Immediate stabilization recommendations to resume production safely',
      'List of affected components requiring repair or replacement',
    ],
    ctaLabel: 'Request Troubleshooting Support',
    ctaHref: ROUTES.CUSTOMER.SERVICE_REQUEST,
  },
  {
    id: 'repair',
    anchorId: 'service-repair',
    badge: 'Machinery Overhaul',
    title: 'Equipment Repair & Component Replacement',
    subtitle: 'Precision mechanical and electrical restoration to return damaged or degraded machinery to operational standards.',
    description:
      'VPE provides on-site field repairs as well as workshop-level component restoration for critical processing machinery. When equipment suffers mechanical breakdown, worn bearings, seized shafts, burnt motor windings, or broken transmission linkages, our service engineers execute precise repairs adhering to OEM specifications and industrial safety protocols.',
    icon: <Wrench className="w-4 h-4" />,
    scopeItems: [
      'Bearing extraction, shaft inspection, and precision replacement',
      'Shaft alignment, coupling balancing, and dynamic check',
      'Pump mechanical seal, gasket, and impeller repairs',
      'Motor overhaul, bearing replacement, and rewinding coordination',
      'Conveyor roller, belt splice, and tensioner replacement',
      'Industrial valve, pipe joint, and fitting repairs',
    ],
    equipmentCovered: [
      'Heavy reduction gearboxes and transmission shafts',
      'Centrifugal, submersible, and positive-displacement pumps',
      'Industrial exhaust blowers, air handling units, and cyclone separators',
      'Rice mill polisher rollers, screens, and huller cylinders',
      'Textile spindle drives, gear trains, and take-up mechanisms',
    ],
    deliverables: [
      'Post-repair operational verification report with load testing notes',
      'Record of replaced parts, serial numbers, and component specifications',
      'Operational guidance and lubrication intervals for newly installed parts',
    ],
    ctaLabel: 'Schedule Machinery Repair',
    ctaHref: ROUTES.CUSTOMER.SERVICE_REQUEST,
  },
  {
    id: 'maintenance',
    anchorId: 'service-maintenance',
    badge: 'Preventive Care',
    title: 'Preventive & Scheduled Maintenance',
    subtitle: 'Planned periodic maintenance programs designed to prevent sudden breakdowns and preserve equipment efficiency.',
    description:
      'Unplanned downtime is among the highest operational expenses in industrial manufacturing. Our preventive maintenance service introduces structured servicing routines conducted at planned intervals. By performing scheduled lubrication, tensioning adjustments, electrical contact cleaning, and component wear tracking, we help plant managers maximize machine uptime and avoid catastrophic failures during peak production runs.',
    icon: <Settings className="w-4 h-4" />,
    scopeItems: [
      'Scheduled lubricant replenishment and grease point servicing',
      'Belt, chain, and drive pulley retensioning and wear inspection',
      'Fastener, flange bolt, and foundation bolt torque retightening',
      'Air filter, strainer, and oil reservoir inspection and cleaning',
      'Cleaning and oxidation removal from electrical contactors and busbars',
      'Calibration checks for operating temperature and pressure instruments',
    ],
    equipmentCovered: [
      'Complete production and processing line machine trains',
      'Material handling elevators, hoppers, and discharge chutes',
      'Plant air compressor systems, air lines, and drain valves',
      'Grain drying towers, hot air furnaces, and blower systems',
      'Textile loom drives, jacquards, and winding apparatus',
    ],
    deliverables: [
      'Preventive maintenance logbook recording all completed service checkpoints',
      'Wear tracking log highlighting components nearing end-of-life',
      'Next scheduled maintenance calendar with recommended service milestones',
    ],
    ctaLabel: 'Book Maintenance Service',
    ctaHref: ROUTES.CUSTOMER.SERVICE_REQUEST,
  },
  {
    id: 'installation',
    anchorId: 'service-installation',
    badge: 'Setup & Handover',
    title: 'Installation & Commissioning',
    subtitle: 'Turnkey on-site machinery placement, alignment, wiring integration, and certified pre-production test runs.',
    description:
      'Proper initial installation is vital for ensuring long-term machine reliability and safety. VPE provides professional installation and commissioning services for new or relocated industrial equipment. Our engineers handle physical positioning, vibration damping, electrical supply termination, control panel interconnection, rotational direction verification, and initial no-load and full-load test runs.',
    icon: <Zap className="w-4 h-4" />,
    scopeItems: [
      'Baseplate leveling, anchoring, and vibration isolation installation',
      'Precision mechanical coupling alignment between prime mover and load',
      'Three-phase supply connection, earthing verification, and phase sequence check',
      'Control wiring interconnection between sensors, panels, and machinery',
      'Pre-start dry run, rotational direction checks, and interlock verification',
      'Full-load trial run with operational parameter logging',
    ],
    equipmentCovered: [
      'Newly acquired rice mill machines, sortex units, and destoners',
      'Textile spinning frames, looms, and finishing machinery',
      'Cashew grading and automatic packing equipment',
      'New motor-pump skid sets and industrial blower installations',
      'Main motor starter panels and distribution switchboards',
    ],
    deliverables: [
      'Formal commissioning certificate confirming operational readiness',
      'Initial baseline vibration and electrical load parameter log',
      'Operator orientation summary on basic start-stop and safety procedures',
    ],
    ctaLabel: 'Plan Installation Service',
    ctaHref: ROUTES.CUSTOMER.SERVICE_REQUEST,
  },
  {
    id: 'amc',
    anchorId: 'service-amc',
    badge: 'Annual Partnership',
    title: 'Annual Maintenance Contracts (AMC)',
    subtitle: 'Comprehensive service agreements ensuring scheduled visits, priority dispatch, and year-round technical coverage.',
    description:
      'For industrial plants seeking predictable operational reliability, VPE offers Annual Maintenance Contracts (AMC). Under an AMC agreement, your facility receives dedicated periodic service visits, routine diagnostic audits, emergency breakdown response priority, and ongoing technical support. This provides plant managers with a dedicated service partner committed to maintaining overall facility efficiency.',
    icon: <CalendarCheck className="w-4 h-4" />,
    scopeItems: [
      'Scheduled periodic inspection and maintenance visits throughout the year',
      'Priority engineer dispatch for unexpected breakdown calls',
      'Detailed logbook maintenance and continuous asset health records',
      'Seasonal pre-harvest or pre-peak production maintenance overhauls',
      'Technical consultation on component replacement schedules and spare inventory',
      'Discounted labor rates on non-routine repairs and retrofitting projects',
    ],
    equipmentCovered: [
      'Entire facility machinery fleet (rice mills, textile mills, cashew plants)',
      'Substation and primary plant electrical distribution panels',
      'Material handling, conveyor belts, and elevator networks',
      'Auxiliary utility equipment (pumps, blowers, air systems)',
    ],
    deliverables: [
      'Annual maintenance agreement specifying visit frequencies and SLA response times',
      'Monthly/Quarterly asset service audit reports delivered to plant management',
      'Priority emergency service dispatch protocol and designated contact channel',
    ],
    ctaLabel: 'Inquire About AMC Plans',
    ctaHref: ROUTES.PUBLIC.SERVICE_CHARGES,
  },
];

/* ==========================================================================
 * SERVICES PAGE COMPONENT
 * ========================================================================== */

export const ServicesPage: FC = () => {
  return (
    <>
      {/* ================================================================
          SECTION 1: HERO & BREADCRUMB
          Industrial positioning, catalog intro, and primary CTAs.
          ================================================================ */}
      <section
        aria-labelledby="services-hero-title"
        className="bg-slate-900 text-white relative overflow-hidden"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="services-grid" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#services-grid)" />
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
                <li className="text-amber-400 font-semibold">Services</li>
              </ol>
            </nav>

            <div className="max-w-3xl space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="amber" icon={<Wrench className="w-3 h-3" />}>
                  Comprehensive Industrial Service Catalog
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  On-Site Field Engineering
                </span>
              </div>

              <h1
                id="services-hero-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
              >
                Industrial Services &{' '}
                <span className="text-amber-400">Engineering Solutions</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Venkata Prasanna Enterprises delivers structured, reliable engineering
                support across inspection, troubleshooting, mechanical repair, preventive
                maintenance, and annual service contracts for manufacturing facilities.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                  <Button
                    variant="industrial"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Request Service
                  </Button>
                </Link>
                <Link to={ROUTES.PUBLIC.SERVICE_CHARGES}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                  >
                    View Service Charges
                  </Button>
                </Link>
                <Link to={ROUTES.PUBLIC.CONTACT}>
                  <Button
                    variant="ghost"
                    size="lg"
                    leftIcon={<Phone className="w-4 h-4" />}
                    className="text-slate-300 hover:text-white hover:bg-white/10"
                  >
                    Contact Desk
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats / Scope Highlights */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Documented diagnostic procedures for every engagement</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>On-site field deployment directly at your facility</span>
                </div>
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Multi-sector coverage: Rice, Textile, Cashew & General Plants</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 2: QUICK CATALOG OVERVIEW (REUSABLE CARDS)
          Provides quick jump navigation to detailed sections below.
          ================================================================ */}
      <section aria-labelledby="catalog-overview-title" className="py-14 sm:py-18 bg-white border-b border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge="Service Directory"
            title="Core Service Categories"
            subtitle="Explore our primary industrial service lines. Click any category to review the detailed scope of work, covered machinery, and deliverables."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {SERVICE_CATALOG_CARDS.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 3: DETAILED SERVICE SPECIFICATIONS
          In-depth breakdowns for each service category without invented claims.
          ================================================================ */}
      <section aria-labelledby="detailed-services-title" className="py-16 sm:py-20 bg-slate-50">
        <Container size="2xl">
          <SectionHeading
            badge="Technical Scope"
            title="Detailed Service Breakdown"
            subtitle="Transparent scope of work, equipment applicability, and documented deliverables for every service line."
            align="left"
          />

          <div className="space-y-4">
            {DETAILED_SERVICES.map((service, index) => (
              <ServiceDetailSection
                key={service.id}
                service={service}
                reverseLayout={index % 2 === 1}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 4: SERVICE WORKFLOW & EXECUTION STANDARDS
          Transparent 4-step delivery lifecycle.
          ================================================================ */}
      <section aria-labelledby="workflow-title" className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge="How We Work"
            title="Our Industrial Service Delivery Process"
            subtitle="From ticket intake to final equipment sign-off, every service task follows a systematic engineering procedure."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Request Intake',
                desc: 'Client submits machinery details, symptoms, and plant location through our portal or dispatch desk.',
                icon: <ClipboardList className="w-5 h-5 text-amber-700" />,
              },
              {
                step: '02',
                title: 'On-Site Diagnostic',
                desc: 'Field service engineer inspects equipment, verifies operating parameters, and identifies root cause.',
                icon: <Search className="w-5 h-5 text-amber-700" />,
              },
              {
                step: '03',
                title: 'Service Execution',
                desc: 'Precision repair, component replacement, or scheduled preventive maintenance conducted adhering to safety protocols.',
                icon: <Wrench className="w-5 h-5 text-amber-700" />,
              },
              {
                step: '04',
                title: 'Test & Documentation',
                desc: 'Operational load test performed. Client receives documented service notes and completion sign-off.',
                icon: <FileCheck className="w-5 h-5 text-amber-700" />,
              },
            ].map((step) => (
              <Card key={step.step} variant="default" className="text-center p-6 space-y-3">
                <CardContent className="p-0 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs font-black flex items-center justify-center mx-auto">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 5: PRIMARY SERVICE REQUEST CALL TO ACTION
          Direct conversion guiding users to the request submission route.
          ================================================================ */}
      <section aria-labelledby="services-cta-title" className="py-16 sm:py-20 bg-slate-900 text-white">
        <Container size="2xl">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="amber" icon={<Wrench className="w-3 h-3" />}>
              Immediate Service Dispatch
            </Badge>

            <h2
              id="services-cta-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
            >
              Need Urgent Servicing or Scheduled Maintenance?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Submit your equipment details and location through our service request form.
              Our engineering team will review the malfunction symptoms and coordinate
              on-site field dispatch.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                <Button
                  variant="industrial"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Submit Service Request
                </Button>
              </Link>
              <Link to={ROUTES.PUBLIC.SERVICE_CHARGES}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                >
                  Review Service Charges
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
          SECTION 6: CONTACT & CONSULTATION CTA
          Assistance for custom inquiries, plant visits, and multi-machine AMC.
          ================================================================ */}
      <section aria-labelledby="consultation-title" className="py-14 sm:py-18 bg-slate-50 border-t border-slate-200">
        <Container size="2xl">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-3">
                <Badge variant="outline">Consultation & Facility Assessment</Badge>
                <h3 id="consultation-title" className="text-xl sm:text-2xl font-bold text-slate-900">
                  Planning an Annual Maintenance Contract or Plant Overhaul?
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  For comprehensive plant-wide maintenance agreements, custom machinery
                  retrofits, or specialized inspection visits, get in touch with our
                  lead engineering desk to discuss facility requirements.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Link to={ROUTES.PUBLIC.CONTACT} className="w-full sm:w-auto">
                  <Button variant="primary" size="md" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Contact Engineering Desk
                  </Button>
                </Link>
                <Link to={ROUTES.PUBLIC.ABOUT} className="w-full sm:w-auto">
                  <Button variant="secondary" size="md" fullWidth>
                    Learn About Our Engineer
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
