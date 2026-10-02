import React from 'react';
import { Link } from 'react-router-dom';
import { AdminShell } from '../../components/admin/AdminShell';
import { adminUsers } from '../../data/adminMockData';
import { Card } from '../../components/ui/Card';
import { Eye } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            User Account Management
          </h1>
          <p className="text-sm text-[#64748B] mt-1 font-sans">
            Manage subscriber accounts, subscription tiers, and account permissions.
          </p>
        </div>

        <Card variant="light" hoverEffect={false} className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[11px] font-mono text-[#64748B] uppercase">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Phone</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Subscription</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Joined</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs font-mono">
                {adminUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="py-3.5 font-bold text-[#0F172A]">{u.name}</td>
                    <td className="py-3.5 text-[#64748B]">{u.email}</td>
                    <td className="py-3.5 text-[#64748B]">{u.phone}</td>
                    <td className="py-3.5 font-semibold text-[#0052FF]">{u.role}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#0052FF] border border-blue-200">
                        {u.plan}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          u.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-[#64748B]">{u.joinedDate}</td>
                    <td className="py-3.5 flex items-center gap-3">
                      <Link
                        to={`/admin/users/${u.id}`}
                        className="text-[#0052FF] font-bold hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminShell>
  );
};
