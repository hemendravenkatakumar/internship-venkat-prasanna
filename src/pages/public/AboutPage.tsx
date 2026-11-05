import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Container,
  SectionHeading,
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  IndustrialImage,
} from '@/components/common';
import { INDUSTRIAL_IMAGES } from '@/config/images';
import { useLanguage } from '@/context/LanguageContext';
import {
  ArrowRight,
  Wrench,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Handshake,
  ClipboardCheck,
  BookOpen,
  Cog,
  Zap,
  Search,
  Settings,
  CalendarCheck,
  AlertTriangle,
  Building2,
} from 'lucide-react';

interface ExpertiseArea {
  id: string;
  title: string;
  titleTe: string;
  description: string;
  descriptionTe: string;
  icon: ReactNode;
}

const EXPERTISE_AREAS: ExpertiseArea[] = [
  {
    id: 'mechanical',
    title: 'Mechanical Equipment Servicing',
    titleTe: 'మెకానికల్ పరికరాల సర్వీసింగ్',
    description:
      'Hands-on repair, overhaul, and maintenance of motors, pumps, gearboxes, conveyors, and production line machinery across industrial plants.',
    descriptionTe:
      'మోటార్లు, పంపులు, గేర్‌బాక్స్‌లు, కన్వేయర్లు మరియు ఉత్పాదక లైన్ యంత్రాల ఆన్-సైట్ మరమ్మతులు మరియు నిర్వహణ.',
    icon: <Cog className="w-5 h-5" />,
  },
  {
    id: 'electrical',
    title: 'Electrical System Troubleshooting',
    titleTe: 'ఎలక్ట్రికల్ సిస్టమ్ ట్రబుల్షూటింగ్',
    description:
      'Fault diagnosis, wiring repair, panel servicing, and electrical safety testing for industrial power distribution and control circuits.',
    descriptionTe:
      'పారిశ్రామిక విద్యుత్ నియంత్రణ ప్యానెల్స్, వైరింగ్ మరియు కంట్రోల్ సర్క్యూట్ల లోప నిర్ధారణ మరియు మరమ్మతులు.',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 'inspection',
    title: 'Equipment Inspection & Assessment',
    titleTe: 'పరికరాల తనిఖీ & విశ్లేషణ',
    description:
      'Systematic condition evaluation to identify wear, damage, and potential failures before they cause unplanned production shutdowns.',
    descriptionTe:
      'ఉత్పాదక ఆగిపోకముందే అరుగుదల, లోపాలు మరియు వైఫల్యాలను గుర్తించే ముందస్తు శాస్త్రీయ తనిఖీ.',
    icon: <Search className="w-5 h-5" />,
  },
  {
    id: 'preventive',
    title: 'Preventive Maintenance Programs',
    titleTe: 'నివారణ నిర్వహణ ప్రణాళికలు',
    description:
      'Structured maintenance schedules designed to extend equipment lifespan, reduce breakdown frequency, and maintain operational efficiency.',
    descriptionTe:
      'యంత్రాల జీవితకాలాన్ని పెంచడానికి మరియు బ్రేక్‌డౌన్‌లను నివారించడానికి క్రమబద్ధమైన నిర్వహణ షెడ్యూల్స్.',
    icon: <Settings className="w-5 h-5" />,
  },
  {
    id: 'installation',
    title: 'Installation & Commissioning',
    titleTe: 'పరికరాల అమరిక & కమిషనింగ్',
    description:
      'Professional setup, alignment, testing, and handover of newly procured industrial machinery and electrical systems.',
    descriptionTe:
      'కొత్త యంత్రాల లేజర్ అలైన్‌మెంట్, ఎలక్ట్రికల్ ఇంటర్‌కనెక్షన్ మరియు ట్రయల్ రన్ విజయవంతమైన నిర్వహణ.',
    icon: <CalendarCheck className="w-5 h-5" />,
  },
  {
    id: 'emergency',
    title: 'Breakdown & Emergency Response',
    titleTe: 'బ్రేక్‌డౌన్ & అత్యవసర స్పందన',
    description:
      'Rapid diagnostic support and on-site repair services when critical equipment failures threaten production continuity.',
    descriptionTe:
      'కీలకమైన యంత్ర వైఫల్యాల సమయంలో ప్లాంట్ ఉత్పత్తి ఆగకుండా వేగవంతమైన ఆన్-సైట్ మరమ్మతు సేవలు.',
    icon: <AlertTriangle className="w-5 h-5" />,
  },
];

interface ServiceValue {
  id: string;
  title: string;
  titleTe: string;
  description: string;
  descriptionTe: string;
  icon: ReactNode;
}

const SERVICE_VALUES: ServiceValue[] = [
  {
    id: 'transparency',
    title: 'Transparent Service Process',
    titleTe: 'పారదర్శక సేవా విధానం',
    description:
      'Every service engagement is documented — from initial assessment through diagnosis, repair, and testing. Clients receive clear communication at each step.',
    descriptionTe:
      'పరిశీలన నుండి మరమ్మతు మరియు పరీక్ష వరకు ప్రతి దశ అధికారిక ఇంజనీర్ సర్వీస్ రికార్డ్ ద్వారా డాక్యుమెంట్ చేయబడుతుంది.',
    icon: <ClipboardCheck className="w-5 h-5" />,
  },
  {
    id: 'reliability',
    title: 'Dependable Execution',
    titleTe: 'విశ్వసనీయమైన పనితీరు',
    description:
      'We commit to completing service work as scoped. When issues arise during servicing, they are communicated promptly with recommended next steps.',
    descriptionTe:
      'ఖచ్చితమైన సమయపాలనతో నాణ్యమైన ఇంజనీరింగ్ సేవలను అందించడంలో మా నిబద్ధత ఎల్లప్పుడూ ఉంటుంది.',
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    id: 'responsiveness',
    title: 'Responsive Communication',
    titleTe: 'త్వరిత సంప్రదింపులు',
    description:
      'Timely response to service inquiries, clear scheduling, and regular progress updates throughout the service cycle.',
    descriptionTe:
      'సర్వీస్ అభ్యర్థనలకు తక్షణ స్పందన మరియు స్పష్టమైన విజిట్ షెడ్యూలింగ్ అందించబడుతుంది.',
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: 'partnership',
    title: 'Client Partnership Approach',
    titleTe: 'దీర్ఘకాలిక భాగస్వామ్యం',
    description:
      'We work alongside plant managers and maintenance teams, understanding facility-specific requirements rather than applying one-size-fits-all solutions.',
    descriptionTe:
      'పరిశ్రమల అవసరాలకు అనుగుణంగా శాశ్వత విశ్వసనీయతను నిర్మించే విధంగా మేము భాగస్వామ్యంతో పనిచేస్తాము.',
    icon: <Handshake className="w-5 h-5" />,
  },
];

export const AboutPage: FC = () => {
  const { t, language } = useLanguage();
  const isTe = language === 'te';

  return (
    <>
      {/* ================================================================
          SECTION 1: PAGE HERO
          ================================================================ */}
      <section
        aria-labelledby="about-hero-title"
        className="bg-slate-900 text-white"
      >
        <Container size="2xl">
          <div className="py-14 sm:py-18 lg:py-22">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-slate-400">
                <li>
                  <Link to={ROUTES.PUBLIC.HOME} className="hover:text-white transition-colors">
                    {t('nav.home')}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-amber-400 font-semibold">{t('nav.about')}</li>
              </ol>
            </nav>

            <div className="max-w-3xl space-y-5">
              <Badge variant="amber" icon={<BookOpen className="w-3 h-3" />}>
                {isTe ? 'మా సంస్థ గురించి' : 'About Our Company'}
              </Badge>

              <h1
                id="about-hero-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
              >
                {isTe ? (
                  <>
                    <span className="text-amber-400">వెంకట ప్రసన్న ఎంటర్‌ప్రైజెస్</span> గురించి
                  </>
                ) : (
                  <>
                    About <span className="text-amber-400">Venkata Prasanna Enterprises</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {t('about.page_subtitle')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 2: COMPANY BACKGROUND & FACTS
          ================================================================ */}
      <section aria-labelledby="company-bg-title" className="py-16 sm:py-20 lg:py-24 bg-white">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-y-6">
              <SectionHeading
                badge={isTe ? 'కంపెనీ నేపథ్యం' : 'Company Overview'}
                title={t('about.mission_title')}
                subtitle={t('about.mission_desc')}
                className="mb-0 sm:mb-0"
              />
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                <p>
                  {isTe
                    ? 'వెంకట ప్రసన్న ఎంటర్‌ప్రైజెస్ ఆంధ్రప్రదేశ్ మరియు సమీప పారిశ్రామిక ప్రాంతాలలో వరి మిల్లులు, టెక్స్‌టైల్స్, ఫుడ్ ప్రాసెసింగ్, ఆయిల్ & ఎనర్జీ, స్టీల్ ప్లాంట్లు మరియు పారిశ్రామిక కంప్రెసర్లకు నిపుణుల ఇంజనీరింగ్ సేవలను అందిస్తోంది.'
                    : 'Venkata Prasanna Enterprises provides skilled engineering services directly at industrial plant locations across Andhra Pradesh and neighbouring industrial corridors — specializing in rice mills, textiles, edible oils, steel, energy facilities, and high-pressure compressor systems.'}
                </p>
                <p>
                  {isTe
                    ? 'ప్రతి ప్రాజెక్ట్ చట్టబద్ధమైన నిబంధనలు మరియు పారిశ్రామిక భద్రతా ప్రమాణాలకు అనుగుణంగా నిర్వహించబడుతుంది. మా సేవలు GST నమోదిత (37ADYPY2158A1Z1) పద్ధతిలో ఖచ్చితమైన విడిభాగాలు మరియు పారదర్శకతతో ఉంటాయి.'
                    : 'Every engagement complies with statutory guidelines and industrial safety protocols. Our services operate under verified GST registration (37ADYPY2158A1Z1) ensuring full commercial transparency.'}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link to={ROUTES.PUBLIC.INDUSTRIES}>
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    {t('nav.industries')} (26)
                  </Button>
                </Link>
                <Link to={ROUTES.PUBLIC.VENDOR_EXPERIENCE}>
                  <Button variant="outline" size="md">
                    {t('nav.vendor_experience')}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Facts Card with Verified Company Information */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-600" aria-hidden="true" />
                {isTe ? 'అధికారిక సంస్థ వివరాలు' : 'Verified Enterprise Facts'}
              </h3>

              <dl className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start justify-between py-2 border-b border-slate-200">
                  <dt className="text-slate-500 font-medium">{isTe ? 'సంస్థ పేరు' : 'Company Name'}</dt>
                  <dd className="font-bold text-slate-900 text-right">Venkata Prasanna Enterprises</dd>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-slate-200">
                  <dt className="text-slate-500 font-medium">{isTe ? 'వ్యవస్థాపకుడు' : 'Founder'}</dt>
                  <dd className="font-bold text-amber-700 text-right">Y Srinivas</dd>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-slate-200">
                  <dt className="text-slate-500 font-medium">{isTe ? 'హోదా' : 'Designation'}</dt>
                  <dd className="font-semibold text-slate-800 text-right">Founder & Lead Service Engineer</dd>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-slate-200">
                  <dt className="text-slate-500 font-medium">GSTIN</dt>
                  <dd className="font-mono font-bold text-slate-900 text-right">37ADYPY2158A1Z1</dd>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-slate-200">
                  <dt className="text-slate-500 font-medium">{isTe ? 'ఫోన్ నంబర్' : 'Phone'}</dt>
                  <dd className="font-mono font-bold text-slate-900 text-right">+91 9866227780</dd>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-slate-200">
                  <dt className="text-slate-500 font-medium">{isTe ? 'ఈమెయిల్' : 'Email'}</dt>
                  <dd className="font-mono text-slate-800 text-right break-all">venkataprasannaenterprises@gmail.com</dd>
                </div>

                <div className="flex items-start justify-between py-2 border-b border-slate-200">
                  <dt className="text-slate-500 font-medium">{isTe ? 'స్థావరం' : 'Location'}</dt>
                  <dd className="font-medium text-slate-800 text-right">Andhra Pradesh, India</dd>
                </div>

                <div className="flex items-start justify-between py-2">
                  <dt className="text-slate-500 font-medium">{isTe ? 'నిర్వహణ సమయం' : 'Availability'}</dt>
                  <dd className="font-bold text-emerald-700 text-right">{t('company.support_availability')}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 3: ENGINEER PROFILE — FOUNDER: Y SRINIVAS
          ================================================================ */}
      <section aria-labelledby="engineer-profile-title" className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-y border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge={t('home.founder_badge')}
            title={isTe ? 'వ్యవస్థాపకుడు & లీడ్ ఇంజనీర్' : 'Meet the Founder & Lead Engineer'}
            subtitle={t('home.founder_subtitle')}
            align="center"
          />

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-2 bg-slate-900 p-8 sm:p-10 flex flex-col items-center justify-center text-center text-white">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-amber-500/70 shadow-xl mb-3 bg-slate-800">
                    <IndustrialImage
                      src={INDUSTRIAL_IMAGES.about.leadEngineer.url}
                      alt="Y Srinivas — Founder & Lead Engineer"
                      aspectRatio="square"
                      objectFit="cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono mb-2 block">
                    (VPE Certified Technical Lead)
                  </span>

                  <h3
                    id="engineer-profile-title"
                    className="text-xl sm:text-2xl font-bold tracking-tight"
                  >
                    {t('company.founder')}
                  </h3>
                  <p className="text-amber-400 text-sm font-semibold mt-1">
                    {t('company.founder_title')}
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    <Badge variant="amber" className="text-[11px]">{isTe ? 'మెకానికల్' : 'Mechanical'}</Badge>
                    <Badge variant="amber" className="text-[11px]">{isTe ? 'ఎలక్ట్రికల్' : 'Electrical'}</Badge>
                    <Badge variant="amber" className="text-[11px]">{isTe ? 'పరికరాలు' : 'Industrial Equipment'}</Badge>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 w-full">
                    <Link to={ROUTES.PUBLIC.CONTACT}>
                      <Button
                        variant="industrial"
                        size="md"
                        fullWidth
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        {isTe ? 'నేరుగా సంప్రదించండి' : 'Contact Directly'}
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="md:col-span-3 p-6 sm:p-8 lg:p-10 space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-600" aria-hidden="true" />
                      {t('home.founder_pro_bg')}
                    </h4>
                    <div className="text-sm text-slate-700 leading-relaxed space-y-3">
                      <p>{t('home.founder_bg_text')}</p>
                      <p>
                        {isTe
                          ? 'శ్రీ లలిత రైస్ ఇండస్ట్రీ, శ్రీ మురళీ మోహన రైస్ మిల్, అదానీ విల్మర్, IOCL, HPCL, విశాఖ డెయిరీ, అట్లాస్ కాప్కో తదితర 26 ప్రముఖ పరిశ్రమలకు సేవలందించిన ప్రత్యక్ష అనుభవం సంస్థకు ప్రధాన బలం.'
                          : 'With confirmed vendor registration records and multi-year service relationships across 26 major industrial establishments including Sri Lalitha Rice Industry, Adani Wilmar, IOCL, HPCL, Visakha Dairy, and Atlas Copco, Y Srinivas brings proven on-site leadership.'}
                      </p>
                    </div>
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
                        isTe ? 'మోటార్లు & కంప్రెసర్ల ఓవర్‌హాల్' : 'Motor and pump overhauling',
                        isTe ? 'నివారణ నిర్వహణ ప్రణాళిక' : 'Preventive maintenance planning',
                      ].map((skill) => (
                        <li key={skill} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 4: TECHNICAL EXPERTISE AREAS
          ================================================================ */}
      <section aria-labelledby="expertise-title" className="py-16 sm:py-20 lg:py-24 bg-white">
        <Container size="2xl">
          <SectionHeading
            badge={isTe ? 'సాంకేతిక నైపుణ్యం' : 'Technical Capability'}
            title={isTe ? 'మా ఇంజనీరింగ్ సేవా విభాగాలు' : 'Areas of Technical Expertise'}
            subtitle={isTe ? 'వివిధ రంగాల పరిశ్రమలకు మేము అందించే ప్రధాన నిర్వహణ విభాగాలు.' : 'Core engineering domains covered during plant maintenance and breakdown triage.'}
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERTISE_AREAS.map((area) => (
              <Card key={area.id} variant="default" className="hover:border-amber-300 transition-colors">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mb-3">
                    {area.icon}
                  </div>
                  <CardTitle className="text-lg">
                    {isTe ? area.titleTe : area.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {isTe ? area.descriptionTe : area.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 5: PROFESSIONAL VALUES / SERVICE APPROACH
          ================================================================ */}
      <section aria-labelledby="values-title" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge={isTe ? 'సేవా ప్రమాణాలు' : 'Service Principles'}
            title={isTe ? 'మా వృత్తిపరమైన విలువలు' : 'Our Professional Service Values'}
            subtitle={isTe ? 'మా ప్రతి సర్వీస్ పనితీరులో పాటించే ఉన్నత ప్రమాణాలు.' : 'Operating standards that ensure reliability and transparency for industrial clients.'}
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_VALUES.map((val) => (
              <Card key={val.id} variant="flat" className="bg-white border border-slate-200 p-6 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                  {val.icon}
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {isTe ? val.titleTe : val.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {isTe ? val.descriptionTe : val.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 6: CTA STRIP
          ================================================================ */}
      <section aria-labelledby="about-cta-title" className="py-16 sm:py-20 lg:py-24 bg-slate-900 text-white">
        <Container size="2xl">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="amber" icon={<Wrench className="w-3 h-3" />}>
              {t('home.cta_badge')}
            </Badge>

            <h2
              id="about-cta-title"
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
    </>
  );
};
