import React from 'react';
import { Stethoscope, Wrench, Building, ArrowRight } from 'lucide-react';

interface IndustriesSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onNavigate }) => {
  const industries = [
    {
      title: 'Clinics & Healthcare Practices',
      subtitle: 'Dental, aesthetic clinics, physiotherapy & specialists',
      icon: Stethoscope,
      impact: 'Zero Missed Patient Bookings',
      solution:
        '24/7 AI front desk answering patient calls and WhatsApp inquiries, checking emergency triage, and booking appointment slots directly into your practice management software.',
      deliverables: ['24/7 emergency dental & medical triage', 'Direct sync with Cliniko, Dentrix & Jane App', 'Automated pre-appointment medical intake via SMS'],
    },
    {
      title: 'Home Services & Contractors',
      subtitle: 'HVAC, plumbing, electrical, roofing & restoration',
      icon: Wrench,
      impact: '<15s Job Site Call Dispatch',
      solution:
        'Technicians working on job sites cannot safely answer calls. AI voice & SMS dispatchers qualify job requests, quote estimates, and schedule arrival windows directly.',
      deliverables: ['Instant phone dispatch while techs are on ladders', 'Sync with ServiceTitan, Jobber & Housecall Pro', 'Automated quote follow-up sequences via SMS'],
    },
    {
      title: 'High-Ticket B2B & Advisory',
      subtitle: 'Consulting, commercial brokerage & professional services',
      icon: Building,
      impact: '3.4x Faster Deal Velocity',
      solution:
        'Filter out tire-kickers automatically. AI screens prospect budget, territory, and intent, booking meetings only with qualified decision-makers.',
      deliverables: ['Automated budget & territory qualification', 'Instant CRM enrichment and lead scoring', 'Automated calendar booking holds for sales teams'],
    },
  ];

  return (
    <section
      id="industries"
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 z-10 flex flex-col justify-center border-t border-[#F3F0E8]/08"
    >
      {/* SECTION HEADER */}
      <div className="max-w-4xl mb-14">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#E84B2C] uppercase font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-[#E84B2C]" />
          <span>PROVEN ACROSS INDUSTRIES</span>
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-6xl tracking-[-0.02em] text-[#F3F0E8] leading-[0.96] mb-6">
          Engineered for <br />
          <span className="text-[#A39E93]">high-volume businesses.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#A39E93] max-w-2xl leading-relaxed">
          Whether you run a private surgical clinic or a multi-van HVAC fleet, our systems adapt to your exact booking criteria and tools.
        </p>
      </div>

      {/* 3-COLUMN INDUSTRY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl">
        {industries.map((ind, idx) => {
          const Icon = ind.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#161514]/80 border border-[#F3F0E8]/08 hover:border-[#E84B2C]/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#E84B2C]/15 border border-[#E84B2C]/30 flex items-center justify-center text-[#E84B2C]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-[#34D399] px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    {ind.impact}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-[#F3F0E8] mb-1 group-hover:text-[#FFAA3D] transition-colors">
                  {ind.title}
                </h3>

                <p className="text-xs font-mono text-[#A39E93] mb-4">
                  {ind.subtitle}
                </p>

                <p className="text-sm text-[#D0CBC1] leading-relaxed mb-6">
                  {ind.solution}
                </p>

                <div className="flex flex-col gap-2 pt-4 border-t border-[#F3F0E8]/08">
                  {ind.deliverables.map((item, i) => (
                    <div key={i} className="text-xs text-[#A39E93] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E84B2C]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM CTA */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate('contact')}
          className="btn-cinematic px-6 py-3 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#F3F0E8] font-medium text-xs tracking-wider uppercase transition-all shadow-md shadow-[#E84B2C]/20 flex items-center gap-2 cursor-pointer"
        >
          <span>Get Industry Blueprint</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
