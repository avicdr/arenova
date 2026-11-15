import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Headphones, ShieldCheck, Zap, Database } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface ServicePageProps {
  onNavigate?: (sectionId: string) => void;
}

const workflows = [
  {
    title: 'Tier-1 Ticket Deflection & Instant Resolution',
    description:
      'Autonomously resolve 50–65% of repetitive customer support inquiries (order status, refund eligibility, account resets, feature how-tos) in seconds without human agent intervention.',
    systems: 'Zendesk · Freshdesk · Intercom · Gorgias · PostgreSQL',
  },
  {
    title: 'Intelligent Ticket Triage & Urgency Routing',
    description:
      'Classify incoming tickets by intent, sentiment, language, and customer account value. Automatically route VIP accounts, billing disputes, and urgent outages directly to tier-2 engineers with prepopulated diagnostic notes.',
    systems: 'Salesforce Service Cloud · Jira Service Management · Slack · PagerDuty',
  },
  {
    title: 'Support Agent Copilot & One-Click Drafts',
    description:
      'Empower human support agents with context-aware response suggestions. The AI drafts complete, policy-accurate replies ready for single-click agent approval, cutting average handle time (AHT) by 60%.',
    systems: 'Help Scout · Front · Custom Webhook Microservices · OpenAI / Claude APIs',
  },
];

const capabilities = [
  {
    icon: Headphones,
    title: 'Omnichannel Helpdesk Integration',
    body: 'Direct bi-directional webhooks and REST integrations with Zendesk, Freshdesk, Intercom, Gorgias, and Salesforce Service Cloud. No migration required.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Hallucination Policy Adherence',
    body: 'The AI never invents refund terms or technical specifications. Responses are strictly grounded in your verified policy manuals and engineering documentation.',
  },
  {
    icon: Zap,
    title: 'Instant Churn Sentiment Detection',
    body: 'Real-time NLP scans customer emotional tone. Frustrated customers or cancellation threats trigger immediate alerts in your executive or customer success Slack channels.',
  },
  {
    icon: Database,
    title: 'Automated Knowledge Base Auditing',
    body: 'The system continuously identifies gaps in your documentation where customer questions repeatedly require human escalation, creating draft articles for your team.',
  },
];

const faqs = [
  {
    q: 'Will the AI support agent give incorrect advice or promise unauthorized refunds?',
    a: 'No. We configure deterministic permission guardrails. The AI cannot issue refunds or alter accounts beyond strict pre-programmed rules. For financial concessions, address changes, or sensitive adjustments, the system drafts a recommendation for mandatory human supervisor approval.',
  },
  {
    q: 'How does the AI adapt when our products or policies change?',
    a: 'We implement automated knowledge synchronization. When you update an article in your Zendesk guide, Notion workspace, or internal wiki, the AI updates its semantic retrieval index within minutes without needing retraining.',
  },
  {
    q: 'Can we test the AI customer support agent before letting it reply to live customers?',
    a: 'Yes. We always begin with "Copilot Mode" (Shadow Mode). The AI drafts replies internally as private notes visible only to your human agents. Once your team verifies that response accuracy exceeds 95%, we activate autonomous mode for approved categories.',
  },
  {
    q: 'What languages does the AI customer support system support?',
    a: 'The system natively understands and replies in over 30 languages, including English, Spanish, French, German, Japanese, Portuguese, Hindi, and Arabic, maintaining consistent brand tone across all markets.',
  },
  {
    q: 'How much does AI customer support automation cost?',
    a: 'Our Business Automation retainer ($1,999/month) covers complete helpdesk integration, copilot workflows, knowledge base indexing, and ongoing accuracy audits.',
  },
];

export const AiCustomerSupportPage = ({ onNavigate }: ServicePageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      {/* Hero */}
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Automated Helpdesk · Ticket Deflection · Omnichannel Support</p>
            <h1>AI customer support automation for enterprise helpdesk efficiency.</h1>
          </div>
          <div>
            <p>
              Arenova builds intelligent customer service automation that deflects 60%+ of tier-1 support volume, cuts response
              times from hours to seconds, and eliminates repetitive agent burnout.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Request support audit <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/tools/automation-roi-calculator/')}>
                Calculate support ROI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Workflows */}
      <section className="section" aria-labelledby="workflows-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Support Workflows</p>
            <h2 id="workflows-title">Autonomous resolution for your highest-volume support queues.</h2>
            <p>
              Free your human support agents from repetitive password resets and shipping updates so they can focus on complex,
              high-value customer relationships.
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
            <p className="section-index">Enterprise Quality Assurance</p>
            <h2 id="diff-title">Safe, grounded automation with zero hallucinations.</h2>
            <p style={{ color: 'var(--inverse-muted)' }}>
              Brand reputation is fragile. We engineer strict policy boundaries, confidence scoring, and automated escalation to
              protect customer trust.
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
            <p className="section-index">Deployment Roadmap</p>
            <h2 id="roadmap-title">From ticket history audit to autonomous deflection in 3 weeks.</h2>
          </div>

          <div className="friction-list">
            <article>
              <h3>Week 1 · Historical Ticket Analysis</h3>
              <p>We analyze 10,000+ past support tickets to isolate the top 10 repetitive intents and document recurring edge cases.</p>
            </article>
            <article>
              <h3>Week 2 · Copilot Mode (Shadow Phase)</h3>
              <p>The AI runs in private draft mode. Your agents review its recommendations, providing feedback and confirming high accuracy.</p>
            </article>
            <article>
              <h3>Week 3 · Autonomous Rollout</h3>
              <p>We activate autonomous resolution for validated categories, configure real-time sentiment alerts, and track deflection rates.</p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="faq-section" aria-labelledby="faq-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Frequently Asked Questions</p>
            <h2 id="faq-title">Answers to common customer support automation questions.</h2>
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
          <h2>Transform your helpdesk from a cost center into an efficiency engine.</h2>
          <p>Book a confidential support audit. We’ll calculate your deflection potential and show you how it works.</p>
          <button className="button button--primary" onClick={contact}>
            Request support audit <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

AiCustomerSupportPage.displayName = 'AiCustomerSupportPage';

