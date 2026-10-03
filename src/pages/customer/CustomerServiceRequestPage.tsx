import React from 'react';
import { PagePlaceholder } from '@/components/common/PagePlaceholder';
import { ROUTES } from '@/routes/paths';

/**
 * Customer Service Request Placeholder
 * ARCHITECTURAL DECISION:
 * No fake service request submissions or mock ticket IDs.
 * The production form will connect directly to the service ticket backend API when ready.
 */
export const CustomerServiceRequestPage: React.FC = () => {
  return (
    <PagePlaceholder
      badge="Service Dispatch"
      title="Create Service Request"
      subtitle="Dispatch ticket generation for machine breakdowns, scheduled preventive maintenance, and calibration."
      routePath={ROUTES.CUSTOMER.SERVICE_REQUEST}
      moduleType="Client Portal Module"
      description="Production route placeholder for initiating real service tickets with equipment model, priority level, malfunction details, and location coordinates."
    />
  );
};
