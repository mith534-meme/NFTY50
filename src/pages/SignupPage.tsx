import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { TrendingUp, Eye, EyeOff, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import type { UserProfile } from '../types/auth';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // UI Feedback State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleSignIn = async () => {
    setServerError('');
    setIsSubmitting(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) {
        const newUserProfile: UserProfile = {
          id: user.uid,
          full_name: user.displayName || 'Traders User',
          email: user.email || '',
          phone: user.phoneNumber || '',
          role: 'USER', // FORCED ROLE SECURITY
          email_verified: user.emailVerified,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_login_at: new Date().toISOString(),
          status: 'ACTIVE',
          subscription_status: 'NOT_ACTIVE',
        };
        await setDoc(userDocRef, newUserProfile);
      }

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setServerError('Sign-up cancelled.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setServerError('This domain is not authorized for Google Sign-In.');
      } else {
        setServerError('Google Sign-Up failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^[0-9+\-\s]{8,15}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid mobile number';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedTerms) {
      newErrors.terms = 'You must agree to the Terms of Service & Risk Disclosure';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // 1. Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // 2. Update Auth Display Name
      await updateProfile(user, { displayName: fullName.trim() }).catch(() => {});

      // 3. Send email verification
      await sendEmailVerification(user).catch(() => {});

      // 4. Create Firestore User Profile Record (FORCED ROLE = 'USER' SECURITY)
      const userProfile: UserProfile = {
        id: user.uid,
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role: 'USER', // FORCED ROLE SECURITY
        email_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_login_at: new Date().toISOString(),
        status: 'ACTIVE',
        subscription_status: 'NOT_ACTIVE',
      };

      await setDoc(doc(db, 'users', user.uid), userProfile);

      // Redirect to email verification page
      navigate('/verify-email');
    } catch (err: any) {
      console.error('Signup Error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setServerError('An account with this email address already exists.');
      } else if (err.code === 'auth/weak-password') {
        setServerError('Password is too weak. Please choose a stronger password.');
      } else {
        setServerError('Failed to create account. Please check your credentials and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col justify-between selection:bg-[#0052FF]/20 selection:text-[#0052FF]">
      {/* Top Header Bar */}
      <header className="border-b border-[#E2E8F0] bg-white/80 backdrop-blur-md py-4">
        <Container className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] flex items-center justify-center text-white font-bold shadow-md shadow-[#0052FF]/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
              NIFTY<span className="text-[#0052FF]">PULSE</span>
            </span>
          </Link>
          <div className="text-sm font-medium text-[#64748B]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0052FF] font-semibold hover:underline">
              Log in
            </Link>
          </div>
        </Container>
      </header>

      {/* Main Content Area */}
      <main className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
            {/* Left Column: Brand Value Proposition */}
            <div className="lg:col-span-5 space-y-6 hidden lg:block">
              <SectionLabel>WELCOME TO NIFTY PULSE</SectionLabel>
              <h1 className="font-display text-4xl font-bold tracking-tight text-[#0F172A] leading-tight">
                Start with structured <span className="text-gradient-signature">market research.</span>
              </h1>
              <p className="text-base text-[#64748B] leading-relaxed">
                Join thousands of disciplined Indian traders using data-backed daily research for NIFTY 50, BANK NIFTY & SENSEX.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0052FF] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#0F172A]">Defined entry, stop-loss and targets for every setup</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0052FF] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#0F172A]">Complete technical and derivatives rationale</span>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#0052FF] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#0F172A]">Transparent trade log with zero hype</span>
                </div>
              </div>
            </div>

            {/* Right Column: Signup Card */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 shadow-[0_12px_36px_-4px_rgba(15,23,42,0.06)]">
                <div className="mb-6 text-center lg:text-left">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
                    Create Your Account
                  </h2>
                  <p className="text-sm text-[#64748B] mt-1 font-sans">
                    Get instant access to daily F&O market research.
                  </p>
                </div>

                {/* Server Error Alert */}
                {serverError && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span>{serverError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px] ${
                        errors.fullName ? 'border-rose-400 bg-rose-50/50' : 'border-[#E2E8F0]'
                      }`}
                      autoComplete="name"
                    />
                    {errors.fullName && <p className="text-xs text-rose-600 mt-1 font-mono">{errors.fullName}</p>}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px] ${
                        errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-[#E2E8F0]'
                      }`}
                      autoComplete="email"
                    />
                    {errors.email && <p className="text-xs text-rose-600 mt-1 font-mono">{errors.email}</p>}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px] ${
                        errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-[#E2E8F0]'
                      }`}
                      autoComplete="tel"
                    />
                    {errors.phone && <p className="text-xs text-rose-600 mt-1 font-mono">{errors.phone}</p>}
                  </div>

                  {/* Password Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Min 6 characters"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`w-full px-4 py-3 pr-10 rounded-xl border text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px] ${
                            errors.password ? 'border-rose-400 bg-rose-50/50' : 'border-[#E2E8F0]'
                          }`}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] p-1"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-xs text-rose-600 mt-1 font-mono">{errors.password}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                        Confirm Password *
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px] ${
                          errors.confirmPassword ? 'border-rose-400 bg-rose-50/50' : 'border-[#E2E8F0]'
                        }`}
                        autoComplete="new-password"
                      />
                      {errors.confirmPassword && (
                        <p className="text-xs text-rose-600 mt-1 font-mono">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedTerms}
                        onChange={(e) => setAgreedTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#0052FF] rounded border-[#E2E8F0] focus-ring cursor-pointer"
                      />
                      <span className="text-xs text-[#64748B] leading-normal font-sans">
                        I agree to the{' '}
                        <a href="#terms" className="text-[#0052FF] underline">
                          Terms of Service
                        </a>
                        ,{' '}
                        <a href="#privacy" className="text-[#0052FF] underline">
                          Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a href="#risk-disclosure" className="text-[#0052FF] underline">
                          Risk Disclosure Document
                        </a>
                        .
                      </span>
                    </label>
                    {errors.terms && <p className="text-xs text-rose-600 mt-1 font-mono">{errors.terms}</p>}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    showArrow
                    disabled={isSubmitting}
                    className="w-full justify-center mt-4"
                  >
                    {isSubmitting ? 'Creating Account...' : 'CREATE ACCOUNT'}
                  </Button>
                </form>

                {/* OR Divider */}
                <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E2E8F0]" />
                  </div>
                  <div className="relative inline-block px-3 bg-white text-[11px] font-mono text-[#64748B] uppercase">
                    or continue with
                  </div>
                </div>

                {/* Google Sign In Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50 text-sm font-semibold text-[#0F172A] transition-colors focus-ring cursor-pointer min-h-[44px]"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign up with Google</span>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-[#E2E8F0] py-6 text-center text-xs font-mono text-[#64748B]">
        <Container>
          © {new Date().getFullYear()} NIFTY PULSE. Secure 256-bit SSL encrypted.
        </Container>
      </footer>
    </div>
  );
};
