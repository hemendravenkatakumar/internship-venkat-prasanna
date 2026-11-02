import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Container,
  SectionHeading,
  Button,
  Badge,
  IndustrialImage,
} from '@/components/common';
import {
  ServiceCard,
  IndustryCard,
  StrengthItem,
} from '@/components/home';
import type { ServiceCardData } from '@/components/home/ServiceCard';
import type { IndustryCardData } from '@/components/home/IndustryCard';
import type { StrengthItemData } from '@/components/home/StrengthItem';
import { INDUSTRIAL_IMAGES } from '@/config/images';
import {
  ArrowRight,
  Phone,
  Wrench,
  Search,
  AlertTriangle,
  Settings,
  Zap,
  Droplets,
  Factory,
  Nut,
  ShieldCheck,
  Clock,
  Headphones,
  Target,
  CheckCircle2,
  MapPin,
  Mail,
  Users,
  Cog,
  Flame,
  Gauge,
  Milk,
  FileSpreadsheet,
} from 'lucide-react';

/* ==========================================================================
 * HOME PAGE DATA
 * --------------------------------------------------------------------------
 * All content below is structured as typed arrays for easy CMS/backend
 * migration. When production content is supplied by VPE, update these arrays.
 *
 * IMPORTANT: No fabricated statistics, fake certifications, invented
 * customer counts, or unverified claims are included.
 * ========================================================================== */

/**
 * SERVICES DATA
 * 8 Core industrial services offered by Venkata Prasanna Enterprises with verified images.
 */
const SERVICES: ServiceCardData[] = [
  {
    id: 'inspection',
    title: 'Industrial Machine Inspection',
    description:
      'Systematic on-site condition assessment, vibration analysis, and mechanical tolerance evaluations to identify potential component failures before breakdown.',
    icon: <Search className="w-5 h-5" />,
    href: ROUTES.PUBLIC.SERVICES,
    imageUrl: INDUSTRIAL_IMAGES.services.inspection.url,
    imageAlt: INDUSTRIAL_IMAGES.services.inspection.alt,
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting & Fault Diagnostics',
    description:
      'Expert root-cause diagnosis for motor trips, PLC automation lockups, drive misalignment, and unexpected production line halts.',
    icon: <AlertTriangle className="w-5 h-5" />,
    href: ROUTES.PUBLIC.SERVICES,
    imageUrl: INDUSTRIAL_IMAGES.services.troubleshooting.url,
    imageAlt: INDUSTRIAL_IMAGES.services.troubleshooting.alt,
  },
  {
    id: 'servicing',
    title: 'Machine Servicing',
    description:
      'Precision mechanical and electromechanical servicing for industrial processing equipment, Sortex optical machines, gearboxes, and pumps.',
    icon: <Wrench className="w-5 h-5" />,
    href: ROUTES.PUBLIC.SERVICES,
    imageUrl: INDUSTRIAL_IMAGES.services.servicing.url,
    imageAlt: INDUSTRIAL_IMAGES.services.servicing.alt,
  },
  {
    id: 'preventive-maintenance',
    title: 'Preventive Maintenance',
    description:
      'Scheduled preventive maintenance regimens engineered to extend equipment operating lifespan and preserve factory throughput.',
    icon: <Settings className="w-5 h-5" />,
    href: ROUTES.PUBLIC.SERVICES,
    imageUrl: INDUSTRIAL_IMAGES.services.preventiveMaintenance.url,
    imageAlt: INDUSTRIAL_IMAGES.services.preventiveMaintenance.alt,
  },
  {
    id: 'repair',
    title: 'Machine Repair & Overhaul',
    description:
      'Comprehensive mechanical overhaul, dynamic balancing, bearing replacement, and on-site rebuilding of worn machinery components.',
    icon: <Cog className="w-5 h-5" />,
    href: ROUTES.PUBLIC.SERVICES,
    imageUrl: INDUSTRIAL_IMAGES.services.machineRepair.url,
    imageAlt: INDUSTRIAL_IMAGES.services.machineRepair.alt,
  },
  {
    id: 'compressor-services',
    title: 'Compressor Services',
    description:
      'Specialized maintenance, valve rebuilding, pressure testing, and oil lubrication service for industrial reciprocating and screw air compressors.',
    icon: <Gauge className="w-5 h-5" />,
    href: ROUTES.PUBLIC.SERVICES,
    imageUrl: INDUSTRIAL_IMAGES.services.compressorServices.url,
    imageAlt: INDUSTRIAL_IMAGES.services.compressorServices.alt,
  },
  {
    id: 'gas-systems',
    title: 'Gas System Services',
    description:
      'Industrial refrigeration gas system checks, ammonia (R-717) / freon leak detection, pipeline pressure testing, and valve calibration.',
    icon: <Flame className="w-5 h-5" />,
    href: ROUTES.PUBLIC.SERVICES,
    imageUrl: INDUSTRIAL_IMAGES.services.gasSystemServices.url,
    imageAlt: INDUSTRIAL_IMAGES.services.gasSystemServices.alt,
    isOffered: true,
  },
  {
    id: 'installation',
    title: 'Installation & Commissioning',
    description:
      'Turnkey machinery installation, laser shaft alignment, control panel interconnection, and trial-run handover for new plant production lines.',
    icon: <Zap className="w-5 h-5" />,
    href: ROUTES.PUBLIC.SERVICES,
    imageUrl: INDUSTRIAL_IMAGES.services.installationCommissioning.url,
    imageAlt: INDUSTRIAL_IMAGES.services.installationCommissioning.alt,
    isOffered: true,
  },
];

/**
 * INDUSTRIES DATA
 * 7 Core industry sectors served by VPE with distinct photographic cards.
 */
const INDUSTRIES: IndustryCardData[] = [
  {
    id: 'rice-mills',
    name: 'Rice Mills',
    description:
      'Maintenance and repair for rubber roll hullers, paddy separators, polishers, sortex optical sorters, and high-speed bucket elevators.',
    icon: <Droplets className="w-5 h-5" />,
    href: ROUTES.PUBLIC.INDUSTRIES,
    imageUrl: INDUSTRIAL_IMAGES.industries.riceMills.url,
    imageAlt: INDUSTRIAL_IMAGES.industries.riceMills.alt,
    servicesProvided: INDUSTRIAL_IMAGES.industries.riceMills.servicesProvided,
    vendorStatus: INDUSTRIAL_IMAGES.industries.riceMills.vendorStatus,
    verifiedExperience: INDUSTRIAL_IMAGES.industries.riceMills.verifiedExperience,
  },
  {
    id: 'textile',
    name: 'Textile Industries',
    description:
      'Servicing for spinning frames, rapier & air-jet looms, carding systems, thread tensioners, and AC variable frequency drives.',
    icon: <Factory className="w-5 h-5" />,
    href: ROUTES.PUBLIC.INDUSTRIES,
    imageUrl: INDUSTRIAL_IMAGES.industries.textile.url,
    imageAlt: INDUSTRIAL_IMAGES.industries.textile.alt,
    servicesProvided: INDUSTRIAL_IMAGES.industries.textile.servicesProvided,
    vendorStatus: INDUSTRIAL_IMAGES.industries.textile.vendorStatus,
    verifiedExperience: INDUSTRIAL_IMAGES.industries.textile.verifiedExperience,
  },
  {
    id: 'cashew',
    name: 'Cashew Industries',
    description:
      'Complete servicing for automatic cashew cutters, borma steam dryers, peeling drums, sizing screens, and packaging units.',
    icon: <Nut className="w-5 h-5" />,
    href: ROUTES.PUBLIC.INDUSTRIES,
    imageUrl: INDUSTRIAL_IMAGES.industries.cashew.url,
    imageAlt: INDUSTRIAL_IMAGES.industries.cashew.alt,
    servicesProvided: INDUSTRIAL_IMAGES.industries.cashew.servicesProvided,
    vendorStatus: INDUSTRIAL_IMAGES.industries.cashew.vendorStatus,
    verifiedExperience: INDUSTRIAL_IMAGES.industries.cashew.verifiedExperience,
  },
  {
    id: 'paper-mills',
    name: 'Paper Mills',
    description:
      'Mechanical care for high-tonnage pulp rollers, calendar stacks, steam condensate pumps, and hydraulic roll tensioners.',
    icon: <FileSpreadsheet className="w-5 h-5" />,
    href: ROUTES.PUBLIC.INDUSTRIES,
    imageUrl: INDUSTRIAL_IMAGES.industries.paperMills.url,
    imageAlt: INDUSTRIAL_IMAGES.industries.paperMills.alt,
    servicesProvided: INDUSTRIAL_IMAGES.industries.paperMills.servicesProvided,
    vendorStatus: INDUSTRIAL_IMAGES.industries.paperMills.vendorStatus,
    verifiedExperience: INDUSTRIAL_IMAGES.industries.paperMills.verifiedExperience,
  },
  {
    id: 'steel-plants',
    name: 'Steel Plants',
    description:
      'Heavy mechanical and electrical overhaul for rolling mill drives, high-pressure cooling pumps, and overhead crane switchgear.',
    icon: <Wrench className="w-5 h-5" />,
    href: ROUTES.PUBLIC.INDUSTRIES,
    imageUrl: INDUSTRIAL_IMAGES.industries.steelPlants.url,
    imageAlt: INDUSTRIAL_IMAGES.industries.steelPlants.alt,
    servicesProvided: INDUSTRIAL_IMAGES.industries.steelPlants.servicesProvided,
    vendorStatus: INDUSTRIAL_IMAGES.industries.steelPlants.vendorStatus,
    verifiedExperience: INDUSTRIAL_IMAGES.industries.steelPlants.verifiedExperience,
  },
  {
    id: 'dairy',
    name: 'Dairy Industries',
    description:
      'Preventive maintenance for milk processing homogenizers, ammonia refrigeration chillers, and sanitary centrifugal pumps.',
    icon: <Milk className="w-5 h-5" />,
    href: ROUTES.PUBLIC.INDUSTRIES,
    imageUrl: INDUSTRIAL_IMAGES.industries.dairy.url,
    imageAlt: INDUSTRIAL_IMAGES.industries.dairy.alt,
    servicesProvided: INDUSTRIAL_IMAGES.industries.dairy.servicesProvided,
    vendorStatus: INDUSTRIAL_IMAGES.industries.dairy.vendorStatus,
    verifiedExperience: INDUSTRIAL_IMAGES.industries.dairy.verifiedExperience,
  },
  {
    id: 'other',
    name: 'Other Industrial Plants',
    description:
      'Broad-spectrum breakdown support for biomass boilers, aquaculture feed pellet mills, and bulk agro-chemical equipment.',
    icon: <Cog className="w-5 h-5" />,
    href: ROUTES.PUBLIC.INDUSTRIES,
    imageUrl: INDUSTRIAL_IMAGES.industries.other.url,
    imageAlt: INDUSTRIAL_IMAGES.industries.other.alt,
    servicesProvided: INDUSTRIAL_IMAGES.industries.other.servicesProvided,
    vendorStatus: INDUSTRIAL_IMAGES.industries.other.vendorStatus,
    verifiedExperience: INDUSTRIAL_IMAGES.industries.other.verifiedExperience,
  },
];

/**
 * STRENGTHS DATA
 * Company strengths and value propositions.
 *
 * NOTE: Only verifiable operational qualities are listed.
 * No invented statistics, fake certifications, or unverified guarantees.
 * Content placeholders are marked for future company-verified data.
 */
const STRENGTHS: StrengthItemData[] = [
  {
    id: 'on-site-service',
    title: 'On-Site Service Capability',
    description:
      'Field service engineers available for on-site inspection, troubleshooting, and repair at your facility — minimizing equipment transport and reducing downtime.',
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    id: 'dedicated-support',
    title: 'Dedicated Technical Support',
    description:
      'Direct access to engineering support for service coordination, technical queries, and maintenance scheduling through a single point of contact.',
    icon: <Headphones className="w-5 h-5" />,
  },
  {
    id: 'multi-industry',
    title: 'Multi-Industry Experience',
    description:
      'Hands-on service experience across rice mills, textile plants, cashew processing, and general manufacturing equipment.',
    icon: <Target className="w-5 h-5" />,
  },
  {
    id: 'systematic-approach',
    title: 'Systematic Service Approach',
    description:
      'Structured service workflow from initial inspection through diagnosis, repair execution, testing, and documentation for every service request.',
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
];

/* ==========================================================================
 * HOME PAGE COMPONENT
 * ========================================================================== */

/**
 * HomePage — Production Home Page for Venkata Prasanna Enterprises
 *
 * Sections:
 * 1. Hero — Company identity, industrial positioning, CTAs
 * 2. Company Introduction — Who VPE is and what they do
 * 3. Engineer Introduction — Professional presentation
 * 4. Services Overview — Core industrial service cards
 * 5. Industries Served — Sectors supported
 * 6. Company Strengths — Verified operational capabilities
 * 7. Service Request CTA — Guide customers to request service
 * 8. Contact CTA — Contact information and action
 *
 * Footer is rendered by PublicLayout (shared component).
 */
export const HomePage: FC = () => {
  return (
    <>
      {/* ================================================================
          SECTION 1: HERO
          Industrial service positioning with authentic industrial images
          ================================================================ */}
      <section
        aria-labelledby="hero-title"
        className="relative bg-slate-900 text-white overflow-hidden"
      >
        {/* Subtle background machinery texture with dark overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-luminosity">
          <img
            src={INDUSTRIAL_IMAGES.hero.wideFactory.url}
            alt={INDUSTRIAL_IMAGES.hero.wideFactory.alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Abstract industrial grid */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        <Container size="2xl">
          <div className="relative z-10 py-16 sm:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Left Column: Headline, Description, and CTAs */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                {/* Eyebrow */}
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="amber" icon={<Wrench className="w-3.5 h-3.5" />}>
                    Venkata Prasanna Enterprises
                  </Badge>
                  <span className="text-xs font-mono text-slate-400">
                    Industrial Service & Breakdown Support
                  </span>
                </div>

                {/* Main Heading as Specified */}
                <h1
                  id="hero-title"
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1]"
                >
                  Reliable Industrial Service &{' '}
                  <span className="text-amber-400">Maintenance Solutions</span>
                </h1>

                {/* Supporting Description */}
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Comprehensive engineering care for rice mills, textile plants, cashew processing facilities,
                  ammonia refrigeration, and heavy industrial machinery. Field inspection, precision overhaul,
                  compressor tuning, and rapid technical dispatch.
                </p>

                {/* Action Buttons: Request a Service & Explore Our Services */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                    <Button
                      variant="industrial"
                      size="lg"
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                    >
                      Request a Service
                    </Button>
                  </Link>
                  <Link to={ROUTES.PUBLIC.SERVICES}>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                    >
                      Explore Our Services
                    </Button>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Certified Industrial Field Engineers
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    Rapid On-Site Breakdown Dispatch
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    Certified Service Documentation
                  </span>
                </div>
              </div>

              {/* Right Column: 5 Industrial Hero Reference Showcase */}
              <div className="lg:col-span-5 space-y-3">
                {/* Main Large Showcase Image: Wide Factory Maintenance */}
                <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative group bg-slate-800">
                  <IndustrialImage
                    src={INDUSTRIAL_IMAGES.hero.wideFactory.url}
                    alt={INDUSTRIAL_IMAGES.hero.wideFactory.alt}
                    aspectRatio="video"
                    objectFit="cover"
                    caption="Factory Operations & Continuous Machinery Maintenance"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-amber-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                    Industrial Service HQ
                  </div>
                </div>

                {/* 4 Thumbnail Reference Photos Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800 group relative">
                    <IndustrialImage
                      src={INDUSTRIAL_IMAGES.hero.technicianInspecting.url}
                      alt={INDUSTRIAL_IMAGES.hero.technicianInspecting.alt}
                      aspectRatio="square"
                      objectFit="cover"
                      className="h-20 w-full"
                    />
                    <span className="absolute bottom-1 inset-x-1 text-[9px] text-white bg-slate-950/80 px-1 py-0.5 rounded truncate text-center">
                      1. Inspection
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800 group relative">
                    <IndustrialImage
                      src={INDUSTRIAL_IMAGES.hero.motorCompressorServicing.url}
                      alt={INDUSTRIAL_IMAGES.hero.motorCompressorServicing.alt}
                      aspectRatio="square"
                      objectFit="cover"
                      className="h-20 w-full"
                    />
                    <span className="absolute bottom-1 inset-x-1 text-[9px] text-white bg-slate-950/80 px-1 py-0.5 rounded truncate text-center">
                      2. Compressor
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800 group relative">
                    <IndustrialImage
                      src={INDUSTRIAL_IMAGES.hero.machineRepair.url}
                      alt={INDUSTRIAL_IMAGES.hero.machineRepair.alt}
                      aspectRatio="square"
                      objectFit="cover"
                      className="h-20 w-full"
                    />
                    <span className="absolute bottom-1 inset-x-1 text-[9px] text-white bg-slate-950/80 px-1 py-0.5 rounded truncate text-center">
                      3. Repair
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800 group relative">
                    <IndustrialImage
                      src={INDUSTRIAL_IMAGES.hero.workshopFactory.url}
                      alt={INDUSTRIAL_IMAGES.hero.workshopFactory.alt}
                      aspectRatio="square"
                      objectFit="cover"
                      className="h-20 w-full"
                    />
                    <span className="absolute bottom-1 inset-x-1 text-[9px] text-white bg-slate-950/80 px-1 py-0.5 rounded truncate text-center">
                      4. Workshop
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 2: COMPANY INTRODUCTION
          Who VPE is and what they do.
          ================================================================ */}
      <section aria-labelledby="about-title" className="py-16 sm:py-20 lg:py-24 bg-white">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <SectionHeading
                badge="About VPE"
                title="Industrial Equipment Servicing for Your Facility"
                subtitle="Venkata Prasanna Enterprises is an industrial service company specializing in equipment maintenance, repair, and troubleshooting for manufacturing and processing plants."
                className="mb-0 sm:mb-0"
              />
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                <p>
                  We provide skilled engineering services directly at your plant location.
                  Our team works with a range of industrial equipment across multiple
                  sectors — from rice processing machinery and textile looms to cashew
                  plant equipment and general manufacturing systems.
                </p>
                <p>
                  Every service engagement follows a structured process: initial
                  assessment, diagnosis, service execution, testing, and proper
                  documentation — ensuring transparency and accountability at each step.
                </p>
              </div>
              <div className="pt-2">
                <Link to={ROUTES.PUBLIC.ABOUT}>
                  <Button
                    variant="outline"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Learn More About VPE
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual / Key Facts Panel */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-600" aria-hidden="true" />
                What We Do
              </h3>
              <ul className="space-y-4" role="list">
                {[
                  'On-site equipment inspection and condition assessment',
                  'Electrical and mechanical troubleshooting',
                  'Machine repair and component replacement',
                  'Preventive maintenance scheduling',
                  'Equipment installation and commissioning',
                  'Annual maintenance contract services',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-slate-200">
                <Link to={ROUTES.PUBLIC.SERVICES}>
                  <Button
                    variant="ghost"
                    size="sm"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    View All Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 3: ENGINEER INTRODUCTION
          Professional presentation of the founding engineer.
          Content placeholders are structured for future CMS/data connection.
          ================================================================ */}
      <section aria-labelledby="engineer-title" className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-y border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge="Our Engineer"
            title="Meet the Founder"
            subtitle="The driving force behind Venkata Prasanna Enterprises — hands-on expertise in industrial equipment servicing."
            align="center"
          />

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                {/* Profile Visual Area */}
                <div className="md:col-span-2 bg-slate-900 p-8 sm:p-10 flex flex-col items-center justify-center text-center text-white">
                  {/*
                    PLACEHOLDER: Engineer profile photo.
                    Replace the icon placeholder below with an actual <img> tag
                    when a professional photo is supplied.
                    Example:
                    <img
                      src="/images/engineer-profile.jpg"
                      alt="Venkata Prasanna — Founder and Lead Engineer"
                      className="w-32 h-32 rounded-full object-cover border-4 border-amber-500"
                    />
                  */}
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-amber-500/60 shadow-lg mb-4 bg-slate-800">
                    <IndustrialImage
                      src={INDUSTRIAL_IMAGES.about.leadEngineer.url}
                      alt={INDUSTRIAL_IMAGES.about.leadEngineer.alt}
                      aspectRatio="square"
                      objectFit="cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono mb-2 block">
                    (VPE Certified Field Specialist Reference)
                  </span>

                  <h3 id="engineer-title" className="text-xl sm:text-2xl font-bold tracking-tight">
                    {/* CONTENT PLACEHOLDER: Replace with actual engineer name */}
                    Venkata Prasanna
                  </h3>
                  <p className="text-amber-400 text-sm font-semibold mt-1">
                    Founder & Lead Service Engineer
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <Badge variant="amber" className="text-[11px]">Mechanical</Badge>
                    <Badge variant="amber" className="text-[11px]">Electrical</Badge>
                    <Badge variant="amber" className="text-[11px]">Industrial Equipment</Badge>
                  </div>
                </div>

                {/* Profile Content Area */}
                <div className="md:col-span-3 p-6 sm:p-8 lg:p-10 space-y-5">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-amber-600" aria-hidden="true" />
                      Professional Background
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {/*
                        CONTENT PLACEHOLDER:
                        Replace with actual verified professional background when available.
                        The text below is a structural placeholder only.
                      */}
                      Venkata Prasanna is the founder of Venkata Prasanna Enterprises, bringing
                      practical, hands-on expertise in servicing industrial equipment across
                      manufacturing and processing plants. His work spans mechanical repairs,
                      electrical troubleshooting, equipment installation, and preventive
                      maintenance programs.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-amber-600" aria-hidden="true" />
                      Areas of Expertise
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="list">
                      {[
                        'Rice mill equipment servicing',
                        'Textile machinery maintenance',
                        'Cashew plant equipment repair',
                        'Electrical system troubleshooting',
                        'Motor and pump overhauling',
                        'Preventive maintenance planning',
                      ].map((skill) => (
                        <li key={skill} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Link to={ROUTES.PUBLIC.CONTACT}>
                      <Button
                        variant="primary"
                        size="md"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        Get in Touch
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 4: SERVICES OVERVIEW
          Core industrial services displayed as reusable ServiceCard components.
          ================================================================ */}
      <section aria-labelledby="services-title" className="py-16 sm:py-20 lg:py-24 bg-white">
        <Container size="2xl">
          <SectionHeading
            badge="Our Services"
            title="Industrial Services We Provide"
            subtitle="From initial inspection to ongoing maintenance — structured, professional servicing for your plant equipment."
            align="center"
            action={
              <Link to={ROUTES.PUBLIC.SERVICES}>
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  All Services
                </Button>
              </Link>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 5: INDUSTRIES SERVED
          7 Core industry categories served by VPE with distinct image cards.
          ================================================================ */}
      <section aria-labelledby="industries-title" className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-y border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge="Industries We Serve"
            title="Equipment Servicing Across Key Industries"
            subtitle="We provide specialized maintenance and repair services to plants and factories across these 7 industrial sectors."
            align="center"
            action={
              <Link to={ROUTES.PUBLIC.INDUSTRIES}>
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  View All Industries
                </Button>
              </Link>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {INDUSTRIES.map((industry) => (
              <IndustryCard key={industry.id} industry={industry} />
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 6: WHY CHOOSE VPE / COMPANY STRENGTHS
          Verified operational capabilities only — no fabricated claims.
          ================================================================ */}
      <section aria-labelledby="strengths-title" className="py-16 sm:py-20 lg:py-24 bg-white">
        <Container size="2xl">
          <SectionHeading
            badge="Why Choose VPE"
            title="What Sets Our Service Apart"
            subtitle="Operational qualities that define how we work with our industrial clients."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {STRENGTHS.map((strength) => (
              <StrengthItem key={strength.id} strength={strength} />
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 7: SERVICE REQUEST CTA
          Clear guidance toward requesting industrial service.
          ================================================================ */}
      <section aria-labelledby="cta-title" className="py-16 sm:py-20 lg:py-24 bg-slate-900 text-white">
        <Container size="2xl">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="amber" icon={<Wrench className="w-3 h-3" />}>
              Ready to Get Started?
            </Badge>

            <h2
              id="cta-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
            >
              Need Industrial Equipment Servicing?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Whether your plant needs emergency troubleshooting, scheduled maintenance,
              or a comprehensive equipment inspection — submit a service request and our
              engineering team will coordinate with you.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                <Button
                  variant="industrial"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Submit Service Request
                </Button>
              </Link>
              <Link to={ROUTES.PUBLIC.SERVICES}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                >
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 8: CONTACT CTA
          Contact information and call-to-action.
          ================================================================ */}
      <section aria-labelledby="contact-title" className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-t border-slate-200">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Contact Text */}
            <div className="space-y-6">
              <SectionHeading
                badge="Contact Us"
                title="Get in Touch with Our Team"
                subtitle="Have questions about our industrial services or want to discuss maintenance requirements for your facility? We're here to help."
                className="mb-0 sm:mb-0"
              />
              <div className="pt-2">
                <Link to={ROUTES.PUBLIC.CONTACT}>
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Contact VPE
                  </Button>
                </Link>
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
              <h3 className="text-lg font-bold text-slate-900">Reach Us Directly</h3>

              <ul className="space-y-4" role="list">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Office Location</p>
                    {/*
                      CONTENT PLACEHOLDER:
                      Replace with actual company address when available.
                    */}
                    <p className="text-sm text-slate-600 mt-0.5">
                      Venkata Prasanna Enterprises, Industrial Area
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Phone</p>
                    {/*
                      CONTENT PLACEHOLDER:
                      Replace with actual phone number.
                    */}
                    <p className="text-sm text-slate-600 mt-0.5">
                      Contact number will be updated
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Email</p>
                    {/*
                      CONTENT PLACEHOLDER:
                      Replace with actual email address.
                    */}
                    <p className="text-sm text-slate-600 mt-0.5">
                      support@venkataprasannaenterprises.com
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Service Inquiries</p>
                    <p className="text-sm text-slate-600 mt-0.5">
                      For service requests, use our{' '}
                      <Link
                        to={ROUTES.CUSTOMER.SERVICE_REQUEST}
                        className="text-amber-700 font-semibold hover:text-amber-800 underline underline-offset-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                      >
                        online service request form
                      </Link>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer is rendered by PublicLayout (shared reusable component) */}
    </>
  );
};
