import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { Container } from '@/components/common/Container';
import { 
  Wrench, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800" role="contentinfo">
      {/* Top Value / Industrial Commitment Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-8">
        <Container size="2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                  Certified Standards
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Compliant industrial safety & OEM calibrated equipment procedures.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                  Rapid Breakdown Response
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  High-priority on-site deployment for manufacturing line shutdowns.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                  End-to-End Plant Support
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Preventive maintenance, retrofitting, spare parts, and service management.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Links & Contact */}
      <div className="py-12 sm:py-16">
        <Container size="2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Column 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Wrench className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <span className="text-lg font-black tracking-tight text-white block leading-none">
                    VENKATA PRASANNA
                  </span>
                  <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">
                    Enterprises
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Industrial Service Management system providing mission-critical maintenance,
                mechanical overhauls, electrical engineering, and precision equipment servicing
                for heavy manufacturing facilities.
              </p>

              <div className="pt-2 text-xs text-slate-400 space-y-1">
                <p className="font-semibold text-slate-300">Registration & Operations:</p>
                <p>Industrial Service Division • ISO Aligned Maintenance Standards</p>
              </div>
            </div>

            {/* Column 2: Public Navigation */}
            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
                Company & Services
              </h4>
              <ul className="space-y-2.5 text-sm" role="list">
                <li>
                  <Link to={ROUTES.PUBLIC.ABOUT} className="text-slate-400 hover:text-white transition-colors">
                    About VPE
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PUBLIC.SERVICES} className="text-slate-400 hover:text-white transition-colors">
                    Industrial Services
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PUBLIC.INDUSTRIES} className="text-slate-400 hover:text-white transition-colors">
                    Industries Served
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PUBLIC.VENDOR_EXPERIENCE} className="text-slate-400 hover:text-white transition-colors">
                    Vendor Experience
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PUBLIC.SERVICE_CHARGES} className="text-slate-400 hover:text-white transition-colors">
                    Service Charges
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PUBLIC.REVIEWS} className="text-slate-400 hover:text-white transition-colors">
                    Client Reviews
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PUBLIC.CONTACT} className="text-slate-400 hover:text-white transition-colors">
                    Contact & Inquiries
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Operational Portals */}
            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
                Application Portals
              </h4>
              <ul className="space-y-2.5 text-sm" role="list">
                <li>
                  <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                    <span>Submit Service Ticket</span>
                    <ExternalLink className="w-3 h-3 text-slate-600" />
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.CUSTOMER.DASHBOARD} className="text-slate-400 hover:text-white transition-colors">
                    Client Portal
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.ENGINEER.DASHBOARD} className="text-slate-400 hover:text-white transition-colors">
                    Field Engineer Desk
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.ADMIN.DASHBOARD} className="text-slate-400 hover:text-white transition-colors">
                    Operations Control (Admin)
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.AUTH.LOGIN} className="text-slate-400 hover:text-white transition-colors">
                    Unified Login
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.AUTH.REGISTER} className="text-slate-400 hover:text-white transition-colors">
                    Register Client Account
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Dispatch */}
            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
                Emergency & Dispatch
              </h4>
              <ul className="space-y-3 text-xs text-slate-400" role="list">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    Venkata Prasanna Enterprises, Industrial Area, Production Sector
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Dispatch: +91 (Operating Desk)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>support@venkataprasannaenterprises.com</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Line Service: 24/7/365</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div className="py-6 border-t border-slate-900 bg-slate-950/80 text-xs text-slate-500">
        <Container size="2xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p>
              © {CURRENT_YEAR} Venkata Prasanna Enterprises. All rights reserved.
            </p>
            <p className="text-slate-500">
              Industrial Service Management Platform
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
};
