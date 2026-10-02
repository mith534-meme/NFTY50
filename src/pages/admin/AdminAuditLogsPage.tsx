import React from 'react';
import { AdminShell } from '../../components/admin/AdminShell';
import { adminAuditLogs } from '../../data/adminMockData';
import { Card } from '../../components/ui/Card';

export const AdminAuditLogsPage: React.FC = () => {
  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Admin Operations Audit Logs
          </h1>
          <p className="text-sm text-[#64748B] mt-1 font-sans">
            Immutable audit record of all administrative actions, published research, and account modifications.
          </p>
        </div>

        <Card variant="light" hoverEffect={false} className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[11px] font-mono text-[#64748B] uppercase">
                  <th className="pb-3">Timestamp</th>
                  <th className="pb-3">Admin</th>
                  <th className="pb-3">Action</th>
                  <th className="pb-3">Resource Target</th>
                  <th className="pb-3">IP / Session Ref</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs font-mono">
                {adminAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-3.5 text-[#64748B]">{log.timestamp}</td>
                    <td className="py-3.5 font-bold text-[#0F172A]">{log.adminName}</td>
                    <td className="py-3.5 font-semibold text-[#0052FF]">{log.action}</td>
                    <td className="py-3.5 text-[#0F172A]">{log.resource}</td>
                    <td className="py-3.5 text-[#64748B]">{log.ipReference}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        {log.status}
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
