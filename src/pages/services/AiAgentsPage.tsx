import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Cpu, Network, ShieldAlert, Bot } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface ServicePageProps {
  onNavigate?: (sectionId: string) => void;
}

const agentTypes = [
  {
    title: 'Inbound Triage & Booking Agents',
    description:
      'Autonomous conversational agents deployed on WhatsApp, web chat, and voice telephony. Capable of understanding multi-turn customer inquiries, checking real-time calendar availability, qualifying budgets, and scheduling appointments.',
    framework: 'LangGraph · Meta Cloud API · Twilio Voice · Google Calendar / Calendly',
  },
  {
    title: 'B2B Research & Lead Intelligence Agents',
    description:
      'Goal-directed agents that discover prospective companies, scrape company leadership rosters, cross-reference press releases, and compose factual, hyper-contextual sales briefings for your account executives.',
    framework: 'Python · Crawl4AI · Playwright · Vector Embeddings · CRM API',
  },
  {
    title: 'Back-Office Operations & Copilot Agents',
    description:
      'Internal software agents that monitor webhook events, reconcile discrepancies between invoicing and inventory records, draft internal escalations, and execute multi-step database updates with human approval gates.',
    framework: 'Pydantic AI · PostgreSQL · Slack Webhooks · Stripe API',
  },
];

const faqs = [
  {
    q: 'What is an autonomous AI agent, and how does it differ from a chatbot?',
    a: 'A traditional chatbot follows a rigid decision tree or provides static answers to user queries. An autonomous AI agent has perception, memory, tool access, and a planning loop. When given a high-level goal (e.g. "qualify this lead, find their CRM record, and book a consultation"), the agent reasons about which tools to invoke, executes them sequentially, evaluates the result, and handles exceptions dynamically.',
  },
  {
    q: 'How do you prevent custom AI agents from hallucinating in production?',
    a: 'Arenova enforces deterministic boundaries around all agent actions. Agents do not generate unverified facts or invent database entries. We use Retrieval-Augmented Generation (RAG) strictly grounded in your approved documentation, enforce strict JSON schemas on all tool outputs, and require human verification on irreversible actions like refunding or canceling accounts.',
  },
  {
    q: 'What frameworks and tech stacks do you use for AI agent development?',
    a: 'Our core agent stack utilizes Python, LangGraph, Pydantic AI, LlamaIndex, vector stores (pgvector, Pinecone), and modern foundation models (Claude 3.5 Sonnet, GPT-4o, and fine-tuned open-source models). We build containerized, stateless microservices that integrate directly with your existing infrastructure.',
  },
  {
    q: 'Can custom AI agents integrate with our internal databases and legacy systems?',
    a: 'Yes. We design custom API tool interfaces specifically tailored to your internal databases (PostgreSQL, MySQL, MongoDB), enterprise CRMs (Salesforce, HubSpot, Zoho), and legacy REST/SOAP endpoints. Scoped read/write access tokens ensure the agent cannot access unauthorized data.',
  },
  {
    q: 'How much does custom AI agent development cost?',
    a: 'Single-purpose production agents start at $1,999/month on our business automation tier, which includes architecture, custom tool integration, continuous testing, and monitoring. Complex multi-agent systems with voice telephony and custom ERP integrations are covered under our $3,499/month Connected tier.',
  },
];

export const AiAgentsPage = ({ onNavigate }: ServicePageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      {/* Hero */}
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">AI Agent Development Company · Custom Autonomous Systems</p>
            <h1>Custom AI agent development company for modern business operations.</h1>
          </div>
          <div>
            <p>
              Arenova builds autonomous, goal-directed AI agents that execute complex multi-step workflows across your business
              software. Designed with scoped permissions, rigorous validation, and zero hallucinations.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Discuss your agent scope <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/services/ai-automation/')}>
                View all automation services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Production Agents */}
      <section className="section" aria-labelledby="agents-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Production Architectures</p>
            <h2 id="agents-title">Autonomous agents designed for measurable business outcomes.</h2>
            <p>
              We don’t build toy prototypes. We deploy robust, containerized AI agent microservices that handle real customers
              and operational handoffs 24/7.
            </p>
          </div>

          <div className="service-ledger">
            {agentTypes.map((agent, idx) => (
              <article className="service-row" key={agent.title}>
                <span className="service-row__number">0{idx + 1}</span>
                <div className="service-row__title">
                  <h3>{agent.title}</h3>
                  <p>{agent.description}</p>
                </div>
                <div className="service-row__details">
                  <p>Orchestration Stack:</p>
                  <p style={{ color: 'var(--ink-2)', fontSize: '0.85rem' }}>{agent.framework}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Anatomy of an Arenova Agent */}
      <section className="section section--ink" aria-labelledby="anatomy-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Technical Architecture</p>
            <h2 id="anatomy-title">How an Arenova enterprise agent operates in production.</h2>
            <p style={{ color: 'var(--inverse-muted)' }}>
              Every agent is engineered with four distinct operational layers to ensure absolute reliability and auditability.
            </p>
          </div>

          <div className="principle-grid">
            <article style={{ background: 'rgba(255,255,255,0.04)', padding: '32px', borderRadius: '8px' }}>
              <Bot style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '16px' }} />
              <h3 style={{ color: 'white', marginBottom: '12px' }}>1. Perception & Intent Extraction</h3>
              <p style={{ color: 'var(--inverse-muted)', margin: 0 }}>
                Extracts structured parameters from customer speech, WhatsApp messages, or webhooks using constrained Pydantic
                models.
              </p>
            </article>

            <article style={{ background: 'rgba(255,255,255,0.04)', padding: '32px', borderRadius: '8px' }}>
              <Cpu style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '16px' }} />
              <h3 style={{ color: 'white', marginBottom: '12px' }}>2. Multi-Step Planning Loop</h3>
              <p style={{ color: 'var(--inverse-muted)', margin: 0 }}>
                Evaluates state graphs, determines the next logical action, and queries proprietary vector embeddings for company
                SOPs.
              </p>
            </article>

            <article style={{ background: 'rgba(255,255,255,0.04)', padding: '32px', borderRadius: '8px' }}>
              <Network style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '16px' }} />
              <h3 style={{ color: 'white', marginBottom: '12px' }}>3. Scoped Tool Execution</h3>
              <p style={{ color: 'var(--inverse-muted)', margin: 0 }}>
                Executes designated API calls (calendar reservations, CRM updates, notification dispatch) through hardened, typed
                interfaces.
              </p>
            </article>

            <article style={{ background: 'rgba(255,255,255,0.04)', padding: '32px', borderRadius: '8px' }}>
              <ShieldAlert style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '16px' }} />
              <h3 style={{ color: 'white', marginBottom: '12px' }}>4. Safety & Human Fallback</h3>
              <p style={{ color: 'var(--inverse-muted)', margin: 0 }}>
                Any anomaly, negative sentiment, or ambiguity triggers an immediate, context-rich notification to your human team.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="faq-section" aria-labelledby="faq-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Frequently Asked Questions</p>
            <h2 id="faq-title">Technical and commercial questions about custom AI agents.</h2>
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
          <h2>Ready to deploy an autonomous AI agent in your operations?</h2>
          <p>Tell us the manual steps your team currently repeats. We will architect a working prototype proposal.</p>
          <button className="button button--primary" onClick={contact}>
            Request an agent architecture audit <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

AiAgentsPage.displayName = 'AiAgentsPage';
