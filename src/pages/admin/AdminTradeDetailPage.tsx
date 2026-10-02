import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminShell } from '../../components/admin/AdminShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SectionLabel } from '../../components/ui/SectionLabel';
import { tradeStore } from '../../services/tradeStore';
import type { TradeSetup, TradeStatus } from '../../types/trade';
import {
  ArrowLeft,
  Edit,
  Target,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

const STATUS_OPTIONS: TradeStatus[] = [
  'DRAFT',
  'IN_REVIEW',
  'PUBLISHED',
  'WAITING',
  'ENTRY_TRIGGERED',
  'ACTIVE',
  'TARGET_1_HIT',
  'TARGET_2_HIT',
  'TARGET_3_HIT',
  'STOP_LOSS_HIT',
  'CLOSED',
  'NO_TRADE',
];

export const AdminTradeDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { tradeId } = useParams<{ tradeId: string }>();

  const [trade, setTrade] = useState<TradeSetup | undefined>(
    tradeId ? tradeStore.getTradeById(tradeId) : undefined
  );
  const [selectedStatus, setSelectedStatus] = useState<TradeStatus | ''>('');
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    if (tradeId) {
      const current = tradeStore.getTradeById(tradeId);
      setTrade(current);
      if (current) setSelectedStatus(current.status);
    }
  }, [tradeId]);

  if (!trade) {
    return (
      <AdminShell>
        <div className="p-8 text-center space-y-4">
          <p className="text-sm font-mono text-[#64748B]">Trade setup not found.</p>
          <Link to="/admin/trades" className="text-xs font-mono text-[#0052FF] underline">
            Return to Trade Setups
          </Link>
        </div>
      </AdminShell>
    );
  }

  const handleStatusChangeConfirm = () => {
    if (!selectedStatus) return;
    const updated = tradeStore.updateStatus(trade.id, selectedStatus as TradeStatus);
    if (updated) setTrade(updated);
    setShowStatusModal(false);
  };

  return (
    <AdminShell>
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <Link
              to="/admin/trades"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0052FF] hover:underline mb-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO ALL TRADES
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-[#0F172A]">{trade.instrument}</h1>
              <span className={`text-xs font-mono px-2.5 py-1 rounded-full font-bold uppercase ${
                trade.direction === 'BUY' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {trade.direction} {trade.optionType}
              </span>
            </div>
            <p className="text-xs text-[#64748B] font-mono mt-0.5">
              TRADE ID: {trade.id} | CREATED BY: {trade.createdBy || 'Admin'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate(`/admin/trades/create`)}
            >
              <Edit className="w-4 h-4 mr-1.5" />
              Edit Setup
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate(`/admin/trades/${trade.id}/review`)}
            >
              Preview Setup
            </Button>
          </div>
        </div>

        {/* PROMINENT LIVE STATUS UPDATE CONTROL CARD */}
        <Card variant="light" hoverEffect={false} className="p-6 bg-gradient-to-r from-slate-900 to-[#0F172A] text-white border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <SectionLabel className="text-[#0052FF] mb-1">LIVE TRADE STATUS CONTROL</SectionLabel>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">Current Status:</span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0052FF] text-white tracking-wide uppercase">
                  {trade.status}
                </span>
              </div>
            </div>

            {/* Status Change Selector */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as TradeStatus)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white text-xs font-mono font-bold focus-ring min-h-[44px]"
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    CHANGE TO: {st}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setShowStatusModal(true)}
                disabled={selectedStatus === trade.status}
                className="px-4 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0046D5] disabled:opacity-50 text-white text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 min-h-[44px] shrink-0"
              >
                <RefreshCw className="w-4 h-4" />
                Update Status
              </button>
            </div>
          </div>
        </Card>

        {/* TRADE DETAILS GRID */}
        <Card variant="light" hoverEffect={false} className="p-6 sm:p-8 space-y-6">
          {/* Key Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#FAFAFA] border border-[#E2E8F0]">
            <div>
              <div className="text-[11px] font-mono text-[#64748B] uppercase font-semibold">ENTRY RANGE</div>
              <div className="font-mono font-bold text-[#0052FF] text-base sm:text-lg">{trade.entryZone || `₹${trade.entryMin} – ₹${trade.entryMax}`}</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#64748B] uppercase font-semibold">STOP LOSS</div>
              <div className="font-mono font-bold text-rose-600 text-base sm:text-lg">{trade.stopLoss}</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#64748B] uppercase font-semibold">TARGET 1</div>
              <div className="font-mono font-bold text-emerald-600 text-base sm:text-lg">{trade.target1}</div>
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#64748B] uppercase font-semibold">TARGET 2 / 3</div>
              <div className="font-mono font-bold text-emerald-700 text-base sm:text-lg">{trade.target2} / {trade.target3}</div>
            </div>
          </div>

          {/* Trigger Condition */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs font-mono space-y-1">
            <span className="font-bold uppercase tracking-wider text-amber-800">TRIGGER CONDITION:</span>
            <p className="font-sans text-sm font-medium text-amber-950">{trade.triggerCondition}</p>
          </div>

          {/* When to Buy & Exit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-[#E2E8F0] bg-[#FAFAFA] space-y-2">
              <h3 className="font-mono text-xs font-bold text-[#0052FF] uppercase flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                WHEN TO BUY
              </h3>
              <p className="text-xs text-[#0F172A] font-sans leading-relaxed">{trade.whenToBuy}</p>
            </div>

            <div className="p-5 rounded-xl border border-[#E2E8F0] bg-[#FAFAFA] space-y-2">
              <h3 className="font-mono text-xs font-bold text-rose-600 uppercase flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                WHEN TO EXIT
              </h3>
              <p className="text-xs text-[#0F172A] font-sans leading-relaxed">{trade.whenToExit}</p>
            </div>
          </div>

          {/* Why This Setup */}
          <div className="space-y-3 pt-2">
            <h3 className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-wider">RESEARCH SUMMARY & RATIONALE</h3>
            <p className="text-sm text-[#0F172A] font-sans leading-relaxed bg-[#FAFAFA] p-4 rounded-xl border border-[#E2E8F0]">
              {trade.whyThisSetup}
            </p>
          </div>
        </Card>

        {/* Modal: Status Update Confirmation */}
        {showStatusModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <div className="w-12 h-12 rounded-2xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center">
                <RefreshCw className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-[#0F172A]">Update Live Trade Status?</h3>
                <p className="text-xs text-[#64748B] mt-1.5 font-sans leading-relaxed">
                  Changing status to <strong className="text-[#0052FF]">{selectedStatus}</strong> will immediately update the live setup across all active subscriber dashboards.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs font-mono space-y-1 text-[#0F172A]">
                <div>Instrument: <strong className="text-[#0052FF]">{trade.instrument}</strong></div>
                <div>Current Status: <span className="font-bold">{trade.status}</span></div>
                <div>New Status: <span className="font-bold text-[#0052FF]">{selectedStatus}</span></div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 justify-center"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleStatusChangeConfirm}
                  className="flex-1 justify-center"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  Confirm Status Change
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
};
