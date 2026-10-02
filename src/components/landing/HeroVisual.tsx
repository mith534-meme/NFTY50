import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Activity, CheckCircle2, TrendingUp } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none flex items-center justify-center p-2 sm:p-4">
      {/* Decorative Outer Ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full border border-dashed border-[#0052FF]/20 animate-rotate-slow" />
      </div>

      {/* Blue Radial Backdrop Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#0052FF]/15 to-[#4D7CFF]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Composition Container */}
      <div className="relative w-full z-10">
        
        {/* Central Primary Research Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/95 backdrop-blur-xl border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-[0_16px_40px_-8px_rgba(15,23,42,0.08),0_4px_12px_rgba(0,82,255,0.06)] hover:border-[#0052FF]/30 transition-all"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#0F172A] text-lg">NIFTY 50</h3>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-[#0052FF]/10 text-[#0052FF] rounded-full border border-[#0052FF]/20">
                    SAMPLE DATA
                  </span>
                </div>
                <p className="text-xs font-mono text-[#64748B]">INDEX F&O RESEARCH</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                BULLISH BIAS
              </span>
            </div>
          </div>

          {/* Price & Level Metrics */}
          <div className="py-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-mono text-[#64748B] uppercase tracking-wider">Spot Level</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[#0F172A]">
                  24,785.40
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-0.5" /> +0.82%
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-[#64748B] uppercase tracking-wider">Setup Trigger Zone</p>
              <p className="text-sm font-mono font-semibold text-[#0F172A] mt-1 bg-slate-50 p-2 rounded-lg border border-[#E2E8F0]">
                24,750 – 24,780
              </p>
            </div>
          </div>

          {/* Mini Chart / Level Visual */}
          <div className="pt-2 pb-1">
            <div className="flex justify-between text-[11px] font-mono text-[#64748B] mb-1.5">
              <span>Stop Loss: 24,710</span>
              <span className="text-[#0052FF] font-semibold">Target 1: 24,850</span>
              <span>Target 2: 24,920</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
              <div className="w-[30%] bg-rose-400 h-full opacity-60" />
              <div className="w-[45%] bg-[#0052FF] h-full" />
              <div className="w-[25%] bg-emerald-500 h-full" />
            </div>
          </div>

          {/* Footer Status Strip */}
          <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0052FF]" />
              Risk Defined: 1:2.4 RR
            </span>
            <span className="text-[#0F172A] font-medium">Updated 09:20 AM IST</span>
          </div>
        </motion.div>

        {/* Floating Accent Card 1: Entry Confirmed (Top Right) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute -top-6 -right-2 sm:-right-6 bg-white border border-[#E2E8F0] rounded-xl p-3 sm:p-3.5 shadow-lg shadow-black/5 flex items-center gap-2.5 animate-float-slow z-20"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-mono text-[#64748B] uppercase">Breakout Signal</p>
            <p className="text-xs font-bold text-[#0F172A]">ENTRY CONFIRMED</p>
          </div>
        </motion.div>

        {/* Floating Accent Card 2: Risk Defined (Bottom Left) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute -bottom-6 -left-2 sm:-left-6 bg-white border border-[#E2E8F0] rounded-xl p-3 sm:p-3.5 shadow-lg shadow-black/5 flex items-center gap-2.5 animate-float-slow z-20 [animation-delay:2s]"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-mono text-[#64748B] uppercase">Strict Protection</p>
            <p className="text-xs font-bold text-[#0F172A]">RISK: DEFINED</p>
          </div>
        </motion.div>

        {/* Floating Accent Card 3: Target 1 Hit (Bottom Right) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden sm:flex absolute -bottom-10 right-8 bg-[#0F172A] text-white border border-slate-700/80 rounded-xl p-3 shadow-xl items-center gap-2.5 z-20"
        >
          <div className="w-7 h-7 rounded-lg bg-[#0052FF] text-white flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[9px] font-mono text-slate-400 uppercase">Outcome Status</p>
            <p className="text-xs font-mono font-bold text-emerald-400">TARGET 1 HIT (+40 PTS)</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
