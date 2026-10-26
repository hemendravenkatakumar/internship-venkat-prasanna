import { FC, useState, FormEvent, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { FormField } from '@/components/common/Form/FormField';
import { Input } from '@/components/common/Form/Input';
import { Checkbox } from '@/components/common/Form/Checkbox';
import { authService, UserRole, LoginResult } from '@/services/authService';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  Shield,
  User,
  Sparkles,
} from 'lucide-react';

export interface CustomerLoginPayload {
  identifier: string; // work email or mobile number
  identifierType: 'email' | 'mobile';
  password: string;
  rememberMe: boolean;
}

export interface CustomerLoginFormProps {
  onSubmitLogin?: (payload: CustomerLoginPayload, result?: LoginResult) => Promise<void> | void;
  onForgotPasswordClick?: () => void;
  externalLoading?: boolean;
  externalError?: string | null;
}

/**
 * CustomerLoginForm — Production login interface supporting both User and Admin portals.
 * Accepts registered email or 10-digit mobile identifier.
 * Features quick role switcher, demo credential helpers, and role-based redirect.
 */
export const CustomerLoginForm: FC<CustomerLoginFormProps> = ({
  onSubmitLogin,
  onForgotPasswordClick,
  externalLoading = false,
  externalError = null,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);

  const isLoading = externalLoading || internalLoading;
  const currentError = externalError || internalError;

  const handleFillDemo = (role: UserRole) => {
    setSelectedRole(role);
    setInternalError(null);
    setErrors({});
    if (role === 'admin') {
      setIdentifier('admin@reliefnet.com');
      setPassword('admin123');
    } else {
      setIdentifier('user@reliefnet.com');
      setPassword('user123');
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    const trimmedIdentifier = identifier.trim();
    if (!trimmedIdentifier) {
      newErrors.identifier = 'Work email or mobile number is required.';
    } else {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedIdentifier);
      const cleanedDigits = trimmedIdentifier.replace(/[\s-]/g, '');
      const isMobile = /^\+?[0-9]{10,14}$/.test(cleanedDigits);
      const isSimpleAdmin = trimmedIdentifier.toLowerCase() === 'admin';

      if (!isEmail && !isMobile && !isSimpleAdmin) {
        newErrors.identifier = 'Please enter a valid work email or 10-digit mobile number.';
      }
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters.';
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

      const trimmed = identifier.trim();
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

      // Perform authentication with persistent authService
      const loginResult = authService.login(trimmed, password);

      if (!loginResult.success) {
        setInternalError(loginResult.error || 'Authentication failed. Please check credentials.');
        return;
      }

      const payload: CustomerLoginPayload = {
        identifier: trimmed,
        identifierType: isEmail ? 'email' : 'mobile',
        password,
        rememberMe,
      };

      if (onSubmitLogin) {
        await onSubmitLogin(payload, loginResult);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Invalid credentials. Please verify your email/mobile and password.';
      setInternalError(message);
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <Card variant="default" className="p-6 sm:p-8 shadow-xs border-slate-200">
      <CardContent className="p-0 space-y-6">
        {/* Title & Role Tabs */}
        <div className="border-b border-slate-100 pb-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {selectedRole === 'admin' ? 'Operations Admin Console' : 'Customer & User Portal'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                {selectedRole === 'admin'
                  ? 'Access operational dispatch command, user complaints, and service management.'
                  : 'Access your facility dashboard, submit complaints, and track ticket status.'}
              </p>
            </div>
          </div>

          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('user');
                setInternalError(null);
              }}
              className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                selectedRole === 'user'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-amber-600" />
              <span>User Dashboard</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedRole('admin');
                setInternalError(null);
              }}
              className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                selectedRole === 'admin'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Dashboard</span>
            </button>
          </div>

          {/* Quick Demo Credentials Assistant */}
          <div className="flex items-center justify-between bg-amber-50/70 border border-amber-200/70 px-3 py-2 rounded-lg text-xs">
            <div className="flex items-center gap-1.5 text-amber-900 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="text-[11px]">Quick Demo Sign-In:</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleFillDemo('user')}
                className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 cursor-pointer transition-colors"
                title="Fill Venkat Prasanna demo account"
              >
                Fill User
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-900 text-white hover:bg-slate-800 cursor-pointer transition-colors"
                title="Fill Operations Admin demo account"
              >
                Fill Admin
              </button>
            </div>
          </div>
        </div>

        {/* ERROR STATE BANNER */}
        {currentError && (
          <div
            className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-xs sm:text-sm text-red-900"
            role="alert"
          >
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <strong className="block font-bold">Authentication Failed</strong>
              <span>{currentError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Identifier: Email or Mobile */}
          <FormField
            id="login-identifier"
            label="Work Email or 10-Digit Mobile"
            required
            error={errors.identifier}
            helperText="Enter your registered corporate email or facility contact mobile"
          >
            <Input
              id="login-identifier"
              name="identifier"
              placeholder="e.g. manager@plant.com or 9876543210"
              value={identifier}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setIdentifier(e.target.value);
                if (errors.identifier) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.identifier;
                    return next;
                  });
                }
                if (internalError) setInternalError(null);
              }}
              error={Boolean(errors.identifier)}
              leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
              disabled={isLoading}
              autoComplete="username"
            />
          </FormField>

          {/* Password with Visibility Toggle */}
          <FormField
            id="login-password"
            label="Password"
            required
            error={errors.password}
          >
            <div className="relative">
              <Input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.password;
                      return next;
                    });
                  }
                  if (internalError) setInternalError(null);
                }}
                error={Boolean(errors.password)}
                leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                disabled={isLoading}
                autoComplete="current-password"
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

          {/* Remember Me & Forgot Password Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <Checkbox
              id="login-remember-me"
              name="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
              label="Remember my identifier on this device"
            />

            {onForgotPasswordClick && (
              <button
                type="button"
                onClick={onForgotPasswordClick}
                className="text-amber-700 hover:text-amber-800 font-semibold underline underline-offset-2 flex items-center gap-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Forgot password?</span>
              </button>
            )}
          </div>

          {/* Security Notice */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Encrypted Transport Security (TLS/HTTPS)</span>
            </span>
            <span className="font-mono text-slate-400">Zero LocalStorage Storage</span>
          </div>

          {/* Submit Action */}
          <Button
            type="submit"
            variant={selectedRole === 'admin' ? 'primary' : 'industrial'}
            size="lg"
            fullWidth
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {selectedRole === 'admin' ? 'Sign In to Operations Console' : 'Sign In to User Dashboard'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
