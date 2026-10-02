import React from 'react';
import { AdminShell } from '../../components/admin/AdminShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const AdminReportsPage: React.FC = () => {
  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Daily Market Report Editor
            </h1>
            <p className="text-sm text-[#64748B] mt-1 font-sans">
              Formulate, edit, preview, and publish pre-market structural reports.
            </p>
          </div>

          <Button variant="primary" size="md" showArrow>
            + PUBLISH NEW REPORT
          </Button>
        </div>

        <Card variant="light" hoverEffect={false} className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <h3 className="font-bold text-[#0F172A]">02 October 2026 — Market Blueprint</h3>
            <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded font-bold">
              PUBLISHED
            </span>
          </div>

          <p className="text-xs text-[#64748B] font-sans">
            NIFTY 50 holds above 24,700 key pivot with expanding Put open interest. Banking index consolidates ahead of RBI policy commentary.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="secondary" size="md" className="text-xs">
              Edit Draft
            </Button>
            <Button variant="outline" size="md" className="text-xs">
              Preview Subscriber View
            </Button>
          </div>
        </Card>
      </div>
    </AdminShell>
  );
};
