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
} from '@/components/common';
import {
  ArrowRight,
  Wrench,
  Phone,
  User,
  Target,
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
  Factory,
} from 'lucide-react';

/* ==========================================================================
 * ABOUT PAGE DATA
 * --------------------------------------------------------------------------
 * All content is structured as typed arrays/objects for easy CMS/backend
 * migration. When verified company content is supplied, update these values.
 *
 * IMPORTANT: No fabricated years of experience, qualifications,
 * certifications, client counts, awards, or revenue figures.
 * ========================================================================== */

/**
 * Expertise areas with descriptions.
 * Update with verified specifics when available from VPE.
 */
interface ExpertiseArea {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const EXPERTISE_AREAS: ExpertiseArea[] = [
  {
    id: 'mechanical',
    title: 'Mechanical Equipment Servicing',
    description:
      'Hands-on repair, overhaul, and maintenance of motors, pumps, gearboxes, conveyors, and production line machinery across industrial plants.',
    icon: <Cog className="w-5 h-5" />,
  },
  {
    id: 'electrical',
    title: 'Electrical System Troubleshooting',
    description:
      'Fault diagnosis, wiring repair, panel servicing, and electrical safety testing for industrial power distribution and control circuits.',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 'inspection',
    title: 'Equipment Inspection & Assessment',
    description:
      'Systematic condition evaluation to identify wear, damage, and potential failures before they cause unplanned production shutdowns.',
    icon: <Search className="w-5 h-5" />,
  },
  {
    id: 'preventive',
    title: 'Preventive Maintenance Programs',
    description:
      'Structured maintenance schedules designed to extend equipment lifespan, reduce breakdown frequency, and maintain operational efficiency.',
    icon: <Settings className="w-5 h-5" />,
  },
  {
    id: 'installation',
    title: 'Installation & Commissioning',
    description:
      'Professional setup, alignment, testing, and handover of newly procured industrial machinery and electrical systems.',
    icon: <CalendarCheck className="w-5 h-5" />,
  },
  {
    id: 'emergency',
    title: 'Breakdown & Emergency Response',
    description:
      'Rapid diagnostic support and on-site repair services when critical equipment failures threaten production continuity.',
    icon: <AlertTriangle className="w-5 h-5" />,
  },
];

/**
 * Professional values / service approach principles.
 * Only verifiable operational standards — no invented guarantees.
 */
interface ServiceValue {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const SERVICE_VALUES: ServiceValue[] = [
  {
    id: 'transparency',
    title: 'Transparent Service Process',
    description:
      'Every service engagement is documented — from initial assessment through diagnosis, repair, and testing. Clients receive clear communication at each step.',
    icon: <ClipboardCheck className="w-5 h-5" />,
  },
  {
    id: 'reliability',
    title: 'Dependable Execution',
    description:
      'We commit to completing service work as scoped. When issues arise during servicing, they are communicated promptly with recommended next steps.',
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    id: 'responsiveness',
    title: 'Responsive Communication',
    description:
      'Timely response to service inquiries, clear scheduling, and regular progress updates throughout the service cycle.',
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: 'partnership',
    title: 'Client Partnership Approach',
    description:
      'We work alongside plant managers and maintenance teams, understanding facility-specific requirements rather than applying one-size-fits-all solutions.',
    icon: <Handshake className="w-5 h-5" />,
  },
];

/* ==========================================================================
 * ABOUT PAGE COMPONENT
 * ========================================================================== */

/**
 * AboutPage — Production About page for Venkata Prasanna Enterprises
 *
 * Sections:
 * 1. Page Hero — Company identity & positioning
 * 2. Company Background — Who VPE is, what they do, how they operate
 * 3. Engineer Profile — Founder introduction with photo placeholder
 * 4. Experience — Industries and equipment types serviced
 * 5. Expertise — Technical capability areas
 * 6. Professional Values / Service Approach
 * 7. CTA strip — Services, Contact, and Service Request
 *
 * Navbar & Footer are rendered by PublicLayout (shared layout component).
 */
export const AboutPage: FC = () => {
  return (
    <>
      {/* ================================================================
          SECTION 1: PAGE HERO
          Company identity eyebrow and page positioning.
          ================================================================ */}
      <section
        aria-labelledby="about-hero-title"
        className="bg-slate-900 text-white"
      >
        <Container size="2xl">
          <div className="py-14 sm:py-18 lg:py-22">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-slate-400">
                <li>
                  <Link to={ROUTES.PUBLIC.HOME} className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-amber-400 font-semibold">About</li>
              </ol>
            </nav>

            <div className="max-w-3xl space-y-5">
              <Badge variant="amber" icon={<BookOpen className="w-3 h-3" />}>
                About Our Company
              </Badge>

              <h1
                id="about-hero-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
              >
                About{' '}
                <span className="text-amber-400">Venkata Prasanna Enterprises</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                An industrial service company providing professional equipment
                maintenance, repair, and troubleshooting for manufacturing and
                processing plants.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 2: COMPANY BACKGROUND
          Who VPE is, what they do, how they operate.
          ================================================================ */}
      <section aria-labelledby="company-bg-title" className="py-16 sm:py-20 lg:py-24 bg-white">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Text Column */}
            <div className="space-y-6">
              <SectionHeading
                badge="Company Background"
                title="Built for Industrial Service"
                className="mb-0 sm:mb-0"
              />

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                <p>
                  Venkata Prasanna Enterprises (VPE) is an industrial service company
                  founded to address the maintenance and repair needs of manufacturing
                  and processing plants. We provide skilled engineering services
                  directly at plant locations, working with a range of industrial
                  equipment across multiple sectors.
                </p>
                <p>
                  Our services cover the full equipment lifecycle — from initial
                  inspection and preventive maintenance to emergency troubleshooting
                  and major repairs. We work with rice mills, textile factories,
                  cashew processing plants, and general manufacturing facilities.
                </p>
                <p>
                  Every service engagement follows a structured process: assessment,
                  diagnosis, execution, testing, and documentation. This ensures
                  transparency, accountability, and a clear record for each job
                  completed.
                </p>
              </div>
            </div>

            {/* Key Information Card */}
            <div className="space-y-6">
              <Card variant="industrial">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Factory className="w-5 h-5 text-amber-600" aria-hidden="true" />
                    Company Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <dl className="space-y-4">
                    <div className="flex items-start gap-3">
                      <dt className="text-sm font-semibold text-slate-900 min-w-[120px] shrink-0">
                        Company Name
                      </dt>
                      <dd className="text-sm text-slate-700">
                        Venkata Prasanna Enterprises
                      </dd>
                    </div>
                    <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                      <dt className="text-sm font-semibold text-slate-900 min-w-[120px] shrink-0">
                        Business Type
                      </dt>
                      <dd className="text-sm text-slate-700">
                        Industrial Equipment Service Provider
                      </dd>
                    </div>
                    <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                      <dt className="text-sm font-semibold text-slate-900 min-w-[120px] shrink-0">
                        Core Services
                      </dt>
                      <dd className="text-sm text-slate-700">
                        Inspection, Troubleshooting, Repair, Maintenance, Installation
                      </dd>
                    </div>
                    <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                      <dt className="text-sm font-semibold text-slate-900 min-w-[120px] shrink-0">
                        Industries
                      </dt>
                      <dd className="text-sm text-slate-700">
                        Rice Mills, Textile, Cashew Processing, General Manufacturing
                      </dd>
                    </div>
                    <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                      <dt className="text-sm font-semibold text-slate-900 min-w-[120px] shrink-0">
                        Service Model
                      </dt>
                      <dd className="text-sm text-slate-700">
                        On-site field service, workshop repair, annual maintenance contracts
                      </dd>
                    </div>
                    <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                      <dt className="text-sm font-semibold text-slate-900 min-w-[120px] shrink-0">
                        Location
                      </dt>
                      <dd className="text-sm text-slate-700">
                        {/*
                          CONTENT PLACEHOLDER:
                          Replace with actual company location when available.
                        */}
                        Industrial Area — Location to be updated
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 3: ENGINEER PROFILE
          Founder / lead engineer introduction.
          ================================================================ */}
      <section aria-labelledby="engineer-profile-title" className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-y border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge="Our Engineer"
            title="Meet the Founder & Lead Engineer"
            subtitle="The hands-on expertise driving every service engagement at Venkata Prasanna Enterprises."
            align="center"
          />

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Profile Visual */}
                <div className="md:col-span-2 bg-slate-900 p-8 sm:p-10 flex flex-col items-center justify-center text-center text-white">
                  {/*
                    PHOTO PLACEHOLDER:
                    Replace the icon below with an actual <img> when a photo is supplied:
                    <img
                      src="/images/venkata-prasanna.jpg"
                      alt="Venkata Prasanna — Founder and Lead Service Engineer at VPE"
                      className="w-32 h-32 rounded-full object-cover border-4 border-amber-500"
                    />
                  */}
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-slate-800 border-4 border-amber-500/50 flex items-center justify-center mb-5">
                    <User className="w-14 h-14 sm:w-16 sm:h-16 text-slate-500" aria-hidden="true" />
                  </div>

                  <h3
                    id="engineer-profile-title"
                    className="text-xl sm:text-2xl font-bold tracking-tight"
                  >
                    {/* CONTENT PLACEHOLDER: Replace with verified full name */}
                    Venkata Prasanna
                  </h3>
                  <p className="text-amber-400 text-sm font-semibold mt-1">
                    Founder & Lead Service Engineer
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    <Badge variant="amber" className="text-[11px]">Mechanical</Badge>
                    <Badge variant="amber" className="text-[11px]">Electrical</Badge>
                    <Badge variant="amber" className="text-[11px]">Industrial Equipment</Badge>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 w-full">
                    <Link to={ROUTES.PUBLIC.CONTACT}>
                      <Button
                        variant="industrial"
                        size="md"
                        fullWidth
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        Contact Directly
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="md:col-span-3 p-6 sm:p-8 lg:p-10 space-y-6">
                  {/* Background */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-600" aria-hidden="true" />
                      Professional Background
                    </h4>
                    <div className="text-sm text-slate-700 leading-relaxed space-y-3">
                      <p>
                        {/*
                          CONTENT PLACEHOLDER:
                          Replace with verified professional background when available.
                          The text below is a structural placeholder describing the role accurately.
                        */}
                        Venkata Prasanna is the founder of Venkata Prasanna Enterprises,
                        bringing practical, hands-on expertise in servicing industrial
                        equipment across manufacturing and processing plants. His work
                        spans mechanical repairs, electrical troubleshooting, equipment
                        installation, and preventive maintenance programs.
                      </p>
                      <p>
                        Having worked directly with plant equipment in rice mills, textile
                        factories, and cashew processing units, he understands the
                        operational demands and time-sensitivity of industrial maintenance.
                        This field experience shapes the company&apos;s service-first approach.
                      </p>
                    </div>
                  </div>

                  {/* Equipment & Industry Experience */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-amber-600" aria-hidden="true" />
                      Equipment & Industry Experience
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="list">
                      {[
                        'Rice mill processing equipment',
                        'Textile looms & spinning machinery',
                        'Cashew cutting & drying units',
                        'Motors, pumps & gearboxes',
                        'Conveyor & material handling systems',
                        'Electrical panels & control circuits',
                        'Production line automation components',
                        'Utility & support systems',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                          <span>{item}</span>
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
          SECTION 4: EXPERTISE AREAS
          Technical capability breakdown.
          ================================================================ */}
      <section aria-labelledby="expertise-title" className="py-16 sm:py-20 lg:py-24 bg-white">
        <Container size="2xl">
          <SectionHeading
            badge="Our Expertise"
            title="Technical Service Capabilities"
            subtitle="The core engineering competencies we bring to every service engagement."
            align="center"
            action={
              <Link to={ROUTES.PUBLIC.SERVICES}>
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  View All Services
                </Button>
              </Link>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {EXPERTISE_AREAS.map((area) => (
              <Card key={area.id} variant="interactive" className="group">
                <CardContent className="p-6 sm:p-7 space-y-4">
                  <div className="w-11 h-11 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center group-hover:bg-amber-100 group-hover:border-amber-300 transition-colors duration-200">
                    {area.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {area.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 5: PROFESSIONAL VALUES / SERVICE APPROACH
          How VPE operates — verified operational principles only.
          ================================================================ */}
      <section aria-labelledby="values-title" className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-y border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge="Service Approach"
            title="How We Work"
            subtitle="The operational standards that guide how we deliver industrial services to our clients."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {SERVICE_VALUES.map((value) => (
              <div
                key={value.id}
                className="flex items-start gap-4 bg-white border border-slate-200 rounded-xl p-5 sm:p-6"
              >
                <div className="w-11 h-11 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                  {value.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Service Workflow Summary */}
          <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
            <Card variant="default">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-600" aria-hidden="true" />
                  Our Service Workflow
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-0">
                  {[
                    { step: '01', label: 'Service Request', desc: 'Client submits request' },
                    { step: '02', label: 'Assessment', desc: 'On-site equipment review' },
                    { step: '03', label: 'Diagnosis', desc: 'Root cause identification' },
                    { step: '04', label: 'Service Execution', desc: 'Repair / maintenance work' },
                    { step: '05', label: 'Testing & Handover', desc: 'Verification & documentation' },
                  ].map((item, index) => (
                    <div key={item.step} className="relative text-center sm:text-left">
                      {/* Connector line (desktop only, not on last item) */}
                      {index < 4 && (
                        <div className="hidden sm:block absolute top-5 left-1/2 w-full h-px bg-slate-200" aria-hidden="true" />
                      )}
                      <div className="relative z-10 flex flex-col items-center sm:items-center">
                        <span className="w-10 h-10 rounded-full bg-amber-50 border-2 border-amber-300 text-amber-800 text-xs font-bold flex items-center justify-center mb-2">
                          {item.step}
                        </span>
                        <p className="text-sm font-bold text-slate-900">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 6: CTA STRIP
          Services, Contact, and Service Request.
          ================================================================ */}
      <section aria-labelledby="about-cta-title" className="py-16 sm:py-20 lg:py-24 bg-slate-900 text-white">
        <Container size="2xl">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="amber" icon={<Wrench className="w-3 h-3" />}>
              Work With Us
            </Badge>

            <h2
              id="about-cta-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
            >
              Ready to Discuss Your Maintenance Needs?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Whether you need a one-time equipment repair, ongoing preventive
              maintenance, or want to explore an annual service contract — get in
              touch with our team.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                <Button
                  variant="industrial"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Request Service
                </Button>
              </Link>
              <Link to={ROUTES.PUBLIC.SERVICES}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                >
                  Explore Services
                </Button>
              </Link>
              <Link to={ROUTES.PUBLIC.CONTACT}>
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Phone className="w-4 h-4" />}
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
