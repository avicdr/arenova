import { ArrowUpRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

interface ServicesSectionProps {
  onNavigate: (sectionId: string) => void;
}

const services = [
  {
    name: 'Workflow automation',
    slug: '/services/ai-workflow-automation/',
    description:
      'Connect operational tools and remove repeated data entry from onboarding, approvals, documents, invoicing, and internal alerts.',
    tools: 'CRM · ERP · Billing · Slack · PostgreSQL',
    scope: ['Map the current process', 'Build and test integrations', 'Add monitoring and recovery paths'],
  },
  {
    name: 'Autonomous AI agents',
    slug: '/services/ai-agents/',
    description:
      'Goal-directed multi-agent systems with scoped tool permissions, persistent memory, and deterministic validation for lead triage and operations.',
    tools: 'Python · LangGraph · Vector DBs · Meta Cloud API',
    scope: ['Design state machine and tool schemas', 'Ground with company SOP documentation', 'Enforce human fallback gates'],
  },
  {
    name: 'Sales outreach systems',
    slug: '/services/crm-automation/',
    description:
      'Build a managed outbound workflow for prospect research, enrichment, personalised sequences, replies, booking, and pipeline updates.',
    tools: 'Email infrastructure · LinkedIn · Enrichment · CRM',
    scope: ['Configure sending infrastructure', 'Define qualification and routing', 'Measure replies and handoffs'],
  },
  {
    name: 'AI front desk & WhatsApp',
    slug: '/services/ai-automation/',
    description:
      'Handle routine voice and WhatsApp enquiries, answer from approved business information, book appointments, and escalate exceptions.',
    tools: 'Voice · WhatsApp Cloud API · Calendar · Practice software',
    scope: ['Write approved answer boundaries', 'Connect scheduling and routing', 'Keep humans in control of exceptions'],
  },
];

export function ServicesSection({ onNavigate }: ServicesSectionProps) {
  const { navigate } = useRouter();

  return (
    <section id="services" className="section services-section" aria-labelledby="services-title">
      <div className="page-frame">
        <div className="section-heading section-heading--wide">
          <p className="section-index">Core Capabilities</p>
          <h2 id="services-title">Deterministic systems engineered as one operating layer.</h2>
          <p>
            Start with one constrained operational workflow or connect the full customer lifecycle. Every engagement is
            custom-scoped around your existing software and team.
          </p>
        </div>
        <div className="service-ledger">
          {services.map((service, index) => (
            <article className="service-row" key={service.name}>
              <span className="service-row__number">0{index + 1}</span>
              <div className="service-row__title">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <a
                  href={service.slug}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(service.slug);
                  }}
                  className="text-link"
                  style={{ marginTop: '16px', display: 'inline-flex', fontSize: '0.88rem' }}
                >
                  Explore service architecture <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
              <div className="service-row__details">
                <p>{service.tools}</p>
                <ul>
                  {service.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '36px', flexWrap: 'wrap' }}>
          <button className="button button--primary" onClick={() => onNavigate('contact')}>
            Request an automation audit <ArrowUpRight aria-hidden="true" />
          </button>
          <button className="text-link" onClick={() => navigate('/tools/automation-roi-calculator/')}>
            Calculate your operational ROI <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
