import { useState, useEffect, FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';
import { NavItem } from '@/types';
import { 
  Menu, 
  X, 
  Phone, 
  ShieldCheck, 
  User, 
  ChevronRight
} from 'lucide-react';
import { authService } from '@/services/authService';

export const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const publicNavItems: NavItem[] = [
    { label: t('nav.home'), href: ROUTES.PUBLIC.HOME },
    { label: t('nav.about'), href: ROUTES.PUBLIC.ABOUT },
    { label: t('nav.services'), href: ROUTES.PUBLIC.SERVICES },
    { label: t('nav.industries'), href: ROUTES.PUBLIC.INDUSTRIES },
    { label: t('nav.vendor_experience'), href: ROUTES.PUBLIC.VENDOR_EXPERIENCE },
    { label: t('nav.service_charges'), href: ROUTES.PUBLIC.SERVICE_CHARGES },
    { label: t('nav.reviews'), href: ROUTES.PUBLIC.REVIEWS },
    { label: t('nav.contact'), href: ROUTES.PUBLIC.CONTACT },
  ];

  // Reset mobile drawer whenever the pathname changes
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setIsMobileMenuOpen(false);
  }

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const currentUser = authService.getCurrentUser();
  const portalDestination = currentUser
    ? currentUser.role === 'admin'
      ? ROUTES.ADMIN.DASHBOARD
      : currentUser.role === 'engineer'
      ? ROUTES.ENGINEER.DASHBOARD
      : ROUTES.CUSTOMER.DASHBOARD
    : ROUTES.AUTH.LOGIN;

  const portalLabel = currentUser
    ? currentUser.role === 'admin'
      ? 'Owner & Admin'
      : currentUser.role === 'engineer'
      ? 'Engineer Terminal'
      : 'Customer Portal'
    : 'Customer Portal';

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      {/* Top Utility Bar for Industrial Contact & Safety Support */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800 overflow-hidden">
        <Container size="2xl">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Horizontal Continuous Marquee Scrolling from Left to Right */}
            <div className="relative flex-1 overflow-hidden min-w-0 h-5 flex items-center select-none marquee-mask">
              <div className="animate-marquee-ltr flex items-center whitespace-nowrap">
                {/* Block 1 */}
                <div className="flex items-center shrink-0">
                  {[1, 2, 3].map((idx) => (
                    <span key={`mq1-${idx}`} className="inline-flex items-center gap-2 mx-5 text-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                      <span className="font-extrabold text-amber-400 tracking-wider">
                        VENKATA PRASANNA ENTERPRISES
                      </span>
                      <span className="text-amber-500/80 font-bold px-1">|</span>
                      <span className="font-semibold text-white tracking-wide">
                        24/7 Breakdown Support & Maintenance
                      </span>
                    </span>
                  ))}
                </div>
                {/* Block 2 (identical duplicate for seamless 0-gap infinite loop) */}
                <div className="flex items-center shrink-0" aria-hidden="true">
                  {[1, 2, 3].map((idx) => (
                    <span key={`mq2-${idx}`} className="inline-flex items-center gap-2 mx-5 text-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                      <span className="font-extrabold text-amber-400 tracking-wider">
                        VENKATA PRASANNA ENTERPRISES
                      </span>
                      <span className="text-amber-500/80 font-bold px-1">|</span>
                      <span className="font-semibold text-white tracking-wide">
                        24/7 Breakdown Support & Maintenance
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Controls: Language Selector, Emergency Hotline, Portal Login */}
            <div className="flex items-center gap-2.5 sm:gap-3 text-xs shrink-0 z-10 pl-2 bg-slate-900">
              <LanguageSelector variant="dark" />
              <span className="text-slate-700 hidden sm:inline">|</span>
              <a
                href="tel:+919866227780"
                className="hidden lg:flex items-center gap-1 text-slate-200 hover:text-amber-400 transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
              >
                <Phone className="w-3 h-3 text-amber-500" aria-hidden="true" />
                <span className="font-semibold tracking-wide">{t('nav.emergency_phone')}</span>
              </a>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <Link
                to={ROUTES.AUTH.LOGIN}
                className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              >
                <User className="w-3 h-3" aria-hidden="true" />
                <span>{t('nav.login')}</span>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navigation Bar */}
      <div className="py-3.5 sm:py-4">
        <Container size="2xl">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo & Name */}
            <Link
              to={ROUTES.PUBLIC.HOME}
              className="flex items-center gap-3 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 rounded-md p-1"
              aria-label="Venkata Prasanna Enterprises Home"
            >
              <img
                src="/images/logo/logo.jpg"
                alt="Venkata Prasanna Enterprises Official Logo"
                className="h-10 sm:h-12 w-auto object-contain rounded-md shadow-xs group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none">
                  VENKATA PRASANNA
                </span>
                <span className="text-[11px] sm:text-xs font-bold tracking-widest text-amber-700 uppercase mt-0.5">
                  Enterprises • Industrial Services
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden xl:flex items-center gap-1"
              aria-label="Primary Navigation"
            >
              {publicNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'text-slate-950 font-bold bg-slate-100/90'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Header Action CTAs */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Link to={portalDestination}>
                <Button variant="ghost" size="sm" leftIcon={<User className="w-4 h-4" />}>
                  {portalLabel}
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-controls="mobile-navigation"
                className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer Navigation Overlay */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 top-[105px] z-50 bg-slate-950/40 backdrop-blur-xs xl:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-full max-w-sm ml-auto h-full bg-white shadow-xl flex flex-col p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <img
                  src="/images/logo/logo.jpg"
                  alt="VPE Logo"
                  className="h-8 w-auto object-contain rounded"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-black tracking-tight text-slate-900 leading-none">
                    VENKATA PRASANNA
                  </span>
                  <span className="text-[9px] font-bold tracking-wider text-amber-700 uppercase">
                    Enterprises
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-md text-slate-500 hover:text-slate-800"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 py-4" aria-label="Mobile Navigation">
              {publicNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 text-base font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-slate-900 font-bold bg-amber-50 text-amber-900 border-l-4 border-amber-600'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-200 space-y-3">
              <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">
                Industrial Portals
              </span>
              <div className="grid grid-cols-1 gap-2">
                <Link to={portalDestination} className="w-full">
                  <Button variant="industrial" size="md" fullWidth leftIcon={<User className="w-4 h-4" />}>
                    {currentUser ? 'Go to My Dashboard' : 'Customer / Staff Sign In'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
