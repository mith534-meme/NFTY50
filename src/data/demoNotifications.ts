export interface NotificationItem {
  id: string;
  type: 'SETUP' | 'TRIGGER' | 'TARGET' | 'STOP_LOSS' | 'REPORT';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export const demoNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'SETUP',
    title: 'New Trade Setup Published',
    message: 'NIFTY 24,800 CE research setup published with defined entry zone ₹145–₹155.',
    timestamp: '09:15 AM IST',
    isRead: false,
    link: '/dashboard/trades/trade-nifty-24800ce',
  },
  {
    id: 'notif-2',
    type: 'TARGET',
    title: 'Target 1 Achieved 🎯',
    message: 'BANKNIFTY 52,500 PE reached Target 1 at ₹410 (+84 pts). Trail stop loss to ₹340.',
    timestamp: '10:50 AM IST',
    isRead: false,
    link: '/dashboard/trades/trade-banknifty-52500pe',
  },
  {
    id: 'notif-3',
    type: 'TRIGGER',
    title: 'Entry Triggered 🟢',
    message: 'BANKNIFTY 52,500 PE entry condition met as index moved below 52,380.',
    timestamp: '09:45 AM IST',
    isRead: true,
    link: '/dashboard/trades/trade-banknifty-52500pe',
  },
  {
    id: 'notif-4',
    type: 'REPORT',
    title: 'Daily Market Report Available 📊',
    message: 'Today\'s F&O market structural report and key level analysis is now live.',
    timestamp: '08:30 AM IST',
    isRead: true,
    link: '/dashboard/reports',
  },
  {
    id: 'notif-5',
    type: 'STOP_LOSS',
    title: 'Setup Invalidated 🔴',
    message: 'NIFTY 24,650 PE hit stop loss at ₹90. Trade closed with disciplined risk.',
    timestamp: 'Yesterday',
    isRead: true,
    link: '/dashboard/trades/trade-nifty-24650pe',
  },
];
