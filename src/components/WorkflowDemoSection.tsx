import React, { useState } from 'react';
import {
  Stethoscope,
  Wrench,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  User,
  Bot,
} from 'lucide-react';

interface WorkflowDemoSectionProps {
  onNavigate: (sectionId: string) => void;
}

interface DemoScenario {
  id: string;
  name: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  customer: {
    name: string;
    message: string;
    time: string;
  };
  aiResponse: {
    message: string;
    time: string;
  };
  outcomes: {
    qualification: string;
    calendar: string;
    crmAction: string;
    timeSaved: string;
  };
}

export const WorkflowDemoSection: React.FC<WorkflowDemoSectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState(0);

  const scenarios: DemoScenario[] = [
    {
      id: 'clinic',
      name: 'Dental / Medical Clinic',
      badge: 'HEALTHCARE',
      icon: Stethoscope,
      customer: {
        name: 'Sarah Jenkins (Patient)',
        message:
          'Hi, I chipped a molar this afternoon and have severe sensitivity. Do you have emergency availability tomorrow morning at your Oxford clinic? I have Bupa insurance.',
        time: 'Just now',
      },
      aiResponse: {
        message:
          'Hi Sarah! We have an emergency slot available tomorrow at 9:45 AM with Dr. Sterling at our Oxford clinic, and we accept Bupa. Would you like me to reserve that appointment for you?',
        time: '8 seconds later',
      },
      outcomes: {
        qualification: 'Triage: High-Urgency Dental Trauma (Bupa Verified)',
        calendar: 'Reserved 9:45 AM slot directly in Cliniko / Dentrix',
        crmAction: 'Medical history intake SMS sent + on-call dentist alerted',
        timeSaved: 'Saved front desk ~15 minutes of phone triage',
      },
    },
    {
      id: 'hvac',
      name: 'HVAC & Home Services',
      badge: 'FIELD SERVICES',
      icon: Wrench,
      customer: {
        name: 'Marcus Vance (Facility Dir.)',
        message:
          'Our commercial server room chiller is throwing error code E-41 and ambient temp is hitting 28°C. We need emergency commercial tech dispatch today.',
        time: 'Just now',
      },
      aiResponse: {
        message:
          'Hi Marcus, emergency dispatch is confirmed. Technician Dave (Van #4) is in your zone and scheduled for arrival between 2:00 PM – 2:30 PM. A tracking link is on its way.',
        time: '11 seconds later',
      },
      outcomes: {
        qualification: 'Emergency Priority: Mission-Critical Chiller Outage',
        calendar: 'Assigned 2:00 PM arrival window in ServiceTitan',
        crmAction: 'Dispatched on-call van fleet alert + invoice draft created',
        timeSaved: 'Captured $4,200 emergency job while staff were on job sites',
      },
    },
    {
      id: 'ads-lead',
      name: 'Paid Ad Inbound Lead',
      badge: 'PERFORMANCE ADS',
      icon: TrendingUp,
      customer: {
        name: 'David Bennett (Marketing VP)',
        message:
          'Saw your Google ad for Meta Ads & AI automation. We currently spend $30k/mo on ads but our lead follow-up lag is 24 hours. Can we audit our pipeline?',
        time: 'Just now',
      },
      aiResponse: {
        message:
          'Hi David, thanks for reaching out. With a $30k/mo ad spend, cutting follow-up from 24 hours to 15 seconds typically boosts conversion by 30%+. I have reserved Wednesday at 11:00 AM for your system audit.',
        time: '12 seconds later',
      },
      outcomes: {
        qualification: 'Qualified: $30k/mo Spend, High Lead-Lag Bottleneck',
        calendar: 'Strategy Audit Call booked on Google Calendar',
        crmAction: 'Meta CAPI matched + enriched company profile saved in CRM',
        timeSaved: 'Turned a cold ad click into a qualified meeting in 1 minute',
      },
    },
  ];

  const current = scenarios[activeTab];
  const Icon = current.icon;

  return (
    <section
      id="workflow-demo"
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 z-10 flex flex-col justify-center border-t border-[#F3F0E8]/08"
    >
      {/* SECTION HEADER */}
      <div className="max-w-4xl mb-12">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#E84B2C] uppercase font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-[#E84B2C] animate-pulse" />
          <span>HOW IT WORKS</span>
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-6xl tracking-[-0.02em] text-[#F3F0E8] leading-[0.96] mb-6">
          From inquiry to booked client <br />
          <span className="text-[#FFAA3D]">in under 15 seconds.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#A39E93] max-w-2xl leading-relaxed">
          See what happens when a customer contacts your business. No missed calls, no delayed emails, and no manual copy-pasting.
        </p>
      </div>

      {/* SCENARIO SWITCHER */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {scenarios.map((sc, idx) => {
          const ScIcon = sc.icon;
          const isSelected = activeTab === idx;
          return (
            <button
              key={sc.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-[#E84B2C] text-[#F3F0E8] border-[#E84B2C] shadow-md shadow-[#E84B2C]/25'
                  : 'bg-[#181716]/80 text-[#A39E93] border-[#F3F0E8]/08 hover:border-[#F3F0E8]/20 hover:text-[#F3F0E8]'
              }`}
            >
              <ScIcon className="w-4 h-4" />
              <span>{sc.name}</span>
            </button>
          );
        })}
      </div>

      {/* INTERACTIVE DEMO CARD: CUSTOMER VIEW vs AUTOMATED OUTCOME */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mb-12">
        {/* LEFT COLUMN: WHAT THE CUSTOMER EXPERIENCES (LIVE CHAT) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#161514]/90 border border-[#F3F0E8]/10 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#F3F0E8]/08 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E84B2C]/15 border border-[#E84B2C]/30 flex items-center justify-center text-[#E84B2C]">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-[#F3F0E8]">{current.name}</p>
                  <p className="text-[10px] font-mono text-[#34D399] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    24/7 AI Receptionist Online
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#A39E93] uppercase tracking-wider px-2 py-0.5 rounded bg-[#111110]">
                Customer View
              </span>
            </div>

            {/* MESSAGE THREAD */}
            <div className="flex flex-col gap-4">
              {/* CUSTOMER INCOMING MESSAGE */}
              <div className="flex flex-col items-start gap-1 max-w-[90%]">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#A39E93] px-1">
                  <User className="w-3 h-3 text-[#FFAA3D]" />
                  <span>{current.customer.name}</span>
                  <span className="text-[#F3F0E8]/20">•</span>
                  <span>{current.customer.time}</span>
                </div>
                <div className="p-4 rounded-2xl rounded-tl-sm bg-[#1E1D1B] border border-[#F3F0E8]/08 text-sm text-[#F3F0E8] leading-relaxed">
                  "{current.customer.message}"
                </div>
              </div>

              {/* AI INSTANT RESPONSE */}
              <div className="flex flex-col items-end gap-1 max-w-[90%] self-end">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#34D399] px-1">
                  <Bot className="w-3 h-3 text-[#E84B2C]" />
                  <span>AI Front Desk</span>
                  <span className="text-[#F3F0E8]/20">•</span>
                  <span className="text-emerald-400 font-bold">{current.aiResponse.time}</span>
                </div>
                <div className="p-4 rounded-2xl rounded-tr-sm bg-[#E84B2C]/15 border border-[#E84B2C]/30 text-sm text-[#F3F0E8] leading-relaxed shadow-sm shadow-[#E84B2C]/10">
                  {current.aiResponse.message}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#F3F0E8]/08 flex items-center justify-between text-xs text-[#A39E93]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#E84B2C]" />
              Average response: &lt; 15 seconds
            </span>
            <span className="text-[11px] font-mono text-[#34D399]">100% Guardrailed</span>
          </div>
        </div>

        {/* RIGHT COLUMN: WHAT HAPPENS AUTOMATICALLY (BEHIND THE SCENES) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#131211] border border-[#E84B2C]/25 backdrop-blur-md flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#E84B2C]/10 blur-[80px] pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#F3F0E8]/08 mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFAA3D] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E84B2C]" />
                Automated Actions (Zero Staff Work)
              </span>
              <span className="text-[10px] font-mono text-[#34D399] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Completed in 12s
              </span>
            </div>

            {/* ACTION CHECKLIST */}
            <div className="flex flex-col gap-4">
              {/* ITEM 1: QUALIFICATION */}
              <div className="p-4 rounded-2xl bg-[#181716] border border-[#F3F0E8]/06 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-[#34D399] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-[#A39E93]">Instant Lead Qualification</p>
                  <p className="text-sm font-semibold text-[#F3F0E8] mt-0.5">{current.outcomes.qualification}</p>
                </div>
              </div>

              {/* ITEM 2: CALENDAR */}
              <div className="p-4 rounded-2xl bg-[#181716] border border-[#F3F0E8]/06 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-[#34D399] flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-[#A39E93]">Direct Calendar Booking</p>
                  <p className="text-sm font-semibold text-[#F3F0E8] mt-0.5">{current.outcomes.calendar}</p>
                </div>
              </div>

              {/* ITEM 3: CRM & TEAM DISPATCH */}
              <div className="p-4 rounded-2xl bg-[#181716] border border-[#F3F0E8]/06 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-[#34D399] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-[#A39E93]">CRM &amp; Team Routing</p>
                  <p className="text-sm font-semibold text-[#F3F0E8] mt-0.5">{current.outcomes.crmAction}</p>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SUMMARY HIGHLIGHT */}
          <div className="mt-6 pt-4 border-t border-[#F3F0E8]/08 flex items-center justify-between">
            <span className="text-xs font-mono text-[#FFAA3D] font-medium">
              💡 {current.outcomes.timeSaved}
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => onNavigate('contact')}
          className="btn-cinematic px-7 py-3.5 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#F3F0E8] font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl shadow-[#E84B2C]/30 flex items-center gap-2 cursor-pointer"
        >
          <span>Get This Setup For Your Business</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
