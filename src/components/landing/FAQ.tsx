import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { SectionLabel } from '../ui/SectionLabel';
import { ChevronDown, AlertCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What markets do you cover?',
      answer:
        'We focus specifically on the Indian equity index F&O (Futures & Options) markets: NIFTY 50, BANK NIFTY, and SENSEX. Every setup is tailored to daily intraday and weekly option structures.',
    },
    {
      question: 'What information is included in each trade setup?',
      answer:
        'Each published setup includes the specific instrument (e.g., NIFTY 24800 CE), precise entry zone, trigger condition, strict stop-loss price, Target 1, Target 2, risk-reward ratio, and a detailed technical rationale explaining why the trade was formed.',
    },
    {
      question: 'Do you provide entry and exit levels?',
      answer:
        'Yes! We provide exact numerical entry zones, stop-loss invalidation prices, and multi-tier profit target levels before the trade is triggered.',
    },
    {
      question: 'How are trade updates delivered?',
      answer:
        'Trade updates are published immediately to the web app dashboard and sent via instant notification alerts whenever a trade reaches entry, achieves target, or requires trailing stop adjustments.',
    },
    {
      question: 'Can I see previous trade history?',
      answer:
        'Absolutely. We maintain a complete, transparent audit log of all past setups — including winning and losing trades — with full entry, target, and stop-loss timestamps.',
    },
    {
      question: 'Is this suitable for beginners?',
      answer:
        'While our research is presented with maximum clarity, F&O trading carries inherent market risk. We provide full trade rationale to help you learn structural analysis, but we strongly advise understanding basic options risk before trading real capital.',
    },
    {
      question: 'What happens when there is no valid setup?',
      answer:
        'Quality over frequency is our core principle. If the market is choppy or lacks a high-probability risk-reward setup, we explicitly post "No Valid Setup Today" to protect your capital.',
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 lg:py-40 bg-[#FAFAFA] border-t border-[#E2E8F0]">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <SectionLabel>FREQUENTLY ASKED QUESTIONS</SectionLabel>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] font-normal">
            Everything you need to know about our research methodology and subscription model.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all shadow-sm hover:border-[#0052FF]/30"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-semibold text-[#0F172A] text-base sm:text-lg focus-ring min-h-[44px]"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0052FF] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-sm sm:text-base text-[#64748B] leading-relaxed border-t border-slate-100 font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mandatory Risk Disclaimer Statement */}
        <div className="max-w-3xl mx-auto mt-12 p-4 sm:p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-800 text-xs font-mono leading-relaxed flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Risk Disclaimer:</strong> Trading in securities and F&O derivatives involves substantial financial risk. Past research performance does not guarantee future results. All trade setups are for educational and research purposes only.
          </div>
        </div>
      </Container>
    </section>
  );
};
