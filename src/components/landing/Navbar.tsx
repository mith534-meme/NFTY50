import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Menu, X, TrendingUp } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm py-3'
          : 'bg-[#FAFAFA]/80 backdrop-blur-sm border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group focus-ring rounded-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] flex items-center justify-center text-white shadow-md shadow-[#0052FF]/20 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
                NIFTY<span className="text-[#0052FF]">PULSE</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-[#0052FF] animate-pulse" />
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#64748B] hover:text-[#0052FF] transition-colors focus-ring rounded-md px-1 py-0.5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-[#0F172A] hover:text-[#0052FF] transition-colors px-3 py-2 focus-ring rounded-lg"
            >
              Login
            </Link>
            <Button href="/signup" variant="primary" size="md" showArrow>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#0F172A] hover:bg-slate-100 focus-ring min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 pb-6 border-t border-[#E2E8F0] bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#0F172A] hover:text-[#0052FF] p-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-[#E2E8F0] flex flex-col space-y-3">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center font-medium text-[#0F172A] py-3 rounded-xl hover:bg-slate-50 border border-[#E2E8F0]"
              >
                Login
              </Link>
              <Button
                href="/signup"
                variant="primary"
                size="md"
                showArrow
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};
