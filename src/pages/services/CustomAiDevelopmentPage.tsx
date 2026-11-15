import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Code2 } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface ServicePageProps {
  onNavigate?: (sectionId: string) => void;
}

const engineeringServices = [
  {
    title: 'Custom LLM Applications & Microservices',
    desc: 'Bespoke backend systems built with Python (FastAPI), Node.js, and modern AI frameworks. Fully containerized with Docker and ready for your cloud infrastructure.',
  },
  {
    title: 'Private Vector Databases & Hybrid RAG',
    desc: 'Domain-specific Retrieval-Augmented Generation using pgvector, Pinecone, or Qdrant. Semantic search combined with BM25 keyword matching for zero-hallucination accuracy.',
  },
  {
    title: 'Fine-Tuning & Open-Source Model Deployment',
    desc: 'Fine-tuning open-source models (Llama 3.3, Mistral, DeepSeek) on your proprietary datasets, deployed on private VPCs with strict zero-data-retention compliance.',
  },
  {
    title: 'Full-Stack Web & Internal Tool Development',
    desc: 'Production web applications, client portals, and administrative copilot dashboards built with React, TypeScript, Tailwind CSS, and secure database backends.',
  },
];

const faqs = [
  {
    q: 'Do we own the intellectual property (IP) and source code?',
    a: 'Yes, 100%. All custom code, database schemas, prompt engineering templates, and fine-tuning datasets developed during our engagement belong entirely to your company. We provide complete GitHub repository transfer and documentation.',
  },
  {
    q: 'How do you address data privacy and compliance (GDPR, SOC2)?',
    a: 'We configure private enterprise endpoints with zero-data-retention agreements where models are never trained on your proprietary data. For strictly regulated clients, we deploy self-hosted open-weights models inside your private AWS, GCP, or Azure VPC.',
  },
  {
    q: 'What is the typical engagement structure for custom AI development?',
    a: 'We begin with an architectural design blueprint and technical specification (Week 1), followed by agile sprints with weekly staging deployments. We offer both fixed-scope project contracts and ongoing engineering retainers.',
  },
];

export const CustomAiDevelopmentPage = ({ onNavigate }: ServicePageProps) => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Custom AI Development Company · Systems Engineering</p>
            <h1>Custom AI development company for proprietary enterprise software.</h1>
          </div>
          <div>
            <p>
              Arenova engineers bespoke AI software, private vector databases, and custom LLM microservices. We turn your
              proprietary operational data into durable competitive advantages.
            </p>
            <div className="hero-actions" style={{ marginTop: '28px' }}>
              <button className="button button--primary" onClick={contact}>
                Discuss your software scope <ArrowUpRight aria-hidden="true" />
              </button>
              <button className="button button--secondary" onClick={() => navigate('/about/')}>
                About our founder & team
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="custom-ai-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Engineering Capabilities</p>
            <h2 id="custom-ai-title">From architectural blueprint to production deployment.</h2>
          </div>

          <div className="principle-grid">
            {engineeringServices.map((s) => (
              <article key={s.title} style={{ background: 'var(--surface)', padding: '32px', borderRadius: '8px' }}>
                <Code2 style={{ color: 'var(--accent)', width: '28px', height: '28px', marginBottom: '16px' }} />
                <h3 style={{ marginBottom: '12px', fontSize: '1.25rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', margin: 0 }}>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Frequently Asked Questions</p>
            <h2 id="faq-title">Technical details on our custom AI development services.</h2>
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

      <section className="page-close">
        <div className="page-frame">
          <h2>Have a custom AI project requiring senior software engineering?</h2>
          <p>Schedule an engineering consult with Avi. We will evaluate technical feasibility and estimate build timelines.</p>
          <button className="button button--primary" onClick={contact}>
            Schedule an engineering consult <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

CustomAiDevelopmentPage.displayName = 'CustomAiDevelopmentPage';
