import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Mail, RefreshCw, ArrowLeft, TrendingUp } from 'lucide-react';

export const VerifyEmailPage: React.FC = () => {
  const { currentUser, resendVerificationEmail, refreshUserProfile } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    setMessage('');
    try {
      await resendVerificationEmail();
      setMessage('Verification email sent! Please check your inbox and spam folder.');
    } catch (err: any) {
      setMessage('Failed to resend email. Please try again in a few moments.');
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckStatus = async () => {
    setIsChecking(true);
    try {
      await refreshUserProfile();
      if (currentUser?.emailVerified) {
        navigate('/dashboard');
      } else {
        setMessage('Email is not verified yet. Please click the link in your email.');
      }
    } catch (err) {
      setMessage('Error checking verification status.');
    } finally {
      setIsChecking(false);
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

      {/* Main Container */}
      <main className="py-16">
        <Container>
          <div className="max-w-md mx-auto bg-white border border-[#E2E8F0] rounded-2xl p-8 sm:p-10 shadow-[0_12px_36px_-4px_rgba(15,23,42,0.06)] text-center">
            {/* Mail Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Mail className="w-8 h-8" />
            </div>

            {/* Title */}
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] mb-3">
              Check Your Email
            </h1>

            {/* Subtext */}
            <p className="text-sm text-[#64748B] leading-relaxed mb-6 font-sans">
              Your account has been created. We've sent a verification link to{' '}
              <strong className="text-[#0F172A] font-semibold">
                {currentUser?.email || 'your email address'}
              </strong>
              . Please verify your email before continuing.
            </p>

            {/* Alert Message */}
            {message && (
              <div className="mb-6 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono">
                {message}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                onClick={handleCheckStatus}
                disabled={isChecking}
                className="w-full justify-center"
              >
                {isChecking ? 'Checking status...' : 'I HAVE VERIFIED MY EMAIL →'}
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={handleResend}
                disabled={isResending}
                className="w-full justify-center text-xs"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isResending ? 'animate-spin' : ''}`} />
                RESEND VERIFICATION EMAIL
              </Button>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-[#E2E8F0]" />

            {/* Back to Login */}
            <Link
              to="/login"
              className="inline-flex items-center text-xs font-mono font-semibold text-[#64748B] hover:text-[#0052FF] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              BACK TO LOGIN
            </Link>
          </div>
        </Container>
      </main>

      <footer className="border-t border-[#E2E8F0] py-6 text-center text-xs font-mono text-[#64748B]">
        <Container>© {new Date().getFullYear()} NIFTY PULSE. Account Verification.</Container>
      </footer>
    </div>
  );
};
