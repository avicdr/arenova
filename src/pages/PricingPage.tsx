import { useState } from 'react';
import { ArrowUpRight, Check, ChevronDown, Globe, Landmark, ShieldCheck, FileCheck, Clock, CreditCard } from 'lucide-react';
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
    'How does contracting and billing work for US and global clients?',
    'US and international clients are invoiced in USD via Stripe or direct US ACH / international wire transfer. We provide a signed IRS Form W-8BEN-E, execute a mutual NDA under standard commercial terms, and assign 100% intellectual property upon payment.',
  ],
  [
    'Can Indian companies claim GST Input Tax Credit (ITC)?',
    'Yes. Domestic Indian clients receive official GST-compliant tax invoices with our GSTIN and SAC code 998314. You can claim the full 18% GST as Input Tax Credit (ITC). We accept NEFT, RTGS, IMPS, UPI, and domestic corporate cards.',
  ],
  [
    'How do you manage time zone overlap between the US and India?',
    'Our engineering delivery hub is based in Bengaluru (IST) with dedicated synchronous overlap scheduled during US Eastern (EST) and Pacific (PST) business hours. Discovery, weekly sprint demos, and urgent syncs happen during mutual working windows.',
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
            <p className="section-index">Predictable Investment · Dual Currency</p>
            <h1>Choose the system, then define the scope.</h1>
          </div>
          <div>
            <p>
              Monthly starting points for Arenova’s core systems. Invoicing available in USD ($) for US and international
              clients, and INR (₹) with full GST Input Tax Credit for Indian enterprises.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
              <div className="billing-toggle" aria-label="Currency selection">
                <button
                  type="button"
                  aria-pressed={currency === 'USD'}
                  onClick={() => setCurrency('USD')}
                >
                  USD ($) · US & Global
                </button>
                <button
                  type="button"
                  aria-pressed={currency === 'INR'}
                  onClick={() => setCurrency('INR')}
                >
                  INR (₹) · India / GST
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
                    {currency === 'INR' ? '+ 18% GST · 100% ITC Eligible' : 'Zero US sales tax · Form W-8BEN-E'}
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

      {/* Dual Market Reassurance & Commercial Terms */}
      <section className="section section--ink" aria-labelledby="terms-heading">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Dual-Region Commercial Terms</p>
            <h2 id="terms-heading" style={{ color: 'white' }}>
              Engineered for US and Indian enterprise compliance.
            </h2>
            <p style={{ color: 'var(--inverse-muted)' }}>
              Clear billing, strict intellectual property protections, and predictable timezone communication for teams
              operating across North America and India.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginTop: '40px',
            }}
          >
            {/* US Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--line-inverse)',
                borderRadius: '8px',
                padding: '36px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Globe style={{ color: 'var(--accent)', width: '24px', height: '24px' }} />
                <h3 style={{ color: 'white', fontSize: '1.4rem', margin: 0 }}>United States & Global</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ display: 'flex', gap: '12px', color: 'var(--inverse-muted)', fontSize: '0.92rem' }}>
                  <CreditCard style={{ width: '18px', height: '18px', color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>USD Invoicing & ACH / Stripe</strong>
                    Pay cleanly in USD via credit card, Stripe, or direct US ACH / bank wire with zero international foreign transaction fees.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px', color: 'var(--inverse-muted)', fontSize: '0.92rem' }}>
                  <FileCheck style={{ width: '18px', height: '18px', color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>IRS Form W-8BEN-E Provided</strong>
                    Compliant foreign vendor certification for US accounting departments. No US tax withholding hassles.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px', color: 'var(--inverse-muted)', fontSize: '0.92rem' }}>
                  <Clock style={{ width: '18px', height: '18px', color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>US Timezone Overlap (EST / PST)</strong>
                    Live video reviews, sprint syncs, and emergency support during US Eastern and Pacific working hours.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px', color: 'var(--inverse-muted)', fontSize: '0.92rem' }}>
                  <ShieldCheck style={{ width: '18px', height: '18px', color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>Mutual NDA & 100% IP Assignment</strong>
                    Enterprise-standard non-disclosure agreements with complete ownership of custom workflows, agent prompts, and connectors.
                  </div>
                </li>
              </ul>
            </div>

            {/* India Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--line-inverse)',
                borderRadius: '8px',
                padding: '36px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Landmark style={{ color: '#ff8064', width: '24px', height: '24px' }} />
                <h3 style={{ color: 'white', fontSize: '1.4rem', margin: 0 }}>India (Domestic Enterprise)</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ display: 'flex', gap: '12px', color: 'var(--inverse-muted)', fontSize: '0.92rem' }}>
                  <FileCheck style={{ width: '18px', height: '18px', color: '#ff8064', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>18% GST Invoices with Full ITC</strong>
                    Official tax invoices under SAC 998314 with GSTIN. Your business claims 100% Input Tax Credit on all services.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px', color: 'var(--inverse-muted)', fontSize: '0.92rem' }}>
                  <CreditCard style={{ width: '18px', height: '18px', color: '#ff8064', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>Domestic Banking & UPI / NEFT</strong>
                    Pay via corporate net banking, NEFT / RTGS / IMPS, UPI, or domestic corporate credit card.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px', color: 'var(--inverse-muted)', fontSize: '0.92rem' }}>
                  <ShieldCheck style={{ width: '18px', height: '18px', color: '#ff8064', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>TDS Compliance (Section 194J)</strong>
                    Standard TDS deduction supported with automated Form 16A reconciliation and formal vendor paperwork.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px', color: 'var(--inverse-muted)', fontSize: '0.92rem' }}>
                  <Clock style={{ width: '18px', height: '18px', color: '#ff8064', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'white', display: 'block' }}>Bengaluru Engineering Hub (IST)</strong>
                    Direct communication with the engineering team in Bengaluru. Live Slack/WhatsApp support and on-site architecture sessions.
                  </div>
                </li>
              </ul>
            </div>
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
