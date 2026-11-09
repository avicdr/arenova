import React from 'react';
import { ArrowRight, ChevronDown, ShieldCheck, Zap } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = React.memo(({ onNavigate }) => {
  return (
    <section
      id="awakening"
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-16 px-6 sm:px-10 lg:px-16 z-10"
    >
      {/* TOP EDITORIAL METADATA STRIP */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#F3F0E8]/08 pb-6">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#9E9B93] uppercase font-mono">
          <span className="w-2 h-2 rounded-full bg-[#E84B2C] animate-ping" />
          <span>ENTERPRISE AI AUTOMATION & REVENUE SYSTEMS</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-[#A39E93]">
          <span className="text-[#E84B2C] font-mono">2026 EDITION</span>
        </div>
      </div>

      {/* CENTER EDITORIAL COMPOSITION */}
      <div className="my-auto py-12 max-w-5xl">
        {/* VALUE BADGE */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1918]/80 border border-[#E84B2C]/30 text-xs text-[#F3F0E8] mb-8 backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-[#E84B2C]" />
          <span className="tracking-wide">Autonomous Business & Outreach Systems</span>
        </div>

        {/* OVERSIZED EDITORIAL HERO HEADLINE */}
        <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[5.25rem] leading-[0.94] tracking-[-0.035em] text-[#F3F0E8] mb-8 drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]">
          Autonomous systems <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0E8] via-[#FFD2A0] to-[#FFAA3D]">
            that scale revenue.
          </span>
        </h1>

        {/* SUPPORTING HEADLINE & BODY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2 border-t border-[#F3F0E8]/08">
          <div className="md:col-span-6">
            <h2 className="text-xl sm:text-2xl font-display font-medium text-[#F3F0E8] leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Business automation. Cold outreach engines. 24/7 AI frontdesk.
            </h2>
          </div>

          <div className="md:col-span-6 flex flex-col gap-6">
            <p className="text-sm sm:text-base text-[#D0CBC1] leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Arenova engineers custom AI automation systems for modern businesses. We automate your sales pipeline, outbound acquisition, internal operations, and 24/7 customer triage — eliminating manual bottlenecks so you scale on autopilot.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="btn-cinematic px-7 py-3.5 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#111110] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl shadow-[#E84B2C]/30 hover:shadow-[#E84B2C]/50 flex items-center gap-2 cursor-pointer"
              >
                <span>Request Free Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="px-6 py-3.5 rounded-full bg-[#181716]/80 hover:bg-[#201F1D] text-[#F3F0E8] border border-[#F3F0E8]/15 hover:border-[#F3F0E8]/30 font-medium text-xs sm:text-sm tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer"
              >
                Explore Services
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER TICKER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-t border-[#F3F0E8]/08 pt-6">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-[#A39E93]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E84B2C]" />
            <span>Workflow Automation</span>
          </div>
          <span className="text-[#F3F0E8]/20">•</span>
          <span>Cold Outreach Engines</span>
          <span className="text-[#F3F0E8]/20">•</span>
          <span>CRM & ERP Pipeline Sync</span>
          <span className="text-[#F3F0E8]/20">•</span>
          <span>24/7 Voice & Chat Triage</span>
        </div>

        <button
          onClick={() => onNavigate('problem')}
          className="group flex items-center gap-3 text-xs tracking-widest uppercase text-[#A39E93] hover:text-[#E84B2C] transition-colors cursor-pointer"
        >
          <span>See The Difference</span>
          <div className="w-6 h-6 rounded-full border border-[#F3F0E8]/20 flex items-center justify-center group-hover:border-[#E84B2C] group-hover:translate-y-1 transition-all">
            <ChevronDown className="w-3.5 h-3.5 text-[#E84B2C]" />
          </div>
        </button>
      </div>
    </section>
  );
});
