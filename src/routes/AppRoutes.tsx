import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './paths';
import { PublicLayout, AppLayout } from '@/components/layout';
import { ScrollToTop } from '@/components/common/ScrollToTop';

// Public Page Components
import {
  HomePage,
  AboutPage,
  ServicesPage,
  IndustriesPage,
  VendorExperiencePage,
  ServiceChargesPage,
  ReviewsPage,
  ContactPage,
} from '@/pages';

// Authentication & Portal Placeholders
import {
  LoginPage,
  RegisterPage,
  CustomerDashboardPage,
  CustomerServiceRequestPage,
  CustomerRequestsPage,
  EngineerDashboardPage,
  EngineerRequestsPage,
  AdminDashboardPage,
  NotFoundPage,
} from '@/pages';

/**
 * AppRoutes Component
 * Central route map registering all public marketing routes and
 * production placeholders for customer, field engineer, and administrative systems.
 */
export const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Informational Routes (Using PublicLayout with Navbar & Footer) */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.PUBLIC.HOME} element={<HomePage />} />
          <Route path={ROUTES.PUBLIC.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.PUBLIC.SERVICES} element={<ServicesPage />} />
          <Route path={ROUTES.PUBLIC.INDUSTRIES} element={<IndustriesPage />} />
          <Route path={ROUTES.PUBLIC.VENDOR_EXPERIENCE} element={<VendorExperiencePage />} />
          <Route path={ROUTES.PUBLIC.SERVICE_CHARGES} element={<ServiceChargesPage />} />
          <Route path={ROUTES.PUBLIC.REVIEWS} element={<ReviewsPage />} />
          <Route path={ROUTES.PUBLIC.CONTACT} element={<ContactPage />} />

          {/* Authentication Placeholders */}
          <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />

          {/* 404 Catch-All Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Customer Portal Placeholder Shell */}
        <Route
          element={<AppLayout portalName="Customer Service Portal" />}
        >
          <Route path={ROUTES.CUSTOMER.DASHBOARD} element={<CustomerDashboardPage />} />
          <Route path={ROUTES.CUSTOMER.SERVICE_REQUEST} element={<CustomerServiceRequestPage />} />
          <Route path={ROUTES.CUSTOMER.REQUESTS} element={<CustomerRequestsPage />} />
        </Route>

        {/* Field Engineer Portal Placeholder Shell */}
        <Route
          element={<AppLayout portalName="Field Engineer Terminal" />}
        >
          <Route path={ROUTES.ENGINEER.DASHBOARD} element={<EngineerDashboardPage />} />
          <Route path={ROUTES.ENGINEER.REQUESTS} element={<EngineerRequestsPage />} />
        </Route>

        {/* Operations Admin Portal Placeholder Shell */}
        <Route
          element={<AppLayout portalName="Operations Command Console" />}
        >
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboardPage />} />
        </Route>
      </Routes>
    </>
  );
};
