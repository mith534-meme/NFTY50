import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  darkBg?: boolean;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children, darkBg = false, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase border transition-all duration-300 ${
        darkBg
          ? 'bg-[#0052FF]/10 text-[#4D7CFF] border-[#0052FF]/30 shadow-sm'
          : 'bg-[#0052FF]/5 text-[#0052FF] border-[#0052FF]/20 shadow-sm'
      } ${className}`}
    >
      <span className="w-2 h-2 rounded-full bg-[#0052FF] animate-pulse" />
      <span>{children}</span>
    </div>
  );
};
