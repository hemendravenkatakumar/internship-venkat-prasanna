import React, { ReactNode } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { Container } from '@/components/common/Container';
import { Wrench, ArrowLeft, Shield } from 'lucide-react';

export interface AppLayoutProps {
  children?: ReactNode;
  portalName?: string;
}

/**
 * App Layout Shell
 * Structural layout for authenticated and operational application modules
 * (Customer Portal, Field Engineer Desk, Admin Operations).
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  portalName = 'Management Portal',
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      {/* Top Application Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800">
        <Container size="2xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link
                to={ROUTES.PUBLIC.HOME}
                className="flex items-center gap-2 group text-white font-bold"
                title="Return to Public Website"
              >
                <div className="w-8 h-8 rounded bg-amber-500 text-slate-950 flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <span className="tracking-tight text-sm sm:text-base">VPE INDUSTRIAL</span>
              </Link>
              <span className="text-slate-600">/</span>
              <span className="text-xs sm:text-sm font-medium text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/60 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                {portalName}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to={ROUTES.PUBLIC.HOME}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Website</span>
              </Link>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 py-8">
        <Container size="2xl">
          {children || <Outlet />}
        </Container>
      </main>

      {/* App Portal Footer */}
      <footer className="py-4 border-t border-slate-200 bg-white text-xs text-slate-500 text-center">
        <Container size="2xl">
          <p>
            Venkata Prasanna Enterprises • Industrial Service Management System Foundation
          </p>
        </Container>
      </footer>
    </div>
  );
};
