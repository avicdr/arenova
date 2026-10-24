import React, { useState } from 'react';
import { Cpu, Network, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

interface TransformationSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const TransformationSection: React.FC<TransformationSectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'fragmented' | 'transformed'>('transformed');

  const pillars = [
    {
      title: 'Unified Communication Stream',
      description: 'Incoming website inquiries, phone calls, SMS, and emails routed into one structured triage engine.',
      metric: '< 15s Response Time',
    },
    {
      title: 'Autonomous System Bridges',
      description: 'Customer data flows friction-free between CRM, calendars, payment gateways, and team communications.',
      metric: 'Zero Manual Entry',
    },
    {
      title: 'Context-Aware Intelligence',
      description: 'Custom AI agents trained specifically on your pricing, policies, service catalog, and scheduling rules.',
      metric: '100% Brand Aligned',
    },
    {
      title: 'Measurable Commercial Momentum',
      description: 'Every interaction tracked, qualified, and attributed back to revenue generation and customer lifetime value.',
      metric: '3.4x Faster Close Rate',
    },
  ];

  return (
    <section
      id="transformation"
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 z-10 flex flex-col justify-center"
    >
      {/* SECTION HEADER */}
      <div className="max-w-5xl mb-16">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#E84B2C] uppercase font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-[#E84B2C] animate-pulse" />
          <span>CHAPTER 03 // THE CATALYST</span>
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.02em] text-[#F3F0E8] leading-[0.96] mb-6">
          Turn complexity <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E84B2C] via-[#F3F0E8] to-[#C86938]">
            into momentum.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#A39E93] max-w-2xl leading-relaxed">
          Arenova connects AI, automation, marketing, and websites into cohesive systems designed
          around your actual business needs. Watch fragmented chaos align into a synchronized engine.
        </p>
      </div>

      {/* INTERACTIVE COMPARISON ARCHITECTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
        {/* LEFT: SYSTEM COMPARISON CANVAS */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl glass-panel border border-[#F3F0E8]/10 relative">
            {/* TOGGLE TABS */}
            <div className="flex items-center justify-between pb-6 border-b border-[#F3F0E8]/10 mb-8">
              <span className="text-xs uppercase tracking-widest font-mono text-[#A39E93]">
                OPERATIONAL STATE SIMULATION
              </span>

              <div className="flex p-1 rounded-full bg-[#111110] border border-[#F3F0E8]/10">
                <button
                  onClick={() => setActiveTab('fragmented')}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'fragmented'
                      ? 'bg-[#2A2826] text-[#F3F0E8]'
                      : 'text-[#A39E93] hover:text-[#F3F0E8]'
                  }`}
                >
                  Fragmented
                </button>
                <button
                  onClick={() => setActiveTab('transformed')}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'transformed'
                      ? 'bg-[#E84B2C] text-[#F3F0E8] font-semibold shadow-md shadow-[#E84B2C]/20'
                      : 'text-[#A39E93] hover:text-[#F3F0E8]'
                  }`}
                >
                  Transformed
                </button>
              </div>
            </div>

            {/* DIAGRAM VISUALIZATION */}
            {activeTab === 'fragmented' ? (
              <div className="flex flex-col gap-4 py-4 animate-fadeIn">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Website Form', status: 'Unconnected', color: 'border-red-500/30' },
                    { name: 'Phone Calls', status: 'Missed After 5PM', color: 'border-red-500/30' },
                    { name: 'Manual CRM', status: 'Out of date', color: 'border-amber-500/30' },
                    { name: 'Team Slack', status: 'Overwhelmed', color: 'border-amber-500/30' },
                    { name: 'Booking Links', status: 'Double booked', color: 'border-red-500/30' },
                    { name: 'Ad Spend', status: 'Unattributed', color: 'border-red-500/30' },
                  ].map((node, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl bg-[#111110]/90 border ${node.color} flex flex-col justify-between h-28 relative`}
                    >
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div>
                        <p className="text-xs font-semibold text-[#F3F0E8]">{node.name}</p>
                        <p className="text-[10px] text-[#A39E93] font-mono mt-0.5">{node.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#E84B2C] font-mono mt-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E84B2C]" />
                  Result: Data loss, delayed bookings, exhausted team, stalled growth.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 py-4 animate-fadeIn">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'AI Front Desk', status: 'Instant <15s Triage', icon: Zap },
                    { name: 'Universal CRM Sync', status: 'Real-time 2-way', icon: Network },
                    { name: 'Autonomous Scheduler', status: 'Calendar Synced', icon: Cpu },
                    { name: 'Follow-Up Pipeline', status: 'Zero Lead Decay', icon: CheckCircle2 },
                    { name: 'Custom AI Agents', status: 'Lead Qualification', icon: Cpu },
                    { name: 'Revenue Attribution', status: 'Full Funnel Clarity', icon: Network },
                  ].map((node, i) => {
                    const Icon = node.icon;
                    return (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-[#181716] border border-[#E84B2C]/40 flex flex-col justify-between h-28 relative shadow-lg shadow-[#E84B2C]/05"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-2 h-2 rounded-full bg-[#E84B2C] animate-pulse" />
                          <Icon className="w-4 h-4 text-[#E84B2C]" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#F3F0E8]">{node.name}</p>
                          <p className="text-[10px] text-[#E84B2C] font-mono mt-0.5">{node.status}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-[#F3F0E8] font-mono mt-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Result: Connected intelligence, predictable client acquisition, 24/7 responsiveness.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: THE 4 PILLARS OF ARCHITECTURAL ADVANTAGE */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E84B2C]">
            OUR CORE TRANSFORMATION FRAMEWORK
          </span>

          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#151413]/70 border border-[#F3F0E8]/08 hover:border-[#E84B2C]/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-display font-semibold text-base text-[#F3F0E8]">
                  {pillar.title}
                </h4>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#E84B2C]/15 text-[#E84B2C] border border-[#E84B2C]/25 whitespace-nowrap">
                  {pillar.metric}
                </span>
              </div>
              <p className="text-xs text-[#A39E93] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}

          <button
            onClick={() => onNavigate('services')}
            className="mt-2 py-3.5 px-6 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#F3F0E8] font-semibold text-xs uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer shadow-lg shadow-[#E84B2C]/20"
          >
            <span>Explore our 5 specialized services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
