import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

interface FooterSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = React.memo(({ onNavigate }) => {
  const { pathname, navigate } = useRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (target.startsWith('/')) {
      navigate(target);
    } else {
      if (pathname === '/') {
        onNavigate(target);
      } else {
        navigate(`/#${target}`);
      }
    }
  };

  return (
    <footer className="cv-auto-footer relative w-full bg-[#0D0D0C] border-t border-[#F3F0E8]/08 pt-16 pb-12 px-6 sm:px-10 lg:px-16 z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* TOP ROW: BRAND & COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 flex flex-col gap-5">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex items-center gap-3 w-fit"
            >
              <picture>
                <source type="image/webp" srcSet="/arenova-128.webp" />
                <img
                  src="/arenova-128.png"
                  alt="ARENOVA Logo"
                  width="36"
                  height="36"
                  className="h-9 w-auto object-contain drop-shadow-[0_0_15px_rgba(232,75,44,0.3)]"
                />
              </picture>
              <span className="font-display tracking-[0.2em] text-xl font-bold text-[#F3F0E8]">
                ARENOVA
              </span>
            </a>

            <p className="text-sm text-[#A39E93] leading-relaxed max-w-sm">
              We engineer enterprise AI automation: business workflow orchestration, autonomous cold outreach engines, and 24/7 front desk capture.
            </p>

            {/* LIVE SYSTEM STATUS */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#161514] border border-[#F3F0E8]/08 text-xs font-mono text-[#A39E93] w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All automation & outreach clusters operational — 99.98% SLA</span>
            </div>
          </div>

          {/* COLUMNS */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            {/* SERVICES */}
            <nav aria-label="Services" className="flex flex-col gap-2.5">
              <span className="uppercase tracking-widest text-[#E84B2C] font-bold mb-1">
                Services
              </span>
              <a
                href="/#services"
                onClick={(e) => handleLinkClick(e, 'services')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                Business Automation
              </a>
              <a
                href="/#services"
                onClick={(e) => handleLinkClick(e, 'services')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                Sales & Outreach
              </a>
              <a
                href="/#services"
                onClick={(e) => handleLinkClick(e, 'services')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                AI Frontdesk Agent
              </a>
              <a
                href="/pricing/"
                onClick={(e) => handleLinkClick(e, '/pricing/')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                Custom AI Agents
              </a>
            </nav>

            {/* ECOSYSTEM */}
            <nav aria-label="Ecosystem" className="flex flex-col gap-2.5">
              <span className="uppercase tracking-widest text-[#E84B2C] font-bold mb-1">
                Ecosystem
              </span>
              <a
                href="https://frontdesk.arenova.in"
                target="_blank"
                rel="noopener noreferrer"
                title="Arenova Frontdesk — AI WhatsApp Receptionist"
                className="group flex flex-col text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors"
              >
                <span className="flex items-center gap-1 font-semibold text-[#F3F0E8] group-hover:text-[#E84B2C]">
                  Frontdesk <ArrowUpRight className="w-3 h-3 opacity-70" />
                </span>
                <span className="text-[10px] text-[#A39E93]">AI Voice & WhatsApp</span>
              </a>
              <a
                href="/#ascent"
                onClick={(e) => handleLinkClick(e, 'contact')}
                title="Arova — B2B Lead Intelligence"
                className="group flex flex-col text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors"
              >
                <span className="flex items-center gap-1 font-semibold text-[#F3F0E8] group-hover:text-[#FFAA3D]">
                  Arova Intelligence <ArrowUpRight className="w-3 h-3 opacity-70" />
                </span>
                <span className="text-[10px] text-[#A39E93]">B2B Lead Intelligence</span>
              </a>
              <a
                href="https://outreacher.arenova.in"
                target="_blank"
                rel="nofollow noopener noreferrer"
                title="Outreacher — Email Outreach"
                className="group flex flex-col text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors"
              >
                <span className="flex items-center gap-1 font-semibold text-[#F3F0E8] group-hover:text-[#D4AF37]">
                  Outreacher <ArrowUpRight className="w-3 h-3 opacity-70" />
                </span>
                <span className="text-[10px] text-[#A39E93]">Sales Outreach Engine</span>
              </a>
            </nav>

            {/* NAVIGATION & AUDIT */}
            <nav aria-label="Navigation" className="flex flex-col gap-2.5">
              <span className="uppercase tracking-widest text-[#E84B2C] font-bold mb-1">
                Navigation
              </span>
              <a
                href="/#problem"
                onClick={(e) => handleLinkClick(e, 'problem')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                Why Us
              </a>
              <a
                href="/#services"
                onClick={(e) => handleLinkClick(e, 'services')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                Services
              </a>
              <a
                href="/pricing/"
                onClick={(e) => handleLinkClick(e, '/pricing/')}
                className="text-left text-[#FFAA3D] hover:text-[#F3F0E8] transition-colors cursor-pointer font-semibold"
              >
                Pricing
              </a>
              <a
                href="/about/"
                onClick={(e) => handleLinkClick(e, '/about/')}
                className="text-left text-[#FFAA3D] hover:text-[#F3F0E8] transition-colors cursor-pointer font-semibold"
              >
                About Us
              </a>
              <a
                href="/#workflow-demo"
                onClick={(e) => handleLinkClick(e, 'workflow-demo')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                System Demo
              </a>
              <div className="pt-2">
                <a
                  href="/#ascent"
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="inline-flex items-center gap-1 text-[#E84B2C] hover:underline font-bold cursor-pointer"
                >
                  <span>Request Free Audit</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </nav>
          </div>
        </div>

        {/* BOTTOM METRICS & COPYRIGHT */}
        <div className="pt-6 border-t border-[#F3F0E8]/08 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A39E93]">
          <p>© 2026 ARENOVA. All systems engineered with precision.</p>
          <div className="flex items-center gap-4">
            <a href="mailto:avi@arenova.in" className="hover:text-[#F3F0E8] transition-colors">
              Direct: avi@arenova.in
            </a>
            <span>•</span>
            <span>Security: Zero-Trust TLS 1.3</span>
          </div>
        </div>
      </div>
    </footer>
  );
});
