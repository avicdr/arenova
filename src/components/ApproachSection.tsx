import React, { useState } from 'react';
import { Search, Compass, Hammer, PlugZap, LineChart, ArrowRight, Check } from 'lucide-react';

interface ApproachSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ApproachSection: React.FC<ApproachSectionProps> = ({ onNavigate }) => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      step: '01',
      title: 'DISCOVER',
      headline: 'Deep operational audit & friction mapping',
      description:
        'We begin by analyzing your current inquiry volumes, communication bottlenecks, software subscriptions, and manual handoffs. We identify the high-friction leaks where leads abandon or staff spend hours on clerical busywork.',
      icon: Search,
      deliverables: [
        'End-to-end friction audit & workflow bottleneck map',
        'Inbound inquiry leak analysis & response latency baseline',
        'Tech stack integration feasibility & API inventory',
        'High-leverage ROI automation roadmap',
      ],
      timeframe: 'Days 1 — 5',
    },
    {
      step: '02',
      title: 'DESIGN',
      headline: 'Architecting custom system blueprints',
      description:
        'Before writing code, we design the exact data models, prompt guardrails, fail-safes, and human-in-the-loop review triggers. We craft bespoke AI personas that speak in your authentic brand voice with zero generic AI tropes.',
      icon: Compass,
      deliverables: [
        'Conversational tone-of-voice & guardrail specification',
        'Two-way API integration schema & database entity mapping',
        'Multi-stage triage logic & lead qualification scorecard',
        'UI/UX conversion wireframes for digital interfaces',
      ],
      timeframe: 'Days 6 — 12',
    },
    {
      step: '03',
      title: 'BUILD',
      headline: 'Engineering custom agents & pipeline code',
      description:
        'Our engineers develop your custom AI front desk models, configure webhook bridges, build high-converting digital storefronts, and connect your business tools into an autonomous, fault-tolerant network.',
      icon: Hammer,
      deliverables: [
        'Dedicated AI agent models trained on verified company data',
        'Enterprise webhook bridges and self-healing error catchers',
        'High-performance web architecture & conversion funnels',
        'Simulated stress-testing across 500+ realistic inquiry edge-cases',
      ],
      timeframe: 'Days 13 — 24',
    },
    {
      step: '04',
      title: 'INTEGRATE',
      headline: 'Zero-downtime deployment & staff empowerment',
      description:
        'We deploy the new systems seamlessly into your live business environment without interrupting day-to-day operations. We train your key team members on interacting with AI summaries and managing escalated inquiries.',
      icon: PlugZap,
      deliverables: [
        'Zero-downtime DNS, phone line, and CRM cutover',
        'Live system observation & real-time human escalation checks',
        'Interactive team walkthrough & standard operating procedure (SOP) docs',
        'Executive management dashboard configuration',
      ],
      timeframe: 'Days 25 — 28',
    },
    {
      step: '05',
      title: 'IMPROVE',
      headline: 'Telemetry telemetry, latency tuning & scaling',
      description:
        'Launch is only the beginning. We continuously monitor response accuracy, inquiry conversion velocity, ad spend return, and system latency, refining prompt parameters and expanding capabilities as your business scales.',
      icon: LineChart,
      deliverables: [
        'Ongoing semantic accuracy evaluation & prompt refinement',
        'Conversion rate optimization (CRO) testing on digital assets',
        'Quarterly automation expansion reviews & capability upgrades',
        'Dedicated 99.98% SLA engineering support',
      ],
      timeframe: 'Continuous Partnership',
    },
  ];

  const current = phases[activePhase];
  const Icon = current.icon;

  return (
    <section
      id="approach"
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 z-10 flex flex-col justify-center"
    >
      {/* SECTION HEADER */}
      <div className="max-w-5xl mb-14">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#E84B2C] uppercase font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-[#E84B2C]" />
          <span>CHAPTER 07 // DELIVERY METHODOLOGY</span>
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.02em] text-[#F3F0E8] leading-[0.96] mb-6">
          From friction <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E84B2C] via-[#F3F0E8] to-[#C86938]">
            to flow.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#A39E93] max-w-2xl leading-relaxed">
          A disciplined 5-stage engineering lifecycle designed to eliminate uncertainty, ensure
          flawless operational continuity, and compound your commercial advantage.
        </p>
      </div>

      {/* HORIZONTAL PHASE TIMELINE STEPPER */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
        {phases.map((p, idx) => {
          const PhaseIcon = p.icon;
          const isSelected = activePhase === idx;
          return (
            <button
              key={p.step}
              onClick={() => setActivePhase(idx)}
              className={`p-4 rounded-2xl text-left border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-[#1D1B1A] border-[#E84B2C] shadow-lg shadow-[#E84B2C]/20 scale-[1.02]'
                  : 'bg-[#151413]/70 border-[#F3F0E8]/08 hover:border-[#F3F0E8]/20 text-[#A39E93]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#E84B2C]">{p.step}</span>
                <PhaseIcon
                  className={`w-4 h-4 ${
                    isSelected ? 'text-[#E84B2C]' : 'text-[#75726B]'
                  }`}
                />
              </div>

              <p
                className={`text-xs font-display font-bold ${
                  isSelected ? 'text-[#F3F0E8]' : 'text-[#D0CCC3]'
                }`}
              >
                {p.title}
              </p>
              <p className="text-[10px] font-mono text-[#A39E93] mt-0.5">
                {p.timeframe}
              </p>
            </button>
          );
        })}
      </div>

      {/* PHASE DETAILS CARD */}
      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-[#F3F0E8]/10 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: PHASE OVERVIEW */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#22201E] border border-[#E84B2C]/30 text-[#E84B2C]">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#E84B2C]">
                  PHASE {current.step} OF 05
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F3F0E8]">
                  {current.headline}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#A39E93] leading-relaxed">
              {current.description}
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="btn-cinematic px-6 py-3 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#F3F0E8] font-medium text-xs tracking-wider uppercase transition-all shadow-md shadow-[#E84B2C]/20 flex items-center gap-2 cursor-pointer w-fit"
              >
                <span>Initiate Stage 01 Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT: TANGIBLE DELIVERABLES */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-6 rounded-2xl bg-[#141312] border border-[#F3F0E8]/08">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3F0E8]/08 mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A39E93]">
                  PHASE DELIVERABLES
                </span>
                <span className="text-xs font-mono text-[#E84B2C]">{current.timeframe}</span>
              </div>

              <div className="flex flex-col gap-3">
                {current.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#D0CCC3]">
                    <div className="w-4 h-4 rounded-full bg-[#E84B2C]/15 border border-[#E84B2C]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-[#E84B2C]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TIMELINE PROGRESS NOTE */}
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#181716]/60 border border-[#F3F0E8]/06 text-xs text-[#A39E93]">
              <span>Next Phase: {phases[(activePhase + 1) % 5].title}</span>
              <button
                onClick={() => setActivePhase((prev) => (prev + 1) % 5)}
                className="text-[#E84B2C] font-semibold hover:underline cursor-pointer"
              >
                Advance →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
