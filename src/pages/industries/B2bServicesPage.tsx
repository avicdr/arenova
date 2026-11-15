import { useState } from 'react';
import { ArrowUpRight, Briefcase, FileCheck, Layers, ChevronDown } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface IndustryPageProps {
  onNavigate?: (sectionId: string) => void;
}

const b2bWorkflows = [
  {
    icon: Briefcase,
    title: 'Automated Account Research & Outreach',
    body: 'Scrape decision-maker movements, trigger multi-channel email and LinkedIn sequences, and deliver pre-meeting briefing sheets directly into Slack before sales calls.',
  },
  {
    icon: FileCheck,
    title: 'Client Onboarding & Contract Provisioning',
    body: 'Automatically dispatch proposals, track signature completions in DocuSign, trigger Slack onboarding channels, and provision client portal workspaces in seconds.',
  },
  {
    icon: Layers,
    title: 'Retainer Tracking & Invoice Reconciliation',
    body: 'Reconcile project hours with monthly retainer caps, generate automated overage alerts, and synchronize billing in QuickBooks or Stripe with zero manual spreadsheets.',
  },
];

const faqs = [
  {
    q: 'How does this help boutique consultancies and marketing agencies?',
    a: 'B2B agencies often lose 15-20 hours per week per account manager on repetitive admin: copying project notes, updating CRM stages, compiling monthly reporting metrics, and following up on invoices. Arenova automates these coordination tasks so your team can focus on billable client strategy.',
  },
  {
    q: 'Can Arenova integrate with Asana, ClickUp, or Monday.com?',
    a: 'Yes. We build bi-directional workflows that sync your CRM deal wins directly into project management templates with assigned team owners and automated deadline reminders.',
  },
];

export const B2bServicesPage = ({ onNavigate }: IndustryPageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Industry Solution · B2B Professional Services</p>
            <h1>AI automation for B2B services, consultancies, and agencies.</h1>
          </div>
          <div>
            <p>
              Scale your firm without adding expensive administrative headcount. Arenova automates client onboarding,
              project provisioning, invoice reconciliation, and outbound sales pipelines.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Audit agency operations <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/tools/automation-roi-calculator/')}>
                Calculate agency savings
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="b2b-workflows-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Agency Workflows</p>
            <h2 id="b2b-workflows-title">Eliminate operational friction from sales to delivery.</h2>
          </div>

          <div className="principle-grid">
            {b2bWorkflows.map((w) => {
              const Icon = w.icon;
              return (
                <article key={w.title} style={{ background: 'var(--surface)', padding: '32px', borderRadius: '8px' }}>
                  <Icon style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '16px' }} />
                  <h3 style={{ marginBottom: '12px', fontSize: '1.25rem' }}>{w.title}</h3>
                  <p style={{ color: 'var(--muted)', margin: 0 }}>{w.body}</p>
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
            <h2 id="faq-title">Common questions about B2B operations automation.</h2>
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
          <h2>Streamline your agency or consulting operations today.</h2>
          <p>Book a confidential workflow audit. We will review your tools and design an automated operational blueprint.</p>
          <button className="button button--primary" onClick={contact}>
            Request agency audit <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

B2bServicesPage.displayName = 'B2bServicesPage';

