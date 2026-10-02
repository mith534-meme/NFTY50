import React from 'react';
import { Container } from '../ui/Container';
import { SectionLabel } from '../ui/SectionLabel';
import { Button } from '../ui/Button';
import { HeroVisual } from './HeroVisual';
import { CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-dot-grid">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-glow pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (55-60%) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Section Label */}
            <SectionLabel>DAILY MARKET RESEARCH</SectionLabel>

            {/* Headline using Calistoga font */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] leading-[1.12]">
              Trade With{' '}
              <span className="text-gradient-signature">Research.</span>
              <br />
              Not <span className="text-gradient-signature">Guesswork.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#64748B] leading-relaxed max-w-2xl font-normal">
              Daily F&O market research and trade setups for{' '}
              <strong className="text-[#0F172A] font-semibold">NIFTY 50</strong>,{' '}
              <strong className="text-[#0F172A] font-semibold">BANK NIFTY</strong> and{' '}
              <strong className="text-[#0F172A] font-semibold">SENSEX</strong> — with defined entry,
              stop-loss, targets and the reasoning behind every setup.
            </p>

            {/* Quick Value Highlights */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-sm font-mono text-[#64748B]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0052FF]" /> Defined Risk & Reward
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0052FF]" /> Complete Rationale
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0052FF]" /> Zero Hype
              </span>
            </div>

            {/* CTA Buttons (Stack on mobile, horizontal on desktop) */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Button href="#how-it-works" variant="primary" size="lg" showArrow className="w-full sm:w-auto">
                View How It Works
              </Button>
              <Button href="#sample-trade" variant="secondary" size="lg" className="w-full sm:w-auto">
                See Sample Trade
              </Button>
            </div>
          </div>

          {/* Right Column (40-45%) */}
          <div className="lg:col-span-5 w-full">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
};
