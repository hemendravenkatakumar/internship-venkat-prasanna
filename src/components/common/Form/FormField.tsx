import React, { ReactNode } from 'react';

export interface FormFieldProps {
  id?: string;
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Accessible FormField wrapper
 * Coordinates labels, helper text, and validation error messages with proper ARIA linkages.
 */
export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  required = false,
  error,
  helperText,
  className = '',
  children,
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={id}
            className="block text-sm font-semibold text-slate-800 select-none"
          >
            {label}
            {required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
          </label>
        </div>
      )}

      <div>{children}</div>

      {error ? (
        <p id={id ? `${id}-error` : undefined} className="text-xs font-medium text-red-600 flex items-center gap-1 mt-1" role="alert">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={id ? `${id}-helper` : undefined} className="text-xs text-slate-500 mt-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
