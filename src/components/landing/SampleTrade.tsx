import React from 'react';
import { Container } from '../ui/Container';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';
import { ArrowUpRight, CheckCircle2, FileText, AlertTriangle } from 'lucide-react';

export const SampleTrade: React.FC = () => {
  return (
    <section id="sample-trade" className="py-24 sm:py-32 lg:py-40 bg-[#0F172A] text-white relative overflow-hidden border-y border-slate-800">
      {/* Background Dot Grid & Radial Glow */}
      <div className="absolute inset-0 bg-dot-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-glow-dark pointer-events-none -z-0" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <SectionLabel darkBg>SAMPLE SETUP</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Know Exactly What You're Looking At.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-normal">
            Every published trade setup comes with crystal-clear entry criteria, invalidation levels, and complete technical rationale.
          </p>
        </div>

        {/* Sample Card & Reasoning Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Trade Setup Card (Left 7 Cols) */}
          <div className="lg:col-span-7">
            <Card variant="dark" hoverEffect={false} className="h-full border-slate-700/80 bg-slate-900/90 shadow-2xl relative overflow-hidden">
              
              {/* Card Header Tag */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0052FF]/20 text-[#4D7CFF] flex items-center justify-center font-bold">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white font-mono">NIFTY 24,800 CE</h3>
                      <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-[#0052FF] text-white rounded-full">
                        CALL OPTION
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-400">WEEKLY EXPIRY RESEARCH SETUP</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  WAITING FOR CONFIRMATION
                </span>
              </div>

              {/* Trade Parameter Grid */}
              <div className="py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-slate-800">
                <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50">
                  <p className="text-[11px] font-mono text-slate-400 uppercase">Entry Zone</p>
                  <p className="text-lg font-mono font-bold text-white mt-1">₹145 – ₹155</p>
                </div>
                <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50">
                  <p className="text-[11px] font-mono text-slate-400 uppercase">Trigger Level</p>
                  <p className="text-sm font-mono font-semibold text-emerald-400 mt-1">NIFTY &gt; 24,780</p>
                </div>
                <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50">
                  <p className="text-[11px] font-mono text-slate-400 uppercase">Stop Loss</p>
                  <p className="text-lg font-mono font-bold text-rose-400 mt-1">₹110</p>
                </div>
                <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50">
                  <p className="text-[11px] font-mono text-slate-400 uppercase">Targets</p>
                  <p className="text-sm font-mono font-bold text-emerald-400 mt-1">T1: ₹185 | T2: ₹220</p>
                </div>
              </div>

              {/* Target & Risk Gauge */}
              <div className="pt-6 space-y-3">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Risk: ₹35 (-24%)</span>
                  <span>Reward: ₹75 (+51%)</span>
                  <span className="text-[#4D7CFF] font-bold">R:R Ratio = 1:2.14</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                  <div className="w-[28%] bg-rose-500/80 h-full" />
                  <div className="w-[72%] bg-gradient-to-r from-[#0052FF] to-emerald-400 h-full" />
                </div>
              </div>

              {/* Demo Notice Disclaimer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5" /> SAMPLE / DEMO DATA ONLY
                </span>
                <span>NOT A LIVE RECOMMENDATION</span>
              </div>
            </Card>
          </div>

          {/* Trade Rationale Column (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <Card variant="dark" hoverEffect={false} className="h-full border-slate-700/80 bg-slate-900/60 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6 text-[#4D7CFF]">
                  <FileText className="w-5 h-5" />
                  <h3 className="font-mono text-sm font-bold tracking-wider uppercase text-white">
                    WHY THIS SETUP?
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                    <CheckCircle2 className="w-5 h-5 text-[#4D7CFF] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Price Structure</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        NIFTY 50 formed a higher-low consolidation above 24,750 on the 15-min timeframe.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                    <CheckCircle2 className="w-5 h-5 text-[#4D7CFF] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Momentum & RSI</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Bullish divergence observed on RSI with expanding volume on upward impulses.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                    <CheckCircle2 className="w-5 h-5 text-[#4D7CFF] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Options Positioning (OI)</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Significant Put writing seen at 24,700 strike providing strong derivative support.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                    <CheckCircle2 className="w-5 h-5 text-[#4D7CFF] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Key Level Confirmation</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Trigger valid only if 15-min candle closes firmly above 24,780 resistance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Note */}
              <p className="text-xs text-slate-500 font-mono mt-6 pt-4 border-t border-slate-800">
                * Note: Every setup includes full technical write-ups so you understand the structural reason behind every trade.
              </p>
            </Card>
          </div>

        </div>
      </Container>
    </section>
  );
};
