import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Bell, LogOut } from 'lucide-react';

export const AdminHeader: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  let adminEmail = currentUser?.email;
  if (!adminEmail) {
    try {
      const raw = localStorage.getItem('nifty_admin_session');
      if (raw) {
        adminEmail = JSON.parse(raw).email;
      }
    } catch (e) {}
  }
  if (!adminEmail) adminEmail = 'admin@niftypulse.com';

  const handleLogout = async () => {
    localStorage.removeItem('nifty_admin_session');
    await logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="font-display text-xl font-bold text-[#0F172A] flex items-center gap-2">
          Admin Console
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0052FF]/10 text-[#0052FF] border border-[#0052FF]/20 font-bold uppercase">
            RESTRICTED ACCESS
          </span>
        </h1>
        <p className="text-xs text-[#64748B] font-sans mt-0.5">
          Platform Operations & Research Management Workspace
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/admin/notifications"
          className="relative p-2.5 rounded-xl hover:bg-slate-100 text-[#0F172A] transition-colors focus-ring min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#0052FF] animate-pulse" />
        </Link>

        <div className="flex items-center gap-3 p-1.5 pl-3 rounded-xl border border-[#E2E8F0] bg-[#FAFAFA]">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-[#0F172A] leading-tight">Administrator</p>
            <p className="text-[10px] font-mono text-[#64748B]">{adminEmail}</p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-[#0052FF] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors focus-ring min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          title="Logout Admin"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
