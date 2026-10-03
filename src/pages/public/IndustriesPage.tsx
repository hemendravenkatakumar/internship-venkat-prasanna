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
import { IndustryCard } from '@/components/home/IndustryCard';
import {
  IndustryDetailSection,
  IndustryDetailData,
} from '@/components/industries';
import type { IndustryCardData } from '@/components/home/IndustryCard';
import {
  Factory,
  Droplets,
  Nut,
  Cog,
  Wrench,
  AlertTriangle,
  ArrowRight,
  Phone,
  Layers,
  HelpCircle,
} from 'lucide-react';

/* ==========================================================================
 * INDUSTRIES SECTORS DATA
 * --------------------------------------------------------------------------
 * Structured data models ready for CMS or backend API integration.
 * IMPORTANT: No invented client logos, fake customers, or unverified claims.
 * ========================================================================== */

/**
 * Top-level quick navigation cards for industries served.
 */
const INDUSTRY_NAV_CARDS: IndustryCardData[] = [
  {
    id: 'rice-mills',
    name: 'Rice Mills',
    description:
      'Specialized maintenance and repair for rubber roll hullers, paddy separators, polishers, sortex optical sorters, and grain elevators.',
    icon: <Droplets className="w-5 h-5" />,
    href: '#industry-rice-mills',
  },
  {
    id: 'textile',
    name: 'Textile & Cloth Industries',
    description:
      'Precision mechanical servicing and motor diagnostics for ring spinning frames, cone winders, rapier & air-jet looms, and processing drives.',
    icon: <Factory className="w-5 h-5" />,
    href: '#industry-textile',
  },
  {
    id: 'cashew',
    name: 'Cashew Processing',
    description:
      'Engineering care for steam boilers, automatic cutting machines, borma drying chambers, peeling drums, and vacuum packaging systems.',
    icon: <Nut className="w-5 h-5" />,
    href: '#industry-cashew',
  },
  {
    id: 'manufacturing',
    name: 'General Manufacturing',
    description:
      'Comprehensive plant maintenance for conveyor systems, reduction gearboxes, industrial pumps, air compressors, and motor control panels.',
    icon: <Cog className="w-5 h-5" />,
    href: '#industry-manufacturing',
  },
];

/**
 * Detailed engineering specifications for each industry.
 */
const DETAILED_INDUSTRIES: IndustryDetailData[] = [
  {
    id: 'rice-mills',
    anchorId: 'industry-rice-mills',
    badge: 'Grain & Agro Processing',
    name: 'Rice Mill Equipment Maintenance',
    tagline: 'Preserving milling line throughput and minimizing grain breakage during high-volume production cycles.',
    overview:
      'Modern rice processing mills rely on an interconnected sequence of high-speed cleaning, hulling, separation, polishing, and optical sorting machinery. Because rice husk contains high levels of abrasive silica, equipment in this sector experiences accelerated component wear. VPE provides targeted mechanical overhauls, bearing replacements, and electrical troubleshooting to ensure continuous mill operations without costly mid-shift shutdowns.',
    icon: <Droplets className="w-4 h-4" />,
    operationalChallenges: [
      'Rapid abrasive wear on rubber de-hulling rolls, emery stone cylinders, and metal screens',
      'Paddy husk and fine bran dust ingress into electric motor windings and starter contacts',
      'Elevator bucket jamming and belt slippage under heavy, damp grain throughput',
      'Vibration and optical sensor misalignment on high-speed Sortex color sorting machines',
      'Intense seasonal 24/7 operating hours during harvest cycles requiring pre-season overhaul',
    ],
    vpeSolutions: [
      'Pre-season comprehensive mill inspection and drivetrain alignment',
      'Huller, separator, and polisher bearing and shaft replacements',
      'Bucket elevator belt tensioning and drive pulley alignment',
      'Motor insulation resistance testing and dust-sealed enclosure checks',
      'Blower fan dynamic balancing and cyclone ductwork inspection',
      'Rapid on-site breakdown response during peak harvest milling periods',
    ],
    keyMachinery: [
      'Rubber Roll De-hullers & Paddy Separators',
      'Emery Cone & Water Mist Polishers',
      'Sortex & Optical Color Sorters',
      'Grain Bucket Elevators & Screw Conveyors',
      'Paddy Cleaner & Cyclone Destoners',
      'Rice Bran Suction Blowers & Dust Collectors',
    ],
    ctaLabel: 'Request Rice Mill Service',
    ctaHref: ROUTES.CUSTOMER.SERVICE_REQUEST,
  },
  {
    id: 'textile',
    anchorId: 'industry-textile',
    badge: 'Spinning & Weaving',
    name: 'Textile & Cloth Manufacturing Machinery',
    tagline: 'High-precision mechanical alignment, motor diagnostics, and preventive maintenance for continuous spinning and weaving.',
    overview:
      'Textile machinery operates at elevated rotational velocities where slight mechanical imbalances or electrical fluctuations can lead to yarn breakage, fabric defects, or catastrophic machine lockups. In addition, floating lint and high ambient humidity in spinning and weaving sheds create unique hazards for electrical switchgear and motor thermal management. VPE delivers specialized on-site servicing tailored to textile facilities.',
    icon: <Factory className="w-4 h-4" />,
    operationalChallenges: [
      'High-density lint and fiber accumulation choking motor cooling fans and electrical panels',
      'Ambient moisture and chemical humidification accelerating contactor and relay oxidation',
      'Spindle drive bearing degradation under continuous high-RPM running speeds',
      'Loom drive timing belt tension drift causing misaligned pick and shuttle synchronization',
      'Motor tripping caused by fluctuating electrical grid supply and harmonic disturbances',
    ],
    vpeSolutions: [
      'Motor de-linting, stator cleaning, and thermal imaging of starter panels',
      'Precision spindle drive and shaft bearing replacements with vibration checks',
      'Rapier and air-jet loom main drive gearbox inspection and lubrication servicing',
      'Control panel contactor cleaning, replacement, and terminal retorquing',
      'Preventive maintenance schedules coordinated with plant shift changeovers',
      'Emergency electrical troubleshooting for sudden spinning frame line stoppages',
    ],
    keyMachinery: [
      'Ring Spinning Frames & Speed Frames',
      'Automatic Cone Winders & Two-for-One (TFO) Twisters',
      'Rapier, Air-Jet & Shuttle Looms',
      'Circular Knitting & Fabric Weaving Machines',
      'Humidification Plant Centrifugal Blowers & Pumps',
      'Textile Motor Control Centers & Distribution Boards',
    ],
    ctaLabel: 'Request Textile Plant Service',
    ctaHref: ROUTES.CUSTOMER.SERVICE_REQUEST,
  },
  {
    id: 'cashew',
    anchorId: 'industry-cashew',
    badge: 'Nut & Food Processing',
    name: 'Cashew Processing Plant Equipment',
    tagline: 'Mitigating corrosive shell oil impact and ensuring blade precision for maximum whole-kernel recovery.',
    overview:
      'Cashew nut processing presents severe operating conditions due to Cashew Nut Shell Liquid (CNSL) — an aggressive, naturally occurring caustic oil that attacks conventional seals, bearing greases, and electrical cable insulations. Furthermore, steam boiling and Borma drying processes introduce high thermal demands. VPE engineers understand these chemical and thermal stressors, providing durable repair and maintenance solutions for cashew factories.',
    icon: <Nut className="w-4 h-4" />,
    operationalChallenges: [
      'Corrosive CNSL oil permeating bearing housings, degrading grease and causing shaft seizure',
      'Electrical heating element burnout and thermostat failures in Borma drying ovens',
      'Automatic cashew cutting blade misalignment leading to excessive broken kernel percentages',
      'Peeling drum mesh clogging and rotating shaft mechanical binding',
      'Steam boiler piping thermal expansion and high-pressure steam valve leakage',
    ],
    vpeSolutions: [
      'CNSL-resistant bearing replacement and mechanical seal reinforcement',
      'Borma oven heating element diagnostic testing and temperature controller calibration',
      'Automatic cutting machine blade alignment, guide adjustment, and mechanical tune-up',
      'Peeling drum drive motor servicing, chain drive tensioning, and bearing re-greasing',
      'Boiler auxiliary feed pump overhaul and steam pipeline valve servicing',
      'Vacuum packaging machine pump servicing and seal bar electrical check',
    ],
    keyMachinery: [
      'Raw Cashew Steam Boiling Boilers & Pressure Vessels',
      'Automatic & Foot-Operated Cashew Cutting Machines',
      'Borma Hot Air Drying Chambers & Heaters',
      'Mechanical Peeling Drums & Shell Separators',
      'Nut Sizing & Color Grading Sifters',
      'Industrial Vacuum Packaging & Sealing Machines',
    ],
    ctaLabel: 'Request Cashew Plant Service',
    ctaHref: ROUTES.CUSTOMER.SERVICE_REQUEST,
  },
  {
    id: 'manufacturing',
    anchorId: 'industry-manufacturing',
    badge: 'Industrial Operations',
    name: 'General Manufacturing & Agro-Processing',
    tagline: 'Comprehensive mechanical, electrical, and preventive engineering support for diverse production environments.',
    overview:
      'Beyond specialized mills, VPE delivers dependable maintenance services across general agro-processing plants, light manufacturing, food packaging facilities, and industrial warehouses. Whether managing material handling conveyors, industrial water pumps, heavy speed reduction gearboxes, or factory distribution panels, our team provides on-site diagnostic and repair capabilities that protect operational productivity.',
    icon: <Cog className="w-4 h-4" />,
    operationalChallenges: [
      'Unplanned production line shutdowns caused by sudden gearbox or motor bearing failure',
      'Conveyor belt misalignment, roller seizure, and material spillage along transport lines',
      'Industrial water and slurry pump seal failures causing motor flooding',
      'Loose terminal connections in main distribution boards generating dangerous hot spots',
      'Lack of consistent scheduled maintenance records across heterogeneous plant equipment',
    ],
    vpeSolutions: [
      'Annual Maintenance Contracts (AMC) covering scheduled plant-wide service audits',
      'Heavy gearbox overhaul, bearing replacement, and gear tooth inspection',
      'Centrifugal, submersible, and positive-displacement pump servicing',
      'Conveyor drive pulley alignment, roller replacement, and belt tensioning',
      'Electrical panel preventive maintenance, retorquing, and load balancing',
      'Turnkey installation and commissioning for new facility machinery',
    ],
    keyMachinery: [
      'Speed Reduction Gearboxes & Heavy Drive Shafts',
      'Centrifugal, Chemical & High-Pressure Water Pumps',
      'Belt, Roller & Screw Conveyor Systems',
      'Rotary Air Compressors & Compressed Air Piping',
      'Motor Control Centers (MCC) & Main Switchboards',
      'Industrial Packaging, Sealing & Bagging Units',
    ],
    ctaLabel: 'Request General Plant Service',
    ctaHref: ROUTES.CUSTOMER.SERVICE_REQUEST,
  },
];

/* ==========================================================================
 * INDUSTRIES PAGE COMPONENT
 * ========================================================================== */

export const IndustriesPage: FC = () => {
  return (
    <>
      {/* ================================================================
          SECTION 1: HERO & BREADCRUMB
          Industry positioning, sector introduction, and primary CTAs.
          ================================================================ */}
      <section
        aria-labelledby="industries-hero-title"
        className="bg-slate-900 text-white relative overflow-hidden"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="industries-grid" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#industries-grid)" />
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
                <li className="text-amber-400 font-semibold">Industries</li>
              </ol>
            </nav>

            <div className="max-w-3xl space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="amber" icon={<Factory className="w-3 h-3" />}>
                  Sector-Specific Engineering Capabilities
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  Rice • Textile • Cashew • Manufacturing
                </span>
              </div>

              <h1
                id="industries-hero-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
              >
                Industries We Serve &{' '}
                <span className="text-amber-400">Plant Support</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Every manufacturing sector possesses unique mechanical friction points,
                environmental conditions, and operating cycles. Venkata Prasanna
                Enterprises delivers tailored industrial service solutions calibrated
                specifically for the operating demands of your plant.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                  <Button
                    variant="industrial"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Request Plant Service
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
                    variant="ghost"
                    size="lg"
                    leftIcon={<Phone className="w-4 h-4" />}
                    className="text-slate-300 hover:text-white hover:bg-white/10"
                  >
                    Contact Engineering Desk
                  </Button>
                </Link>
              </div>
            </div>

            {/* Sector Highlights Strip */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <Wrench className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>On-site mechanical & electrical troubleshooting at your facility</span>
                </div>
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Deep familiarity with sector-specific processing machinery</span>
                </div>
                <div className="flex items-center gap-3">
                  <Factory className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Pre-season maintenance overhauls for harvest & peak production</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 2: INDUSTRY DIRECTORY CARDS
          Quick visual navigation cards jumping to detailed sector sections.
          ================================================================ */}
      <section aria-labelledby="sector-directory-title" className="py-14 sm:py-18 bg-white border-b border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge="Industrial Sectors"
            title="Core Industries We Support"
            subtitle="Explore our specialized maintenance and repair capabilities for your industrial category. Click any sector to review common challenges, machinery serviced, and dedicated VPE solutions."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {INDUSTRY_NAV_CARDS.map((industry) => (
              <IndustryCard key={industry.id} industry={industry} />
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 3: DETAILED INDUSTRY-SPECIFIC SERVICE EXPLANATIONS
          Technical scope, failure modes, machinery, and solutions per sector.
          ================================================================ */}
      <section aria-labelledby="detailed-sectors-title" className="py-16 sm:py-20 bg-slate-50">
        <Container size="2xl">
          <SectionHeading
            badge="Engineering Scope"
            title="Sector-by-Sector Service Specifications"
            subtitle="Transparent explanations of common operating challenges and our dedicated on-site engineering procedures for each industry."
            align="left"
          />

          <div className="space-y-4">
            {DETAILED_INDUSTRIES.map((industry, index) => (
              <IndustryDetailSection
                key={industry.id}
                industry={industry}
                reverseLayout={index % 2 === 1}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 4: MACHINE & SERVICE PROBLEM CTA
          Direct diagnostic prompt for plant managers facing specific faults.
          ================================================================ */}
      <section aria-labelledby="problem-cta-title" className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <Container size="2xl">
          <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-6">
              <Badge variant="amber" icon={<AlertTriangle className="w-3 h-3" />}>
                Troubleshooting & Emergency Support
              </Badge>

              <h2
                id="problem-cta-title"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
              >
                Experiencing Machine Breakdown or Recurring Tripping in Your Mill?
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Whether you are observing abnormal bearing vibration in a rice polisher,
                intermittent motor tripping in a textile spinning frame, cutter blade
                misalignment in a cashew plant, or a seized conveyor gearbox — do not
                allow minor friction points to turn into catastrophic production stops.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" aria-hidden="true" />
                  <span>Emergency field dispatch for critical line stoppages</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" aria-hidden="true" />
                  <span>On-site root-cause electrical & mechanical diagnostics</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" aria-hidden="true" />
                  <span>Precision shaft, bearing, and seal component renewal</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" aria-hidden="true" />
                  <span>Documented test runs before machine handover</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                  <Button
                    variant="industrial"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Submit Service Ticket Now
                  </Button>
                </Link>
                <Link to={ROUTES.PUBLIC.CONTACT}>
                  <Button
                    variant="secondary"
                    size="lg"
                    leftIcon={<Phone className="w-4 h-4" />}
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                  >
                    Call Operating Desk
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 5: PRIMARY SERVICE REQUEST CTA
          Conversion guidance to initiate service requests.
          ================================================================ */}
      <section aria-labelledby="service-request-cta" className="py-14 sm:py-18 bg-slate-50 border-t border-slate-200">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-3">
              <Badge variant="outline" icon={<Wrench className="w-3 h-3" />}>
                On-Site Field Engineering
              </Badge>
              <h2 id="service-request-cta" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Ready to Schedule Maintenance or an Inspection Visit?
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Submit your facility address, machinery serials, and malfunction symptoms
                through our online service portal. Our service engineers coordinate
                rapid on-site field visits to restore peak operational reliability.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Create Service Request
                </Button>
              </Link>
              <Link to={ROUTES.PUBLIC.SERVICES} className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" fullWidth>
                  Browse Service Catalog
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 6: CONTACT & CONSULTATION CTA
          Consultation for facility audits, pre-harvest reviews, and multi-line AMCs.
          ================================================================ */}
      <section aria-labelledby="contact-cta-title" className="py-14 sm:py-18 bg-white border-t border-slate-200">
        <Container size="2xl">
          <Card variant="flat" className="p-6 sm:p-10 border border-slate-200">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 id="contact-cta-title" className="text-xl sm:text-2xl font-bold text-slate-900">
                    Not Sure Which Service Category Fits Your Plant?
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    If your machinery is displaying complex intermittent faults or you are
                    evaluating a plant-wide Annual Maintenance Contract, contact our lead
                    engineer directly. We discuss your operating parameters and recommend
                    a structured, cost-effective service plan.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-center md:items-end">
                  <Link to={ROUTES.PUBLIC.CONTACT} className="w-full sm:w-auto md:w-64">
                    <Button variant="primary" size="md" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Contact Our Engineers
                    </Button>
                  </Link>
                  <Link to={ROUTES.PUBLIC.ABOUT} className="w-full sm:w-auto md:w-64">
                    <Button variant="outline" size="md" fullWidth>
                      About VPE Background
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Footer rendered by PublicLayout */}
    </>
  );
};
