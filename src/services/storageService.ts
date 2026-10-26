/**
 * Storage Service — Persistent storage abstraction for ReliefNet & VPE
 * Handles localStorage operations, sequential token counter, and event broadcasting.
 */

const SYNC_EVENT_NAME = 'reliefnet_storage_sync';

export interface StorageSyncPayload {
  key: string;
  action: 'create' | 'update' | 'delete' | 'reset';
  timestamp: string;
}

export const storageService = {
  /**
   * Retrieves an item from localStorage and parses as JSON
   */
  getItem<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return fallback;
      return JSON.parse(data) as T;
    } catch (e) {
      console.warn(`[storageService] Failed to read key: ${key}`, e);
      return fallback;
    }
  },

  /**
   * Saves an item to localStorage and broadcasts a synchronization event
   */
  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.broadcastSync(key, 'update');
    } catch (e) {
      console.error(`[storageService] Failed to set key: ${key}`, e);
    }
  },

  /**
   * Removes an item from localStorage
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
      this.broadcastSync(key, 'delete');
    } catch (e) {
      console.error(`[storageService] Failed to remove key: ${key}`, e);
    }
  },

  /**
   * Generates a unique, sequentially incremented complaint token
   * Format: RN-YYYY-XXXX (e.g. RN-2026-0001)
   */
  generateComplaintToken(): string {
    const COUNTER_KEY = 'reliefnet_token_sequence';
    const currentYear = new Date().getFullYear();
    const currentSeq = this.getItem<number>(COUNTER_KEY, 0) + 1;
    this.setItem(COUNTER_KEY, currentSeq);

    const padded = String(currentSeq).padStart(4, '0');
    return `RN-${currentYear}-${padded}`;
  },

  /**
   * Broadcasts sync event across components and window tabs
   */
  broadcastSync(key: string, action: StorageSyncPayload['action']): void {
    if (typeof window !== 'undefined') {
      const payload: StorageSyncPayload = {
        key,
        action,
        timestamp: new Date().toISOString(),
      };
      window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME, { detail: payload }));
    }
  },

  /**
   * Subscribe to storage change events
   */
  subscribe(callback: (payload: StorageSyncPayload) => void): () => void {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<StorageSyncPayload>;
      callback(customEvent.detail);
    };

    const storageHandler = (e: StorageEvent) => {
      if (e.key) {
        callback({
          key: e.key,
          action: 'update',
          timestamp: new Date().toISOString(),
        });
      }
    };

    window.addEventListener(SYNC_EVENT_NAME, handler);
    window.addEventListener('storage', storageHandler);

    return () => {
      window.removeEventListener(SYNC_EVENT_NAME, handler);
      window.removeEventListener('storage', storageHandler);
    };
  },
};
