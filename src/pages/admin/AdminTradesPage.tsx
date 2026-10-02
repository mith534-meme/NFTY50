import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminShell } from '../../components/admin/AdminShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { tradeStore } from '../../services/tradeStore';
import type { TradeSetup, TradeStatus } from '../../types/trade';
import {
  Plus,
  Search,
  Eye,
  Edit,
  Send,
} from 'lucide-react';

export const AdminTradesPage: React.FC = () => {
  const navigate = useNavigate();
  const [trades, setTrades] = useState<TradeSetup[]>([]);
  const [selectedInstrument, setSelectedInstrument] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setTrades(tradeStore.getAllTrades());
    const unsub = tradeStore.subscribe(() => {
      setTrades(tradeStore.getAllTrades());
    });
    return unsub;
  }, []);

  const filteredTrades = trades.filter((trade) => {
    // Instrument filter
    if (selectedInstrument !== 'ALL' && trade.index !== selectedInstrument) {
      return false;
    }
    // Status filter
    if (selectedStatus !== 'ALL' && trade.status !== selectedStatus) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchInst = trade.instrument.toLowerCase().includes(q);
      const matchId = trade.id.toLowerCase().includes(q);
      const matchStatus = trade.status.toLowerCase().includes(q);
      const matchStrike = String(trade.strikePrice).toLowerCase().includes(q);
      if (!matchInst && !matchId && !matchStatus && !matchStrike) {
        return false;
      }
    }
    return true;
  });

  const getStatusBadgeStyle = (status: TradeStatus) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'IN_REVIEW':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'PUBLISHED':
      case 'WAITING':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'ENTRY_TRIGGERED':
      case 'ACTIVE':
        return 'bg-[#0052FF]/10 text-[#0052FF] border-[#0052FF]/30';
      case 'TARGET_1_HIT':
      case 'TARGET_2_HIT':
      case 'TARGET_3_HIT':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'STOP_LOSS_HIT':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'CLOSED':
      case 'NO_TRADE':
        return 'bg-slate-200 text-slate-800 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Trade Setups & Research Management
            </h1>
            <p className="text-sm text-[#64748B] mt-1 font-sans">
              Create, review, publish and update daily F&O intraday trade setups.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/admin/trades/new')}
            className="w-full sm:w-auto justify-center"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Create Trade Setup
          </Button>
        </div>

        {/* Filter Toolbar */}
        <Card variant="light" hoverEffect={false} className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search strike, index, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-mono bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px]"
              />
            </div>

            {/* Instrument Filter */}
            <div>
              <select
                value={selectedInstrument}
                onChange={(e) => setSelectedInstrument(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-mono bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px]"
              >
                <option value="ALL">All Benchmark Indices</option>
                <option value="NIFTY 50">NIFTY 50</option>
                <option value="BANK NIFTY">BANK NIFTY</option>
                <option value="SENSEX">SENSEX</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-mono bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px]"
              >
                <option value="ALL">All Statuses</option>
                <option value="DRAFT">Draft</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="PUBLISHED">Published</option>
                <option value="WAITING">Waiting Trigger</option>
                <option value="ACTIVE">Active Trade</option>
                <option value="TARGET_1_HIT">Target 1 Hit</option>
                <option value="STOP_LOSS_HIT">Stop Loss Hit</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E2E8F0] text-xs font-mono bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px]"
              >
                <option value="ALL">All Time</option>
                <option value="TODAY">Today</option>
                <option value="YESTERDAY">Yesterday</option>
                <option value="THIS_WEEK">This Week</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Trades Table */}
        <Card variant="light" hoverEffect={false} className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-slate-50/80 text-[11px] font-mono text-[#64748B] uppercase">
                  <th className="py-3.5 px-4 font-bold">Instrument</th>
                  <th className="py-3.5 px-4 font-bold">Type</th>
                  <th className="py-3.5 px-4 font-bold">Dir</th>
                  <th className="py-3.5 px-4 font-bold">Entry Range</th>
                  <th className="py-3.5 px-4 font-bold">Stop Loss</th>
                  <th className="py-3.5 px-4 font-bold">Targets (T1 / T2 / T3)</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs">
                {filteredTrades.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#64748B] font-mono">
                      No trade setups found matching the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredTrades.map((trade) => (
                    <tr key={trade.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Instrument */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-[#0F172A] text-sm">{trade.instrument}</div>
                        <div className="text-[10px] font-mono text-[#64748B]">{trade.index}</div>
                      </td>

                      {/* Option Type */}
                      <td className="py-4 px-4 font-mono font-semibold">
                        {trade.optionType}
                      </td>

                      {/* Direction */}
                      <td className="py-4 px-4">
                        <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold text-white uppercase ${
                          trade.direction === 'BUY' ? 'bg-emerald-600' : 'bg-rose-600'
                        }`}>
                          {trade.direction}
                        </span>
                      </td>

                      {/* Entry Range */}
                      <td className="py-4 px-4 font-mono font-bold text-[#0052FF]">
                        {trade.entryZone || `₹${trade.entryMin} – ₹${trade.entryMax}`}
                      </td>

                      {/* Stop Loss */}
                      <td className="py-4 px-4 font-mono font-bold text-rose-600">
                        {trade.stopLoss}
                      </td>

                      {/* Targets */}
                      <td className="py-4 px-4 font-mono text-[#0F172A]">
                        {trade.target1} / {trade.target2} / {trade.target3}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${getStatusBadgeStyle(trade.status)}`}>
                          {trade.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/trades/${trade.id}`}
                            className="p-2 rounded-lg text-[#0F172A] hover:bg-slate-100 transition-colors font-mono text-xs font-semibold flex items-center gap-1 min-h-[36px]"
                            title="Manage Status & Details"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#0052FF]" />
                            <span>View</span>
                          </Link>

                          <Link
                            to={`/admin/trades/${trade.id}/review`}
                            className="p-2 rounded-lg text-amber-700 hover:bg-amber-50 transition-colors font-mono text-xs font-semibold flex items-center gap-1 min-h-[36px]"
                            title="Review Quality Control"
                          >
                            <Send className="w-3.5 h-3.5 text-amber-600" />
                            <span>Review</span>
                          </Link>

                          <Link
                            to={`/admin/trades/new`}
                            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors font-mono text-xs font-semibold flex items-center gap-1 min-h-[36px]"
                            title="Edit Setup"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminShell>
  );
};
