import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { TradeSetup } from '../../data/demoTrades';
import { TradeStatusBadge } from './TradeStatusBadge';
import { Card } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight, Target, ShieldAlert } from 'lucide-react';

interface TodaysTradesProps {
  trades: TradeSetup[];
}

export const TodaysTrades: React.FC<TodaysTradesProps> = ({ trades }) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'NIFTY 50' | 'BANK NIFTY' | 'SENSEX'>('ALL');

  const filteredTrades =
    activeTab === 'ALL' ? trades : trades.filter((t) => t.index === activeTab);

  return (
    <section>
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-wider">
            TODAY'S TRADE SETUPS (DEMO DATA)
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Active and executed intraday setups for Indian benchmark indices.
          </p>
        </div>

        {/* Index Tabs */}
        <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-[#E2E8F0]">
          {(['ALL', 'NIFTY 50', 'BANK NIFTY', 'SENSEX'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-white text-[#0052FF] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Trade Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTrades.map((trade) => (
          <Card
            key={trade.id}
            variant="light"
            hoverEffect
            className="p-5 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white ${
                      trade.direction === 'BUY'
                        ? 'bg-gradient-to-r from-[#0052FF] to-[#4D7CFF]'
                        : 'bg-rose-500'
                    }`}
                  >
                    {trade.direction === 'BUY' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-base font-mono">
                      {trade.instrument}
                    </h4>
                    <span className="text-[10px] font-mono text-[#64748B]">{trade.index}</span>
                  </div>
                </div>

                <TradeStatusBadge status={trade.status} />
              </div>

              {/* Levels Grid */}
              <div className="grid grid-cols-3 gap-2 my-4 text-xs font-mono">
                <div className="bg-[#FAFAFA] p-2.5 rounded-lg border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#64748B] block uppercase font-bold">Entry</span>
                  <strong className="text-[#0F172A]">{trade.entryZone}</strong>
                </div>

                <div className="bg-rose-50/50 p-2.5 rounded-lg border border-rose-200">
                  <span className="text-[10px] text-rose-700 block uppercase font-bold flex items-center gap-0.5">
                    <ShieldAlert className="w-3 h-3" /> Stop Loss
                  </span>
                  <strong className="text-rose-600">{trade.stopLoss}</strong>
                </div>

                <div className="bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 block uppercase font-bold flex items-center gap-0.5">
                    <Target className="w-3 h-3" /> Target 1
                  </span>
                  <strong className="text-emerald-700">{trade.target1}</strong>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#64748B]">R:R {trade.riskReward}</span>
              <Link
                to={`/dashboard/trades/${trade.id}`}
                className="text-xs font-mono font-bold text-[#0052FF] hover:underline"
              >
                View Full Setup →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
