import { useState } from 'react';
import { ArrowUpRight, ChevronDown, TrendingUp, ShieldCheck, Zap, Database } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface ServicePageProps {
  onNavigate?: (sectionId: string) => void;
}

const workflows = [
  {
    title: 'Sub-60-Second Inbound Lead Speed-to-Contact',
    description:
      'Contact high-intent buyers while they are still on your website. When a form is submitted, the AI enriches firmographics in 5 seconds, qualifies buying readiness, and sends a personalized email or SMS before competitors even open the notification.',
    systems: 'HubSpot · Salesforce · Clearbit · Twilio · Slack Alerts',
  },
  {
    title: 'Multi-Source Waterfall Data Enrichment',
    description:
      'Eliminate bad contact data and high bounce rates. We route prospect domains through a multi-vendor waterfall (Apollo, Clay, Hunter, Dropcontact) to find verified direct dials and deliverable email addresses.',
    systems: 'Clay · Apollo API · Hunter · ZeroBounce · LinkedIn Sales Nav',
  },
  {
    title: 'Autonomous Outbound Personalization & Follow-Up',
    description:
      'Scale relevant outbound without lazy generic templates. The AI monitors funding rounds, job changes, and company news, drafting tailored problem-oriented emails and managing multi-step follow-up cadences.',
    systems: 'Instantly · Smartlead · Google Workspace · Outlook 365 · Lemlist',
  },
];

const capabilities = [
  {
    icon: TrendingUp,
    title: 'Speed-to-Lead Acceleration',
    body: 'Harvard Business Review proves responding within 5 minutes increases qualification odds by 21x. Our automation reduces initial response time to under 60 seconds.',
  },
  {
    icon: ShieldCheck,
    title: 'Deliverability & Domain Protection',
    body: 'We engineer isolated secondary domains, automated inbox warmup, SPF/DKIM/DMARC records, and spam-trigger content filters to protect your primary domain reputation.',
  },
  {
    icon: Zap,
    title: 'Automated CRM Pipeline Hygiene',
    body: 'Never chase reps to update fields. Inbound activity, deal stage transitions, email opens, meeting bookings, and lost deal reasons are synchronized autonomously.',
  },
  {
    icon: Database,
    title: 'Automated Executive Meeting Briefs',
    body: '30 minutes before every scheduled sales call, your reps receive a concise briefing doc in Slack summarizing the prospect’s career history, company tech stack, and pain points.',
  },
];

const faqs = [
  {
    q: 'How does AI sales automation protect our primary company domain from spam penalties?',
    a: 'We never send cold outbound emails from your primary corporate domain. We purchase dedicated lookalike domains, configure SPF, DKIM, and DMARC records, warm inboxes across 21 days, and throttle daily send volumes to maintain 98%+ deliverability.',
  },
  {
    q: 'Can the sales automation system book meetings directly on our reps’ calendars?',
    a: 'Yes. When an interested prospect replies or asks for a consultation, the AI detects buying intent, matches the prospect against your territory routing rules, and offers live scheduling slots directly connected to Google Calendar or Outlook 365.',
  },
  {
    q: 'How does the system ensure outbound emails don’t sound like robotic spam?',
    a: 'Rather than using one-shot LLM prompts, we build dynamic prompt templates grounded in specific verified facts: recent press releases, job openings, mutual connections, or technologies detected in the prospect’s tech stack. Every message reads like a thoroughly researched human note.',
  },
  {
    q: 'What CRM platforms do you integrate with?',
    a: 'We have native, production-tested integrations with HubSpot, Salesforce, Close, Pipedrive, and Zoho CRM. We also synchronize with custom internal Postgres/MySQL sales databases.',
  },
  {
    q: 'What is the pricing model for sales automation engineering?',
    a: 'Our Sales & Outreach retainer ($999/month) covers dedicated email infrastructure setup, waterfall enrichment logic, sequence copywriting, CRM syncing, and continuous deliverability monitoring.',
  },
];

export const AiSalesAutomationPage = ({ onNavigate }: ServicePageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      {/* Hero */}
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">AI Sales Automation Agency · Pipeline Acceleration · Inbound Speed-to-Lead</p>
            <h1>AI sales automation agency for high-conversion pipeline growth.</h1>
          </div>
          <div>
            <p>
              Arenova engineers autonomous sales infrastructure: sub-60-second inbound speed-to-lead, waterfall prospect
              enrichment, and personalized outbound sequences that fill your calendar.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Audit your sales pipeline <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/pricing/')}>
                View sales pricing ($999/mo)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Workflows */}
      <section className="section" aria-labelledby="workflows-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Sales Workflows</p>
            <h2 id="workflows-title">Automate the tedious friction between lead capture and booked revenue.</h2>
            <p>
              Your sales reps should spend their day speaking with qualified prospects, not copying data between spreadsheets and
              hunting for verified email addresses.
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
            <h2 id="diff-title">Engineered deliverability and CRM integrity.</h2>
            <p style={{ color: 'var(--inverse-muted)' }}>
              Most automated outreach fails because of burned email domains and messy CRM duplication. We build resilient sales
              engines that protect your reputation.
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
            <p className="section-index">Execution Roadmap</p>
            <h2 id="roadmap-title">From zero to fully automated sales pipeline in 3 weeks.</h2>
          </div>

          <div className="friction-list">
            <article>
              <h3>Week 1 · Domain Infrastructure & Warmup</h3>
              <p>We provision secondary domains, configure DNS security records (SPF, DKIM, DMARC), and begin gradual warmup.</p>
            </article>
            <article>
              <h3>Week 2 · Inbound Enrichment & CRM Webhooks</h3>
              <p>We connect form triggers, build waterfall enrichment tables, and program calendar scheduling automation.</p>
            </article>
            <article>
              <h3>Week 3 · Sequence Deployment & Reply Handling</h3>
              <p>We launch personalized outbound copy, activate auto-reply detection, and configure meeting alert channels in Slack.</p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="faq-section" aria-labelledby="faq-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Frequently Asked Questions</p>
            <h2 id="faq-title">Answers to common sales automation questions.</h2>
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
          <h2>Accelerate your revenue engine with automated sales infrastructure.</h2>
          <p>Book a pipeline scoping consultation. We’ll demonstrate how our waterfall enrichment and speed-to-lead work.</p>
          <button className="button button--primary" onClick={contact}>
            Audit your sales pipeline <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

AiSalesAutomationPage.displayName = 'AiSalesAutomationPage';

