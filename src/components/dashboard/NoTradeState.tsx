import React from 'react';
import { Card } from '../ui/Card';
import { ShieldCheck, Clock } from 'lucide-react';

export const NoTradeState: React.FC = () => {
  return (
    <Card
      variant="light"
      hoverEffect={false}
      className="p-8 sm:p-12 text-center border-2 border-dashed border-[#E2E8F0] bg-slate-50/50"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center mx-auto mb-4">
        <Clock className="w-7 h-7" />
      </div>

      <h3 className="font-display text-2xl font-bold text-[#0F172A] mb-2">
        NO ACTIVE SETUP AT THIS MOMENT
      </h3>

      <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed font-sans mb-6">
        Market conditions currently do not meet our strict risk-reward setup criteria. We prioritize quality over frequency to protect subscriber capital.
      </p>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E2E8F0] shadow-sm text-xs font-mono text-[#0052FF] font-semibold">
        <ShieldCheck className="w-4 h-4" />
        <span>STAY TUNED — WE MONITOR THE MARKET LIVE</span>
      </div>
    </Card>
  );
};
