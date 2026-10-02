import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  size?: 'md' | 'lg';
  showArrow?: boolean;
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  showArrow = false,
  children,
  className = '',
  href,
  ...props
}) => {
  const baseStyles =
    'group relative inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] focus-visible:ring-offset-2 active:scale-[0.98] select-none min-h-[44px] cursor-pointer';

  const sizes = {
    md: 'px-5 py-2.5 text-sm sm:text-base',
    lg: 'px-6 py-3.5 text-base sm:text-lg font-semibold',
  };

  const variants = {
    primary:
      'bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white shadow-md shadow-[#0052FF]/20 hover:shadow-lg hover:shadow-[#0052FF]/30 hover:-translate-y-0.5 hover:brightness-105 border border-transparent',
    secondary:
      'bg-white hover:bg-slate-50 text-[#0F172A] border border-[#E2E8F0] shadow-sm hover:border-[#0052FF]/40 hover:text-[#0052FF] hover:-translate-y-0.5',
    outline:
      'bg-transparent hover:bg-[#0052FF]/5 text-[#0052FF] border border-[#0052FF]/30 hover:border-[#0052FF]',
    dark:
      'bg-white text-[#0F172A] hover:bg-slate-100 shadow-md shadow-black/20 hover:-translate-y-0.5 font-semibold',
  };

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {content}
    </button>
  );
};
