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
  ReviewCard,
  ApprovedReviewData,
  ReviewSubmissionForm,
} from '@/components/reviews';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  Phone,
  Wrench,
  MessageSquare,
  Lock,
} from 'lucide-react';

/* ==========================================================================
 * VERIFIED REVIEWS DATA SCHEMA
 * --------------------------------------------------------------------------
 * Structured data models ready for backend API integration.
 * IMPORTANT: No fake reviews or invented ratings are displayed by default.
 * Reviews are published only upon formal administrative approval.
 * ========================================================================== */

// Sample approved review structure for demonstration/preview purposes
// showing how verified records render once approved by the backend administrator.
const SAMPLE_APPROVED_REVIEW: ApprovedReviewData = {
  id: 'rev-sample-01',
  customerName: 'Senior Production Head',
  companyName: 'Regional Grain Processing Facility',
  sector: 'Rice Milling Sector',
  rating: 5,
  serviceRecordId: 'WO-2026-081',
  serviceCategory: 'Rice Mill Machinery Overhaul',
  reviewDate: 'Verified Completion Record on File',
  title: 'Accurate dynamic balancing and prompt pre-harvest line restoration',
  comment:
    'Our elevator drive and polisher blower developed severe bearing vibration during peak harvest milling. VPE engineers arrived on-site with diagnostic instrumentation, replaced the damaged bearings, and restored dynamic balance without extended line stoppage.',
  status: 'Approved',
};

export const ReviewsPage: FC = () => {
  // State switcher demonstrating Empty (Current Production Reality), Sample Approved,
  // Loading, and Error states for future API hook integration.
  const [viewState, setViewState] = useState<'empty' | 'sample' | 'loading' | 'error'>('empty');

  return (
    <>
      {/* ================================================================
          SECTION 1: HERO & BREADCRUMB
          Verification policy positioning and action CTAs.
          ================================================================ */}
      <section
        aria-labelledby="reviews-hero-title"
        className="bg-slate-900 text-white relative overflow-hidden"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="reviews-grid" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#reviews-grid)" />
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
                <li className="text-amber-400 font-semibold">Reviews</li>
              </ol>
            </nav>

            <div className="max-w-3xl space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="amber" icon={<Star className="w-3 h-3" />}>
                  Admin-Approved Feedback Directory
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  Linked to Verified Work Orders
                </span>
              </div>

              <h1
                id="reviews-hero-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
              >
                Client Reviews &{' '}
                <span className="text-amber-400">Verified Service Feedback</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Authentic operational feedback from plant managers, mill operators,
                and maintenance engineers. Every published review is strictly
                authenticated against a completed on-site service record.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a href="#submit-feedback-section">
                  <Button
                    variant="industrial"
                    size="lg"
                    rightIcon={<MessageSquare className="w-5 h-5" />}
                  >
                    Submit Service Review
                  </Button>
                </a>
                <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 active:bg-white/25"
                  >
                    Request Plant Service
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

            {/* Quality Commitment Strip */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Reviews linked to valid completed Work Order IDs</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Mandatory administrative verification before public display</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>Zero fabricated ratings or simulated testimonials</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 2: VERIFICATION & MODERATION POLICY
          Transparent explanation of how feedback is validated.
          ================================================================ */}
      <section aria-labelledby="policy-title" className="py-12 bg-white border-b border-slate-200">
        <Container size="2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                01
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Service Record Linkage</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Every submitted review must cite a formal Service Record / Work Order ID issued during an on-site service engagement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                02
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Administrative Audit</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Our operations management team cross-checks the review with completed technician service job logs and client sign-offs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                03
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Public Publication</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Only authentic, verified evaluations are approved and published to the public directory, maintaining 100% integrity.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 3: PUBLIC APPROVED REVIEWS DIRECTORY
          Displays approved reviews or proper Empty/Loading/Error states.
          ================================================================ */}
      <section aria-labelledby="approved-reviews-title" className="py-14 sm:py-18 bg-slate-50 border-b border-slate-200">
        <Container size="2xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div className="max-w-3xl">
              <Badge variant="amber">Verified Client Directory</Badge>
              <h2 id="approved-reviews-title" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
                Published Client Evaluations
              </h2>
              <p className="mt-2 text-base text-slate-600">
                Independent feedback submitted by verified plant clients and approved by administration.
              </p>
            </div>

            {/* API Integration State Switcher for Future Backend Wiring */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200 text-xs font-semibold self-start sm:self-auto shadow-xs">
              <span className="text-[11px] text-slate-500 px-2 font-mono uppercase">API View Mode:</span>
              <button
                type="button"
                onClick={() => setViewState('empty')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  viewState === 'empty' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Production Empty (Current)
              </button>
              <button
                type="button"
                onClick={() => setViewState('sample')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  viewState === 'sample' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sample Approved Layout
              </button>
              <button
                type="button"
                onClick={() => setViewState('loading')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  viewState === 'loading' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Loading
              </button>
              <button
                type="button"
                onClick={() => setViewState('error')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  viewState === 'error' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Error
              </button>
            </div>
          </div>

          {/* 1. Production Default Empty State (True Current Production Reality) */}
          {viewState === 'empty' && (
            <div className="py-8 max-w-xl mx-auto">
              <EmptyState
                icon={<Star className="w-8 h-8 text-amber-600" />}
                title="No Approved Reviews Published Yet"
                description="In compliance with our quality governance policies, client reviews are published only after formal administrative approval against completed on-site work orders. Submit your review below if you have recently completed a service engagement."
                action={
                  <a href="#submit-feedback-section">
                    <Button variant="industrial" size="sm" rightIcon={<MessageSquare className="w-4 h-4" />}>
                      Submit First Review
                    </Button>
                  </a>
                }
              />
            </div>
          )}

          {/* 2. Sample Approved Card Layout (Demonstrating UI once backend publishes reviews) */}
          {viewState === 'sample' && (
            <div className="space-y-6">
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 flex items-center justify-between gap-4">
                <span>
                  <strong>Developer Preview:</strong> Demonstrating how approved customer reviews render once published from the database.
                </span>
                <Button variant="outline" size="sm" onClick={() => setViewState('empty')}>
                  Return to Production View
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ReviewCard review={SAMPLE_APPROVED_REVIEW} />
              </div>
            </div>
          )}

          {/* 3. Loading State for Future API Hook */}
          {viewState === 'loading' && (
            <div className="py-12">
              <LoadingState
                message="Retrieving Approved Customer Reviews..."
                description="Querying the verified feedback database and administrative approval registry."
              />
            </div>
          )}

          {/* 4. Error State for Future API Hook */}
          {viewState === 'error' && (
            <div className="py-12 max-w-xl mx-auto">
              <ErrorState
                title="Unable to Retrieve Reviews"
                message="A connection error occurred while querying the review database. Please verify network connectivity or try again later."
                onRetry={() => setViewState('empty')}
                retryLabel="Reset View"
                action={
                  <Link to={ROUTES.PUBLIC.CONTACT}>
                    <Button variant="outline" size="md">
                      Contact Operations
                    </Button>
                  </Link>
                }
              />
            </div>
          )}
        </Container>
      </section>

      {/* ================================================================
          SECTION 4: CUSTOMER REVIEW SUBMISSION FORM
          Structured form for clients to rate service & provide feedback.
          ================================================================ */}
      <section id="submit-feedback-section" aria-labelledby="submit-review-title" className="py-16 sm:py-20 bg-white border-b border-slate-200 scroll-mt-24">
        <Container size="lg">
          <SectionHeading
            badge="Customer Feedback"
            title="Submit a Review for Completed Service"
            subtitle="If our field engineers recently serviced machinery at your plant, please submit your evaluation. Your feedback helps maintain our quality standards."
            align="center"
          />

          <ReviewSubmissionForm />
        </Container>
      </section>

      {/* ================================================================
          SECTION 5: PRIMARY SERVICE REQUEST CALL TO ACTION
          Direct conversion guiding users to the request submission route.
          ================================================================ */}
      <section aria-labelledby="reviews-cta-title" className="py-16 sm:py-20 bg-slate-900 text-white">
        <Container size="2xl">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="amber" icon={<Wrench className="w-3 h-3" />}>
              Immediate Plant Service Dispatch
            </Badge>

            <h2
              id="reviews-cta-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
            >
              Need Skilled Industrial Maintenance at Your Facility?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Experience the reliable engineering service our clients rely upon.
              Submit an equipment service ticket or consult with our lead engineer
              regarding scheduled plant overhauls.
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
                  Contact Operations
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECTION 6: CONSULTATION CTA
          ================================================================ */}
      <section aria-labelledby="consult-cta-title" className="py-14 sm:py-18 bg-slate-50 border-t border-slate-200">
        <Container size="2xl">
          <Card variant="flat" className="p-8 sm:p-10 border border-slate-200">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 space-y-3">
                  <Badge variant="outline" icon={<CheckCircle2 className="w-3 h-3 text-emerald-600" />}>
                    Quality Assurance Protocol
                  </Badge>
                  <h3 id="consult-cta-title" className="text-xl sm:text-2xl font-bold text-slate-900">
                    Have Questions Regarding Work Order Verification or Feedback?
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Our administrative desk assists corporate procurement officers with
                    service verification certificates, warranty logs, and commercial
                    sign-off documentation.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                  <Link to={ROUTES.PUBLIC.CONTACT} className="w-full sm:w-auto">
                    <Button variant="primary" size="md" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Contact Support Desk
                    </Button>
                  </Link>
                  <Link to={ROUTES.PUBLIC.ABOUT} className="w-full sm:w-auto">
                    <Button variant="secondary" size="md" fullWidth>
                      About VPE Operations
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
