import React from 'react';
import { AdminShell } from '../../components/admin/AdminShell';
import { Card } from '../../components/ui/Card';
import { Globe, Sliders } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  return (
    <AdminShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Platform Settings & Configuration
          </h1>
          <p className="text-sm text-[#64748B] mt-1 font-sans">
            Configure platform parameters, trading session defaults, and security settings.
          </p>
        </div>

        <Card variant="light" hoverEffect={false} className="p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#E2E8F0]">
            <Globe className="w-5 h-5 text-[#0052FF]" />
            <h3 className="font-bold text-[#0F172A]">Platform Info</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-[#64748B] uppercase mb-1">Platform Name</label>
              <input
                type="text"
                value="NIFTY PULSE"
                readOnly
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] bg-slate-100 font-bold"
              />
            </div>
            <div>
              <label className="block text-[#64748B] uppercase mb-1">Support Email</label>
              <input
                type="email"
                value="support@niftypulse.in"
                readOnly
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] bg-slate-100 font-bold"
              />
            </div>
          </div>
        </Card>

        <Card variant="light" hoverEffect={false} className="p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#E2E8F0]">
            <Sliders className="w-5 h-5 text-[#0052FF]" />
            <h3 className="font-bold text-[#0F172A]">Trading Session Defaults</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-[#64748B] uppercase mb-1">Default Market Indices</label>
              <input
                type="text"
                value="NIFTY 50, BANK NIFTY, SENSEX"
                readOnly
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] bg-slate-100 font-bold"
              />
            </div>
            <div>
              <label className="block text-[#64748B] uppercase mb-1">Session Timezone</label>
              <input
                type="text"
                value="Asia/Kolkata (IST)"
                readOnly
                className="w-full px-3 py-2 rounded-lg border border-[#E2E8F0] bg-slate-100 font-bold"
              />
            </div>
          </div>
        </Card>
      </div>
    </AdminShell>
  );
};
