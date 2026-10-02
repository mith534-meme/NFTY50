export type UserRole = 'USER' | 'ADMIN';
export type SubscriptionStatus = 'NOT_ACTIVE' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
export type AccountStatus = 'ACTIVE' | 'DISABLED' | 'SUSPENDED';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: UserRole;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
  last_login_at: string;
  status: AccountStatus;
  subscription_status: SubscriptionStatus;
}
