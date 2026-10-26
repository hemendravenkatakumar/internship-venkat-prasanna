/**
 * Services Service — Dynamic Service Management for ReliefNet & VPE
 * Manages the four core existing services and enables administrators to
 * dynamically add, edit, and toggle new services persistently without code modification.
 */

import { storageService } from './storageService';

export interface ServiceRecord {
  id: string;
  name: string;
  company: string;
  locations: string[];
  description: string;
  contactInfo: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface NewServicePayload {
  name: string;
  company: string;
  locations: string[];
  description?: string;
  contactInfo?: string;
  status: 'active' | 'inactive';
}

const STORAGE_KEY_SERVICES = 'reliefnet_dynamic_services';

/**
 * The four original baseline services preserved permanently
 */
const INITIAL_FOUR_SERVICES: ServiceRecord[] = [
  {
    id: 'srv-001',
    name: 'Industrial Equipment Inspection & Diagnostics',
    company: 'Venkata Prasanna Enterprises (VPE Core Operations)',
    locations: ['Tadepalligudem', 'Eluru', 'Bhimavaram', 'All Locations'],
    description:
      'Systematic on-site condition assessment, vibration analysis, and mechanical/electrical diagnostic evaluations to prevent catastrophic failures.',
    contactInfo: '+91 800-000-0000 | dispatch@vpe.com',
    status: 'active',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'srv-002',
    name: 'Root-Cause Machine Breakdown Troubleshooting',
    company: 'VPE Rapid Engineering Care',
    locations: ['Tadepalligudem', 'West Godavari', 'East Godavari', 'All Locations'],
    description:
      'High-priority diagnostics for unexpected shutdowns, motor trips, PLC automated anomalies, and power transmission bottlenecks.',
    contactInfo: '+91 98765 43210 | emergency@vpe.com',
    status: 'active',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'srv-003',
    name: 'Precision Machinery Repair & Component Overhaul',
    company: 'Venkata Prasanna Heavy Machinery Division',
    locations: ['Tadepalligudem', 'Rajahmundry', 'Visakhapatnam', 'All Locations'],
    description:
      'Precision mechanical restoration, dynamic rotor balancing, bearing replacements, and pump overhaul for agro-industrial processing lines.',
    contactInfo: '+91 98480 12345 | workshop@vpe.com',
    status: 'active',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'srv-004',
    name: 'Preventive Plant Maintenance & AMC Programs',
    company: 'VPE Industrial Care Division',
    locations: ['All Locations', 'Andhra Pradesh', 'Telangana'],
    description:
      'Scheduled periodic maintenance contracts, scheduled lubricant analysis, machine alignment, and certified technical dispatch logs.',
    contactInfo: '+91 800-111-2222 | amc@vpe.com',
    status: 'active',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
];

export const servicesService = {
  /**
   * Retrieves all services from persistent storage, initializing the 4 baseline services if empty
   */
  getAllServices(): ServiceRecord[] {
    const existing = storageService.getItem<ServiceRecord[]>(STORAGE_KEY_SERVICES, []);
    if (existing.length === 0) {
      storageService.setItem(STORAGE_KEY_SERVICES, INITIAL_FOUR_SERVICES);
      return INITIAL_FOUR_SERVICES;
    }
    return existing;
  },

  /**
   * Retrieves active services applicable to a given user location.
   * If location is not provided or 'All Locations', returns all active services.
   */
  getActiveServices(userLocation?: string): ServiceRecord[] {
    const all = this.getAllServices();
    const active = all.filter((s) => s.status === 'active');

    if (!userLocation || userLocation.trim() === '' || userLocation.toLowerCase() === 'all locations') {
      return active;
    }

    const locClean = userLocation.toLowerCase().trim();
    return active.filter((s) =>
      s.locations.some(
        (loc) =>
          loc.toLowerCase() === 'all locations' ||
          locClean.includes(loc.toLowerCase()) ||
          loc.toLowerCase().includes(locClean)
      )
    );
  },

  /**
   * Finds a service by ID
   */
  getServiceById(id: string): ServiceRecord | undefined {
    return this.getAllServices().find((s) => s.id === id);
  },

  /**
   * Adds a new service dynamically and saves to persistent storage.
   * Generates unique service ID like SRV-005, SRV-006, etc.
   */
  addService(payload: NewServicePayload): ServiceRecord {
    const all = this.getAllServices();
    const newSeq = all.length + 1;
    const padded = String(newSeq).padStart(3, '0');
    const now = new Date().toISOString();

    const cleanLocations = payload.locations
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const newRecord: ServiceRecord = {
      id: `srv-${padded}`,
      name: payload.name.trim(),
      company: payload.company.trim(),
      locations: cleanLocations.length > 0 ? cleanLocations : ['All Locations'],
      description: payload.description?.trim() || '',
      contactInfo: payload.contactInfo?.trim() || '',
      status: payload.status,
      createdAt: now,
      updatedAt: now,
    };

    all.push(newRecord);
    storageService.setItem(STORAGE_KEY_SERVICES, all);
    return newRecord;
  },

  /**
   * Updates an existing service
   */
  updateService(id: string, updates: Partial<NewServicePayload>): ServiceRecord | undefined {
    const all = this.getAllServices();
    const index = all.findIndex((s) => s.id === id);
    if (index === -1) return undefined;

    const target = all[index];
    const now = new Date().toISOString();

    all[index] = {
      ...target,
      ...(updates.name && { name: updates.name.trim() }),
      ...(updates.company && { company: updates.company.trim() }),
      ...(updates.locations && {
        locations: updates.locations.map((l) => l.trim()).filter((l) => l.length > 0),
      }),
      ...(updates.description !== undefined && { description: updates.description.trim() }),
      ...(updates.contactInfo !== undefined && { contactInfo: updates.contactInfo.trim() }),
      ...(updates.status && { status: updates.status }),
      updatedAt: now,
    };

    storageService.setItem(STORAGE_KEY_SERVICES, all);
    return all[index];
  },

  /**
   * Activates or deactivates a service
   */
  toggleServiceStatus(id: string): ServiceRecord | undefined {
    const all = this.getAllServices();
    const target = all.find((s) => s.id === id);
    if (!target) return undefined;

    const newStatus: 'active' | 'inactive' = target.status === 'active' ? 'inactive' : 'active';
    return this.updateService(id, { status: newStatus });
  },

  /**
   * Resets services back to the initial 4 services
   */
  resetToDefault(): ServiceRecord[] {
    storageService.setItem(STORAGE_KEY_SERVICES, INITIAL_FOUR_SERVICES);
    return INITIAL_FOUR_SERVICES;
  },
};
