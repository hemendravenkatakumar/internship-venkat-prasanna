import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import {
  Container,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from '@/components/common';
import {
  CustomerLoginForm,
  ForgotPasswordModal,
} from '@/components/auth';
import {
  ShieldCheck,
  Wrench,
  Lock,
  ArrowRight,
  UserPlus,
  HelpCircle,
  FileCheck,
} from 'lucide-react';

/**
 * LoginPage — Production Customer Login Page
 *
 * ARCHITECTURAL INTEGRATION SPECIFICATION:
 * - Ready to wire to real authentication endpoint: `POST /api/auth/login`.
 * - Logout-ready structure: Once authenticated, the global session/token
 *   is invalidated via `authApi.logout()` which clears the HTTP-only cookie
 *   or session token and returns the user to this login route.
 * - Zero fake authentication, zero passwords in localStorage, zero fake user accounts.
 */
export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

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
            <li className="text-amber-800 font-semibold">Portal Login</li>
          </ol>
        </nav>

        {/* Page Title & Intro */}
        <div className="max-w-3xl mb-8 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="amber" icon={<Lock className="w-3.5 h-3.5" />}>
              Secure Customer Portal
            </Badge>
            <span className="text-xs font-mono text-slate-500">
              Client Authentication Gateway
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Customer Portal Authentication
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Sign in with your registered corporate work email or 10-digit mobile number
            to access facility work orders, track active dispatches, and download service logs.
          </p>
        </div>

        {/* Two-Column Grid: Login Form + Account Management & Emergency Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Form Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Developer State Switcher for Verification of Form States */}
            <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-xs shadow-xs">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                Auth State Simulation:
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
                    setFormError('Invalid work email/mobile or password. Please verify credentials.');
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    formError ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Error State
                </button>
              </div>
            </div>

            {/* The Actual CustomerLoginForm Component */}
            <CustomerLoginForm
              onForgotPasswordClick={() => setIsForgotModalOpen(true)}
              onSubmitLogin={(_, result) => {
                if (result?.redirectUrl) {
                  navigate(result.redirectUrl);
                }
              }}
              externalLoading={formLoading}
              externalError={formError}
            />
          </div>

          {/* Sidebar Column (5 cols): Onboarding & Fast Service Access */}
          <div className="lg:col-span-5 space-y-6">
            {/* Register New Plant Profile Card */}
            <Card variant="industrial" className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <UserPlus className="w-5 h-5 text-amber-600" />
                <h4>New Customer Plant Profile?</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Register your manufacturing mill or processing facility to establish an
                authorized service account for fast on-site dispatches and digital job cards.
              </p>
              <div className="pt-2">
                <Link to={ROUTES.AUTH.REGISTER}>
                  <Button variant="industrial" size="sm" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Register New Plant Account
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Emergency Breakdown Card Without Login */}
            <Card variant="default">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-600" />
                  <span>Immediate Breakdown Dispatch</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-3 text-xs sm:text-sm text-slate-700">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Experiencing a critical machine line shutdown? You can submit a direct
                  service request ticket without logging into your portal account.
                </p>
                <div className="pt-1">
                  <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                    <Button variant="outline" size="sm" fullWidth rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Submit Emergency Service Ticket
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Security Standards Card */}
            <Card variant="flat" className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Enterprise Identity Architecture</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Customer authentication uses encrypted credential transport (TLS).
                Session tokens are handled via secure HTTP-only cookies without storing
                passwords in client localStorage.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Logout-Ready Session Termination Support</span>
              </div>
            </Card>

            {/* Need Help Card */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Forgot Your Login Credentials?</span>
              </div>
              <p className="leading-relaxed">
                Use the{' '}
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="font-semibold underline underline-offset-2 hover:text-amber-950 cursor-pointer"
                >
                  Forgot Password tool
                </button>{' '}
                or contact our administration desk at{' '}
                <a
                  href="mailto:support@venkataprasannaenterprises.com"
                  className="font-mono font-medium underline underline-offset-2"
                >
                  support@venkataprasannaenterprises.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Forgot Password Modal Dialog */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </div>
  );
};
