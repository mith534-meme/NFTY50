import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { ShieldAlert, ArrowLeft, TrendingUp } from 'lucide-react';

export const AdminUnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col justify-between selection:bg-[#0052FF]/20 selection:text-[#0052FF]">
      <header className="border-b border-[#E2E8F0] bg-white/80 backdrop-blur-md py-4">
        <Container className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] flex items-center justify-center text-white font-bold shadow-md shadow-[#0052FF]/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
              NIFTY<span className="text-[#0052FF]">PULSE</span>
            </span>
          </Link>
        </Container>
      </header>

      <main className="py-16">
        <Container>
          <div className="max-w-md mx-auto bg-white border border-rose-200 rounded-2xl p-8 sm:p-10 shadow-xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] mb-3">
              Access Restricted
            </h1>

            <p className="text-sm text-[#64748B] leading-relaxed mb-6 font-sans">
              Your account does not have permission to access the administrator console. Admin access is strictly limited to authorized personnel.
            </p>

            <Button href="/dashboard" variant="primary" size="lg" className="w-full justify-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to User Dashboard
            </Button>
          </div>
        </Container>
      </main>

      <footer className="border-t border-[#E2E8F0] py-6 text-center text-xs font-mono text-[#64748B]">
        <Container>© {new Date().getFullYear()} NIFTY PULSE. Access Control System.</Container>
      </footer>
    </div>
  );
};
