import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import { Container } from '@/components/common/Container';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Wrench, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  FileCheck,
  UserCheck
} from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: FC = () => {
  const { t } = useLanguage();

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
                  {t('footer.certified')}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {t('footer.certified_desc')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                  {t('footer.rapid')}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {t('footer.rapid_desc')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                  {t('footer.support')}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {t('footer.support_desc')}
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
                <div className="h-12 w-12 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-sm border border-slate-700/50">
                  <img
                    src="/images/logo/logo.jpg"
                    alt="Venkata Prasanna Enterprises Official Logo"
                    className="h-full w-full object-contain rounded"
                  />
                </div>
                <div>
                  <span className="text-lg font-black tracking-tight text-white block leading-none">
                    VENKATA PRASANNA
                  </span>
                  <span className="text-xs font-bold tracking-widest text-amber-500 uppercase mt-0.5 block">
                    Enterprises • Industrial Services
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                {t('footer.about_desc')}
              </p>

              <div className="pt-2 text-xs text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-300 font-semibold">
                  <FileCheck className="w-4 h-4 text-amber-400" />
                  <span>GSTIN: 37ADYPY2158A1Z1</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <UserCheck className="w-4 h-4 text-slate-400" />
                  <span>{t('company.founder_title')}: {t('company.founder')}</span>
                </div>
              </div>
            </div>

            {/* Column 2: Public Navigation */}
            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
                {t('footer.company_services')}
              </h4>
              <ul className="space-y-2.5 text-sm" role="list">
                <li>
                  <Link to={ROUTES.PUBLIC.ABOUT} className="text-slate-400 hover:text-white transition-colors">
                    {t('nav.about')}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PUBLIC.SERVICES} className="text-slate-400 hover:text-white transition-colors">
                    {t('nav.services')}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PUBLIC.INDUSTRIES} className="text-slate-400 hover:text-white transition-colors font-medium text-amber-400">
                    {t('nav.industries')} (26)
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PUBLIC.VENDOR_EXPERIENCE} className="text-slate-400 hover:text-white transition-colors">
                    {t('nav.vendor_experience')}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PUBLIC.SERVICE_CHARGES} className="text-slate-400 hover:text-white transition-colors">
                    {t('nav.service_charges')}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PUBLIC.REVIEWS} className="text-slate-400 hover:text-white transition-colors">
                    {t('nav.reviews')}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.PUBLIC.CONTACT} className="text-slate-400 hover:text-white transition-colors">
                    {t('nav.contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Operational Portals */}
            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
                {t('footer.application_portals')}
              </h4>
              <ul className="space-y-2.5 text-sm" role="list">
                <li>
                  <Link to={ROUTES.CUSTOMER.SERVICE_REQUEST} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                    <span>{t('request.title')}</span>
                    <ExternalLink className="w-3 h-3 text-slate-600" />
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.CUSTOMER.DASHBOARD} className="text-slate-400 hover:text-white transition-colors">
                    {t('customer.dashboard_title')}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.ENGINEER.DASHBOARD} className="text-slate-400 hover:text-white transition-colors">
                    {t('record.title')} (Field Desk)
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.ADMIN.DASHBOARD} className="text-slate-400 hover:text-white transition-colors">
                    {t('admin.portal_name')}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.AUTH.LOGIN} className="text-slate-400 hover:text-white transition-colors">
                    {t('nav.login')}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.AUTH.REGISTER} className="text-slate-400 hover:text-white transition-colors">
                    {t('nav.register')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Dispatch */}
            <div>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
                {t('footer.emergency_dispatch')}
              </h4>
              <ul className="space-y-3 text-xs text-slate-400" role="list">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    Venkata Prasanna Enterprises, Andhra Pradesh, India
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  <a href="tel:+919866227780" className="hover:text-amber-400 transition-colors">
                    +91 9866227780
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <a href="mailto:venkataprasannaenterprises@gmail.com" className="hover:text-amber-400 transition-colors">
                    venkataprasannaenterprises@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{t('company.support_availability')}</span>
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
              © {CURRENT_YEAR} Venkata Prasanna Enterprises. {t('footer.rights')}
            </p>
            <p className="text-slate-400">
              {t('footer.gstin_note')}
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
};
