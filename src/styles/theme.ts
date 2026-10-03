/**
 * Design Tokens & Theme Configuration
 * Venkata Prasanna Enterprises (VPE) Industrial Service Management
 *
 * Designed with high contrast, safety amber accents, steel blues, and dark slate
 * appropriate for an industrial engineering and service firm.
 */
export const THEME = {
  colors: {
    // Primary Industrial Palette
    navy: '#0f172a',      // slate-900: Primary header, dark surfaces, high-authority text
    slate: '#1e293b',     // slate-800: Structural cards, secondary dark
    steel: '#334155',     // slate-700: Body copy, muted elements
    border: '#cbd5e1',    // slate-300: Standard industrial borders
    background: '#f8fafc',// slate-50: Crisp, clean industrial background

    // Accent & Action Palette
    amber: '#d97706',     // amber-600: Industrial alert/safety highlight, secondary action
    amberDark: '#b45309', // amber-700: Hover state for amber actions
    amberLight: '#fef3c7',// amber-100: Highlight pill / badge background
    industrialBlue: '#0284c7', // sky-600: Engineering accent, hyperlinks, active indicators

    // Feedback
    success: '#059669',   // emerald-600: Completed service, valid state
    warning: '#f59e0b',   // amber-500: In-progress / caution
    danger: '#dc2626',    // red-600: Breakdown / urgent alert / error
    info: '#2563eb',      // blue-600: Informational notices
  },
  typography: {
    fontSans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontMono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem',  // 64px
  },
  borderRadius: {
    sm: '0.25rem',  // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem',   // 8px
    xl: '0.75rem',  // 12px
    full: '9999px',
  },
} as const;
