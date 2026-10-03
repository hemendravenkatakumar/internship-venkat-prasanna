import React from 'react';
import { Spinner } from './Spinner';

export interface LoadingStateProps {
  message?: string;
  description?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading operational data...',
  description = 'Please wait while system resources are synchronized.',
  className = '',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-xl bg-white border border-slate-200/80 shadow-xs ${className}`}
    >
      <Spinner size="lg" />
      <h3 className="mt-4 text-base font-semibold text-slate-800">{message}</h3>
      {description && (
        <p className="mt-1 text-sm text-slate-500 max-w-sm">{description}</p>
      )}
    </div>
  );
};
