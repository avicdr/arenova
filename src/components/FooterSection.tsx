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
        <div className="footer-primary">
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
            <p>
              Deterministic AI systems, custom autonomous agents, and enterprise workflow engineering for teams with complex
              operational handoffs.
            </p>
            <p className="footer-location">
              Bengaluru, India · Global delivery for US, India & international enterprises
            </p>
          </div>

          <div className="footer-links">
            <nav aria-label="Services" className="footer-nav footer-nav--services">
              <h2>Services</h2>
              <div className="footer-services-grid">
                <div className="footer-subcol">
                  <a href="/services/ai-automation/" onClick={(e) => { e.preventDefault(); go('/services/ai-automation/'); }}>AI Automation</a>
                  <a href="/services/ai-integration/" onClick={(e) => { e.preventDefault(); go('/services/ai-integration/'); }}>AI Integration</a>
                  <a href="/services/ai-agents/" onClick={(e) => { e.preventDefault(); go('/services/ai-agents/'); }}>AI Agents</a>
                  <a href="/services/business-process-automation/" onClick={(e) => { e.preventDefault(); go('/services/business-process-automation/'); }}>Process Automation</a>
                  <a href="/services/ai-workflow-automation/" onClick={(e) => { e.preventDefault(); go('/services/ai-workflow-automation/'); }}>Workflow Pipelines</a>
                  <a href="/services/crm-automation/" onClick={(e) => { e.preventDefault(); go('/services/crm-automation/'); }}>CRM & Outreach</a>
                  <a href="/services/custom-ai-development/" onClick={(e) => { e.preventDefault(); go('/services/custom-ai-development/'); }}>Custom AI Engineering</a>
                </div>
                <div className="footer-subcol">
                  <a href="/services/ai-chatbot-development/" onClick={(e) => { e.preventDefault(); go('/services/ai-chatbot-development/'); }}>AI Chatbots</a>
                  <a href="/services/ai-voice-agents/" onClick={(e) => { e.preventDefault(); go('/services/ai-voice-agents/'); }}>AI Voice Agents</a>
                  <a href="/services/whatsapp-automation/" onClick={(e) => { e.preventDefault(); go('/services/whatsapp-automation/'); }}>WhatsApp Automation</a>
                  <a href="/services/ai-customer-support/" onClick={(e) => { e.preventDefault(); go('/services/ai-customer-support/'); }}>Customer Support AI</a>
                  <a href="/services/ai-sales-automation/" onClick={(e) => { e.preventDefault(); go('/services/ai-sales-automation/'); }}>Sales Automation</a>
                </div>
              </div>
            </nav>

            <nav aria-label="Industries" className="footer-nav">
              <h2>Industries</h2>
              <a href="/industries/real-estate/" onClick={(e) => { e.preventDefault(); go('/industries/real-estate/'); }}>Real Estate</a>
              <a href="/industries/b2b-services/" onClick={(e) => { e.preventDefault(); go('/industries/b2b-services/'); }}>B2B & Agencies</a>
              <a href="/industries/healthcare/" onClick={(e) => { e.preventDefault(); go('/industries/healthcare/'); }}>Healthcare Clinics</a>
              <a href="/industries/recruitment/" onClick={(e) => { e.preventDefault(); go('/industries/recruitment/'); }}>Recruitment & Staffing</a>
              <a href="/industries/marketing-agencies/" onClick={(e) => { e.preventDefault(); go('/industries/marketing-agencies/'); }}>Marketing Studios</a>
              <a href="/industries/saas/" onClick={(e) => { e.preventDefault(); go('/industries/saas/'); }}>B2B SaaS</a>
            </nav>

            <nav aria-label="Engineering & Guides" className="footer-nav">
              <h2>Playbooks</h2>
              <a href="/blog/" onClick={(e) => { e.preventDefault(); go('/blog/'); }}>Engineering Blog</a>
              <a href="/blog/deterministic-ai-playbook/" onClick={(e) => { e.preventDefault(); go('/blog/deterministic-ai-playbook/'); }}>Deterministic AI</a>
              <a href="/blog/ai-agents-vs-chatbots/" onClick={(e) => { e.preventDefault(); go('/blog/ai-agents-vs-chatbots/'); }}>AI Agents vs Bots</a>
              <a href="/blog/calculating-automation-roi/" onClick={(e) => { e.preventDefault(); go('/blog/calculating-automation-roi/'); }}>Calculating ROI</a>
              <a href="/tools/automation-roi-calculator/" onClick={(e) => { e.preventDefault(); go('/tools/automation-roi-calculator/'); }}>ROI Calculator</a>
            </nav>

            <nav aria-label="Company" className="footer-nav">
              <h2>Company</h2>
              <a href="/about/" onClick={(e) => { e.preventDefault(); go('/about/'); }}>About Arenova</a>
              <a href="/us/" onClick={(e) => { e.preventDefault(); go('/us/'); }}>United States</a>
              <a href="/india/" onClick={(e) => { e.preventDefault(); go('/india/'); }}>India (Domestic)</a>
              <a href="/pricing/" onClick={(e) => { e.preventDefault(); go('/pricing/'); }}>Pricing & Scope</a>
              <a href="https://menzy.arenova.in" target="_blank" rel="noopener noreferrer">
                Menzy (Restaurant AI) <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="https://frontdesk.arenova.in" target="_blank" rel="noopener noreferrer">
                Frontdesk <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="https://outreacher.arenova.in" target="_blank" rel="noopener noreferrer">
                Outreacher <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="mailto:avi@arenova.in">Email Avi</a>
            </nav>
          </div>
        </div>

        <div className="footer-legal">
          <span>© 2026 ARENOVA Systems Architecture. All rights reserved.</span>
          <span><a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · Bengaluru, India</span>
        </div>
      </div>
    </footer>
  );
}
