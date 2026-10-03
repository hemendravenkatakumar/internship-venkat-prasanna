import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Container,
  Button,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common';
import { CustomerRegisterForm } from '@/components/auth';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Lock,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export const RegisterPage: FC = () => {
  // State switcher for developers to test loading and error states of the registration form
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  return (
    <div className="py-10 sm:py-16 bg-slate-50 min-h-[calc(100vh-140px)]">
      <Container size="2xl">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li>
              <Link to={ROUTES.PUBLIC.HOME} className="hover:text-slate-900 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to={ROUTES.AUTH.LOGIN} className="hover:text-slate-900 transition-colors">
                Portal Login
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-amber-800 font-semibold">Customer Registration</li>
          </ol>
        </nav>

        {/* Page Title & Intro */}
        <div className="max-w-3xl mb-8 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="amber" icon={<Building2 className="w-3.5 h-3.5" />}>
              Corporate Account Onboarding
            </Badge>
            <span className="text-xs font-mono text-slate-500">
              Plant Portal Access
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Register Your Industrial Plant Account
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Create an authorized customer profile to submit on-site machine service tickets,
            track technician dispatches, and access verified equipment maintenance logs.
          </p>
        </div>

        {/* Two-Column Grid: Registration Form + Portal Benefits Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Form Column (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Developer State Switcher for Verification */}
            <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-xs shadow-xs">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                Form State Simulation:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormLoading(false);
                    setFormError(null);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    !formLoading && !formError ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormLoading(true);
                    setFormError(null);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    formLoading ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Loading
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormLoading(false);
                    setFormError('Simulated server registration failure. Please verify email and retry.');
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    formError ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Error State
                </button>
              </div>
            </div>

            {/* The Actual Registration Form */}
            <CustomerRegisterForm
              externalLoading={formLoading}
              externalError={formError}
            />
          </div>

          {/* Sidebar Column (4 cols): Portal Benefits & Security Standards */}
          <div className="lg:col-span-4 space-y-6">
            {/* Portal Features Card */}
            <Card variant="default">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-600" />
                  <span>Customer Portal Capabilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Direct Breakdown Dispatch:</strong>
                    <span>Log machine symptoms and trigger priority technician dispatch directly.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Equipment Health History:</strong>
                    <span>Maintain digital job logs of bearing replacements, alignments, and test runs.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Commercial Invoicing:</strong>
                    <span>Download itemized GST tax invoices, spare parts receipts, and AMC contracts.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Verified Service Feedback:</strong>
                    <span>Submit post-service ratings linked directly to completed work order IDs.</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Compliance Card */}
            <Card variant="flat" className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>Security & Data Governance</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Client credentials and facility machinery data are protected under enterprise-grade
                encryption protocols. Passwords are never stored in plaintext or accessible to client browsers.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Plaintext LocalStorage Storage</span>
              </div>
            </Card>

            {/* Already Registered Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 text-center sm:text-left">
              <h4 className="text-sm font-bold text-slate-900">Already have an account?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                If your plant account has already been registered and verified, proceed to the sign-in portal.
              </p>
              <Link to={ROUTES.AUTH.LOGIN} className="block pt-1">
                <Button variant="outline" size="sm" fullWidth rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Go to Customer Login
                </Button>
              </Link>
            </div>

            {/* Support Inquiries */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Need Assistance with Registration?</span>
              </div>
              <p className="leading-relaxed">
                Contact our administration desk at{' '}
                <a
                  href="mailto:support@venkataprasannaenterprises.com"
                  className="font-mono font-medium underline underline-offset-2"
                >
                  support@venkataprasannaenterprises.com
                </a>{' '}
                for bulk facility onboarding or vendor empanelment.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
