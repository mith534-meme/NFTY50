import React from 'react';
import { Container } from '../ui/Container';
import { TrendingUp } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] pt-16 pb-12 text-[#0F172A]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E2E8F0]">
          
          {/* Brand Column (4 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-2.5 inline-block">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] flex items-center justify-center text-white font-bold shadow-md shadow-[#0052FF]/20">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
                NIFTY<span className="text-[#0052FF]">PULSE</span>
              </span>
            </a>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-sm font-sans">
              Structured daily F&O market research and trade setups for NIFTY 50, BANK NIFTY, and SENSEX with defined risk parameters.
            </p>
            <p className="text-xs font-mono text-[#64748B]">
              © {new Date().getFullYear()} NIFTY PULSE. All rights reserved.
            </p>
          </div>

          {/* Navigation Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-sm text-[#64748B]">
              <li>
                <a href="#how-it-works" className="hover:text-[#0052FF] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#0052FF] transition-colors">
                  Why Us
                </a>
              </li>
              <li>
                <a href="#sample-trade" className="hover:text-[#0052FF] transition-colors">
                  Sample Trade
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#0052FF] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#0052FF] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Links (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              LEGAL & DISCLOSURES
            </h4>
            <ul className="space-y-2.5 text-sm text-[#64748B]">
              <li>
                <a href="#terms" className="hover:text-[#0052FF] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#0052FF] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#risk-disclosure" className="hover:text-[#0052FF] transition-colors">
                  Risk Disclosure Document
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="hover:text-[#0052FF] transition-colors">
                  Research Disclaimer
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Mandatory Financial Regulatory & Risk Warning */}
        <div className="pt-8 text-xs text-[#64748B] font-mono leading-relaxed space-y-3">
          <p>
            <strong className="text-[#0F172A] font-semibold">Important Risk Notice:</strong> Trading in securities, futures, and options involves substantial risk of loss and is not suitable for every investor. Past research performance does not guarantee or indicate future results.
          </p>
          <p>
            NIFTY PULSE provides market research and educational trade setups for informational purposes only. We do not provide personalized financial advisory or guaranteed returns.
          </p>
        </div>
      </Container>
    </footer>
  );
};
