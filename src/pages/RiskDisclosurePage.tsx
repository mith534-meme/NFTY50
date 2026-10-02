import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { SectionLabel } from '../components/ui/SectionLabel';
import { TrendingUp, AlertCircle, ArrowLeft } from 'lucide-react';

export const RiskDisclosurePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col justify-between selection:bg-[#0052FF]/20 selection:text-[#0052FF]">
      {/* Header */}
      <header className="border-b border-[#E2E8F0] bg-white/80 backdrop-blur-md py-4 sticky top-0 z-50">
        <Container className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] flex items-center justify-center text-white font-bold shadow-md shadow-[#0052FF]/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
              NIFTY<span className="text-[#0052FF]">PULSE</span>
            </span>
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0052FF] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            BACK TO DASHBOARD
          </Link>
        </Container>
      </header>

      {/* Main Content Body */}
      <main className="py-12 sm:py-16">
        <Container>
          <div className="max-w-4xl mx-auto bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-12 shadow-sm space-y-8">
            {/* Page Header */}
            <div className="pb-6 border-b border-[#E2E8F0]">
              <SectionLabel className="mb-2">LEGAL & COMPLIANCE</SectionLabel>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A]">
                Product Risk Disclosure Document
              </h1>
              <p className="text-sm text-[#64748B] mt-2 font-sans leading-relaxed">
                Please read this document carefully before utilizing NIFTY PULSE market research, index trade setups, or analytical reports.
              </p>
            </div>

            {/* Warning Callout Box */}
            <div className="p-5 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A] text-xs font-mono leading-relaxed flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#0052FF] shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-[#0F172A] block mb-1">
                  CRITICAL FINANCIAL RISK WARNING
                </strong>
                Trading in equity securities, Futures & Options (F&O) derivatives, and leverage instruments involves substantial risk of loss and is not suitable for every investor. You may lose part or all of your invested capital rapidly due to market volatility.
              </div>
            </div>

            {/* Detailed Clauses */}
            <div className="space-y-6 text-sm text-[#64748B] font-sans leading-relaxed">
              <section className="space-y-2">
                <h3 className="font-bold text-[#0F172A] text-base font-display">
                  1. Educational & Market Research Nature
                </h3>
                <p>
                  All content, market analysis, index setups (NIFTY 50, BANK NIFTY, SENSEX), price triggers, stop-loss levels, and profit targets provided on NIFTY PULSE are strictly for educational and market research purposes. They do not constitute personalized investment advice, financial planning, or a guarantee of returns.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-[#0F172A] text-base font-display">
                  2. No Profit Guarantee or Sure-Shot Trade Claims
                </h3>
                <p>
                  NIFTY PULSE does not claim or guarantee "sure-shot" trades, "fixed returns", "100% accuracy", or "risk-free" operations. Option pricing is subject to rapid volatility, time decay (Theta), and unpredictable market events.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-[#0F172A] text-base font-display">
                  3. Historical Performance & Audit Log Disclaimer
                </h3>
                <p>
                  Historical win rates, setup statistics, and past trade history shown on the platform are presented for transparency and historical record-keeping. Past performance does not guarantee or indicate future performance.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-[#0F172A] text-base font-display">
                  4. Individual Risk Management Responsibility
                </h3>
                <p>
                  Subscribers are solely responsible for evaluating their financial condition, risk tolerance, and trading strategy before executing any trade. Always adhere to strict position sizing and stop-loss discipline.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-[#0F172A] text-base font-display">
                  5. Regulatory & Legal Notice
                </h3>
                <p>
                  This risk disclosure text represents product UX disclosures. Commercial deployment remains subject to formal legal review under applicable Indian securities regulations (SEBI).
                </p>
              </section>
            </div>

            {/* Back Button */}
            <div className="pt-6 border-t border-[#E2E8F0]">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white font-mono text-xs font-bold shadow-md hover:brightness-105 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                RETURN TO DASHBOARD
              </Link>
            </div>
          </div>
        </Container>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] py-6 text-center text-xs font-mono text-[#64748B]">
        <Container>© {new Date().getFullYear()} NIFTY PULSE. Official Product Risk Disclosure.</Container>
      </footer>
    </div>
  );
};
