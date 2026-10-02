import React from 'react';
import type { MarketIndexData } from '../../data/demoMarkets';
import { Card } from '../ui/Card';
import { Layers } from 'lucide-react';

export const MarketAnalysis: React.FC<{ markets: MarketIndexData[] }> = ({ markets }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-wider">
          MARKET ANALYSIS & KEY LEVELS (DEMO DATA)
        </h2>
        <span className="text-[11px] font-mono text-amber-700 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
          SAMPLE DATA
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {markets.map((m) => (
          <Card key={m.id} variant="light" hoverEffect={false} className="p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0052FF]" />
                <h3 className="font-bold text-[#0F172A] text-sm">{m.name}</h3>
              </div>
              <span className="text-xs font-mono font-bold text-[#0052FF]">{m.trend}</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2 rounded bg-slate-50 border border-[#E2E8F0]">
                <span className="text-[#64748B]">Resistance 2 (R2):</span>
                <strong className="text-[#0F172A]">{m.resistance2}</strong>
              </div>
              <div className="flex justify-between p-2 rounded bg-slate-50 border border-[#E2E8F0]">
                <span className="text-[#64748B]">Resistance 1 (R1):</span>
                <strong className="text-[#0F172A]">{m.resistance1}</strong>
              </div>
              <div className="flex justify-between p-2 rounded bg-emerald-50/60 border border-emerald-200">
                <span className="text-emerald-700 font-bold">Support 1 (S1):</span>
                <strong className="text-emerald-800">{m.support1}</strong>
              </div>
              <div className="flex justify-between p-2 rounded bg-emerald-50/60 border border-emerald-200">
                <span className="text-emerald-700 font-bold">Support 2 (S2):</span>
                <strong className="text-emerald-800">{m.support2}</strong>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
