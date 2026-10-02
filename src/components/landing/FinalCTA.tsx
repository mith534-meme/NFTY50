import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { SectionLabel } from '../ui/SectionLabel';
import { TrendingUp, ShieldCheck } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#0F172A] text-white relative overflow-hidden border-t border-slate-800">
      {/* Background Radial Glow & Dot Texture */}
      <div className="absolute inset-0 bg-dot-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-glow-dark pointer-events-none -z-0" />

      <Container className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        <SectionLabel darkBg>GET STARTED TODAY</SectionLabel>

        {/* Headline */}
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
          Stop Searching.{' '}
          <br className="hidden sm:inline" />
          Start <span className="text-gradient-signature">Researching.</span>
        </h2>

        {/* Supporting Text */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal">
          Get structured daily market research for NIFTY 50, BANK NIFTY and SENSEX — with defined entry, stop-loss, and targets.
        </p>

        {/* CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="#pricing" variant="primary" size="lg" showArrow className="w-full sm:w-auto px-8">
            Get Started Now
          </Button>
          <Button href="#sample-trade" variant="secondary" size="lg" className="w-full sm:w-auto px-8">
            View Sample Trade
          </Button>
        </div>

        {/* Risk & Trust Footnote */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#4D7CFF]" /> Defined Risk Parameters
          </span>
          <span className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#4D7CFF]" /> Daily F&O Coverage
          </span>
        </div>
      </Container>
    </section>
  );
};
