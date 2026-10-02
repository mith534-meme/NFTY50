import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp,
  Menu,
  X,
  LayoutDashboard,
  Users,
  CreditCard,
  Zap,
  FileText,
  Bell,
  History,
  Settings,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

export const AdminMobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate('/admin/login', { replace: true });
  };

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
    { name: 'Trades', href: '/admin/trades', icon: Zap },
    { name: 'Research', href: '/admin/research', icon: FileText },
    { name: 'Reports', href: '/admin/reports', icon: FileText },
    { name: 'Notifications', href: '/admin/notifications', icon: Bell },
    { name: 'Audit Logs', href: '/admin/audit-logs', icon: History },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="block lg:hidden sticky top-0 z-50 bg-white border-b border-[#E2E8F0] shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] flex items-center justify-center text-white font-bold shadow-md">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <span className="font-display text-base font-bold text-[#0F172A]">
              NIFTY<span className="text-[#0052FF]">PULSE</span>
            </span>
            <span className="block text-[8px] font-mono font-bold text-[#0052FF] uppercase">
              ADMIN
            </span>
          </div>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 rounded-xl text-[#0F172A] hover:bg-slate-100 focus-ring min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle admin drawer"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-[#E2E8F0] bg-white p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-[#E2E8F0]">
            <ShieldCheck className="w-5 h-5 text-[#0052FF]" />
            <div className="truncate">
              <p className="text-xs font-bold text-[#0F172A]">Administrator</p>
              <p className="text-[10px] font-mono text-[#64748B] truncate">{currentUser?.email}</p>
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
                      ? 'bg-[#0052FF] text-white font-semibold'
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
              <span>LOGOUT CONSOLE</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
