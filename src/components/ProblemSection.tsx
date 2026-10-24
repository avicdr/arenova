import React, { useState } from 'react';
import { PhoneMissed, RefreshCw, Unplug, Clock, FilterX, MousePointerClick, AlertCircle, ArrowUpRight } from 'lucide-react';

interface ProblemSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onNavigate }) => {
  const [activeFriction, setActiveFriction] = useState(0);

  const problems = [
    {
      id: 'enquiries',
      title: 'Missed customer enquiries',
      impact: '67% of prospects choose the competitor who responds first.',
      description: 'High-intent calls and website messages arrive during surgery hours, jobs on-site, or weekends. Every missed call is revenue handed directly to an alternative provider.',
      icon: PhoneMissed,
      tag: 'LEAD LOSS',
      metric: '-34% Pipeline Leak',
    },
    {
      id: 'admin',
      title: 'Repetitive administration',
      impact: 'Knowledge workers spend 19 hours weekly on clerical copy-paste.',
      description: 'Re-entering lead details from emails into CRM, manual invoicing, and scheduling ping-pong drag down your highest-paid team members instead of executing core craft.',
      icon: RefreshCw,
      tag: 'CAPACITY DRAIN',
      metric: '19 hrs/wk Wasted',
    },
    {
      id: 'software',
      title: 'Disconnected software',
      impact: 'The average SMB runs 14 SaaS tools that cannot communicate.',
      description: 'Your marketing platform doesn’t sync with your booking calendar, your CRM lacks payment status, and customer notes live fragmented across three separate inboxes.',
      icon: Unplug,
      tag: 'DATA SILOS',
      metric: '14 Island Systems',
    },
    {
      id: 'followups',
      title: 'Slow follow-ups',
      impact: 'Leads contact response drops 8x after just 10 minutes of silence.',
      description: 'Prospects request quotes or consultation availability, only to wait 24 to 48 hours for an email response. In modern markets, delayed attention is equivalent to rejection.',
      icon: Clock,
      tag: 'CHURN RISK',
      metric: '48h Lag Time',
    },
    {
      id: 'leadhandling',
      title: 'Inefficient lead handling',
      impact: 'Sales teams waste 45% of discovery calls on mismatched criteria.',
      description: 'Without automated qualification upfront, staff waste valuable hours on tire-kickers, out-of-territory enquiries, and prospects lacking adequate budget.',
      icon: FilterX,
      tag: 'QUALIFICATION GAP',
      metric: '45% Bad Fit Calls',
    },
    {
      id: 'conversion',
      title: 'Websites that fail to convert',
      impact: '98% of paid ad traffic leaves without leaving contact information.',
      description: 'Expensive Google Ads and social traffic land on slow, generic websites with confusing forms and no immediate interactive answers, incinerating marketing budget.',
      icon: MousePointerClick,
      tag: 'CONVERSION FAILURE',
      metric: '98% Bounce Waste',
    },
  ];

  return (
    <section
      id="problem"
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 z-10 flex flex-col justify-center"
    >
      {/* SECTION HEADER */}
      <div className="max-w-5xl mb-16">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#E84B2C] uppercase font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-[#E84B2C]" />
          <span>CHAPTER 02 // THE FRICTION REALITY</span>
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.02em] text-[#F3F0E8] leading-[0.96] mb-6">
          Less busywork. <br />
          <span className="text-[#A39E93]">More possibility.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#A39E93] max-w-2xl leading-relaxed">
          Most growing businesses don't have a talent problem. They have an architecture problem:
          disconnected tools, delayed responses, and human bottlenecks choking potential.
        </p>
      </div>

      {/* ASYMMETRIC STORYTELLING INTERACTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: INTERACTIVE FRICTION CATALOG */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {problems.map((item, index) => {
            const Icon = item.icon;
            const isSelected = activeFriction === index;
            return (
              <div
                key={item.id}
                onClick={() => setActiveFriction(index)}
                className={`group relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#181716]/90 border-[#E84B2C]/50 shadow-xl shadow-[#E84B2C]/10 translate-x-2'
                    : 'bg-[#151413]/60 hover:bg-[#1A1918]/80 border-[#F3F0E8]/08 hover:border-[#F3F0E8]/15'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#E84B2C] text-[#F3F0E8]'
                          : 'bg-[#22201E] text-[#A39E93] group-hover:text-[#F3F0E8]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono tracking-widest text-[#E84B2C] uppercase">
                          {item.tag}
                        </span>
                        <span className="text-xs text-[#A39E93] font-mono">• {item.metric}</span>
                      </div>
                      <h3
                        className={`text-lg font-display font-semibold transition-colors ${
                          isSelected ? 'text-[#F3F0E8]' : 'text-[#D0CCC3] group-hover:text-white'
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`font-mono text-xs px-2.5 py-1 rounded-full transition-colors ${
                      isSelected
                        ? 'bg-[#E84B2C]/20 text-[#E84B2C] border border-[#E84B2C]/30'
                        : 'text-[#A39E93]'
                    }`}
                  >
                    0{index + 1}
                  </span>
                </div>

                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-[#F3F0E8]/10 text-sm text-[#A39E93] leading-relaxed">
                    <p className="mb-2 text-[#F3F0E8] font-medium">{item.impact}</p>
                    <p>{item.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: FRICTION INTEL PANEL & TRANSFORMATION PREVIEW */}
        <div className="lg:col-span-5 sticky top-28 flex flex-col gap-6">
          <div className="p-8 rounded-3xl glass-panel border border-[#E84B2C]/20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#E84B2C]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#E84B2C] mb-4">
              <AlertCircle className="w-4 h-4" />
              <span>THE INVISIBLE COST OF DELAY</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-[#F3F0E8] mb-4">
              {problems[activeFriction].title}
            </h3>

            <div className="p-4 rounded-xl bg-[#111110]/80 border border-[#F3F0E8]/08 mb-6">
              <span className="text-[10px] uppercase tracking-wider text-[#A39E93] block mb-1">
                Measured Bottleneck
              </span>
              <p className="text-xl font-bold text-[#E84B2C] font-mono">
                {problems[activeFriction].metric}
              </p>
              <p className="text-xs text-[#A39E93] mt-1">
                {problems[activeFriction].impact}
              </p>
            </div>

            <p className="text-sm text-[#A39E93] leading-relaxed mb-6">
              When communication channels, customer data, and scheduling operate in isolation, your
              business bleeds momentum. The phoenix cuts through this fragmentation.
            </p>

            <button
              onClick={() => onNavigate('transformation')}
              className="w-full py-3.5 rounded-full bg-[#1F1E1C] hover:bg-[#282724] border border-[#F3F0E8]/15 hover:border-[#E84B2C]/50 text-xs font-semibold uppercase tracking-wider text-[#F3F0E8] flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <span>See how transformation works</span>
              <ArrowUpRight className="w-4 h-4 text-[#E84B2C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* TELEMETRY QUOTE */}
          <div className="p-6 rounded-2xl bg-[#161514]/60 border border-[#F3F0E8]/06 flex items-start gap-4">
            <div className="w-2 h-2 rounded-full bg-[#E84B2C] mt-2 flex-shrink-0" />
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8]">
                ARCHITECTURAL PRINCIPLE
              </p>
              <p className="text-xs text-[#A39E93] mt-1 leading-relaxed">
                "Automating a broken process only creates accelerated dysfunction. We restructure
                the flow first, then unleash intelligent agents."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
