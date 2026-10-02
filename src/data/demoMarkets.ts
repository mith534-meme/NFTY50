export interface MarketIndexData {
  id: string;
  name: string;
  symbol: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  trend: 'BULLISH' | 'NEUTRAL' | 'BEARISH';
  support1: string;
  support2: string;
  resistance1: string;
  resistance2: string;
  chartPath: string;
}

export const demoMarkets: MarketIndexData[] = [
  {
    id: 'nifty50',
    name: 'NIFTY 50',
    symbol: 'NIFTY',
    value: '24,785.40',
    change: '+201.30',
    changePercent: '+0.82%',
    isPositive: true,
    trend: 'BULLISH',
    support1: '24,700',
    support2: '24,620',
    resistance1: '24,850',
    resistance2: '24,920',
    chartPath: 'M0 30 Q 40 25, 80 15 T 160 10 T 240 5',
  },
  {
    id: 'banknifty',
    name: 'BANK NIFTY',
    symbol: 'BANKNIFTY',
    value: '52,430.15',
    change: '+162.80',
    changePercent: '+0.31%',
    isPositive: true,
    trend: 'NEUTRAL',
    support1: '52,100',
    support2: '51,850',
    resistance1: '52,700',
    resistance2: '53,000',
    chartPath: 'M0 20 Q 40 30, 80 15 T 160 25 T 240 12',
  },
  {
    id: 'sensex',
    name: 'SENSEX',
    symbol: 'SENSEX',
    value: '81,150.90',
    change: '-145.20',
    changePercent: '-0.18%',
    isPositive: false,
    trend: 'BEARISH',
    support1: '80,800',
    support2: '80,450',
    resistance1: '81,500',
    resistance2: '81,850',
    chartPath: 'M0 10 Q 40 20, 80 25 T 160 30 T 240 35',
  },
];
