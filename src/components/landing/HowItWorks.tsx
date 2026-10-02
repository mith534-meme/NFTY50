import React from 'react';
import { Container } from '../ui/Container';
import { SectionLabel } from '../ui/SectionLabel';
import { Search, ShieldAlert, Bell, CheckSquare } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'MARKET RESEARCH',
      description: 'We analyse market structure, price action, derivatives data and relevant market conditions.',
      icon: Search,
    },
    {
      number: '02',
      title: 'TRADE SETUP',
      description: 'A defined setup is created with entry, stop loss, targets and invalidation.',
      icon: ShieldAlert,
    },
    {
      number: '03',
      title: 'LIVE UPDATE',
      description: 'Subscribers receive updates when the setup changes.',
      icon: Bell,
    },
    {
      number: '04',
      title: 'TRADE CLOSED',
      description: 'The final outcome is recorded in the trade history.',
      icon: CheckSquare,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 lg:py-40 bg-white border-y border-[#E2E8F0] relative overflow-hidden">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-24">
          <SectionLabel>HOW IT WORKS</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
            From Research to Trade.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] font-normal">
            A simple, disciplined 4-step workflow designed to keep your trading systematic and stress-free.
          </p>
        </div>

        {/* Timeline Desktop (Horizontal) & Mobile (Vertical) */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#0052FF] via-[#4D7CFF] to-[#0052FF]/30 -z-0" />

          {/* Mobile Connecting Line */}
          <div className="block lg:hidden absolute top-10 bottom-10 left-7 w-0.5 bg-gradient-to-b from-[#0052FF] via-[#4D7CFF] to-[#0052FF]/20 -z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="flex lg:flex-col items-start lg:items-center text-left lg:text-center group pl-14 lg:pl-0"
                >
                  {/* Step Circle */}
                  <div className="absolute left-0 lg:relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#0052FF] to-[#4D7CFF] text-white font-mono font-bold text-lg flex items-center justify-center shadow-lg shadow-[#0052FF]/25 border-4 border-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>

                  {/* Content Container */}
                  <div className="bg-[#FAFAFA] lg:bg-transparent p-5 lg:p-0 rounded-2xl border border-[#E2E8F0] lg:border-none w-full shadow-sm lg:shadow-none">
                    <div className="inline-flex items-center gap-1.5 text-[#0052FF] font-mono text-xs font-bold mb-2">
                      <Icon className="w-4 h-4" />
                      <span>STEP {step.number}</span>
                    </div>
                    <h3 className="font-mono text-base font-bold text-[#0F172A] mb-2 uppercase tracking-wide">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed font-sans">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
