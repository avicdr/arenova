import React, { useState } from 'react';
import {
  Check,
  Zap,
  Bot,
  ArrowRight,
  TrendingUp,
  Workflow,
  Sparkles,
  ChevronDown,
  ArrowUpRight,
  Shield,
  Layers,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';

interface PricingPageProps {
  onNavigate?: (sectionId: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = React.memo(() => {
  const { navigate } = useRouter();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const discountMultiplier = billingCycle === 'quarterly' ? 0.85 : 1.0;

  const tiers = [
    {
      id: 'outreach-engine',
      badge: 'OUTBOUND REVENUE',
      name: 'Sales & Outreach Engine',
      subtitle: 'For B2B companies requiring predictable sales pipeline and qualified meetings on autopilot.',
      monthlyBasePrice: 999,
      icon: TrendingUp,
      accentColor: '#FFAA3D',
      featured: false,
      deliverables: [
        'Dedicated cold email infrastructure (15+ warmed secondary domains)',
        'Full SPF, DKIM, DMARC, and custom tracking domain configuration',
        'Multi-channel outreach sequences (Cold Email + LinkedIn + WhatsApp)',
        'AI hyper-personalization & B2B lead enrichment (Apollo & Clay)',
        'Automated objection handling & smart follow-up triggers',
        'Direct calendar booking & CRM deal pipeline synchronization',
        'Powered by proprietary Outreacher & Arova intelligence engine',
        'Target outcome: 20–40+ qualified sales calls booked per month',
      ],
      ctaText: 'Deploy Outreach Engine',
    },
    {
      id: 'business-automation',
      badge: 'MOST POPULAR',
      name: 'Business & Operations Automation',
      subtitle: 'For businesses ready to eliminate repetitive clerical work, disconnected apps, and operational drag.',
      monthlyBasePrice: 1999,
      icon: Workflow,
      accentColor: '#E84B2C',
      featured: true,
      deliverables: [
        'End-to-end workflow automation (Make.com, n8n, Zapier Enterprise)',
        'Bi-directional synchronization across CRM, ERP, Slack & Google Workspace',
        'Automated client onboarding, contract generation, and e-signatures',
        'Document intelligence: automated invoice & receipt extraction to accounting',
        'Internal custom Slack/Teams AI assistant with company knowledge access',
        'Real-time team notification alerts and automated approval hierarchies',
        'Eliminates 20+ hours/week of repetitive human data entry',
        'Weekly optimization sprints & continuous workflow monitoring',
      ],
      ctaText: 'Automate Operations',
    },
    {
      id: 'autonomous-enterprise',
      badge: 'FULL-STACK ECOSYSTEM',
      name: 'Autonomous Enterprise',
      subtitle: 'The complete AI operating system: growth marketing, outbound sales, 24/7 frontdesk, and deep operations.',
      monthlyBasePrice: 3499,
      icon: Layers,
      accentColor: '#D4AF37',
      featured: false,
      deliverables: [
        'Includes all systems from Sales & Outreach + Business Automation',
        '24/7 Autonomous AI Frontdesk (voice telephony, web chat & WhatsApp triage)',
        'Performance marketing automation: Meta & Google Ads conversion funnels',
        'Bespoke custom AI agent development for proprietary business logic',
        'Multi-department orchestration & multi-location branch routing',
        'Dedicated Fractional Systems Architect & private Slack channel',
        'Priority 2-hour SLA response & quarterly architecture audits',
        'Enterprise security review, HIPAA/GDPR alignment & zero data retention',
      ],
      ctaText: 'Build Autonomous Enterprise',
    },
  ];

  const faqs = [
    {
      q: 'How fast can our automation systems be live in production?',
      a: 'Most initial core workflows and outreach architectures are fully built, tested in staging, and deployed within 10 to 14 business days. Complex enterprise ERP integrations and custom multi-agent logic typically take 3 to 4 weeks.',
    },
    {
      q: 'Do we need to replace our existing software or CRM?',
      a: 'No. Arenova builds around your existing technology stack. Whether you use HubSpot, Salesforce, Pipedrive, Slack, Notion, Google Workspace, QuickBooks, or custom SQL databases, we integrate via secure webhooks and native APIs.',
    },
    {
      q: 'How do you guarantee that AI agents do not hallucinate?',
      a: 'We architect our workflows with deterministic safeguards. High-stakes actions (such as sending invoices, booking calendar slots, or updating CRM states) are executed via structured code and API schema validation. LLMs are used strictly for language understanding and semantic extraction, never for unguarded execution.',
    },
    {
      q: 'Can we add the 24/7 AI Frontdesk Receptionist as an add-on?',
      a: 'Yes. If you select the Sales & Outreach Engine or Business Automation tier, you can add our 24/7 Voice & WhatsApp Frontdesk Receptionist for $490/month, fully unified with your calendar and CRM.',
    },
    {
      q: 'What is your security and data governance policy?',
      a: 'All data is transmitted using TLS 1.3 encryption with zero-trust tokenization. We strictly enforce that your proprietary business data is never used to train public language models. We adhere to enterprise GDPR, CCPA, and HIPAA compliance protocols.',
    },
    {
      q: 'What contract commitment is required?',
      a: 'We offer month-to-month contracts with no long-term lock-in, as well as quarterly agreements discounted by 15%. You can upgrade, downgrade, or pause your engagement with 30 days notice.',
    },
  ];

  const comparisonFeatures = [
    {
      category: 'Workflow & Operations',
      items: [
        { name: 'Cross-App API Orchestration', tier1: 'Basic', tier2: 'Unlimited', tier3: 'Enterprise Unlimited' },
        { name: 'CRM & ERP Two-Way Sync', tier1: 'Pipeline only', tier2: 'Full bi-directional', tier3: 'Custom real-time pipelines' },
        { name: 'Document & Invoice Extraction AI', tier1: '—', tier2: 'Included', tier3: 'Included (high volume)' },
        { name: 'Client Onboarding Automation', tier1: '—', tier2: 'Included', tier3: 'Bespoke multi-step' },
        { name: 'Internal Slack/Teams AI Assistant', tier1: '—', tier2: '1 Agent', tier3: 'Unlimited agents' },
      ],
    },
    {
      category: 'Sales & Outbound Acquisition',
      items: [
        { name: 'Dedicated Secondary Domains & Warmup', tier1: '15+ Domains', tier2: '—', tier3: '30+ Domains' },
        { name: 'Multichannel Sequences (Email + LinkedIn)', tier1: 'Included', tier2: '—', tier3: 'Included' },
        { name: 'Lead Enrichment (Clay, Apollo, Sales Nav)', tier1: 'Included', tier2: '—', tier3: 'Custom scraping & enrichment' },
        { name: 'Expected Monthly Sales Meetings', tier1: '20–40+ calls', tier2: '—', tier3: '40–80+ calls' },
      ],
    },
    {
      category: 'Inbound & Frontdesk Communication',
      items: [
        { name: '24/7 Inbound Telephony Voice AI', tier1: 'Add-on ($490/mo)', tier2: 'Add-on ($490/mo)', tier3: 'Fully Included' },
        { name: 'WhatsApp & Web Chat Triage (<15s)', tier1: 'Add-on', tier2: 'Add-on', tier3: 'Fully Included' },
        { name: 'Automated Calendar Scheduling', tier1: 'Outbound only', tier2: 'Internal only', tier3: 'Full Inbound & Outbound' },
      ],
    },
    {
      category: 'Growth & Dedicated Architecture',
      items: [
        { name: 'Meta & Google Ads Campaign Engine', tier1: '—', tier2: '—', tier3: 'Included' },
        { name: 'Dedicated Fractional Systems Architect', tier1: 'Shared', tier2: 'Dedicated Engineer', tier3: 'Dedicated Lead Architect' },
        { name: 'Response Time SLA', tier1: '24 Hours', tier2: '8 Hours', tier3: '2 Hours (Priority)' },
      ],
    },
  ];

  return (
    <div className="relative z-10 w-full min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto flex flex-col">
      {/* BREADCRUMB / SECTION BADGE */}
      <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#E84B2C] uppercase font-mono mb-6">
        <span className="w-2 h-2 rounded-full bg-[#E84B2C]" />
        <span>TRANSPARENT PRICING & TIERS</span>
      </div>

      {/* HEADER */}
      <div className="max-w-4xl mb-12">
        <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] text-[#F3F0E8] leading-[0.96] mb-6">
          Invest in systems <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0E8] via-[#FFD2A0] to-[#FFAA3D]">
            that work while you sleep.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[#A39E93] max-w-2xl leading-relaxed">
          Predictable monthly investments for end-to-end AI automation. Replace fragmented SaaS clutter and manual busywork with resilient, revenue-generating digital infrastructure.
        </p>
      </div>

      {/* BILLING TOGGLE */}
      <div className="flex items-center justify-center sm:justify-start gap-4 mb-14">
        <div className="p-1 rounded-full bg-[#181716] border border-[#F3F0E8]/10 flex items-center">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-[#E84B2C] text-[#111110] font-bold shadow-md shadow-[#E84B2C]/30'
                : 'text-[#A39E93] hover:text-[#F3F0E8]'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('quarterly')}
            className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              billingCycle === 'quarterly'
                ? 'bg-[#E84B2C] text-[#111110] font-bold shadow-md shadow-[#E84B2C]/30'
                : 'text-[#A39E93] hover:text-[#F3F0E8]'
            }`}
          >
            <span>Quarterly</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              Save 15%
            </span>
          </button>
        </div>
      </div>

      {/* 3 TIERS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          const price = Math.round(tier.monthlyBasePrice * discountMultiplier);

          return (
            <div
              key={tier.id}
              className={`p-8 sm:p-9 rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
                tier.featured
                  ? 'bg-[#181716] border-2 border-[#E84B2C] shadow-2xl shadow-[#E84B2C]/20 scale-[1.02]'
                  : 'bg-[#141312]/90 border border-[#F3F0E8]/10 hover:border-[#F3F0E8]/25'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#E84B2C] text-[#111110] font-mono font-bold text-[11px] uppercase tracking-widest shadow-md">
                  Most Requested System
                </div>
              )}

              <div>
                {/* TOP HEADER */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                    style={{
                      backgroundColor: `${tier.accentColor}15`,
                      borderColor: `${tier.accentColor}40`,
                      color: tier.accentColor,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#A39E93]">
                    {tier.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-[#F3F0E8] mb-2">
                  {tier.name}
                </h3>
                <p className="text-xs text-[#A39E93] leading-relaxed mb-6 min-h-[36px]">
                  {tier.subtitle}
                </p>

                {/* PRICE DISPLAY */}
                <div className="pb-6 border-b border-[#F3F0E8]/08 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-4xl sm:text-5xl text-[#F3F0E8]">
                      ${price.toLocaleString()}
                    </span>
                    <span className="text-xs font-mono text-[#A39E93] uppercase">
                      / month
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-[#7D7970] mt-1">
                    {billingCycle === 'quarterly'
                      ? 'Billed quarterly ($' + (price * 3).toLocaleString() + ' total)'
                      : 'Billed monthly. Cancel with 30 days notice.'}
                  </p>
                </div>

                {/* DELIVERABLES LIST */}
                <div className="flex flex-col gap-3 mb-8">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#F3F0E8]/70">
                    What&apos;s Engineered:
                  </span>
                  {tier.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-[#D0CBC1]">
                      <div className="w-4 h-4 rounded-full bg-[#E84B2C]/15 flex items-center justify-center mt-0.5 shrink-0 text-[#E84B2C]">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div>
                <button
                  onClick={() => navigate('/#ascent')}
                  className={`w-full py-4 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    tier.featured
                      ? 'btn-cinematic bg-[#E84B2C] hover:bg-[#D94022] text-[#111110] shadow-xl shadow-[#E84B2C]/30'
                      : 'bg-[#1E1D1B] hover:bg-[#282724] text-[#F3F0E8] border border-[#F3F0E8]/15 hover:border-[#F3F0E8]/30'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* STANDALONE ADD-ON MODULE */}
      <div className="mb-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#181716] via-[#1F1D1B] to-[#181716] border border-[#FFAA3D]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex items-start sm:items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#FFAA3D]/15 border border-[#FFAA3D]/30 flex items-center justify-center text-[#FFAA3D] shrink-0">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#FFAA3D]/10 border border-[#FFAA3D]/20 text-[10px] font-mono text-[#FFAA3D] uppercase tracking-wider mb-2">
              Standalone or Add-on Module
            </div>
            <h3 className="font-display font-bold text-2xl text-[#F3F0E8] mb-1">
              24/7 Autonomous AI Frontdesk & Inbound Receptionist
            </h3>
            <p className="text-xs sm:text-sm text-[#A39E93] max-w-2xl leading-relaxed">
              Inbound telephony voice agent & WhatsApp triage receptionist. Answers inquiries in &lt;15 seconds, qualifies prospects, books appointments directly into your calendar, and dispatches emergency escalations 24/7/365.
            </p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full lg:w-auto gap-4 shrink-0 border-t lg:border-t-0 lg:border-l border-[#F3F0E8]/10 pt-4 lg:pt-0 lg:pl-8">
          <div>
            <span className="font-display font-bold text-3xl sm:text-4xl text-[#F3F0E8]">
              $490
            </span>
            <span className="text-xs font-mono text-[#A39E93] uppercase"> / mo</span>
          </div>
          <button
            onClick={() => navigate('/#ascent')}
            className="px-6 py-3 rounded-full bg-[#FFAA3D] hover:bg-[#E59930] text-[#111110] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#FFAA3D]/20"
          >
            <span>Add Frontdesk AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* DETAILED FEATURE COMPARISON TABLE */}
      <div className="mb-24">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E84B2C] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DEEP SPECIFICATION MATRIX</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F3F0E8]">
            Compare Systems Side-by-Side
          </h2>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-[#F3F0E8]/10 bg-[#141312]/80 backdrop-blur-md">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#F3F0E8]/10 bg-[#181716]">
                <th className="p-5 font-mono uppercase tracking-wider text-[#A39E93] w-2/5">
                  Capability / Architecture
                </th>
                <th className="p-5 font-mono uppercase tracking-wider text-[#FFAA3D] text-center w-1/5">
                  Sales & Outreach
                </th>
                <th className="p-5 font-mono uppercase tracking-wider text-[#E84B2C] text-center w-1/5">
                  Business Automation
                </th>
                <th className="p-5 font-mono uppercase tracking-wider text-[#D4AF37] text-center w-1/5">
                  Autonomous Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((group, gIdx) => (
                <React.Fragment key={gIdx}>
                  <tr className="bg-[#1C1B19]/50 border-b border-[#F3F0E8]/08">
                    <td
                      colSpan={4}
                      className="p-3.5 px-5 font-mono uppercase text-[11px] tracking-widest text-[#E84B2C] font-semibold"
                    >
                      {group.category}
                    </td>
                  </tr>
                  {group.items.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="border-b border-[#F3F0E8]/05 hover:bg-[#181716]/50 transition-colors"
                    >
                      <td className="p-4 px-5 text-[#D0CBC1] font-medium">{row.name}</td>
                      <td className="p-4 text-center font-mono text-[#A39E93]">{row.tier1}</td>
                      <td className="p-4 text-center font-mono text-[#F3F0E8] font-semibold">
                        {row.tier2}
                      </td>
                      <td className="p-4 text-center font-mono text-[#FFAA3D] font-bold">
                        {row.tier3}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <div className="max-w-4xl mx-auto mb-20 w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E84B2C] mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>INTELLIGENCE & FREQUENT QUESTIONS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#F3F0E8]">
            Clear Answers. Zero Fluff.
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#161514]/90 border border-[#F3F0E8]/08 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:text-[#FFAA3D]"
                >
                  <span className="font-display font-semibold text-base sm:text-lg text-[#F3F0E8]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-[#F3F0E8]/10 flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-[#E84B2C]/20 border-[#E84B2C]/40 text-[#E84B2C]' : 'text-[#A39E93]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-[#A39E93] leading-relaxed border-t border-[#F3F0E8]/05 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM CTA BANNER */}
      <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-[#1E1D1B] to-[#121110] border border-[#E84B2C]/30 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E84B2C]/10 border border-[#E84B2C]/30 text-xs font-mono text-[#E84B2C] uppercase tracking-wider mb-6">
          <Zap className="w-3.5 h-3.5" />
          <span>Complimentary Technical Architecture Audit</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#F3F0E8] max-w-2xl leading-tight mb-4">
          Not sure which automation architecture fits your workflow?
        </h2>
        <p className="text-sm sm:text-base text-[#A39E93] max-w-xl leading-relaxed mb-8">
          We inspect your current manual bottlenecks, tools, and acquisition pipeline to design a custom systems blueprint before you invest a dollar.
        </p>
        <button
          onClick={() => navigate('/#ascent')}
          className="btn-cinematic px-8 py-4 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#111110] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl shadow-[#E84B2C]/30 flex items-center gap-2 cursor-pointer"
        >
          <span>Claim Your Free Architecture Audit</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});

PricingPage.displayName = 'PricingPage';
