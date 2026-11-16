import { useState } from 'react';
import { ArrowUpRight, Check, ChevronDown, Clock, CreditCard, FileCheck, ShieldCheck } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

interface PricingPageProps {
  onNavigate?: (sectionId: string) => void;
}

type Currency = 'USD' | 'INR';

interface Plan {
  name: string;
  priceUsd: number;
  priceInr: number;
  featured?: boolean;
  description: string;
  includes: string[];
}

const plans: Plan[] = [
  {
    name: 'Sales and outreach',
    priceUsd: 999,
    priceInr: 79000,
    description: 'For B2B teams that need a managed outbound system from account research through booked conversations.',
    includes: [
      'Sending infrastructure and domain configuration',
      'Prospect research and enrichment workflow',
      'Personalised outreach sequences',
      'Reply routing, booking, and CRM updates',
    ],
  },
  {
    name: 'Business automation',
    priceUsd: 1999,
    priceInr: 159000,
    featured: true,
    description: 'For teams replacing repeated admin and disconnected handoffs across their operational tools.',
    includes: [
      'Workflow discovery and system design',
      'CRM, ERP, billing, and workspace integrations',
      'Document, approval, and notification flows',
      'Monitoring and ongoing optimisation',
    ],
  },
  {
    name: 'Connected automation',
    priceUsd: 3499,
    priceInr: 279000,
    description: 'For organisations combining customer acquisition, front-desk handling, and internal operations.',
    includes: [
      'Sales and operational automation scope',
      'AI front desk across voice and messaging',
      'Multi-team and multi-location routing',
      'Custom agent and integration work',
    ],
  },
];

const commercialStandards = [
  {
    icon: CreditCard,
    title: 'Multi-Currency Invoicing (USD & INR)',
    body: 'Invoiced cleanly in USD ($) or INR (₹) via Stripe, ACH wire, or domestic bank transfer. Complete tax documentation provided: IRS Form W-8BEN-E for international accounting and official GST invoices (SAC 998314) with 18% Input Tax Credit.',
  },
  {
    icon: Clock,
    title: 'Synchronous Timezone Overlap',
    body: 'Sprint syncs, discovery workshops, and launch reviews are scheduled with active working overlap across US Eastern/Pacific (EST/PST) and Indian Standard Time (IST). Clear Loom walkthroughs and direct Slack channels ensure rapid async turnaround.',
  },
  {
    icon: ShieldCheck,
    title: 'Mutual NDA & 100% IP Transfer',
    body: 'Enterprise bilateral non-disclosure agreements protect your proprietary workflows before any architecture begins. Full intellectual property assignment for all workflows, prompts, and connectors transfers to your company.',
  },
  {
    icon: FileCheck,
    title: 'Deterministic Security & Controls',
    body: 'Language models interpret unstructured inputs while deterministic rules, schema validation, scoped API credentials, and human escalation gates govern business-critical writes, bookings, and financial handoffs.',
  },
];

const faqs = [
  [
    'What happens before implementation?',
    'We map the current workflow, identify systems and owners, define the required controls, and agree on a testable scope with clear milestone deliverables.',
  ],
  [
    'Do we need to replace our existing tools?',
    'Usually not. Arenova is designed to connect the tools already in use—whether HubSpot, Salesforce, Zoho, Tally, Slack, or proprietary internal databases—through their APIs, webhooks, and supported integrations.',
  ],
  [
    'Where is AI used versus deterministic code?',
    'AI models are used where language interpretation, unstructured extraction, or semantic routing is needed. All business-critical operations—database writes, payments, bookings, and external API calls—execute through deterministic business rules and schema validation.',
  ],
  [
    'How does invoicing and multi-currency support work?',
    'We support clean billing in both USD ($) and INR (₹). For US and international organizations, we furnish IRS Form W-8BEN-E and accept Stripe or bank wire/ACH. For domestic Indian organizations, we provide official GST-compliant tax invoices (SAC 998314 with full 18% Input Tax Credit) and support NEFT, RTGS, IMPS, and UPI.',
  ],
  [
    'How do you manage collaboration across different time zones?',
    'Our engineering hub in Bengaluru maintains scheduled synchronous overlap during US Eastern (EST) and Pacific (PST) business hours as well as Indian Standard Time (IST). Discovery, milestone demonstrations, and handoffs occur during shared working windows, supported by daily async updates.',
  ],
  [
    'Can the AI front desk be purchased separately?',
    'Yes. The voice and WhatsApp front desk is available as a standalone tier ($490 / month or ₹39,000 / month) and can be connected directly to your calendar, CRM, and team dispatch channels.',
  ],
  [
    'Is there a long-term contract?',
    'Engagements run on flexible monthly agreements or quarterly billing with a 15% discount. You can expand, modify, or pause scope as operational requirements evolve.',
  ],
];

export const PricingPage = ({ onNavigate }: PricingPageProps) => {
  const { navigate } = useRouter();
  const [currency, setCurrency] = useState<Currency>('USD');
  const [billing, setBilling] = useState<'monthly' | 'quarterly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const multiplier = billing === 'quarterly' ? 0.85 : 1;
  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  const formatPrice = (usd: number, inr: number) => {
    if (currency === 'INR') {
      const discounted = Math.round(inr * multiplier);
      return `₹${discounted.toLocaleString('en-IN')}`;
    }
    const discounted = Math.round(usd * multiplier);
    return `$${discounted.toLocaleString('en-US')}`;
  };

  const frontdeskBaseUsd = 490;
  const frontdeskBaseInr = 39000;
  const frontdeskPrice = formatPrice(frontdeskBaseUsd, frontdeskBaseInr);

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Predictable Retainers</p>
            <h1>Choose the system, then define the scope.</h1>
          </div>
          <div>
            <p>
              Monthly starting points for Arenova’s core systems. Invoicing available in USD ($) or INR (₹) with full
              tax compliance (W-8BEN-E & GST invoices).
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
              <div className="billing-toggle" aria-label="Currency selection">
                <button
                  type="button"
                  aria-pressed={currency === 'USD'}
                  onClick={() => setCurrency('USD')}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  aria-pressed={currency === 'INR'}
                  onClick={() => setCurrency('INR')}
                >
                  INR (₹)
                </button>
              </div>

              <div className="billing-toggle" aria-label="Billing period">
                <button
                  type="button"
                  aria-pressed={billing === 'monthly'}
                  onClick={() => setBilling('monthly')}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  aria-pressed={billing === 'quarterly'}
                  onClick={() => setBilling('quarterly')}
                >
                  Quarterly · 15% less
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-section" aria-label="Plans">
        <div className="page-frame pricing-grid">
          {plans.map((plan) => {
            const formattedPrice = formatPrice(plan.priceUsd, plan.priceInr);
            return (
              <article className="price-plan" data-featured={plan.featured || undefined} key={plan.name}>
                <div className="price-plan__head">
                  {plan.featured && <span>Most requested</span>}
                  <h2>{plan.name}</h2>
                  <p>{plan.description}</p>
                </div>
                <div className="price">
                  <span>{formattedPrice}</span> / month
                  <div style={{ fontSize: '0.74rem', opacity: 0.8, marginTop: '6px', fontWeight: 500 }}>
                    {currency === 'INR' ? 'Tax compliant · 18% GST invoices with ITC' : 'Tax compliant · Form W-8BEN-E furnished'}
                  </div>
                </div>
                <ul>
                  {plan.includes.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  className={plan.featured ? 'button button--primary' : 'button button--secondary'}
                  onClick={contact}
                >
                  Discuss this system <ArrowUpRight aria-hidden="true" />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="frontdesk-price">
        <div className="page-frame frontdesk-price__grid">
          <div>
            <p className="section-index">Standalone product</p>
            <h2>AI front desk</h2>
            <p>
              Voice and WhatsApp enquiry handling, calendar booking, verified answers, CRM lead synchronization, and
              exception escalation to human team members.
            </p>
          </div>
          <div>
            <div className="price" style={{ border: 0, padding: 0, margin: '0 0 16px' }}>
              <span>{frontdeskPrice}</span> / month
              <div style={{ fontSize: '0.74rem', color: 'var(--muted)', marginTop: '4px' }}>
                {currency === 'INR' ? 'SAC 998314 · GST Invoice provided' : 'Stripe / ACH billing in USD'}
              </div>
            </div>
            <a
              href="https://frontdesk.arenova.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Visit Frontdesk <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Unified Enterprise Commercial Standards */}
      <section className="section section--ink" aria-labelledby="standards-heading">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Commercial & Delivery Standards</p>
            <h2 id="standards-heading" style={{ color: 'white' }}>
              Enterprise compliance, flexible invoicing, and timezone overlap.
            </h2>
            <p style={{ color: 'var(--inverse-muted)' }}>
              Predictable retainers, complete intellectual property ownership, and direct systems architect collaboration
              for modern operations teams.
            </p>
          </div>

          <div className="principle-grid" style={{ marginTop: '40px' }}>
            {commercialStandards.map(({ icon: Icon, title, body }) => (
              <article key={title} style={{ background: 'rgba(255,255,255,0.04)', padding: '32px', borderRadius: '8px' }}>
                <Icon aria-hidden="true" style={{ color: 'var(--accent)', width: 28, height: 28, marginBottom: 16 }} />
                <h3 style={{ color: 'white', marginBottom: 12, fontSize: '1.25rem' }}>{title}</h3>
                <p style={{ color: 'var(--inverse-muted)', margin: 0 }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="page-frame faq-grid">
          <div>
            <p className="section-index">Questions</p>
            <h2>Scope, tools, and terms</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <article key={question}>
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{question}</span>
                  <ChevronDown aria-hidden="true" />
                </button>
                {openFaq === index && <p>{answer}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-close">
        <div className="page-frame">
          <h2>Start with the workflow, not the package.</h2>
          <p>
            Share the process that creates the most drag. We’ll map the system, determine the required controls, and
            provide an exact milestone scope in USD or INR.
          </p>
          <button className="button button--primary" onClick={contact}>
            Request an automation audit <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

PricingPage.displayName = 'PricingPage';
