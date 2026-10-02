import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const isApprovedAdminEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const adminEmailsEnv = import.meta.env.VITE_ADMIN_EMAILS || 'admin@niftypulse.com,mith534@gmail.com,admin@example.com,mitheshhb0@gmail.com';
  const allowedList = adminEmailsEnv.split(',').map((e: string) => e.trim().toLowerCase());
  return allowedList.includes(email.trim().toLowerCase());
};

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { currentUser, userProfile, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Check local admin session fallback if present
  let localAdminEmail: string | null = null;
  try {
    const rawSession = localStorage.getItem('nifty_admin_session');
    if (rawSession) {
      const parsed = JSON.parse(rawSession);
      localAdminEmail = parsed.email || null;
    }
  } catch (e) {}

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-[#0052FF] animate-spin mb-3" />
        <p className="font-mono text-sm text-[#64748B]">Verifying Admin Authorization...</p>
      </div>
    );
  }

  const activeEmail = currentUser?.email || localAdminEmail;
  const isEmailAllowed = isApprovedAdminEmail(activeEmail);
  const isRoleAdmin = userProfile?.role === 'ADMIN';

  // 1. If not authenticated by Firebase or local session, redirect to /admin/login
  if (!activeEmail && (!isAuthenticated || !currentUser)) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // 2. Verify email against ADMIN_EMAILS allowlist
  if (!isEmailAllowed && !isRoleAdmin) {
    // Normal user attempting to access /admin -> redirect to /admin/unauthorized
    return <Navigate to="/admin/unauthorized" replace />;
  }

  return <>{children}</>;
};
