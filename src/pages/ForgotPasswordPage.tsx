import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { TrendingUp, KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (err) {
      // Do not reveal whether email exists for security (Section 9)
      console.warn('Password reset attempt:', err);
    } finally {
      setIsSubmitting(false);
      setIsSent(true); // Always show check email screen
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col justify-between selection:bg-[#0052FF]/20 selection:text-[#0052FF]">
      {/* Header */}
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

      {/* Main Content */}
      <main className="py-16">
        <Container>
          <div className="max-w-md mx-auto bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 shadow-[0_12px_36px_-4px_rgba(15,23,42,0.06)]">
            <div className="w-14 h-14 rounded-2xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center mx-auto mb-6">
              <KeyRound className="w-7 h-7" />
            </div>

            <div className="text-center mb-6">
              <SectionLabel className="mb-2">PASSWORD RECOVERY</SectionLabel>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
                Forgot Your Password?
              </h1>
              <p className="text-sm text-[#64748B] mt-1 font-sans">
                Enter your email address and we'll send you a password reset link.
              </p>
            </div>

            {isSent ? (
              <div className="space-y-6 text-center">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-start gap-3 text-left">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold block mb-1">Reset Link Dispatched</strong>
                    Check your email for a password reset link. Follow the instructions in the email to update your password.
                  </div>
                </div>

                <Button href="/login" variant="primary" size="lg" className="w-full justify-center">
                  RETURN TO LOGIN
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  showArrow
                  disabled={isSubmitting}
                  className="w-full justify-center mt-4"
                >
                  {isSubmitting ? 'Sending link...' : 'SEND RESET LINK'}
                </Button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-[#E2E8F0] text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-xs font-mono font-semibold text-[#64748B] hover:text-[#0052FF]"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                Back to Login
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <footer className="border-t border-[#E2E8F0] py-6 text-center text-xs font-mono text-[#64748B]">
        <Container>© {new Date().getFullYear()} NIFTY PULSE. Password Recovery.</Container>
      </footer>
    </div>
  );
};
