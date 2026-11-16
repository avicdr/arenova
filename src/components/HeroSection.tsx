import { ArrowUpRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const { navigate } = useRouter();

  return (
    <section id="top" className="hero-section" data-enter>
      <div className="page-frame hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">AI Automation Agency · Custom AI Agents · US & India Delivery</p>
          <h1>AI automation agency and custom agent engineering.</h1>
          <p className="hero-lead">
            Arenova designs deterministic workflow automation, autonomous AI agents, and systems integrations around the tools
            your team already uses—eliminating repetitive manual handoffs without hallucinations.
          </p>
          <div className="hero-actions">
            <button className="button button--primary" onClick={() => onNavigate('contact')}>
              Request an automation audit <ArrowUpRight aria-hidden="true" />
            </button>
            <button className="button button--secondary" onClick={() => navigate('/services/ai-automation/')}>
              Explore our services
            </button>
          </div>
          <div style={{ marginTop: '24px', display: 'flex', gap: '20px', fontSize: '0.82rem', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <span>✓ Deterministic API execution</span>
            <span>✓ US (EST/PST) & India (IST) overlap</span>
            <span>✓ 2–4 week deployment</span>
          </div>
        </div>

        <div className="architecture-board" role="img" aria-label="Arenova system architecture connecting business inputs to automated actions">
          <div className="architecture-board__head">
            <span>Arenova system model</span>
            <span>Designed per enterprise workflow</span>
          </div>
          <div className="architecture-flow">
            <div className="architecture-column architecture-inputs">
              <span className="architecture-label">Inputs</span>
              <div>Voice Calls & WhatsApp</div>
              <div>Inbound Forms & Leads</div>
              <div>CRM & Webhook Events</div>
            </div>
            <div className="architecture-core">
              <span className="architecture-label">Control layer</span>
              <strong>Deterministic Core</strong>
              <span>Intent Extraction</span>
              <span>Schema Validation</span>
              <span>Human Fallback Gate</span>
            </div>
            <div className="architecture-column architecture-outputs">
              <span className="architecture-label">Actions</span>
              <div>Book & Route Leads</div>
              <div>Bi-Directional CRM Sync</div>
              <div>Dispatch Slack & SMS</div>
            </div>
          </div>
          <p className="architecture-board__foot">Language models interpret. Explicit rules, schemas, and APIs execute.</p>
        </div>
      </div>
    </section>
  );
}
