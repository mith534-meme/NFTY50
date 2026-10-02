import React from 'react';
import { Link } from 'react-router-dom';
import type { TradeSetup } from '../../data/demoTrades';
import { TradeStatusBadge } from './TradeStatusBadge';
import { History, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TradeHistoryPreviewProps {
  trades: TradeSetup[];
}

export const TradeHistoryPreview: React.FC<TradeHistoryPreviewProps> = ({ trades }) => {
  return (
    <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-[#0052FF]" />
          <div>
            <h2 className="font-bold text-[#0F172A] text-lg font-display">
              Recent Trade History
            </h2>
            <p className="text-xs text-[#64748B] font-mono">
              Audited log of past trade setups (SAMPLE DATA)
            </p>
          </div>
        </div>

        <Link
          to="/dashboard/trade-history"
          className="text-xs font-mono font-bold text-[#0052FF] hover:underline flex items-center gap-1"
        >
          View Full Trade History →
        </Link>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] text-[11px] font-mono text-[#64748B] uppercase">
              <th className="pb-3 font-semibold">Date</th>
              <th className="pb-3 font-semibold">Index</th>
              <th className="pb-3 font-semibold">Instrument</th>
              <th className="pb-3 font-semibold">Direction</th>
              <th className="pb-3 font-semibold">Entry Zone</th>
              <th className="pb-3 font-semibold">Exit / Target</th>
              <th className="pb-3 font-semibold">Result</th>
              <th className="pb-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-xs font-mono">
            {trades.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 text-[#64748B]">{t.date}</td>
                <td className="py-3.5 font-bold text-[#0F172A]">{t.index}</td>
                <td className="py-3.5 font-semibold text-[#0052FF]">{t.instrument}</td>
                <td className="py-3.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.direction === 'BUY'
                        ? 'bg-[#0052FF]/10 text-[#0052FF]'
                        : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {t.direction === 'BUY' ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {t.direction}
                  </span>
                </td>
                <td className="py-3.5 text-[#0F172A]">{t.entryZone}</td>
                <td className="py-3.5 text-[#0F172A]">{t.exitPrice || t.target1}</td>
                <td className="py-3.5">
                  {t.resultStatus === 'WIN' && (
                    <span className="text-emerald-600 font-bold">{t.pnlPoints}</span>
                  )}
                  {t.resultStatus === 'LOSS' && (
                    <span className="text-rose-600 font-bold">{t.pnlPoints}</span>
                  )}
                  {t.resultStatus === 'OPEN' && (
                    <span className="text-amber-600 font-bold">ACTIVE</span>
                  )}
                </td>
                <td className="py-3.5">
                  <TradeStatusBadge status={t.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View (No forced horizontal scroll on small screens) */}
      <div className="block md:hidden space-y-3">
        {trades.map((t) => (
          <div key={t.id} className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E2E8F0] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#64748B]">{t.date}</span>
              <TradeStatusBadge status={t.status} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-sm font-bold text-[#0F172A]">{t.instrument}</p>
                <p className="text-xs text-[#64748B] font-mono">{t.index}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono text-[#64748B]">Result</p>
                <p
                  className={`text-sm font-mono font-bold ${
                    t.resultStatus === 'WIN'
                      ? 'text-emerald-600'
                      : t.resultStatus === 'LOSS'
                      ? 'text-rose-600'
                      : 'text-amber-600'
                  }`}
                >
                  {t.pnlPoints || 'OPEN'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
