import { FC, useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { FormField } from '@/components/common/Form/FormField';
import { Input } from '@/components/common/Form/Input';
import { Select } from '@/components/common/Form/Select';
import { Checkbox } from '@/components/common/Form/Checkbox';
import { ROUTES } from '@/routes/paths';
import { authService } from '@/services/authService';
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ArrowRight,
  Factory,
} from 'lucide-react';

export interface CustomerRegistrationPayload {
  companyName: string;
  industry: string;
  location: string;
  gstin?: string;
  contactPerson: string;
  mobile: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

export interface CustomerRegisterFormProps {
  onSubmitRegistration?: (payload: CustomerRegistrationPayload) => Promise<void> | void;
  externalLoading?: boolean;
  externalError?: string | null;
}

/**
 * CustomerRegisterForm — Production customer registration form for industrial plant accounts.
 * Enforces client-side validation, password security standards, accessible ARIA error bindings,
 * and password visibility controls without storing credentials in localStorage or simulating fake authentication.
 */
export const CustomerRegisterForm: FC<CustomerRegisterFormProps> = ({
  onSubmitRegistration,
  externalLoading = false,
  externalError = null,
}) => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    location: '',
    gstin: '',
    contactPerson: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const isLoading = externalLoading || internalLoading;
  const currentError = externalError || internalError;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (internalError) {
      setInternalError(null);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Company & Facility
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company, mill, or plant name is required.';
    }

    if (!formData.industry) {
      newErrors.industry = 'Please select your industrial sector.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Plant location (City, District, State) is required.';
    }

    // Optional GSTIN validation if entered
    if (formData.gstin.trim() && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstin.trim().toUpperCase())) {
      newErrors.gstin = 'Invalid GSTIN format (15 characters: 2 digits + 10 PAN chars + 3 characters).';
    }

    // Contact Person
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Authorized contact person name and title are required.';
    }

    // Mobile Validation: 10-14 digits
    const cleanedMobile = formData.mobile.replace(/[\s-]/g, '');
    if (!cleanedMobile) {
      newErrors.mobile = 'Mobile contact number is required.';
    } else if (!/^\+?[0-9]{10,14}$/.test(cleanedMobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = 'Official business email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid work email address.';
    }

    // Password Validation: Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter.';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter.';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number.';
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // Terms Acceptance
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must acknowledge the industrial service terms to register.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setInternalLoading(true);
      setInternalError(null);

      const payload: CustomerRegistrationPayload = {
        companyName: formData.companyName.trim(),
        industry: formData.industry,
        location: formData.location.trim(),
        gstin: formData.gstin.trim() ? formData.gstin.trim().toUpperCase() : undefined,
        contactPerson: formData.contactPerson.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim(),
        password: formData.password,
        termsAccepted: formData.termsAccepted,
      };

      if (onSubmitRegistration) {
        await onSubmitRegistration(payload);
      }

      // Persist newly registered user in authService so they can log in immediately
      authService.registerUser({
        name: payload.contactPerson,
        email: payload.email,
        phone: payload.mobile,
        company: payload.companyName,
        location: payload.location,
        password: payload.password,
      });

      setIsSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please review your details and retry.';
      setInternalError(message);
    } finally {
      setInternalLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      companyName: '',
      industry: '',
      location: '',
      gstin: '',
      contactPerson: '',
      mobile: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    });
    setErrors({});
    setIsSuccess(false);
    setInternalError(null);
  };

  // SUCCESS STATE
  if (isSuccess) {
    return (
      <Card variant="default" className="border-emerald-200 bg-emerald-50/40 p-6 sm:p-10 text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <h3 className="text-xl font-bold text-slate-900">Registration Application Received</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Thank you, <span className="font-semibold text-slate-900">{formData.contactPerson}</span>.
            Your corporate account registration for <span className="font-semibold text-slate-900">{formData.companyName}</span> has
            been received.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed pt-1">
            In compliance with our industrial data governance protocols, corporate customer accounts
            are verified by administration before full portal access is activated.
            You may now sign in using your registered email: <span className="font-mono font-medium text-slate-800">{formData.email}</span>.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link to={ROUTES.AUTH.LOGIN}>
            <Button variant="industrial" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Proceed to Customer Login
            </Button>
          </Link>
          <Button variant="secondary" size="md" onClick={handleReset}>
            Register Another Plant Profile
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="default" className="p-6 sm:p-8 shadow-xs border-slate-200">
      <CardContent className="p-0 space-y-6">
        {/* Form Title & Subtitle */}
        <div className="border-b border-slate-100 pb-4 space-y-1">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Create Customer Plant Account
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Register your facility to book on-site services, track service tickets, and access machine maintenance logs.
          </p>
        </div>

        {/* ERROR STATE BANNER */}
        {currentError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-red-900" role="alert">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <strong className="block font-bold">Registration Error</strong>
              <span>{currentError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* SECTION A: COMPANY & FACILITY DETAILS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
              <Factory className="w-4 h-4 text-amber-600" />
              <span>1. Company & Plant Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                id="reg-company-name"
                label="Company / Mill / Plant Name"
                required
                error={errors.companyName}
              >
                <Input
                  id="reg-company-name"
                  name="companyName"
                  placeholder="e.g. Sree Prasanna Agro Mills Ltd"
                  value={formData.companyName}
                  onChange={handleChange}
                  error={Boolean(errors.companyName)}
                  leftIcon={<Building2 className="w-4 h-4 text-slate-400" />}
                  disabled={isLoading}
                />
              </FormField>

              <FormField
                id="reg-industry"
                label="Industrial Sector"
                required
                error={errors.industry}
              >
                <Select
                  id="reg-industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  error={Boolean(errors.industry)}
                  placeholder="Select industry sector..."
                  disabled={isLoading}
                  options={[
                    { value: 'Rice Mills', label: 'Rice Mills & Grain Processing' },
                    { value: 'Textile & Cloth', label: 'Textile & Spinning Industries' },
                    { value: 'Cashew Processing', label: 'Cashew Processing Plants' },
                    { value: 'General Manufacturing', label: 'General Manufacturing & Agro-Plants' },
                    { value: 'Other Industrial Facility', label: 'Other Industrial Facility' },
                  ]}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                id="reg-location"
                label="Plant Location & Address"
                required
                error={errors.location}
                helperText="City, District, State, or Industrial Estate"
              >
                <Input
                  id="reg-location"
                  name="location"
                  placeholder="e.g. Industrial Area Phase-II, Rajahmundry"
                  value={formData.location}
                  onChange={handleChange}
                  error={Boolean(errors.location)}
                  leftIcon={<MapPin className="w-4 h-4 text-slate-400" />}
                  disabled={isLoading}
                />
              </FormField>

              <FormField
                id="reg-gstin"
                label="GSTIN Number (Optional)"
                error={errors.gstin}
                helperText="15-character GST identification for tax invoices"
              >
                <Input
                  id="reg-gstin"
                  name="gstin"
                  placeholder="e.g. 37AAAAA0000A1Z5"
                  value={formData.gstin}
                  onChange={handleChange}
                  error={Boolean(errors.gstin)}
                  disabled={isLoading}
                />
              </FormField>
            </div>
          </div>

          {/* SECTION B: AUTHORIZED CONTACT PERSON */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
              <User className="w-4 h-4 text-amber-600" />
              <span>2. Authorized Contact Person</span>
            </div>

            <FormField
              id="reg-contact-person"
              label="Contact Person Name & Designation"
              required
              error={errors.contactPerson}
              helperText="Person authorized to approve on-site maintenance tickets"
            >
              <Input
                id="reg-contact-person"
                name="contactPerson"
                placeholder="e.g. K. V. Sharma — Plant Maintenance Head"
                value={formData.contactPerson}
                onChange={handleChange}
                error={Boolean(errors.contactPerson)}
                leftIcon={<User className="w-4 h-4 text-slate-400" />}
                disabled={isLoading}
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                id="reg-mobile"
                label="Mobile Contact Number"
                required
                error={errors.mobile}
                helperText="10-digit mobile number for dispatch coordination"
              >
                <Input
                  id="reg-mobile"
                  name="mobile"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.mobile}
                  onChange={handleChange}
                  error={Boolean(errors.mobile)}
                  leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
                  disabled={isLoading}
                />
              </FormField>

              <FormField
                id="reg-email"
                label="Official Business Email"
                required
                error={errors.email}
                helperText="Used as your primary login identifier"
              >
                <Input
                  id="reg-email"
                  name="email"
                  type="email"
                  placeholder="e.g. maintenance@plant.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                  disabled={isLoading}
                />
              </FormField>
            </div>
          </div>

          {/* SECTION C: SECURE AUTHENTICATION */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>3. Secure Portal Credentials</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password with Visibility Toggle */}
              <FormField
                id="reg-password"
                label="Create Password"
                required
                error={errors.password}
                helperText="Min 8 characters, at least 1 uppercase, 1 lowercase, 1 number"
              >
                <div className="relative">
                  <Input
                    id="reg-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    error={Boolean(errors.password)}
                    leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded p-0.5 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </FormField>

              {/* Confirm Password with Visibility Toggle */}
              <FormField
                id="reg-confirm-password"
                label="Confirm Password"
                required
                error={errors.confirmPassword}
                helperText="Re-enter your password to confirm match"
              >
                <div className="relative">
                  <Input
                    id="reg-confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={Boolean(errors.confirmPassword)}
                    leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide confirmed password' : 'Show confirmed password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded p-0.5 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </FormField>
            </div>
          </div>

          {/* SECTION D: TERMS & COMPLIANCE ACKNOWLEDGMENT */}
          <div className="pt-2">
            <Checkbox
              id="reg-terms-accepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              disabled={isLoading}
              error={errors.termsAccepted}
              label="I acknowledge that I am an authorized facility representative and agree to VPE industrial service terms and field safety guidelines."
            />
          </div>

          {/* Security & Data Notice */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Enterprise encrypted credential storage</span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              No Plaintext Storage
            </span>
          </div>

          {/* Submit Action */}
          <div className="pt-2 space-y-4">
            <Button
              type="submit"
              variant="industrial"
              size="lg"
              fullWidth
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Complete Account Registration
            </Button>

            <div className="text-center text-xs text-slate-600">
              Already registered your plant account?{' '}
              <Link
                to={ROUTES.AUTH.LOGIN}
                className="text-amber-700 font-semibold hover:text-amber-800 underline underline-offset-2"
              >
                Sign In to Customer Portal
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
