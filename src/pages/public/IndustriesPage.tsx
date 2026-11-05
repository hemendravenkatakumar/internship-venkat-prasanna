import { FC, useState, useMemo } from 'react';
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
import { INDUSTRIAL_IMAGES } from '@/config/images';
import { VPE_COMPANIES } from '@/data/vpeCompanies';
import { useLanguage } from '@/context/LanguageContext';
import {
  Factory,
  Droplets,
  Nut,
  Cog,
  Wrench,
  ArrowRight,
  Phone,
  HelpCircle,
  FileSpreadsheet,
  Milk,
  Clock,
  CheckCircle2,
  Search,
  Building2,
  ShieldCheck,
} from 'lucide-react';

/* ==========================================================================
 * INDUSTRIES SECTORS DATA
 * ========================================================================== */

const INDUSTRY_NAV_CARDS: IndustryCardData[] = [
  {
    id: 'rice-mills',
    name: '1. Rice Mills',
    description:
      'Specialized maintenance and repair for rubber roll hullers, paddy separators, polishers, sortex optical sorters, and grain bucket elevators.',
    icon: <Droplets className="w-5 h-5" />,
    href: '#industry-rice-mills',
    imageUrl: INDUSTRIAL_IMAGES.industries.riceMills.url,
    imageAlt: INDUSTRIAL_IMAGES.industries.riceMills.alt,
    servicesProvided: INDUSTRIAL_IMAGES.industries.riceMills.servicesProvided,
    vendorStatus: INDUSTRIAL_IMAGES.industries.riceMills.vendorStatus,
    verifiedExperience: INDUSTRIAL_IMAGES.industries.riceMills.verifiedExperience,
  },
  {
    id: 'textile',
    name: '2. Textile Industries',
    description:
      'Precision mechanical servicing and motor diagnostics for ring spinning frames, cone winders, rapier & air-jet looms, and processing drives.',
    icon: <Factory className="w-5 h-5" />,
    href: '#industry-textile',
    imageUrl: INDUSTRIAL_IMAGES.industries.textile.url,
    imageAlt: INDUSTRIAL_IMAGES.industries.textile.alt,
    servicesProvided: INDUSTRIAL_IMAGES.industries.textile.servicesProvided,
    vendorStatus: INDUSTRIAL_IMAGES.industries.textile.vendorStatus,
    verifiedExperience: INDUSTRIAL_IMAGES.industries.textile.verifiedExperience,
  },
  {
    id: 'cashew',
    name: '3. Cashew Industries',
    description:
      'Engineering care for steam boilers, automatic cutting machines, borma drying chambers, peeling drums, and vacuum packaging systems.',
    icon: <Nut className="w-5 h-5" />,
    href: '#industry-cashew',
    imageUrl: INDUSTRIAL_IMAGES.industries.cashew.url,
    imageAlt: INDUSTRIAL_IMAGES.industries.cashew.alt,
    servicesProvided: INDUSTRIAL_IMAGES.industries.cashew.servicesProvided,
    vendorStatus: INDUSTRIAL_IMAGES.industries.cashew.vendorStatus,
    verifiedExperience: INDUSTRIAL_IMAGES.industries.cashew.verifiedExperience,
  },
  {
    id: 'paper-mills',
    name: '4. Paper Mills',
    description:
      'Comprehensive plant maintenance for pulp roller bearings, calendar stack hydraulic tensioners, steam condensate pumps, and slurry agitators.',
    icon: <FileSpreadsheet className="w-5 h-5" />,
    href: '#industry-paper-mills',
    imageUrl: INDUSTRIAL_IMAGES.industries.paperMills.url,
    imageAlt: INDUSTRIAL_IMAGES.industries.paperMills.alt,
    servicesProvided: INDUSTRIAL_IMAGES.industries.paperMills.servicesProvided,
    vendorStatus: INDUSTRIAL_IMAGES.industries.paperMills.vendorStatus,
    verifiedExperience: INDUSTRIAL_IMAGES.industries.paperMills.verifiedExperience,
  },
  {
    id: 'steel-plants',
    name: '5. Steel Plants',
    description:
      'Heavy mechanical and electrical overhaul for rolling mill gear drives, high-pressure cooling water pumps, and overhead crane control switchgear.',
    icon: <Wrench className="w-5 h-5" />,
    href: '#industry-steel-plants',
    imageUrl: INDUSTRIAL_IMAGES.industries.steelPlants.url,
    imageAlt: INDUSTRIAL_IMAGES.industries.steelPlants.alt,
    servicesProvided: INDUSTRIAL_IMAGES.industries.steelPlants.servicesProvided,
    vendorStatus: INDUSTRIAL_IMAGES.industries.steelPlants.vendorStatus,
    verifiedExperience: INDUSTRIAL_IMAGES.industries.steelPlants.verifiedExperience,
  },
  {
    id: 'dairy',
    name: '6. Dairy Industries',
    description:
      'Preventive servicing for milk pasteurization homogenizers, ammonia refrigeration blast chillers, and sanitary stainless-steel centrifugal pumps.',
    icon: <Milk className="w-5 h-5" />,
    href: '#industry-dairy',
    imageUrl: INDUSTRIAL_IMAGES.industries.dairy.url,
    imageAlt: INDUSTRIAL_IMAGES.industries.dairy.alt,
    servicesProvided: INDUSTRIAL_IMAGES.industries.dairy.servicesProvided,
    vendorStatus: INDUSTRIAL_IMAGES.industries.dairy.vendorStatus,
    verifiedExperience: INDUSTRIAL_IMAGES.industries.dairy.verifiedExperience,
  },
  {
    id: 'manufacturing',
    name: '7. Other Industrial Plants',
    description:
      'Broad-spectrum breakdown support for biomass boilers, aquaculture feed pellet mills, bulk agro-chemical plants, and material handling conveyors.',
    icon: <Cog className="w-5 h-5" />,
    href: '#industry-manufacturing',
    imageUrl: INDUSTRIAL_IMAGES.industries.other.url,
    imageAlt: INDUSTRIAL_IMAGES.industries.other.alt,
    servicesProvided: INDUSTRIAL_IMAGES.industries.other.servicesProvided,
    vendorStatus: INDUSTRIAL_IMAGES.industries.other.vendorStatus,
    verifiedExperience: INDUSTRIAL_IMAGES.industries.other.verifiedExperience,
  },
];

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
      'Ring Spinning & Compact Spinning Frames',
      'High-Speed Auto-Coner Winding Units',
      'Rapier & Air-Jet Shuttleless Weaving Looms',
      'Carding & Draw Frame Drivetrains',
      'Textile Humidification & Suction Blower Systems',
      'AC Inverter Drives (VFD) for Textile Motors',
    ],
    ctaLabel: 'Request Textile Machinery Service',
    ctaHref: ROUTES.CUSTOMER.SERVICE_REQUEST,
  },
  {
    id: 'cashew',
    anchorId: 'industry-cashew',
    badge: 'Nut & Kernel Processing',
    name: 'Cashew Processing Plant Equipment',
    tagline: 'Maintenance and thermal system care for boiling, automatic cutting, borma drying, and peeling machinery.',
    overview:
      'Cashew processing combines thermal conditioning, automated mechanical shell-cracking, heated moisture extraction, and precision sorting. Caustic Cashew Nut Shell Liquid (CNSL) poses severe corrosion risks to machine frames, bearings, and cutting blades, while steam boilers and borma drying ovens require strict pressure and thermal regulation. VPE provides specialized engineering maintenance across the entire processing line.',
    icon: <Nut className="w-4 h-4" />,
    operationalChallenges: [
      'Corrosive CNSL oil degrading mechanical cutter bearings, linkages, and slide ways',
      'Uneven steam distribution and heat exchanger fouling in borma drying chambers',
      'Blade dulling and mechanical timing drift on automatic raw nut cutting machines',
      'Rubber roller wear and suction loss in pneumatic kernel peeling drums',
      'Kernel grading vibrating screens experiencing frame fatigue and spring failure',
    ],
    vpeSolutions: [
      'CNSL-resistant bearing replacement and mechanical linkage rebuilding',
      'Steam boiler manifold inspection, trap testing, and safety valve checks',
      'Automatic cutting blade realignment and cutter drive chain tensioning',
      'Borma chamber heating coil descaling and temperature sensor calibration',
      'Vibratory sorting screen dynamic balancing and eccentric weight adjustment',
      'Vacuum pump overhaul for nitrogen flushing and packaging lines',
    ],
    keyMachinery: [
      'Raw Cashew Nut Steam Cookers & Boilers',
      'Automatic Cashew Nut Shelling / Cutting Machines',
      'Borma Hot Air Drying Ovens & Steam Radiators',
      'Automatic Kernel Peeling & Air Separation Units',
      'Kernel Sizing & Grading Vibratory Sifters',
      'Vacuum Gas Packaging & Sealing Machines',
    ],
    ctaLabel: 'Request Cashew Machinery Service',
    ctaHref: ROUTES.CUSTOMER.SERVICE_REQUEST,
  },
  {
    id: 'paper-mills',
    anchorId: 'industry-paper-mills',
    badge: 'Pulp & Paper Processing',
    name: 'Paper Mill High-Tonnage Machinery',
    tagline: 'Hydraulic calibration, steam condensate management, and heavy pulp roll maintenance.',
    overview:
      'Paper mills operate under high thermal stress and extreme hydraulic pressures. High-tonnage calendar stacks and pulp suction rollers demand vibration-free rotational alignment. VPE provides specialized on-site mechanical and hydraulic overhauls.',
    icon: <FileSpreadsheet className="w-4 h-4" />,
    operationalChallenges: [
      'High-humidity steam atmosphere causing bearing surface corrosion and premature pitting',
      'Hydraulic roll tension drift causing uneven paper caliper and web tear',
      'Centrifugal slurry pump impeller erosion from abrasive wood pulp fibres',
    ],
    vpeSolutions: [
      'Ultrasonic bearing inspection and laser alignment for calendar rollers',
      'Hydraulic power unit valve cleaning, seal renewal, and pressure testing',
      'Slurry pump impeller balancing and mechanical shaft seal replacement',
    ],
    keyMachinery: [
      'Calendar Stack High-Tonnage Rollers',
      'Pulp Slurry Hydrapulpers & Agitators',
      'Steam Condensate Recovery Pumps',
      'Hydraulic Web Tensioning Controllers',
    ],
    ctaLabel: 'Request Paper Mill Service',
    ctaHref: ROUTES.CUSTOMER.SERVICE_REQUEST,
  },
  {
    id: 'steel-plants',
    anchorId: 'industry-steel-plants',
    badge: 'Heavy Metallurgy & Rolling',
    name: 'Steel Rolling Mill & Processing Plants',
    tagline: 'Heavy mechanical overhauls, high-pressure pump servicing, and industrial motor diagnostics.',
    overview:
      'Steel processing involves punishing temperatures, mechanical shocks, and non-stop operational schedules. VPE engineers provide rugged maintenance on rolling mill gear trains, cooling circuits, and high-capacity electrical switchgear.',
    icon: <Wrench className="w-4 h-4" />,
    operationalChallenges: [
      'Extreme thermal loads causing gear lubricant breakdown and tooth pitting',
      'High mechanical shock vibrations loosening heavy motor mountings and foundation bolts',
      'Cooling water pump scale buildup reducing heat dissipation efficiency',
    ],
    vpeSolutions: [
      'Heavy gearbox teardown, bearing replacement, and backlash setting',
      'Motor vibration spectral analysis and foundation re-torquing',
      'High-pressure cooling water pump reconditioning and impeller dynamic balancing',
    ],
    keyMachinery: [
      'Rolling Mill Reduction Gearboxes & Pinion Stands',
      'High-Pressure Descaling & Cooling Water Pumps',
      'Overhead Crane Electrical Control Panels',
      'Hydraulic Billet Shears & Cooling Beds',
    ],
    ctaLabel: 'Request Steel Plant Service',
    ctaHref: ROUTES.CUSTOMER.SERVICE_REQUEST,
  },
  {
    id: 'dairy',
    anchorId: 'industry-dairy',
    badge: 'Sanitary Food & Dairy',
    name: 'Dairy & Cold Chain Equipment',
    tagline: 'Ammonia refrigeration blast chillers, homogenizer seals, and sanitary pump servicing.',
    overview:
      'Dairy processing requires food-grade sanitary compliance combined with low-temperature ammonia refrigeration reliability. VPE ensures continuous cold-chain integrity and precision homogenizer maintenance.',
    icon: <Milk className="w-4 h-4" />,
    operationalChallenges: [
      'Refrigeration compressor valve fatigue under continuous low-temp loading',
      'Homogenizer high-pressure plunger seal degradation causing pressure loss',
      'Sanitary pump cavitation and CIP cleaning chemical corrosion',
    ],
    vpeSolutions: [
      'Ammonia compressor valve plate overhaul and leak testing',
      'Homogenizer ceramic plunger and tungsten carbide seat rebuilding',
      'Sanitary stainless-steel pump mechanical seal replacements',
    ],
    keyMachinery: [
      'Ammonia Blast Chillers & Screw Compressors',
      'High-Pressure Milk Homogenizers',
      'Sanitary Stainless Steel Centrifugal Pumps',
      'Plate Heat Exchanger (PHE) Manifolds',
    ],
    ctaLabel: 'Request Dairy Service',
    ctaHref: ROUTES.CUSTOMER.SERVICE_REQUEST,
  },
  {
    id: 'manufacturing',
    anchorId: 'industry-manufacturing',
    badge: 'General Industrial Manufacturing',
    name: 'Agro-Chemical, Feed & General Manufacturing',
    tagline: 'Biomass boiler utility circuits, feed pellet mills, and plant-wide mechanical overhauls.',
    overview:
      'From animal feed pelleting plants to agro-chemical mixing facilities, VPE delivers broad-spectrum electromechanical maintenance, conveyor alignment, and compressor support.',
    icon: <Cog className="w-4 h-4" />,
    operationalChallenges: [
      'Abrasive feed dust causing conveyor roller seizure and motor burnouts',
      'Biomass boiler feed pump high-temperature seal failures',
      'Air compressor moisture contamination in pneumatic controls',
    ],
    vpeSolutions: [
      'Conveyor drive chain tensioning, bearing replacement, and motor diagnostics',
      'Boiler boiler feed water pump overhaul with high-temp mechanical seals',
      'Pneumatic air dryer refrigeration circuit and desiccant valve maintenance',
    ],
    keyMachinery: [
      'Feed Pellet Extruders & Ring Dies',
      'Biomass Boiler Feed Water Multistage Pumps',
      'Pneumatic Conveying Rotary Air Lock Valves',
      'Central Plant Air Compressors & Refrigerated Air Dryers',
    ],
    ctaLabel: 'Request General Industrial Service',
    ctaHref: ROUTES.CUSTOMER.SERVICE_REQUEST,
  },
];

export const IndustriesPage: FC = () => {
  const { t, language } = useLanguage();
  const isTe = language === 'te';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCompanies = useMemo(() => {
    return VPE_COMPANIES.filter((company) => {
      const matchesCategory =
        selectedCategory === 'all' || company.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        company.name.toLowerCase().includes(q) ||
        company.nameTe.toLowerCase().includes(q) ||
        company.sector.toLowerCase().includes(q) ||
        company.sectorTe.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      {/* ================================================================
          SECTION 1: PAGE HERO
          My Services — 26 Verified Companies & Industries Served
          ================================================================ */}
      <section
        aria-labelledby="industries-hero-title"
        className="relative bg-slate-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-luminosity">
          <img
            src={INDUSTRIAL_IMAGES.hero.wideFactory.url}
            alt={INDUSTRIAL_IMAGES.hero.wideFactory.alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ind-hero-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ind-hero-grid)" />
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
                <li className="text-amber-400 font-semibold">{t('nav.industries')}</li>
              </ol>
            </nav>

            <div className="max-w-4xl space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="amber" icon={<Building2 className="w-3 h-3" />}>
                  {t('home.my_services_badge')}
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  {isTe ? '26 ధృవీకరించబడిన కంపెనీలు' : '26 Verified Industrial Clients'}
                </span>
              </div>

              <h1
                id="industries-hero-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
              >
                {t('home.my_services_title')}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                {t('home.my_services_subtitle')}
              </p>

              {/* Action CTAs */}
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

            {/* Quick Metrics Strip */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-white">11 Completed Vendor Registrations</strong> on verified record
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-white">Up to 20+ Years</strong> service tenure with major industrial facilities
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Factory className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-white">Rice, Steel, Oil, Energy, Dairy, Textiles & Paper</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 2: 26 VERIFIED COMPANIES & INDUSTRIES SHOWCASE
          Filtered by Sector & Search, showing Duration and Registration Badge
          ================================================================ */}
      <section id="companies-showcase" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <Container size="2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <Badge variant="amber" icon={<Building2 className="w-3 h-3" />}>
                {isTe ? 'అధికారిక రికార్డు' : 'Official Document Handover'}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                {t('companies.title')}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1">
                {t('companies.subtitle')}
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('companies.search_placeholder')}
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Sector Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none text-xs font-semibold">
            {[
              { id: 'all', label: t('companies.all_filter') },
              { id: 'rice', label: t('companies.filter_rice') },
              { id: 'food', label: t('companies.filter_food') },
              { id: 'oil_energy', label: t('companies.filter_oil_energy') },
              { id: 'steel', label: t('companies.filter_steel') },
              { id: 'equipment', label: t('companies.filter_equipment') },
              { id: 'textiles', label: t('companies.filter_textiles') },
              { id: 'dairy', label: t('companies.filter_dairy') },
              { id: 'paper', label: t('companies.filter_paper') },
              { id: 'cashew', label: t('companies.filter_cashew') },
              { id: 'other', label: t('companies.filter_other') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-2 rounded-lg border whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((comp) => {
              const companyName = isTe ? comp.nameTe : comp.name;
              const sectorName = isTe ? comp.sectorTe : comp.sector;
              const experienceText = isTe ? comp.experienceTe : comp.experience;

              return (
                <Card
                  key={comp.id}
                  variant="default"
                  className="group hover:border-amber-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
                >
                  <div className="relative h-40 overflow-hidden bg-slate-950">
                    <img
                      src={comp.imageUrl}
                      alt={comp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    {/* Index Number & Sector Pill */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-amber-500 text-slate-950 text-xs font-black flex items-center justify-center shadow-xs">
                        {comp.id}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-200 bg-slate-900/80 backdrop-blur-xs px-2.5 py-0.5 rounded border border-slate-700">
                        {sectorName}
                      </span>
                    </div>

                    {/* Registration Status Badge in top right */}
                    {comp.isVendorRegistered && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-950 bg-emerald-400 px-2.5 py-0.5 rounded-full shadow-xs">
                          <CheckCircle2 className="w-3 h-3 text-emerald-950" />
                          <span>{isTe ? 'వెండర్ రిజిస్ట్రేషన్' : 'Vendor Registered'}</span>
                        </span>
                      </div>
                    )}

                    {/* Title in image overlay bottom */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-base font-bold text-white leading-snug drop-shadow-xs">
                        {companyName}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">{t('companies.sector')}:</span>
                        <span className="font-semibold text-slate-800 text-right">{sectorName}</span>
                      </div>

                      {/* Display duration ONLY when supplied in document */}
                      {comp.experience ? (
                        <div className="flex items-center justify-between py-1 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">{t('companies.experience')}:</span>
                          <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {experienceText}
                          </span>
                        </div>
                      ) : null}

                      {/* Display Vendor Registration Badge ONLY when confirmed in document */}
                      <div className="flex items-center justify-between py-1">
                        <span className="text-slate-500 font-medium">{isTe ? 'వెండర్ స్థితి' : 'Vendor Status'}:</span>
                        {comp.isVendorRegistered ? (
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{t('companies.badge_registered')}</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">
                            {isTe ? 'ధృవీకరించబడిన సేవా ఖాతాదారు' : 'Verified Service Client'}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                        <Button
                          variant="outline"
                          size="sm"
                          fullWidth
                          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                          className="text-xs group-hover:border-amber-500 group-hover:text-amber-700"
                        >
                          {isTe ? 'సేవను అభ్యర్థించండి' : 'Request Machinery Service'}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8">
              <p className="text-sm text-slate-500">
                {isTe
                  ? 'మీ శోధనకు తగిన కంపెనీలు కనుగొనబడలేదు.'
                  : 'No companies match your current search or sector filter.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs font-semibold text-amber-600 hover:text-amber-700"
              >
                {isTe ? 'అన్ని కంపెనీలను చూడండి' : 'Clear filters & view all 26'}
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* ================================================================
          SECTION 3: 7 CORE INDUSTRY SECTOR CARDS
          Quick navigation to deep sector technical specifications
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
          SECTION 4: DETAILED INDUSTRY-SPECIFIC SERVICE EXPLANATIONS
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
          SECTION 5: PRIMARY SERVICE REQUEST CTA
          ================================================================ */}
      <section aria-labelledby="service-request-cta" className="py-14 sm:py-18 bg-slate-900 text-white">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-3">
              <Badge variant="amber" icon={<Wrench className="w-3 h-3" />}>
                {t('home.cta_badge')}
              </Badge>
              <h2 id="service-request-cta" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t('home.cta_box_title')}
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                {t('home.cta_box_desc')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST} className="w-full sm:w-auto">
                <Button variant="industrial" size="lg" fullWidth rightIcon={<ArrowRight className="w-5 h-5" />}>
                  {t('request.submit_btn')}
                </Button>
              </Link>
              <Link to={ROUTES.PUBLIC.SERVICES} className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" fullWidth className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  {t('home.cta_explore')}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 6: CONTACT & CONSULTATION CTA
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
                    {isTe
                      ? 'మీ ప్లాంట్‌కు ఏ సర్వీస్ అవసరమో సందేహం ఉందా?'
                      : 'Not Sure Which Service Category Fits Your Plant?'}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {isTe
                      ? 'మీ యంత్రాలు సంక్లిష్టమైన సమస్యలను ఎదుర్కొంటుంటే లేదా వార్షిక నిర్వహణ ఒప్పందం (AMC) పరిశీలిస్తుంటే, మా లీడ్ ఇంజనీర్ వై. శ్రీనివాస్ గారిని నేరుగా సంప్రదించండి.'
                      : 'If your machinery is displaying complex intermittent faults or you are evaluating a plant-wide Annual Maintenance Contract, contact our lead engineer Y Srinivas directly.'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-center md:items-end">
                  <Link to={ROUTES.PUBLIC.CONTACT} className="w-full sm:w-auto md:w-64">
                    <Button variant="primary" size="md" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                      {t('home.get_in_touch')}
                    </Button>
                  </Link>
                  <Link to={ROUTES.PUBLIC.ABOUT} className="w-full sm:w-auto md:w-64">
                    <Button variant="outline" size="md" fullWidth>
                      {t('home.about_learn_more')}
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  );
};
