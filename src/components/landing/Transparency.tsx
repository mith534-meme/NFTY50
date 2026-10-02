import React from 'react';
import { Container } from '../ui/Container';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';
import { Award, CheckCircle, XCircle, BarChart, FileCheck2 } from 'lucide-react';

export const Transparency: React.FC = () => {
  const stats = [
    {
      label: 'TOTAL SETUPS RECORDED',
      value: '240+',
      subtext: 'Complete audit log',
      icon: BarChart,
      color: 'text-[#0052FF]',
      bg: 'bg-[#0052FF]/10',
    },
    {
      label: 'WINNING SETUPS',
      value: '168',
      subtext: 'Target 1 / 2 Achieved',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'LOSING SETUPS',
      value: '72',
      subtext: 'Stop Loss Executed',
      icon: XCircle,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
    {
      label: 'AVERAGE R:R RATIO',
      value: '1:2.2',
      subtext: 'Defined risk discipline',
      icon: Award,
      color: 'text-[#0052FF]',
      bg: 'bg-[#0052FF]/10',
    },
  ];

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-[#FAFAFA]">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <SectionLabel>TRANSPARENCY & AUDIT</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
            Every Trade Has a Record.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] font-normal max-w-2xl mx-auto">
            Every published setup is permanently recorded with its entry, exit, targets, stop-loss and final outcome — including winning and losing trades.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} variant="light" hoverEffect className="text-center p-6 sm:p-8">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="font-mono text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
                  {stat.label}
                </p>
                <div className="font-mono text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight my-1">
                  {stat.value}
                </div>
                <p className="text-xs text-[#64748B] font-mono">{stat.subtext}</p>
                <div className="mt-3 pt-2 border-t border-[#E2E8F0] inline-block">
                  <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    SAMPLE DATA
                  </span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Transparency Commitment Banner */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white flex items-center justify-center shrink-0">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">Zero Hype. Full Accountability.</h3>
              <p className="text-sm text-[#64748B] mt-0.5">
                We document every setup transparently. No deleted posts, no edited predictions, no false claims.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold text-[#0052FF] bg-[#0052FF]/5 px-3 py-1.5 rounded-full border border-[#0052FF]/20 shrink-0">
            AUDITED TRADE LOGS
          </span>
        </div>
      </Container>
    </section>
  );
};
