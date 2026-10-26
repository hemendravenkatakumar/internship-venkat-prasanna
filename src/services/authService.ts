/**
 * Authentication Service — Role-based authentication and user session management.
 * Provides separate User and Admin roles, session persistence, and profile updates.
 */

import { storageService } from './storageService';

export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  company: string;
  location: string;
  avatar?: string;
  joinedAt: string;
}

export interface StoredUserAccount extends UserProfile {
  passwordHash: string; // Plain/hashed password for local verification
}

const STORAGE_KEY_SESSION = 'reliefnet_auth_session';
const STORAGE_KEY_ACCOUNTS = 'reliefnet_user_accounts';

/**
 * Standard Demo / Seed Accounts
 */
const DEFAULT_ACCOUNTS: StoredUserAccount[] = [
  {
    id: 'usr-admin-01',
    name: 'Operations Admin',
    email: 'admin@reliefnet.com',
    phone: '+91 98765 43210',
    role: 'admin',
    company: 'ReliefNet & VPE Headquarters',
    location: 'Tadepalligudem, AP',
    passwordHash: 'admin123',
    joinedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'usr-client-01',
    name: 'Venkat Prasanna',
    email: 'user@reliefnet.com',
    phone: '+91 98765 01234',
    role: 'user',
    company: 'Prasanna Agro Industries Ltd.',
    location: 'Tadepalligudem, AP',
    passwordHash: 'user123',
    joinedAt: '2026-02-15T00:00:00.000Z',
  },
];

export interface LoginResult {
  success: boolean;
  user?: UserProfile;
  redirectUrl: string;
  error?: string;
}

export const authService = {
  /**
   * Initializes default accounts into storage if empty
   */
  getAccounts(): StoredUserAccount[] {
    const existing = storageService.getItem<StoredUserAccount[]>(STORAGE_KEY_ACCOUNTS, []);
    if (existing.length === 0) {
      storageService.setItem(STORAGE_KEY_ACCOUNTS, DEFAULT_ACCOUNTS);
      return DEFAULT_ACCOUNTS;
    }
    return existing;
  },

  /**
   * Returns current active logged-in user profile, or null if not authenticated
   */
  getCurrentUser(): UserProfile | null {
    const session = storageService.getItem<UserProfile | null>(STORAGE_KEY_SESSION, null);
    if (!session) {
      // Default to demo user if no session yet, to allow easy exploration
      return null;
    }
    return session;
  },

  /**
   * Logs in a user by identifier (email or phone) and password
   */
  login(identifier: string, password: string): LoginResult {
    const accounts = this.getAccounts();
    const cleanId = identifier.trim().toLowerCase();

    // Check matching account
    const account = accounts.find(
      (acc) =>
        (acc.email.toLowerCase() === cleanId || acc.phone.replace(/[\s-]/g, '') === cleanId.replace(/[\s-]/g, '')) &&
        acc.passwordHash === password
    );

    if (!account) {
      // Quick fallback for demo accounts if user entered just "admin" or "user"
      if (cleanId === 'admin' && (password === 'admin123' || password === 'admin')) {
        const adminAcc = accounts.find((a) => a.role === 'admin') || DEFAULT_ACCOUNTS[0];
        const { passwordHash: _, ...profile } = adminAcc;
        storageService.setItem(STORAGE_KEY_SESSION, profile);
        return { success: true, user: profile, redirectUrl: '/admin/dashboard' };
      }

      return {
        success: false,
        redirectUrl: '',
        error: 'Invalid credentials. Please verify your email/phone and password.',
      };
    }

    const { passwordHash: _, ...profile } = account;
    storageService.setItem(STORAGE_KEY_SESSION, profile);

    return {
      success: true,
      user: profile,
      redirectUrl: profile.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard',
    };
  },

  /**
   * Quick one-click login helper for testing and reviews
   */
  loginAsRole(role: UserRole): UserProfile {
    const accounts = this.getAccounts();
    const target = accounts.find((a) => a.role === role) || (role === 'admin' ? DEFAULT_ACCOUNTS[0] : DEFAULT_ACCOUNTS[1]);
    const { passwordHash: _, ...profile } = target;
    storageService.setItem(STORAGE_KEY_SESSION, profile);
    return profile;
  },

  /**
   * Registers a new user account and saves to persistent storage
   */
  registerUser(payload: {
    name: string;
    email: string;
    phone: string;
    company: string;
    location: string;
    password: string;
  }): UserProfile {
    const accounts = this.getAccounts();
    const newAccount: StoredUserAccount = {
      id: `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      company: payload.company,
      location: payload.location,
      role: 'user',
      passwordHash: payload.password,
      joinedAt: new Date().toISOString(),
    };

    accounts.push(newAccount);
    storageService.setItem(STORAGE_KEY_ACCOUNTS, accounts);

    const { passwordHash: _, ...profile } = newAccount;
    return profile;
  },

  /**
   * Logs out current user and removes session
   */
  logout(): void {
    storageService.removeItem(STORAGE_KEY_SESSION);
  },

  /**
   * Updates user or admin profile details
   */
  updateProfile(userId: string, updates: Partial<UserProfile>): UserProfile {
    const accounts = this.getAccounts();
    const index = accounts.findIndex((a) => a.id === userId);

    if (index !== -1) {
      accounts[index] = { ...accounts[index], ...updates };
      storageService.setItem(STORAGE_KEY_ACCOUNTS, accounts);
    }

    const currentSession = this.getCurrentUser();
    if (currentSession && currentSession.id === userId) {
      const updatedSession = { ...currentSession, ...updates };
      storageService.setItem(STORAGE_KEY_SESSION, updatedSession);
      return updatedSession;
    }

    return accounts[index] || currentSession;
  },
};
