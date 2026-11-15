/**
 * ARENOVA ECOSYSTEM SEO CONFIGURATION
 *
 * Centralized, production-grade SEO parameters for the Arenova parent domain (https://arenova.in/).
 * Canonical URLs strictly match GitHub Pages & Cloudflare 200 OK trailing-slash endpoints.
 */

export type CanonicalRouteKey =
  | '/'
  | '/pricing'
  | '/about'
  | '/services/ai-automation'
  | '/services/ai-agents'
  | '/services/business-process-automation'
  | '/services/ai-workflow-automation'
  | '/services/crm-automation'
  | '/services/custom-ai-development'
  | '/industries/real-estate'
  | '/industries/b2b-services'
  | '/industries/healthcare'
  | '/tools/automation-roi-calculator';

export interface RouteSeoMeta {
  routeKey: CanonicalRouteKey;
  canonicalUrl: string;
  title: string;
  description: string;
  keywords: string;
  ogType: 'website' | 'article';
}

export const ROUTE_SEO: Record<CanonicalRouteKey, RouteSeoMeta> = {
  '/': {
    routeKey: '/',
    canonicalUrl: 'https://arenova.in/',
    title: 'Arenova | AI Automation Agency & Custom AI Agent Development',
    description:
      'Arenova is an AI automation agency engineering deterministic workflows, custom AI agents, and business process automation for modern enterprises.',
    keywords:
      'AI automation agency, AI automation company, AI agent development company, business process automation agency, AI workflow automation, custom AI development, AI automation agency India, enterprise AI agents, Arenova',
    ogType: 'website',
  },
  '/pricing': {
    routeKey: '/pricing',
    canonicalUrl: 'https://arenova.in/pricing/',
    title: 'Arenova Pricing | Transparent AI Automation & Agent Engineering',
    description:
      'Transparent pricing for enterprise AI automation systems: Sales & Outreach ($999/mo), Business Automation ($1,999/mo), Connected Automation ($3,499/mo), and AI Frontdesk ($490/mo).',
    keywords:
      'AI automation pricing, AI agent development cost, workflow automation pricing, AI agency retainers, enterprise AI ROI, Arenova pricing',
    ogType: 'website',
  },
  '/about': {
    routeKey: '/about',
    canonicalUrl: 'https://arenova.in/about/',
    title: 'About Arenova | Systems Architecture & Deterministic AI Agency',
    description:
      'Arenova is a founder-led AI automation company founded by Avi in Bengaluru. We build controlled, deterministic automation for customer inquiries, sales activity, and internal operations.',
    keywords:
      'About Arenova, AI automation agency Bengaluru, deterministic AI systems, workflow automation engineering, Avi Arenova, custom AI development India',
    ogType: 'website',
  },
  '/services/ai-automation': {
    routeKey: '/services/ai-automation',
    canonicalUrl: 'https://arenova.in/services/ai-automation/',
    title: 'AI Automation Agency & Services | Enterprise Systems | Arenova',
    description:
      'Arenova is an enterprise AI automation agency. We engineer end-to-end operational workflows, CRM pipelines, and autonomous triage systems with zero hallucinations.',
    keywords:
      'AI automation agency, AI automation company, AI automation services, AI automation agency India, enterprise AI automation, business automation agency, intelligent workflow automation',
    ogType: 'website',
  },
  '/services/ai-agents': {
    routeKey: '/services/ai-agents',
    canonicalUrl: 'https://arenova.in/services/ai-agents/',
    title: 'Custom AI Agent Development Company | Autonomous Systems | Arenova',
    description:
      'Arenova develops custom autonomous AI agents for business operations. Goal-driven multi-agent orchestration, scoped tool execution, and deterministic validation.',
    keywords:
      'AI agent development company, custom AI agents for business, AI agent development agency, autonomous AI agents, enterprise AI agents, AI agent development services India',
    ogType: 'website',
  },
  '/services/business-process-automation': {
    routeKey: '/services/business-process-automation',
    canonicalUrl: 'https://arenova.in/services/business-process-automation/',
    title: 'Business Process Automation Agency | Operations Engineering | Arenova',
    description:
      'Eliminate manual data entry and brittle handoffs. Arenova connects your ERP, CRM, billing, and internal software into fault-tolerant automated business processes.',
    keywords:
      'business process automation agency, BPA agency, enterprise workflow automation company, operations automation, automated document extraction, internal workflow automation',
    ogType: 'website',
  },
  '/services/ai-workflow-automation': {
    routeKey: '/services/ai-workflow-automation',
    canonicalUrl: 'https://arenova.in/services/ai-workflow-automation/',
    title: 'AI Workflow Automation Services | Deterministic Pipelines | Arenova',
    description:
      'Engineered AI workflow automation services replacing fragile Make/Zapier chains. Resilient API microservices, structured schemas, dead-letter queues, and human fallback paths.',
    keywords:
      'AI workflow automation, AI-powered workflow automation, intelligent process automation, automated workflow design, workflow automation services India',
    ogType: 'website',
  },
  '/services/crm-automation': {
    routeKey: '/services/crm-automation',
    canonicalUrl: 'https://arenova.in/services/crm-automation/',
    title: 'CRM Automation & Sales Outreach Systems | Arenova',
    description:
      'Automate HubSpot, Salesforce, and Zoho CRM pipelines. Bi-directional sync, waterfall prospect enrichment, WhatsApp Cloud API integration, and meeting scheduling.',
    keywords:
      'CRM automation services, HubSpot automation agency, Salesforce AI automation, Zoho CRM automation, cold outreach automation, WhatsApp AI automation, sales automation agency',
    ogType: 'website',
  },
  '/services/custom-ai-development': {
    routeKey: '/services/custom-ai-development',
    canonicalUrl: 'https://arenova.in/services/custom-ai-development/',
    title: 'Custom AI Development Company | LLMs & Enterprise Software | Arenova',
    description:
      'Custom AI software engineering: private vector databases, fine-tuned domain models, RAG pipelines, and full-stack software development with complete IP ownership.',
    keywords:
      'custom AI development company, custom AI solutions company, LLM application development, AI software development company, custom AI engineering India',
    ogType: 'website',
  },
  '/industries/real-estate': {
    routeKey: '/industries/real-estate',
    canonicalUrl: 'https://arenova.in/industries/real-estate/',
    title: 'AI Automation for Real Estate Agencies & Developers | Arenova',
    description:
      'Automate real estate lead capture: 24/7 WhatsApp & voice inquiry qualification, automated viewing bookings, CRM synchronization, and post-inspection follow-ups.',
    keywords:
      'AI automation for real estate, real estate lead qualification AI, automated property showing booking, real estate CRM automation, WhatsApp real estate bot',
    ogType: 'website',
  },
  '/industries/b2b-services': {
    routeKey: '/industries/b2b-services',
    canonicalUrl: 'https://arenova.in/industries/b2b-services/',
    title: 'AI Automation for B2B Services, Consultancies & Agencies | Arenova',
    description:
      'Streamline B2B client operations: automated decision-maker research, contract trigger onboarding, invoice reconciliation, and cross-tool task orchestration.',
    keywords:
      'AI automation for B2B services, consulting workflow automation, agency operations automation, B2B client onboarding automation, invoice automation',
    ogType: 'website',
  },
  '/industries/healthcare': {
    routeKey: '/industries/healthcare',
    canonicalUrl: 'https://arenova.in/industries/healthcare/',
    title: 'AI Automation for Healthcare Clinics & Medical Practices | Arenova',
    description:
      'Automate clinic front desk operations: patient appointment booking, calendar reminders, administrative triage, and intake form routing. Clinical decisions remain with physicians.',
    keywords:
      'AI automation for healthcare, clinic front desk AI, patient appointment automation, medical practice workflow automation, healthcare appointment booking bot',
    ogType: 'website',
  },
  '/tools/automation-roi-calculator': {
    routeKey: '/tools/automation-roi-calculator',
    canonicalUrl: 'https://arenova.in/tools/automation-roi-calculator/',
    title: 'AI Automation ROI & Cost Calculator | Calculate Annual Savings | Arenova',
    description:
      'Free interactive AI automation ROI calculator. Calculate your exact annual labor savings, hours returned to high-value tasks, and projected break-even payback period.',
    keywords:
      'AI automation ROI calculator, business automation cost savings calculator, automation savings estimator, AI agent ROI, business workflow cost calculator',
    ogType: 'website',
  },
};

export const SEO_CONFIG = {
  domain: 'https://arenova.in',
  siteUrl: 'https://arenova.in',
  brandName: 'ARENOVA',
  companyName: 'ARENOVA Systems Architecture & AI Automation',
  locale: 'en_US',
  language: 'English',
  themeColor: '#f4f6f3',
  title: ROUTE_SEO['/'].title,
  titleTemplate: '%s | ARENOVA',
  description: ROUTE_SEO['/'].description,
  keywords: [
    'AI automation agency',
    'AI automation company',
    'AI agent development company',
    'business process automation agency',
    'AI workflow automation',
    'custom AI development company',
    'AI automation agency India',
    'enterprise AI agents',
    'CRM and ERP synchronization',
    'deterministic AI architecture',
    'Arenova',
  ],
  slogan: 'Deterministic AI systems that scale revenue and automate enterprise operations',
  manifesto: 'Language models interpret. Explicit rules and APIs execute.',
  contactEmail: 'avi@arenova.in',

  openGraph: {
    type: 'website',
    url: 'https://arenova.in/',
    title: ROUTE_SEO['/'].title,
    description: ROUTE_SEO['/'].description,
    siteName: 'ARENOVA',
    images: [
      {
        url: 'https://arenova.in/metadata.png',
        width: 1200,
        height: 630,
        alt: 'ARENOVA — AI Automation Agency & Custom AI Agent Development',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@arenova',
    creator: '@arenova',
    title: ROUTE_SEO['/'].title,
    description: ROUTE_SEO['/'].description,
    image: 'https://arenova.in/metadata.png',
  },

  verification: {
    google: import.meta.env?.VITE_GSC_VERIFICATION || '',
  },

  analytics: {
    ga4MeasurementId: import.meta.env?.VITE_GA4_ID || '',
  },
};
