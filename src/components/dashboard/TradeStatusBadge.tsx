import React from 'react';
import type { TradeStatusType } from '../../data/demoTrades';
import { Clock, Zap, Target, AlertOctagon, CheckCircle } from 'lucide-react';

interface TradeStatusBadgeProps {
  status: TradeStatusType;
  className?: string;
}

export const TradeStatusBadge: React.FC<TradeStatusBadgeProps> = ({ status, className = '' }) => {
  const configs: Record<
    TradeStatusType,
    { label: string; bg: string; text: string; border: string; icon: React.FC<{ className?: string }> }
  > = {
    WAITING: {
      label: 'WAITING FOR ENTRY',
      bg: 'bg-amber-500/10',
      text: 'text-amber-700',
      border: 'border-amber-500/30',
      icon: Clock,
    },
    'ENTRY TRIGGERED': {
      label: 'ENTRY TRIGGERED',
      bg: 'bg-[#0052FF]/10',
      text: 'text-[#0052FF]',
      border: 'border-[#0052FF]/30',
      icon: Zap,
    },
    ACTIVE: {
      label: 'TRADE ACTIVE',
      bg: 'bg-[#0052FF]/10',
      text: 'text-[#0052FF]',
      border: 'border-[#0052FF]/30',
      icon: Zap,
    },
    'TARGET 1 HIT': {
      label: 'TARGET 1 HIT 🎯',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-700',
      border: 'border-emerald-500/30',
      icon: Target,
    },
    'TARGET 2 HIT': {
      label: 'TARGET 2 HIT 🎯',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-700',
      border: 'border-emerald-500/30',
      icon: Target,
    },
    'TARGET 3 HIT': {
      label: 'TARGET 3 HIT 🎯',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-700',
      border: 'border-emerald-500/30',
      icon: Target,
    },
    'STOP LOSS HIT': {
      label: 'STOP LOSS HIT 🔴',
      bg: 'bg-rose-500/10',
      text: 'text-rose-700',
      border: 'border-rose-500/30',
      icon: AlertOctagon,
    },
    CLOSED: {
      label: 'TRADE CLOSED',
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-200',
      icon: CheckCircle,
    },
    'NO TRADE': {
      label: 'NO ACTIVE SETUP',
      bg: 'bg-slate-100',
      text: 'text-slate-600',
      border: 'border-slate-200',
      icon: Clock,
    },
  };

  const config = configs[status] || configs.WAITING;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border uppercase ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </span>
  );
};
