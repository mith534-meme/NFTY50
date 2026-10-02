import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bell, Sparkles, ShieldCheck } from 'lucide-react';
import { demoNotifications } from '../../data/demoNotifications';

export const DashboardHeader: React.FC = () => {
  const { userProfile, currentUser } = useAuth();
  const displayName = userProfile?.full_name || currentUser?.displayName || 'Trader';
  const unreadCount = demoNotifications.filter((n) => !n.isRead).length;

  return (
    <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between">
      {/* Dynamic User Greeting */}
      <div>
        <h1 className="font-display text-2xl font-bold text-[#0F172A] flex items-center gap-2">
          Good morning, {displayName}
          <Sparkles className="w-5 h-5 text-[#0052FF]" />
        </h1>
        <p className="text-xs text-[#64748B] font-sans mt-0.5">
          Here's your structured F&O market research plan for today.
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        {/* Sample Data Pill */}
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-700 border border-amber-500/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          RESEARCH DEMO DATA
        </span>

        {/* Notification Bell */}
        <Link
          to="/dashboard/notifications"
          className="relative p-2.5 rounded-xl hover:bg-slate-100 text-[#0F172A] transition-colors focus-ring min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#0052FF] text-white font-mono text-[10px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* User Profile Avatar Link */}
        <Link
          to="/dashboard/profile"
          className="flex items-center gap-3 p-1.5 pl-3 rounded-xl border border-[#E2E8F0] hover:border-[#0052FF]/30 transition-all bg-[#FAFAFA]"
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-[#0F172A] leading-tight">{displayName}</p>
            <p className="text-[10px] font-mono text-[#64748B] uppercase">
              {userProfile?.role || 'USER'}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {displayName.charAt(0).toUpperCase()}
          </div>
        </Link>
      </div>
    </header>
  );
};
