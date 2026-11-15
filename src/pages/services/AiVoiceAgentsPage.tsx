import { useState } from 'react';
import { ArrowUpRight, ChevronDown, PhoneCall, Radio, ShieldCheck, Zap } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface ServicePageProps {
  onNavigate?: (sectionId: string) => void;
}

const workflows = [
  {
    title: 'Inbound Frontdesk Reception & Triage',
    description:
      'Answer customer calls 24/7 on the first ring. The voice agent understands caller intent, resolves routine questions (hours, pricing, status), and transfers complex inquiries to the right team member.',
    systems: 'Twilio Voice · Vonage SIP · Retell AI · Bland · PostgreSQL',
  },
  {
    title: 'Outbound Appointment Confirmation & Rescheduling',
    description:
      'Autonomous outbound calling for medical practices, home services, and professional firms. Confirms attendance, handles cancellations, and coordinates reschedule slots directly on your calendar.',
    systems: 'Google Calendar · Outlook 365 · Calendly API · Twilio · Webhooks',
  },
  {
    title: 'Sub-60-Second Speed-to-Call for Inbound Leads',
    description:
      'When high-intent prospects submit a web inquiry or request a callback, our voice agent dials them within 45 seconds, verifies their criteria, and live-transfers qualified prospects to available sales reps.',
    systems: 'HubSpot · Salesforce · Close CRM · Twilio Conference · Slack',
  },
];

const capabilities = [
  {
    icon: Zap,
    title: 'Sub-600ms Conversational Latency',
    body: 'We optimize end-to-end audio streaming pipelines with real-time WebSockets, streaming speech-to-text, and fast neural voice synthesis for fluid, natural conversation.',
  },
  {
    icon: Radio,
    title: 'Barge-In & Natural Interruption',
    body: 'Callers can speak naturally and interrupt mid-sentence. The agent pauses its speech immediately, processes the new context, and adjusts smoothly without awkward overlap.',
  },
  {
    icon: PhoneCall,
    title: 'Enterprise SIP & Telephony Trunks',
    body: 'Seamless connection to Twilio, Vonage, Telnyx, or your existing on-premise PBX/SIP phone systems with local DID phone number provisioning across global regions.',
  },
  {
    icon: ShieldCheck,
    title: 'Automated CRM Call Logging',
    body: 'Every call generates a complete audio recording, word-level transcript, structured summary, sentiment score, and action checklist pushed directly to your CRM.',
  },
];

const faqs = [
  {
    q: 'How realistic do AI voice agents sound to human callers?',
    a: 'Modern neural voice synthesis produces lifelike tone, inflection, and rhythm. Combined with our sub-600ms latency engineering, conversations feel fluid and responsive rather than robotic. Callers can interrupt, ask clarifying questions, and speak colloquially.',
  },
  {
    q: 'Can the voice agent transfer live callers to a human team member?',
    a: 'Yes. Our systems support warm and cold call transfers via SIP or Twilio conference bridges. If a caller requests a human, gets frustrated, or presents an edge case, the agent dials the assigned team member and provides a 5-second whisper summary before bridging.',
  },
  {
    q: 'How does the voice agent access our business data during a call?',
    a: 'We connect the voice agent to your CRM, ERP, and scheduling systems via authenticated tool calls. When a caller asks for appointment availability or order status, the agent queries the backend in real-time within 200ms.',
  },
  {
    q: 'What telephony providers are supported?',
    a: 'We build on Twilio, Vonage, Telnyx, Amazon Chime, and standard SIP trunks. We can port your existing business phone numbers or provision new local and toll-free numbers across 80+ countries.',
  },
  {
    q: 'What is the pricing model for AI voice agent development?',
    a: 'Voice agent development is delivered through our Business Automation ($1,999/month) or Connected Automation ($3,499/month) retainers. Telephony carrier usage (Twilio per-minute SIP fees) is billed directly at cost with zero markup.',
  },
];

export const AiVoiceAgentsPage = ({ onNavigate }: ServicePageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      {/* Hero */}
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Conversational Voice AI · Telephony Engineering · Low Latency</p>
            <h1>AI voice agent development company for conversational telephony.</h1>
          </div>
          <div>
            <p>
              Arenova engineers low-latency AI voice agents that handle inbound customer calls, confirm appointments, and qualify
              leads over the phone with sub-600ms response times.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Book a voice demo <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/tools/automation-roi-calculator/')}>
                Calculate your savings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Workflows */}
      <section className="section" aria-labelledby="workflows-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Voice Workflows</p>
            <h2 id="workflows-title">Intelligent voice pipelines that replace phone tag.</h2>
            <p>
              Eliminate missed calls and tedious manual dialing with autonomous voice agents engineered for reliability and
              clarity.
            </p>
          </div>

          <div className="service-ledger">
            {workflows.map((wf, idx) => (
              <article className="service-row" key={wf.title}>
                <span className="service-row__number">0{idx + 1}</span>
                <div className="service-row__title">
                  <h3>{wf.title}</h3>
                  <p>{wf.description}</p>
                </div>
                <div className="service-row__details">
                  <p>Connected Software:</p>
                  <p style={{ color: 'var(--ink-2)', fontSize: '0.85rem' }}>{wf.systems}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Differentiation */}
      <section className="section section--ink" aria-labelledby="diff-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Technical Architecture</p>
            <h2 id="diff-title">Engineered for real-time acoustic responsiveness.</h2>
            <p style={{ color: 'var(--inverse-muted)' }}>
              Standard text-to-speech bridges produce frustrating 2-second awkward silences. We architect high-concurrency streaming
              pipelines for sub-second human turn-taking.
            </p>
          </div>

          <div className="principle-grid">
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <article key={c.title} style={{ background: 'rgba(255,255,255,0.04)', padding: '32px', borderRadius: '8px' }}>
                  <Icon style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '16px' }} />
                  <h3 style={{ color: 'white', marginBottom: '12px', fontSize: '1.25rem' }}>{c.title}</h3>
                  <p style={{ color: 'var(--inverse-muted)', margin: 0 }}>{c.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Implementation Roadmap */}
      <section className="section" aria-labelledby="roadmap-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Voice Pipeline Rollout</p>
            <h2 id="roadmap-title">Deploying your enterprise voice agent in 3 phases.</h2>
          </div>

          <div className="friction-list">
            <article>
              <h3>Phase 1 · Scripting & Telephony Routing</h3>
              <p>We map conversation decision trees, configure voice persona parameters, and set up DID phone trunks.</p>
            </article>
            <article>
              <h3>Phase 2 · Tool Calling & Latency Tuning</h3>
              <p>We integrate calendar and CRM APIs, optimize streaming audio buffers, and conduct simulated test calls.</p>
            </article>
            <article>
              <h3>Phase 3 · Live Staged Rollout & Handoff</h3>
              <p>We route overflow or off-hours calls first, train human agents on live call transfers, and monitor audio telemetry.</p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="faq-section" aria-labelledby="faq-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Frequently Asked Questions</p>
            <h2 id="faq-title">Common questions about AI voice agent development.</h2>
          </div>

          <div className="faq-grid">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div className="faq-item" key={faq.q}>
                  <button
                    className="faq-question"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      padding: '16px 0',
                      cursor: 'pointer',
                      borderBottom: '1px solid var(--line)',
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)' }}>{faq.q}</span>
                    <ChevronDown
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 200ms ease',
                        flexShrink: 0,
                        marginLeft: '12px',
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div className="faq-answer" style={{ padding: '16px 0 24px', color: 'var(--muted)', lineHeight: 1.7 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-close">
        <div className="page-frame">
          <h2>Never miss another customer phone call or lead inquiry.</h2>
          <p>Schedule a live voice demo call. Hear how our voice agent navigates conversational complexity in real-time.</p>
          <button className="button button--primary" onClick={contact}>
            Book a voice demo <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

AiVoiceAgentsPage.displayName = 'AiVoiceAgentsPage';

