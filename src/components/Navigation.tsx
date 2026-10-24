import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import arenovaLogo from '../../arenova.png';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  scrollProgress: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  scrollProgress,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'awakening', label: 'Awakening' },
    { id: 'problem', label: 'The Problem' },
    { id: 'transformation', label: 'Transformation' },
    { id: 'services', label: 'Services' },
    { id: 'workflow-demo', label: 'System Demo' },
    { id: 'industries', label: 'Industries' },
    { id: 'approach', label: 'Approach' },
    { id: 'ascent', label: 'The Ascent' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-[#111110]/85 backdrop-blur-md border-b border-[#F3F0E8]/10 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* BRAND WORDMARK */}
          <button
            onClick={() => onNavigate('awakening')}
            className="group flex items-center gap-3.5 text-left cursor-pointer focus:outline-none"
          >
            <img
              src={arenovaLogo}
              alt=""
              aria-hidden="true"
              className="h-8 w-9 rounded-md border border-[#E84B2C]/35 object-contain transition-transform group-hover:scale-105 duration-300"
            />
            <div className="flex flex-col">
              <span className="font-display tracking-[0.22em] text-lg sm:text-xl font-bold text-[#F3F0E8] group-hover:text-white transition-colors">
                ARENOVA
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#9E9B93] group-hover:text-[#E84B2C] transition-colors">
                AI & Automation
              </span>
            </div>
          </button>

          {/* DESKTOP NARRATIVE NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-[#181716]/70 border border-[#F3F0E8]/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative px-3 py-1 text-xs tracking-wider uppercase transition-all duration-200 rounded-full cursor-pointer ${
                    isActive
                      ? 'text-[#F3F0E8] font-semibold bg-[#E84B2C]/20 border border-[#E84B2C]/40 shadow-sm shadow-[#E84B2C]/20'
                      : 'text-[#A39E93] hover:text-[#F3F0E8] hover:bg-[#F3F0E8]/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E84B2C]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT ACTION: TELEMETRY & CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#161514] border border-[#F3F0E8]/08 text-[11px] text-[#A39E93]">
              <Sparkles className="w-3 h-3 text-[#E84B2C]" />
              <span className="font-mono">FLIGHT: {Math.round(scrollProgress * 100)}%</span>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="btn-cinematic px-5 py-2.5 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#F3F0E8] font-medium text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#E84B2C]/25 hover:shadow-[#E84B2C]/40 flex items-center gap-2 cursor-pointer"
            >
              <span>Build your advantage</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onNavigate('contact')}
              className="px-3 py-1.5 rounded-full bg-[#E84B2C] text-[#F3F0E8] text-[10px] uppercase tracking-wider font-semibold"
            >
              Build
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#1A1918] text-[#F3F0E8] border border-[#F3F0E8]/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#111110]/95 backdrop-blur-2xl pt-24 px-6 flex flex-col justify-between pb-10">
          <div className="flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#9E9B93] mb-2 font-mono">
              Narrative Path
            </p>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between text-left py-2.5 border-b border-[#F3F0E8]/08 text-base font-display text-[#F3F0E8] hover:text-[#E84B2C] transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#A39E93]" />
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#F3F0E8]/10">
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 rounded-full bg-[#E84B2C] text-center text-sm font-semibold text-[#F3F0E8] uppercase tracking-wider shadow-lg shadow-[#E84B2C]/25"
            >
              Build your advantage
            </button>
            <p className="text-center text-xs text-[#A39E93]">
              AI Operations & Growth Systems
            </p>
          </div>
        </div>
      )}
    </>
  );
};
