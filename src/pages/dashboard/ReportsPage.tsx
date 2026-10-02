import React from 'react';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { DailyReportCard } from '../../components/dashboard/DailyReportCard';
import { demoReports } from '../../data/demoReports';

export const ReportsPage: React.FC = () => {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Daily Market Research Reports
          </h1>
          <p className="text-sm text-[#64748B] mt-1 font-sans">
            Comprehensive pre-market structural analysis, options open interest positioning, and key index levels.
          </p>
        </div>

        <div className="space-y-6">
          {demoReports.map((report) => (
            <DailyReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </DashboardShell>
  );
};
