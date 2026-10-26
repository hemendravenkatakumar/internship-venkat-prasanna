import React, { ReactNode } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { Container } from '@/components/common/Container';
import { authService } from '@/services/authService';
import {
  Wrench,
  ArrowLeft,
  Shield,
  User,
  LogOut,
  LayoutDashboard,
  FilePlus,
  Clock,
  UserCheck,
} from 'lucide-react';

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
  const currentUser = authService.getCurrentUser();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate(ROUTES.AUTH.LOGIN);
  };

  const isCustomerPortal = location.pathname.startsWith('/customer');
  const isAdminPortal = location.pathname.startsWith('/admin');

  // Enforce authentication: Visitors must sign in before accessing portal dashboards
  if (isCustomerPortal && !currentUser) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  if (isAdminPortal && (!currentUser || currentUser.role !== 'admin')) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  const customerNavLinks = [
    { label: 'Dashboard', path: ROUTES.CUSTOMER.DASHBOARD, icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { label: 'Submit Complaint', path: ROUTES.CUSTOMER.SERVICE_REQUEST, icon: <FilePlus className="w-3.5 h-3.5" /> },
    { label: 'My Complaints', path: ROUTES.CUSTOMER.REQUESTS, icon: <Clock className="w-3.5 h-3.5" /> },
    { label: 'Profile', path: ROUTES.CUSTOMER.PROFILE, icon: <UserCheck className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      {/* Top Application Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
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

            <div className="flex items-center gap-3 sm:gap-4">
              {currentUser ? (
                <div className="flex items-center gap-2.5">
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-xs font-semibold text-slate-200 leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono capitalize">
                      {currentUser.role} • {currentUser.company || 'ReliefNet'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-slate-700/80 px-2.5 py-1.5 rounded-md border border-slate-700 transition-colors cursor-pointer"
                    title="Sign out of portal session"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to={ROUTES.AUTH.LOGIN}
                  className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 bg-amber-950/60 px-2.5 py-1.5 rounded-md border border-amber-800 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Portal Login</span>
                </Link>
              )}

              <span className="text-slate-700">|</span>

              <Link
                to={ROUTES.PUBLIC.HOME}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Back to Website</span>
              </Link>
            </div>
          </div>

          {/* Subnavigation Bar for Customer Portal */}
          {isCustomerPortal && (
            <div className="border-t border-slate-800 py-1.5 flex items-center gap-1 overflow-x-auto scrollbar-none">
              {customerNavLinks.map((tab) => {
                const isActive = location.pathname === tab.path;
                return (
                  <Link
                    key={tab.path}
                    to={tab.path}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
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
