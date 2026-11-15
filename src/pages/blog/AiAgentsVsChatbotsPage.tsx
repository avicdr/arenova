import { ArrowLeft, ArrowUpRight, Calendar, Clock, User, CheckCircle2 } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface GuideProps {
  onNavigate?: (sectionId: string) => void;
}

export const AiAgentsVsChatbotsPage = ({ onNavigate }: GuideProps) => {
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
              Agent Engineering
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Calendar style={{ width: '14px', height: '14px' }} /> Published February 2026
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Clock style={{ width: '14px', height: '14px' }} /> 11 min read
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <User style={{ width: '14px', height: '14px' }} /> By Avi, Systems Architect
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15, marginBottom: '24px' }}>
            Autonomous AI Agents vs Traditional Chatbots: The Production Architecture Guide
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            The enterprise software landscape is rapidly shifting from conversational chatbots to autonomous agents. Here is an
            unvarnished engineering breakdown of the structural differences, memory architectures, tool sandboxes, and safety
            boundaries needed for production deployment.
          </p>
        </div>
      </section>

      {/* Main Body */}
      <section className="section" style={{ paddingTop: '16px' }}>
        <div className="page-frame" style={{ maxWidth: '860px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--ink)' }}>
          <h2>1. The Core Paradigm Shift: Reactive Text vs. Goal-Directed Agency</h2>
          <p>
            For nearly a decade, enterprise conversational software meant &ldquo;chatbots.&rdquo; Whether built on rule-based
            decision trees (ManyChat, Drift) or modern Retrieval-Augmented Generation (RAG) wrappers, chatbots are inherently
            <strong> reactive</strong>:
          </p>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>A human sends a prompt: <em>&ldquo;What is your refund policy?&rdquo;</em></li>
            <li>The chatbot searches a vector database, retrieves 3 chunks of text, and formats a polite answer.</li>
            <li>The process terminates. The chatbot takes no action, exercises no initiative, and maintains no autonomous objective.</li>
          </ul>
          <p>
            In contrast, an <a href="/services/ai-agents/" onClick={(e) => { e.preventDefault(); navigate('/services/ai-agents/'); }}>autonomous AI agent</a> is <strong>goal-directed and proactive</strong>. Given a high-level business objective—such as <em>&ldquo;Qualify incoming leads from the European conference, verify their company ARR, and book meetings for senior reps&rdquo;</em>—an agent autonomously decomposes the goal into subtasks, queries external tools, inspects intermediate outputs, self-corrects on errors, and executes state changes across multiple systems.
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
            &ldquo;A chatbot is an interactive encyclopedia. An AI agent is a digital employee with a job description, working
            memory, access to specific software tools, and a mandate to achieve a verified outcome.&rdquo;
          </blockquote>

          <h2>2. The Four Core Subsystems of a Production AI Agent</h2>
          <p>
            At Arenova, we engineer autonomous systems using a modular four-subsystem architecture:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '28px 0' }}>
            <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '8px', border: '1px solid var(--line)' }}>
              <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>Subsystem 1: Perception &amp; Context Assembly</h3>
              <p style={{ margin: 0, fontSize: '1rem' }}>
                Ingests environmental inputs (webhooks, email threads, database updates, sensor logs), strips irrelevant noise,
                and compiles relevant context tokens into a structured environment state.
              </p>
            </div>
            <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '8px', border: '1px solid var(--line)' }}>
              <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>Subsystem 2: Memory &amp; State Persistence</h3>
              <p style={{ margin: 0, fontSize: '1rem' }}>
                Combines short-term working scratchpads (current execution stack, tool responses) with long-term episodic memory
                (vectorized customer history, past interaction outcomes) stored in high-performance key-value databases.
              </p>
            </div>
            <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '8px', border: '1px solid var(--line)' }}>
              <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>Subsystem 3: Sandboxed Tool Calling</h3>
              <p style={{ margin: 0, fontSize: '1rem' }}>
                Agents do not touch raw operating systems or execute freeform SQL. Every capability is exposed as an authenticated,
                strongly typed REST or RPC tool with rate limits, input validation schemas, and audit telemetry.
              </p>
            </div>
            <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '8px', border: '1px solid var(--line)' }}>
              <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>Subsystem 4: Reflection &amp; Self-Correction Loops</h3>
              <p style={{ margin: 0, fontSize: '1rem' }}>
                Before finalizing an outcome, the agent invokes an internal critique loop: <em>&ldquo;Did the tool output match the expected schema? Did the API call succeed? Does this fulfill the user’s original constraint?&rdquo;</em> If an error is detected, the agent tries an alternate path.
              </p>
            </div>
          </div>

          <h2>3. Multi-Agent Orchestration: Supervisors vs Hierarchies</h2>
          <p>
            Monolithic single-agent setups inevitably suffer from context saturation and degradation as task complexity grows.
            Production systems require <strong>multi-agent architectures</strong>, such as LangGraph or custom state machines:
          </p>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <strong>Supervisor Router Pattern:</strong> A lightweight supervisor agent classifies incoming tasks and delegates them to specialized workers (e.g. Research Agent, Financial Analyst Agent, Communications Agent).
            </li>
            <li>
              <strong>Stateful Graphs:</strong> Execution paths are modeled as directed cyclic graphs where nodes are agent turns and edges represent conditional logic or human approval checkpoints.
            </li>
          </ul>

          <h2>4. Safety Sandboxing: Preventing Autonomous Catastrophes</h2>
          <p>
            Deploying autonomous systems into real enterprise operations requires strict non-negotiable safety guardrails:
          </p>
          <div style={{ background: 'var(--surface)', padding: '28px', borderRadius: '8px', margin: '24px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <CheckCircle2 style={{ color: 'var(--accent)', width: '20px', height: '20px', flexShrink: 0, marginTop: '4px' }} />
                <span><strong>No Unrestricted DB Write Privileges:</strong> Agents may propose mutations; only deterministic microservices with verified auth tokens commit records.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <CheckCircle2 style={{ color: 'var(--accent)', width: '20px', height: '20px', flexShrink: 0, marginTop: '4px' }} />
                <span><strong>Financial Threshold Gates:</strong> Any financial transaction or contract dispatch exceeding agreed thresholds ($500+) requires human supervisor one-click approval.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <CheckCircle2 style={{ color: 'var(--accent)', width: '20px', height: '20px', flexShrink: 0, marginTop: '4px' }} />
                <span><strong>Zero-Data-Retention (ZDR):</strong> Customer records and proprietary IP are never sent to model endpoints that utilize user data for training.</span>
              </div>
            </div>
          </div>

          <h2>5. Decision Matrix: When to Build a Chatbot vs. Deploy an Agent</h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              margin: '32px 0',
              fontSize: '0.95rem',
            }}
          >
            <thead>
              <tr style={{ background: 'var(--surface)', borderBottom: '2px solid var(--line)', textAlign: 'left' }}>
                <th style={{ padding: '14px' }}>Criteria</th>
                <th style={{ padding: '14px' }}>Deploy a Chatbot</th>
                <th style={{ padding: '14px' }}>Deploy an Autonomous Agent</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '14px', fontWeight: 600 }}>Primary Objective</td>
                <td style={{ padding: '14px' }}>Information retrieval, FAQ answering</td>
                <td style={{ padding: '14px' }}>End-to-end task execution &amp; resolution</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '14px', fontWeight: 600 }}>Action Capability</td>
                <td style={{ padding: '14px' }}>Read-only (or single-click handoffs)</td>
                <td style={{ padding: '14px' }}>Multi-step tool calling across 3+ APIs</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '14px', fontWeight: 600 }}>Decision Flow</td>
                <td style={{ padding: '14px' }}>Linear or single turn</td>
                <td style={{ padding: '14px' }}>Multi-step planning, reflection, retry</td>
              </tr>
              <tr>
                <td style={{ padding: '14px', fontWeight: 600 }}>Engineering Effort</td>
                <td style={{ padding: '14px' }}>1–2 weeks (RAG vector pipeline)</td>
                <td style={{ padding: '14px' }}>3–6 weeks (Graph state machine &amp; auth)</td>
              </tr>
            </tbody>
          </table>

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
            <h3 style={{ color: 'white', marginTop: 0, fontSize: '1.5rem' }}>Ready to engineer custom AI agents for your business?</h3>
            <p style={{ color: 'var(--inverse-muted)', maxWidth: '540px', margin: '0 auto 24px' }}>
              Explore our custom AI agent development services and see how autonomous workflows can eliminate operational bottlenecks.
            </p>
            <button
              className="button button--primary"
              onClick={() => navigate('/services/ai-agents/')}
            >
              Explore AI Agent Development <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="page-close">
        <div className="page-frame">
          <h2>Discuss your agent architecture with our engineering team.</h2>
          <p>Request a technical consultation. We’ll evaluate your use case and design an autonomous system tailored to your infrastructure.</p>
          <button className="button button--primary" onClick={contact}>
            Request technical consultation <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

AiAgentsVsChatbotsPage.displayName = 'AiAgentsVsChatbotsPage';

