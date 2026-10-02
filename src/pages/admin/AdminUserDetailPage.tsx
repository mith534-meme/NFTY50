import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { AdminShell } from '../../components/admin/AdminShell';
import { adminUsers } from '../../data/adminMockData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, User, CreditCard, Activity } from 'lucide-react';

export const AdminUserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = adminUsers.find((u) => u.id === userId) || adminUsers[0];

  return (
    <AdminShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <Link
            to="/admin/users"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0052FF] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO ALL USERS
          </Link>

          <span className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-bold">
            USER ID: {user.id}
          </span>
        </div>

        {/* User Detail Card */}
        <Card variant="light" hoverEffect={false} className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-[#E2E8F0]">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white flex items-center justify-center font-bold text-2xl shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-[#0F172A]">{user.name}</h1>
              <p className="text-xs font-mono text-[#64748B] mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-bold text-[#0F172A] uppercase flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#0052FF]" /> ACCOUNT INFO
              </h3>
              <div className="text-xs font-mono space-y-1.5 text-[#64748B]">
                <p>Phone: <strong className="text-[#0F172A]">{user.phone}</strong></p>
                <p>Joined: <strong className="text-[#0F172A]">{user.joinedDate}</strong></p>
                <p>Role: <strong className="text-[#0052FF]">{user.role}</strong></p>
                <p>Status: <strong className="text-emerald-600">{user.status}</strong></p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-mono text-xs font-bold text-[#0F172A] uppercase flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#0052FF]" /> SUBSCRIPTION
              </h3>
              <div className="text-xs font-mono space-y-1.5 text-[#64748B]">
                <p>Plan Tier: <strong className="text-[#0052FF]">PRO Quarterly</strong></p>
                <p>Status: <strong className="text-emerald-600">{user.plan}</strong></p>
                <p>Expiry: <strong className="text-[#0F172A]">15 Nov 2026</strong></p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-mono text-xs font-bold text-[#0F172A] uppercase flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#0052FF]" /> PLATFORM ACTIVITY
              </h3>
              <div className="text-xs font-mono space-y-1.5 text-[#64748B]">
                <p>Last Active: <strong className="text-[#0F172A]">{user.lastActive}</strong></p>
                <p>Trades Viewed: <strong className="text-[#0F172A]">48 setups</strong></p>
                <p>Reports Read: <strong className="text-[#0F172A]">12 reports</strong></p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E2E8F0] flex items-center gap-4">
            <Button variant="secondary" size="md" className="text-xs">
              Suspend Account Access
            </Button>
            <Button variant="outline" size="md" className="text-xs">
              Resend Password Reset Email
            </Button>
          </div>
        </Card>
      </div>
    </AdminShell>
  );
};
