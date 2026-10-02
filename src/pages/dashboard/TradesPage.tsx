import React, { useState, useEffect } from 'react';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { TodaysTrades } from '../../components/dashboard/TodaysTrades';
import { tradeStore } from '../../services/tradeStore';
import type { TradeSetup } from '../../types/trade';

export const TradesPage: React.FC = () => {
  const [trades, setTrades] = useState<TradeSetup[]>(tradeStore.getPublishedTrades());

  useEffect(() => {
    setTrades(tradeStore.getPublishedTrades());
    const unsub = tradeStore.subscribe(() => {
      setTrades(tradeStore.getPublishedTrades());
    });
    return unsub;
  }, []);

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Today's F&O Trade Setups
          </h1>
          <p className="text-sm text-[#64748B] mt-1 font-sans">
            Structured intraday setups for NIFTY 50, BANK NIFTY, and SENSEX with defined risk parameters.
          </p>
        </div>

        <TodaysTrades trades={trades as any} />
      </div>
    </DashboardShell>
  );
};

