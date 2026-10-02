export type IndexType = 'NIFTY 50' | 'BANK NIFTY' | 'SENSEX';
export type OptionType = 'CALL' | 'PUT' | 'CALL OPTION' | 'PUT OPTION' | 'INTRADAY FUTURE';
export type TradeDirection = 'BUY' | 'SELL';
export type MarketBias = 'BULLISH' | 'BEARISH' | 'NEUTRAL';
export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH';

export type TradeStatus =
  | 'DRAFT'
  | 'IN_REVIEW'
  | 'PUBLISHED'
  | 'WAITING'
  | 'ENTRY_TRIGGERED'
  | 'ACTIVE'
  | 'TARGET_1_HIT'
  | 'TARGET_2_HIT'
  | 'TARGET_3_HIT'
  | 'STOP_LOSS_HIT'
  | 'CLOSED'
  | 'NO_TRADE';

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
  instrument: string;
  index: IndexType;
  optionType: OptionType;
  strikePrice: string | number;
  direction: TradeDirection;

  entryMin: number | string;
  entryMax: number | string;
  entryZone?: string;

  triggerCondition: string;

  stopLoss: number | string;

  target1: number | string;
  target2: number | string;
  target3: number | string;

  whenToBuy: string;
  whenToExit: string;

  marketBias: MarketBias;
  riskLevel: RiskLevel;

  whyThisSetup: string;
  researchSummary: string;

  keySupportLevels: string[];
  keyResistanceLevels: string[];

  invalidationCondition: string;

  setupValidUntil: string;

  status: TradeStatus;

  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  closedAt?: string;

  // Attributes for UI backwards compatibility & details
  date?: string;
  publishedTime?: string;
  riskReward?: string;
  riskPoints?: string;
  rewardPoints?: string;
  entryRule?: string;
  exitRule?: string;
  isActivePrimary?: boolean;
  researchFactors?: ResearchFactor[];
  timeline?: TimelineEvent[];
  exitPrice?: string;
  pnlPoints?: string;
  resultStatus?: 'WIN' | 'LOSS' | 'OPEN';
}
