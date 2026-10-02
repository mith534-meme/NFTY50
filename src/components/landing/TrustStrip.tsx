import React from 'react';
import { Container } from '../ui/Container';
import { FileSearch, ShieldCheck, BellRing, History } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const items = [
    {
      icon: FileSearch,
      title: 'RESEARCHED SETUPS',
      description: 'Data-backed structural F&O analysis',
    },
    {
      icon: ShieldCheck,
      title: 'DEFINED RISK',
      description: 'Strict triggers, stop-loss & targets',
    },
    {
      icon: BellRing,
      title: 'LIVE TRADE UPDATES',
      description: 'Instant notifications on level shifts',
    },
    {
      icon: History,
      title: 'FULL TRADE HISTORY',
      description: 'Transparent log of all past setups',
    },
  ];

  return (
    <section className="py-10 border-y border-[#E2E8F0] bg-white/70 backdrop-blur-sm">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-3.5 group">
                <div className="w-11 h-11 rounded-xl bg-[#0052FF]/5 border border-[#0052FF]/15 text-[#0052FF] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0052FF] group-hover:text-white transition-colors duration-200">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold tracking-wider text-[#0F172A] uppercase">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#64748B] mt-0.5">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
