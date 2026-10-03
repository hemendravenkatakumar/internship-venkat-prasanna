import { forwardRef, TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean | string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, fullWidth = true, disabled, className = '', id, rows = 4, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div className={fullWidth ? 'w-full' : 'inline-block'}>
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            hasError && id ? `${id}-error` : id ? `${id}-helper` : undefined
          }
          className={`block w-full rounded-md border text-slate-900 placeholder:text-slate-400 text-sm p-3 transition-colors duration-150 focus:outline-hidden focus:ring-2 focus:ring-offset-0 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed ${
            hasError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:border-slate-800 focus:ring-slate-300'
          } ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
