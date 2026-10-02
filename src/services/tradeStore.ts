import type { TradeSetup, TradeStatus } from '../types/trade';
import { demoTrades } from '../data/demoTrades';

const LOCAL_STORAGE_KEY = 'nifty_pulse_trades';

// Transform initial demo trades to conform to TradeSetup interface
const initialTrades: TradeSetup[] = demoTrades.map((dt) => ({
  ...dt,
  strikePrice: dt.instrument.match(/\d+[\d,]*/)?.[0] || '24,800',
  entryMin: dt.entryZone.split('–')[0]?.replace(/[^\d.]/g, '') || '145',
  entryMax: dt.entryZone.split('–')[1]?.replace(/[^\d.]/g, '') || '155',
  stopLoss: dt.stopLoss.replace(/[^\d.]/g, '') || '110',
  target1: dt.target1.replace(/[^\d.]/g, '') || '185',
  target2: dt.target2.replace(/[^\d.]/g, '') || '220',
  target3: dt.target3.replace(/[^\d.]/g, '') || '250',
  whenToBuy: dt.entryRule || 'Enter only after trigger condition is met.',
  whenToExit: dt.exitRule || 'Exit on stop loss hit or target completion.',
  marketBias: dt.direction === 'BUY' ? 'BULLISH' : 'BEARISH',
  riskLevel: 'MODERATE',
  whyThisSetup: dt.researchSummary,
  keySupportLevels: ['24,650', '24,700'],
  keyResistanceLevels: ['24,800', '24,850'],
  invalidationCondition: 'Setup invalidates if spot closes below support level.',
  setupValidUntil: '2026-10-02T15:30:00Z',
  status: (dt.status.replace(/ /g, '_') as TradeStatus) || 'WAITING',
  createdBy: 'admin@niftypulse.com',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

class TradeStore {
  private trades: TradeSetup[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        this.trades = JSON.parse(saved);
      } else {
        this.trades = initialTrades;
        this.persist();
      }
    } catch (e) {
      console.error('Error loading trades from storage:', e);
      this.trades = initialTrades;
    }
  }

  private persist() {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.trades));
    } catch (e) {
      console.error('Error saving trades to storage:', e);
    }
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public getAllTrades(): TradeSetup[] {
    return [...this.trades];
  }

  public getPublishedTrades(): TradeSetup[] {
    // Normal users ONLY see published or active/closed trade statuses
    return this.trades.filter(
      (t) => t.status !== 'DRAFT' && t.status !== 'IN_REVIEW'
    );
  }

  public getTradeById(id: string): TradeSetup | undefined {
    return this.trades.find((t) => t.id === id);
  }

  public saveTrade(trade: TradeSetup): TradeSetup {
    const existingIndex = this.trades.findIndex((t) => t.id === trade.id);
    const updatedTrade = {
      ...trade,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      this.trades[existingIndex] = updatedTrade;
    } else {
      this.trades.unshift(updatedTrade);
    }

    this.persist();
    return updatedTrade;
  }

  public updateStatus(id: string, newStatus: TradeStatus): TradeSetup | undefined {
    const trade = this.getTradeById(id);
    if (!trade) return undefined;

    const patched: TradeSetup = {
      ...trade,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };

    if (newStatus === 'PUBLISHED' && !trade.publishedAt) {
      patched.publishedAt = new Date().toISOString();
    }
    if (newStatus === 'CLOSED' && !trade.closedAt) {
      patched.closedAt = new Date().toISOString();
    }

    return this.saveTrade(patched);
  }

  public deleteTrade(id: string) {
    this.trades = this.trades.filter((t) => t.id !== id);
    this.persist();
  }
}

export const tradeStore = new TradeStore();
