import { FC, useState, FormEvent } from 'react';
import { Button } from '@/components/common/Button';
import { FormField } from '@/components/common/Form/FormField';
import { Input } from '@/components/common/Form/Input';
import { Card, CardContent } from '@/components/common/Card';
import { X, KeyRound, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

export interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReset?: (identifier: string) => Promise<void> | void;
}

/**
 * ForgotPasswordModal — Accessible password recovery interface.
 * Prepares the workflow for backend password reset token transmission
 * via registered work email or SMS OTP.
 */
export const ForgotPasswordModal: FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onSubmitReset,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmed = identifier.trim();
    if (!trimmed) {
      setError('Please enter your registered work email or mobile number.');
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    const cleanedDigits = trimmed.replace(/[\s-]/g, '');
    const isMobile = /^\+?[0-9]{10,14}$/.test(cleanedDigits);

    if (!isEmail && !isMobile) {
      setError('Please enter a valid work email or 10-digit mobile number.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      if (onSubmitReset) {
        await onSubmitReset(trimmed);
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to initiate password reset. Please try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIdentifier('');
    setError(null);
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-password-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md">
        <Card variant="default" className="shadow-2xl border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <KeyRound className="w-5 h-5 text-amber-600" />
              <h3 id="forgot-password-title">Reset Portal Password</h3>
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close dialog"
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <CardContent className="p-6 space-y-4">
            {isSuccess ? (
              <div className="text-center space-y-4 py-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">Reset Request Dispatched</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If an active customer account matches{' '}
                    <span className="font-mono font-semibold text-slate-800">{identifier}</span>,
                    password reset instructions and a verification code have been transmitted.
                  </p>
                </div>
                <div className="pt-2">
                  <Button variant="secondary" size="sm" fullWidth onClick={handleClose}>
                    Return to Login
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your registered work email or 10-digit mobile number.
                  Our identity service will send a secure password reset link or SMS verification code.
                </p>

                <FormField
                  id="reset-identifier"
                  label="Registered Work Email or Mobile"
                  required
                  error={error || undefined}
                >
                  <Input
                    id="reset-identifier"
                    placeholder="e.g. manager@plant.com or 9876543210"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      if (error) setError(null);
                    }}
                    error={Boolean(error)}
                    leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                    disabled={isLoading}
                  />
                </FormField>

                <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 flex items-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Password resets require administrative authorization.</span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="industrial"
                    size="sm"
                    isLoading={isLoading}
                  >
                    Send Reset Link
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
