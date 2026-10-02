import React from 'react';
import { AdminShell } from '../../components/admin/AdminShell';
import { adminSubscriptions } from '../../data/adminMockData';
import { Card } from '../../components/ui/Card';

export const AdminSubscriptionsPage: React.FC = () => {
  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Subscription Tiers & Transactions
          </h1>
          <p className="text-sm text-[#64748B] mt-1 font-sans">
            Overview of active, pending, expired, and cancelled membership plans.
          </p>
        </div>

        <Card variant="light" hoverEffect={false} className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[11px] font-mono text-[#64748B] uppercase">
                  <th className="pb-3">Sub ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Plan</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Start Date</th>
                  <th className="pb-3">Expiry Date</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs font-mono">
                {adminSubscriptions.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="py-3.5 font-bold text-[#0052FF]">{s.id}</td>
                    <td className="py-3.5 font-bold text-[#0F172A]">{s.customerName}</td>
                    <td className="py-3.5 text-[#64748B]">{s.plan}</td>
                    <td className="py-3.5 font-bold text-[#0F172A]">{s.amount}</td>
                    <td className="py-3.5 text-[#64748B]">{s.startDate}</td>
                    <td className="py-3.5 text-[#64748B]">{s.expiryDate}</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          s.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : s.status === 'PENDING'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {s.status}
                      </span>
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
