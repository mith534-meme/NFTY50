import React from 'react';
import { Link } from 'react-router-dom';
import { AdminShell } from '../../components/admin/AdminShell';
import { adminKpis, adminUsers, adminAuditLogs } from '../../data/adminMockData';
import { demoTrades } from '../../data/demoTrades';
import { SectionLabel } from '../../components/ui/SectionLabel';
import { Card } from '../../components/ui/Card';
import {
  Plus,
  Zap,
  Users,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <AdminShell>
      {/* Overview Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <SectionLabel className="mb-1">OPERATIONS OVERVIEW</SectionLabel>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Good morning, Admin.
          </h1>
          <p className="text-sm text-[#64748B] mt-1 font-sans">
            Here's what's happening across your research platform.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/admin/trades/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white font-mono text-xs font-bold shadow-md hover:brightness-105 transition-all min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            CREATE TRADE SETUP
          </Link>
          <Link
            to="/admin/reports"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#0F172A] font-mono text-xs font-bold hover:bg-slate-50 transition-colors min-h-[44px]"
          >
            DAILY REPORT EDITOR
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {adminKpis.map((kpi, idx) => (
          <div key={idx} className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm">
            <p className="font-mono text-[9px] font-bold text-[#64748B] uppercase">{kpi.label}</p>
            <p className="font-mono text-xl sm:text-2xl font-bold text-[#0F172A] my-1 tracking-tight">
              {kpi.value}
            </p>
            <p className="text-[10px] font-mono font-semibold text-emerald-600">{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* Today's Research Status */}
      <Card variant="light" hoverEffect={false} className="p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#0052FF]" />
            <h3 className="font-display text-lg font-bold text-[#0F172A]">
              Today's Research Status
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-700 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 font-bold">
            DEMO WORKFLOW
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div>
              <p className="font-mono text-xs font-bold text-[#0F172A]">NIFTY 50</p>
              <p className="text-[11px] font-mono text-emerald-700 font-semibold mt-0.5">
                STATUS: READY & PUBLISHED
              </p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div>
              <p className="font-mono text-xs font-bold text-[#0F172A]">BANK NIFTY</p>
              <p className="text-[11px] font-mono text-emerald-700 font-semibold mt-0.5">
                STATUS: READY & PUBLISHED
              </p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div>
              <p className="font-mono text-xs font-bold text-[#0F172A]">SENSEX</p>
              <p className="text-[11px] font-mono text-amber-800 font-semibold mt-0.5">
                STATUS: PENDING REVIEW
              </p>
            </div>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
        </div>
      </Card>

      {/* Today's Trade Setups Table */}
      <Card variant="light" hoverEffect={false} className="p-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-4">
          <h3 className="font-display text-lg font-bold text-[#0F172A]">
            Active & Pending Trade Setups
          </h3>
          <Link
            to="/admin/trades"
            className="text-xs font-mono font-bold text-[#0052FF] hover:underline"
          >
            Manage All Trades →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[11px] font-mono text-[#64748B] uppercase">
                <th className="pb-3">Instrument</th>
                <th className="pb-3">Option</th>
                <th className="pb-3">Direction</th>
                <th className="pb-3">Entry</th>
                <th className="pb-3">Stop Loss</th>
                <th className="pb-3">Targets</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs font-mono">
              {demoTrades.map((trade) => (
                <tr key={trade.id} className="hover:bg-slate-50">
                  <td className="py-3 font-bold text-[#0F172A]">{trade.index}</td>
                  <td className="py-3 font-semibold text-[#0052FF]">{trade.instrument}</td>
                  <td className="py-3 font-bold text-emerald-600">{trade.direction}</td>
                  <td className="py-3">{trade.entryZone}</td>
                  <td className="py-3 text-rose-600 font-bold">{trade.stopLoss}</td>
                  <td className="py-3 text-emerald-700">{trade.target1}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 font-bold text-slate-700 border">
                      {trade.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <Link
                      to={`/admin/trades`}
                      className="text-[#0052FF] font-bold hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Users & Audit Log Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Summary */}
        <Card variant="light" hoverEffect={false} className="p-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-4">
            <h3 className="font-display text-base font-bold text-[#0F172A] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#0052FF]" /> Recent Registered Users
            </h3>
            <Link
              to="/admin/users"
              className="text-xs font-mono font-bold text-[#0052FF] hover:underline"
            >
              View Users →
            </Link>
          </div>

          <div className="space-y-3">
            {adminUsers.slice(0, 3).map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs font-mono"
              >
                <div>
                  <p className="font-bold text-[#0F172A]">{u.name}</p>
                  <p className="text-[10px] text-[#64748B]">{u.email}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 font-bold">
                  {u.plan}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Audit Log Summary */}
        <Card variant="light" hoverEffect={false} className="p-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-4">
            <h3 className="font-display text-base font-bold text-[#0F172A] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0052FF]" /> Recent Audit Logs
            </h3>
            <Link
              to="/admin/audit-logs"
              className="text-xs font-mono font-bold text-[#0052FF] hover:underline"
            >
              Full Log →
            </Link>
          </div>

          <div className="space-y-3">
            {adminAuditLogs.slice(0, 3).map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs font-mono"
              >
                <div className="flex items-center justify-between font-bold text-[#0F172A]">
                  <span>{log.action}</span>
                  <span className="text-[10px] text-emerald-600">{log.status}</span>
                </div>
                <p className="text-[10px] text-[#64748B] mt-1">
                  {log.resource} • {log.timestamp}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminShell>
  );
};
