import { forwardRef, SelectHTMLAttributes, ReactNode } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  error?: boolean | string;
  fullWidth?: boolean;
  placeholder?: string;
  children?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      error,
      fullWidth = true,
      placeholder,
      disabled,
      className = '',
      id,
      children,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);

    return (
      <div className={`relative ${fullWidth ? 'w-full' : 'inline-block'}`}>
        <select
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            hasError && id ? `${id}-error` : id ? `${id}-helper` : undefined
          }
          className={`block w-full appearance-none rounded-md border text-slate-900 bg-white text-sm py-2 pl-3.5 pr-10 transition-colors duration-150 focus:outline-hidden focus:ring-2 focus:ring-offset-0 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed ${
            hasError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:border-slate-800 focus:ring-slate-300'
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
