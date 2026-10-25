import React, { useState } from 'react';
import {
  Bot,
  Workflow,
  Cpu,
  TrendingUp,
  Layout,
  CheckCircle,
  ArrowRight,
  Terminal,
  Activity,
} from 'lucide-react';

interface ServicesSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 'ai-front-desk',
      badge: 'SERVICE 01 // 24/7 COMMUNICATION',
      title: 'AI FRONT DESK AGENTS',
      headline: 'Every enquiry deserves an answer.',
      description:
        'Handle enquiries instantly across voice, web chat, SMS, and WhatsApp. Answer routine questions accurately, qualify potential clients, and schedule appointments straight into your calendar at any hour of the day or night.',
      icon: Bot,
      color: '#E84B2C',
      layoutType: 'triage',
      features: [
        'Instant response across phone, web chat, and messaging (< 15 seconds)',
        'Accurate FAQ answers trained strictly on your verified service catalog & pricing',
        'Intelligent lead qualification based on custom business criteria',
        'Direct calendar synchronization with automated appointment confirmation',
        'Zero-hallucination guardrails and seamless live agent escalation',
      ],
      integrations: ['Twilio Voice', 'WhatsApp Business', 'Calendly / Acuity', 'HubSpot', 'Dentrix / Cliniko'],
      visualData: {
        incoming: 'Phone Call / Web Chat / SMS',
        process: 'Natural Language Understanding & Intent Extraction',
        outcome: 'Scheduled Calendar Event + Qualified CRM Record',
      },
    },
    {
      id: 'workflow-automation',
      badge: 'SERVICE 02 // SYSTEMS SYCHRONIZATION',
      title: 'WORKFLOW AUTOMATION',
      headline: 'Let the work move itself.',
      description:
        'Connect your fragmented business tools into a friction-free operational pipeline. Automate repetitive administrative handoffs, synchronize customer records, and eliminate copy-pasting between disparate software.',
      icon: Workflow,
      color: '#D4AF37',
      layoutType: 'pipeline',
      features: [
        'End-to-end API orchestration across CRM, accounting, billing, and scheduling',
        'Automated contract and invoice generation upon client sign-off',
        'Two-way data sync eliminating human entry errors across departments',
        'Real-time team notification triggers via Slack, Teams, or SMS',
        'Self-healing error catching and administrative logging',
      ],
      integrations: ['Make.com', 'Zapier Enterprise', 'PostgreSQL', 'Stripe', 'QuickBooks / Xero'],
      visualData: {
        incoming: 'Contract Signed / Invoice Paid',
        process: 'Automated Account Provisioning & Folder Generation',
        outcome: 'Project Team Notified + Welcome Sequence Triggered',
      },
    },
    {
      id: 'custom-ai-agents',
      badge: 'SERVICE 03 // AUTONOMOUS WORKFORCE',
      title: 'CUSTOM AI AGENTS',
      headline: 'Intelligence with a purpose.',
      description:
        'Deploy bespoke AI agents engineered for business-specific research, document analysis, lead vetting, and complex operational tasks. These are not generic chat bots, but focused knowledge workers designed for your domain.',
      icon: Cpu,
      color: '#E87A38',
      layoutType: 'neural',
      features: [
        'Specialized domain knowledge grounding using enterprise vector embeddings',
        'Automated document extraction and proposal draft compilation',
        'Deep-dive prospect research & automated executive briefing notes',
        'Strict role-based access control and data security boundaries',
        'Human-in-the-loop review checkpoints for critical decision points',
      ],
      integrations: ['OpenAI / Anthropic APIs', 'Pinecone / Qdrant', 'Google Workspace', 'DocuSign', 'Notion'],
      visualData: {
        incoming: 'Unstructured Document / Request Payload',
        process: 'Semantic Parsing, Fact Checking & Policy Comparison',
        outcome: 'Validated Structured Summary + Draft Output',
      },
    },
    {
      id: 'marketing-paid-ads',
      badge: 'SERVICE 04 // DEMAND GENERATION & PAID ADS',
      title: 'PERFORMANCE MARKETING & PAID ADS',
      headline: 'Turn ad spend into predictable client revenue.',
      description:
        'Scale qualified customer acquisition with full-funnel Meta Ads (Facebook & Instagram) and high-intent Google Ads campaigns. We architect multi-tier retargeting, server-side CAPI attribution, and high-converting landing pages to maximize ROAS and eliminate wasted ad spend.',
      icon: TrendingUp,
      color: '#C86938',
      layoutType: 'funnel',
      features: [
        'Laser-targeted Meta Ads (Facebook & Instagram) with rapid dynamic creative testing',
        'High-intent Google Search & Performance Max campaigns capturing ready-to-buy prospects',
        'Meta Conversions API (CAPI) and GA4 server-side tracking for zero attribution loss',
        'Dedicated conversion landing pages engineered for double-digit inquiry rates',
        'Instant AI lead follow-up integration (<15s response time via WhatsApp/SMS)',
      ],
      integrations: ['Meta Business Suite', 'Google Ads', 'Meta CAPI', 'Google Tag Manager', 'GA4 Server-Side', 'Looker Studio'],
      visualData: {
        incoming: 'Meta & Google Ads Campaign Clicks',
        process: 'Dynamic Creative Hook + High-Converting Landing Page',
        outcome: 'Qualified Inbound Lead + Automated 15s AI Follow-up',
      },
    },
    {
      id: 'websites-that-convert',
      badge: 'SERVICE 05 // DIGITAL ARCHITECTURE',
      title: 'WEBSITES THAT CONVERT',
      headline: 'Make your first impression count.',
      description:
        'Design and develop distinctive, cinematic business websites with world-class typography, intuitive user journeys, and instant conversion pathways that establish immediate market authority and move prospects from curiosity to enquiry.',
      icon: Layout,
      color: '#F3F0E8',
      layoutType: 'canvas',
      features: [
        'Distinctive editorial art direction that rejects generic template aesthetics',
        'Sub-second page speeds and optimized Core Web Vitals',
        'Interactive workflow previews and engaging product demonstrations',
        'Frictionless lead capture pathways and calendar booking integrations',
        'Enterprise responsive engineering across mobile, tablet, and desktop',
      ],
      integrations: ['React / Next.js', 'Tailwind CSS', 'Three.js / WebGL', 'Headless CMS', 'Vercel / Cloudflare'],
      visualData: {
        incoming: 'First-Time Business Visitor',
        process: 'Cinematic Storytelling & Frictionless Value Demonstration',
        outcome: 'Direct High-Intent Consultation Booking',
      },
    },
  ];

  const current = services[activeService];

  return (
    <section
      id="services"
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 z-10 flex flex-col justify-center"
    >
      {/* SECTION HEADER */}
      <div className="max-w-5xl mb-14">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#E84B2C] uppercase font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-[#E84B2C]" />
          <span>CHAPTER 04 // FIVE CORE DISCIPLINES</span>
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.02em] text-[#F3F0E8] leading-[0.96] mb-6">
          Architected for <br />
          <span className="text-[#A39E93]">commercial velocity.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#A39E93] max-w-2xl leading-relaxed">
          We don't offer generic, fragmented deliverables. Each service operates as a precision
          sub-system within your overall business growth engine.
        </p>
      </div>

      {/* HORIZONTAL SERVICE TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {services.map((svc, idx) => {
          const Icon = svc.icon;
          const isSelected = activeService === idx;
          return (
            <button
              key={svc.id}
              onClick={() => setActiveService(idx)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer border ${
                isSelected
                  ? 'bg-[#E84B2C] text-[#F3F0E8] border-[#E84B2C] shadow-lg shadow-[#E84B2C]/25'
                  : 'bg-[#181716]/80 text-[#A39E93] border-[#F3F0E8]/08 hover:border-[#F3F0E8]/20 hover:text-[#F3F0E8]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{svc.title}</span>
              <span className="text-[10px] opacity-70">0{idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* SERVICE SHOWCASE: BESPOKE VISUAL COMPOSITIONS */}
      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-[#F3F0E8]/10 relative overflow-hidden transition-all duration-500">
        {/* Ambient Glow */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20"
          style={{ backgroundColor: current.color }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: EDITORIAL COPY & SPECIFICATION */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-widest uppercase text-[#E84B2C]">
                {current.badge}
              </span>
            </div>

            <h3 className="font-display font-bold text-3xl sm:text-5xl text-[#F3F0E8] leading-tight">
              {current.headline}
            </h3>

            <p className="text-base text-[#A39E93] leading-relaxed">
              {current.description}
            </p>

            {/* KEY CAPABILITIES CHECKLIST */}
            <div className="flex flex-col gap-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8]/60">
                CORE CAPABILITIES
              </span>
              {current.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-[#D0CCC3]">
                  <CheckCircle className="w-4 h-4 text-[#E84B2C] mt-0.5 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* INTEGRATED ECOSYSTEM BADGES */}
            <div className="pt-4 border-t border-[#F3F0E8]/08">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#A39E93] block mb-2.5">
                VERIFIED TECH STACK INTEGRATIONS
              </span>
              <div className="flex flex-wrap gap-2">
                {current.integrations.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-md bg-[#161514] border border-[#F3F0E8]/08 text-xs font-mono text-[#A39E93]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="btn-cinematic px-6 py-3 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#F3F0E8] font-medium text-xs tracking-wider uppercase transition-all shadow-md shadow-[#E84B2C]/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Deploy {current.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('workflow-demo')}
                className="px-5 py-3 rounded-full bg-[#1A1918] hover:bg-[#22211F] text-[#F3F0E8] border border-[#F3F0E8]/10 text-xs font-medium tracking-wider uppercase transition-all cursor-pointer"
              >
                See Live Simulation
              </button>
            </div>
          </div>

          {/* RIGHT: ARCHITECTURAL DATA FLOW BLUEPRINT */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-[#141312]/90 border border-[#F3F0E8]/10 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-[#F3F0E8]/08 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#E84B2C]" />
                  <span className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8]">
                    DATA FLOW SPECIFICATION
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-mono text-emerald-400">ACTIVE ENGINE</span>
                </div>
              </div>

              {/* STAGES OF THIS SERVICE */}
              <div className="flex flex-col gap-4">
                {/* 1. INPUT */}
                <div className="p-3.5 rounded-xl bg-[#1C1B1A] border border-[#F3F0E8]/06">
                  <span className="text-[10px] font-mono uppercase text-[#A39E93] block mb-1">
                    01 // INPUT STREAM
                  </span>
                  <p className="text-xs font-medium text-[#F3F0E8]">
                    {current.visualData.incoming}
                  </p>
                </div>

                {/* CONNECTOR ARROW */}
                <div className="flex justify-center -my-2">
                  <div className="w-0.5 h-6 bg-[#E84B2C]/40" />
                </div>

                {/* 2. PROCESSING */}
                <div className="p-3.5 rounded-xl bg-[#22201E] border border-[#E84B2C]/30 shadow-inner">
                  <span className="text-[10px] font-mono uppercase text-[#E84B2C] block mb-1">
                    02 // ARENOVA CORE EXECUTION
                  </span>
                  <p className="text-xs font-semibold text-[#F3F0E8]">
                    {current.visualData.process}
                  </p>
                </div>

                {/* CONNECTOR ARROW */}
                <div className="flex justify-center -my-2">
                  <div className="w-0.5 h-6 bg-[#E84B2C]/40" />
                </div>

                {/* 3. OUTPUT */}
                <div className="p-3.5 rounded-xl bg-[#1C1B1A] border border-emerald-500/30">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-1">
                    03 // COMMERCIAL OUTCOME
                  </span>
                  <p className="text-xs font-medium text-[#F3F0E8]">
                    {current.visualData.outcome}
                  </p>
                </div>
              </div>

              {/* TELEMETRY FOOTNOTE */}
              <div className="mt-6 pt-4 border-t border-[#F3F0E8]/08 flex items-center justify-between text-[11px] font-mono text-[#A39E93]">
                <span>SLA GUARANTEE</span>
                <span className="text-[#F3F0E8]">99.98% UPTIME</span>
              </div>
            </div>

            {/* QUICK HIGHLIGHT CARD */}
            <div className="p-5 rounded-2xl bg-[#181716]/60 border border-[#F3F0E8]/06 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E84B2C]/10 border border-[#E84B2C]/25 flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-[#E84B2C]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#F3F0E8]">Zero Lock-In Architecture</p>
                <p className="text-xs text-[#A39E93] mt-0.5">
                  You own all system logic, vector stores, and custom automation scripts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
