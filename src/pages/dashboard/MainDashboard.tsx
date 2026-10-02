import React, { useState, useEffect } from 'react';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { MarketOverview } from '../../components/dashboard/MarketOverview';
import { ActiveTrade } from '../../components/dashboard/ActiveTrade';
import { TodaysTrades } from '../../components/dashboard/TodaysTrades';
import { MarketAnalysis } from '../../components/dashboard/MarketAnalysis';
import { TradeHistoryPreview } from '../../components/dashboard/TradeHistoryPreview';
import { PerformanceSummary } from '../../components/dashboard/PerformanceSummary';
import { DailyReportCard } from '../../components/dashboard/DailyReportCard';
import { SubscriptionCard } from '../../components/dashboard/SubscriptionCard';

import { demoMarkets } from '../../data/demoMarkets';
import { demoReports } from '../../data/demoReports';
import { tradeStore } from '../../services/tradeStore';
import type { TradeSetup } from '../../types/trade';

export const MainDashboard: React.FC = () => {
  const [publishedTrades, setPublishedTrades] = useState<TradeSetup[]>(tradeStore.getPublishedTrades());

  useEffect(() => {
    setPublishedTrades(tradeStore.getPublishedTrades());
    const unsub = tradeStore.subscribe(() => {
      setPublishedTrades(tradeStore.getPublishedTrades());
    });
    return unsub;
  }, []);

  const primaryActiveTrade = publishedTrades.find((t) => t.isActivePrimary || t.status === 'ACTIVE' || t.status === 'WAITING') || publishedTrades[0];
  const todayReport = demoReports[0];

  return (
    <DashboardShell>
      {/* 1. Market Overview Row */}
      <MarketOverview markets={demoMarkets} />

      {/* 2. Primary Active Trade Card */}
      {primaryActiveTrade && (
        <section>
          <ActiveTrade trade={primaryActiveTrade as any} />
        </section>
      )}

      {/* 3. Today's Trades Setups Grid */}
      <TodaysTrades trades={publishedTrades as any} />

      {/* 4. Market Analysis & Key Levels */}
      <MarketAnalysis markets={demoMarkets} />

      {/* 5. Recent Trade History Table */}
      <TradeHistoryPreview trades={publishedTrades as any} />

      {/* 6. Performance Summary & Daily Report */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <PerformanceSummary />
          <DailyReportCard report={todayReport} />
        </div>

        <div className="lg:col-span-4">
          <SubscriptionCard />
        </div>
      </div>

      {/* 7. Section A Dashboard Risk Disclosure Banner */}
      <section className="p-4 sm:p-5 rounded-2xl bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-mono text-[#64748B] leading-relaxed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p>
          <strong className="text-[#0F172A] font-semibold">Risk Disclosure: </strong>
          Trading in securities and derivatives, including futures and options, involves substantial risk and may result in significant loss of capital. Market research and trade setups provided through this platform do not guarantee profits or future performance. Please make trading decisions based on your own assessment and risk tolerance.
        </p>
        <a
          href="/risk-disclosure"
          className="text-[#0052FF] font-bold hover:underline shrink-0 text-xs font-mono"
        >
          Read Full Risk Disclosure →
        </a>
      </section>
    </DashboardShell>
  );
};
