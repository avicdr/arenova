import { ArrowUpRight, CheckCircle2, Clock3, FileCheck2, ShieldCheck } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

interface UsPageProps {
  onNavigate?: (sectionId: string) => void;
}

const operatingFit = [
  'A workflow crosses email, CRM, documents, and internal tools.',
  'The team repeats the same decisions but still needs exception review.',
  'Off-the-shelf automation cannot represent the business rules safely.',
  'The buyer needs implementation, testing, monitoring, and handover—not another software subscription.',
];

const delivery = [
  {
    icon: Clock3,
    title: 'US-friendly collaboration',
    body: 'Discovery, reviews, and launch planning are scheduled with overlap for US business hours. Written updates keep decisions moving between calls.',
  },
  {
    icon: FileCheck2,
    title: 'A documented scope',
    body: 'Every engagement starts with the workflow boundary, systems involved, success criteria, exception paths, and the people who approve sensitive actions.',
  },
  {
    icon: ShieldCheck,
    title: 'Controlled automation',
    body: 'Models interpret unstructured inputs. Validation rules, scoped credentials, logs, and human approval govern what happens next.',
  },
];

export function UsPage({ onNavigate }: UsPageProps) {
  const { navigate } = useRouter();
  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">United States · Remote delivery from Bengaluru</p>
            <h1>AI automation for US operations teams.</h1>
          </div>
          <div>
            <p>
              Arenova designs AI agents, system integrations, and workflow automation for US businesses that need repeatable
              execution across sales, support, documents, and back-office operations.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Request a workflow review <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/services/ai-automation/')}>
                See automation services
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="us-fit-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Best-fit projects</p>
            <h2 id="us-fit-title">Workflows worth engineering.</h2>
            <p>
              A custom implementation makes sense when the cost of missed handoffs, slow response, or bad data is higher than
              the cost of maintaining a controlled system.
            </p>
          </div>
          <div className="friction-list">
            {operatingFit.map((item) => (
              <article key={item}>
                <CheckCircle2 aria-hidden="true" />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="us-delivery-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Remote delivery</p>
            <h2 id="us-delivery-title">How a US engagement works.</h2>
            <p style={{ color: 'var(--inverse-muted)' }}>
              Arenova is based in Bengaluru and works remotely. We do not claim a US office; the engagement is structured to
              make location, ownership, and approval responsibilities explicit.
            </p>
          </div>
          <div className="principle-grid">
            {delivery.map(({ icon: Icon, title, body }) => (
              <article key={title} style={{ background: 'rgba(255,255,255,0.04)', padding: '32px', borderRadius: '8px' }}>
                <Icon aria-hidden="true" style={{ color: 'var(--accent)', width: 28, height: 28, marginBottom: 16 }} />
                <h3 style={{ color: 'white', marginBottom: 12, fontSize: '1.25rem' }}>{title}</h3>
                <p style={{ color: 'var(--inverse-muted)', margin: 0 }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="us-services-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Services</p>
            <h2 id="us-services-title">Start with one operational boundary.</h2>
          </div>
          <div className="service-ledger">
            <a className="service-row" href="/services/ai-automation/">
              <span className="service-row__number">01</span>
              <div className="service-row__title"><h3>AI automation</h3><p>Lead handling, support triage, document flow, and internal operations.</p></div>
              <div className="service-row__details"><p>Map the workflow</p></div>
            </a>
            <a className="service-row" href="/services/ai-agents/">
              <span className="service-row__number">02</span>
              <div className="service-row__title"><h3>Custom AI agents</h3><p>Tool-using agents with defined permissions, evaluation criteria, and escalation paths.</p></div>
              <div className="service-row__details"><p>Define the agent</p></div>
            </a>
            <a className="service-row" href="/services/ai-integration/">
              <span className="service-row__number">03</span>
              <div className="service-row__title"><h3>AI integration</h3><p>Secure connections across models, CRMs, help desks, databases, and documents.</p></div>
              <div className="service-row__details"><p>Connect the stack</p></div>
            </a>
          </div>
        </div>
      </section>

      <section className="page-close">
        <div className="page-frame">
          <h2>Bring one manual workflow.</h2>
          <p>We will identify the system boundary, the failure modes, and whether custom automation is justified.</p>
          <button className="button button--primary" onClick={contact}>
            Request a workflow review <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
}

