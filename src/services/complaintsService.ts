/**
 * Complaints Service — Comprehensive management of incident and complaint records.
 * Provides persistent storage, sequential token generation, admin status management,
 * remarks auditing, and email notification integration.
 */

import { storageService } from './storageService';
import { emailService } from './emailService';

export type ComplaintStatus = 'Submitted' | 'Under Review' | 'In Progress' | 'Resolved';

export interface StatusHistoryEntry {
  id: string;
  status: ComplaintStatus;
  remark: string;
  timestamp: string;
  author: string;
}

export interface ComplaintRecord {
  id: string;
  token: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  title: string;
  category: string;
  description: string;
  location: string;
  images: string[];
  voiceRecording: string | null;
  status: ComplaintStatus;
  adminRemarks: string;
  remarksHistory: StatusHistoryEntry[];
  emailStatus: {
    sent: boolean;
    sentAt?: string;
    recipient: string;
    attempts: number;
    error?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface NewComplaintPayload {
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  title: string;
  category: string;
  description: string;
  location: string;
  images?: string[];
  voiceRecording?: string | null;
}

export interface ComplaintStats {
  total: number;
  submitted: number;
  underReview: number;
  inProgress: number;
  resolved: number;
}

const STORAGE_KEY_COMPLAINTS = 'reliefnet_complaints_data';

/**
 * Initial Seed Data for immediate testing and verification
 */
const INITIAL_COMPLAINTS: ComplaintRecord[] = [
  {
    id: 'cmp-seed-01',
    token: 'RN-2026-0001',
    userId: 'usr-client-01',
    userName: 'Venkat Prasanna',
    userEmail: 'user@reliefnet.com',
    userPhone: '+91 98765 01234',
    title: 'Sortex Machine Optical Sensor Failure in Unit 2',
    category: 'Equipment Breakdown',
    description:
      'Optical grading sensors on Sortex line 2 are producing intermittent error code E-402, causing automatic shutoff during paddy sorting. Cleaned lens surfaces, but calibration fault persists.',
    location: 'Rice Processing Mill, Shed B, Tadepalligudem, AP',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    ],
    voiceRecording: null,
    status: 'In Progress',
    adminRemarks:
      'Field engineer dispatched with replacement optical calibration module. Estimated completion by 4:00 PM.',
    remarksHistory: [
      {
        id: 'rem-1',
        status: 'Submitted',
        remark: 'Complaint logged into system.',
        timestamp: '2026-10-15T09:30:00.000Z',
        author: 'System',
      },
      {
        id: 'rem-2',
        status: 'Under Review',
        remark: 'Triage complete. Assigned to senior electronic technician.',
        timestamp: '2026-10-15T11:00:00.000Z',
        author: 'Operations Admin',
      },
      {
        id: 'rem-3',
        status: 'In Progress',
        remark: 'Field engineer dispatched with replacement optical calibration module.',
        timestamp: '2026-10-16T08:30:00.000Z',
        author: 'Operations Admin',
      },
    ],
    emailStatus: {
      sent: true,
      sentAt: '2026-10-15T09:30:10.000Z',
      recipient: 'admin@reliefnet.com',
      attempts: 1,
    },
    createdAt: '2026-10-15T09:30:00.000Z',
    updatedAt: '2026-10-16T08:30:00.000Z',
  },
  {
    id: 'cmp-seed-02',
    token: 'RN-2026-0002',
    userId: 'usr-client-01',
    userName: 'Venkat Prasanna',
    userEmail: 'user@reliefnet.com',
    userPhone: '+91 98765 01234',
    title: 'Main Hydraulic Pump Pressure Drop on Elevator Conveyor',
    category: 'Mechanical Jam / Failure',
    description:
      'Primary hydraulic pressure dropped from 180 bar to 60 bar under full bucket elevator load. Suspect seal failure or valve bypass on main manifold.',
    location: 'Grain Silo Intake Station 1, Tadepalligudem, AP',
    images: [],
    voiceRecording: null,
    status: 'Under Review',
    adminRemarks: 'Technical team reviewing hydraulic schematic before on-site dispatch.',
    remarksHistory: [
      {
        id: 'rem-4',
        status: 'Submitted',
        remark: 'Complaint registered by user.',
        timestamp: '2026-10-16T14:15:00.000Z',
        author: 'System',
      },
      {
        id: 'rem-5',
        status: 'Under Review',
        remark: 'Technical team reviewing hydraulic schematic before on-site dispatch.',
        timestamp: '2026-10-16T15:00:00.000Z',
        author: 'Operations Admin',
      },
    ],
    emailStatus: {
      sent: true,
      sentAt: '2026-10-16T14:15:05.000Z',
      recipient: 'admin@reliefnet.com',
      attempts: 1,
    },
    createdAt: '2026-10-16T14:15:00.000Z',
    updatedAt: '2026-10-16T15:00:00.000Z',
  },
  {
    id: 'cmp-seed-03',
    token: 'RN-2026-0003',
    userId: 'usr-client-02',
    userName: 'East Godavari Mills Co.',
    userEmail: 'ops@eastgodavarimills.com',
    userPhone: '+91 98480 22334',
    title: 'Emergency Generator Automatic Transfer Switch (ATS) Tripping',
    category: 'Power & Electrical Failure',
    description:
      'Auxiliary 250 kVA diesel generator ATS trips when switching loads from grid power. Auxiliary contactor replaced and verified operational.',
    location: 'Substation Control Room, Rajahmundry Industrial Zone',
    images: [],
    voiceRecording: null,
    status: 'Resolved',
    adminRemarks: 'Auxiliary contactor and timing relay calibrated. Full load trial test verified and approved.',
    remarksHistory: [
      {
        id: 'rem-6',
        status: 'Submitted',
        remark: 'Complaint logged.',
        timestamp: '2026-10-14T10:00:00.000Z',
        author: 'System',
      },
      {
        id: 'rem-7',
        status: 'Resolved',
        remark: 'Auxiliary contactor and timing relay calibrated. Full load trial test verified and approved.',
        timestamp: '2026-10-14T17:45:00.000Z',
        author: 'Operations Admin',
      },
    ],
    emailStatus: {
      sent: true,
      sentAt: '2026-10-14T10:00:08.000Z',
      recipient: 'admin@reliefnet.com',
      attempts: 1,
    },
    createdAt: '2026-10-14T10:00:00.000Z',
    updatedAt: '2026-10-14T17:45:00.000Z',
  },
];

export const complaintsService = {
  /**
   * Retrieves all stored complaints, initializing seed data on first run
   */
  getComplaints(): ComplaintRecord[] {
    const existing = storageService.getItem<ComplaintRecord[]>(STORAGE_KEY_COMPLAINTS, []);
    if (existing.length === 0) {
      storageService.setItem(STORAGE_KEY_COMPLAINTS, INITIAL_COMPLAINTS);
      // Initialize sequence counter to 3 so next is RN-2026-0004
      const COUNTER_KEY = 'reliefnet_token_sequence';
      if (storageService.getItem<number>(COUNTER_KEY, 0) < 3) {
        storageService.setItem(COUNTER_KEY, 3);
      }
      return INITIAL_COMPLAINTS;
    }
    return existing;
  },

  /**
   * Gets complaints submitted by a specific user ID
   */
  getUserComplaints(userId: string): ComplaintRecord[] {
    const all = this.getComplaints();
    return all.filter((c) => c.userId === userId);
  },

  /**
   * Finds a complaint by ID or Token
   */
  getComplaint(idOrToken: string): ComplaintRecord | undefined {
    const all = this.getComplaints();
    return all.find((c) => c.id === idOrToken || c.token === idOrToken);
  },

  /**
   * Calculates dashboard statistics from authoritative persistent records
   */
  getStats(): ComplaintStats {
    const all = this.getComplaints();
    return {
      total: all.length,
      submitted: all.filter((c) => c.status === 'Submitted').length,
      underReview: all.filter((c) => c.status === 'Under Review').length,
      inProgress: all.filter((c) => c.status === 'In Progress').length,
      resolved: all.filter((c) => c.status === 'Resolved').length,
    };
  },

  /**
   * Submits a new complaint, generates token RN-2026-XXXX, saves persistently,
   * and triggers fail-safe email dispatch.
   */
  async submitComplaint(payload: NewComplaintPayload): Promise<ComplaintRecord> {
    const token = storageService.generateComplaintToken();
    const now = new Date().toISOString();

    const newRecord: ComplaintRecord = {
      id: `cmp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      token,
      userId: payload.userId,
      userName: payload.userName,
      userEmail: payload.userEmail,
      userPhone: payload.userPhone,
      title: payload.title.trim(),
      category: payload.category,
      description: payload.description.trim(),
      location: payload.location.trim(),
      images: payload.images || [],
      voiceRecording: payload.voiceRecording || null,
      status: 'Submitted',
      adminRemarks: '',
      remarksHistory: [
        {
          id: `rem-${Date.now()}`,
          status: 'Submitted',
          remark: 'Complaint registered by user in portal.',
          timestamp: now,
          author: payload.userName,
        },
      ],
      emailStatus: {
        sent: false,
        recipient: emailService.getAdminEmail(),
        attempts: 0,
      },
      createdAt: now,
      updatedAt: now,
    };

    // 1. SAVE TO PERSISTENT STORAGE FIRST (guarantees zero data loss even if email fails)
    const all = this.getComplaints();
    all.unshift(newRecord);
    storageService.setItem(STORAGE_KEY_COMPLAINTS, all);

    // 2. DISPATCH EMAIL NOTIFICATION
    try {
      const emailResult = await emailService.sendComplaintNotification({
        token: newRecord.token,
        userName: newRecord.userName,
        userEmail: newRecord.userEmail,
        userPhone: newRecord.userPhone,
        title: newRecord.title,
        category: newRecord.category,
        description: newRecord.description,
        location: newRecord.location,
        createdAt: newRecord.createdAt,
        imagesCount: newRecord.images.length,
        hasVoiceNote: Boolean(newRecord.voiceRecording),
      });

      if (emailResult.success) {
        newRecord.emailStatus = {
          sent: true,
          sentAt: new Date().toISOString(),
          recipient: emailResult.record.recipient,
          attempts: 1,
        };
        // Update stored record with email confirmation
        storageService.setItem(STORAGE_KEY_COMPLAINTS, all);
      }
    } catch (err: unknown) {
      console.warn('[complaintsService] Email dispatch failed, complaint is safely stored:', err);
      newRecord.emailStatus.error = err instanceof Error ? err.message : 'Delivery pending';
      storageService.setItem(STORAGE_KEY_COMPLAINTS, all);
    }

    return newRecord;
  },

  /**
   * Updates complaint status, appends admin remarks, and records audit trail
   */
  updateComplaintStatus(
    idOrToken: string,
    newStatus: ComplaintStatus,
    adminRemarks?: string,
    author: string = 'Operations Admin'
  ): ComplaintRecord | undefined {
    const all = this.getComplaints();
    const index = all.findIndex((c) => c.id === idOrToken || c.token === idOrToken);

    if (index === -1) return undefined;

    const target = all[index];
    const now = new Date().toISOString();

    target.status = newStatus;
    if (adminRemarks && adminRemarks.trim()) {
      target.adminRemarks = adminRemarks.trim();
    }
    target.updatedAt = now;

    // Append to audit trail
    target.remarksHistory.push({
      id: `rem-${Date.now()}`,
      status: newStatus,
      remark: adminRemarks?.trim() || `Status updated to ${newStatus}`,
      timestamp: now,
      author,
    });

    storageService.setItem(STORAGE_KEY_COMPLAINTS, all);
    return target;
  },

  /**
   * Retries email notification for a complaint
   */
  async retryComplaintEmail(idOrToken: string): Promise<boolean> {
    const all = this.getComplaints();
    const complaint = all.find((c) => c.id === idOrToken || c.token === idOrToken);
    if (!complaint) return false;

    const result = await emailService.sendComplaintNotification({
      token: complaint.token,
      userName: complaint.userName,
      userEmail: complaint.userEmail,
      userPhone: complaint.userPhone,
      title: complaint.title,
      category: complaint.category,
      description: complaint.description,
      location: complaint.location,
      createdAt: complaint.createdAt,
      imagesCount: complaint.images.length,
      hasVoiceNote: Boolean(complaint.voiceRecording),
    });

    if (result.success) {
      complaint.emailStatus.sent = true;
      complaint.emailStatus.sentAt = new Date().toISOString();
      complaint.emailStatus.attempts += 1;
      delete complaint.emailStatus.error;
      storageService.setItem(STORAGE_KEY_COMPLAINTS, all);
      return true;
    }
    return false;
  },
};
