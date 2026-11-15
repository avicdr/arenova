import { useState } from 'react';
import { ArrowUpRight, Activity, Terminal, ShieldAlert, ChevronDown } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface IndustryPageProps {
  onNavigate?: (sectionId: string) => void;
}

const solutions = [
  {
    icon: Activity,
    title: 'Product Usage Telemetry & Churn Early Warning',
    body: 'Monitor in-app event streams from Segment, Mixpanel, or PostHog. When key user activity drops below healthy thresholds, our webhook microservices alert Customer Success in Slack and assign proactive outreach tasks in HubSpot.',
  },
  {
    icon: Terminal,
    title: 'Support-to-Engineering Bug Reproduction Triage',
    body: 'Convert messy customer support complaints into clean developer issues. The AI parses the user report, extracts browser environment details, outlines steps to reproduce, and creates structured Linear or GitHub issues with relevant priority tags.',
  },
  {
    icon: ShieldAlert,
    title: 'Automated Trial Onboarding & Activation Triggers',
    body: 'Track trial milestone progression in real time. If a new user signs up but doesn’t invite a teammate or connect an integration within 48 hours, trigger tailored contextual emails or in-app nudges to drive activation.',
  },
];

const faqs = [
  {
    q: 'How does the churn warning system avoid overwhelming Customer Success with false alarms?',
    a: 'We configure composite scoring criteria. Alerts only fire when a drop in product usage coincides with key risk indicators—such as unassigned seats, decreased team logins, or recent negative support ticket sentiment.',
  },
  {
    q: 'Can the bug triage system sanitize sensitive customer data before creating GitHub issues?',
    a: 'Yes. Our PII masking layers strip API keys, credit card numbers, passwords, and private user identifiers before formatting and posting the bug ticket to Linear or GitHub.',
  },
  {
    q: 'Which analytics and telemetry tools can be connected?',
    a: 'We connect directly to Segment, Mixpanel, Amplitude, PostHog, RudderStack, and custom PostgreSQL/Snowflake data warehouses via webhooks and REST APIs.',
  },
];

export const SaasPage = ({ onNavigate }: IndustryPageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Industry Solution · B2B SaaS & Platforms</p>
            <h1>AI automation for B2B SaaS companies and software platforms.</h1>
          </div>
          <div>
            <p>
              Protect net revenue retention and eliminate developer interruptions. Arenova automates product churn warnings,
              guided trial activation sequences, and support-to-engineering bug ticket triage.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Request SaaS workflow audit <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/services/custom-ai-development/')}>
                View custom AI engineering
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="saas-solutions-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Specialized Workflows</p>
            <h2 id="saas-solutions-title">Protecting recurring revenue and engineering focus.</h2>
          </div>

          <div className="principle-grid">
            {solutions.map((s) => {
              const Icon = s.icon;
              return (
                <article key={s.title} style={{ background: 'var(--surface)', padding: '32px', borderRadius: '8px' }}>
                  <Icon style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '16px' }} />
                  <h3 style={{ marginBottom: '12px', fontSize: '1.25rem' }}>{s.title}</h3>
                  <p style={{ color: 'var(--muted)', margin: 0 }}>{s.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Frequently Asked Questions</p>
            <h2 id="faq-title">Questions about B2B SaaS automation.</h2>
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
          <h2>Automate your SaaS operations and stop preventable churn.</h2>
          <p>Book a technical scoping session. We’ll show you how to connect product telemetry directly to customer success.</p>
          <button className="button button--primary" onClick={contact}>
            Request SaaS workflow audit <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

SaasPage.displayName = 'SaasPage';

