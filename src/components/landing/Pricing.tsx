import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { SectionLabel } from '../ui/SectionLabel';
import { Button } from '../ui/Button';
import { Check, Sparkles } from 'lucide-react';

export const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  const plans = [
    {
      name: 'STARTER',
      tagline: 'Essential daily research for focused traders',
      price: billingCycle === 'monthly' ? '₹1,499' : '₹3,799',
      period: billingCycle === 'monthly' ? '/ month' : '/ quarter',
      featured: false,
      buttonText: 'Get Started with Starter',
      features: [
        'NIFTY 50 Daily Research',
        'Pre-Market Levels & Zones',
        'Entry, Stop Loss & Targets',
        'Standard Trade Reasoning',
        'Email Setup Digest',
      ],
    },
    {
      name: 'PRO',
      tagline: 'Complete coverage for serious F&O traders',
      price: billingCycle === 'monthly' ? '₹2,999' : '₹7,499',
      period: billingCycle === 'monthly' ? '/ month' : '/ quarter',
      featured: true, // Visually highlighted with Electric Blue border
      badgeText: 'MOST POPULAR',
      buttonText: 'Get Started with PRO',
      features: [
        'NIFTY 50 + BANK NIFTY + SENSEX',
        'Daily Intraday & Expiry Setups',
        'Defined Entry, SL & Targets',
        'Real-time Live Level Updates',
        'Full Audited Trade History Log',
        'Detailed Derivatives & OI Analysis',
        'Priority Subscriber Support',
      ],
    },
    {
      name: 'ADVANCED',
      tagline: 'Deep institutional research & multi-index analytics',
      price: billingCycle === 'monthly' ? '₹4,999' : '₹12,499',
      period: billingCycle === 'monthly' ? '/ month' : '/ quarter',
      featured: false,
      buttonText: 'Get Started with Advanced',
      features: [
        'All PRO Features Included',
        'FINNIFTY & MIDCPNIFTY Research',
        'Advanced Volatility & IV Skew Data',
        'Pre-Market Video Rationale Briefing',
        '1-on-1 Research Q&A Access',
        'Dedicated Relationship Manager',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 lg:py-40 bg-white border-t border-[#E2E8F0]">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <SectionLabel>SIMPLE PRICING</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
            One Subscription. Complete Market Coverage.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] font-normal">
            Transparent pricing with zero hidden fees. Cancel or modify anytime.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="pt-4 inline-flex items-center p-1.5 rounded-xl bg-slate-100 border border-[#E2E8F0]">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-[#0F172A] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                billingCycle === 'quarterly'
                  ? 'bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Quarterly Pass
              <span className="text-[10px] font-mono bg-white/20 px-1.5 py-0.5 rounded text-white font-bold">
                SAVE 15%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.featured
                  ? 'bg-white border-2 border-[#0052FF] shadow-2xl shadow-[#0052FF]/15 lg:-translate-y-2'
                  : 'bg-white border border-[#E2E8F0] shadow-md hover:border-[#0052FF]/30 hover:shadow-lg'
              }`}
            >
              {/* Highlight Badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white font-mono text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {plan.badgeText}
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="font-mono text-xl font-bold text-[#0F172A]">{plan.name}</h3>
                  <p className="text-xs text-[#64748B] mt-1">{plan.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="mb-6 flex items-baseline">
                  <span className="font-mono text-4xl sm:text-5xl font-bold text-[#0F172A] tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm text-[#64748B] font-mono ml-2">{plan.period}</span>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-[#E2E8F0] mb-6" />

                {/* Feature List */}
                <div className="space-y-3.5 mb-8">
                  <p className="text-xs font-mono font-bold text-[#0F172A] uppercase tracking-wider">
                    Included Features:
                  </p>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.featured
                            ? 'bg-[#0052FF] text-white'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-sm text-[#0F172A] font-normal">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Button
                variant={plan.featured ? 'primary' : 'secondary'}
                size="lg"
                showArrow
                className="w-full justify-center"
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
