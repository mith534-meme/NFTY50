import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp,
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

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  let adminEmail = currentUser?.email;
  if (!adminEmail) {
    try {
      const raw = localStorage.getItem('nifty_admin_session');
      if (raw) adminEmail = JSON.parse(raw).email;
    } catch (e) {}
  }
  if (!adminEmail) adminEmail = 'admin@niftypulse.com';

  const handleLogout = async () => {
    localStorage.removeItem('nifty_admin_session');
    await logout();
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
    <aside className="w-64 bg-white border-r border-[#E2E8F0] flex flex-col justify-between h-screen sticky top-0 shrink-0 hidden lg:flex">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-[#E2E8F0]">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] flex items-center justify-center text-white font-bold shadow-md">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-tight text-[#0F172A]">
                NIFTY<span className="text-[#0052FF]">PULSE</span>
              </span>
              <span className="block text-[9px] font-mono font-bold text-[#0052FF] tracking-wider uppercase">
                ADMIN CONSOLE
              </span>
            </div>
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
                    ? 'bg-[#0052FF] text-white font-semibold shadow-md shadow-[#0052FF]/20'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Admin Profile Footer */}
      <div className="p-4 border-t border-[#E2E8F0] bg-slate-50/60">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center font-bold text-sm shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#0052FF]" />
          </div>
          <div className="truncate">
            <p className="text-xs font-bold text-[#0F172A] truncate">Administrator</p>
            <p className="text-[10px] font-mono text-[#64748B] truncate">{adminEmail}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer min-h-[44px]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>LOGOUT CONSOLE</span>
        </button>
      </div>
    </aside>
  );
};
