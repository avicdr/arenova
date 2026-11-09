import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = React.memo(({
  activeSection,
  onNavigate,
}) => {
  const { pathname, navigate } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'problem', label: 'Why Us', href: '/#problem', type: 'section' },
    { id: 'services', label: 'Services', href: '/#services', type: 'section' },
    { id: 'workflow-demo', label: 'Live Demo', href: '/#workflow-demo', type: 'section' },
    { id: 'pricing', label: 'Pricing', href: '/pricing', type: 'page' },
    { id: 'about', label: 'About', href: '/about', type: 'page' },
  ];

  const handleLinkClick = (link: (typeof navLinks)[0]) => {
    if (link.type === 'page') {
      navigate(link.href);
    } else {
      if (pathname === '/') {
        onNavigate(link.id);
      } else {
        navigate(link.href);
      }
    }
    setMobileMenuOpen(false);
  };

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
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (pathname === '/') {
                onNavigate('awakening');
              } else {
                navigate('/');
              }
            }}
            className="group flex items-center justify-center shrink-0 cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-105"
            aria-label="ARENOVA Home"
          >
            <picture>
              <source type="image/webp" srcSet="/arenova-128.webp 1x, /arenova-256.webp 2x" />
              <img
                src="/arenova-128.png"
                srcSet="/arenova-128.png 1x, /arenova-256.png 2x"
                alt="ARENOVA Logo"
                width="48"
                height="48"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_16px_rgba(232,75,44,0.35)] transition-all duration-300 group-hover:scale-105"
              />
            </picture>
          </a>

          {/* DESKTOP STREAMLINED NAVIGATION */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181716]/80 border border-[#F3F0E8]/10 backdrop-blur-md shrink-0 shadow-lg shadow-black/25"
          >
            {navLinks.map((link) => {
              const isActive =
                link.type === 'page'
                  ? pathname === link.href
                  : pathname === '/' && activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link);
                  }}
                  className={`relative px-4 py-1.5 text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-200 rounded-full cursor-pointer shrink-0 ${
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

          {/* RIGHT ACTION: CTA BUTTON */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="/#ascent"
              onClick={(e) => {
                e.preventDefault();
                if (pathname === '/') {
                  onNavigate('contact');
                } else {
                  navigate('/#ascent');
                }
              }}
              className="btn-cinematic px-5 py-2.5 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#111110] font-bold text-xs tracking-wider uppercase whitespace-nowrap transition-all shadow-lg shadow-[#E84B2C]/25 hover:shadow-[#E84B2C]/40 flex items-center gap-2 cursor-pointer"
            >
              <span>Get an Audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="/#ascent"
              onClick={(e) => {
                e.preventDefault();
                if (pathname === '/') {
                  onNavigate('contact');
                } else {
                  navigate('/#ascent');
                }
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#E84B2C] text-[#111110] text-[11px] uppercase tracking-wider font-bold"
            >
              Audit
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#1A1918] text-[#F3F0E8] border border-[#F3F0E8]/10 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DROPDOWN DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-[#111110]/95 backdrop-blur-xl z-40 sm:hidden flex flex-col p-6 border-b border-[#F3F0E8]/10 animate-fadeIn">
          <nav className="flex flex-col gap-3 py-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link);
                }}
                className="px-4 py-3 rounded-xl bg-[#181716]/60 border border-[#F3F0E8]/08 text-sm font-mono tracking-wider uppercase text-[#F3F0E8] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[#E84B2C]">→</span>
              </a>
            ))}

            <button
              onClick={() => {
                if (pathname === '/') {
                  onNavigate('contact');
                } else {
                  navigate('/#ascent');
                }
                setMobileMenuOpen(false);
              }}
              className="btn-cinematic w-full py-3.5 mt-4 rounded-xl bg-[#E84B2C] text-[#111110] font-bold text-xs uppercase tracking-wider text-center"
            >
              Request Free Audit
            </button>
          </nav>
        </div>
      )}
    </>
  );
});
