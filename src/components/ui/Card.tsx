import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | 'glass';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'light',
  hoverEffect = true,
}) => {
  const variants = {
    light: 'bg-white border border-[#E2E8F0] text-[#0F172A] shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)]',
    dark: 'bg-[#1E293B]/80 border border-slate-700/60 text-white shadow-xl shadow-black/20 backdrop-blur-sm',
    glass: 'bg-white/80 border border-[#E2E8F0] backdrop-blur-md text-[#0F172A] shadow-md',
  };

  const hoverStyles = hoverEffect
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-4px_rgba(0,82,255,0.12)] hover:border-[#0052FF]/30'
    : '';

  return (
    <div className={`rounded-2xl p-6 sm:p-8 ${variants[variant]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};
