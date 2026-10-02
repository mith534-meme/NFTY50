import React from 'react';
import { Card } from '../ui/Card';
import { Award, CheckCircle2, XCircle, BarChart3 } from 'lucide-react';

export const PerformanceSummary: React.FC = () => {
  const stats = [
    {
      label: 'TOTAL RECORDED SETUPS',
      value: '24',
      subtext: 'Audited log architecture',
      icon: BarChart3,
      color: 'text-[#0052FF]',
      bg: 'bg-[#0052FF]/10',
    },
    {
      label: 'HISTORICAL WINNING',
      value: '16',
      subtext: 'Target 1 / 2 Hit',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'HISTORICAL LOSING',
      value: '8',
      subtext: 'Stop Loss Hit',
      icon: XCircle,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
    {
      label: 'HISTORICAL WIN RATE',
      value: '66.7%',
      subtext: 'Historical performance log',
      icon: Award,
      color: 'text-[#0052FF]',
      bg: 'bg-[#0052FF]/10',
    },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-wider">
          HISTORICAL PERFORMANCE SUMMARY (DEMO ARCHITECTURE)
        </h2>
        <span className="text-[10px] font-mono bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded font-bold">
          DEMO STATS
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} variant="light" hoverEffect={false} className="p-4 sm:p-5 text-center">
              <div
                className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mx-auto mb-3`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <p className="font-mono text-[10px] font-bold text-[#64748B] uppercase">{stat.label}</p>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight my-1">
                {stat.value}
              </div>
              <p className="text-[10px] text-[#64748B] font-mono">{stat.subtext}</p>
            </Card>
          );
        })}
      </div>

      {/* Section D Past Performance Disclaimer */}
      <p className="text-xs font-mono text-[#64748B] text-center bg-[#F1F5F9] p-2.5 rounded-xl border border-[#E2E8F0]">
        Historical results are shown for transparency and informational purposes. Past performance does not guarantee future results.
      </p>
    </section>
  );
};
