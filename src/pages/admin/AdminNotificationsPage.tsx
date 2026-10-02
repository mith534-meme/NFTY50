import React, { useState } from 'react';
import { AdminShell } from '../../components/admin/AdminShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Bell, CheckCircle2 } from 'lucide-react';

export const AdminNotificationsPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('ALL_USERS');
  const [sentMessage, setSentMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSentMessage('Notification dispatched successfully! (Demo Admin Action)');
    setTitle('');
    setMessage('');
  };

  return (
    <AdminShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Notification Manager
          </h1>
          <p className="text-sm text-[#64748B] mt-1 font-sans">
            Compose and send instant trade alerts, target notifications, and report updates.
          </p>
        </div>

        <Card variant="light" hoverEffect={false} className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#E2E8F0]">
            <Bell className="w-5 h-5 text-[#0052FF]" />
            <h3 className="font-bold text-[#0F172A]">Broadcast Notification Composer</h3>
          </div>

          {sentMessage && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{sentMessage}</span>
            </div>
          )}

          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                Notification Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring"
              >
                <option value="ALL_USERS">All Users (Free & Paid)</option>
                <option value="ACTIVE_PRO">Active PRO Subscribers Only</option>
                <option value="STARTER">Starter Subscribers</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                Alert Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Target 1 Achieved 🎯"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                Alert Message *
              </label>
              <textarea
                rows={3}
                placeholder="e.g. NIFTY 24,800 CE reached Target 1 at ₹185. Trail stop loss to ₹145."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring font-sans"
                required
              />
            </div>

            <Button type="submit" variant="primary" size="md" showArrow className="w-full justify-center">
              BROADCAST NOTIFICATION NOW
            </Button>
          </form>
        </Card>
      </div>
    </AdminShell>
  );
};
