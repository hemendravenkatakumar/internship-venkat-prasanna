/**
 * Notifications Service — Event-driven in-app notifications
 * Handles Owner/Admin alerts (new service requests, new customer reviews)
 * and Customer alerts (scheduling visit date, status changes, service completion).
 */

import { storageService } from './storageService';

export type NotificationType =
  | 'new_service_request'
  | 'scheduling_update'
  | 'status_update'
  | 'completion'
  | 'new_review'
  | 'system_alert';

export interface NotificationItem {
  id: string;
  targetRole: 'admin' | 'customer' | 'all';
  targetUserId?: string; // If targeted to a specific customer
  type: NotificationType;
  title: string;
  message: string;
  serviceToken?: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

const STORAGE_KEY_NOTIFICATIONS = 'vpe_notifications_store';

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-seed-01',
    targetRole: 'admin',
    type: 'new_service_request',
    title: 'Emergency Service Request Received',
    message: 'Sortex Machine Optical Sensor Failure reported by Venkat Prasanna (Prasanna Agro Industries). Token: VPE-SR-2026-0001.',
    serviceToken: 'VPE-SR-2026-0001',
    timestamp: '2026-10-25T09:30:00.000Z',
    read: false,
    link: '/admin/dashboard',
  },
  {
    id: 'notif-seed-02',
    targetRole: 'customer',
    targetUserId: 'usr-client-01',
    type: 'scheduling_update',
    title: 'Service Visit Scheduled',
    message: 'Your service request VPE-SR-2026-0001 has been scheduled for Nov 04, 2026. Lead Engineer: K. Srinivas.',
    serviceToken: 'VPE-SR-2026-0001',
    timestamp: '2026-10-26T11:00:00.000Z',
    read: false,
    link: '/customer/requests',
  },
  {
    id: 'notif-seed-03',
    targetRole: 'admin',
    type: 'new_review',
    title: 'New Customer Review Awaiting Moderation',
    message: 'East Godavari Mills Co. submitted a 5-star review for ATS emergency switch overhaul.',
    timestamp: '2026-10-24T16:20:00.000Z',
    read: false,
    link: '/admin/dashboard',
  },
  {
    id: 'notif-seed-04',
    targetRole: 'customer',
    targetUserId: 'usr-client-01',
    type: 'completion',
    title: 'Service Completed & Report Available',
    message: 'Work order for Sortex Optical Unit 2 has been completed. Official Engineer Service Record is now available in your portal.',
    serviceToken: 'VPE-SR-2026-0001',
    timestamp: '2026-10-26T17:00:00.000Z',
    read: false,
    link: '/customer/requests',
  },
];

export const notificationsService = {
  /**
   * Retrieves notifications filtered by recipient role and optional user ID
   */
  getNotifications(role?: 'admin' | 'customer', userId?: string): NotificationItem[] {
    const all = storageService.getItem<NotificationItem[]>(STORAGE_KEY_NOTIFICATIONS, []);
    if (all.length === 0) {
      storageService.setItem(STORAGE_KEY_NOTIFICATIONS, INITIAL_NOTIFICATIONS);
      return role
        ? INITIAL_NOTIFICATIONS.filter((n) => {
            if (role === 'admin') return n.targetRole === 'admin' || n.targetRole === 'all';
            return (
              (n.targetRole === 'customer' || n.targetRole === 'all') &&
              (!n.targetUserId || n.targetUserId === userId)
            );
          })
        : INITIAL_NOTIFICATIONS;
    }

    if (!role) return all;

    return all.filter((n) => {
      if (role === 'admin') {
        return n.targetRole === 'admin' || n.targetRole === 'all';
      }
      return (
        (n.targetRole === 'customer' || n.targetRole === 'all') &&
        (!n.targetUserId || n.targetUserId === userId)
      );
    });
  },

  /**
   * Adds a new notification
   */
  notify(item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>): NotificationItem {
    const all = storageService.getItem<NotificationItem[]>(STORAGE_KEY_NOTIFICATIONS, []);
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    all.unshift(newNotif);
    storageService.setItem(STORAGE_KEY_NOTIFICATIONS, all);

    // Dispatch custom DOM event for live updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vpe_notification_received', { detail: newNotif }));
    }

    return newNotif;
  },

  /**
   * Helper: Send new service request notification to Owner/Admin
   */
  notifyNewServiceRequest(params: {
    token: string;
    companyName: string;
    contactPerson: string;
    machineIssue: string;
  }) {
    return this.notify({
      targetRole: 'admin',
      type: 'new_service_request',
      title: `New Service Request: ${params.token}`,
      message: `${params.companyName} (${params.contactPerson}) reported: ${params.machineIssue.slice(0, 80)}...`,
      serviceToken: params.token,
      link: '/admin/dashboard',
    });
  },

  /**
   * Helper: Send visit scheduled notification to Customer
   */
  notifySchedulingUpdate(params: {
    token: string;
    userId: string;
    scheduledDate: string;
    engineerName: string;
  }) {
    return this.notify({
      targetRole: 'customer',
      targetUserId: params.userId,
      type: 'scheduling_update',
      title: `Service Visit Scheduled for ${params.token}`,
      message: `Your on-site service visit has been scheduled for ${params.scheduledDate}. Lead Engineer: ${params.engineerName}.`,
      serviceToken: params.token,
      link: '/customer/requests',
    });
  },

  /**
   * Helper: Send service completion notification to Customer
   */
  notifyCompletion(params: {
    token: string;
    userId: string;
    engineerName: string;
    statusSummary: string;
  }) {
    return this.notify({
      targetRole: 'customer',
      targetUserId: params.userId,
      type: 'completion',
      title: `Service Completed: ${params.token}`,
      message: `Your machine service has been marked completed by ${params.engineerName}. Inspection findings & service record are available to view.`,
      serviceToken: params.token,
      link: '/customer/requests',
    });
  },

  /**
   * Helper: Send new review notification to Owner/Admin
   */
  notifyNewReview(params: {
    customerName: string;
    companyName: string;
    rating: number;
    title: string;
  }) {
    return this.notify({
      targetRole: 'admin',
      type: 'new_review',
      title: `New Customer Review (${params.rating} Stars)`,
      message: `${params.customerName} from ${params.companyName} submitted a review: "${params.title}"`,
      link: '/admin/dashboard',
    });
  },

  /**
   * Mark a notification as read
   */
  markAsRead(id: string): void {
    const all = storageService.getItem<NotificationItem[]>(STORAGE_KEY_NOTIFICATIONS, []);
    const item = all.find((n) => n.id === id);
    if (item) {
      item.read = true;
      storageService.setItem(STORAGE_KEY_NOTIFICATIONS, all);
    }
  },

  /**
   * Mark all notifications as read for a given role
   */
  markAllAsRead(role: 'admin' | 'customer', userId?: string): void {
    const all = storageService.getItem<NotificationItem[]>(STORAGE_KEY_NOTIFICATIONS, []);
    all.forEach((n) => {
      if (role === 'admin' && (n.targetRole === 'admin' || n.targetRole === 'all')) {
        n.read = true;
      }
      if (
        role === 'customer' &&
        (n.targetRole === 'customer' || n.targetRole === 'all') &&
        (!n.targetUserId || n.targetUserId === userId)
      ) {
        n.read = true;
      }
    });
    storageService.setItem(STORAGE_KEY_NOTIFICATIONS, all);
  },

  /**
   * Unread notification count
   */
  getUnreadCount(role: 'admin' | 'customer', userId?: string): number {
    return this.getNotifications(role, userId).filter((n) => !n.read).length;
  },
};
