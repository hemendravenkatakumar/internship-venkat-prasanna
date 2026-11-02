/**
 * Vendor Registrations Service
 * Handles vendor, contractor, and supplier statutory registrations and onboarding data.
 */

import { storageService } from './storageService';

export type VendorStatus = 'Approved' | 'Pending Verification' | 'Rejected';

export interface VendorRegistrationRecord {
  id: string;
  vendorName: string;
  registrationType: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  gstin?: string;
  msmeNumber?: string;
  status: VendorStatus;
  appliedDate: string;
  notes?: string;
}

const STORAGE_KEY_VENDORS = 'vpe_vendor_registrations';

const INITIAL_VENDORS: VendorRegistrationRecord[] = [
  {
    id: 'VND-2026-001',
    vendorName: 'Godavari Industrial Bearings & Seals',
    registrationType: 'Precision Spares Supplier',
    category: 'Mechanical Components & Bearings',
    contactPerson: 'K. Subba Rao',
    email: 'sales@godavaribearings.in',
    phone: '+91 98481 12345',
    location: 'Tadepalligudem Industrial Area, AP',
    gstin: '37AAAAA0000A1Z5',
    msmeNumber: 'UDYAM-AP-08-0012345',
    status: 'Approved',
    appliedDate: '2026-09-12',
    notes: 'Authorized distributor for SKF & Timken industrial bearings.',
  },
  {
    id: 'VND-2026-002',
    vendorName: 'Krishna Refrigerant & Industrial Gases',
    registrationType: 'Chemicals & Gases',
    category: 'Ammonia & R-404A Coolants',
    contactPerson: 'P. V. Ramana',
    email: 'orders@krishnagases.com',
    phone: '+91 98492 67890',
    location: 'Vijayawada Highway Hub, AP',
    gstin: '37BBBBB1111B2Z6',
    msmeNumber: 'UDYAM-AP-09-0098765',
    status: 'Approved',
    appliedDate: '2026-10-01',
    notes: 'Compliant with PESO industrial gas cylinder safety norms.',
  },
  {
    id: 'VND-2026-003',
    vendorName: 'Deccan Electronic Sensors & Optical Spares',
    registrationType: 'Electronics Sub-Contractor',
    category: 'Sortex & Sensor Hardware',
    contactPerson: 'Anand Kumar',
    email: 'info@deccansensors.co.in',
    phone: '+91 99887 55443',
    location: 'Hyderabad Tech Zone, TS',
    gstin: '36CCCCC2222C3Z7',
    status: 'Pending Verification',
    appliedDate: '2026-10-22',
    notes: 'Submitted test certificate for optical sorting calibration arrays.',
  },
];

export const vendorRegistrationsService = {
  getVendors(): VendorRegistrationRecord[] {
    const existing = storageService.getItem<VendorRegistrationRecord[]>(STORAGE_KEY_VENDORS, []);
    if (existing.length === 0) {
      storageService.setItem(STORAGE_KEY_VENDORS, INITIAL_VENDORS);
      return INITIAL_VENDORS;
    }
    return existing;
  },

  updateStatus(id: string, status: VendorStatus, notes?: string): VendorRegistrationRecord | undefined {
    const vendors = this.getVendors();
    const vendor = vendors.find((v) => v.id === id);
    if (vendor) {
      vendor.status = status;
      if (notes) vendor.notes = notes;
      storageService.setItem(STORAGE_KEY_VENDORS, vendors);
    }
    return vendor;
  },

  addVendor(vendor: Omit<VendorRegistrationRecord, 'id' | 'appliedDate'>): VendorRegistrationRecord {
    const vendors = this.getVendors();
    const count = vendors.length + 1;
    const newRecord: VendorRegistrationRecord = {
      ...vendor,
      id: `VND-2026-${String(count).padStart(3, '0')}`,
      appliedDate: new Date().toISOString().split('T')[0],
    };
    vendors.unshift(newRecord);
    storageService.setItem(STORAGE_KEY_VENDORS, vendors);
    return newRecord;
  },
};
