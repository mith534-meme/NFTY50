import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { demoNotifications } from '../../data/demoNotifications';
import { Bell, Zap, Target, AlertOctagon, FileText } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'SETUP':
        return <Zap className="w-5 h-5 text-[#0052FF]" />;
      case 'TARGET':
        return <Target className="w-5 h-5 text-emerald-600" />;
      case 'STOP_LOSS':
        return <AlertOctagon className="w-5 h-5 text-rose-600" />;
      case 'REPORT':
        return <FileText className="w-5 h-5 text-[#0052FF]" />;
      default:
        return <Bell className="w-5 h-5 text-[#0052FF]" />;
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Notification Center
          </h1>
          <p className="text-sm text-[#64748B] mt-1 font-sans">
            Real-time trade setup alerts, trigger notifications, target updates, and market reports.
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm space-y-4">
          {demoNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-xl border flex items-start gap-4 transition-colors ${
                notif.isRead
                  ? 'bg-white border-[#E2E8F0]'
                  : 'bg-[#0052FF]/5 border-[#0052FF]/20 shadow-sm'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-slate-100 shrink-0">{getIcon(notif.type)}</div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#0F172A] text-sm">{notif.title}</h4>
                  <span className="text-[11px] font-mono text-[#64748B]">{notif.timestamp}</span>
                </div>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed font-sans">
                  {notif.message}
                </p>
                {notif.link && (
                  <Link
                    to={notif.link}
                    className="inline-block mt-2 text-xs font-mono font-bold text-[#0052FF] hover:underline"
                  >
                    View Details →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
};
