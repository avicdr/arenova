import React, { useState } from 'react';
import {
  Stethoscope,
  Wrench,
  Building,
  UtensilsCrossed,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Shield,
} from 'lucide-react';

interface IndustriesSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onNavigate }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  const industries = [
    {
      id: 'clinics',
      title: 'Clinics & Medical Practices',
      subtitle: 'Dental, aesthetic medicine, physiotherapy, and specialist healthcare practices.',
      icon: Stethoscope,
      accent: '#E84B2C',
      challenge:
        'Staff inundated with phone triage, after-hours emergency enquiries, patient scheduling adjustments, and repetitive insurance verification questions.',
      solution:
        'HIPAA-compliant AI Front Desk agents answering questions instantly, screening urgency, validating patient eligibility, and booking direct clinical slots into practice management systems.',
      capabilities: [
        '24/7 emergency dental & medical triage intake',
        'Direct calendar synchronization with Cliniko, Dentrix, and Jane App',
        'Automated pre-appointment medical history SMS collection',
        'Intelligent cancellation backfilling via waiting list automation',
      ],
      impactMetric: 'Zero missed after-hours booking enquiries',
    },
    {
      id: 'home-services',
      title: 'Home Service Businesses',
      subtitle: 'HVAC contractors, plumbing specialists, electrical, roofing, and property restoration.',
      icon: Wrench,
      accent: '#C86938',
      challenge:
        'Technicians working on job sites cannot safely answer inbound calls; delayed quote requests result in prospects calling the next local contractor on Google.',
      solution:
        'Voice and SMS AI dispatchers capturing job specifics, quoting parameters based on service zones, and scheduling technician arrival windows directly into field management software.',
      capabilities: [
        'Immediate voice answering on job-site emergency lines',
        'Integration with ServiceTitan, Housecall Pro, and Jobber',
        'Automated customer quote follow-up sequences via SMS',
        'Post-service 5-star Google Review generation campaigns',
      ],
      impactMetric: '< 15 second average call dispatch speed',
    },
    {
      id: 'real-estate',
      title: 'Real Estate & Property',
      subtitle: 'Commercial brokerages, residential agencies, and high-end property developers.',
      icon: Building,
      accent: '#D4AF37',
      challenge:
        'Agents overwhelmed with unqualified property portal inquiries, repetitive floorplan requests, and scheduling open inspection appointments manually.',
      solution:
        'Intelligent property assistants pre-qualifying buyer purchasing power, delivering tailored brochures instantly, and locking in private viewing slots for serious buyers.',
      capabilities: [
        'Automated buyer qualification (budget, financing status, timeline)',
        'Instant floorplan and property disclosure delivery via WhatsApp',
        'Private VIP inspection scheduling synchronized to agent calendars',
        'CRM sync with Rex, VaultRE, and Salesforce Property',
      ],
      impactMetric: '100% immediate brochure and tour delivery',
    },
    {
      id: 'hospitality',
      title: 'Hospitality & Appointments',
      subtitle: 'Fine dining restaurants, luxury boutique hotels, private clubs, and wellness spas.',
      icon: UtensilsCrossed,
      accent: '#E87A38',
      challenge:
        'Peak service rushes make phone answering nearly impossible, leading to missed high-value private dining enquiries and unmanaged table cancellations.',
      solution:
        'Sophisticated conversational concierge managing reservation requests, capturing dietary preferences, and automating confirmation workflows.',
      capabilities: [
        'Large group and private dining booking qualification',
        'Dietary restriction and guest preference profiling',
        'Two-way SMS reservation confirmation and deposit processing',
        'Integration with OpenTable, Resy, and SevenRooms',
      ],
      impactMetric: 'Frictionless table reservations at peak service',
    },
    {
      id: 'professional-services',
      title: 'Professional Services',
      subtitle: 'Boutique law firms, corporate accounting practices, and executive advisory consultancies.',
      icon: Briefcase,
      accent: '#F3F0E8',
      challenge:
        'Partners and senior fee-earners spending valuable billable time fielding unvetted inquiries, manual intake forms, and introductory administrative back-and-forth.',
      solution:
        'Discreet, professional intake agents screening case criteria, conducting automated conflict checks, and preparing structured client dossiers prior to introductory partner meetings.',
      capabilities: [
        'Custom intake questionnaire logic tailored to practice areas',
        'Automated mutual NDA generation and digital signature via DocuSign',
        'Secure client data handling with end-to-end encryption',
        'Direct CRM integration with Clio, Actionstep, and HubSpot',
      ],
      impactMetric: 'Partners meet only vetted, pre-qualified prospects',
    },
  ];

  const current = industries[selectedIndustry];
  const Icon = current.icon;

  return (
    <section
      id="industries"
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 z-10 flex flex-col justify-center"
    >
      {/* SECTION HEADER */}
      <div className="max-w-5xl mb-14">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#E84B2C] uppercase font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-[#E84B2C]" />
          <span>CHAPTER 06 // SECTOR ARCHITECTURES</span>
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.02em] text-[#F3F0E8] leading-[0.96] mb-6">
          Built around <br />
          <span className="text-[#A39E93]">the way you work.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#A39E93] max-w-2xl leading-relaxed">
          No two industries operate under identical constraints. We design each workflow around
          your specific compliance requirements, customer urgency, and software stack.
        </p>
      </div>

      {/* HORIZONTAL INDUSTRY SELECTOR */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
        {industries.map((ind, idx) => {
          const ItemIcon = ind.icon;
          const isSelected = selectedIndustry === idx;
          return (
            <button
              key={ind.id}
              onClick={() => setSelectedIndustry(idx)}
              className={`p-4 rounded-2xl text-left border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-[#1D1B1A] border-[#E84B2C] shadow-lg shadow-[#E84B2C]/20 scale-[1.02]'
                  : 'bg-[#151413]/70 border-[#F3F0E8]/08 hover:border-[#F3F0E8]/20 text-[#A39E93]'
              }`}
            >
              <ItemIcon
                className={`w-5 h-5 mb-3 ${
                  isSelected ? 'text-[#E84B2C]' : 'text-[#A39E93]'
                }`}
              />
              <p
                className={`text-xs font-display font-bold ${
                  isSelected ? 'text-[#F3F0E8]' : 'text-[#D0CCC3]'
                }`}
              >
                {ind.title.split('&')[0]}
              </p>
              <p className="text-[10px] font-mono opacity-60 mt-0.5">
                0{idx + 1}
              </p>
            </button>
          );
        })}
      </div>

      {/* DETAILED INDUSTRY BLUEPRINT CARD */}
      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-[#F3F0E8]/10 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: CHALLENGE & TRANSFORMATION */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#22201E] border border-[#E84B2C]/30 text-[#E84B2C]">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F3F0E8]">
                  {current.title}
                </h3>
                <p className="text-xs text-[#A39E93] font-mono mt-0.5">
                  {current.subtitle}
                </p>
              </div>
            </div>

            {/* PROBLEM VS SOLUTION COMPARISON */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#161514] border-l-2 border-red-500/60">
                <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 block mb-1">
                  The Operational Bottleneck
                </span>
                <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed">
                  {current.challenge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1B1918] border-l-2 border-[#E84B2C]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#E84B2C] block mb-1">
                  The Arenova Architecture
                </span>
                <p className="text-xs sm:text-sm text-[#F3F0E8] leading-relaxed">
                  {current.solution}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="btn-cinematic px-6 py-3 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#F3F0E8] font-medium text-xs tracking-wider uppercase transition-all shadow-md shadow-[#E84B2C]/20 flex items-center gap-2 cursor-pointer w-fit"
              >
                <span>Architect for {current.title.split('&')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT: SPECIFIC CAPABILITIES LIST */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="p-6 rounded-2xl bg-[#141312] border border-[#F3F0E8]/08">
              <span className="text-xs font-mono uppercase tracking-wider text-[#A39E93] block mb-4">
                DEPLOYED AUTOMATION CAPABILITIES
              </span>

              <div className="flex flex-col gap-3.5">
                {current.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#D0CCC3]">
                    <CheckCircle2 className="w-4 h-4 text-[#E84B2C] mt-0.5 flex-shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>

              {/* TARGET OUTCOME */}
              <div className="mt-6 pt-5 border-t border-[#F3F0E8]/08 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#A39E93]">MEASURED OUTCOME</span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {current.impactMetric}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#181716]/60 border border-[#F3F0E8]/06 flex items-center gap-3 text-xs text-[#A39E93]">
              <Shield className="w-4 h-4 text-[#E84B2C] flex-shrink-0" />
              <span>Full compliance adherence: HIPAA, GDPR, SOC2 compatible data isolation.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
