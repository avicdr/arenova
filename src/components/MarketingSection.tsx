import React, { useState } from 'react';
import {
  Zap,
  Search,
  Share2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface MarketingSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const MarketingSection: React.FC<MarketingSectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'meta' | 'google' | 'pipeline'>('meta');

  const channels = [
    {
      id: 'meta',
      name: 'Meta Ads (FB & IG)',
      tag: 'PAID SOCIAL ACQUISITION',
      icon: Share2,
      color: '#E84B2C',
      stat: '4.8x Avg ROAS',
      statLabel: 'Across active campaigns',
    },
    {
      id: 'google',
      name: 'Google Ads (Search & PMax)',
      tag: 'HIGH-INTENT DEMAND CAPTURE',
      icon: Search,
      color: '#FFAA3D',
      stat: '-38% Wasted Spend',
      statLabel: 'Via negative keyword moats',
    },
    {
      id: 'pipeline',
      name: 'Conversion & Lead Velocity',
      tag: 'AUTONOMOUS NURTURE',
      icon: Zap,
      color: '#D4AF37',
      stat: '< 15 Seconds',
      statLabel: 'Lead-to-contact velocity',
    },
  ];

  return (
    <section
      id="marketing"
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 z-10 flex flex-col justify-center border-t border-[#F3F0E8]/08"
    >
      {/* SECTION HEADER */}
      <div className="max-w-5xl mb-14">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#E84B2C] uppercase font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-[#E84B2C] animate-pulse" />
          <span>CHAPTER 05 // PERFORMANCE MARKETING & REVENUE ENGINES</span>
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.02em] text-[#F3F0E8] leading-[0.96] mb-6">
          Engineered to capture. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFAA3D] via-[#E84B2C] to-[#D4AF37]">
            Trained to convert.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#A39E93] max-w-2xl leading-relaxed">
          We bridge the chasm between media spend and closed contracts. By combining high-impact Meta Ads
          and high-intent Google Ads with conversion-engineered landing pages and 15-second autonomous lead
          follow-up, we transform advertising from an expense into your primary growth asset.
        </p>
      </div>

      {/* 3 CORE PILLARS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl">
        {/* CARD 1: META ADS */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#181716]/80 border border-[#F3F0E8]/08 hover:border-[#E84B2C]/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#E84B2C]/15 border border-[#E84B2C]/30 flex items-center justify-center text-[#E84B2C]">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#E84B2C] px-2 py-0.5 rounded-full bg-[#E84B2C]/10 border border-[#E84B2C]/20">
                Paid Social
              </span>
            </div>

            <h3 className="font-display text-xl font-bold text-[#F3F0E8] mb-2 group-hover:text-[#FFAA3D] transition-colors">
              Meta Ads Ecosystem
            </h3>
            <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed mb-6">
              Stop burning budget on generic boosts. We engineer scroll-stopping video hooks, high-converting
              carousel angles, Lookalike audiences, and Meta Conversions API (CAPI) server-side signals that
              algorithmically scale profitable client acquisition.
            </p>

            <ul className="flex flex-col gap-2.5 text-xs text-[#D0CBC1] mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E84B2C] shrink-0 mt-0.5" />
                <span>Dynamic creative testing (Hooks, problem angles, proof)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E84B2C] shrink-0 mt-0.5" />
                <span>Meta CAPI 100% server-side tracking (iOS bypass)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E84B2C] shrink-0 mt-0.5" />
                <span>AI Advantage+ and hyper-targeted custom retargeting</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#F3F0E8]/08 flex items-center justify-between text-xs font-mono">
            <span className="text-[#A39E93]">Primary Outcome</span>
            <span className="text-[#E84B2C] font-semibold">Predictable Client Leads</span>
          </div>
        </div>

        {/* CARD 2: GOOGLE ADS */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#181716]/80 border border-[#F3F0E8]/08 hover:border-[#FFAA3D]/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#FFAA3D]/15 border border-[#FFAA3D]/30 flex items-center justify-center text-[#FFAA3D]">
                <Search className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFAA3D] px-2 py-0.5 rounded-full bg-[#FFAA3D]/10 border border-[#FFAA3D]/20">
                Search & PMax
              </span>
            </div>

            <h3 className="font-display text-xl font-bold text-[#F3F0E8] mb-2 group-hover:text-[#FFAA3D] transition-colors">
              Google Ads Domination
            </h3>
            <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed mb-6">
              Intercept active commercial searches the moment buyers need you. We deploy high-intent search
              keywords, aggressive negative keyword moats, and offline conversion uploads to ensure Google's
              bidding algorithms optimize for closed revenue, not cheap clicks.
            </p>

            <ul className="flex flex-col gap-2.5 text-xs text-[#D0CBC1] mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFAA3D] shrink-0 mt-0.5" />
                <span>Exact & phrase match keyword architecture with buyer intent</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFAA3D] shrink-0 mt-0.5" />
                <span>Continuous negative keyword pruning to cut wasted budget</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFAA3D] shrink-0 mt-0.5" />
                <span>Enhanced conversion tracking synced with your CRM sales data</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#F3F0E8]/08 flex items-center justify-between text-xs font-mono">
            <span className="text-[#A39E93]">Primary Outcome</span>
            <span className="text-[#FFAA3D] font-semibold">Immediate High-Intent Calls</span>
          </div>
        </div>

        {/* CARD 3: LEAD CONVERSION ENGINE */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#181716]/80 border border-[#F3F0E8]/08 hover:border-[#D4AF37]/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] px-2 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                Conversion Engine
              </span>
            </div>

            <h3 className="font-display text-xl font-bold text-[#F3F0E8] mb-2 group-hover:text-[#FFAA3D] transition-colors">
              Funnels & Instant Lead Velocity
            </h3>
            <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed mb-6">
              Traffic without conversion is just vanity. We build lightning-fast, high-converting dedicated
              landing pages integrated with automated 15-second AI contact via WhatsApp, SMS, or phone. Leads
              are qualified, triaged, and booked into calendars before they can search for a competitor.
            </p>

            <ul className="flex flex-col gap-2.5 text-xs text-[#D0CBC1] mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Bespoke landing pages engineered for 12%+ conversion rates</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Autonomous 15-second lead outreach via AI Front Desk</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Multi-step qualifying forms that filter out tire-kickers</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#F3F0E8]/08 flex items-center justify-between text-xs font-mono">
            <span className="text-[#A39E93]">Primary Outcome</span>
            <span className="text-[#D4AF37] font-semibold">Maximized Pipeline ROI</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE GROWTH WORKSPACE PREVIEW */}
      <div className="max-w-5xl rounded-3xl bg-[#141312]/90 border border-[#F3F0E8]/10 p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden mb-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E84B2C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* WORKSPACE HEADER & TABS */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#F3F0E8]/08 pb-6 mb-8">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E84B2C] mb-1">
              LIVE ARCHITECTURE SIMULATION
            </div>
            <h4 className="font-display text-2xl font-bold text-[#F3F0E8]">
              How We Turn Ad Spend Into Closed Revenue
            </h4>
          </div>

          {/* CHANNEL SELECTOR PILLS */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-[#1C1B1A] border border-[#F3F0E8]/10">
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveTab(ch.id as any)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeTab === ch.id
                    ? 'bg-[#E84B2C] text-[#F3F0E8] shadow-md shadow-[#E84B2C]/30'
                    : 'text-[#A39E93] hover:text-[#F3F0E8]'
                }`}
              >
                {ch.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: META ADS */}
        {activeTab === 'meta' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT: STRATEGY & METRICS */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-[#E84B2C]/20 border border-[#E84B2C]/35 text-[#E84B2C] font-mono text-[11px] font-bold">
                  META AD ARCHITECTURE
                </span>
                <span className="text-xs text-[#A39E93] font-mono">Instagram Feed & Reels + Facebook Ads</span>
              </div>

              <h5 className="font-display text-xl font-bold text-[#F3F0E8]">
                Creative Velocity + Direct Attribution
              </h5>

              <p className="text-sm text-[#A39E93] leading-relaxed">
                Rather than relying on one static image, we deploy modular creative frameworks: testing 6 to 12
                video hooks, objection-handling copy variants, and interactive lead forms simultaneously.
                Algorithms automatically allocate budget to top performers while cutting losing variants in real time.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-3">
                <div className="p-3.5 rounded-xl bg-[#1C1B1A]/80 border border-[#F3F0E8]/08">
                  <div className="text-[10px] font-mono uppercase text-[#A39E93]">Average ROAS</div>
                  <div className="text-xl font-display font-bold text-[#E84B2C]">4.8x</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Verified CAPI</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1C1B1A]/80 border border-[#F3F0E8]/08">
                  <div className="text-[10px] font-mono uppercase text-[#A39E93]">Cost / Lead</div>
                  <div className="text-xl font-display font-bold text-[#FFAA3D]">-42%</div>
                  <div className="text-[10px] text-[#A39E93] font-mono">Vs industry avg</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1C1B1A]/80 border border-[#F3F0E8]/08">
                  <div className="text-[10px] font-mono uppercase text-[#A39E93]">Creative Batch</div>
                  <div className="text-xl font-display font-bold text-[#F3F0E8]">10+ / Mo</div>
                  <div className="text-[10px] text-[#A39E93] font-mono">Fatigue immunity</div>
                </div>
              </div>
            </div>

            {/* RIGHT: MOCKUP INTERFACE */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#1A1918] border border-[#E84B2C]/30 shadow-xl flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#F3F0E8]/08 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-[#F3F0E8]">Meta CAPI // Live Telemetry</span>
                </div>
                <span className="text-[10px] text-[#A39E93]">Server Event 200 OK</span>
              </div>

              <div className="space-y-2 text-[11px] text-[#D0CBC1]">
                <div className="flex justify-between py-1 border-b border-[#F3F0E8]/05">
                  <span className="text-[#A39E93]">Campaign:</span>
                  <span className="text-[#FFAA3D]">Q4 Enterprise Lead Scale</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F3F0E8]/05">
                  <span className="text-[#A39E93]">Targeting:</span>
                  <span>Advantage+ Custom Lookalike 1%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F3F0E8]/05">
                  <span className="text-[#A39E93]">Winning Angle:</span>
                  <span className="text-[#E84B2C]">"Stop Losing 34% Leads (Hook #3)"</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F3F0E8]/05">
                  <span className="text-[#A39E93]">Conversion Action:</span>
                  <span className="text-emerald-400">High-Intent Lead Submit + SMS Handshake</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#111110] border border-[#E84B2C]/20 text-[10px] text-[#A39E93] flex items-center justify-between">
                <span>Signal Quality Score:</span>
                <span className="text-emerald-400 font-bold">9.4 / 10.0 (Grade A)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GOOGLE ADS */}
        {activeTab === 'google' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT: STRATEGY & METRICS */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-[#FFAA3D]/20 border border-[#FFAA3D]/35 text-[#FFAA3D] font-mono text-[11px] font-bold">
                  GOOGLE SEARCH DOMINATION
                </span>
                <span className="text-xs text-[#A39E93] font-mono">High-Intent Keywords & Performance Max</span>
              </div>

              <h5 className="font-display text-xl font-bold text-[#F3F0E8]">
                Commercial Intent + Negative Keyword Moats
              </h5>

              <p className="text-sm text-[#A39E93] leading-relaxed">
                Most agencies burn your ad budget on informational searches ("how to", "free templates", "salary").
                We enforce multi-tiered negative keyword lists and bid exclusively on high-urgency commercial
                queries where searchers have purchase intent and an immediate problem to solve.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-3">
                <div className="p-3.5 rounded-xl bg-[#1C1B1A]/80 border border-[#F3F0E8]/08">
                  <div className="text-[10px] font-mono uppercase text-[#A39E93]">Search Impr. Share</div>
                  <div className="text-xl font-display font-bold text-[#FFAA3D]">84.2%</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Top of Page #1</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1C1B1A]/80 border border-[#F3F0E8]/08">
                  <div className="text-[10px] font-mono uppercase text-[#A39E93]">Negative Keywords</div>
                  <div className="text-xl font-display font-bold text-[#E84B2C]">1,400+</div>
                  <div className="text-[10px] text-[#A39E93] font-mono">Active filter rules</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1C1B1A]/80 border border-[#F3F0E8]/08">
                  <div className="text-[10px] font-mono uppercase text-[#A39E93]">Click-to-Call</div>
                  <div className="text-xl font-display font-bold text-[#D4AF37]">28.6%</div>
                  <div className="text-[10px] text-[#A39E93] font-mono">Direct phone intake</div>
                </div>
              </div>
            </div>

            {/* RIGHT: MOCKUP INTERFACE */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#1A1918] border border-[#FFAA3D]/30 shadow-xl flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#F3F0E8]/08 pb-3">
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-[#FFAA3D]" />
                  <span className="font-bold text-[#F3F0E8]">Google SERP Preview</span>
                </div>
                <span className="text-[10px] text-emerald-400">Position 1.0 (Top)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111110] border border-[#FFAA3D]/20 text-left font-sans">
                <div className="text-[10px] font-mono text-[#A39E93] mb-1">Sponsored // arenova.in</div>
                <div className="text-sm font-semibold text-[#FFAA3D] hover:underline mb-1">
                  Enterprise AI Systems & Front Desk Automation | Scale 24/7
                </div>
                <div className="text-[11px] text-[#D0CBC1] leading-relaxed mb-2">
                  Stop losing leads to delayed replies. Deploy intelligent voice & chat agents with zero hallucination. Book discovery consultation today.
                </div>
                <div className="flex flex-wrap gap-2 text-[10px] font-mono text-[#E84B2C]">
                  <span>• 24/7 AI Reception</span>
                  <span>• 15s Lead Follow-up</span>
                  <span>• Verified ROI</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#111110] border border-[#F3F0E8]/08 text-[10px] text-[#A39E93] flex justify-between font-mono">
                <span>Negative Keyword Shield:</span>
                <span className="text-emerald-400 font-bold">100% Zero Junk Waste</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PIPELINE */}
        {activeTab === 'pipeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT: STRATEGY & METRICS */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/35 text-[#D4AF37] font-mono text-[11px] font-bold">
                  AUTONOMOUS CONVERSION FLOW
                </span>
                <span className="text-xs text-[#A39E93] font-mono">The 15-Second Advantage</span>
              </div>

              <h5 className="font-display text-xl font-bold text-[#F3F0E8]">
                Lead Decay Is the #1 Ad Spend Killer
              </h5>

              <p className="text-sm text-[#A39E93] leading-relaxed">
                A lead contacted in 5 minutes is 21x more likely to qualify than after 30 minutes. Arenova’s
                marketing infrastructure doesn’t dump leads into an unread spreadsheet. The moment an ad form or
                landing page inquiry triggers, an automated AI agent initiates contact via WhatsApp or SMS in
                under 15 seconds, pre-qualifying intent and synchronizing calendar bookings instantly.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-3">
                <div className="p-3.5 rounded-xl bg-[#1C1B1A]/80 border border-[#F3F0E8]/08">
                  <div className="text-[10px] font-mono uppercase text-[#A39E93]">Response Speed</div>
                  <div className="text-xl font-display font-bold text-[#D4AF37]">&lt; 15s</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Automated 24/7</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1C1B1A]/80 border border-[#F3F0E8]/08">
                  <div className="text-[10px] font-mono uppercase text-[#A39E93]">Show-Up Rate</div>
                  <div className="text-xl font-display font-bold text-[#E84B2C]">88.4%</div>
                  <div className="text-[10px] text-[#A39E93] font-mono">With SMS confirmations</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1C1B1A]/80 border border-[#F3F0E8]/08">
                  <div className="text-[10px] font-mono uppercase text-[#A39E93]">Booking Lift</div>
                  <div className="text-xl font-display font-bold text-[#FFAA3D]">+165%</div>
                  <div className="text-[10px] text-[#A39E93] font-mono">Vs manual email</div>
                </div>
              </div>
            </div>

            {/* RIGHT: MOCKUP FLOWCHART */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#1A1918] border border-[#D4AF37]/30 shadow-xl flex flex-col gap-2.5 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#F3F0E8]/08 pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="font-bold text-[#F3F0E8]">Velocity Pipeline</span>
                </div>
                <span className="text-[10px] text-[#D4AF37]">Autonomous</span>
              </div>

              <div className="flex flex-col gap-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-[#111110] border border-[#F3F0E8]/10 flex items-center justify-between">
                  <span className="text-[#A39E93]">01. Meta / Google Ad Click</span>
                  <span className="text-[#E84B2C]">Intent Matched</span>
                </div>
                <div className="text-center text-[#A39E93] text-[10px]">↓ 1.2s Fast Load</div>
                <div className="p-2.5 rounded-lg bg-[#111110] border border-[#F3F0E8]/10 flex items-center justify-between">
                  <span className="text-[#A39E93]">02. Conversion Landing Page</span>
                  <span className="text-[#FFAA3D]">Form Submitted</span>
                </div>
                <div className="text-center text-[#A39E93] text-[10px]">↓ 12s Automated Triage</div>
                <div className="p-2.5 rounded-lg bg-[#111110] border border-[#D4AF37]/40 flex items-center justify-between bg-[#D4AF37]/05">
                  <span className="text-[#D4AF37] font-semibold">03. AI WhatsApp/Voice Contact</span>
                  <span className="text-emerald-400 font-bold">Booked on Calendar</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CALL TO ACTION BANNER */}
      <div className="max-w-5xl p-8 rounded-2xl bg-gradient-to-r from-[#181716] via-[#201C1A] to-[#181716] border border-[#E84B2C]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="font-display text-xl sm:text-2xl font-bold text-[#F3F0E8] mb-1">
            Ready to turn advertising into predictable commercial velocity?
          </h4>
          <p className="text-xs sm:text-sm text-[#A39E93]">
            We build the complete acquisition engine — from Meta & Google ad creative to closed appointments.
          </p>
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="btn-cinematic px-7 py-3.5 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#F3F0E8] font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl shadow-[#E84B2C]/30 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>Accelerate your marketing</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
