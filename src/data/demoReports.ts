export interface MarketReport {
  id: string;
  date: string;
  title: string;
  summary: string;
  niftyStructure: string;
  bankNiftyStructure: string;
  sensexStructure: string;
  importantEvents: string[];
  isDemo: boolean;
}

export const demoReports: MarketReport[] = [
  {
    id: 'report-2026-10-02',
    date: '02 October 2026',
    title: 'Daily Market Research & F&O Structural Blueprint',
    summary:
      'NIFTY 50 holds above 24,700 key pivot with expanding Put open interest. Banking index consolidates ahead of RBI policy commentary.',
    niftyStructure:
      'NIFTY 50 is forming a higher-high consolidation pattern above 24,700. Maximum Call open interest stands at 25,000 while Put writers are aggressively building positions at 24,700.',
    bankNiftyStructure:
      'BANK NIFTY is range-bound between 52,100 support and 52,700 resistance. A clean 15-minute breakout above 52,700 will trigger momentum towards 53,100.',
    sensexStructure:
      'SENSEX is testing key 20-DMA support at 80,800. Sustaining above 81,000 indicates constructive structural strength.',
    importantEvents: [
      'RBI Monetary Policy Committee commentary scheduled for 10:00 AM IST.',
      'US Non-Farm Payroll data expected evening 06:00 PM IST.',
      'Weekly Index Options Expiry positioning adjustments.',
    ],
    isDemo: true,
  },
  {
    id: 'report-2026-10-01',
    date: '01 October 2026',
    title: 'Pre-Market Derivatives & Institutional Positioning Review',
    summary:
      'FII inflows continue in frontline IT & Private Banking stocks. Options PCR ratio rises to 1.15 indicating supportive sentiment.',
    niftyStructure:
      'NIFTY 50 successfully defended the 24,550 demand zone. Short-covering rally triggered a 180-point upmove.',
    bankNiftyStructure:
      'Private banks led the recovery with HDFC Bank and ICICI Bank showing strong delivery volumes.',
    sensexStructure:
      'SENSEX closed +420 points higher driven by Reliance Industries and Infosys momentum.',
    importantEvents: [
      'Auto monthly sales numbers announcement.',
      'FII / DII net institutional flow report.',
    ],
    isDemo: true,
  },
  {
    id: 'report-2026-09-30',
    date: '30 September 2026',
    title: 'Monthly Expiry Recap & Options Volatility Analysis',
    summary:
      'High volatility observed across indices on monthly contract settlement. Support established at lower strike clusters.',
    niftyStructure:
      'NIFTY 50 closed the monthly series with a net gain of +2.4%. Volatility index VIX cooled down by 4.2%.',
    bankNiftyStructure:
      'BANK NIFTY outperformed broader markets with heavy short-covering above 52,000.',
    sensexStructure:
      'SENSEX maintained a bullish bias closing near all-time high zone.',
    importantEvents: ['Monthly F&O expiry rollover report.'],
    isDemo: true,
  },
];
