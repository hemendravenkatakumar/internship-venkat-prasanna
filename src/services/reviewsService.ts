/**
 * Reviews Service
 * Handles customer review submissions, approval/rejection workflows by Owner & Admin,
 * and retrieval of approved reviews for public display.
 */

import { storageService } from './storageService';
import { notificationsService } from './notificationsService';

export type ReviewStatus = 'Pending' | 'Approved' | 'Rejected';

export interface CustomerReview {
  id: string;
  serviceRecordId: string;
  rating: number; // 1 to 5
  customerName: string;
  companyName: string;
  serviceCategory: string;
  title: string;
  feedback: string;
  status: ReviewStatus;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

const STORAGE_KEY_REVIEWS = 'vpe_customer_reviews';

const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-001',
    serviceRecordId: 'ESR-2026-0001',
    rating: 5,
    customerName: 'Venkat Prasanna',
    companyName: 'Prasanna Agro Industries Ltd.',
    serviceCategory: 'Equipment Breakdown & Sortex Repair',
    title: 'Sortex Machine Restored in Record Time',
    feedback:
      'Our color sorting line was down during peak harvest intake. VPE engineer arrived promptly with optical calibration equipment and replaced the degraded sensor. Zero grain waste since recommissioning.',
    status: 'Approved',
    createdAt: '2026-10-19T10:00:00.000Z',
    reviewedAt: '2026-10-19T14:00:00.000Z',
    reviewedBy: 'Owner & Admin',
  },
  {
    id: 'rev-002',
    serviceRecordId: 'ESR-2026-0002',
    rating: 5,
    customerName: 'S. Ramakrishna',
    companyName: 'East Godavari Mills Co.',
    serviceCategory: 'Power & Electrical Substation',
    title: 'Flawless ATS Contactor Replacement',
    feedback:
      'The emergency generator ATS tripping issue was solved cleanly with genuine heavy-duty contactors and relay recalibration. Highly professional service.',
    status: 'Approved',
    createdAt: '2026-10-15T09:00:00.000Z',
    reviewedAt: '2026-10-15T11:00:00.000Z',
    reviewedBy: 'Owner & Admin',
  },
  {
    id: 'rev-003',
    serviceRecordId: 'ESR-2026-0004',
    rating: 4,
    customerName: 'B. Jagadish',
    companyName: 'Godavari Marine Feeds',
    serviceCategory: 'Cold Storage & Refrigeration',
    title: 'Prompt Ammonia Compressor Leak Rectification',
    feedback:
      'Shaft seal replaced and pressure tested under load. Good technical knowledge of industrial ammonia systems.',
    status: 'Pending',
    createdAt: '2026-10-24T15:30:00.000Z',
  },
];

export const reviewsService = {
  /**
   * Retrieves all reviews
   */
  getAllReviews(): CustomerReview[] {
    const existing = storageService.getItem<CustomerReview[]>(STORAGE_KEY_REVIEWS, []);
    if (existing.length === 0) {
      storageService.setItem(STORAGE_KEY_REVIEWS, INITIAL_REVIEWS);
      return INITIAL_REVIEWS;
    }
    return existing;
  },

  /**
   * Retrieves only reviews that have been approved by Admin/Owner
   */
  getApprovedReviews(): CustomerReview[] {
    return this.getAllReviews().filter((r) => r.status === 'Approved');
  },

  /**
   * Submits a new review and alerts Owner/Admin
   */
  submitReview(payload: {
    serviceRecordId: string;
    rating: number;
    customerName: string;
    companyName: string;
    serviceCategory: string;
    title: string;
    feedback: string;
  }): CustomerReview {
    const all = this.getAllReviews();
    const newReview: CustomerReview = {
      id: `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      serviceRecordId: payload.serviceRecordId,
      rating: payload.rating,
      customerName: payload.customerName,
      companyName: payload.companyName,
      serviceCategory: payload.serviceCategory,
      title: payload.title,
      feedback: payload.feedback,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    all.unshift(newReview);
    storageService.setItem(STORAGE_KEY_REVIEWS, all);

    // Notify Owner/Admin of new review
    notificationsService.notifyNewReview({
      customerName: newReview.customerName,
      companyName: newReview.companyName,
      rating: newReview.rating,
      title: newReview.title,
    });

    return newReview;
  },

  /**
   * Admin action: Approve or reject a review
   */
  updateReviewStatus(id: string, status: ReviewStatus, adminName: string = 'Owner & Admin'): CustomerReview | undefined {
    const all = this.getAllReviews();
    const index = all.findIndex((r) => r.id === id);
    if (index === -1) return undefined;

    all[index].status = status;
    all[index].reviewedAt = new Date().toISOString();
    all[index].reviewedBy = adminName;

    storageService.setItem(STORAGE_KEY_REVIEWS, all);
    return all[index];
  },
};
