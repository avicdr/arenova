import { useState } from 'react';
import { ArrowUpRight, ChevronDown, MessageCircle, ShieldCheck, Zap, Database } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface ServicePageProps {
  onNavigate?: (sectionId: string) => void;
}

const workflows = [
  {
    title: '24/7 Inbound Triage & FAQ Resolution',
    description:
      'Greet customers in seconds. The AI understands messy text and voice messages, answers questions about pricing, business hours, and services, and qualifies customer requirements automatically.',
    systems: 'WhatsApp Cloud API · Meta Graph API · PostgreSQL · Pinecone',
  },
  {
    title: 'Interactive Catalog, Quotes & Checkout Links',
    description:
      'Allow customers to browse product catalogs, select options, and receive customized price estimates. Generate dynamic Stripe, Razorpay, or custom checkout links directly within the WhatsApp chat thread.',
    systems: 'Shopify · WooCommerce · Stripe · Razorpay · WhatsApp Pay',
  },
  {
    title: 'Automated Reminders & Re-Engagement Sequences',
    description:
      'Trigger official WhatsApp template messages for upcoming appointments, payment reminders, delivery updates, and inactive lead re-engagement with full opt-in compliance.',
    systems: 'HubSpot · Zoho · ActiveCampaign · Twilio Messaging API',
  },
];

const capabilities = [
  {
    icon: MessageCircle,
    title: 'Official Meta Cloud API',
    body: 'We engineer strictly on Meta’s official WhatsApp Business Cloud API. No fragile browser automation, no unauthorized proxies, and zero risk of phone number bans.',
  },
  {
    icon: Zap,
    title: 'Voice Note & Image OCR Processing',
    body: 'Customers frequently send voice memos and photos. Our pipelines transcribe audio messages via Whisper and extract text from receipts and documents via vision models.',
  },
  {
    icon: Database,
    title: 'Unified CRM & Database Sync',
    body: 'Every chat, contact detail, deal stage, and transaction is synchronized bi-directionally with HubSpot, Salesforce, Zoho, or your internal PostgreSQL database.',
  },
  {
    icon: ShieldCheck,
    title: 'Multi-Agent Human Inbox Handoff',
    body: 'Seamless handoff to human support representatives via integrated shared inbox tools (Wati, Intercom, Zendesk) whenever complex issues or VIP clients arise.',
  },
];

const faqs = [
  {
    q: 'Why should we use the official WhatsApp Cloud API instead of unofficial tools?',
    a: 'Unofficial tools scrape the web version of WhatsApp and frequently result in permanent phone number bans, message delivery failures, and compliance violations. Arenova exclusively implements Meta’s official WhatsApp Cloud API, which offers guaranteed delivery, encryption, and scalability.',
  },
  {
    q: 'Can the WhatsApp AI agent handle audio voice messages?',
    a: 'Yes. When a customer sends an audio message, our pipeline immediately feeds the audio to an automated speech recognition engine (Whisper), extracts the customer’s intent, and replies with appropriate text or synthesized voice.',
  },
  {
    q: 'How does WhatsApp messaging template pricing work?',
    a: 'Meta charges per 24-hour conversation category (Service, Utility, Authentication, Marketing). Inbound customer service conversations initiated by the user are highly cost-effective or free within Meta’s standard monthly allowances. We engineer your workflows to minimize message costs.',
  },
  {
    q: 'Can human agents take over the WhatsApp conversation?',
    a: 'Yes. We configure multi-agent shared inbox systems. When a human team member intervenes or when the customer requests an operator, the AI agent pauses autonomously and allows your team to chat directly.',
  },
  {
    q: 'What is the implementation timeline for WhatsApp AI automation?',
    a: 'From Meta Business Manager verification and Cloud API setup to knowledge base configuration and CRM integration, production deployment takes between 2 to 4 weeks.',
  },
];

export const WhatsappAutomationPage = ({ onNavigate }: ServicePageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      {/* Hero */}
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Official WhatsApp Cloud API · Automated Conversational Sales · Global</p>
            <h1>WhatsApp AI automation services for customer service and sales.</h1>
          </div>
          <div>
            <p>
              Arenova builds high-throughput WhatsApp automation systems that qualify leads, process orders, and resolve customer
              inquiries 24/7 on Meta’s official Cloud API infrastructure.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Deploy WhatsApp automation <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/services/crm-automation/')}>
                View CRM integrations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Workflows */}
      <section className="section" aria-labelledby="workflows-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Automated Messaging</p>
            <h2 id="workflows-title">Turn WhatsApp into your most productive sales channel.</h2>
            <p>
              WhatsApp is where your customers spend their time. We replace manual typing with intelligent conversational
              automation that never sleeps.
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
            <h2 id="diff-title">Enterprise security on Meta’s official infrastructure.</h2>
            <p style={{ color: 'var(--inverse-muted)' }}>
              Avoid the catastrophic business risk of WhatsApp account bans. We build enterprise-grade webhook architectures with
              proper message queueing and fallback logic.
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
            <p className="section-index">Rollout Strategy</p>
            <h2 id="roadmap-title">Launch your verified WhatsApp AI assistant in 3 weeks.</h2>
          </div>

          <div className="friction-list">
            <article>
              <h3>Week 1 · Meta Verification & API Setup</h3>
              <p>We configure your Meta Business Manager, provision official WABA phone numbers, and register approved message templates.</p>
            </article>
            <article>
              <h3>Week 2 · Conversational Logic & Tooling</h3>
              <p>We ingest your knowledge base, connect payment and booking APIs, and configure human-in-the-loop escalation paths.</p>
            </article>
            <article>
              <h3>Week 3 · Live Testing & CRM Integration</h3>
              <p>We link bi-directional data sync with your CRM, run load tests, and launch live traffic with full observability logging.</p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="faq-section" aria-labelledby="faq-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Frequently Asked Questions</p>
            <h2 id="faq-title">Answers to common WhatsApp automation questions.</h2>
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
          <h2>Ready to automate your WhatsApp customer operations?</h2>
          <p>Request a WhatsApp automation audit. We’ll map your highest-volume customer journeys and outline the system.</p>
          <button className="button button--primary" onClick={contact}>
            Deploy WhatsApp automation <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

WhatsappAutomationPage.displayName = 'WhatsappAutomationPage';

