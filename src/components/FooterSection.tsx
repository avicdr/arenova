import { ArrowUpRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

interface FooterSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function FooterSection({ onNavigate }: FooterSectionProps) {
  const { pathname, navigate } = useRouter();

  const go = (target: string) => {
    if (target.startsWith('/')) {
      navigate(target);
    } else if (pathname === '/') {
      onNavigate(target);
    } else {
      navigate(`/#${target}`);
    }
  };

  return (
    <footer className="site-footer">
      <div className="page-frame">
        <div className="footer-primary" style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '64px' }}>
          <div className="footer-statement">
            <a
              className="brand brand--footer"
              href="/"
              onClick={(event) => {
                event.preventDefault();
                go('/');
              }}
            >
              <img src="/arenova-128.webp" width="40" height="40" alt="" />
              <span>Arenova</span>
            </a>
            <p style={{ marginTop: '16px', lineHeight: 1.65, color: 'var(--inverse-muted)' }}>
              Deterministic AI systems, custom autonomous agents, and enterprise workflow engineering for teams with complex
              operational handoffs.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--inverse-muted)', marginTop: '12px' }}>
              Bengaluru, India · Global Remote Delivery
            </p>
          </div>

          <div className="footer-links" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '32px' }}>
            <nav aria-label="Services">
              <h2>Services</h2>
              <a href="/services/ai-automation/" onClick={(e) => { e.preventDefault(); go('/services/ai-automation/'); }}>AI Automation</a>
              <a href="/services/ai-agents/" onClick={(e) => { e.preventDefault(); go('/services/ai-agents/'); }}>AI Agents</a>
              <a href="/services/business-process-automation/" onClick={(e) => { e.preventDefault(); go('/services/business-process-automation/'); }}>Process Automation</a>
              <a href="/services/ai-workflow-automation/" onClick={(e) => { e.preventDefault(); go('/services/ai-workflow-automation/'); }}>Workflow Pipelines</a>
              <a href="/services/crm-automation/" onClick={(e) => { e.preventDefault(); go('/services/crm-automation/'); }}>CRM & Outreach</a>
              <a href="/services/custom-ai-development/" onClick={(e) => { e.preventDefault(); go('/services/custom-ai-development/'); }}>Custom AI Engineering</a>
            </nav>

            <nav aria-label="Industries">
              <h2>Industries</h2>
              <a href="/industries/real-estate/" onClick={(e) => { e.preventDefault(); go('/industries/real-estate/'); }}>Real Estate</a>
              <a href="/industries/b2b-services/" onClick={(e) => { e.preventDefault(); go('/industries/b2b-services/'); }}>B2B & Agencies</a>
              <a href="/industries/healthcare/" onClick={(e) => { e.preventDefault(); go('/industries/healthcare/'); }}>Healthcare Clinics</a>
            </nav>

            <nav aria-label="Company & Tools">
              <h2>Company & Tools</h2>
              <a href="/about/" onClick={(e) => { e.preventDefault(); go('/about/'); }}>About Arenova</a>
              <a href="/pricing/" onClick={(e) => { e.preventDefault(); go('/pricing/'); }}>Pricing & Scope</a>
              <a href="/tools/automation-roi-calculator/" onClick={(e) => { e.preventDefault(); go('/tools/automation-roi-calculator/'); }}>ROI Calculator</a>
              <a href="mailto:avi@arenova.in">Email Avi</a>
            </nav>

            <nav aria-label="Products">
              <h2>Products</h2>
              <a href="https://frontdesk.arenova.in" target="_blank" rel="noopener noreferrer">
                Frontdesk <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="https://outreacher.arenova.in" target="_blank" rel="noopener noreferrer">
                Outreacher <ArrowUpRight aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>

        <div className="footer-legal" style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--line-inverse)', display: 'flex', justifyContent: 'space-between', color: 'var(--inverse-muted)', fontSize: '0.82rem' }}>
          <span>© 2026 ARENOVA Systems Architecture. All rights reserved.</span>
          <span>Bengaluru, India · Serving Clients in US, UK, Canada, Australia & India</span>
        </div>
      </div>
    </footer>
  );
}
