import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp,
  LayoutDashboard,
  Zap,
  BarChart2,
  History,
  FileText,
  Bell,
  CreditCard,
  User,
  LogOut,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile, currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const displayName = userProfile?.full_name || currentUser?.displayName || 'Trader';
  const subStatus = userProfile?.subscription_status || 'NOT_ACTIVE';

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: "Today's Trades", href: '/dashboard/trades', icon: Zap },
    { name: 'Market Analysis', href: '/dashboard/analysis', icon: BarChart2 },
    { name: 'Trade History', href: '/dashboard/trade-history', icon: History },
    { name: 'Daily Reports', href: '/dashboard/reports', icon: FileText },
    { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    { name: 'Subscription', href: '/dashboard/subscription', icon: CreditCard },
    { name: 'Profile Settings', href: '/dashboard/profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E2E8F0] flex flex-col justify-between h-screen sticky top-0 shrink-0 hidden lg:flex">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-[#E2E8F0]">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] flex items-center justify-center text-white font-bold shadow-md shadow-[#0052FF]/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-[#0F172A]">
              NIFTY<span className="text-[#0052FF]">PULSE</span>
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-[#0052FF]/10 text-[#0052FF] font-semibold shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0052FF]' : 'text-[#64748B]'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile Card at Bottom */}
      <div className="p-4 border-t border-[#E2E8F0] bg-slate-50/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0052FF] to-[#4D7CFF] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-[#0F172A] truncate">{displayName}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    subStatus === 'ACTIVE' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
                <span className="text-[10px] font-mono text-[#64748B] uppercase font-semibold">
                  {subStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer min-h-[44px]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>LOGOUT</span>
        </button>
      </div>
    </aside>
  );
};
