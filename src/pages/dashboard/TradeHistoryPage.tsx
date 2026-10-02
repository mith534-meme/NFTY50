import React, { useState } from 'react';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { TradeHistoryPreview } from '../../components/dashboard/TradeHistoryPreview';
import { demoTrades } from '../../data/demoTrades';

export const TradeHistoryPage: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'NIFTY 50' | 'BANK NIFTY' | 'SENSEX' | 'WIN' | 'LOSS'>('ALL');

  const filteredTrades = demoTrades.filter((t) => {
    if (filter === 'ALL') return true;
    if (filter === 'WIN') return t.resultStatus === 'WIN';
    if (filter === 'LOSS') return t.resultStatus === 'LOSS';
    return t.index === filter;
  });

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Complete Trade History & Audit Log
          </h1>
          <p className="text-sm text-[#64748B] mt-1 font-sans">
            Transparent permanent log of every published setup, entry level, exit target, and outcome.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          {(['ALL', 'NIFTY 50', 'BANK NIFTY', 'SENSEX', 'WIN', 'LOSS'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                filter === f
                  ? 'bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white shadow-sm'
                  : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:text-[#0F172A]'
              }`}
            >
              {f === 'WIN' ? 'WINNING TRADES' : f === 'LOSS' ? 'LOSING TRADES' : f}
            </button>
          ))}
        </div>

        <TradeHistoryPreview trades={filteredTrades} />
      </div>
    </DashboardShell>
  );
};
