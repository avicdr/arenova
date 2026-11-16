import { ArrowUpRight, Database, FileCheck2, Link2, ShieldCheck } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface PageProps { onNavigate?: (sectionId: string) => void }

const capabilities = [
  { icon: Link2, title: 'API and webhook integration', body: 'Connect authenticated APIs, event webhooks, queues, and scheduled jobs without asking staff to copy data between tools.' },
  { icon: Database, title: 'Business data grounding', body: 'Retrieve approved records and documents with access rules that preserve the permissions of the source system.' },
  { icon: FileCheck2, title: 'Validation and observability', body: 'Validate model outputs against typed schemas, record decisions, retry transient failures, and route exceptions for review.' },
  { icon: ShieldCheck, title: 'Scoped execution', body: 'Separate read, draft, and write permissions so an AI system cannot take a sensitive action merely because it produced plausible text.' },
];

export function AiIntegrationPage({ onNavigate }: PageProps) {
  const { navigate } = useRouter();
  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));
  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div><p className="section-index">AI integration services</p><h1>Connect AI to the systems your team uses.</h1></div>
          <div>
            <p>Arenova integrates language models and AI agents with CRMs, support platforms, databases, documents, and internal tools through controlled software interfaces.</p>
            <div className="hero-actions" style={{ marginTop: 28 }}>
              <button className="button button--primary" onClick={contact}>Request an integration review <ArrowUpRight aria-hidden="true" /></button>
              <button className="button button--secondary" onClick={() => navigate('/us/')}>US delivery details</button>
            </div>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="integration-scope-title">
        <div className="page-frame">
          <div className="section-heading"><p className="section-index">Integration scope</p><h2 id="integration-scope-title">From model output to controlled action.</h2><p>The integration layer turns probabilistic model output into a testable business process.</p></div>
          <div className="principle-grid">
            {capabilities.map(({ icon: Icon, title, body }) => <article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </div>
      </section>
      <section className="section section--ink" aria-labelledby="integration-process-title">
        <div className="page-frame">
          <div className="section-heading"><p className="section-index">Implementation process</p><h2 id="integration-process-title">A four-part integration review.</h2></div>
          <div className="friction-list">
            <article><h3>1. Inventory</h3><p>Document systems, data owners, API limits, authentication, retention requirements, and the actions people perform today.</p></article>
            <article><h3>2. Permission design</h3><p>Define what the automation can read, draft, change, and escalate. Sensitive actions remain behind explicit approval.</p></article>
            <article><h3>3. Staging tests</h3><p>Test representative inputs, malformed data, downstream outages, duplicate events, and low-confidence model responses.</p></article>
            <article><h3>4. Release and handover</h3><p>Deploy in phases with logs, alerts, operating documentation, and a clear owner for each exception queue.</p></article>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="integration-links-title">
        <div className="page-frame">
          <div className="section-heading"><p className="section-index">Related systems</p><h2 id="integration-links-title">Choose the workflow before the model.</h2></div>
          <p>For a broader operational project, review <a href="/services/ai-automation/">AI automation services</a>. For tool-using software with memory and planning, review <a href="/services/ai-agents/">custom AI agent development</a>. CRM-specific work is covered under <a href="/services/crm-automation/">CRM automation</a>.</p>
        </div>
      </section>
      <section className="page-close"><div className="page-frame"><h2>Map the integration boundary.</h2><p>Share the systems involved and the action that currently requires a person.</p><button className="button button--primary" onClick={contact}>Request an integration review <ArrowUpRight aria-hidden="true" /></button></div></section>
    </main>
  );
}

