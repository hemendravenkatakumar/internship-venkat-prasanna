import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export interface PublicLayoutProps {
  children?: ReactNode;
}

/**
 * Public Layout Shell
 * Provides standard header, main content boundary, accessibility skip link,
 * and footer for all public-facing pages.
 */
export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Accessibility: Skip to main content for screen readers and keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Main Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 w-full focus:outline-hidden"
      >
        {children || <Outlet />}
      </main>

      {/* Primary Footer */}
      <Footer />
    </div>
  );
};
