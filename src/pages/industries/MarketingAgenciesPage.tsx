import { useState } from 'react';
import { ArrowUpRight, BarChart3, FolderSync, ShieldCheck, ChevronDown } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface IndustryPageProps {
  onNavigate?: (sectionId: string) => void;
}

const solutions = [
  {
    icon: BarChart3,
    title: 'Automated Multi-Platform Client Reporting',
    body: 'Aggregate performance metrics across Google Ads, Meta Ads, TikTok Ads, LinkedIn, and GA4 into clean client dashboards. The AI drafts executive performance summaries highlighting key wins and spend efficiency.',
  },
  {
    icon: FolderSync,
    title: 'Instant Client Onboarding & Tool Provisioning',
    body: 'When a client signs via DocuSign or PandaDoc, our workflow automatically creates private Slack channels, initializes ClickUp/Asana project boards, provisions Google Drive structures, and sends calendar booking links.',
  },
  {
    icon: ShieldCheck,
    title: 'Automated Creative QA & UTM Validation',
    body: 'Scan deliverable assets against brand guidelines, verify tracking pixel parameters and UTM links, check image dimensions for all ad formats, and flag copy errors before client presentation.',
  },
];

const faqs = [
  {
    q: 'How much time does automated reporting save our account managers?',
    a: 'On average, agencies spend 4 to 8 hours per client per month manually pulling data from ad platforms and drafting commentary. Our automated pipelines reduce this to under 15 minutes of review time per client.',
  },
  {
    q: 'Can the reporting tool connect to Looker Studio or Google Sheets?',
    a: 'Yes. We feed normalized ad and analytics data into Google BigQuery, PostgreSQL, Looker Studio, or Google Sheets so your clients can view real-time data on their preferred dashboard.',
  },
  {
    q: 'What project management software do you support for agency onboarding?',
    a: 'We build native onboarding automation for ClickUp, Asana, Monday.com, Linear, Jira, and Notion, integrating directly with Slack and Google Workspace.',
  },
];

export const MarketingAgenciesPage = ({ onNavigate }: IndustryPageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Industry Solution · Marketing Agencies & Studios</p>
            <h1>AI automation for marketing agencies and creative studios.</h1>
          </div>
          <div>
            <p>
              Scale your agency without hiring more account coordinators. Arenova automates multi-platform client reporting,
              project onboarding, and creative QA so your team focuses on high-margin strategy and creative output.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Request agency operations audit <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/services/business-process-automation/')}>
                View process automation
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="agency-solutions-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Specialized Workflows</p>
            <h2 id="agency-solutions-title">Eliminating operational drag in high-growth agencies.</h2>
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
            <h2 id="faq-title">Questions about agency operations automation.</h2>
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
          <h2>Free your account managers from manual spreadsheets.</h2>
          <p>Book an agency workflow audit. We’ll show you how to automate client reporting and project onboarding in 2 weeks.</p>
          <button className="button button--primary" onClick={contact}>
            Request agency operations audit <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

MarketingAgenciesPage.displayName = 'MarketingAgenciesPage';

