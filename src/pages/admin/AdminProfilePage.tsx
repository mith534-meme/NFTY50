import React from 'react';
import { AdminShell } from '../../components/admin/AdminShell';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { ShieldCheck, Lock } from 'lucide-react';

export const AdminProfilePage: React.FC = () => {
  const { currentUser, userProfile } = useAuth();

  return (
    <AdminShell>
      <div className="space-y-6 max-w-2xl mx-auto">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Administrator Profile
          </h1>
          <p className="text-sm text-[#64748B] mt-1 font-sans">
            Authenticated administrator session details.
          </p>
        </div>

        <Card variant="light" hoverEffect={false} className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-[#E2E8F0]">
            <div className="w-14 h-14 rounded-2xl bg-[#0052FF] text-white flex items-center justify-center font-bold text-2xl shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-[#0F172A]">
                {userProfile?.full_name || 'Administrator'}
              </h2>
              <p className="text-xs font-mono text-[#64748B]">{currentUser?.email}</p>
            </div>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] flex items-center justify-between">
              <span className="text-[#64748B] font-bold">SYSTEM ROLE:</span>
              <span className="font-bold text-[#0052FF] bg-[#0052FF]/10 px-2.5 py-0.5 rounded border border-[#0052FF]/20">
                ADMINISTRATOR
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] flex items-center justify-between">
              <span className="text-[#64748B] font-bold">AUTHENTICATED EMAIL:</span>
              <span className="font-bold text-[#0F172A]">{currentUser?.email}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] flex items-center justify-between">
              <span className="text-[#64748B] font-bold">ALLOWLIST AUTHORIZATION:</span>
              <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                VERIFIED ADMIN ALLOWLIST
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] text-xs font-mono text-[#64748B] flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Role promotion/demotion is strictly managed via server configuration.</span>
          </div>
        </Card>
      </div>
    </AdminShell>
  );
};
