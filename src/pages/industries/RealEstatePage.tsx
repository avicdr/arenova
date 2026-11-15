import { useState } from 'react';
import { ArrowUpRight, Building2, Calendar, MessageSquare, ChevronDown } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface IndustryPageProps {
  onNavigate?: (sectionId: string) => void;
}

const solutions = [
  {
    icon: MessageSquare,
    title: '24/7 WhatsApp & Voice Lead Qualification',
    body: 'Engage buyer and tenant inquiries instantly on WhatsApp or phone. Check financing readiness, preferred locations, unit preferences, and move-in timelines autonomously.',
  },
  {
    icon: Calendar,
    title: 'Automated Property Viewing Scheduling',
    body: 'Sync agent calendars with property showing availability. Send location maps, gate codes, and WhatsApp reminders to reduce no-shows by up to 60%.',
  },
  {
    icon: Building2,
    title: 'MLS & Real Estate CRM Synchronization',
    body: 'Log buyer preferences, viewing feedback, and offer amounts directly into Follow Up Boss, Salesforce, or HubSpot without manual agent data entry.',
  },
];

const faqs = [
  {
    q: 'Can the AI agent handle both WhatsApp and voice calls for real estate?',
    a: 'Yes. Arenova deploys multi-channel agents. Inquiries calling your property hotline are greeted by our voice agent, while WhatsApp messages receive instant conversational responses with property brochures and photo links.',
  },
  {
    q: 'How does the system ensure the agent does not misquote pricing or lease terms?',
    a: 'All property details are pulled directly from your verified inventory spreadsheet or MLS feed. The agent is strictly forbidden from negotiating pricing or promising terms outside of your verified listing database.',
  },
  {
    q: 'Can human real estate agents take over the conversation at any moment?',
    a: 'Yes. When a prospective buyer indicates high intent or requests a human agent, the system immediately tags your duty agent on Slack or SMS and seamlessly pauses automated responses.',
  },
];

export const RealEstatePage = ({ onNavigate }: IndustryPageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Industry Solution · Real Estate</p>
            <h1>AI automation for real estate agencies and property developers.</h1>
          </div>
          <div>
            <p>
              Capture high-intent buyers the second they inquire. Arenova automates 24/7 WhatsApp qualification, property
              showing scheduling, and CRM tracking so your agents only spend time on qualified viewings.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Request real estate audit <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/services/ai-automation/')}>
                Explore all services
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="re-solutions-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Specialized Workflows</p>
            <h2 id="re-solutions-title">Automating the high-friction real estate sales cycle.</h2>
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
            <h2 id="faq-title">Questions about real estate automation.</h2>
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
          <h2>Stop losing qualified buyers to slow response times.</h2>
          <p>Book a consultation to see an interactive demonstration of our real estate qualification and viewing engine.</p>
          <button className="button button--primary" onClick={contact}>
            Schedule real estate demo <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

RealEstatePage.displayName = 'RealEstatePage';
