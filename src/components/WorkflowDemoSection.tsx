import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Mail,
  Calendar,
  Send,
  Database,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Building2,
  Stethoscope,
  Wrench,
  Target,
} from 'lucide-react';

interface WorkflowDemoSectionProps {
  onNavigate: (sectionId: string) => void;
}

interface Scenario {
  id: string;
  name: string;
  industry: string;
  icon: any;
  customerName: string;
  enquiryText: string;
  intent: string;
  extractedData: Record<string, string>;
  routingTarget: string;
  followUpAction: string;
}

export const WorkflowDemoSection: React.FC<WorkflowDemoSectionProps> = ({ onNavigate }) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionTimestamp] = useState(() => '2026-10-30T12:00:00.000Z');

  const scenarios: Scenario[] = [
    {
      id: 'clinic',
      name: 'Apex Dental Practice',
      industry: 'Healthcare / Clinic',
      icon: Stethoscope,
      customerName: 'Sarah Jenkins',
      enquiryText:
        'Hi, I chipped a molar this afternoon and have severe sensitivity. Do you have emergency availability tomorrow morning at your Oxford clinic? I also have Bupa dental insurance.',
      intent: 'Urgent Appointment Request - Dental Trauma',
      extractedData: {
        prospect: 'Sarah Jenkins',
        urgency: 'HIGH (Pain score 8/10)',
        procedure: 'Emergency Molar Restoration',
        insurance_provider: 'Bupa Dental UK',
        preferred_time: 'Tomorrow 09:30 AM',
        target_clinic: 'Oxford Clinic Hub',
        lead_score: '96 / 100',
      },
      routingTarget: 'Dentrix Practice Suite + On-Call Triage Dr. Sterling (SMS alert)',
      followUpAction:
        'SMS Confirmation dispatched with pre-appointment digital medical history link + calendar hold reserved for 09:45 AM.',
    },
    {
      id: 'hvac',
      name: 'Vanguard Climate Services',
      industry: 'Home Services / HVAC',
      icon: Wrench,
      customerName: 'Marcus Vance',
      enquiryText:
        'Our commercial server room chiller on the 4th floor is throwing code E-41 and ambient temp is hitting 28C. We need a commercial tech dispatched today under emergency priority.',
      intent: 'Mission-Critical Equipment Failure',
      extractedData: {
        prospect: 'Marcus Vance (Facility Dir.)',
        facility: 'Vance Logistics Server Wing',
        urgency: 'CRITICAL',
        equipment: 'Carrier Commercial Chiller 400kW',
        error_code: 'E-41 (Refrigerant Low Pressure)',
        dispatch_radius: 'Zone 2 North Metro',
        lead_score: '99 / 100',
      },
      routingTarget: 'ServiceTitan Field Dispatch + Priority On-Call Van #4 Fleet Alert',
      followUpAction:
        'Automated dispatch SMS with technician GPS tracking link + priority billing confirmation invoice created.',
    },
    {
      id: 'law',
      name: 'Blackwood Corporate Advisory',
      industry: 'Professional Services',
      icon: Building2,
      customerName: 'Elena Rostova',
      enquiryText:
        'We are acquiring a 35-person SaaS business and need expedited IP due diligence and founder share purchase agreement review completed within 14 business days.',
      intent: 'M&A Due Diligence Retainer',
      extractedData: {
        prospect: 'Elena Rostova (Managing Partner)',
        target_sector: 'B2B SaaS / Enterprise IP',
        transaction_window: '14 Business Days',
        deal_bracket: '$4M - $8M ARR',
        urgency: 'MODERATE-HIGH',
        conflict_status: 'CLEARED (Automated DB check)',
        lead_score: '94 / 100',
      },
      routingTarget: 'HubSpot Enterprise Pipeline + Private Slack Channel #deal-inbound-urgent',
      followUpAction:
        'Automated Mutual NDA sent via DocuSign + Partner intake discovery video meeting scheduled for Thursday 2:00 PM.',
    },
    {
      id: 'paid-marketing',
      name: 'OmniVelo Direct Growth',
      industry: 'Paid Ads / Meta & Google Funnel',
      icon: Target,
      customerName: 'Marcus Bennett',
      enquiryText:
        'Prospect tapped Instagram Reels ad ("Scale Qualified Customer Volume 3x"). Completed our interactive 4-step diagnostic qualification funnel for a $35k/mo paid media engagement.',
      intent: 'High-Intent Inbound Lead from Meta Ads (CAPI Verified)',
      extractedData: {
        prospect: 'Marcus Bennett (VP Growth)',
        source_channel: 'Meta Ads // Instagram Reels Hook #03',
        monthly_media_budget: '$35,000 / month',
        acquisition_goal: 'Scale Meta & Google Ads to 4.5x+ ROAS',
        attribution_status: 'Meta CAPI Verified + GA4 Server Match',
        lead_score: '97 / 100 (VIP High Intent)',
      },
      routingTarget: 'Meta CAPI Offline Signal + HubSpot Growth Pipeline + Instant WhatsApp Executive Handshake',
      followUpAction:
        'Automated WhatsApp & SMS welcome dispatched in 11 seconds with customized ROI projection deck + direct calendar link booked for Wednesday 11:00 AM.',
    },
  ];

  const currentScenario = scenarios[selectedScenarioIndex];

  // Auto-play simulation cycle
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= 5) {
            setIsPlaying(false);
            return 5;
          }
          return prev + 1;
        });
      }, 2600);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentStep(1);
  };

  const steps = [
    {
      step: 1,
      title: 'Customer Submits Enquiry',
      actor: 'Inbound Channel',
      icon: Send,
      summary: 'Prospect interacts via website chat, voice call, or messaging.',
    },
    {
      step: 2,
      title: 'AI Front Desk Triage',
      actor: 'Arenova NLU Engine',
      icon: Cpu,
      summary: 'Zero-hallucination semantic parsing, urgency grading, and intent classification.',
    },
    {
      step: 3,
      title: 'Structured Info Extraction',
      actor: 'Data Schema Parser',
      icon: Database,
      summary: 'Cleanses unstructured prose into standardized, machine-readable JSON entities.',
    },
    {
      step: 4,
      title: 'Automated CRM & Team Routing',
      actor: 'API Orchestrator',
      icon: Mail,
      summary: 'Syncs lead directly into CRM, checks conflicts, and pings key personnel.',
    },
    {
      step: 5,
      title: 'Follow-Up & Booking Triggered',
      actor: 'Execution Pipeline',
      icon: Calendar,
      summary: 'Automated confirmation, calendar appointment held, and client briefing drafted.',
    },
  ];

  return (
    <section
      id="workflow-demo"
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 z-10 flex flex-col justify-center"
    >
      {/* SECTION HEADER */}
      <div className="max-w-5xl mb-14">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#E84B2C] uppercase font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-[#E84B2C] animate-ping" />
          <span>CHAPTER 05 // INTERACTIVE ARCHITECTURE LAB</span>
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.02em] text-[#F3F0E8] leading-[0.96] mb-6">
          See the system work. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E84B2C] via-[#F3F0E8] to-[#C86938]">
            In real time.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-[#A39E93] max-w-2xl leading-relaxed">
          Test our automated enquiry pipeline below. Choose a business vertical, step through the 5
          stages, and inspect the real JSON telemetry passed between systems.
        </p>

        {/* DEMO LAB DISCLAIMER */}
        <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full bg-[#1A1918] border border-[#F3F0E8]/10 text-[11px] font-mono text-[#A39E93]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>LOCAL BROWSER DEMONSTRATION // SIMULATED ENVIRONMENT (NO REAL PATIENT/CLIENT DATA)</span>
        </div>
      </div>

      {/* CONTROL BAR: SCENARIO SELECTOR & PLAYBACK */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#161514]/90 border border-[#F3F0E8]/10 mb-8">
        {/* SCENARIO SELECTOR */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-mono uppercase text-[#A39E93] mr-2 hidden sm:inline">
            Scenario:
          </span>
          {scenarios.map((sc, idx) => {
            const Icon = sc.icon;
            const isSelected = selectedScenarioIndex === idx;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  setSelectedScenarioIndex(idx);
                  setCurrentStep(1);
                  setIsPlaying(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#E84B2C] text-[#F3F0E8] font-semibold shadow-md shadow-[#E84B2C]/20'
                    : 'bg-[#1E1D1B] text-[#A39E93] hover:text-[#F3F0E8]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sc.industry}</span>
              </button>
            );
          })}
        </div>

        {/* SIMULATION CONTROLS */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E1D1B] hover:bg-[#282724] border border-[#F3F0E8]/15 text-xs font-mono text-[#F3F0E8] transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#E84B2C]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Auto-Play Simulation</span>
              </>
            )}
          </button>

          <button
            onClick={resetSimulation}
            className="p-2 rounded-full bg-[#1E1D1B] hover:bg-[#282724] border border-[#F3F0E8]/15 text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5-STEP VISUAL PIPELINE PROGRESS TRACK */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {steps.map((st) => {
          const Icon = st.icon;
          const isActive = currentStep === st.step;
          const isDone = currentStep > st.step;
          return (
            <button
              key={st.step}
              onClick={() => {
                setCurrentStep(st.step);
                setIsPlaying(false);
              }}
              className={`p-4 rounded-2xl text-left border transition-all duration-300 cursor-pointer relative ${
                isActive
                  ? 'bg-[#1C1B19] border-[#E84B2C] shadow-lg shadow-[#E84B2C]/15 scale-[1.02]'
                  : isDone
                  ? 'bg-[#161514]/80 border-emerald-500/30 text-[#D0CCC3]'
                  : 'bg-[#141312]/50 border-[#F3F0E8]/06 text-[#75726B] hover:border-[#F3F0E8]/15'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`w-6 h-6 rounded-full text-xs font-mono flex items-center justify-center font-bold ${
                    isActive
                      ? 'bg-[#E84B2C] text-[#F3F0E8]'
                      : isDone
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-[#201F1D] text-[#75726B]'
                  }`}
                >
                  {isDone ? '✓' : st.step}
                </span>
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-[#E84B2C]' : isDone ? 'text-emerald-400' : 'text-[#75726B]'
                  }`}
                />
              </div>

              <p className="text-xs font-bold font-display line-clamp-1 mb-1">
                {st.title}
              </p>
              <p className="text-[10px] font-mono opacity-70 line-clamp-1">
                {st.actor}
              </p>
            </button>
          );
        })}
      </div>

      {/* LIVE STAGE INSPECTOR: 2 COLUMN LAB INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: LIVE SCENARIO CONTEXT & ACTIVE STAGE VISUAL */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="p-7 rounded-3xl glass-panel border border-[#F3F0E8]/10">
            <div className="flex items-center justify-between pb-4 border-b border-[#F3F0E8]/08 mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E84B2C]">
                STAGE 0{currentStep} // {steps[currentStep - 1].title}
              </span>
              <span className="text-[11px] font-mono text-[#A39E93]">
                ACTOR: {steps[currentStep - 1].actor}
              </span>
            </div>

            {/* STAGE DETAILS */}
            <p className="text-sm text-[#F3F0E8] mb-6 leading-relaxed">
              {steps[currentStep - 1].summary}
            </p>

            {/* DYNAMIC STAGE RENDERING */}
            {currentStep === 1 && (
              <div className="p-4 rounded-xl bg-[#181716] border border-[#F3F0E8]/08">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono uppercase text-[#A39E93]">
                    Incoming Message from {currentScenario.customerName}
                  </span>
                </div>
                <blockquote className="text-sm italic text-[#F3F0E8] leading-relaxed">
                  "{currentScenario.enquiryText}"
                </blockquote>
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex flex-col gap-3">
                <div className="p-4 rounded-xl bg-[#1C1A18] border border-[#E84B2C]/30">
                  <span className="text-[11px] font-mono text-[#E84B2C] block mb-1 uppercase">
                    Intent Classification
                  </span>
                  <p className="text-base font-semibold text-[#F3F0E8]">
                    {currentScenario.intent}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[#141312] border border-[#F3F0E8]/06 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A39E93]">Semantic Confidence</span>
                  <span className="text-emerald-400 font-bold">99.4% (Zero Hallucination Grounded)</span>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="p-4 rounded-xl bg-[#151413] border border-[#F3F0E8]/10">
                <span className="text-[11px] font-mono text-[#A39E93] block mb-3 uppercase">
                  Sanitized Schema Fields Extracted
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {Object.entries(currentScenario.extractedData).map(([k, v]) => (
                    <div key={k} className="p-2 rounded bg-[#1B1A19]">
                      <span className="text-[#A39E93] block text-[10px]">{k}</span>
                      <span className="text-[#F3F0E8] font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="p-4 rounded-xl bg-[#181716] border border-blue-500/30">
                <span className="text-[11px] font-mono text-blue-400 block mb-1 uppercase">
                  CRM & Dispatch Target
                </span>
                <p className="text-sm font-semibold text-[#F3F0E8] mb-3">
                  {currentScenario.routingTarget}
                </p>
                <div className="p-3 rounded bg-[#111110] text-xs font-mono text-[#A39E93] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Webhook 200 OK — Payload delivered in 118ms</span>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="p-4 rounded-xl bg-[#181716] border border-emerald-500/30">
                <span className="text-[11px] font-mono text-emerald-400 block mb-1 uppercase">
                  Automated Customer Follow-Up
                </span>
                <p className="text-sm font-medium text-[#F3F0E8] mb-3">
                  {currentScenario.followUpAction}
                </p>
                <div className="p-3 rounded bg-emerald-950/20 border border-emerald-500/20 text-xs font-mono text-emerald-300">
                  Status: Pipeline cycle completed with zero human administrative friction.
                </div>
              </div>
            )}

            {/* STEPPING CONTROLS */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#F3F0E8]/08">
              <button
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 rounded-full bg-[#181716] hover:bg-[#201F1D] text-xs font-mono text-[#A39E93] hover:text-[#F3F0E8] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                ← Previous Stage
              </button>

              <span className="text-xs font-mono text-[#A39E93]">
                {currentStep} of 5
              </span>

              <button
                disabled={currentStep === 5}
                onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                className="px-4 py-2 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-xs font-mono text-[#F3F0E8] font-semibold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed shadow-md shadow-[#E84B2C]/20"
              >
                Next Stage →
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: LIVE TELEMETRY PAYLOAD CONSOLE (REAL JSON INSPECTION) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="rounded-3xl bg-[#0D0D0C] border border-[#F3F0E8]/10 overflow-hidden shadow-2xl">
            {/* TERMINAL HEADER */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#161514] border-b border-[#F3F0E8]/08">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#E84B2C]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8]">
                  SYSTEM TELEMETRY // STAGE_{currentStep}_PAYLOAD.JSON
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* RAW CODE INSPECTION */}
            <div className="p-5 font-mono text-xs text-[#E84B2C] leading-relaxed overflow-x-auto max-h-[380px]">
              <pre className="text-[#D0CCC3]">
                {JSON.stringify(
                  {
                    engine: 'Arenova Orchestration Engine v2.4',
                    timestamp: sessionTimestamp,
                    scenario_id: currentScenario.id,
                    active_stage: currentStep,
                    stage_name: steps[currentStep - 1].title,
                    source_channel: 'OmniInboundGateway',
                    customer_profile: {
                      name: currentScenario.customerName,
                      industry: currentScenario.industry,
                    },
                    extracted_payload: currentScenario.extractedData,
                    routing_destination: currentScenario.routingTarget,
                    downstream_action: currentScenario.followUpAction,
                    execution_metrics: {
                      latency_ms: 114 + currentStep * 18,
                      security_protocol: 'TLS 1.3 / AES-256 GCM',
                      error_rate: '0.00%',
                    },
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            {/* FOOTER BAR */}
            <div className="px-5 py-3 bg-[#111110] border-t border-[#F3F0E8]/08 flex items-center justify-between text-[11px] font-mono text-[#A39E93]">
              <span>STATUS: HEALTHY</span>
              <span className="text-emerald-400">LATENCY: {114 + currentStep * 18}ms</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#161514]/70 border border-[#F3F0E8]/06 flex items-center justify-between">
            <p className="text-xs text-[#A39E93]">
              Need this exact architecture tailored to your business software stack?
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#F3F0E8] text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shadow-md shadow-[#E84B2C]/20 flex items-center gap-1.5"
            >
              <span>Build this system</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
