import { useState } from 'react';
import { ArrowUpRight, Users, Calendar, CheckSquare, ChevronDown } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface IndustryPageProps {
  onNavigate?: (sectionId: string) => void;
}

const solutions = [
  {
    icon: CheckSquare,
    title: 'Resume Extraction & Role Rubric Match Scoring',
    body: 'Parse incoming PDF and Word resumes in seconds. Extract normalized work histories, verified skills, and certifications, scoring candidates against explicit job rubrics without human bias.',
  },
  {
    icon: Users,
    title: 'Automated WhatsApp & SMS Pre-Screening',
    body: 'Engage applicants instantly over WhatsApp or SMS to confirm baseline criteria: salary expectations, notice periods, work authorization, and relocation flexibility before recruiter phone screens.',
  },
  {
    icon: Calendar,
    title: 'Bidirectional ATS Sync & Interview Scheduling',
    body: 'Synchronize candidate stages and notes bi-directionally with Greenhouse, Lever, Ashby, or Bullhorn. Coordinate interview times across multiple hiring managers automatically.',
  },
];

const faqs = [
  {
    q: 'How does the AI ensure objective and compliant resume screening?',
    a: 'We evaluate candidates strictly against objective criteria defined in your technical rubric (years of experience with specific technologies, degree requirements, or certifications). The system does not evaluate or store demographic indicators, ensuring fair and auditable screening.',
  },
  {
    q: 'Which Applicant Tracking Systems (ATS) can Arenova integrate with?',
    a: 'We integrate with Greenhouse, Lever, Ashby, Bullhorn, Workday, and custom internal recruiting databases via official REST APIs and webhooks.',
  },
  {
    q: 'Can candidates reschedule interviews autonomously?',
    a: 'Yes. If a candidate needs to reschedule, they can reply to their WhatsApp or email interview confirmation. The system reads interviewer calendar availability in real time and offers new times without recruiter back-and-forth.',
  },
];

export const RecruitmentPage = ({ onNavigate }: IndustryPageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Industry Solution · Recruitment & Staffing</p>
            <h1>AI automation for recruitment and staffing agencies.</h1>
          </div>
          <div>
            <p>
              Accelerate time-to-hire by 4x. Arenova automates resume extraction, candidate pre-screening over WhatsApp, and
              interview scheduling so recruiters focus only on interviewing qualified talent.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Request recruitment audit <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/services/ai-automation/')}>
                Explore all services
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="recruitment-solutions-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Specialized Workflows</p>
            <h2 id="recruitment-solutions-title">Automating high-volume candidate screening and placement.</h2>
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
            <h2 id="faq-title">Questions about recruitment automation.</h2>
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
          <h2>Place qualified candidates faster with automated screening pipelines.</h2>
          <p>Book a confidential consultation. We’ll show you how to automate your ATS workflows without losing the human touch.</p>
          <button className="button button--primary" onClick={contact}>
            Request recruitment audit <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

RecruitmentPage.displayName = 'RecruitmentPage';

