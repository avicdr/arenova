import { useState } from 'react';
import { ArrowUpRight, ChevronDown, MessageSquare, ShieldCheck, Zap, Database } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface ServicePageProps {
  onNavigate?: (sectionId: string) => void;
}

const workflows = [
  {
    title: 'Knowledge-Grounded Customer Inquiry Deflection',
    description:
      'Deflect 50–70% of repetitive front-line inquiries. The bot indexes technical documentation, knowledge base articles, policy documents, and FAQs to generate accurate, citation-backed answers.',
    systems: 'Pinecone · Qdrant · Zendesk · Intercom · Freshdesk · PostgreSQL',
  },
  {
    title: 'Transactional Customer Action Execution',
    description:
      'Move beyond passive Q&A. Our chatbots execute actions: verifying order numbers, issuing return shipping labels, booking appointments, and looking up account balances via authenticated REST/GraphQL APIs.',
    systems: 'Stripe API · Shopify · HubSpot · Custom Internal Endpoints · Auth0',
  },
  {
    title: 'Multi-Channel Conversational Deployment',
    description:
      'Deploy one unified, intelligent brain across your website chat widget, WhatsApp Business, Slack, Microsoft Teams, and in-app iOS/Android webviews with consistent conversational memory.',
    systems: 'WhatsApp Cloud API · Slack Bolt · Custom React Widgets · WebSockets',
  },
];

const capabilities = [
  {
    icon: Database,
    title: 'Hybrid Semantic Search & RAG',
    body: 'We combine dense vector embeddings with BM25 sparse keyword matching and re-ranking. Chatbots never guess or hallucinate answers when knowledge gaps occur.',
  },
  {
    icon: ShieldCheck,
    title: 'Strict Security Guardrails',
    body: 'Hardened input sanitation and output guardrails block prompt injections, jailbreaks, and competitive queries. Sensitive customer PII is masked before model processing.',
  },
  {
    icon: Zap,
    title: 'Seamless Human Escalation',
    body: 'When a customer expresses frustration, requests human assistance, or exceeds system confidence bounds, the bot routes the full contextual transcript directly to human agents.',
  },
  {
    icon: MessageSquare,
    title: 'Zero Data Retention Endpoints',
    body: 'We deploy on enterprise LLM endpoints guaranteeing your proprietary business data, customer conversations, and internal documents are never used for model training.',
  },
];

const faqs = [
  {
    q: 'How does a custom AI chatbot differ from standard off-the-shelf chatbot software?',
    a: 'Off-the-shelf bots rely on rigid decision trees, button menus, and canned answers that frustrate users. Arenova engineers custom conversational AI that understands nuanced natural language, retrieves verified answers from your live knowledge base, and connects directly to your backend databases to complete actual business tasks.',
  },
  {
    q: 'How do you prevent the AI chatbot from hallucinating or making up policies?',
    a: 'We implement Retrieval-Augmented Generation (RAG) with strict prompt boundaries. The chatbot is explicitly constrained to answers verified within your verified knowledge base. If information is missing or ambiguous, the model is programmed to admit uncertainty and offer human agent escalation.',
  },
  {
    q: 'Can the chatbot integrate with our existing CRM and helpdesk?',
    a: 'Yes. We build native connectors for Zendesk, Intercom, Freshdesk, HubSpot, Salesforce, and custom REST/GraphQL APIs. When tickets are resolved by the bot, customer records are updated automatically with structured tags and summaries.',
  },
  {
    q: 'How long does development and deployment take?',
    a: 'A dedicated, knowledge-grounded AI chatbot connected to your primary support channels is typically engineered, tuned, and deployed to production in 2 to 4 weeks.',
  },
  {
    q: 'What is the pricing model for chatbot development?',
    a: 'Our Business Automation retainer ($1,999/month) covers end-to-end custom chatbot architecture, knowledge base vectorization, multi-channel deployment, continuous tuning, and proactive maintenance.',
  },
];

export const AiChatbotPage = ({ onNavigate }: ServicePageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      {/* Hero */}
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Custom Conversational AI · Enterprise Chatbots · Global</p>
            <h1>AI chatbot development company for enterprise customer engagement.</h1>
          </div>
          <div>
            <p>
              Arenova develops intelligent, knowledge-grounded AI chatbots that deflect routine support tickets, qualify inbound
              leads, and execute backend transactions with zero hallucinations.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Request chatbot architecture <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/services/ai-automation/')}>
                View all services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Workflows */}
      <section className="section" aria-labelledby="workflows-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Conversational Capabilities</p>
            <h2 id="workflows-title">Engineered chatbots that execute real business actions.</h2>
            <p>
              We don&apos;t build static decision trees. We engineer conversational systems with deep contextual comprehension and
              direct database connectivity.
            </p>
          </div>

          <div className="service-ledger">
            {workflows.map((wf, idx) => (
              <article className="service-row" key={wf.title}>
                <span className="service-row__number">0{idx + 1}</span>
                <div className="service-row__title">
                  <h3>{wf.title}</h3>
                  <p>{wf.description}</p>
                </div>
                <div className="service-row__details">
                  <p>Connected Software:</p>
                  <p style={{ color: 'var(--ink-2)', fontSize: '0.85rem' }}>{wf.systems}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Differentiation */}
      <section className="section section--ink" aria-labelledby="diff-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Architecture & Safety</p>
            <h2 id="diff-title">Enterprise safety and accuracy engineered from the ground up.</h2>
            <p style={{ color: 'var(--inverse-muted)' }}>
              Public chatbot demonstrations often suffer from inaccuracy. Our production architecture isolates LLMs with strict
              retrieval grounding and schema validation.
            </p>
          </div>

          <div className="principle-grid">
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <article key={c.title} style={{ background: 'rgba(255,255,255,0.04)', padding: '32px', borderRadius: '8px' }}>
                  <Icon style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '16px' }} />
                  <h3 style={{ color: 'white', marginBottom: '12px', fontSize: '1.25rem' }}>{c.title}</h3>
                  <p style={{ color: 'var(--inverse-muted)', margin: 0 }}>{c.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Implementation Roadmap */}
      <section className="section" aria-labelledby="roadmap-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Implementation Lifecycle</p>
            <h2 id="roadmap-title">From knowledge ingestion to live multi-channel deployment.</h2>
          </div>

          <div className="friction-list">
            <article>
              <h3>Phase 1 · Knowledge Ingestion & Chunking</h3>
              <p>We crawl and clean your documentation, internal PDFs, and ticket archives into optimized semantic vector indices.</p>
            </article>
            <article>
              <h3>Phase 2 · API Tooling & Guardrails</h3>
              <p>We configure authentication boundaries, REST tool calling, response tone policies, and human escalation handoffs.</p>
            </article>
            <article>
              <h3>Phase 3 · Staging & Synthetic Evaluation</h3>
              <p>We run hundreds of benchmark queries through automated evaluation suites to test accuracy, edge cases, and safety.</p>
            </article>
            <article>
              <h3>Phase 4 · Production Rollout & Analytics</h3>
              <p>Phased rollout to web and messaging channels with conversation analytics, deflection dashboards, and weekly tuning.</p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="faq-section" aria-labelledby="faq-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Frequently Asked Questions</p>
            <h2 id="faq-title">Common questions about custom AI chatbot development.</h2>
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

      {/* CTA */}
      <section className="page-close">
        <div className="page-frame">
          <h2>Deploy a custom AI chatbot that resolves tickets autonomously.</h2>
          <p>Book a technical scoping consultation. We’ll review your support volume and outline the exact architecture.</p>
          <button className="button button--primary" onClick={contact}>
            Request chatbot architecture <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

AiChatbotPage.displayName = 'AiChatbotPage';

