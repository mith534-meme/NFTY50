import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminShell } from '../../components/admin/AdminShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SectionLabel } from '../../components/ui/SectionLabel';
import { tradeStore } from '../../services/tradeStore';
import type {
  TradeSetup,
  IndexType,
  OptionType,
  TradeDirection,
  MarketBias,
  RiskLevel,
  TradeStatus,
} from '../../types/trade';
import {
  ArrowLeft,
  Save,
  Eye,
  Send,
  AlertCircle,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';

export const AdminCreateTradePage: React.FC = () => {
  const navigate = useNavigate();
  const { tradeId } = useParams<{ tradeId?: string }>();
  const existingTrade = tradeId ? tradeStore.getTradeById(tradeId) : undefined;

  // Section 1: Basic
  const [index, setIndex] = useState<IndexType>(existingTrade?.index || 'NIFTY 50');
  const [optionType, setOptionType] = useState<OptionType>(
    existingTrade?.optionType?.includes('CALL') ? 'CALL' : 'PUT'
  );
  const [strikePrice, setStrikePrice] = useState<string>(
    String(existingTrade?.strikePrice || '24800')
  );
  const [direction, setDirection] = useState<TradeDirection>(existingTrade?.direction || 'BUY');

  // Section 2: Entry & Exit
  const [entryMin, setEntryMin] = useState<string>(String(existingTrade?.entryMin || '145'));
  const [entryMax, setEntryMax] = useState<string>(String(existingTrade?.entryMax || '155'));
  const [triggerCondition, setTriggerCondition] = useState<string>(
    existingTrade?.triggerCondition || 'NIFTY spot sustains above 24,780 on 15-minute candle close.'
  );
  const [stopLoss, setStopLoss] = useState<string>(String(existingTrade?.stopLoss || '110'));
  const [target1, setTarget1] = useState<string>(String(existingTrade?.target1 || '185'));
  const [target2, setTarget2] = useState<string>(String(existingTrade?.target2 || '220'));
  const [target3, setTarget3] = useState<string>(String(existingTrade?.target3 || '250'));

  // Section 3 & 4: Guidelines
  const [whenToBuy, setWhenToBuy] = useState<string>(
    existingTrade?.whenToBuy ||
      'Buy only after NIFTY spot sustains above the specified trigger level on a 15-minute candle. Avoid entry if trigger is not confirmed.'
  );
  const [whenToExit, setWhenToExit] = useState<string>(
    existingTrade?.whenToExit ||
      'Exit immediately if stop loss is hit. Consider partial profit booking at Target 1 and trail stop loss to cost.'
  );

  // Section 5: Rationale
  const [researchSummary, setResearchSummary] = useState<string>(
    existingTrade?.researchSummary ||
      'NIFTY is demonstrating bullish continuation above 24,750 resistance supported by strong option open interest positioning.'
  );
  const [whyThisSetup, setWhyThisSetup] = useState<string>(
    existingTrade?.whyThisSetup ||
      'Heavy Put writing at 24,700 PE indicates strong support floor. Positive RSI divergence on intraday charts.'
  );
  const [marketBias, setMarketBias] = useState<MarketBias>(existingTrade?.marketBias || 'BULLISH');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(existingTrade?.riskLevel || 'MODERATE');

  // Section 6: Key Levels
  const [keySupportLevels, setKeySupportLevels] = useState<string>(
    existingTrade?.keySupportLevels?.join(', ') || '24,650, 24,700'
  );
  const [keyResistanceLevels, setKeyResistanceLevels] = useState<string>(
    existingTrade?.keyResistanceLevels?.join(', ') || '24,800, 24,850'
  );

  // Section 7 & 8: Invalidation & Validity
  const [invalidationCondition, setInvalidationCondition] = useState<string>(
    existingTrade?.invalidationCondition ||
      'Setup becomes invalid if spot price closes below the 24,680 support level.'
  );
  const [setupValidUntil, setSetupValidUntil] = useState<string>(
    existingTrade?.setupValidUntil || '2026-10-02T15:30'
  );

  // UI state
  const [errors, setErrors] = useState<string[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const calculatedInstrument = `${index.replace(' 50', '')} ${strikePrice} ${optionType}`;
  const formattedEntryRange = `₹${entryMin} – ₹${entryMax}`;

  const validateForm = (isPublishing = false): boolean => {
    const errs: string[] = [];

    const minNum = parseFloat(entryMin);
    const maxNum = parseFloat(entryMax);
    const slNum = parseFloat(stopLoss);
    const t1Num = parseFloat(target1);

    if (!strikePrice) errs.push('Strike Price is required.');
    if (!entryMin || !entryMax) errs.push('Entry Minimum and Maximum values are required.');
    if (!isNaN(minNum) && !isNaN(maxNum) && minNum > maxNum) {
      errs.push('Entry Minimum (₹' + minNum + ') cannot be greater than Entry Maximum (₹' + maxNum + ').');
    }

    if (!stopLoss) errs.push('Stop Loss is required.');
    if (!target1) errs.push('Target 1 is required.');

    if (direction === 'BUY' && !isNaN(minNum) && !isNaN(slNum) && slNum >= minNum) {
      errs.push('For BUY setup, Stop Loss (₹' + slNum + ') should be lower than Entry Min (₹' + minNum + ').');
    }
    if (direction === 'BUY' && !isNaN(maxNum) && !isNaN(t1Num) && t1Num <= maxNum) {
      errs.push('For BUY setup, Target 1 (₹' + t1Num + ') should be higher than Entry Max (₹' + maxNum + ').');
    }

    if (isPublishing) {
      if (!triggerCondition.trim()) errs.push('Trigger Condition is required for publishing.');
      if (!whenToBuy.trim()) errs.push('WHEN TO BUY condition is required for publishing.');
      if (!whenToExit.trim()) errs.push('WHEN TO EXIT condition is required for publishing.');
      if (!whyThisSetup.trim()) errs.push('WHY THIS SETUP research explanation is required.');
      if (!invalidationCondition.trim()) errs.push('Invalidation Condition is required before publishing.');
      if (!setupValidUntil) errs.push('Setup Validity Time is required before publishing.');
    }

    setErrors(errs);
    return errs.length === 0;
  };

  const buildTradeObject = (status: TradeStatus): TradeSetup => {
    return {
      id: existingTrade?.id || `trade-${Date.now()}`,
      index,
      instrument: calculatedInstrument,
      optionType,
      strikePrice,
      direction,
      entryMin,
      entryMax,
      entryZone: formattedEntryRange,
      triggerCondition,
      stopLoss: `₹${stopLoss}`,
      target1: `₹${target1}`,
      target2: target2 ? `₹${target2}` : `₹${target1}`,
      target3: target3 ? `₹${target3}` : `₹${target1}`,
      whenToBuy,
      whenToExit,
      marketBias,
      riskLevel,
      whyThisSetup,
      researchSummary,
      keySupportLevels: keySupportLevels.split(',').map((s) => s.trim()).filter(Boolean),
      keyResistanceLevels: keyResistanceLevels.split(',').map((s) => s.trim()).filter(Boolean),
      invalidationCondition,
      setupValidUntil,
      status,
      createdBy: existingTrade?.createdBy || 'admin@niftypulse.com',
      createdAt: existingTrade?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: status === 'PUBLISHED' ? existingTrade?.publishedAt || new Date().toISOString() : existingTrade?.publishedAt,
    };
  };

  const handleSaveDraft = () => {
    if (!validateForm(false)) return;
    const tradeObj = buildTradeObject('DRAFT');
    tradeStore.saveTrade(tradeObj);
    navigate('/admin/trades');
  };

  const handlePreview = () => {
    if (!validateForm(false)) return;
    const tradeObj = buildTradeObject(existingTrade?.status || 'IN_REVIEW');
    tradeStore.saveTrade(tradeObj);
    navigate(`/admin/trades/${tradeObj.id}/review`);
  };

  const handleConfirmPublish = () => {
    if (!validateForm(true)) return;
    const tradeObj = buildTradeObject('WAITING');
    tradeStore.saveTrade(tradeObj);
    setShowConfirmModal(false);
    navigate('/admin/trades');
  };

  return (
    <AdminShell>
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => navigate('/admin/trades')}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0052FF] hover:underline mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO TRADES
            </button>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
              {existingTrade ? 'Edit Trade Setup' : 'Create Trade Setup'}
            </h1>
            <p className="text-sm text-[#64748B] mt-1 font-sans">
              Author structured intraday research setups for benchmark indices.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              onClick={handleSaveDraft}
              className="flex-1 sm:flex-initial justify-center"
            >
              <Save className="w-4 h-4 mr-1.5" />
              Save Draft
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={handlePreview}
              className="flex-1 sm:flex-initial justify-center"
            >
              <Eye className="w-4 h-4 mr-1.5" />
              Preview Setup
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => validateForm(true) && setShowConfirmModal(true)}
              className="flex-1 sm:flex-initial justify-center"
            >
              <Send className="w-4 h-4 mr-1.5" />
              Publish
            </Button>
          </div>
        </div>

        {/* Validation Errors Alert */}
        {errors.length > 0 && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono space-y-1">
            <div className="flex items-center gap-2 font-bold text-rose-800">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Cannot publish trade setup. Please fix the following errors:</span>
            </div>
            <ul className="list-disc pl-6 space-y-0.5 pt-1">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Form Container */}
        <div className="space-y-6">
          {/* SECTION 1: BASIC TRADE INFORMATION */}
          <Card variant="light" hoverEffect={false} className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4">
              <SectionLabel className="mb-1">SECTION 1 OF 8</SectionLabel>
              <h2 className="font-display text-lg font-bold text-[#0F172A]">Basic Trade Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Instrument */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                  Benchmark Index *
                </label>
                <select
                  value={index}
                  onChange={(e) => setIndex(e.target.value as IndexType)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px]"
                >
                  <option value="NIFTY 50">NIFTY 50</option>
                  <option value="BANK NIFTY">BANK NIFTY</option>
                  <option value="SENSEX">SENSEX</option>
                </select>
              </div>

              {/* Option Type */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                  Option Type *
                </label>
                <select
                  value={optionType}
                  onChange={(e) => setOptionType(e.target.value as OptionType)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px]"
                >
                  <option value="CALL">CALL (CE)</option>
                  <option value="PUT">PUT (PE)</option>
                </select>
              </div>

              {/* Strike Price */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                  Strike Price *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 24800"
                  value={strikePrice}
                  onChange={(e) => setStrikePrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px] font-mono"
                  required
                />
              </div>

              {/* Direction */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                  Trade Direction *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDirection('BUY')}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                      direction === 'BUY'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-[#FAFAFA] text-[#64748B] border-[#E2E8F0] hover:bg-slate-100'
                    }`}
                  >
                    BUY
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirection('SELL')}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                      direction === 'SELL'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : 'bg-[#FAFAFA] text-[#64748B] border-[#E2E8F0] hover:bg-slate-100'
                    }`}
                  >
                    SELL
                  </button>
                </div>
              </div>
            </div>

            {/* Generated Instrument Preview */}
            <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs font-mono text-[#64748B] flex items-center justify-between">
              <span>Generated Instrument Symbol:</span>
              <span className="font-bold text-[#0F172A] text-sm">{calculatedInstrument}</span>
            </div>
          </Card>

          {/* SECTION 2: ENTRY & EXIT */}
          <Card variant="light" hoverEffect={false} className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4">
              <SectionLabel className="mb-1">SECTION 2 OF 8</SectionLabel>
              <h2 className="font-display text-lg font-bold text-[#0F172A]">Entry, Stop Loss & Targets</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Entry Min */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                  Entry Minimum (₹) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 145"
                  value={entryMin}
                  onChange={(e) => setEntryMin(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px] font-mono"
                  required
                />
              </div>

              {/* Entry Max */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                  Entry Maximum (₹) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 155"
                  value={entryMax}
                  onChange={(e) => setEntryMax(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px] font-mono"
                  required
                />
              </div>

              {/* Combined Entry Preview */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[#64748B] uppercase mb-1.5">
                  Combined Entry Range
                </label>
                <div className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-slate-100 font-mono font-bold text-[#0052FF] flex items-center min-h-[44px]">
                  {formattedEntryRange}
                </div>
              </div>
            </div>

            {/* Trigger Condition */}
            <div>
              <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                Trigger Condition *
              </label>
              <input
                type="text"
                placeholder="e.g. NIFTY spot sustains above 24,780 for 15-min candle."
                value={triggerCondition}
                onChange={(e) => setTriggerCondition(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Stop Loss */}
              <div>
                <label className="block text-xs font-mono font-semibold text-rose-700 uppercase mb-1.5">
                  Stop Loss (₹) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 110"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-200 text-sm bg-rose-50/40 text-rose-900 focus-ring min-h-[44px] font-mono font-bold"
                  required
                />
              </div>

              {/* Target 1 */}
              <div>
                <label className="block text-xs font-mono font-semibold text-emerald-700 uppercase mb-1.5">
                  Target 1 (₹) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 185"
                  value={target1}
                  onChange={(e) => setTarget1(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm bg-emerald-50/40 text-emerald-900 focus-ring min-h-[44px] font-mono font-bold"
                  required
                />
              </div>

              {/* Target 2 */}
              <div>
                <label className="block text-xs font-mono font-semibold text-emerald-700 uppercase mb-1.5">
                  Target 2 (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 220"
                  value={target2}
                  onChange={(e) => setTarget2(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm bg-emerald-50/40 text-emerald-900 focus-ring min-h-[44px] font-mono font-bold"
                />
              </div>

              {/* Target 3 */}
              <div>
                <label className="block text-xs font-mono font-semibold text-emerald-700 uppercase mb-1.5">
                  Target 3 (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 250"
                  value={target3}
                  onChange={(e) => setTarget3(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 text-sm bg-emerald-50/40 text-emerald-900 focus-ring min-h-[44px] font-mono font-bold"
                />
              </div>
            </div>
          </Card>

          {/* SECTION 3 & 4: WHEN TO BUY & WHEN TO EXIT */}
          <Card variant="light" hoverEffect={false} className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4">
              <SectionLabel className="mb-1">SECTION 3 & 4 OF 8</SectionLabel>
              <h2 className="font-display text-lg font-bold text-[#0F172A]">Actionable Execution Rules</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* When to Buy */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[#0052FF] uppercase mb-1.5">
                  WHEN TO BUY *
                </label>
                <textarea
                  rows={4}
                  placeholder="Exact actionable condition under which entry is valid..."
                  value={whenToBuy}
                  onChange={(e) => setWhenToBuy(e.target.value)}
                  className="w-full p-4 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring font-sans leading-relaxed"
                  required
                />
              </div>

              {/* When to Exit */}
              <div>
                <label className="block text-xs font-mono font-semibold text-rose-600 uppercase mb-1.5">
                  WHEN TO EXIT *
                </label>
                <textarea
                  rows={4}
                  placeholder="Stop-loss conditions, target profit booking, or trailing guidelines..."
                  value={whenToExit}
                  onChange={(e) => setWhenToExit(e.target.value)}
                  className="w-full p-4 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring font-sans leading-relaxed"
                  required
                />
              </div>
            </div>
          </Card>

          {/* SECTION 5: RESEARCH & RATIONALE */}
          <Card variant="light" hoverEffect={false} className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4">
              <SectionLabel className="mb-1">SECTION 5 OF 8</SectionLabel>
              <h2 className="font-display text-lg font-bold text-[#0F172A]">Research & Rationale</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Market Bias */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                  Market Bias *
                </label>
                <select
                  value={marketBias}
                  onChange={(e) => setMarketBias(e.target.value as MarketBias)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px]"
                >
                  <option value="BULLISH">BULLISH 📈</option>
                  <option value="BEARISH">BEARISH 📉</option>
                  <option value="NEUTRAL">NEUTRAL ⚖️</option>
                </select>
              </div>

              {/* Risk Level */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                  Risk Level *
                </label>
                <select
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(e.target.value as RiskLevel)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px]"
                >
                  <option value="LOW">LOW</option>
                  <option value="MODERATE">MODERATE</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                Research Summary *
              </label>
              <input
                type="text"
                placeholder="High-level takeaway for dashboard card..."
                value={researchSummary}
                onChange={(e) => setResearchSummary(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                WHY THIS SETUP? (Detailed Rationale) *
              </label>
              <textarea
                rows={4}
                placeholder="Technical factors, open interest structure, price action signals..."
                value={whyThisSetup}
                onChange={(e) => setWhyThisSetup(e.target.value)}
                className="w-full p-4 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring font-sans leading-relaxed"
                required
              />
            </div>
          </Card>

          {/* SECTION 6 & 7: KEY LEVELS & INVALIDATION */}
          <Card variant="light" hoverEffect={false} className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4">
              <SectionLabel className="mb-1">SECTION 6 & 7 OF 8</SectionLabel>
              <h2 className="font-display text-lg font-bold text-[#0F172A]">Key Levels & Invalidation Condition</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono font-semibold text-emerald-700 uppercase mb-1.5">
                  Key Support Levels (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 24,650, 24,700"
                  value={keySupportLevels}
                  onChange={(e) => setKeySupportLevels(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-rose-700 uppercase mb-1.5">
                  Key Resistance Levels (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 24,800, 24,850"
                  value={keyResistanceLevels}
                  onChange={(e) => setKeyResistanceLevels(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-rose-700 uppercase mb-1.5">
                INVALIDATION CONDITION (Mandatory for Publishing) *
              </label>
              <input
                type="text"
                placeholder="e.g. Setup becomes invalid if spot price closes below 24,680."
                value={invalidationCondition}
                onChange={(e) => setInvalidationCondition(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-rose-200 text-sm bg-rose-50/40 text-rose-900 focus-ring min-h-[44px]"
                required
              />
            </div>
          </Card>

          {/* SECTION 8: VALIDITY & RISK DISCLOSURE */}
          <Card variant="light" hoverEffect={false} className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4">
              <SectionLabel className="mb-1">SECTION 8 OF 8</SectionLabel>
              <h2 className="font-display text-lg font-bold text-[#0F172A]">Setup Validity & Mandatory Risk Disclosure</h2>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                Setup Valid Until *
              </label>
              <input
                type="datetime-local"
                value={setupValidUntil.slice(0, 16)}
                onChange={(e) => setSetupValidUntil(e.target.value)}
                className="w-full sm:w-72 px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px] font-mono"
                required
              />
            </div>

            {/* Standard Risk Disclaimer Preview */}
            <div className="p-4 rounded-xl bg-slate-100 border border-[#E2E8F0] text-xs font-mono text-[#64748B] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0F172A]">
                <ShieldAlert className="w-4 h-4 text-[#0052FF]" />
                <span>Standard Risk Disclosure (Automatically Appended to Published Setup)</span>
              </div>
              <p>
                Trading in securities and derivatives involves substantial risk. F&O trading can result in significant losses, including rapid loss of capital. The trade setups and research provided are for informational and educational purposes only and should not be construed as a guarantee of profit.
              </p>
              <div className="pt-1 text-[11px] font-bold text-[#0052FF]">
                ✔ Research setup — not a guarantee of outcome.
              </div>
            </div>
          </Card>
        </div>

        {/* Modal: Publish Confirmation */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <div className="w-12 h-12 rounded-2xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center">
                <Send className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-[#0F172A]">Publish Trade Setup?</h3>
                <p className="text-xs text-[#64748B] mt-1.5 font-sans leading-relaxed">
                  This action will make this research setup visible to eligible subscribers on their dashboard. Please confirm that entry range, stop loss, targets, trigger, validity, and risk disclaimers have been reviewed.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs font-mono space-y-1 text-[#0F172A]">
                <div className="font-bold">{calculatedInstrument} ({direction})</div>
                <div className="text-[#64748B]">Entry: {formattedEntryRange} | SL: ₹{stopLoss}</div>
                <div className="text-[#64748B]">Target 1: ₹{target1} | Bias: {marketBias}</div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 justify-center"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleConfirmPublish}
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
