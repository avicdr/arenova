import React from 'react';
import { PhoneMissed, MousePointerClick, RefreshCw, ArrowRight } from 'lucide-react';

interface ProblemSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onNavigate }) => {
  const problems = [
    {
      title: 'Missed Calls & Delayed Leads',
      metric: '67% Choose First Responder',
      description:
        'Inbound calls and messages arrive after-hours or when staff are busy. If you don’t reply within 5 minutes, 80% of high-intent prospects contact your competitor.',
      icon: PhoneMissed,
      tag: 'LEAD LEAK',
      solution: '24/7 AI answers in <15s',
    },
    {
      title: 'Wasted Ad Spend on Clicks',
      metric: '98% Bounce Without Contact',
      description:
        'Expensive Meta and Google Ads traffic lands on static websites with confusing contact forms and zero instant answers, burning marketing budget without booked meetings.',
      icon: MousePointerClick,
      tag: 'CONVERSION FAILURE',
      solution: 'High-converting funnels + instant booking',
    },
    {
      title: 'Manual Admin & Disjointed Tools',
      metric: '15+ hrs/week Wasted',
      description:
        'Teams drown in repetitive copy-paste between email, CRM, calendar ping-pong, and invoicing instead of delivering work and closing deals.',
      icon: RefreshCw,
      tag: 'CAPACITY DRAIN',
      solution: 'Autonomous end-to-end sync',
    },
  ];

  return (
    <section
      id="problem"
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 z-10 flex flex-col justify-center"
    >
      {/* SECTION HEADER */}
      <div className="max-w-4xl mb-14">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#E84B2C] uppercase font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-[#E84B2C]" />
          <span>THE BOTTLENECKS</span>
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-6xl tracking-[-0.02em] text-[#F3F0E8] leading-[0.96] mb-6">
          Where businesses <br />
          <span className="text-[#A39E93]">lose revenue every day.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#A39E93] max-w-2xl leading-relaxed">
          Most companies don't need more software subscriptions. They need an integrated system that captures demand, qualifies prospects, and moves work automatically.
        </p>
      </div>

      {/* 3-COLUMN PROBLEM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl">
        {problems.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-[#161514]/80 border border-[#F3F0E8]/08 hover:border-[#E84B2C]/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#E84B2C]/15 border border-[#E84B2C]/30 flex items-center justify-center text-[#E84B2C]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#E84B2C] px-2 py-0.5 rounded-full bg-[#E84B2C]/10 border border-[#E84B2C]/20">
                    {p.tag}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-[#F3F0E8] mb-2 group-hover:text-[#FFAA3D] transition-colors">
                  {p.title}
                </h3>

                <p className="text-xs font-mono text-[#E84B2C] mb-4">
                  {p.metric}
                </p>

                <p className="text-sm text-[#A39E93] leading-relaxed mb-6">
                  {p.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F3F0E8]/08 flex items-center justify-between text-xs font-mono">
                <span className="text-[#F3F0E8] font-medium">Fix:</span>
                <span className="text-[#34D399]">{p.solution}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM CTA */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate('services')}
          className="btn-cinematic px-6 py-3 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#F3F0E8] font-medium text-xs tracking-wider uppercase transition-all shadow-md shadow-[#E84B2C]/20 flex items-center gap-2 cursor-pointer"
        >
          <span>See How We Fix This</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
