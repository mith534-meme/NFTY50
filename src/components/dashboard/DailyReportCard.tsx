import React from 'react';
import { Link } from 'react-router-dom';
import type { MarketReport } from '../../data/demoReports';
import { Card } from '../ui/Card';
import { FileText, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';

interface DailyReportCardProps {
  report: MarketReport;
}

export const DailyReportCard: React.FC<DailyReportCardProps> = ({ report }) => {
  return (
    <Card variant="light" hoverEffect={false} className="p-6 border-l-4 border-l-[#0052FF]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0] mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-[#0052FF]" />
            <span className="font-mono text-xs font-bold text-[#0052FF] uppercase">
              TODAY'S MARKET REPORT
            </span>
            <span className="text-[10px] font-mono bg-amber-500/10 text-amber-700 font-bold px-2 py-0.5 rounded">
              DEMO REPORT
            </span>
          </div>
          <h3 className="font-display text-xl font-bold text-[#0F172A]">{report.title}</h3>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-[#64748B]">
          <Calendar className="w-3.5 h-3.5" />
          <span>{report.date}</span>
        </div>
      </div>

      <p className="text-sm text-[#64748B] leading-relaxed mb-4 font-sans">{report.summary}</p>

      {/* Index Structures */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0]">
          <p className="font-mono text-[10px] font-bold text-[#0052FF] uppercase">NIFTY 50</p>
          <p className="text-xs text-[#0F172A] mt-1 line-clamp-2">{report.niftyStructure}</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0]">
          <p className="font-mono text-[10px] font-bold text-[#0052FF] uppercase">BANK NIFTY</p>
          <p className="text-xs text-[#0F172A] mt-1 line-clamp-2">{report.bankNiftyStructure}</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0]">
          <p className="font-mono text-[10px] font-bold text-[#0052FF] uppercase">SENSEX</p>
          <p className="text-xs text-[#0F172A] mt-1 line-clamp-2">{report.sensexStructure}</p>
        </div>
      </div>

      {/* Important Events */}
      <div className="mb-4">
        <p className="font-mono text-[11px] font-bold text-[#0F172A] uppercase mb-2">
          KEY MARKET EVENTS TODAY:
        </p>
        <ul className="space-y-1.5 text-xs text-[#64748B]">
          {report.importantEvents.map((evt, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0052FF] shrink-0" />
              <span>{evt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Read Full Report Link */}
      <div className="pt-3 border-t border-[#E2E8F0] text-right">
        <Link
          to="/dashboard/reports"
          className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#0052FF] hover:underline"
        >
          Read Full Market Report <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
};
