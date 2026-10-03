import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  description?: ReactNode;
  error?: boolean | string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className = '', id, disabled, ...props }, ref) => {
    return (
      <div className={`relative flex items-start ${className}`}>
        <div className="flex h-5 items-center">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            disabled={disabled}
            aria-invalid={Boolean(error)}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="ml-3 text-sm">
            {label && (
              <label
                htmlFor={id}
                className={`font-medium select-none cursor-pointer ${
                  disabled ? 'text-slate-400 cursor-not-allowed' : 'text-slate-800'
                }`}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-slate-500 text-xs mt-0.5">{description}</p>
            )}
            {error && (
              <p className="text-red-600 text-xs mt-0.5 font-medium">{error}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
