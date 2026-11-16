import { useCallback, useEffect, useState } from 'react';
import type { CanonicalRouteKey } from './config/seo';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Analytics } from './components/Analytics';
import { FooterSection } from './components/FooterSection';
import { Navigation } from './components/Navigation';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import { UsPage } from './pages/UsPage';
import { IndiaPage } from './pages/IndiaPage';
import { LegalPage } from './pages/LegalPage';
import { AiAutomationPage } from './pages/services/AiAutomationPage';
import { AiIntegrationPage } from './pages/services/AiIntegrationPage';
import { AiAgentsPage } from './pages/services/AiAgentsPage';
import { BusinessProcessAutomationPage } from './pages/services/BusinessProcessAutomationPage';
import { AiWorkflowAutomationPage } from './pages/services/AiWorkflowAutomationPage';
import { CrmAutomationPage } from './pages/services/CrmAutomationPage';
import { CustomAiDevelopmentPage } from './pages/services/CustomAiDevelopmentPage';
import { RealEstatePage } from './pages/industries/RealEstatePage';
import { B2bServicesPage } from './pages/industries/B2bServicesPage';
import { HealthcarePage } from './pages/industries/HealthcarePage';
import { RecruitmentPage } from './pages/industries/RecruitmentPage';
import { MarketingAgenciesPage } from './pages/industries/MarketingAgenciesPage';
import { SaasPage } from './pages/industries/SaasPage';
import { AiChatbotPage } from './pages/services/AiChatbotPage';
import { AiVoiceAgentsPage } from './pages/services/AiVoiceAgentsPage';
import { WhatsappAutomationPage } from './pages/services/WhatsappAutomationPage';
import { AiCustomerSupportPage } from './pages/services/AiCustomerSupportPage';
import { AiSalesAutomationPage } from './pages/services/AiSalesAutomationPage';
import { RoiCalculatorPage } from './pages/tools/RoiCalculatorPage';
import { BlogHubPage } from './pages/blog/BlogHubPage';
import { DeterministicAiPlaybookPage } from './pages/blog/DeterministicAiPlaybookPage';
import { AiAgentsVsChatbotsPage } from './pages/blog/AiAgentsVsChatbotsPage';
import { CalculatingAutomationRoiPage } from './pages/blog/CalculatingAutomationRoiPage';
import { UsSeoGuidePage } from './pages/blog/UsSeoGuidePage';

function AppContent() {
  const { pathname, navigate } = useRouter();
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    if (pathname !== '/') return;
    const sectionIds = ['top', 'services', 'system', 'use-cases', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-32% 0px -52%', threshold: [0.05, 0.35] }
    );
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const handleNavigate = useCallback(
    (sectionId: string) => {
      const target = sectionId === 'contact' ? 'contact' : sectionId;
      if (pathname !== '/') {
        navigate(`/#${target}`);
        return;
      }
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', target === 'top' ? '/' : `/#${target}`);
      }
    },
    [navigate, pathname]
  );

  return (
    <div className="site-shell">
      <Analytics />
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      {pathname === '/pricing' ? (
        <PricingPage onNavigate={handleNavigate} />
      ) : pathname === '/about' ? (
        <AboutPage onNavigate={handleNavigate} />
      ) : pathname === '/us' ? (
        <UsPage onNavigate={handleNavigate} />
      ) : pathname === '/india' ? (
        <IndiaPage onNavigate={handleNavigate} />
      ) : pathname === '/privacy' ? (
        <LegalPage kind="privacy" />
      ) : pathname === '/terms' ? (
        <LegalPage kind="terms" />
      ) : pathname === '/services/ai-automation' ? (
        <AiAutomationPage onNavigate={handleNavigate} />
      ) : pathname === '/services/ai-integration' ? (
        <AiIntegrationPage onNavigate={handleNavigate} />
      ) : pathname === '/services/ai-agents' ? (
        <AiAgentsPage onNavigate={handleNavigate} />
      ) : pathname === '/services/business-process-automation' ? (
        <BusinessProcessAutomationPage onNavigate={handleNavigate} />
      ) : pathname === '/services/ai-workflow-automation' ? (
        <AiWorkflowAutomationPage onNavigate={handleNavigate} />
      ) : pathname === '/services/crm-automation' ? (
        <CrmAutomationPage onNavigate={handleNavigate} />
      ) : pathname === '/services/custom-ai-development' ? (
        <CustomAiDevelopmentPage onNavigate={handleNavigate} />
      ) : pathname === '/services/ai-chatbot-development' ? (
        <AiChatbotPage onNavigate={handleNavigate} />
      ) : pathname === '/services/ai-voice-agents' ? (
        <AiVoiceAgentsPage onNavigate={handleNavigate} />
      ) : pathname === '/services/whatsapp-automation' ? (
        <WhatsappAutomationPage onNavigate={handleNavigate} />
      ) : pathname === '/services/ai-customer-support' ? (
        <AiCustomerSupportPage onNavigate={handleNavigate} />
      ) : pathname === '/services/ai-sales-automation' ? (
        <AiSalesAutomationPage onNavigate={handleNavigate} />
      ) : pathname === '/industries/real-estate' ? (
        <RealEstatePage onNavigate={handleNavigate} />
      ) : pathname === '/industries/b2b-services' ? (
        <B2bServicesPage onNavigate={handleNavigate} />
      ) : pathname === '/industries/healthcare' ? (
        <HealthcarePage onNavigate={handleNavigate} />
      ) : pathname === '/industries/recruitment' ? (
        <RecruitmentPage onNavigate={handleNavigate} />
      ) : pathname === '/industries/marketing-agencies' ? (
        <MarketingAgenciesPage onNavigate={handleNavigate} />
      ) : pathname === '/industries/saas' ? (
        <SaasPage onNavigate={handleNavigate} />
      ) : pathname === '/tools/automation-roi-calculator' ? (
        <RoiCalculatorPage onNavigate={handleNavigate} />
      ) : pathname === '/blog' ? (
        <BlogHubPage onNavigate={handleNavigate} />
      ) : pathname === '/blog/deterministic-ai-playbook' ? (
        <DeterministicAiPlaybookPage onNavigate={handleNavigate} />
      ) : pathname === '/blog/ai-agents-vs-chatbots' ? (
        <AiAgentsVsChatbotsPage onNavigate={handleNavigate} />
      ) : pathname === '/blog/calculating-automation-roi' ? (
        <CalculatingAutomationRoiPage onNavigate={handleNavigate} />
      ) : pathname === '/blog/ai-automation-cost' || pathname === '/blog/ai-agent-evaluation-checklist' || pathname === '/blog/n8n-vs-custom-code' || pathname === '/blog/ai-crm-integration-guide' || pathname === '/blog/how-to-choose-ai-automation-agency' ? (
        <UsSeoGuidePage routeKey={pathname} onNavigate={handleNavigate} />
      ) : (
        <HomePage onNavigate={handleNavigate} />
      )}
      <FooterSection onNavigate={handleNavigate} />
    </div>
  );
}

export default function App({ initialPathname }: { initialPathname?: CanonicalRouteKey }) {
  return (
    <RouterProvider initialPathname={initialPathname}>
      <AppContent />
    </RouterProvider>
  );
}
