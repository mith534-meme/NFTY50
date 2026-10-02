import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container } from '../components/ui/Container';
import { SectionLabel } from '../components/ui/SectionLabel';
import { TrendingUp, LogOut, ShieldCheck, Activity, AlertTriangle } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { userProfile, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const displayName = userProfile?.full_name || currentUser?.displayName || 'Trader';
  const subscriptionStatus = userProfile?.subscription_status || 'NOT_ACTIVE';

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col justify-between selection:bg-[#0052FF]/20 selection:text-[#0052FF]">
      {/* Dashboard Sticky Header */}
      <header className="border-b border-[#E2E8F0] bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <Container className="flex items-center justify-between py-4">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] flex items-center justify-center text-white font-bold shadow-md shadow-[#0052FF]/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
              NIFTY<span className="text-[#0052FF]">PULSE</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#0F172A] hover:text-[#0052FF] px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center font-bold text-xs">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline">{displayName}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2 rounded-xl transition-colors cursor-pointer min-h-[44px]"
            >
              <LogOut className="w-4 h-4" />
              <span>LOGOUT</span>
            </button>
          </div>
        </Container>
      </header>

      {/* Main Content Body */}
      <main className="py-12 sm:py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Welcome Banner */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
                <div>
                  <SectionLabel className="mb-2">TRADER DASHBOARD</SectionLabel>
                  <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F172A]">
                    Welcome, {displayName}
                  </h1>
                  <p className="text-sm text-[#64748B] mt-1 font-sans">
                    Logged in as <strong className="text-[#0F172A] font-semibold">{currentUser?.email}</strong>
                  </p>
                </div>

                {/* Subscription Status Pill */}
                <div className="bg-slate-50 border border-[#E2E8F0] rounded-2xl p-4 text-right shrink-0 min-w-[200px]">
                  <p className="text-[11px] font-mono text-[#64748B] uppercase font-bold">
                    SUBSCRIPTION STATUS
                  </p>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="font-mono text-base font-bold text-amber-600">
                      {subscriptionStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Placeholder Notice */}
              <div className="pt-8 text-center py-12 bg-[#FAFAFA] rounded-2xl border border-dashed border-[#E2E8F0] my-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#0F172A] mb-2">
                  Your trading research dashboard will appear here.
                </h3>
                <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
                  Daily F&O trade setups, NIFTY 50 / BANK NIFTY market research, and live level updates will be activated in upcoming features.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 text-amber-800 border border-amber-500/20 text-xs font-mono">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>STEP 2 COMPLETED: Authentication & User Session Active</span>
                </div>
              </div>

              {/* Account Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
                  <p className="text-[10px] font-mono text-[#64748B] uppercase">ACCOUNT ROLE</p>
                  <p className="text-sm font-mono font-bold text-[#0F172A] mt-1">
                    {userProfile?.role || 'USER'}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
                  <p className="text-[10px] font-mono text-[#64748B] uppercase">EMAIL VERIFICATION</p>
                  <p className="text-sm font-mono font-bold text-emerald-600 mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> VERIFIED
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
                  <p className="text-[10px] font-mono text-[#64748B] uppercase">PROFILE ACTIONS</p>
                  <Link
                    to="/profile"
                    className="text-sm font-mono font-bold text-[#0052FF] hover:underline mt-1 inline-block"
                  >
                    View / Edit Profile →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] py-6 text-center text-xs font-mono text-[#64748B]">
        <Container>© {new Date().getFullYear()} NIFTY PULSE. Authenticated Member Dashboard.</Container>
      </footer>
    </div>
  );
};
