import { useState } from 'react';
import { ArrowUpRight, ChevronDown, GitMerge, FileSpreadsheet, Lock } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface ServicePageProps {
  onNavigate?: (sectionId: string) => void;
}

const processes = [
  {
    title: 'Customer & Vendor Onboarding Automation',
    description:
      'Eliminate manual data collation across forms, emails, and KYC documentation. Verify business details automatically, generate contracts, trigger e-signatures, provision accounts, and update your accounting system.',
    savings: 'Reduces onboarding cycle time from 3 days to under 15 minutes.',
  },
  {
    title: 'Intelligent Document & Invoice Reconciliation',
    description:
      'Extract line-item data from incoming invoices, match against purchase orders in your ERP, flag quantity or price discrepancies, and prepare balanced payments in Stripe or Xero with zero manual re-keying.',
    savings: 'Eliminates 95% of accounts payable manual data entry.',
  },
  {
    title: 'Multi-Department Approval & Escalation Chains',
    description:
      'Replace lost email threads with automated Slack/Teams interactive approval buttons, auto-escalations when approval deadlines lapse, and timestamped compliance records stored in your central data warehouse.',
    savings: 'Prevents operational bottlenecks and missed SLA penalties.',
  },
];

const faqs = [
  {
    q: 'What is Business Process Automation (BPA)?',
    a: 'Business Process Automation is the technology-enabled automation of complex, multi-step business transactions. Unlike basic task automation, BPA connects entire operational handoffs across disparate departments, eliminating manual data entry, human coordination delays, and compliance oversights.',
  },
  {
    q: 'How does Arenova approach BPA differently from legacy RPA vendors?',
    a: 'Legacy RPA (like older UiPath or Automation Anywhere setups) relies on fragile screen scraping that breaks whenever a web UI updates. Arenova engineers API-first, webhook-driven microservices with structured schemas and resilient error-handling, providing orders of magnitude higher reliability at a fraction of enterprise license costs.',
  },
  {
    q: 'Can you automate processes involving legacy internal software without open APIs?',
    a: 'Yes. Where direct modern REST APIs do not exist, we build secure database-level hooks, headless browser automation microservices, or custom SFTP batch ingestion pipelines to integrate legacy software cleanly into modern operational workflows.',
  },
  {
    q: 'How do you ensure data integrity and compliance during automation?',
    a: 'Every automation pipeline includes transactional rollbacks, idempotency keys (preventing accidental duplicate payments or records), and comprehensive structured logging in your own private cloud or database.',
  },
];

export const BusinessProcessAutomationPage = ({ onNavigate }: ServicePageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Business Process Automation Agency · Operations Engineering</p>
            <h1>Business process automation agency for complex operational handoffs.</h1>
          </div>
          <div>
            <p>
              Arenova connects your disconnected ERPs, CRMs, billing systems, and internal databases into resilient,
              observable operational pipelines. We remove manual data transfer so your team can focus on high-leverage work.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Request a process audit <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/tools/automation-roi-calculator/')}>
                Calculate operational savings
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="processes-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Core Operational Flows</p>
            <h2 id="processes-title">Common business processes we engineer and streamline.</h2>
            <p>Designed for organizations where repeated coordination between teams causes costly delays and human errors.</p>
          </div>

          <div className="service-ledger">
            {processes.map((p, idx) => (
              <article className="service-row" key={p.title}>
                <span className="service-row__number">0{idx + 1}</span>
                <div className="service-row__title">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
                <div className="service-row__details">
                  <p>Measurable Impact:</p>
                  <p style={{ color: 'var(--accent-dark)', fontWeight: 700, fontSize: '0.9rem' }}>{p.savings}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="bpa-pillars-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Architectural Standards</p>
            <h2 id="bpa-pillars-title">Engineered for fault tolerance and complete observability.</h2>
          </div>

          <div className="principle-grid">
            <article style={{ background: 'rgba(255,255,255,0.04)', padding: '32px', borderRadius: '8px' }}>
              <GitMerge style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '16px' }} />
              <h3 style={{ color: 'white', marginBottom: '12px' }}>Bi-Directional State Sync</h3>
              <p style={{ color: 'var(--inverse-muted)', margin: 0 }}>
                Every data change in your CRM or ERP propagates instantaneously to all connected downstream systems with
                automatic deduplication.
              </p>
            </article>

            <article style={{ background: 'rgba(255,255,255,0.04)', padding: '32px', borderRadius: '8px' }}>
              <FileSpreadsheet style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '16px' }} />
              <h3 style={{ color: 'white', marginBottom: '12px' }}>Zero Spreadsheet Glue</h3>
              <p style={{ color: 'var(--inverse-muted)', margin: 0 }}>
                Eliminate manual CSV downloads, VLOOKUPs, and email attachments. We build real-time database views and automated
                webhooks.
              </p>
            </article>

            <article style={{ background: 'rgba(255,255,255,0.04)', padding: '32px', borderRadius: '8px' }}>
              <Lock style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '16px' }} />
              <h3 style={{ color: 'white', marginBottom: '12px' }}>Idempotency & Retries</h3>
              <p style={{ color: 'var(--inverse-muted)', margin: 0 }}>
                Network timeouts and external API outages trigger automatic exponential-backoff retries and dead-letter queue
                alerts to prevent lost transactions.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Frequently Asked Questions</p>
            <h2 id="faq-title">Answers about our business process automation services.</h2>
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

      <section className="page-close">
        <div className="page-frame">
          <h2>Ready to streamline your operational bottlenecks?</h2>
          <p>Book a workflow discovery call with our engineering team. We’ll map out your manual handoffs and ROI timeline.</p>
          <button className="button button--primary" onClick={contact}>
            Request an operations audit <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

BusinessProcessAutomationPage.displayName = 'BusinessProcessAutomationPage';
