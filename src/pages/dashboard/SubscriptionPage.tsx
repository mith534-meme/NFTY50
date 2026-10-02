import React from 'react';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { SubscriptionCard } from '../../components/dashboard/SubscriptionCard';
import { Pricing } from '../../components/landing/Pricing';

export const SubscriptionPage: React.FC = () => {
  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Subscription & Membership
          </h1>
          <p className="text-sm text-[#64748B] mt-1 font-sans">
            Manage your research subscription plan, billing details, and active index access.
          </p>
        </div>

        <div className="max-w-2xl">
          <SubscriptionCard />
        </div>

        {/* Pricing Plans Overview */}
        <div className="pt-6 border-t border-[#E2E8F0]">
          <h2 className="font-display text-xl font-bold text-[#0F172A] mb-4">
            Available Subscription Tier Options
          </h2>
          <Pricing />
        </div>
      </div>
    </DashboardShell>
  );
};
