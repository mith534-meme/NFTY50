import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/admin/AdminRoute';

// Landing Page Components
import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { TrustStrip } from './components/landing/TrustStrip';
import { Features } from './components/landing/Features';
import { HowItWorks } from './components/landing/HowItWorks';
import { SampleTrade } from './components/landing/SampleTrade';
import { Transparency } from './components/landing/Transparency';
import { Pricing } from './components/landing/Pricing';
import { FAQ } from './components/landing/FAQ';
import { FinalCTA } from './components/landing/FinalCTA';
import { Footer } from './components/landing/Footer';

// Auth Pages
import { SignupPage } from './pages/SignupPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { RiskDisclosurePage } from './pages/RiskDisclosurePage';

// User Dashboard Pages
import { MainDashboard } from './pages/dashboard/MainDashboard';
import { TradesPage } from './pages/dashboard/TradesPage';
import { TradeDetailPage } from './pages/dashboard/TradeDetailPage';
import { TradeHistoryPage } from './pages/dashboard/TradeHistoryPage';
import { ReportsPage } from './pages/dashboard/ReportsPage';
import { NotificationsPage } from './pages/dashboard/NotificationsPage';
import { SubscriptionPage } from './pages/dashboard/SubscriptionPage';
import { ProfilePage } from './pages/ProfilePage';

// Admin Console Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminUnauthorizedPage } from './pages/admin/AdminUnauthorizedPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminUserDetailPage } from './pages/admin/AdminUserDetailPage';
import { AdminSubscriptionsPage } from './pages/admin/AdminSubscriptionsPage';
import { AdminTradesPage } from './pages/admin/AdminTradesPage';
import { AdminCreateTradePage } from './pages/admin/AdminCreateTradePage';
import { AdminTradeReviewPage } from './pages/admin/AdminTradeReviewPage';
import { AdminTradeDetailPage } from './pages/admin/AdminTradeDetailPage';
import { AdminResearchPage } from './pages/admin/AdminResearchPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';

// Public Landing Page Component
const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] selection:bg-[#0052FF]/20 selection:text-[#0052FF] font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Features />
        <HowItWorks />
        <SampleTrade />
        <Transparency />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/risk-disclosure" element={<RiskDisclosurePage />} />

          {/* Admin Authentication & Restricted Access Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/unauthorized" element={<AdminUnauthorizedPage />} />

          {/* Protected User Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/trades"
            element={
              <ProtectedRoute>
                <TradesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/trades/:tradeId"
            element={
              <ProtectedRoute>
                <TradeDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/trade-history"
            element={
              <ProtectedRoute>
                <TradeHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/reports"
            element={
              <ProtectedRoute>
                <ReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/subscription"
            element={
              <ProtectedRoute>
                <SubscriptionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Console Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsersPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users/:userId"
            element={
              <AdminRoute>
                <AdminUserDetailPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/subscriptions"
            element={
              <AdminRoute>
                <AdminSubscriptionsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/trades"
            element={
              <AdminRoute>
                <AdminTradesPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/trades/new"
            element={
              <AdminRoute>
                <AdminCreateTradePage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/trades/create"
            element={
              <AdminRoute>
                <AdminCreateTradePage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/trades/:tradeId/review"
            element={
              <AdminRoute>
                <AdminTradeReviewPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/trades/:tradeId"
            element={
              <AdminRoute>
                <AdminTradeDetailPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/research"
            element={
              <AdminRoute>
                <AdminResearchPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <AdminRoute>
                <AdminReportsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/notifications"
            element={
              <AdminRoute>
                <AdminNotificationsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/audit-logs"
            element={
              <AdminRoute>
                <AdminAuditLogsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminRoute>
                <AdminSettingsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <AdminRoute>
                <AdminProfilePage />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
