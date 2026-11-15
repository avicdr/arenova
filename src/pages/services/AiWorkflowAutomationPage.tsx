import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface ServicePageProps {
  onNavigate?: (sectionId: string) => void;
}

const pipelineSteps = [
  {
    step: '01',
    title: 'Unstructured Data Ingestion',
    desc: 'Audio calls, WhatsApp chat streams, scanned PDF documents, and unformatted email inquiries are ingested through real-time webhooks.',
  },
  {
    step: '02',
    title: 'Intelligent Parsing & Validation',
    desc: 'State-of-the-art LLMs extract critical entities (budgets, timelines, invoice items) strictly validated against typed Pydantic/Zod schemas.',
  },
  {
    step: '03',
    title: 'Deterministic Logic & Business Rules',
    desc: 'Deterministic rule trees determine routing: VIP clients are fast-tracked, routine inquiries receive instant answers, and anomalies alert human staff.',
  },
  {
    step: '04',
    title: 'Transactional API Execution',
    desc: 'Safe, authenticated microservices update your CRM, provision services in Stripe, generate documents, and sync with project management tools.',
  },
];

const faqs = [
  {
    q: 'How does AI-powered workflow automation differ from basic automation tools like Zapier?',
    a: 'Basic no-code tools like Zapier or Make only handle simple linear triggers (e.g., "when a row is added to Google Sheets, send an email"). They break when data is messy, unstructured, or requires semantic judgment. AI workflow automation combines machine intelligence to interpret natural language and documents with custom code that handles branching logic, validation, error retries, and high-volume transactions.',
  },
  {
    q: 'What happens if a third-party API goes down during an automated workflow?',
    a: 'Arenova builds all automated pipelines with transactional message queues and dead-letter handling. If an external API (like a CRM or payment gateway) suffers a temporary outage, our system queues the event, retries with exponential backoff, and alerts your team if manual review is needed.',
  },
  {
    q: 'How do you test and verify AI workflows before deploying to live customers?',
    a: 'We create a complete staging environment with synthetic customer scenarios, historical real-world edge cases, and automated regression tests. We only promote the workflow to production once it achieves 100% adherence to your business rules and SLA requirements.',
  },
];

export const AiWorkflowAutomationPage = ({ onNavigate }: ServicePageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">AI Workflow Automation Services · Intelligent Process Engineering</p>
            <h1>AI workflow automation services for modern enterprise operations.</h1>
          </div>
          <div>
            <p>
              Replace fragile webhook chains with engineered, resilient AI workflows. Arenova designs intelligent data
              pipelines that perceive unstructured documents and execute verified actions with zero data loss.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Discuss your workflow <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/services/ai-automation/')}>
                View all services
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="pipeline-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Workflow Lifecycle</p>
            <h2 id="pipeline-title">How our intelligent workflow automation executes.</h2>
            <p>A four-stage architecture ensuring every incoming data point is parsed accurately and acted upon securely.</p>
          </div>

          <div className="principle-grid">
            {pipelineSteps.map((s) => (
              <article key={s.step} style={{ background: 'var(--surface)', padding: '32px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--accent-dark)', fontWeight: 800, fontSize: '1.1rem', display: 'block', marginBottom: '12px' }}>
                  {s.step}
                </span>
                <h3 style={{ marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.92rem' }}>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Frequently Asked Questions</p>
            <h2 id="faq-title">Everything you need to know about AI workflow automation.</h2>
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
          <h2>Have an operational workflow that needs engineering?</h2>
          <p>Let’s review the handoffs, data inputs, and failure modes. We will design a production workflow blueprint.</p>
          <button className="button button--primary" onClick={contact}>
            Request an audit <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

AiWorkflowAutomationPage.displayName = 'AiWorkflowAutomationPage';
