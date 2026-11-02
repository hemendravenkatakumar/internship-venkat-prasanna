import React from 'react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'light' | 'dark' | 'industrial';
  className?: string;
  showIcon?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'dark',
  className = '',
  showIcon = true,
}) => {
  const { language, setLanguage, t } = useLanguage();

  const options: { code: Language; label: string; nativeName: string }[] = [
    { code: 'en', label: 'English', nativeName: 'English' },
    { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  ];

  const baseStyle =
    variant === 'dark'
      ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 focus:ring-amber-500'
      : variant === 'industrial'
      ? 'bg-amber-950/80 text-amber-200 border-amber-800 hover:bg-amber-900 focus:ring-amber-400'
      : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50 focus:ring-amber-500';

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`} aria-label={t('lang.select')}>
      {showIcon && <Globe className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />}
      <div className="relative inline-block">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className={`text-xs font-medium rounded-lg px-2.5 py-1.5 border transition-all cursor-pointer focus:outline-hidden focus:ring-2 appearance-none pr-7 ${baseStyle}`}
          aria-label="Select Application Language"
        >
          {options.map((opt) => (
            <option key={opt.code} value={opt.code} className="bg-slate-900 text-white">
              {opt.nativeName} ({opt.label})
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
