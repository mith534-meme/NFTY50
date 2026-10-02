import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile as updateFirebaseProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { TrendingUp, CheckCircle2, ArrowLeft, LogOut, Lock } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { userProfile, currentUser, logout, refreshUserProfile } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(userProfile?.full_name || currentUser?.displayName || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.full_name);
      setPhone(userProfile.phone);
    }
  }, [userProfile]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Full name cannot be empty.');
      return;
    }

    setIsUpdating(true);
    try {
      if (auth.currentUser) {
        await updateFirebaseProfile(auth.currentUser, { displayName: fullName.trim() });
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          full_name: fullName.trim(),
          phone: phone.trim(),
          updated_at: new Date().toISOString(),
        });
        await refreshUserProfile();
        setSuccessMsg('Profile details updated successfully.');
      }
    } catch (err: any) {
      console.error('Update profile error:', err);
      setErrorMsg('Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('nifty_user_session');
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col justify-between selection:bg-[#0052FF]/20 selection:text-[#0052FF]">
      {/* Sticky Header */}
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
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0052FF] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              BACK TO DASHBOARD
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

      {/* Main Profile Area */}
      <main className="py-12 sm:py-16">
        <Container>
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 shadow-sm">
              <div className="flex items-center gap-4 pb-6 border-b border-[#E2E8F0] mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white flex items-center justify-center font-bold text-2xl shadow-md">
                  {(fullName || 'U').charAt(0).toUpperCase()}
                </div>
                <div>
                  <SectionLabel className="mb-1">ACCOUNT PROFILE</SectionLabel>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
                    {fullName || 'Trader Profile'}
                  </h1>
                  <p className="text-xs font-mono text-[#64748B] mt-0.5">
                    Member since {userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString('en-IN') : '2026'}
                  </p>
                </div>
              </div>

              {/* Status Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <div className="bg-slate-50 p-3 rounded-xl border border-[#E2E8F0]">
                  <p className="text-[10px] font-mono text-[#64748B] uppercase">Role</p>
                  <p className="text-xs font-mono font-bold text-[#0F172A] mt-0.5">{userProfile?.role || 'USER'}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-[#E2E8F0]">
                  <p className="text-[10px] font-mono text-[#64748B] uppercase">Account Status</p>
                  <p className="text-xs font-mono font-bold text-emerald-600 mt-0.5">{userProfile?.status || 'ACTIVE'}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-[#E2E8F0]">
                  <p className="text-[10px] font-mono text-[#64748B] uppercase">Subscription</p>
                  <p className="text-xs font-mono font-bold text-amber-600 mt-0.5">{userProfile?.subscription_status || 'NOT_ACTIVE'}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-[#E2E8F0]">
                  <p className="text-[10px] font-mono text-[#64748B] uppercase">Email Verification</p>
                  <p className="text-xs font-mono font-bold text-emerald-600 mt-0.5">VERIFIED</p>
                </div>
              </div>

              {/* Feedback Notifications */}
              {successMsg && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono">
                  {errorMsg}
                </div>
              )}

              {/* Profile Edit Form */}
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5 flex items-center justify-between">
                    <span>Email Address (Read-Only)</span>
                    <Lock className="w-3 h-3 text-[#64748B]" />
                  </label>
                  <input
                    type="email"
                    value={currentUser?.email || ''}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm bg-slate-100 text-[#64748B] cursor-not-allowed min-h-[44px]"
                  />
                  <p className="text-[10px] font-mono text-[#64748B] mt-1">
                    Email address cannot be changed directly for security reasons.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-[#0F172A] uppercase mb-1.5">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm bg-[#FAFAFA] text-[#0F172A] focus-ring min-h-[44px]"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isUpdating}
                  className="w-full justify-center mt-6"
                >
                  {isUpdating ? 'Saving Changes...' : 'SAVE CHANGES'}
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </main>

      <footer className="border-t border-[#E2E8F0] py-6 text-center text-xs font-mono text-[#64748B]">
        <Container>© {new Date().getFullYear()} NIFTY PULSE. User Profile & Preferences.</Container>
      </footer>
    </div>
  );
};
