import React from 'react';
import { Container } from '../ui/Container';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';
import { BarChart3, LineChart, PieChart, Compass, Lightbulb, Zap } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      number: '01',
      title: 'NIFTY 50',
      description: 'Daily market setup, key structural levels, open interest clusters, and actionable trade zones for NIFTY 50 index options.',
      icon: BarChart3,
    },
    {
      number: '02',
      title: 'BANK NIFTY',
      description: 'Intraday banking index setups, volatility analysis, key support/resistance levels with strictly defined risk parameters.',
      icon: LineChart,
    },
    {
      number: '03',
      title: 'SENSEX',
      description: 'BSE SENSEX daily index opportunities, expiry day special setups, and institutional positioning insight.',
      icon: PieChart,
    },
    {
      number: '04',
      title: 'ENTRY & EXIT',
      description: 'Precise trigger price, entry zone, strict stop-loss, and multi-tier profit targets specified before trade execution.',
      icon: Compass,
    },
    {
      number: '05',
      title: 'TRADE REASONING',
      description: 'Comprehensive technical and derivative rationale explaining why every setup was selected so you trade with clarity.',
      icon: Lightbulb,
    },
    {
      number: '06',
      title: 'LIVE UPDATES',
      description: 'Real-time alerts when market structure shifts, trailing stop-loss updates, or when profit targets are achieved.',
      icon: Zap,
    },
  ];

  return (
    <section id="why-us" className="py-24 sm:py-32 lg:py-40 bg-[#FAFAFA]">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <SectionLabel>WHAT YOU GET</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
            Everything You Need Before Taking a Trade.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] font-normal max-w-2xl mx-auto">
            Eliminate emotional bias with clear, structured pre-market research and actionable intraday index setups.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} variant="light" hoverEffect className="relative group flex flex-col justify-between">
                <div>
                  {/* Card Top: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-[#0052FF] bg-[#0052FF]/10 px-3 py-1 rounded-full border border-[#0052FF]/20">
                      {feature.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] text-white flex items-center justify-center shadow-md shadow-[#0052FF]/20 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#0052FF] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
