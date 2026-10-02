import React from 'react';
import { Sidebar } from './Sidebar';
import { MobileNavigation } from './MobileNavigation';
import { DashboardHeader } from './DashboardHeader';

interface DashboardShellProps {
  children: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col lg:flex-row selection:bg-[#0052FF]/20 selection:text-[#0052FF] font-sans antialiased">
      {/* Mobile Top Header & Slide-out Navigation Drawer */}
      <MobileNavigation />

      {/* Desktop Sticky Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Desktop Header Bar */}
        <div className="hidden lg:block">
          <DashboardHeader />
        </div>

        {/* Page Body Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {children}
        </main>

        {/* Dashboard Footer */}
        <footer className="border-t border-[#E2E8F0] bg-white py-4 px-6 text-center text-xs font-mono text-[#64748B]">
          © {new Date().getFullYear()} NIFTY PULSE. Subscriber Workspace (DEMO DATA).
        </footer>
      </div>
    </div>
  );
};
