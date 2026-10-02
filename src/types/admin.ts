import type { UserRole, SubscriptionStatus, AccountStatus } from './auth';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  plan: SubscriptionStatus;
  status: AccountStatus;
  joinedDate: string;
  lastActive: string;
}

export interface AdminSubscription {
  id: string;
  customerName: string;
  customerEmail: string;
  plan: string;
  amount: string;
  startDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'PENDING' | 'EXPIRED' | 'CANCELLED';
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  resource: string;
  ipReference: string;
  status: 'SUCCESS' | 'FAILED';
}

export interface AdminKpi {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
}
