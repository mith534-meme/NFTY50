import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireVerifiedEmail?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireVerifiedEmail = false,
}) => {
  const { isAuthenticated, loading, currentUser } = useAuth();
  const location = useLocation();

  let hasLocalUser = false;
  try {
    const raw = localStorage.getItem('nifty_user_session');
    if (raw) hasLocalUser = true;
  } catch (e) {}

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-[#0052FF] animate-spin mb-3" />
        <p className="font-mono text-sm text-[#64748B]">Authenticating session...</p>
      </div>
    );
  }

  if (!isAuthenticated && !hasLocalUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireVerifiedEmail && currentUser && !currentUser.emailVerified && !hasLocalUser) {
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
};
