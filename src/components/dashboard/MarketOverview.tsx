import React from 'react';
import type { MarketIndexData } from '../../data/demoMarkets';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketCardProps {
  data: MarketIndexData;
}

export const MarketCard: React.FC<MarketCardProps> = ({ data }) => {
  const trendBadge = {
    BULLISH: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    NEUTRAL: 'bg-slate-100 text-slate-700 border-slate-200',
    BEARISH: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-sm hover:border-[#0052FF]/30 transition-all flex flex-col justify-between">
      <div>
        {/* Header: Name & Trend Badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[#0F172A] text-base">{data.name}</h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 font-semibold border border-amber-500/20">
              DEMO
            </span>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border uppercase ${
              trendBadge[data.trend]
            }`}
          >
            {data.trend} BIAS
          </span>
        </div>

        {/* Spot Price & Change */}
        <div className="flex items-baseline justify-between mt-2">
          <div>
            <div className="text-2xl font-bold font-mono text-[#0F172A] tracking-tight">
              {data.value}
            </div>
            <div
              className={`text-xs font-mono font-semibold flex items-center gap-1 mt-0.5 ${
                data.isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {data.isPositive ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              <span>
                {data.change} ({data.changePercent})
              </span>
            </div>
          </div>

          {/* Mini Sparkline SVG */}
          <div className="w-20 h-10 shrink-0">
            <svg className="w-full h-full" viewBox="0 0 240 40">
              <path
                d={data.chartPath}
                fill="none"
                stroke={data.isPositive ? '#10B981' : '#F43F5E'}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Levels Footer */}
      <div className="mt-4 pt-3 border-t border-[#E2E8F0] grid grid-cols-2 text-[11px] font-mono text-[#64748B]">
        <div>
          <span>S1: </span>
          <strong className="text-[#0F172A] font-semibold">{data.support1}</strong>
        </div>
        <div className="text-right">
          <span>R1: </span>
          <strong className="text-[#0F172A] font-semibold">{data.resistance1}</strong>
        </div>
      </div>
    </div>
  );
};

export const MarketOverview: React.FC<{ markets: MarketIndexData[] }> = ({ markets }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-wider">
          MARKET OVERVIEW (DEMO DATA)
        </h2>
        <span className="text-[11px] font-mono text-[#64748B]">Updated Today 09:15 AM</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {markets.map((m) => (
          <MarketCard key={m.id} data={m} />
        ))}
      </div>
    </section>
  );
};
