/**
 * Authentication Service — Role-based authentication and user session management.
 * Provides separate User and Admin roles, session persistence, and profile updates.
 */

import { storageService } from './storageService';

export type UserRole = 'user' | 'admin' | 'engineer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  company: string;
  location: string;
  industry?: string;
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
    name: 'VPE Owner & Administration',
    email: 'admin@reliefnet.com',
    phone: '+91 98765 43210',
    role: 'admin',
    company: 'Venkata Prasanna Enterprises (HQ)',
    location: 'Tadepalligudem, AP',
    industry: 'Industrial Plant Operations & Engineering',
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
    location: 'Tadepalligudem Industrial Zone, AP',
    industry: 'Rice Milling & Grain Processing',
    passwordHash: 'user123',
    joinedAt: '2026-02-15T00:00:00.000Z',
  },
  {
    id: 'usr-client-02',
    name: 'S. Ramakrishna',
    email: 'ops@eastgodavarimills.com',
    phone: '+91 98480 22334',
    role: 'user',
    company: 'East Godavari Mills Co.',
    location: 'Rajahmundry Industrial Zone, AP',
    industry: 'Agro-Industrial Processing',
    passwordHash: 'client123',
    joinedAt: '2026-03-01T00:00:00.000Z',
  },
  {
    id: 'usr-eng-01',
    name: 'K. Srinivas (Lead Field Specialist)',
    email: 'engineer@vpe.com',
    phone: '+91 94401 55678',
    role: 'engineer',
    company: 'VPE Industrial Field Engineering Team',
    location: 'Tadepalligudem & Godavari Region',
    industry: 'Industrial Electromechanical & Compressor Specialist',
    passwordHash: 'engineer123',
    joinedAt: '2026-01-15T00:00:00.000Z',
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
    // Ensure engineer account exists
    if (!existing.some((a) => a.role === 'engineer')) {
      const engineerAcc = DEFAULT_ACCOUNTS.find((a) => a.role === 'engineer')!;
      existing.push(engineerAcc);
      storageService.setItem(STORAGE_KEY_ACCOUNTS, existing);
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
      // Quick fallback for demo accounts if user entered "admin" or "owner"
      if (
        (cleanId === 'admin' || cleanId === 'owner') &&
        (password === 'admin123' || password === 'admin' || password === 'owner' || password === 'owner123')
      ) {
        const adminAcc = accounts.find((a) => a.role === 'admin') || DEFAULT_ACCOUNTS[0];
        const { passwordHash: _, ...profile } = adminAcc;
        storageService.setItem(STORAGE_KEY_SESSION, profile);
        return { success: true, user: profile, redirectUrl: '/admin/dashboard' };
      }

      if (cleanId === 'user' && (password === 'user123' || password === 'user')) {
        const userAcc = accounts.find((a) => a.role === 'user') || DEFAULT_ACCOUNTS[1];
        const { passwordHash: _, ...profile } = userAcc;
        storageService.setItem(STORAGE_KEY_SESSION, profile);
        return { success: true, user: profile, redirectUrl: '/customer/dashboard' };
      }

      if (
        (cleanId === 'engineer' || cleanId === 'field') &&
        (password === 'engineer123' || password === 'engineer' || password === 'field123')
      ) {
        const engAcc = accounts.find((a) => a.role === 'engineer') || DEFAULT_ACCOUNTS[3];
        const { passwordHash: _, ...profile } = engAcc;
        storageService.setItem(STORAGE_KEY_SESSION, profile);
        return { success: true, user: profile, redirectUrl: '/engineer/dashboard' };
      }

      return {
        success: false,
        redirectUrl: '',
        error: 'Invalid credentials. Please verify your email/phone and password.',
      };
    }

    const { passwordHash: _, ...profile } = account;
    storageService.setItem(STORAGE_KEY_SESSION, profile);

    const redirectUrl =
      profile.role === 'admin'
        ? '/admin/dashboard'
        : profile.role === 'engineer'
        ? '/engineer/dashboard'
        : '/customer/dashboard';

    return {
      success: true,
      user: profile,
      redirectUrl,
    };
  },

  /**
   * Quick one-click login helper for testing and reviews
   */
  loginAsRole(role: UserRole): UserProfile {
    const accounts = this.getAccounts();
    const target =
      accounts.find((a) => a.role === role) ||
      (role === 'admin' ? DEFAULT_ACCOUNTS[0] : role === 'engineer' ? DEFAULT_ACCOUNTS[3] : DEFAULT_ACCOUNTS[1]);
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
    industry?: string;
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
      industry: payload.industry || 'Industrial Manufacturing',
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
