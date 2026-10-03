import React from 'react';
import { PagePlaceholder } from '@/components/common/PagePlaceholder';
import { ROUTES } from '@/routes/paths';

/**
 * Customer Dashboard Placeholder
 * ARCHITECTURAL DECISION:
 * No fake customer data, mock charts, or fake equipment telemetry are placed here.
 * Real operational telemetry will be linked via authenticated API services in future stages.
 */
export const CustomerDashboardPage: React.FC = () => {
  return (
    <PagePlaceholder
      badge="Client Portal"
      title="Customer Operations Dashboard"
      subtitle="Overview of active industrial maintenance contracts, open service tickets, and plant equipment status."
      routePath={ROUTES.CUSTOMER.DASHBOARD}
      moduleType="Client Portal Module"
      description="Production route placeholder for the industrial client dashboard. Will display authenticated company metrics, asset uptime, and active service calls."
    />
  );
};
