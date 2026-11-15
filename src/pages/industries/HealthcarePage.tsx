import { useState } from 'react';
import { ArrowUpRight, Activity, Calendar, ShieldCheck, ChevronDown } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface IndustryPageProps {
  onNavigate?: (sectionId: string) => void;
}

const clinicWorkflows = [
  {
    icon: Calendar,
    title: '24/7 Patient Appointment Scheduling',
    body: 'Automate telephone and WhatsApp appointment bookings. Check doctor calendar availability in real time, apply clinic booking rules, and send automated confirmation reminders.',
  },
  {
    icon: Activity,
    title: 'Intake Forms & Pre-Visit Preparation',
    body: 'Deliver secure medical intake questionnaires via SMS or WhatsApp ahead of patient visits. Collate details into the Electronic Health Records (EHR) system before patient arrival.',
  },
  {
    icon: ShieldCheck,
    title: 'Strict Non-Clinical Boundaries & Human Triage',
    body: 'All clinical medical advice is strictly excluded from AI responses. Any symptom descriptions, medical questions, or emergencies trigger immediate prioritized routing to clinical staff.',
  },
];

const faqs = [
  {
    q: 'Does the AI system offer medical advice or diagnosis?',
    a: 'No, absolutely not. Arenova strictly restricts healthcare automation to administrative coordination: practice hours, location directions, doctor availability, appointment booking, and intake document delivery. Any clinical inquiries are routed to qualified medical staff.',
  },
  {
    q: 'Can the system integrate with specialized practice management software?',
    a: 'Yes. We connect with supported medical scheduling software, Google Calendar, and clinic management APIs using secure, encrypted endpoints.',
  },
];

export const HealthcarePage = ({ onNavigate }: IndustryPageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Industry Solution · Healthcare Administration</p>
            <h1>AI automation for healthcare clinics and medical practices.</h1>
          </div>
          <div>
            <p>
              Free clinical staff from repetitive reception calls and administrative booking tasks. Arenova automates
              appointment scheduling, intake routing, and calendar reminders with strict safety boundaries.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Request clinic audit <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/services/ai-automation/')}>
                View all automation services
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="clinic-workflows-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Administrative Workflows</p>
            <h2 id="clinic-workflows-title">Eliminating front desk overload while protecting patient care.</h2>
          </div>

          <div className="principle-grid">
            {clinicWorkflows.map((w) => {
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
            <h2 id="faq-title">Questions about healthcare administration automation.</h2>
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
          <h2>Streamline your practice front desk operations.</h2>
          <p>Book a consultation to review how our front desk and scheduling systems integrate with your clinic workflow.</p>
          <button className="button button--primary" onClick={contact}>
            Schedule clinic consultation <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

HealthcarePage.displayName = 'HealthcarePage';

