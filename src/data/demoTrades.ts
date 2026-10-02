export type TradeStatusType =
  | 'WAITING'
  | 'ENTRY TRIGGERED'
  | 'ACTIVE'
  | 'TARGET 1 HIT'
  | 'TARGET 2 HIT'
  | 'TARGET 3 HIT'
  | 'STOP LOSS HIT'
  | 'CLOSED'
  | 'NO TRADE';

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
}

export interface ResearchFactor {
  label: string;
  value: string;
  status: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
}

export interface TradeSetup {
  id: string;
  index: 'NIFTY 50' | 'BANK NIFTY' | 'SENSEX';
  instrument: string;
  optionType: 'CALL OPTION' | 'PUT OPTION' | 'INTRADAY FUTURE';
  direction: 'BUY' | 'SELL';
  status: TradeStatusType;
  date: string;
  publishedTime: string;
  entryZone: string;
  triggerCondition: string;
  stopLoss: string;
  target1: string;
  target2: string;
  target3: string;
  riskReward: string;
  riskPoints: string;
  rewardPoints: string;
  entryRule: string;
  exitRule: string;
  researchSummary: string;
  isActivePrimary?: boolean;
  researchFactors: ResearchFactor[];
  timeline: TimelineEvent[];
  exitPrice?: string;
  pnlPoints?: string;
  resultStatus?: 'WIN' | 'LOSS' | 'OPEN';
}

export const demoTrades: TradeSetup[] = [
  {
    id: 'trade-nifty-24800ce',
    index: 'NIFTY 50',
    instrument: 'NIFTY 24,800 CE',
    optionType: 'CALL OPTION',
    direction: 'BUY',
    status: 'WAITING',
    date: '02 Oct 2026',
    publishedTime: '09:15 AM IST',
    entryZone: '₹145 – ₹155',
    triggerCondition: 'NIFTY spot sustains above 24,780 for 15-min candle',
    stopLoss: '₹110',
    target1: '₹185',
    target2: '₹220',
    target3: '₹250',
    riskReward: '1:2.14',
    riskPoints: '₹35 (-24%)',
    rewardPoints: '₹75 (+51%)',
    entryRule: 'Enter only if NIFTY spot sustains above 24,780 on 15-minute candle close.',
    exitRule: 'Book 50% profit at Target 1 (₹185) and trail stop loss to cost ₹145.',
    researchSummary:
      'NIFTY is showing a bullish structure after moving above the defined resistance zone at 24,750. Momentum and volume support the move, while option open interest positioning shows heavy Put writing at 24,700 strike providing robust support.',
    isActivePrimary: true,
    researchFactors: [
      { label: 'TREND', value: 'Bullish Continuation', status: 'POSITIVE' },
      { label: 'MOMENTUM', value: 'Positive RSI Divergence', status: 'POSITIVE' },
      { label: 'PRICE ACTION', value: '15-min Resistance Breakout', status: 'POSITIVE' },
      { label: 'OPTIONS POSITIONING', value: 'Put Writing at 24,700 PE', status: 'POSITIVE' },
      { label: 'VOLUME', value: 'Above 20-day Average', status: 'POSITIVE' },
      { label: 'MARKET BREADTH', value: '38/50 Stocks Advancing', status: 'POSITIVE' },
    ],
    timeline: [
      { time: '09:15 AM', title: 'Setup Published', description: 'Pre-market research setup created with defined triggers.' },
      { time: '09:30 AM', title: 'Waiting for Trigger', description: 'NIFTY spot trading at 24,765. Trigger pending at 24,780.' },
      { time: '10:05 AM', title: 'Approaching Entry', description: 'Buying volume expanding near 24,775 level.' },
    ],
    resultStatus: 'OPEN',
  },
  {
    id: 'trade-banknifty-52500pe',
    index: 'BANK NIFTY',
    instrument: 'BANKNIFTY 52,500 PE',
    optionType: 'PUT OPTION',
    direction: 'BUY',
    status: 'TARGET 1 HIT',
    date: '02 Oct 2026',
    publishedTime: '09:20 AM IST',
    entryZone: '₹320 – ₹335',
    triggerCondition: 'BANK NIFTY breaks below 52,380',
    stopLoss: '₹260',
    target1: '₹410',
    target2: '₹480',
    target3: '₹550',
    riskReward: '1:2.40',
    riskPoints: '₹60 (-18%)',
    rewardPoints: '₹145 (+44%)',
    entryRule: 'Triggered when banking heavyweights faced rejection near 52,600 resistance.',
    exitRule: 'Target 1 hit at ₹410. Trail stop loss to ₹340.',
    researchSummary:
      'Intraday rejection at 52,600 supply zone with call writing acceleration at 52,500 strike.',
    isActivePrimary: false,
    researchFactors: [
      { label: 'TREND', value: 'Intraday Neutral-to-Bearish', status: 'NEUTRAL' },
      { label: 'MOMENTUM', value: 'Fading at Resistance', status: 'NEGATIVE' },
      { label: 'PRICE ACTION', value: 'Double Top Rejection', status: 'NEGATIVE' },
      { label: 'OPTIONS POSITIONING', value: 'Call Writing at 52,500 CE', status: 'POSITIVE' },
    ],
    timeline: [
      { time: '09:20 AM', title: 'Setup Published', description: 'Resistance breakdown setup posted.' },
      { time: '09:45 AM', title: 'Entry Triggered', description: 'BANK NIFTY broke below 52,380. Filled at ₹328.' },
      { time: '10:50 AM', title: 'Target 1 Reached', description: 'Option premium reached ₹412 (+84 pts).' },
    ],
    exitPrice: '₹412',
    pnlPoints: '+84 pts',
    resultStatus: 'WIN',
  },
  {
    id: 'trade-sensex-81200ce',
    index: 'SENSEX',
    instrument: 'SENSEX 81,200 CE',
    optionType: 'CALL OPTION',
    direction: 'BUY',
    status: 'CLOSED',
    date: '01 Oct 2026',
    publishedTime: '09:30 AM IST',
    entryZone: '₹280 – ₹295',
    triggerCondition: 'SENSEX above 81,050',
    stopLoss: '₹210',
    target1: '₹380',
    target2: '₹450',
    target3: '₹520',
    riskReward: '1:2.10',
    riskPoints: '₹70 (-24%)',
    rewardPoints: '₹155 (+53%)',
    entryRule: 'Bought on pullback to 20-EMA support.',
    exitRule: 'Trade closed at Target 2 (₹455).',
    researchSummary: 'Strong institutional buying in IT & Reliance driven indices.',
    isActivePrimary: false,
    researchFactors: [
      { label: 'TREND', value: 'Uptrend', status: 'POSITIVE' },
      { label: 'MOMENTUM', value: 'Strong', status: 'POSITIVE' },
    ],
    timeline: [
      { time: '09:30 AM', title: 'Setup Published', description: 'SENSEX pullback setup published.' },
      { time: '10:10 AM', title: 'Entry Triggered', description: 'Filled at ₹288.' },
      { time: '01:15 PM', title: 'Target 2 Achieved', description: 'Position closed at ₹455.' },
    ],
    exitPrice: '₹455',
    pnlPoints: '+167 pts',
    resultStatus: 'WIN',
  },
  {
    id: 'trade-nifty-24650pe',
    index: 'NIFTY 50',
    instrument: 'NIFTY 24,650 PE',
    optionType: 'PUT OPTION',
    direction: 'BUY',
    status: 'STOP LOSS HIT',
    date: '30 Sep 2026',
    publishedTime: '10:00 AM IST',
    entryZone: '₹120 – ₹130',
    triggerCondition: 'NIFTY below 24,680',
    stopLoss: '₹90',
    target1: '₹165',
    target2: '₹200',
    target3: '₹240',
    riskReward: '1:2.30',
    riskPoints: '₹30 (-25%)',
    rewardPoints: '₹70 (+58%)',
    entryRule: 'Breakdown setup below intraday support.',
    exitRule: 'Stop loss triggered at ₹90.',
    researchSummary: 'Breakdown failed due to sharp V-shaped recovery in midcaps.',
    isActivePrimary: false,
    researchFactors: [
      { label: 'TREND', value: 'Fakeout Breakdown', status: 'NEGATIVE' },
    ],
    timeline: [
      { time: '10:00 AM', title: 'Setup Published', description: 'Short trade published.' },
      { time: '10:30 AM', title: 'Entry Triggered', description: 'Filled at ₹124.' },
      { time: '11:15 AM', title: 'Stop Loss Hit', description: 'Invalidation level touched at ₹90. Trade closed with disciplined loss.' },
    ],
    exitPrice: '₹90',
    pnlPoints: '-34 pts',
    resultStatus: 'LOSS',
  }
];
