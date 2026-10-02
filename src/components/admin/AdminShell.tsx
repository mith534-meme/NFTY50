import React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminMobileNav } from './AdminMobileNav';
import { AdminHeader } from './AdminHeader';

interface AdminShellProps {
  children: React.ReactNode;
}

export const AdminShell: React.FC<AdminShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] flex flex-col lg:flex-row selection:bg-[#0052FF]/20 selection:text-[#0052FF] font-sans antialiased">
      {/* Mobile Header & Drawer */}
      <AdminMobileNav />

      {/* Desktop Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="hidden lg:block">
          <AdminHeader />
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {children}
        </main>

        <footer className="border-t border-[#E2E8F0] bg-white py-4 px-6 text-center text-xs font-mono text-[#64748B]">
          © {new Date().getFullYear()} NIFTY PULSE. Restricted Administrator Operations Workspace.
        </footer>
      </div>
    </div>
  );
};
