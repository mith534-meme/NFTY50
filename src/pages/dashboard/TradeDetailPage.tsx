import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { ActiveTrade } from '../../components/dashboard/ActiveTrade';
import { demoTrades } from '../../data/demoTrades';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export const TradeDetailPage: React.FC = () => {
  const { tradeId } = useParams<{ tradeId: string }>();
  const trade = demoTrades.find((t) => t.id === tradeId) || demoTrades[0];

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0052FF] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO DASHBOARD
          </Link>

          <span className="text-xs font-mono bg-amber-500/10 text-amber-700 px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5 font-bold">
            <AlertTriangle className="w-3.5 h-3.5" /> SAMPLE RESEARCH DATA
          </span>
        </div>

        {/* Complete Trade Setup Card */}
        <ActiveTrade trade={trade} />

        {/* Section C Trade Detail Risk Disclosure Panel */}
        <div className="p-6 rounded-2xl bg-[#F1F5F9] border border-[#E2E8F0] space-y-2">
          <div className="flex items-center gap-2 text-[#0F172A] font-mono text-xs font-bold uppercase">
            <AlertTriangle className="w-4 h-4 text-[#0052FF]" />
            <span>RISK DISCLOSURE</span>
          </div>
          <p className="text-xs font-sans text-[#64748B] leading-relaxed">
            This trade setup is provided as market research and information. Trading futures and options involves substantial risk and can result in significant losses. Entry, stop-loss and target levels are based on the stated research methodology and do not guarantee a particular outcome. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
};
