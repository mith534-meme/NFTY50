import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sparkles, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SubscriptionCard: React.FC = () => {
  const { userProfile } = useAuth();
  const subStatus = userProfile?.subscription_status || 'NOT_ACTIVE';

  const features = [
    'NIFTY 50 Daily Research',
    'BANK NIFTY Intraday Setups',
    'SENSEX Market Coverage',
    'Defined Entry, SL & Targets',
    'Real-time Level Updates',
  ];

  return (
    <Card variant="light" hoverEffect={false} className="p-6 border border-[#E2E8F0]">
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#0052FF] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>YOUR SUBSCRIPTION PLAN</span>
          </div>
          <h3 className="font-mono text-2xl font-bold text-[#0F172A]">PRO PLAN</h3>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-mono font-bold border uppercase ${
            subStatus === 'ACTIVE'
              ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-700 border-amber-500/30'
          }`}
        >
          {subStatus}
        </span>
      </div>

      <div className="space-y-2.5 mb-6">
        <p className="text-xs font-mono font-bold text-[#0F172A] uppercase">INCLUDED FEATURES:</p>
        {features.map((feat, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs font-sans text-[#64748B]">
            <Check className="w-3.5 h-3.5 text-[#0052FF] shrink-0" />
            <span>{feat}</span>
          </div>
        ))}
      </div>

      <Button href="/dashboard/subscription" variant="secondary" size="md" className="w-full justify-center text-xs">
        MANAGE SUBSCRIPTION
      </Button>
    </Card>
  );
};
