import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AdminShell } from '../../components/admin/AdminShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { tradeStore } from '../../services/tradeStore';
import type { TradeSetup } from '../../types/trade';
import {
  ArrowLeft,
  Edit,
  Send,
  ShieldAlert,
  Clock,
  Target,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

export const AdminTradeReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { tradeId } = useParams<{ tradeId: string }>();
  const [trade, setTrade] = useState<TradeSetup | undefined>(
    tradeId ? tradeStore.getTradeById(tradeId) : undefined
  );
  const [showPublishModal, setShowPublishModal] = useState(false);

  useEffect(() => {
    if (tradeId) {
      setTrade(tradeStore.getTradeById(tradeId));
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

  const handlePublish = () => {
    tradeStore.updateStatus(trade.id, 'WAITING');
    setShowPublishModal(false);
    navigate('/admin/trades');
  };

  return (
    <AdminShell>
      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        {/* Quality Control Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <Link
              to={`/admin/trades/create`}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0052FF] hover:underline mb-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO EDIT FORM
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-[#0F172A]">Quality Control & Review</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold uppercase border border-amber-200">
                {trade.status} PREVIEW
              </span>
            </div>
            <p className="text-xs text-[#64748B] font-sans mt-0.5">
              Review exactly how subscribers will view this research setup before publishing.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate(`/admin/trades/create`)}
              className="flex-1 sm:flex-initial justify-center"
            >
              <Edit className="w-4 h-4 mr-1.5" />
              Edit Setup
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowPublishModal(true)}
              className="flex-1 sm:flex-initial justify-center"
            >
              <Send className="w-4 h-4 mr-1.5" />
              Confirm & Publish
            </Button>
          </div>
        </div>

        {/* SUBSCRIBER-EXACT PREVIEW CARD */}
        <Card variant="light" hoverEffect={false} className="p-6 sm:p-8 space-y-6 border-2 border-[#0052FF]/30 shadow-lg">
          {/* Header Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white flex items-center justify-center font-bold text-lg shadow-md">
                {trade.direction === 'BUY' ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#64748B] uppercase">{trade.index}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase text-white ${
                    trade.direction === 'BUY' ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}>
                    {trade.direction} {trade.optionType}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-[#0F172A] mt-0.5">{trade.instrument}</h2>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-mono font-semibold text-[#64748B]">SETUP STATUS</div>
              <div className="font-mono text-sm font-bold text-[#0052FF]">{trade.status}</div>
            </div>
          </div>

          {/* Core Parameters Table Grid */}
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

          {/* Rules: When to Buy & When to Exit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-[#E2E8F0] bg-white space-y-2">
              <h3 className="font-mono text-xs font-bold text-[#0052FF] uppercase flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                WHEN TO BUY
              </h3>
              <p className="text-xs text-[#0F172A] font-sans leading-relaxed">{trade.whenToBuy}</p>
            </div>

            <div className="p-5 rounded-xl border border-[#E2E8F0] bg-white space-y-2">
              <h3 className="font-mono text-xs font-bold text-rose-600 uppercase flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                WHEN TO EXIT
              </h3>
              <p className="text-xs text-[#0F172A] font-sans leading-relaxed">{trade.whenToExit}</p>
            </div>
          </div>

          {/* Research Rationale & Key Levels */}
          <div className="space-y-4 pt-2">
            <h3 className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-wider">WHY THIS SETUP? (RESEARCH RATIONALE)</h3>
            <p className="text-sm text-[#0F172A] font-sans leading-relaxed bg-[#FAFAFA] p-4 rounded-xl border border-[#E2E8F0]">
              {trade.whyThisSetup}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs font-mono">
                <span className="font-bold text-emerald-800">KEY SUPPORT LEVELS: </span>
                <span className="text-emerald-950 font-bold">{trade.keySupportLevels?.join(' | ') || '24,650 | 24,700'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200 text-xs font-mono">
                <span className="font-bold text-rose-800">KEY RESISTANCE LEVELS: </span>
                <span className="text-rose-950 font-bold">{trade.keyResistanceLevels?.join(' | ') || '24,800 | 24,850'}</span>
              </div>
            </div>
          </div>

          {/* Invalidation & Validity */}
          <div className="p-4 rounded-xl bg-slate-100 border border-[#E2E8F0] text-xs font-mono text-[#64748B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-[#0F172A]">Invalidation Condition: </span>
              <span>{trade.invalidationCondition}</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-[#0F172A] shrink-0">
              <Clock className="w-4 h-4 text-[#0052FF]" />
              <span>Valid Until: {trade.setupValidUntil}</span>
            </div>
          </div>

          {/* Product Risk Disclosure Banner */}
          <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs font-mono text-[#64748B] leading-relaxed">
            <strong className="text-[#0F172A] font-semibold">Mandatory Product Risk Disclosure: </strong>
            Trading in securities and derivatives involves substantial risk. F&O trading can result in significant losses, including rapid loss of capital. Market research setups do not guarantee profits or future performance.
            <span className="block mt-1 font-bold text-[#0052FF]">✔ Research setup — not a guarantee of outcome.</span>
          </div>
        </Card>

        {/* Modal: Publish Confirmation */}
        {showPublishModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <div className="w-12 h-12 rounded-2xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center">
                <Send className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-[#0F172A]">Publish Trade Setup?</h3>
                <p className="text-xs text-[#64748B] mt-1.5 font-sans leading-relaxed">
                  This action will make this research setup visible to eligible subscribers on their dashboard. Please confirm that all research parameters have been verified.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs font-mono space-y-1 text-[#0F172A]">
                <div className="font-bold">{trade.instrument} ({trade.direction})</div>
                <div className="text-[#64748B]">Entry: {trade.entryZone || `₹${trade.entryMin} - ₹${trade.entryMax}`} | SL: {trade.stopLoss}</div>
                <div className="text-[#64748B]">Target 1: {trade.target1} | Bias: {trade.marketBias}</div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setShowPublishModal(false)}
                  className="flex-1 justify-center"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handlePublish}
                  className="flex-1 justify-center"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  Confirm & Publish
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
};
