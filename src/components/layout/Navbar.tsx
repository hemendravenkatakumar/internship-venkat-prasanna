import { useState, useEffect, FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { NavItem } from '@/types';
import { 
  Wrench, 
  Menu, 
  X, 
  Phone, 
  Clock, 
  ShieldCheck, 
  User, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const publicNavItems: NavItem[] = [
  { label: 'Home', href: ROUTES.PUBLIC.HOME },
  { label: 'About', href: ROUTES.PUBLIC.ABOUT },
  { label: 'Services', href: ROUTES.PUBLIC.SERVICES },
  { label: 'Industries', href: ROUTES.PUBLIC.INDUSTRIES },
  { label: 'Vendor Experience', href: ROUTES.PUBLIC.VENDOR_EXPERIENCE },
  { label: 'Service Charges', href: ROUTES.PUBLIC.SERVICE_CHARGES },
  { label: 'Reviews', href: ROUTES.PUBLIC.REVIEWS },
  { label: 'Contact', href: ROUTES.PUBLIC.CONTACT },
];

export const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      {/* Top Utility Bar for Industrial Contact & Safety Support */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800">
        <Container size="2xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 font-medium text-amber-400">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                VPE Industrial Service Management
              </span>
              <span className="hidden md:flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                24/7 Breakdown Support & Maintenance
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <a
                href="tel:+918000000000"
                className="flex items-center gap-1 text-slate-200 hover:text-amber-400 transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
              >
                <Phone className="w-3 h-3 text-amber-500" aria-hidden="true" />
                <span className="font-semibold tracking-wide">Emergency: +91 (Industrial Dispatch)</span>
              </a>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <Link
                to={ROUTES.AUTH.LOGIN}
                className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              >
                <User className="w-3 h-3" aria-hidden="true" />
                <span>Portal Login</span>
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
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-500 flex items-center justify-center font-bold shadow-sm group-hover:bg-slate-800 transition-colors">
                <Wrench className="w-5 h-5 text-amber-400" aria-hidden="true" />
              </div>
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
              <Link to={ROUTES.AUTH.LOGIN}>
                <Button variant="ghost" size="sm" leftIcon={<User className="w-4 h-4" />}>
                  Client Portal
                </Button>
              </Link>
              <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST}>
                <Button variant="industrial" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Request Service
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST} className="hidden sm:inline-flex lg:hidden">
                <Button variant="industrial" size="sm">
                  Request Service
                </Button>
              </Link>
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
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Menu & Navigation
              </span>
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
                <Link to={ROUTES.AUTH.LOGIN} className="w-full">
                  <Button variant="secondary" size="md" fullWidth leftIcon={<User className="w-4 h-4" />}>
                    Customer / Staff Sign In
                  </Button>
                </Link>
                <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST} className="w-full">
                  <Button variant="industrial" size="md" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Request Field Service
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
