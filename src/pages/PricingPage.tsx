import { useState } from 'react';
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

interface PricingPageProps { onNavigate?: (sectionId: string) => void }

const plans = [
  {
    name: 'Sales and outreach', price: 999,
    description: 'For B2B teams that need a managed outbound system from account research through booked conversations.',
    includes: ['Sending infrastructure and domain configuration', 'Prospect research and enrichment workflow', 'Personalised outreach sequences', 'Reply routing, booking, and CRM updates'],
  },
  {
    name: 'Business automation', price: 1999, featured: true,
    description: 'For teams replacing repeated admin and disconnected handoffs across their operational tools.',
    includes: ['Workflow discovery and system design', 'CRM, ERP, billing, and workspace integrations', 'Document, approval, and notification flows', 'Monitoring and ongoing optimisation'],
  },
  {
    name: 'Connected automation', price: 3499,
    description: 'For organisations combining customer acquisition, front-desk handling, and internal operations.',
    includes: ['Sales and operational automation scope', 'AI front desk across voice and messaging', 'Multi-team and multi-location routing', 'Custom agent and integration work'],
  },
];

const faqs = [
  ['What happens before implementation?', 'We map the current workflow, identify systems and owners, define the required controls, and agree on a testable scope.'],
  ['Do we need to replace our existing tools?', 'Usually not. Arenova is designed to connect the tools already in use through their APIs, webhooks, and supported integrations.'],
  ['Where is AI used?', 'AI is used for language understanding and extraction where it helps. Critical actions run through explicit business rules, schema checks, and API permissions.'],
  ['Can the AI front desk be purchased separately?', 'Yes. The voice and WhatsApp front desk is listed at $490 per month and can be connected to supported calendars and CRMs.'],
  ['Is there a long-term contract?', 'The current offer supports monthly billing or quarterly billing with the displayed 15% reduction. Final scope and terms are confirmed before work begins.'],
];

export const PricingPage = ({ onNavigate }: PricingPageProps) => {
  const { navigate } = useRouter();
  const [billing, setBilling] = useState<'monthly' | 'quarterly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const multiplier = billing === 'quarterly' ? 0.85 : 1;
  const contact = () => onNavigate ? onNavigate('contact') : navigate('/#contact');

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div><p className="section-index">Pricing</p><h1>Choose the system, then define the scope.</h1></div>
          <div><p>Monthly starting points for Arenova’s core services. Integrations, volume, and approval requirements are confirmed during the audit.</p>
            <div className="billing-toggle" aria-label="Billing period">
              <button aria-pressed={billing === 'monthly'} onClick={() => setBilling('monthly')}>Monthly</button>
              <button aria-pressed={billing === 'quarterly'} onClick={() => setBilling('quarterly')}>Quarterly · 15% less</button>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-section" aria-label="Plans">
        <div className="page-frame pricing-grid">
          {plans.map((plan) => {
            const price = Math.round(plan.price * multiplier);
            return <article className="price-plan" data-featured={plan.featured || undefined} key={plan.name}>
              <div className="price-plan__head">{plan.featured && <span>Most requested</span>}<h2>{plan.name}</h2><p>{plan.description}</p></div>
              <p className="price"><span>${price.toLocaleString()}</span> / month</p>
              <ul>{plan.includes.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
              <button className={plan.featured ? 'button button--primary' : 'button button--secondary'} onClick={contact}>
                Discuss this system <ArrowUpRight aria-hidden="true" />
              </button>
            </article>;
          })}
        </div>
      </section>

      <section className="frontdesk-price">
        <div className="page-frame frontdesk-price__grid">
          <div><p className="section-index">Standalone product</p><h2>AI front desk</h2><p>Voice and WhatsApp enquiry handling, appointment booking, approved answers, and exception routing.</p></div>
          <div><p className="price"><span>$490</span> / month</p><a href="https://frontdesk.arenova.in" target="_blank" rel="noopener noreferrer" className="text-link">Visit Frontdesk <ArrowUpRight aria-hidden="true" /></a></div>
        </div>
      </section>

      <section className="faq-section">
        <div className="page-frame faq-grid">
          <div><p className="section-index">Questions</p><h2>Scope, tools, and terms</h2></div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => <article key={question}>
              <button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                <span>{question}</span><ChevronDown aria-hidden="true" />
              </button>{openFaq === index && <p>{answer}</p>}
            </article>)}
          </div>
        </div>
      </section>

      <section className="page-close"><div className="page-frame"><h2>Start with the workflow, not the package.</h2><p>Share the process that creates the most drag. We’ll identify the smallest useful system to build first.</p><button className="button button--primary" onClick={contact}>Request an automation audit <ArrowUpRight aria-hidden="true" /></button></div></section>
    </main>
  );
};

PricingPage.displayName = 'PricingPage';
