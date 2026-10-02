import React from 'react';
import { AdminShell } from '../../components/admin/AdminShell';
import { Card } from '../../components/ui/Card';

export const AdminResearchPage: React.FC = () => {
  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Market Research Console
          </h1>
          <p className="text-sm text-[#64748B] mt-1 font-sans">
            Prepare market structure analysis, option open interest clusters, and risk levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="light" hoverEffect={false} className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
              <h3 className="font-bold text-[#0F172A]">NIFTY 50 RESEARCH</h3>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                PUBLISHED
              </span>
            </div>
            <p className="text-xs text-[#64748B] font-mono">
              Higher-high consolidation above 24,750 pivot. Put writing support at 24,700 strike.
            </p>
          </Card>

          <Card variant="light" hoverEffect={false} className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
              <h3 className="font-bold text-[#0F172A]">BANK NIFTY RESEARCH</h3>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                PUBLISHED
              </span>
            </div>
            <p className="text-xs text-[#64748B] font-mono">
              Rejection at 52,600 supply zone. Short breakdown setup active below 52,380.
            </p>
          </Card>

          <Card variant="light" hoverEffect={false} className="p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
              <h3 className="font-bold text-[#0F172A]">SENSEX RESEARCH</h3>
              <span className="text-[10px] font-mono bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded">
                IN REVIEW
              </span>
            </div>
            <p className="text-xs text-[#64748B] font-mono">
              Testing 20-DMA support at 80,800 level. Reviewing afternoon session volume.
            </p>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
};
