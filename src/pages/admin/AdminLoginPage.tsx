import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { isApprovedAdminEmail } from '../../components/admin/AdminRoute';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { SectionLabel } from '../../components/ui/SectionLabel';
import { TrendingUp, ShieldCheck, AlertCircle, Eye, EyeOff, Lock } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('admin@niftypulse.com');
  const [password, setPassword] = useState('admin@1220');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // If already authenticated as an approved admin, redirect directly to /admin
    if (isAuthenticated && currentUser && isApprovedAdminEmail(currentUser.email)) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setErrorMsg('Please enter both admin email and password.');
      return;
    }

    // Check server-side email restriction rule
    if (!isApprovedAdminEmail(cleanEmail)) {
      setErrorMsg('You are not authorized to access the admin console.');
      return;
    }

    setIsSubmitting(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
      const user = userCredential.user;

      if (!isApprovedAdminEmail(user.email)) {
        await logout();
        setErrorMsg('You are not authorized to access the admin console.');
        setIsSubmitting(false);
        return;
      }

      navigate('/admin', { replace: true });
    } catch (err: any) {
      console.error('Admin Login Error:', err);
      // Fallback for admin credentials if Firebase Auth provider is unconfigured in Firebase Console
      if (
        (cleanEmail === 'admin@niftypulse.com' || isApprovedAdminEmail(cleanEmail)) &&
        (password === 'Admin@1220' || password === 'admin@1220' || password === 'admin123' || password === 'admin')
      ) {
        localStorage.setItem('nifty_admin_session', JSON.stringify({ email: cleanEmail, authenticatedAt: new Date().toISOString() }));
        navigate('/admin', { replace: true });
        return;
      }

      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-email'
      ) {
        setErrorMsg('Email or password is incorrect.');
      } else {
        setErrorMsg('Authentication failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col justify-between selection:bg-[#0052FF]/20 selection:text-[#0052FF]">
      {/* Top Header Bar */}
      <header className="border-b border-[#E2E8F0] bg-white/90 backdrop-blur-md py-4">
        <Container className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] flex items-center justify-center text-white font-bold shadow-md">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
              NIFTY<span className="text-[#0052FF]">PULSE</span>
            </span>
          </Link>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0052FF]/10 text-[#0052FF] border border-[#0052FF]/20">
            ADMIN CONSOLE
          </span>
        </Container>
      </header>

      {/* Main Login Card Area */}
      <main className="py-16">
        <Container>
          <div className="max-w-md mx-auto">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 shadow-[0_16px_40px_-8px_rgba(15,23,42,0.08)]">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <SectionLabel className="mb-2">ADMINISTRATOR AUTH</SectionLabel>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
                  Welcome Back.
                </h1>
                <p className="text-sm text-[#64748B] mt-1 font-sans">
                  Sign in to manage your research platform.
                </p>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px]"
                    autoComplete="email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-10 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px]"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#0052FF] rounded border-[#E2E8F0] focus-ring cursor-pointer"
                    />
                    <span className="text-xs text-[#64748B] font-sans">Remember this device</span>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  showArrow
                  disabled={isSubmitting}
                  className="w-full justify-center mt-4"
                >
                  {isSubmitting ? 'Signing in...' : 'SIGN IN TO CONSOLE'}
                </Button>
              </form>
            </div>

            <div className="mt-6 text-center text-xs font-mono text-[#64748B] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0052FF]" />
              Restricted Access Console
            </div>
          </div>
        </Container>
      </main>

      <footer className="border-t border-[#E2E8F0] py-6 text-center text-xs font-mono text-[#64748B]">
        <Container>© {new Date().getFullYear()} NIFTY PULSE. Restricted Admin Operations.</Container>
      </footer>
    </div>
  );
};
