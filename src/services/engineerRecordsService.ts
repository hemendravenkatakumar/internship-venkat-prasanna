/**
 * Engineer Service Records Service
 * Manages formal technical inspection, maintenance, and repair records
 * executed by certified industrial field service engineers.
 */

import { storageService } from './storageService';

export type CompletionStatus =
  | 'Fully Operational'
  | 'Requires Follow-up'
  | 'Under Observation'
  | 'Decommissioned';

export interface EngineerServiceRecord {
  id: string; // e.g., 'ESR-2026-0001'
  serviceRequestId: string; // Links to internal ID or token
  serviceRequestToken: string; // e.g., 'VPE-SR-2026-0001'
  customerName: string;
  companyName: string;
  industryType: string;
  machineIssue: string;
  visitDate: string; // YYYY-MM-DD
  inspectionFindings: string;
  workPerformed: string;
  toolsAndMaterials: string;
  gasCompressorRequirements: string;
  engineerName: string;
  engineerRemarks: string;
  completionStatus: CompletionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface NewEngineerRecordPayload {
  serviceRequestId: string;
  serviceRequestToken: string;
  customerName: string;
  companyName: string;
  industryType?: string;
  machineIssue: string;
  visitDate: string;
  inspectionFindings: string;
  workPerformed: string;
  toolsAndMaterials: string;
  gasCompressorRequirements?: string;
  engineerName: string;
  engineerRemarks: string;
  completionStatus: CompletionStatus;
}

const STORAGE_KEY_ENGINEER_RECORDS = 'vpe_engineer_service_records';

const INITIAL_ENGINEER_RECORDS: EngineerServiceRecord[] = [
  {
    id: 'ESR-2026-0001',
    serviceRequestId: 'cmp-seed-01',
    serviceRequestToken: 'VPE-SR-2026-0001',
    customerName: 'Venkat Prasanna',
    companyName: 'Prasanna Agro Industries Ltd.',
    industryType: 'Rice Milling & Grain Processing',
    machineIssue: 'Sortex Machine Optical Sensor Failure in Unit 2 (Error code E-402, auto shutoff)',
    visitDate: '2026-10-18',
    inspectionFindings:
      'Optical grading sensor array emitter on Channel 4 was degraded due to fine paddy dust infiltration past worn silicone gaskets. Signal voltage dropped to 0.8V (threshold is 2.4V), triggering emergency shutoff circuit.',
    workPerformed:
      '1. Isolated 415V electrical supply and discharged capacitive backup units.\n2. Removed sorting box assembly and replaced Channel 4 optical sensor module (PN: STX-OP-442).\n3. Cleaned quartz inspection glass using optical-grade solvent.\n4. Re-calibrated LED background array luminosity to 6500K reference.\n5. Conducted dry test cycle on 50 quintals of fine paddy. Sorting accuracy achieved 99.85%.',
    toolsAndMaterials:
      'Digital Oscilloscope, Optical calibration target, Sensor module STX-OP-442, Viton dust seals, Isopropyl solvent 99%, torque wrench set (calibrated to 8 Nm).',
    gasCompressorRequirements:
      'Dry compressed air pneumatic line verified at 6.2 Bar. Ejector valves cleaned and flow-tested. Air dryer desiccant checked and found in normal operating parameter.',
    engineerName: 'K. Srinivas (Lead Automation & Sortex Specialist)',
    engineerRemarks:
      'Machine is operating in optimal condition. Advised plant operator to blow down dust pre-filters twice per 8-hour shift during peak paddy intake. Next preventive check recommended in 90 days.',
    completionStatus: 'Fully Operational',
    createdAt: '2026-10-18T16:30:00.000Z',
    updatedAt: '2026-10-18T16:30:00.000Z',
  },
  {
    id: 'ESR-2026-0002',
    serviceRequestId: 'cmp-seed-03',
    serviceRequestToken: 'VPE-SR-2026-0003',
    customerName: 'East Godavari Mills Co.',
    companyName: 'East Godavari Mills Co.',
    industryType: 'Agro-Industrial Processing',
    machineIssue: 'Emergency Generator Automatic Transfer Switch (ATS) Tripping under heavy switchover',
    visitDate: '2026-10-14',
    inspectionFindings:
      'Auxiliary contactor mechanical interlock was binding due to thermal expansion. Coil impedance measured 180 ohms with micro-arcing on terminal 4L.',
    workPerformed:
      'Replaced 250 kVA auxiliary contactor with heavy-duty silver-alloy rated contactor. Re-terminated control harness with ferrules and calibrated timing relay from 1.5s to 3.0s delay to stabilize generator frequency.',
    toolsAndMaterials:
      '250 kVA Industrial Contactor (ABB AF265), crimping station, digital multimeter, contact cleaner spray, insulated torque screwdrivers.',
    gasCompressorRequirements:
      'Not applicable for electrical substation ATS unit.',
    engineerName: 'M. Venkatesh (Senior Electrical Systems Engineer)',
    engineerRemarks:
      'Load bank test verified through 3 simulated utility power dropouts. ATS switched cleanly with zero contact bounce. Certified for full continuous load.',
    completionStatus: 'Fully Operational',
    createdAt: '2026-10-14T17:45:00.000Z',
    updatedAt: '2026-10-14T17:45:00.000Z',
  },
];

export const engineerRecordsService = {
  /**
   * Retrieves all engineer service records from persistent storage
   */
  getAllRecords(): EngineerServiceRecord[] {
    const existing = storageService.getItem<EngineerServiceRecord[]>(
      STORAGE_KEY_ENGINEER_RECORDS,
      []
    );
    if (existing.length === 0) {
      storageService.setItem(STORAGE_KEY_ENGINEER_RECORDS, INITIAL_ENGINEER_RECORDS);
      return INITIAL_ENGINEER_RECORDS;
    }
    return existing;
  },

  /**
   * Get record by its ID or by related Service Request ID/Token
   */
  getRecord(idOrRequestId: string): EngineerServiceRecord | undefined {
    const all = this.getAllRecords();
    return all.find(
      (r) =>
        r.id === idOrRequestId ||
        r.serviceRequestId === idOrRequestId ||
        r.serviceRequestToken === idOrRequestId
    );
  },

  /**
   * Get all records for a specific customer or company name
   */
  getCustomerRecords(customerNameOrCompany: string): EngineerServiceRecord[] {
    const all = this.getAllRecords();
    const query = customerNameOrCompany.toLowerCase().trim();
    return all.filter(
      (r) =>
        r.customerName.toLowerCase().includes(query) ||
        r.companyName.toLowerCase().includes(query)
    );
  },

  /**
   * Creates a new Engineer Service Record and notifies customer
   */
  createRecord(payload: NewEngineerRecordPayload): EngineerServiceRecord {
    const all = this.getAllRecords();
    const count = all.length + 1;
    const padded = String(count).padStart(4, '0');
    const newId = `ESR-2026-${padded}`;
    const now = new Date().toISOString();

    const newRecord: EngineerServiceRecord = {
      id: newId,
      serviceRequestId: payload.serviceRequestId,
      serviceRequestToken: payload.serviceRequestToken,
      customerName: payload.customerName,
      companyName: payload.companyName,
      industryType: payload.industryType || 'Industrial Processing',
      machineIssue: payload.machineIssue,
      visitDate: payload.visitDate,
      inspectionFindings: payload.inspectionFindings,
      workPerformed: payload.workPerformed,
      toolsAndMaterials: payload.toolsAndMaterials,
      gasCompressorRequirements: payload.gasCompressorRequirements || 'None required for this service.',
      engineerName: payload.engineerName,
      engineerRemarks: payload.engineerRemarks,
      completionStatus: payload.completionStatus,
      createdAt: now,
      updatedAt: now,
    };

    all.unshift(newRecord);
    storageService.setItem(STORAGE_KEY_ENGINEER_RECORDS, all);

    return newRecord;
  },

  /**
   * Updates an existing service record
   */
  updateRecord(
    id: string,
    updates: Partial<Omit<EngineerServiceRecord, 'id' | 'createdAt'>>
  ): EngineerServiceRecord | undefined {
    const all = this.getAllRecords();
    const index = all.findIndex((r) => r.id === id);
    if (index === -1) return undefined;

    all[index] = {
      ...all[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    storageService.setItem(STORAGE_KEY_ENGINEER_RECORDS, all);
    return all[index];
  },
};
