import { ArrowUpRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface BlogHubPageProps {
  onNavigate?: (sectionId: string) => void;
}

const articles = [
  {
    slug: '/blog/deterministic-ai-playbook/',
    title: 'The Deterministic AI Playbook for Reliable Business Workflows',
    excerpt:
      'Why prompt-only automations fail under load and how to engineer resilient dual-layer systems with schema boundaries, dead-letter queues, and deterministic execution.',
    readTime: '9 min read',
    date: 'November 2026',
    category: 'Systems Architecture',
  },
  {
    slug: '/blog/ai-agents-vs-chatbots/',
    title: 'Autonomous AI Agents vs Traditional Chatbots: The Production Architecture Guide',
    excerpt:
      'A deep engineering breakdown comparing rule-based decision trees with goal-directed autonomous agents: memory loops, tool sandboxes, and multi-agent coordination.',
    readTime: '11 min read',
    date: 'November 2026',
    category: 'Agent Engineering',
  },
  {
    slug: '/blog/calculating-automation-roi/',
    title: 'How to Accurately Calculate Business Process Automation ROI (With Real Operational Math)',
    excerpt:
      'Move beyond vague productivity promises. Learn the exact mathematical formula for quantifying labor hours reclaimed, error remediation costs, and break-even payback velocity.',
    readTime: '7 min read',
    date: 'November 2026',
    category: 'Operations & Strategy',
  },
  {
    slug: '/blog/ai-automation-cost/',
    title: 'AI Automation Cost: Scope, Pricing Drivers, and Operating Budget',
    excerpt: 'Price the workflow boundary, failure handling, usage, maintenance, and ownership before comparing vendor quotes.',
    readTime: '6 min read', date: 'November 2026', category: 'Buyer Guide',
  },
  {
    slug: '/blog/ai-agent-evaluation-checklist/',
    title: 'AI Agent Evaluation Checklist for Business Workflows',
    excerpt: 'Test permissions, source grounding, dependency failures, escalation, logging, and rollback before production.',
    readTime: '6 min read', date: 'November 2026', category: 'Agent Engineering',
  },
  {
    slug: '/blog/n8n-vs-custom-code/',
    title: 'n8n vs Custom Code for Production Automation',
    excerpt: 'A decision framework for choosing visual orchestration, custom services, or a hybrid boundary.',
    readTime: '6 min read', date: 'November 2026', category: 'Architecture',
  },
  {
    slug: '/blog/ai-crm-integration-guide/',
    title: 'How to Integrate AI With a CRM Safely',
    excerpt: 'Identity resolution, draft-versus-write permissions, validation, audit logs, and duplicate protection.',
    readTime: '6 min read', date: 'November 2026', category: 'Integration',
  },
  {
    slug: '/blog/how-to-choose-ai-automation-agency/',
    title: 'How to Choose an AI Automation Agency',
    excerpt: 'A buyer checklist covering proof, scope, security, testing, ownership, support, pricing, and exit terms.',
    readTime: '6 min read', date: 'November 2026', category: 'Buyer Guide',
  },
];

export const BlogHubPage = ({ onNavigate }: BlogHubPageProps) => {
  const { navigate } = useRouter();

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      {/* Hero */}
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Technical Publications · Systems Architecture · Playbooks</p>
            <h1>Engineering blog and enterprise automation playbooks.</h1>
          </div>
          <div>
            <div className="subpage-hero__card">
              <div className="subpage-hero__card-head">
                <span className="card-kicker">Editorial Dispatch · 2026</span>
                <span className="card-meta">8 Engineering Playbooks</span>
              </div>
              <p>
                In-depth systems architecture, deterministic workflow design, and operational mathematical frameworks written
                by the systems engineers at Arenova.
              </p>
              <div className="subpage-hero__card-tags">
                <span>Deterministic Systems</span>
                <span>Agent Sandboxes</span>
                <span>ROI Formulations</span>
              </div>
              <div className="hero-actions">
                <button
                  className="button button--primary"
                  onClick={() => navigate('/tools/automation-roi-calculator/')}
                >
                  Try ROI Calculator <ArrowUpRight aria-hidden="true" />
                </button>
                <button
                  className="button button--secondary"
                  onClick={() => navigate('/services/ai-automation/')}
                >
                  Explore services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article List */}
      <section className="section" aria-labelledby="articles-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Cornerstone Engineering Guides</p>
            <h2 id="articles-title">Architecture, reliability, and enterprise AI systems.</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {articles.map((art) => (
              <article
                key={art.slug}
                style={{
                  background: 'var(--surface)',
                  padding: '40px',
                  borderRadius: '12px',
                  border: '1px solid var(--line)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  cursor: 'pointer',
                  transition: 'border-color 200ms ease',
                }}
                onClick={() => navigate(art.slug)}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '0.85rem', color: 'var(--ink-2)' }}>
                  <span
                    style={{
                      background: 'var(--line)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontWeight: 600,
                      color: 'var(--ink)',
                    }}
                  >
                    {art.category}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar style={{ width: '14px', height: '14px' }} /> {art.date}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Clock style={{ width: '14px', height: '14px' }} /> {art.readTime}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.6rem', margin: 0, color: 'var(--ink)' }}>
                  <a
                    href={art.slug}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(art.slug);
                    }}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {art.title}
                  </a>
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>{art.excerpt}</p>
                <div>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontWeight: 600,
                      color: 'var(--ink)',
                      fontSize: '0.95rem',
                      marginTop: '8px',
                    }}
                  >
                    Read full engineering guide <ArrowUpRight style={{ width: '16px', height: '16px' }} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-close">
        <div className="page-frame">
          <h2>Ready to engineer production automation for your company?</h2>
          <p>Request a technical systems consultation. We’ll review your existing tools and architect a reliable automation layer.</p>
          <button className="button button--primary" onClick={contact}>
            Request automation consultation <BookOpen aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

BlogHubPage.displayName = 'BlogHubPage';
