import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 space-y-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-5 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-200 rounded w-1/4" />
      </div>
      <div className="h-8 bg-slate-200 rounded w-1/2" />
      <div className="h-4 bg-slate-200 rounded w-full" />
      <div className="h-10 bg-slate-200 rounded w-full" />
    </div>
  );
};

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <CardSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
};
