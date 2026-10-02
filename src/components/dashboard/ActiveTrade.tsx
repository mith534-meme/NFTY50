import React from 'react';
import { Link } from 'react-router-dom';
import type { TradeSetup } from '../../data/demoTrades';
import { TradeStatusBadge } from './TradeStatusBadge';
import { SectionLabel } from '../ui/SectionLabel';
import { Card } from '../ui/Card';
import {
  ArrowUpRight,
  ShieldAlert,
  Target,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ActiveTradeProps {
  trade: TradeSetup;
}

export const ActiveTrade: React.FC<ActiveTradeProps> = ({ trade }) => {
  return (
    <Card
      variant="light"
      hoverEffect={false}
      className="border-2 border-[#0052FF]/30 shadow-xl shadow-[#0052FF]/5 relative overflow-hidden p-6 sm:p-8"
    >
      {/* Top Banner & Instrument Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <SectionLabel>PRIMARY ACTIVE SETUP</SectionLabel>
            <span className="text-[10px] font-mono bg-amber-500/10 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-500/20">
              DEMO DATA
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white flex items-center justify-center font-bold">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-2xl font-bold text-[#0F172A]">
                  {trade.instrument}
                </h3>
                <span className="px-2.5 py-0.5 text-[11px] font-mono font-bold bg-[#0052FF] text-white rounded-full">
                  {trade.optionType}
                </span>
              </div>
              <p className="text-xs font-mono text-[#64748B]">
                {trade.index} • Published at {trade.publishedTime}
              </p>
              <p className="text-[11px] font-mono text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block mt-1">
                Research setup — not a guarantee of outcome.
              </p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="shrink-0">
          <TradeStatusBadge status={trade.status} className="text-xs" />
        </div>
      </div>

      {/* Primary Metrics Grid (Entry, Trigger, Stop Loss, Targets) */}
      <div className="py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-[#E2E8F0]">
        <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#E2E8F0]">
          <p className="text-[11px] font-mono text-[#64748B] uppercase font-bold">Entry Zone</p>
          <p className="text-xl font-mono font-bold text-[#0F172A] mt-1">{trade.entryZone}</p>
        </div>

        <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#E2E8F0]">
          <p className="text-[11px] font-mono text-[#64748B] uppercase font-bold">Buy Trigger</p>
          <p className="text-xs font-mono font-semibold text-[#0052FF] mt-1 bg-[#0052FF]/5 p-2 rounded-lg border border-[#0052FF]/15">
            {trade.triggerCondition}
          </p>
        </div>

        <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200">
          <p className="text-[11px] font-mono text-rose-700 uppercase font-bold flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" /> Stop Loss
          </p>
          <p className="text-xl font-mono font-bold text-rose-600 mt-1">{trade.stopLoss}</p>
        </div>

        <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
          <p className="text-[11px] font-mono text-emerald-700 uppercase font-bold flex items-center gap-1">
            <Target className="w-3.5 h-3.5" /> Targets (T1/T2/T3)
          </p>
          <p className="text-sm font-mono font-bold text-emerald-700 mt-1">
            T1: {trade.target1} | T2: {trade.target2} | T3: {trade.target3}
          </p>
        </div>
      </div>

      {/* Risk / Reward Visual Bar */}
      <div className="py-5 border-b border-[#E2E8F0]">
        <div className="flex justify-between text-xs font-mono text-[#64748B] mb-2">
          <span>Risk: {trade.riskPoints}</span>
          <span className="text-[#0052FF] font-bold">R:R Ratio = {trade.riskReward}</span>
          <span>Reward: {trade.rewardPoints}</span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
          <div className="w-[28%] bg-rose-400 h-full" />
          <div className="w-[72%] bg-gradient-to-r from-[#0052FF] to-emerald-500 h-full" />
        </div>
        <div className="flex justify-between text-[11px] font-mono text-[#64748B] mt-1.5">
          <span className="text-rose-600 font-semibold">STOP LOSS ({trade.stopLoss})</span>
          <span className="text-[#0F172A] font-semibold">ENTRY ({trade.entryZone})</span>
          <span className="text-emerald-600 font-semibold">TARGET 3 ({trade.target3})</span>
        </div>
      </div>

      {/* Rules Section: WHEN TO BUY & WHEN TO EXIT */}
      <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-[#E2E8F0]">
        {/* WHEN TO BUY (Blue Highlighted Card) */}
        <div className="bg-[#0052FF]/5 border border-[#0052FF]/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2 text-[#0052FF]">
            <Sparkles className="w-4 h-4" />
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider">WHEN TO BUY</h4>
          </div>
          <p className="text-sm font-medium text-[#0F172A] leading-relaxed">
            {trade.entryRule}
          </p>
          <p className="text-[11px] font-mono text-[#64748B] mt-2 italic">
            * Setup activates only after the trigger condition is met.
          </p>
        </div>

        {/* WHEN TO EXIT */}
        <div className="bg-slate-50 border border-[#E2E8F0] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2 text-[#0F172A]">
            <Target className="w-4 h-4 text-[#0052FF]" />
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider">WHEN TO EXIT</h4>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono mb-2">
            <div className="bg-white p-2 rounded-lg border border-[#E2E8F0]">
              <span className="text-[10px] text-[#64748B] block">T1</span>
              <strong className="text-emerald-600">{trade.target1}</strong>
            </div>
            <div className="bg-white p-2 rounded-lg border border-[#E2E8F0]">
              <span className="text-[10px] text-[#64748B] block">T2</span>
              <strong className="text-emerald-600">{trade.target2}</strong>
            </div>
            <div className="bg-white p-2 rounded-lg border border-[#E2E8F0]">
              <span className="text-[10px] text-[#64748B] block">SL</span>
              <strong className="text-rose-600">{trade.stopLoss}</strong>
            </div>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed font-sans">{trade.exitRule}</p>
        </div>
      </div>

      {/* WHY THIS SETUP? (Structured Research Factors) */}
      <div className="py-6 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#0052FF]" />
            <h4 className="font-mono text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              WHY THIS SETUP? (STRUCTURED RESEARCH)
            </h4>
          </div>
          <span className="text-[10px] font-mono bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded">
            SAMPLE RESEARCH
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {trade.researchFactors.map((factor, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E2E8F0]">
              <p className="text-[10px] font-mono text-[#64748B] uppercase font-bold">
                {factor.label}
              </p>
              <p className="text-xs font-semibold text-[#0F172A] mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0052FF] shrink-0" />
                {factor.value}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#64748B] leading-relaxed font-sans bg-slate-50 p-3.5 rounded-xl border border-[#E2E8F0]">
          <strong className="text-[#0F172A] font-semibold">Research Summary: </strong>
          {trade.researchSummary}
        </p>
      </div>

      {/* Trade Action Timeline & View Full Details Link */}
      <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h5 className="font-mono text-xs font-bold text-[#0F172A] uppercase mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#0052FF]" /> TRADE TIMELINE LOG
          </h5>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#64748B]">
            {trade.timeline.map((evt, idx) => (
              <span key={idx} className="flex items-center gap-1">
                <strong className="text-[#0F172A] font-bold">{evt.time}:</strong> {evt.title}
                {idx < trade.timeline.length - 1 && <span className="ml-2 text-slate-300">→</span>}
              </span>
            ))}
          </div>
        </div>

        <Link
          to={`/dashboard/trades/${trade.id}`}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white text-xs font-mono font-bold shadow-md hover:brightness-105 transition-all shrink-0 min-h-[44px]"
        >
          VIEW FULL TRADE RESEARCH →
        </Link>
      </div>
    </Card>
  );
};
