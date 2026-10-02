import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp,
  Menu,
  X,
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

export const MobileNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile, currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
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
    <div className="block lg:hidden sticky top-0 z-50 bg-white border-b border-[#E2E8F0] shadow-sm">
      {/* Top Header Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] flex items-center justify-center text-white font-bold shadow-md shadow-[#0052FF]/20">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="font-display text-lg font-bold text-[#0F172A]">
            NIFTY<span className="text-[#0052FF]">PULSE</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/dashboard/notifications"
            className="p-2.5 rounded-xl hover:bg-slate-100 text-[#0F172A] relative min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#0052FF] animate-pulse" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl text-[#0F172A] hover:bg-slate-100 focus-ring min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle drawer menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="border-t border-[#E2E8F0] bg-white p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-[#E2E8F0]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0052FF] to-[#4D7CFF] text-white flex items-center justify-center font-bold">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-[#0F172A]">{displayName}</p>
              <span className="text-[10px] font-mono text-amber-600 font-bold uppercase">
                Plan: {subStatus}
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-colors min-h-[44px] ${
                    isActive
                      ? 'bg-[#0052FF]/10 text-[#0052FF] font-semibold'
                      : 'text-[#64748B] hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-[#E2E8F0]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-mono font-semibold text-rose-600 bg-rose-50 border border-rose-200 min-h-[44px]"
            >
              <LogOut className="w-4 h-4" />
              <span>LOGOUT SESSION</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
