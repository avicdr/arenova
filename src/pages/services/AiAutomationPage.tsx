import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Layers, ShieldCheck, Zap, Database } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface ServicePageProps {
  onNavigate?: (sectionId: string) => void;
}

const workflows = [
  {
    title: 'Inbound Inquiry Qualification & Triage',
    description:
      'Capture calls, WhatsApp inquiries, and website forms. Extract firmographics, qualify intent against your criteria, route high-value leads to reps, and answer routine questions autonomously.',
    systems: 'WhatsApp Cloud API · Twilio · HubSpot · Salesforce · Slack',
  },
  {
    title: 'Outbound Sales & Lead Enrichment Pipelines',
    description:
      'Automated prospect research across LinkedIn, company registries, and news feeds. Waterfall email verification, contextual sequence drafting, reply detection, and automated calendar scheduling.',
    systems: 'Email Infrastructure · Clay · Apollo · Custom Scrapers · CRM',
  },
  {
    title: 'Cross-Departmental Operations & Document Flow',
    description:
      'Extract structured data from PDF invoices, purchase orders, and contracts. Trigger approval workflows, synchronize ERP records, and notify accounting with full audit logs.',
    systems: 'PostgreSQL · QuickBooks · Xero · Google Workspace · Stripe',
  },
];

const capabilities = [
  {
    icon: Layers,
    title: 'Deterministic Control Layer',
    body: 'Language models interpret messy natural language. Explicit code, validation schemas (Zod/Pydantic), and API permissions execute business-critical actions.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Hallucinations Guarantee',
    body: 'Financial figures, CRM stages, and calendar availability are never guessed. Operations fail safely to human operators when confidence drops below agreed thresholds.',
  },
  {
    icon: Zap,
    title: 'Multi-Tool API Orchestration',
    body: 'We build direct bi-directional microservices connecting your proprietary databases, CRMs, messaging platforms, and legacy ERPs without fragile webhook chains.',
  },
  {
    icon: Database,
    title: 'Enterprise Data Governance',
    body: 'Zero-data-retention model endpoints, isolated environment configurations, and scoped permissions ensure your intellectual property and customer records remain secure.',
  },
];

const faqs = [
  {
    q: 'What is an AI automation agency and how does it differ from a traditional software shop?',
    a: 'An AI automation agency specializes in connecting existing enterprise tools (CRMs, communication channels, databases, ERPs) using intelligent models for perception and deterministic code for execution. Unlike traditional shops that spend months writing boilerplate code from scratch, or marketing agencies building fragile Zapier chains, Arenova builds production-grade, fault-tolerant orchestration layers within weeks.',
  },
  {
    q: 'How long does a typical AI automation implementation take?',
    a: 'A single high-friction workflow (such as inbound lead triage or automated customer intake) is typically mapped, engineered, tested, and deployed to production in 2 to 4 weeks. Enterprise-wide connected automation across multiple departments is phased over 6 to 12 weeks.',
  },
  {
    q: 'Do we need to replace our current software stack?',
    a: 'No. Arenova works with the software your team already relies on. We connect systems through native REST/GraphQL APIs, webhooks, and secure cloud microservices, eliminating repeated human data transfer without forcing your team to learn a new tool.',
  },
  {
    q: 'How do you prevent AI models from making costly mistakes?',
    a: 'We isolate LLMs to classification, translation, and structured data extraction. Database writes, Stripe charges, and contract dispatches are guarded by strict deterministic rules, schema validation, and human approval gates for edge cases.',
  },
  {
    q: 'What is the pricing model for Arenova AI automation services?',
    a: 'We offer fixed monthly engineering retainers starting at $999/month for dedicated sales outreach infrastructure, $1,999/month for full business operations automation, and $3,499/month for end-to-end connected enterprise systems. Complete details are available on our pricing page.',
  },
];

export const AiAutomationPage = ({ onNavigate }: ServicePageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      {/* Hero */}
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">AI Automation Agency · Bengaluru · Global Delivery</p>
            <h1>AI automation agency for high-volume enterprise workflows.</h1>
          </div>
          <div>
            <p>
              Arenova engineers controlled, deterministic automation for inbound enquiries, customer triage, and back-office
              operations. We eliminate manual data handoffs without brittle no-code duct tape.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Request an automation audit <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/tools/automation-roi-calculator/')}>
                Calculate your ROI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Workflows */}
      <section className="section" aria-labelledby="workflows-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Production Systems</p>
            <h2 id="workflows-title">What we automate across your business.</h2>
            <p>
              We focus on workflows where manual execution causes expensive delays, data entry errors, and lost customer
              momentum.
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
            <p className="section-index">Engineering Philosophy</p>
            <h2 id="diff-title">Why deterministic systems beat brittle AI wrappers.</h2>
            <p style={{ color: 'var(--inverse-muted)' }}>
              Most AI implementations fail because they entrust critical database transactions to probabilistic models.
              Arenova uses an engineered dual-layer approach.
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
            <p className="section-index">Delivery Process</p>
            <h2 id="roadmap-title">From workflow audit to production deployment in 3 weeks.</h2>
          </div>

          <div className="friction-list">
            <article>
              <h3>Week 1 · System Audit</h3>
              <p>We trace your exact manual handoff, audit API capabilities, define error thresholds, and agree on success metrics.</p>
            </article>
            <article>
              <h3>Week 2 · Engineering & Staging</h3>
              <p>We build the orchestration microservices, validate schema boundaries, and test edge cases with synthetic traffic.</p>
            </article>
            <article>
              <h3>Week 3 · Live Deployment</h3>
              <p>Phased rollout with real data, team exception training, automated observability telemetry, and full documentation handover.</p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="faq-section" aria-labelledby="faq-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Frequently Asked Questions</p>
            <h2 id="faq-title">Answers to common questions about our AI automation agency.</h2>
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
          <h2>Ready to automate your most expensive manual workflow?</h2>
          <p>Request a confidential automation audit. We’ll analyze your process and outline the exact architecture.</p>
          <button className="button button--primary" onClick={contact}>
            Request an automation audit <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

AiAutomationPage.displayName = 'AiAutomationPage';
