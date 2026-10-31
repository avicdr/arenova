import React from 'react';
import { Bot, TrendingUp, Workflow, CheckCircle, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  const services = [
    {
      id: 'marketing-paid-ads',
      badge: 'DEMAND GENERATION',
      title: 'Meta & Google Ads',
      headline: 'Predictable Inbound Acquisition',
      description:
        'We build high-converting paid social (Facebook & Instagram) and high-intent Google Search campaigns that capture qualified prospects ready to buy.',
      icon: TrendingUp,
      color: '#E84B2C',
      metric: '4.8x Avg ROAS',
      highlights: [
        'Dynamic creative testing across Meta Ads',
        'Google Search & PMax high-intent capture',
        'Server-side CAPI & GA4 attribution tracking',
        'Conversion-optimized landing pages',
      ],
      integrations: ['Meta Ads', 'Google Ads', 'Google Analytics 4', 'Shopify / CRM'],
    },
    {
      id: 'ai-front-desk',
      badge: '24/7 COMMUNICATION',
      title: 'AI Front Desk Agents',
      headline: 'Every Call & Message Answered in <15s',
      description:
        'Voice telephony and WhatsApp receptionists that answer routine questions accurately, screen budget and territory, and schedule appointments straight into your calendar 24/7.',
      icon: Bot,
      color: '#FFAA3D',
      metric: '<15s Response Time',
      highlights: [
        '24/7 instant response across phone, WhatsApp, SMS & web',
        'Accurate FAQ answers trained strictly on your pricing & policies',
        'Custom lead qualification scorecard (no tire-kickers)',
        'Direct calendar booking (Calendly, Acuity, Dentrix, Cliniko)',
      ],
      integrations: ['Twilio Voice', 'WhatsApp Business', 'Calendly', 'HubSpot'],
    },
    {
      id: 'workflow-automation',
      badge: 'OPERATIONS',
      title: 'Workflow Automation',
      headline: 'Eliminate Repetitive Manual Work',
      description:
        'Connect your fragmented tools into a friction-free operational pipeline. Automate lead routing, client onboarding, invoicing, and team notifications.',
      icon: Workflow,
      color: '#D4AF37',
      metric: '15+ hrs/wk Saved',
      highlights: [
        'End-to-end API orchestration (CRM, billing, scheduling)',
        'Automated contract & invoice dispatch upon client sign-off',
        'Two-way data sync eliminating human data entry errors',
        'Real-time team notification triggers via Slack or SMS',
      ],
      integrations: ['Make.com', 'Zapier Enterprise', 'PostgreSQL', 'Stripe'],
    },
  ];

  return (
    <section
      id="services"
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 z-10 flex flex-col justify-center border-t border-[#F3F0E8]/08"
    >
      {/* SECTION HEADER */}
      <div className="max-w-4xl mb-14">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#E84B2C] uppercase font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-[#E84B2C]" />
          <span>WHAT WE BUILD</span>
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-6xl tracking-[-0.02em] text-[#F3F0E8] leading-[0.96] mb-6">
          Three systems. <br />
          <span className="text-[#A39E93]">Built to drive revenue.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#A39E93] max-w-2xl leading-relaxed">
          We combine customer acquisition, 24/7 lead capture, and automated backend execution into one synchronized engine.
        </p>
      </div>

      {/* 3-COLUMN SERVICE CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 max-w-7xl">
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.id}
              className="p-8 rounded-3xl bg-[#161514]/85 border border-[#F3F0E8]/08 hover:border-[#E84B2C]/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-10 group-hover:opacity-25 transition-opacity"
                style={{ backgroundColor: svc.color }}
              />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#E84B2C]/15 border border-[#E84B2C]/30 flex items-center justify-center text-[#E84B2C]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#34D399] px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    {svc.metric}
                  </span>
                </div>

                <span className="text-xs font-mono uppercase tracking-widest text-[#E84B2C] block mb-2">
                  {svc.badge}
                </span>

                <h3 className="font-display font-bold text-2xl text-[#F3F0E8] mb-1">
                  {svc.title}
                </h3>

                <p className="text-sm font-medium text-[#FFAA3D] mb-4">
                  {svc.headline}
                </p>

                <p className="text-sm text-[#A39E93] leading-relaxed mb-6">
                  {svc.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-col gap-2.5 pt-4 border-t border-[#F3F0E8]/08 mb-6">
                  {svc.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#D0CBC1]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#E84B2C] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integrations footer */}
              <div className="pt-4 border-t border-[#F3F0E8]/08 flex flex-wrap gap-1.5">
                {svc.integrations.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-[#111110] text-[11px] font-mono text-[#A39E93] border border-[#F3F0E8]/05"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => onNavigate('contact')}
          className="btn-cinematic px-7 py-3.5 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#F3F0E8] font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl shadow-[#E84B2C]/30 flex items-center gap-2 cursor-pointer"
        >
          <span>Request an Architecture Audit</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => onNavigate('workflow-demo')}
          className="px-6 py-3.5 rounded-full bg-[#181716]/80 hover:bg-[#201F1D] text-[#F3F0E8] border border-[#F3F0E8]/15 font-medium text-xs sm:text-sm tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer"
        >
          See System Demo
        </button>
      </div>
    </section>
  );
};
