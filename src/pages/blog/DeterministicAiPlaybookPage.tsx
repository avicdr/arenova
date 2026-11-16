import { ArrowLeft, ArrowUpRight, Calendar, Clock, User } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface GuideProps {
  onNavigate?: (sectionId: string) => void;
}

export const DeterministicAiPlaybookPage = ({ onNavigate }: GuideProps) => {
  const { navigate } = useRouter();

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      {/* Article Header */}
      <section className="subpage-hero">
        <div className="page-frame" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <button
            onClick={() => navigate('/blog/')}
            style={{
              background: 'none',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--ink-2)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '24px',
              padding: 0,
            }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px' }} /> Back to all articles
          </button>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '0.85rem', color: 'var(--ink-2)', marginBottom: '16px' }}>
            <span
              style={{
                background: 'var(--line)',
                padding: '4px 10px',
                borderRadius: '4px',
                fontWeight: 600,
                color: 'var(--ink)',
              }}
            >
              Systems Architecture
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Calendar style={{ width: '14px', height: '14px' }} /> Published November 2026
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Clock style={{ width: '14px', height: '14px' }} /> 9 min read
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <User style={{ width: '14px', height: '14px' }} /> By Avi, Systems Architect
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15, marginBottom: '24px' }}>
            The Deterministic AI Playbook for Reliable Business Workflows
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            Most corporate AI automation initiatives fail not because modern language models are incapable, but because teams
            mistakenly trust probabilistic models to perform deterministic execution. Here is how to architect dual-layer systems
            that expose failures instead of losing them silently.
          </p>
        </div>
      </section>

      {/* Main Body */}
      <section className="section" style={{ paddingTop: '16px' }}>
        <div className="page-frame" style={{ maxWidth: '860px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--ink)' }}>
          <h2>1. The Probabilistic Pitfall of No-Code Automation</h2>
          <p>
            Over the past three years, no-code automation platforms like Zapier, Make (formerly Integromat), and n8n introduced
            native OpenAI and Anthropic modules. For simple personal productivity tasks—such as summarizing a personal email or
            posting a celebratory Slack message when a sale closes—these modules work acceptably.
          </p>
          <p>
            Problems appear when operations teams scale linear no-code chains across customer interactions, invoice processing,
            or CRM mutations without validation, retries, and an owner for exceptions.
          </p>
          <p>
            The root cause is fundamental computer science: <strong>Large Language Models are probabilistic token predictors, while business databases require strict deterministic integrity.</strong>
          </p>

          <blockquote
            style={{
              margin: '32px 0',
              padding: '24px 32px',
              borderLeft: '4px solid var(--accent)',
              background: 'var(--surface)',
              borderRadius: '0 8px 8px 0',
              fontStyle: 'italic',
            }}
          >
            &ldquo;When you connect an LLM directly to a database write action without an intermediate validation compiler, you
            are effectively giving a creative writer direct SQL write privileges to your core balance sheet.&rdquo;
          </blockquote>

          <h2>2. Anatomy of a Silent Production Breakdown</h2>
          <p>Consider a standard customer inquiry workflow built in a visual no-code builder:</p>
          <ol style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>A prospect submits a demo request form with irregular punctuation and regional company acronyms.</li>
            <li>A webhook triggers a no-code scenario that asks an LLM prompt: <em>&ldquo;Extract the budget, industry, and contact phone number.&rdquo;</em></li>
            <li>The prompt outputs JSON—except in 3% of cases where it adds conversational markdown commentary (<code>```json ... ```</code>) or hallucinates a missing phone prefix.</li>
            <li>The next Zapier step fails to parse the string, throwing an unhandled runtime error.</li>
            <li>The lead sits in limbo. The sales rep is never notified. After 48 hours, the prospective client signs with a competitor.</li>
          </ol>
          <p>
            Worse than a hard crash is <strong>silent corruption</strong>: the model misinterprets an enterprise client’s &ldquo;$50k budget&rdquo; as &ldquo;50,000 INR&rdquo;, routes the deal to a junior rep, and logs flawed data into Salesforce.
          </p>

          <h2>3. The Arenova Dual-Layer Architecture: Perception vs. Execution</h2>
          <p>
            At <a href="/services/ai-automation/" onClick={(e) => { e.preventDefault(); navigate('/services/ai-automation/'); }}>Arenova</a>, our engineering manifesto states:
            <br />
            <strong>Language models interpret. Explicit rules and APIs execute.</strong>
          </p>
          <p>
            To prevent unverified model output from reaching critical business systems, separate the workflow into two
            independent architectural layers:
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              margin: '32px 0',
            }}
          >
            <div style={{ background: 'var(--surface)', padding: '28px', borderRadius: '8px', border: '1px solid var(--line)' }}>
              <h3 style={{ color: 'var(--accent)', marginTop: 0 }}>Layer 1: Perception (Probabilistic)</h3>
              <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.95rem' }}>
                <li>Ingests messy natural language, PDFs, audio voice notes, and emails.</li>
                <li>Performs intent classification, sentiment tagging, and entity extraction.</li>
                <li>Strictly forbidden from making database writes or API mutations.</li>
                <li>Outputs candidate structured schemas.</li>
              </ul>
            </div>
            <div style={{ background: 'var(--surface)', padding: '28px', borderRadius: '8px', border: '1px solid var(--line)' }}>
              <h3 style={{ color: 'var(--accent)', marginTop: 0 }}>Layer 2: Execution (Deterministic)</h3>
              <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.95rem' }}>
                <li>Validates candidate data against strict Pydantic / Zod type schemas.</li>
                <li>Executes boundary checks (e.g. minimum budget thresholds, email deliverability).</li>
                <li>Dispatches authenticated REST/GraphQL transactions with idempotency keys.</li>
                <li>Fails safely to human review queues if validation criteria are unmet.</li>
              </ul>
            </div>
          </div>

          <h2>4. Enforcing Strict Schema Boundaries with Pydantic &amp; Zod</h2>
          <p>
            In an engineered automation, an LLM is never allowed to produce freeform text. We enforce OpenAI Structured Outputs
            or JSON Schema validation libraries.
          </p>
          <p>
            If the model’s extraction fails validation—for example, if a company domain is malformed or an integer field contains
            a string—the payload is rejected at compile-time before touching your CRM or ERP.
          </p>

          <h2>5. Idempotency, Dead-Letter Queues &amp; Circuit Breakers</h2>
          <p>
            What happens when HubSpot’s API experiences a 10-second gateway timeout, or when a payment webhook fires three times in
            one second due to network jitter?
          </p>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <strong>Idempotency Keys:</strong> Every transaction generates a unique hash based on customer ID, timestamp, and action. If a webhook retries, the system identifies the key and ignores duplicate execution.
            </li>
            <li>
              <strong>Dead-Letter Queues (DLQ):</strong> Failed payloads are never discarded. They are routed to a persistent Amazon SQS or Redis queue with full execution context and payload metadata.
            </li>
            <li>
              <strong>Circuit Breakers:</strong> If an upstream API returns repeated 500 errors, the circuit trips automatically, alerting on-call engineers via Slack without bombarding the failing service.
            </li>
          </ul>

          <h2>6. A production-readiness review</h2>
          <p>
            Before release, review the workflow as an operating system rather than a successful demo. The team should be able to
            answer each of these questions with a test, an owner, and a recovery path:
          </p>
          <div style={{ background: 'var(--surface)', padding: '28px', borderRadius: '8px', margin: '24px 0' }}>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: 0 }}>
              <li>What happens when the model output is incomplete, invalid, or low confidence?</li>
              <li>Can a duplicate event repeat a customer-facing or financial action?</li>
              <li>Where can an operator see failed work and replay it safely?</li>
              <li>Which actions require a person, and how is that approval recorded?</li>
              <li>How is the release stopped or rolled back when a rule changes?</li>
            </ul>
          </div>

          <div
            style={{
              margin: '48px 0',
              padding: '36px',
              background: 'var(--ink)',
              color: 'var(--inverse)',
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: 'white', marginTop: 0, fontSize: '1.5rem' }}>Want to calculate your exact automation savings?</h3>
            <p style={{ color: 'var(--inverse-muted)', maxWidth: '540px', margin: '0 auto 24px' }}>
              Use our free interactive calculator to determine annual labor hours saved and projected ROI payback timeline.
            </p>
            <button
              className="button button--primary"
              onClick={() => navigate('/tools/automation-roi-calculator/')}
            >
              Launch Automation ROI Calculator <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="page-close">
        <div className="page-frame">
          <h2>Ready to replace fragile no-code automations with deterministic code?</h2>
          <p>Book a technical architecture consultation with Arenova. We’ll audit your existing workflows and design a robust system.</p>
          <button className="button button--primary" onClick={contact}>
            Request technical consultation <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

DeterministicAiPlaybookPage.displayName = 'DeterministicAiPlaybookPage';
