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
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* BRAND LOGO */}
          <a
            href="#awakening"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('awakening');
            }}
            className="group flex items-center justify-center shrink-0 cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-105"
            aria-label="ARENOVA Home"
          >
            <img
              src={arenovaLogo}
              alt="ARENOVA Logo"
              width="48"
              height="48"
              className="h-11 sm:h-14 w-auto object-contain drop-shadow-[0_0_16px_rgba(232,75,44,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_24px_rgba(232,75,44,0.65)]"
            />
          </a>

          {/* DESKTOP NARRATIVE NAVIGATION - LINEAR & NON-WRAPPING */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-full bg-[#181716]/80 border border-[#F3F0E8]/10 backdrop-blur-md shrink-0 shadow-lg shadow-black/25"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(link.id);
                  }}
                  className={`relative px-2 xl:px-3 py-1 text-[10.5px] xl:text-[11.5px] tracking-wider uppercase whitespace-nowrap transition-all duration-200 rounded-full cursor-pointer shrink-0 ${
                    isActive
                      ? 'text-[#F3F0E8] font-semibold bg-[#E84B2C]/20 border border-[#E84B2C]/40 shadow-sm shadow-[#E84B2C]/20'
                      : 'text-[#A39E93] hover:text-[#F3F0E8] hover:bg-[#F3F0E8]/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E84B2C]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* RIGHT ACTION: TELEMETRY & CTA */}
          <div className="hidden sm:flex items-center gap-2.5 xl:gap-3 shrink-0">
            <div className="hidden 2xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#161514] border border-[#F3F0E8]/08 text-[11px] text-[#A39E93]">
              <Sparkles className="w-3 h-3 text-[#E84B2C]" />
              <span className="font-mono">FLIGHT: {Math.round(scrollProgress * 100)}%</span>
            </div>

            <a
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('contact');
              }}
              className="btn-cinematic px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#F3F0E8] font-medium text-[10.5px] xl:text-xs tracking-wider uppercase whitespace-nowrap transition-all shadow-lg shadow-[#E84B2C]/25 hover:shadow-[#E84B2C]/40 flex items-center gap-1.5 xl:gap-2 cursor-pointer"
            >
              <span>Build your advantage</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('contact');
              }}
              className="px-3 py-1.5 rounded-full bg-[#E84B2C] text-[#F3F0E8] text-[10px] uppercase tracking-wider font-semibold"
            >
              Build
            </a>
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
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between text-left py-2.5 border-b border-[#F3F0E8]/08 text-base font-display text-[#F3F0E8] hover:text-[#E84B2C] transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#A39E93]" />
              </a>
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
