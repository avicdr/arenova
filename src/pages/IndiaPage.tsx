import { ArrowUpRight, CheckCircle2, Building2, FileCheck2, ShieldCheck, MessageSquare, Database, CreditCard } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

interface IndiaPageProps {
  onNavigate?: (sectionId: string) => void;
}

const operatingFit = [
  'High-volume customer enquiry handling across WhatsApp Business API, voice, and web forms.',
  'Reconciling payment gateways (Razorpay, Cashfree, PayU) with ERPs (Tally Prime, Zoho, SAP) and internal ledgers.',
  'Automating lead capture, qualification, and routing from portals and ad campaigns directly into CRM without manual copy-pasting.',
  'Operations teams bottlenecked by repetitive invoice generation, vendor approvals, and status tracking across fragmented spreadsheets.',
];

const domesticDelivery = [
  {
    icon: FileCheck2,
    title: '18% GST Invoicing & Full ITC',
    body: 'Official tax invoices issued under SAC code 998314 with our GSTIN, enabling your finance team to claim 100% Input Tax Credit on all engagements.',
  },
  {
    icon: Building2,
    title: 'Bengaluru Engineering Hub (IST)',
    body: 'Direct collaboration with senior systems engineers in Bengaluru. No account managers or overseas markups. On-site architecture sessions available for enterprise teams.',
  },
  {
    icon: ShieldCheck,
    title: 'TDS & Legal Compliance',
    body: 'Seamless Section 194J TDS compliance with automated Form 16A reconciliation. Formal bilateral service agreements protecting your proprietary workflows and business data.',
  },
];

const indianIntegrations = [
  {
    icon: MessageSquare,
    title: 'WhatsApp Business Cloud API',
    body: 'End-to-end conversational automation: customer support, appointment bookings, catalog discovery, and order status updates on India’s primary communication channel.',
  },
  {
    icon: Database,
    title: 'Tally Prime, Zoho & Enterprise ERPs',
    body: 'Deterministic bi-directional synchronization between your sales pipeline, billing systems, and inventory ledgers—eliminating dual-entry errors.',
  },
  {
    icon: CreditCard,
    title: 'Payment Gateway Workflows',
    body: 'Automated payment links, webhook verification, invoice dispatch, and reconciliation across Razorpay, Cashfree, PayU, and domestic banking rails.',
  },
];

export function IndiaPage({ onNavigate }: IndiaPageProps) {
  const { navigate } = useRouter();
  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">India · Headquarters & Engineering Delivery in Bengaluru</p>
            <h1>AI automation agency for Indian enterprises.</h1>
          </div>
          <div>
            <p>
              Arenova designs custom AI agents, deterministic workflow automation, and enterprise software integrations
              for Indian businesses—combining WhatsApp Cloud API, domestic ERP connectivity, GST-compliant invoicing, and
              direct Bengaluru-based technical execution.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Request a workflow audit <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/pricing/')}>
                View INR & USD pricing
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="india-fit-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Operational Drag Points</p>
            <h2 id="india-fit-title">Workflows that cost Indian teams the most time.</h2>
            <p>
              When your operational scale increases, hiring more coordinators to copy-paste between WhatsApp, email, and
              spreadsheets introduces errors and delays. We replace manual handoffs with reliable, deterministic code.
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

      <section className="section section--ink" aria-labelledby="india-delivery-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Domestic Commercial Terms</p>
            <h2 id="india-delivery-title">Transparent, GST-compliant domestic billing.</h2>
            <p style={{ color: 'var(--inverse-muted)' }}>
              Headquartered in Bengaluru, Karnataka. Structured for seamless vendor onboarding with Indian finance and legal
              departments.
            </p>
          </div>
          <div className="principle-grid">
            {domesticDelivery.map(({ icon: Icon, title, body }) => (
              <article key={title} style={{ background: 'rgba(255,255,255,0.04)', padding: '32px', borderRadius: '8px' }}>
                <Icon aria-hidden="true" style={{ color: 'var(--accent)', width: 28, height: 28, marginBottom: 16 }} />
                <h3 style={{ color: 'white', marginBottom: 12, fontSize: '1.25rem' }}>{title}</h3>
                <p style={{ color: 'var(--inverse-muted)', margin: 0 }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="india-integrations-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Domestic Ecosystem Connectors</p>
            <h2 id="india-integrations-title">Native integrations for India’s software stack.</h2>
            <p>
              We connect the platforms your team and customers already use every day, ensuring data moves securely with explicit
              error boundaries.
            </p>
          </div>
          <div className="principle-grid">
            {indianIntegrations.map(({ icon: Icon, title, body }) => (
              <article key={title}>
                <Icon aria-hidden="true" style={{ color: 'var(--accent-dark)', width: 28, height: 28, marginBottom: 16 }} />
                <h3 style={{ marginBottom: 12, fontSize: '1.25rem' }}>{title}</h3>
                <p style={{ margin: 0 }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-close">
        <div className="page-frame">
          <h2>Bring your most congested operational workflow.</h2>
          <p>
            We will analyze your bottlenecks, review your software connectors, and build a working proof-of-concept
            with clear milestones in Indian Rupees.
          </p>
          <button className="button button--primary" onClick={contact}>
            Schedule an automation review <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
}

IndiaPage.displayName = 'IndiaPage';

