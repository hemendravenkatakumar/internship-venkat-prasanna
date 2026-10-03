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
  LoadingState,
  EmptyState,
  ErrorState,
} from '@/components/common';
import {
  ChargeCard,
  ChargeCategoryData,
} from '@/components/charges';
import {
  Search,
  Truck,
  Wrench,
  Boxes,
  AlertTriangle,
  CalendarCheck,
  ArrowRight,
  Phone,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Calculator,
} from 'lucide-react';

/* ==========================================================================
 * CHARGE CATEGORIES SPECIFICATION DATA
 * --------------------------------------------------------------------------
 * Structured data models ready for backend API retrieval.
 * IMPORTANT: No invented prices, fake currency figures, or mock rates.
 * All pricing states accurately reflect formal commercial tariff policies.
 * ========================================================================== */

const CHARGE_CATEGORIES: ChargeCategoryData[] = [
  {
    id: 'charge-inspection',
    category: 'Inspection & Diagnostic Charges',
    badge: 'Baseline Diagnostic',
    badgeVariant: 'amber',
    icon: <Search className="w-3.5 h-3.5" />,
    description:
      'Standard on-site diagnostic visit to examine malfunctioning equipment, identify failure mechanisms, and formulate corrective repair specifications.',
    billingUnit: 'Per Visit / Machine Train',
    pricingStateText: 'Standard Diagnostic Rate on Record',
    rateBasisNote: 'Quoted upon service intake based on machine type and scope of diagnostic testing required.',
    inclusions: [
      'Comprehensive mechanical and electrical visual inspection',
      'Preliminary testing of motors, panels, and drive linkages',
      'Itemized condition evaluation and repair proposal',
      'Inspection fee typically adjustable against subsequent major repair labor',
    ],
    ctaLabel: 'Book Diagnostic Visit',
  },
  {
    id: 'charge-travel',
    category: 'Travel & Field Mobilization Charges',
    badge: 'Transit Slab',
    badgeVariant: 'default',
    icon: <Truck className="w-3.5 h-3.5" />,
    description:
      'Covers technician transit, mobilization of specialized field diagnostic instrumentation, and transport between our service base and your facility.',
    billingUnit: 'Distance Slab Matrix (Km)',
    pricingStateText: 'Radial Distance Slab Tariff',
    rateBasisNote: 'Calculated transparently using fixed kilometer distance slabs from VPE operational base.',
    inclusions: [
      'Round-trip technician transport to plant premises',
      'Carriage of specialized mechanical and electrical field toolkits',
      'Outstation transit allowance where overnight stay is mandated',
      'Transparent distance calculation confirmed prior to dispatch',
    ],
    ctaLabel: 'Check Transit Slab',
  },
  {
    id: 'charge-service-labor',
    category: 'Technical Service & Repair Labor',
    badge: 'Labor Execution',
    badgeVariant: 'info',
    icon: <Wrench className="w-3.5 h-3.5" />,
    description:
      'Execution of on-site mechanical repairs, bearing replacements, shaft dynamic balancing, electrical panel rewiring, and machine overhaul tasks.',
    billingUnit: 'Task Complexity or Man-Hour Basis',
    pricingStateText: 'Approved Technical Labor Rate Card',
    rateBasisNote: 'Itemized by technical complexity, specialized tooling requirements, and technician hours.',
    inclusions: [
      'Certified mechanical and electrical service engineer labor',
      'Precision machine disassembly, cleaning, and component fitting',
      'Shaft trueing, alignment, and dynamic balancing procedures',
      'Post-service trial test runs and documented operational sign-off',
    ],
    ctaLabel: 'Request Labor Quote',
  },
  {
    id: 'charge-materials',
    category: 'Materials & Replacement Spare Parts',
    badge: 'At Actuals',
    badgeVariant: 'success',
    icon: <Boxes className="w-3.5 h-3.5" />,
    description:
      'Procurement and installation of genuine replacement bearings, mechanical seals, transmission belts, contactors, lubricants, and hardware consumables.',
    billingUnit: 'Bill of Materials (BOM) at Actuals',
    pricingStateText: 'Original OEM Rate Card / Manufacturer Actuals',
    rateBasisNote: 'Passed through at verified OEM distributor pricing with zero artificial markups.',
    inclusions: [
      'Original manufacturer specification components and parts',
      'Transparency: Client retains option to supply OEM parts directly',
      'Manufacturer warranty documentation passed directly to client',
      'Itemized spare parts receipts attached to final commercial invoice',
    ],
    ctaLabel: 'Inquire Spare Parts',
  },
  {
    id: 'charge-emergency',
    category: 'Emergency Breakdown Priority Dispatch',
    badge: 'Priority Surcharge',
    badgeVariant: 'amber',
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
    description:
      'Unscheduled priority engineering dispatch when sudden machine failures cause critical plant shutdowns during harvest or active production shifts.',
    billingUnit: 'Priority Callout Surcharge',
    pricingStateText: 'Emergency Dispatch Rate on Record',
    rateBasisNote: 'Applies to out-of-schedule callouts, weekend mobilizations, and immediate shift disruptions.',
    inclusions: [
      'Immediate field engineer dispatch mobilization',
      'Rapid root-cause triage to stabilize production continuity',
      'Priority scheduling over routine maintenance appointments',
      'Dedicated technical coordination desk during repair execution',
    ],
    ctaLabel: 'Request Emergency Dispatch',
  },
  {
    id: 'charge-amc',
    category: 'Annual Maintenance Contracts (AMC)',
    badge: 'Annual Retainer',
    badgeVariant: 'success',
    icon: <CalendarCheck className="w-3.5 h-3.5" />,
    description:
      'Long-term comprehensive facility agreements offering scheduled periodic audits, discounted labor tariffs, and dedicated breakdown response times.',
    billingUnit: 'Annual Service Agreement',
    pricingStateText: 'Customized Facility Proposal',
    rateBasisNote: 'Calibrated based on total plant machinery fleet, visit frequencies, and agreed SLA response times.',
    inclusions: [
      'Pre-scheduled monthly or quarterly preventive maintenance visits',
      'Priority emergency callout response guarantees',
      'Discounted labor rates on non-routine repairs and overhauls',
      'Continuous equipment health record tracking and maintenance logs',
    ],
    ctaLabel: 'Request AMC Proposal',
  },
];

/* ==========================================================================
 * SERVICE CHARGES PAGE COMPONENT
 * ========================================================================== */

export const ServiceChargesPage: FC = () => {
  // View state simulation to demonstrate proper Loading, Empty, and Error states
  // for future API integration without fake API calls.
  const [viewState, setViewState] = useState<'active' | 'loading' | 'empty' | 'error'>('active');

  return (
    <>
      {/* ================================================================
          SECTION 1: HERO & BREADCRUMB
          Commercial rate positioning, transparency intro, and primary CTAs.
          ================================================================ */}
      <section
        aria-labelledby="charges-hero-title"
        className="bg-slate-900 text-white relative overflow-hidden"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="charges-grid" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#charges-grid)" />
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
                <li className="text-amber-400 font-semibold">Service Charges</li>
              </ol>
            </nav>

            <div className="max-w-3xl space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="amber" icon={<Calculator className="w-3 h-3" />}>
                  Commercial Rate Card & Pricing Policies
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  Transparent Tariff Structure
                </span>
              </div>

              <h1
                id="charges-hero-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
              >
                Industrial Service Charges &{' '}
                <span className="text-amber-400">Commercial Policies</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Venkata Prasanna Enterprises maintains structured, transparent commercial
                policies for industrial plant maintenance. Every service charge is
                itemized by inspection scope, distance transit slab, technician labor,
                and materials at actuals.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                  <Button
                    variant="industrial"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Request Service Estimate
                  </Button>
                </Link>
                <Link to={ROUTES.PUBLIC.CONTACT}>
                  <Button
                    variant="secondary"
                    size="lg"
                    leftIcon={<Phone className="w-4 h-4" />}
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                  >
                    Contact Commercial Desk
                  </Button>
                </Link>
                <Link to={ROUTES.PUBLIC.SERVICES}>
                  <Button
                    variant="ghost"
                    size="lg"
                    leftIcon={<Wrench className="w-4 h-4" />}
                    className="text-slate-300 hover:text-white hover:bg-white/10"
                  >
                    Technical Catalog
                  </Button>
                </Link>
              </div>
            </div>

            {/* Policy Principles Strip */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Pre-dispatch cost estimation before technician deployment</span>
                </div>
                <div className="flex items-center gap-3">
                  <Boxes className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Materials & replacement spares at verified OEM actuals</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Statutory GST commercial tax invoices with input credit</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 2: APPROVED SERVICE CHARGES DIRECTORY
          Standardized categories, billing units, and price placeholders.
          ================================================================ */}
      <section aria-labelledby="approved-charges-title" className="py-14 sm:py-18 bg-white border-b border-slate-200">
        <Container size="2xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div className="max-w-3xl">
              <Badge variant="amber">Commercial Rate Schedule</Badge>
              <h2 id="approved-charges-title" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
                Approved Service Charge Categories
              </h2>
              <p className="mt-2 text-base text-slate-600">
                Standardized commercial classification for on-site engineering, transit, labor, and materials.
              </p>
            </div>

            {/* API Integration State Switcher (demonstrating proper loading/empty/error states) */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-semibold self-start sm:self-auto">
              <span className="text-[11px] text-slate-500 px-2 font-mono uppercase">API State Preview:</span>
              <button
                type="button"
                onClick={() => setViewState('active')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  viewState === 'active' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => setViewState('loading')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  viewState === 'loading' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Loading
              </button>
              <button
                type="button"
                onClick={() => setViewState('empty')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  viewState === 'empty' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Empty
              </button>
              <button
                type="button"
                onClick={() => setViewState('error')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  viewState === 'error' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Error
              </button>
            </div>
          </div>

          {/* Active Data State */}
          {viewState === 'active' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CHARGE_CATEGORIES.map((charge) => (
                <ChargeCard key={charge.id} charge={charge} />
              ))}
            </div>
          )}

          {/* Loading State for Future API Hook */}
          {viewState === 'loading' && (
            <div className="py-12">
              <LoadingState
                message="Retrieving Approved Tariff Rate Cards..."
                description="Synchronizing current commercial service rates and transit slabs from the operational backend."
              />
            </div>
          )}

          {/* Empty State for Future API Hook */}
          {viewState === 'empty' && (
            <div className="py-12 max-w-xl mx-auto">
              <EmptyState
                icon={<Calculator className="w-8 h-8 text-amber-600" />}
                title="No Commercial Charges Listed"
                description="There are currently no active public tariffs available under this filter. Please contact our commercial desk directly for customized plant estimates."
                action={
                  <Button variant="secondary" size="sm" onClick={() => setViewState('active')}>
                    Reset Tariff View
                  </Button>
                }
              />
            </div>
          )}

          {/* Error State for Future API Hook */}
          {viewState === 'error' && (
            <div className="py-12 max-w-xl mx-auto">
              <ErrorState
                title="Unable to Retrieve Tariff Schedule"
                message="A connection error occurred while querying the commercial pricing database. Please verify network parameters or contact the dispatch desk."
                onRetry={() => setViewState('active')}
                retryLabel="Retry Tariff Query"
                action={
                  <Link to={ROUTES.PUBLIC.CONTACT}>
                    <Button variant="outline" size="md">
                      Contact Support
                    </Button>
                  </Link>
                }
              />
            </div>
          )}
        </Container>
      </section>

      {/* ================================================================
          SECTION 3: COMMERCIAL PRICING CLARIFICATIONS
          Transparent explanation of how pricing is computed.
          ================================================================ */}
      <section aria-labelledby="clarifications-title" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <Container size="2xl">
          <SectionHeading
            badge="Commercial Transparency"
            title="How We Calculate Industrial Service Charges"
            subtitle="We maintain strict operational transparency to eliminate unexpected fees or hidden billing costs for plant managers."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="flat" className="p-5 sm:p-6 space-y-3">
              <CardContent className="p-0 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Pre-Dispatch Estimates</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Before our field service engineers mobilize, clients receive an
                  itemized preliminary estimate detailing expected diagnostic, travel,
                  and technical labor scopes.
                </p>
              </CardContent>
            </Card>

            <Card variant="flat" className="p-5 sm:p-6 space-y-3">
              <CardContent className="p-0 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                  <Boxes className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Spares at OEM Actuals</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We maintain zero hidden procurement markups on standard components.
                  Clients are always welcome to procure authorized OEM spare parts
                  directly using our technical specifications.
                </p>
              </CardContent>
            </Card>

            <Card variant="flat" className="p-5 sm:p-6 space-y-3">
              <CardContent className="p-0 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Standardized Transit Slabs</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Travel and mobilization fees are calculated using fixed radial distance
                  slabs from our regional service centers, ensuring predictable costs for
                  both local and outstation mills.
                </p>
              </CardContent>
            </Card>

            <Card variant="flat" className="p-5 sm:p-6 space-y-3">
              <CardContent className="p-0 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Statutory Tax Compliance</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every commercial transaction is billed through formal tax invoices
                  with applicable Goods and Services Tax (GST), ensuring full legal
                  compliance and corporate input tax credit eligibility.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Commercial Invoicing Policy Note */}
          <div className="mt-8 bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Formal Work Order & PO Acceptance</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                For manufacturing corporations requiring advance Purchase Orders (PO),
                our commercial desk issues proforma invoices and formal quotation letters.
              </p>
            </div>

            <Link to={ROUTES.PUBLIC.CONTACT} className="shrink-0">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Request Commercial Quotation
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 4: PRIMARY SERVICE REQUEST CALL TO ACTION
          Direct conversion guiding users to the request submission route.
          ================================================================ */}
      <section aria-labelledby="charges-cta-title" className="py-16 sm:py-20 bg-slate-900 text-white">
        <Container size="2xl">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="amber" icon={<Wrench className="w-3 h-3" />}>
              Service Request & Intake
            </Badge>

            <h2
              id="charges-cta-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
            >
              Need an On-Site Diagnostic Visit or Plant Overhaul?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Submit your machine symptoms, facility location, and service urgency
              through our intake portal. Our engineering team prepares a transparent
              commercial estimate before technician mobilization.
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
                  View Technical Scope
                </Button>
              </Link>
              <Link to={ROUTES.PUBLIC.CONTACT}>
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Phone className="w-4 h-4" />}
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                >
                  Call Commercial Desk
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 5: CONTACT & COMMERCIAL CONSULTATION CTA
          Dedicated prompt for custom proposals and AMC agreements.
          ================================================================ */}
      <section aria-labelledby="custom-quote-title" className="py-14 sm:py-18 bg-white border-t border-slate-200">
        <Container size="2xl">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-3">
                <Badge variant="outline" icon={<Calculator className="w-3 h-3" />}>
                  Custom Fleet Proposals & AMC Tenders
                </Badge>
                <h3 id="custom-quote-title" className="text-xl sm:text-2xl font-bold text-slate-900">
                  Planning an Annual Maintenance Contract for Multi-Machine Plants?
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  For large-scale rice mills, textile units, or industrial facilities
                  seeking dedicated Annual Maintenance Contracts (AMC) with guaranteed
                  SLA response times, contact our lead engineer for a comprehensive
                  fleet survey and proposal.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Link to={ROUTES.PUBLIC.CONTACT} className="w-full sm:w-auto">
                  <Button variant="primary" size="md" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Contact for AMC Proposal
                  </Button>
                </Link>
                <Link to={ROUTES.PUBLIC.ABOUT} className="w-full sm:w-auto">
                  <Button variant="secondary" size="md" fullWidth>
                    Review VPE Experience
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
