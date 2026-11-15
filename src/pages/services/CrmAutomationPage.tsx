import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Users, MessageSquare, Database, Send } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface ServicePageProps {
  onNavigate?: (sectionId: string) => void;
}

const crmFeatures = [
  {
    title: 'Bi-Directional CRM State Synchronization',
    description:
      'Keep HubSpot, Salesforce, or Zoho in continuous lockstep with your internal databases, billing tools, and customer support channels. Eliminate duplicate records and outdated contact statuses.',
    icon: Database,
  },
  {
    title: 'Multi-Source Lead Enrichment & Scoring',
    description:
      'Automatically enrich incoming form leads with verified corporate emails, company revenue, employee count, and technology stack tags before your sales team reaches out.',
    icon: Users,
  },
  {
    title: 'WhatsApp Business Cloud API Integration',
    description:
      'Connect WhatsApp directly to your CRM. Qualify inbound inquiries with interactive menus, log conversation transcripts into contact activity timelines, and trigger sales tasks automatically.',
    icon: MessageSquare,
  },
  {
    title: 'Engineered Outbound Sales Infrastructure',
    description:
      'Dedicated domain setup, SPF/DKIM/DMARC authentication, automated mailbox warmup, and contextual multi-step sequences that dynamically update pipeline stages upon positive replies.',
    icon: Send,
  },
];

const faqs = [
  {
    q: 'Which CRMs does Arenova support for automation?',
    a: 'We have native, production-grade integration capabilities for HubSpot, Salesforce, Zoho CRM, Pipedrive, Close, and custom PostgreSQL/MySQL customer databases. We connect via official REST and GraphQL APIs using OAuth2 authentication.',
  },
  {
    q: 'Can you automate WhatsApp messages directly from CRM triggers?',
    a: 'Yes. We utilize the official Meta WhatsApp Business Cloud API. You can trigger automated template notifications (e.g. appointment confirmations, proposal alerts) based on CRM deal stage movements, and handle two-way conversational replies.',
  },
  {
    q: 'How does your outbound sales infrastructure protect email deliverability?',
    a: 'We isolate sales outreach on secondary domains with complete DNS authentication (SPF, DKIM, DMARC), progressive warmup schedules, and strict volume throttling (<35 emails/inbox/day) to keep your primary company domain completely safe from spam blacklists.',
  },
];

export const CrmAutomationPage = ({ onNavigate }: ServicePageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">CRM Automation & Sales Infrastructure</p>
            <h1>CRM automation and sales outreach systems engineered for growth.</h1>
          </div>
          <div>
            <p>
              Connect your CRM to real-time communication channels, automated enrichment pipelines, and outbound sales
              engines. Stop paying sales reps to manually copy-paste customer data.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Audit your sales workflow <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/pricing/')}>
                View pricing plans
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="features-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">CRM Systems</p>
            <h2 id="features-title">Everything needed for a self-updating sales pipeline.</h2>
          </div>

          <div className="principle-grid">
            {crmFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <article key={f.title} style={{ background: 'var(--surface)', padding: '32px', borderRadius: '8px' }}>
                  <Icon style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '16px' }} />
                  <h3 style={{ marginBottom: '12px', fontSize: '1.25rem' }}>{f.title}</h3>
                  <p style={{ color: 'var(--muted)', margin: 0 }}>{f.description}</p>
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
            <h2 id="faq-title">Common questions about our CRM and sales automation.</h2>
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
          <h2>Ready to turn your CRM into an autonomous sales engine?</h2>
          <p>Book a sales automation consultation with Arenova. We will inspect your pipeline and design an automated system.</p>
          <button className="button button--primary" onClick={contact}>
            Request sales consultation <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

CrmAutomationPage.displayName = 'CrmAutomationPage';
