/**
 * Centralized Route Paths for Venkata Prasanna Enterprises (VPE)
 * Ensures type-safe routing across the application.
 */
export const ROUTES = {
  // Public Marketing & Informational Pages
  PUBLIC: {
    HOME: '/',
    ABOUT: '/about',
    SERVICES: '/services',
    INDUSTRIES: '/industries',
    VENDOR_EXPERIENCE: '/vendor-experience',
    SERVICE_CHARGES: '/service-charges',
    REVIEWS: '/reviews',
    CONTACT: '/contact',
  },

  // Authentication Placeholders
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },

  // Customer Portal Placeholders (Future Module)
  CUSTOMER: {
    DASHBOARD: '/customer/dashboard',
    SERVICE_REQUEST: '/customer/service-request',
    REQUESTS: '/customer/requests',
  },

  // Engineer Portal Placeholders (Future Module)
  ENGINEER: {
    DASHBOARD: '/engineer/dashboard',
    REQUESTS: '/engineer/requests',
  },

  // Admin Portal Placeholders (Future Module)
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
  },
} as const;

export type RouteKey = typeof ROUTES;
