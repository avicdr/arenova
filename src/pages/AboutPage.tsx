import React from 'react';
import {
  ShieldCheck,
  Zap,
  Cpu,
  Workflow,
  ArrowRight,
  TrendingUp,
  Bot,
  Lock,
  ArrowUpRight,
  Terminal,
  Server,
  Layers,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';

interface AboutPageProps {
  onNavigate?: (sectionId: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = React.memo(() => {
  const { navigate } = useRouter();

  const principles = [
    {
      num: '01',
      title: 'Deterministic Logic. Zero Hallucination.',
      description:
        'Large Language Models are powerful reasoning engines, but they should never run critical infrastructure unmonitored. We isolate LLM reasoning inside strict deterministic state machines, ensuring CRM data, contracts, and scheduling follow exact schema validations.',
      icon: Terminal,
      color: '#E84B2C',
    },
    {
      num: '02',
      title: 'Deep System Integration',
      description:
        'We do not deliver shallow Zapier recipes. We engineer robust, bidirectional pipelines that bridge legacy databases, modern cloud ERPs, telephony carriers (Twilio), payment gateways (Stripe), and messaging gateways (WhatsApp Business API).',
      icon: Server,
      color: '#FFAA3D',
    },
    {
      num: '03',
      title: 'Speed as an Unfair Advantage',
      description:
        'In both outbound sales and inbound customer triage, speed dictates conversion. Our systems answer inbound inquiries in under 15 seconds and trigger hyper-personalized outbound touches within milliseconds of prospect activity.',
      icon: Zap,
      color: '#D4AF37',
    },
    {
      num: '04',
      title: 'Enterprise Security & Data Sovereignty',
      description:
        'Your proprietary business data, client lists, and internal records belong exclusively to you. Every pipeline uses TLS 1.3 encryption, zero-retention API endpoints, and we never permit your data to train third-party foundation models.',
      icon: Lock,
      color: '#34D399',
    },
  ];

  const ecosystemProducts = [
    {
      name: 'Arenova Automation Agency',
      tag: 'CORE CONSULTANCY',
      url: 'https://arenova.in',
      description:
        'Bespoke AI architecture, end-to-end workflow automation, and custom agent engineering tailored for high-growth enterprises.',
      icon: Workflow,
      color: '#E84B2C',
    },
    {
      name: 'Arenova Frontdesk',
      tag: 'INBOUND VOICE & CHAT',
      url: 'https://frontdesk.arenova.in',
      description:
        'Autonomous 24/7 telephony voice agent and WhatsApp receptionist that screens enquiries, answers FAQs, and books appointments.',
      icon: Bot,
      color: '#FFAA3D',
    },
    {
      name: 'Arova Intelligence',
      tag: 'B2B LEAD DISCOVERY',
      url: 'https://arova.arenova.in',
      description:
        'Deep B2B account discovery, multi-signal buying intent detection, and automated contact enrichment engine.',
      icon: TrendingUp,
      color: '#D4AF37',
    },
    {
      name: 'Outreacher Engine',
      tag: 'OUTBOUND ACCELERATION',
      url: 'https://outreacher.arenova.in',
      description:
        'Multi-channel cold acquisition infrastructure, dedicated domain warmup, automated inbox rotation, and AI personalization.',
      icon: Layers,
      color: '#34D399',
    },
  ];

  return (
    <div className="relative z-10 w-full min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto flex flex-col">
      {/* BREADCRUMB / SECTION BADGE */}
      <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#E84B2C] uppercase font-mono mb-6">
        <span className="w-2 h-2 rounded-full bg-[#E84B2C]" />
        <span>ABOUT ARENOVA & OUR PHILOSOPHY</span>
      </div>

      {/* HERO SECTION */}
      <div className="max-w-4xl mb-16">
        <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] text-[#F3F0E8] leading-[0.96] mb-6">
          Engineering the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0E8] via-[#FFD2A0] to-[#FFAA3D]">
            autonomous enterprise.
          </span>
        </h1>
        <p className="text-base sm:text-xl text-[#A39E93] max-w-3xl leading-relaxed">
          We build resilient, deterministic AI automation systems that eliminate manual friction, modernize disconnected software stacks, and scale business revenue without expanding headcount.
        </p>
      </div>

      {/* WHY ARENOVA EXISTS (THE PROBLEM WITH MODERN SOFTWARE) */}
      <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-[#161514]/90 border border-[#F3F0E8]/10 backdrop-blur-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E84B2C]/10 border border-[#E84B2C]/30 text-xs font-mono text-[#E84B2C] uppercase tracking-wider w-fit">
              <Cpu className="w-3.5 h-3.5" />
              <span>The Problem We Solve</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F3F0E8] leading-tight">
              Most businesses run on software duct tape.
            </h2>
            <p className="text-sm sm:text-base text-[#D0CBC1] leading-relaxed">
              Modern companies pay for dozens of specialized SaaS tools — yet human employees spend hours every week acting as the manual bridge between them. Copying leads from email into CRM, chasing calendar bookings, updating spreadsheets, and re-typing invoices into accounting software.
            </p>
            <p className="text-sm sm:text-base text-[#A39E93] leading-relaxed">
              This manual clerical overhead drains talent, creates bottlenecks, and slows revenue. Arenova replaces brittle human glue with intelligent, self-healing automation systems that execute flawlessly around the clock.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4 text-center font-mono">
            <div className="p-6 rounded-2xl bg-[#111110] border border-[#F3F0E8]/08 flex flex-col items-center justify-center">
              <span className="font-display font-bold text-3xl sm:text-4xl text-[#E84B2C] mb-1">
                20+ hrs
              </span>
              <span className="text-xs text-[#A39E93] uppercase tracking-wider">
                Weekly Admin Saved Per Team
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-[#111110] border border-[#F3F0E8]/08 flex flex-col items-center justify-center">
              <span className="font-display font-bold text-3xl sm:text-4xl text-[#FFAA3D] mb-1">
                &lt;15s
              </span>
              <span className="text-xs text-[#A39E93] uppercase tracking-wider">
                Average Inbound Response Time
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-[#111110] border border-[#F3F0E8]/08 flex flex-col items-center justify-center">
              <span className="font-display font-bold text-3xl sm:text-4xl text-[#34D399] mb-1">
                99.98%
              </span>
              <span className="text-xs text-[#A39E93] uppercase tracking-wider">
                Pipeline Automation Uptime
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-[#111110] border border-[#F3F0E8]/08 flex flex-col items-center justify-center">
              <span className="font-display font-bold text-3xl sm:text-4xl text-[#F3F0E8] mb-1">
                0%
              </span>
              <span className="text-xs text-[#A39E93] uppercase tracking-wider">
                Data Retention on Foundation Models
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CORE ENGINEERING PRINCIPLES */}
      <div className="mb-24">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E84B2C] mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>HOW WE BUILD</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#F3F0E8]">
            Four Architectural Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.num}
                className="p-8 rounded-3xl bg-[#161514]/85 border border-[#F3F0E8]/08 hover:border-[#E84B2C]/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-[#E84B2C] tracking-widest">
                      {principle.num}
                    </span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${principle.color}15`,
                        borderColor: `${principle.color}35`,
                        color: principle.color,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#F3F0E8] mb-3 group-hover:text-[#FFAA3D] transition-colors">
                    {principle.title}
                  </h3>

                  <p className="text-sm text-[#A39E93] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PROPRIETARY ECOSYSTEM */}
      <div className="mb-24">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E84B2C] mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>THE ARENOVA ECOSYSTEM</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#F3F0E8]">
            Integrated Technology Stack
          </h2>
          <p className="text-sm sm:text-base text-[#A39E93] mt-3">
            In addition to custom client implementations, Arenova engineers specialized proprietary platforms across communication, sales intelligence, and outbound acceleration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystemProducts.map((prod, idx) => {
            const Icon = prod.icon;
            return (
              <a
                key={idx}
                href={prod.url}
                target={prod.url.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-[#161514]/90 border border-[#F3F0E8]/08 hover:border-[#FFAA3D]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${prod.color}15`,
                        borderColor: `${prod.color}35`,
                        color: prod.color,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#A39E93] group-hover:text-[#FFAA3D] transition-colors" />
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#E84B2C] block mb-1 font-semibold">
                    {prod.tag}
                  </span>

                  <h3 className="font-display font-bold text-lg text-[#F3F0E8] mb-2 group-hover:text-[#FFAA3D] transition-colors">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-[#A39E93] leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* FOUNDER & ENGINEERING LEADERSHIP */}
      <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-[#141312] border border-[#F3F0E8]/10 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E84B2C]">
            <span>FOUNDER & ARCHITECT</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F3F0E8]">
            Engineered with conviction by Avi.
          </h2>
          <p className="text-sm sm:text-base text-[#D0CBC1] leading-relaxed">
            Arenova was founded on a singular conviction: businesses do not fail from a shortage of software; they fail from operational friction and poor systems integration.
          </p>
          <p className="text-sm text-[#A39E93] leading-relaxed">
            We partner with ambitious founders, clinics, professional services, and high-growth companies to replace manual drag with mission-critical digital workforces. Every line of code, webhook, and agent prompt is vetted for production resilience.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-[#A39E93] pt-2">
            <span>Direct: avi@arenova.in</span>
            <span>•</span>
            <span>HQ: Bangalore, India / Global Delivery</span>
          </div>
        </div>

        <div className="shrink-0">
          <button
            onClick={() => navigate('/#ascent')}
            className="btn-cinematic px-8 py-4 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#111110] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl shadow-[#E84B2C]/30 flex items-center gap-2 cursor-pointer"
          >
            <span>Book Founder Architecture Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-[#1E1D1B] to-[#121110] border border-[#E84B2C]/30 text-center flex flex-col items-center">
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#F3F0E8] max-w-2xl leading-tight mb-4">
          Ready to eliminate clerical friction in your business?
        </h2>
        <p className="text-sm sm:text-base text-[#A39E93] max-w-xl leading-relaxed mb-8">
          Request a complimentary technical audit of your current operations, outbound pipelines, and software tools.
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

AboutPage.displayName = 'AboutPage';

