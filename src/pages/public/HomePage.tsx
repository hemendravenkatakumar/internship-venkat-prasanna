import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Container,
  SectionHeading,
  Button,
  Badge,
  IndustrialImage,
  Card,
  CardContent,
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
import { VPE_COMPANIES } from '@/data/vpeCompanies';
import { useLanguage } from '@/context/LanguageContext';
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
 * ========================================================================== */

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

export const HomePage: FC = () => {
  const { t, language } = useLanguage();
  const isTe = language === 'te';

  // Preview 6 prominent verified companies on home page
  const featuredCompanies = VPE_COMPANIES.slice(0, 6);

  return (
    <>
      {/* ================================================================
          SECTION 1: HERO
          ================================================================ */}
      <section
        aria-labelledby="hero-title"
        className="relative bg-slate-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-luminosity">
          <img
            src={INDUSTRIAL_IMAGES.hero.wideFactory.url}
            alt={INDUSTRIAL_IMAGES.hero.wideFactory.alt}
            className="w-full h-full object-cover"
          />
        </div>

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
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/15">
                    <img
                      src="/images/logo/logo.jpg"
                      alt="VPE Logo"
                      className="h-6 w-6 object-contain rounded bg-white p-0.5"
                    />
                    <span className="text-xs font-bold text-amber-400">
                      {t('home.hero_badge')}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {t('home.hero_tag')}
                  </span>
                </div>

                <h1
                  id="hero-title"
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1]"
                >
                  {isTe ? (
                    <>
                      విశ్వసనీయ పారిశ్రామిక సర్వీస్ &{' '}
                      <span className="text-amber-400">నిర్వహణ పరిష్కారాలు</span>
                    </>
                  ) : (
                    <>
                      Reliable Industrial Service &{' '}
                      <span className="text-amber-400">Maintenance Solutions</span>
                    </>
                  )}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  {t('home.hero_subtitle')}
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
                  <Link to={ROUTES.PUBLIC.SERVICES}>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                    >
                      {t('home.cta_explore')}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Visual Feature Box */}
              <div className="lg:col-span-5 space-y-3">
                <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 shadow-2xl group">
                  <div className="aspect-4/3 w-full overflow-hidden">
                    <img
                      src={INDUSTRIAL_IMAGES.hero.technicianInspecting.url}
                      alt={INDUSTRIAL_IMAGES.hero.technicianInspecting.alt}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-semibold text-white">
                        {isTe ? 'ఆన్-సైట్ ఇంజనీరింగ్ డిస్పాచ్' : 'On-Site Field Dispatch Ready'}
                      </span>
                    </div>
                    <span className="text-[11px] text-amber-400 font-mono">
                      +91 9866227780
                    </span>
                  </div>
                </div>

                {/* Sub-strip with 4 images */}
                <div className="grid grid-cols-4 gap-2">
                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800 relative">
                    <img
                      src={INDUSTRIAL_IMAGES.hero.motorCompressorServicing.url}
                      alt="Compressor"
                      className="h-16 w-full object-cover"
                    />
                    <span className="absolute bottom-0.5 inset-x-0.5 text-[8px] text-white bg-slate-950/80 rounded text-center truncate">
                      Compressors
                    </span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800 relative">
                    <img
                      src={INDUSTRIAL_IMAGES.hero.machineRepair.url}
                      alt="Repair"
                      className="h-16 w-full object-cover"
                    />
                    <span className="absolute bottom-0.5 inset-x-0.5 text-[8px] text-white bg-slate-950/80 rounded text-center truncate">
                      Repair
                    </span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800 relative">
                    <img
                      src={INDUSTRIAL_IMAGES.industries.riceMills.url}
                      alt="Rice Mill"
                      className="h-16 w-full object-cover"
                    />
                    <span className="absolute bottom-0.5 inset-x-0.5 text-[8px] text-white bg-slate-950/80 rounded text-center truncate">
                      Rice Mills
                    </span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800 relative">
                    <img
                      src={INDUSTRIAL_IMAGES.hero.workshopFactory.url}
                      alt="Workshop"
                      className="h-16 w-full object-cover"
                    />
                    <span className="absolute bottom-0.5 inset-x-0.5 text-[8px] text-white bg-slate-950/80 rounded text-center truncate">
                      Workshop
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
          ================================================================ */}
      <section aria-labelledby="about-title" className="py-16 sm:py-20 lg:py-24 bg-white">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo/logo.jpg"
                  alt="Venkata Prasanna Enterprises Official Logo"
                  className="h-12 w-12 object-contain rounded-xl bg-white border border-slate-200 shadow-xs p-1"
                />
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
                    Venkata Prasanna Enterprises
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Excellence in Every Service
                  </span>
                </div>
              </div>

              <SectionHeading
                badge={t('home.about_badge')}
                title={t('home.about_title')}
                subtitle={t('home.about_subtitle')}
                className="mb-0 sm:mb-0"
              />
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                <p>{t('home.about_p1')}</p>
                <p>{t('home.about_p2')}</p>
              </div>
              <div className="pt-2">
                <Link to={ROUTES.PUBLIC.ABOUT}>
                  <Button
                    variant="outline"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {t('home.about_learn_more')}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-600" aria-hidden="true" />
                {t('home.what_we_do')}
              </h3>
              <ul className="space-y-4" role="list">
                {[
                  isTe ? 'ఆన్-సైట్ పరికరాల తనిఖీ మరియు పరిస్థితి అంచనా' : 'On-site equipment inspection and condition assessment',
                  isTe ? 'ఎలక్ట్రికల్ మరియు మెకానికల్ ట్రబుల్షూటింగ్' : 'Electrical and mechanical troubleshooting',
                  isTe ? 'యంత్రాల మరమ్మతులు మరియు విడిభాగాల మార్పిడి' : 'Machine repair and component replacement',
                  isTe ? 'షెడ్యూల్ చేసిన నివారణ నిర్వహణ' : 'Preventive maintenance scheduling',
                  isTe ? 'నూతన యంత్రాల అమరిక మరియు ట్రయల్ రన్ కమిషనింగ్' : 'Equipment installation and commissioning',
                  isTe ? 'వార్షిక నిర్వహణ ఒప్పందాలు (AMC)' : 'Annual maintenance contract services',
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
                    {t('home.view_all_services')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 3: ENGINEER INTRODUCTION — FOUNDER: Y SRINIVAS
          ================================================================ */}
      <section aria-labelledby="engineer-title" className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-y border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge={t('home.founder_badge')}
            title={t('home.founder_title')}
            subtitle={t('home.founder_subtitle')}
            align="center"
          />

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                {/* Visual Area */}
                <div className="md:col-span-2 bg-slate-900 p-8 sm:p-10 flex flex-col items-center justify-center text-center text-white">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-amber-500/60 shadow-lg mb-4 bg-slate-800">
                    <IndustrialImage
                      src={INDUSTRIAL_IMAGES.about.leadEngineer.url}
                      alt={isTe ? 'వై. శ్రీనివాస్ — వ్యవస్థాపకుడు' : 'Y Srinivas — Founder & Lead Engineer'}
                      aspectRatio="square"
                      objectFit="cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono mb-2 block">
                    (VPE Certified Technical Lead)
                  </span>

                  <h3 id="engineer-title" className="text-xl sm:text-2xl font-bold tracking-tight">
                    {t('company.founder')}
                  </h3>
                  <p className="text-amber-400 text-sm font-semibold mt-1">
                    {t('company.founder_title')}
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <Badge variant="amber" className="text-[11px]">{isTe ? 'మెకానికల్' : 'Mechanical'}</Badge>
                    <Badge variant="amber" className="text-[11px]">{isTe ? 'ఎలక్ట్రికల్' : 'Electrical'}</Badge>
                    <Badge variant="amber" className="text-[11px]">{isTe ? 'కంప్రెసర్లు' : 'Industrial Compressors'}</Badge>
                  </div>
                </div>

                {/* Profile Content Area */}
                <div className="md:col-span-3 p-6 sm:p-8 lg:p-10 space-y-5">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-amber-600" aria-hidden="true" />
                      {t('home.founder_pro_bg')}
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {t('home.founder_bg_text')}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-amber-600" aria-hidden="true" />
                      {t('home.founder_expertise')}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="list">
                      {[
                        isTe ? 'వరి మిల్లుల యంత్రాల సర్వీసింగ్' : 'Rice mill equipment servicing',
                        isTe ? 'టెక్స్‌టైల్ యంత్రాల నిర్వహణ' : 'Textile machinery maintenance',
                        isTe ? 'జీడిపప్పు ప్లాంట్ మరమ్మతులు' : 'Cashew plant equipment repair',
                        isTe ? 'ఎలక్ట్రికల్ సిస్టమ్ ట్రబుల్షూటింగ్' : 'Electrical system troubleshooting',
                        isTe ? 'మోటార్లు & కంప్రెసర్ల ఓవర్‌హాల్' : 'Motor and compressor overhauling',
                        isTe ? 'నివారణ నిర్వహణ ప్రణాళిక' : 'Preventive maintenance planning',
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
                        {t('home.get_in_touch')}
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
          ================================================================ */}
      <section aria-labelledby="services-title" className="py-16 sm:py-20 lg:py-24 bg-white">
        <Container size="2xl">
          <SectionHeading
            badge={t('home.services_badge')}
            title={t('home.services_title')}
            subtitle={t('home.services_subtitle')}
            align="center"
            action={
              <Link to={ROUTES.PUBLIC.SERVICES}>
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {t('home.view_all_services')}
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
          SECTION 5: MY SERVICES — 26 COMPANIES & INDUSTRIES SERVED
          ================================================================ */}
      <section aria-labelledby="industries-title" className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-y border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge={t('home.my_services_badge')}
            title={t('home.my_services_title')}
            subtitle={t('home.my_services_subtitle')}
            align="center"
            action={
              <Link to={ROUTES.PUBLIC.INDUSTRIES}>
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {t('companies.view_all')}
                </Button>
              </Link>
            }
          />

          {/* Featured Company Cards Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredCompanies.map((comp) => {
              const companyName = isTe ? comp.nameTe : comp.name;
              const sectorName = isTe ? comp.sectorTe : comp.sector;
              const experienceText = isTe ? comp.experienceTe : comp.experience;

              return (
                <Card
                  key={comp.id}
                  variant="default"
                  className="group hover:border-amber-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
                >
                  <div className="relative h-36 overflow-hidden bg-slate-950">
                    <img
                      src={comp.imageUrl}
                      alt={comp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center">
                        {comp.id}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-200 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                        {sectorName}
                      </span>
                    </div>

                    {comp.isVendorRegistered && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-950 bg-emerald-400 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-950" />
                          <span>{isTe ? 'వెండర్ రిజిస్ట్రేషన్' : 'Vendor Registered'}</span>
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-2.5 left-3 right-3">
                      <h4 className="text-sm font-bold text-white drop-shadow-xs line-clamp-1">
                        {companyName}
                      </h4>
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div className="text-xs space-y-1.5">
                      <div className="flex justify-between items-center text-slate-600">
                        <span>{t('companies.sector')}:</span>
                        <span className="font-semibold text-slate-800">{sectorName}</span>
                      </div>
                      {comp.experience && (
                        <div className="flex justify-between items-center text-slate-600">
                          <span>{t('companies.experience')}:</span>
                          <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {experienceText}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* View Full 26 Companies CTA Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                {isTe ? 'అన్ని 26 కంపెనీల వివరాలు' : 'Comprehensive Client Portfolio'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                {isTe
                  ? 'మొత్తం 26 ప్రముఖ పరిశ్రమలు మరియు క్లయింట్ అనుభవాన్ని పరిశీలించండి'
                  : 'Explore All 26 Verified Industrial Client Records & Experience'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                {isTe
                  ? 'శ్రీ లలిత రైస్ ఇండస్ట్రీ, అదానీ విల్మర్, IOCL, HPCL, AM/NS స్టీల్, అట్లాస్ కాప్కో మరియు మరిన్ని.'
                  : 'Including Sri Lalitha Rice Industry, Adani Wilmar, IOCL, HPCL, AM/NS Steel, Atlas Copco, and more.'}
              </p>
            </div>
            <Link to={ROUTES.PUBLIC.INDUSTRIES} className="shrink-0">
              <Button variant="industrial" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t('companies.view_all')}
              </Button>
            </Link>
          </div>

          {/* 7 Core Industry Sector Nav Cards */}
          <div className="mt-14">
            <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Factory className="w-5 h-5 text-amber-600" />
              <span>{isTe ? 'ప్రధాన పారిశ్రామిక విభాగాలు' : 'Core Industry Categories'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {INDUSTRIES.map((industry) => (
                <IndustryCard key={industry.id} industry={industry} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 6: WHY CHOOSE VPE / COMPANY STRENGTHS
          ================================================================ */}
      <section aria-labelledby="strengths-title" className="py-16 sm:py-20 lg:py-24 bg-white">
        <Container size="2xl">
          <SectionHeading
            badge={t('home.strengths_badge')}
            title={t('home.strengths_title')}
            subtitle={t('home.strengths_subtitle')}
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
          ================================================================ */}
      <section aria-labelledby="cta-title" className="py-16 sm:py-20 lg:py-24 bg-slate-900 text-white">
        <Container size="2xl">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="amber" icon={<Wrench className="w-3 h-3" />}>
              {t('home.cta_badge')}
            </Badge>

            <h2
              id="cta-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
            >
              {t('home.cta_box_title')}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {t('home.cta_box_desc')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
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
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 8: CONTACT CTA
          ================================================================ */}
      <section aria-labelledby="contact-title" className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-t border-slate-200">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6">
              <SectionHeading
                badge={isTe ? 'సంప్రదించండి' : 'Contact Us'}
                title={isTe ? 'మా ఇంజనీరింగ్ బృందాన్ని సంప్రదించండి' : 'Get in Touch with Our Team'}
                subtitle={isTe ? 'పరిశ్రమల నిర్వహణ అవసరాల కొరకు లేదా బ్రేక్‌డౌన్ సర్వీస్ కొరకు మా బృందాన్ని సంప్రదించండి.' : 'Have questions about our industrial services or want to discuss maintenance requirements for your facility? We are here to help.'}
                className="mb-0 sm:mb-0"
              />
              <div className="pt-2">
                <Link to={ROUTES.PUBLIC.CONTACT}>
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    {t('home.get_in_touch')}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
              <h3 className="text-lg font-bold text-slate-900">
                {isTe ? 'నేరుగా సంప్రదించండి' : 'Reach Us Directly'}
              </h3>

              <ul className="space-y-4" role="list">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{isTe ? 'కార్యాలయం' : 'Office Location'}</p>
                    <p className="text-sm text-slate-600 mt-0.5">
                      Venkata Prasanna Enterprises, Andhra Pradesh, India
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{isTe ? 'ఫోన్ / వాట్సాప్' : 'Phone'}</p>
                    <a href="tel:+919866227780" className="text-sm text-slate-800 font-mono font-bold mt-0.5 block hover:text-amber-600">
                      +91 9866227780
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{isTe ? 'ఈమెయిల్' : 'Email'}</p>
                    <a href="mailto:venkataprasannaenterprises@gmail.com" className="text-sm text-slate-800 font-mono font-medium mt-0.5 block hover:text-amber-600">
                      venkataprasannaenterprises@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{isTe ? 'సర్వీస్ అభ్యర్థనలు' : 'Service Inquiries'}</p>
                    <p className="text-sm text-slate-600 mt-0.5">
                      {isTe ? 'ఆన్‌లైన్ సర్వీస్ టికెట్ సమర్పించండి: ' : 'For service requests, use our '}
                      <Link
                        to={ROUTES.CUSTOMER.SERVICE_REQUEST}
                        className="text-amber-700 font-semibold hover:text-amber-800 underline underline-offset-2"
                      >
                        {isTe ? 'సర్వీస్ రిక్వెస్ట్ ఫారమ్' : 'online service request form'}
                      </Link>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
