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
  | '/us'
  | '/privacy'
  | '/terms'
  | '/services/ai-automation'
  | '/services/ai-integration'
  | '/services/ai-agents'
  | '/services/business-process-automation'
  | '/services/ai-workflow-automation'
  | '/services/crm-automation'
  | '/services/custom-ai-development'
  | '/services/ai-chatbot-development'
  | '/services/ai-voice-agents'
  | '/services/whatsapp-automation'
  | '/services/ai-customer-support'
  | '/services/ai-sales-automation'
  | '/industries/real-estate'
  | '/industries/b2b-services'
  | '/industries/healthcare'
  | '/industries/recruitment'
  | '/industries/marketing-agencies'
  | '/industries/saas'
  | '/tools/automation-roi-calculator'
  | '/blog'
  | '/blog/deterministic-ai-playbook'
  | '/blog/ai-agents-vs-chatbots'
  | '/blog/calculating-automation-roi'
  | '/blog/ai-automation-cost'
  | '/blog/ai-agent-evaluation-checklist'
  | '/blog/n8n-vs-custom-code'
  | '/blog/ai-crm-integration-guide'
  | '/blog/how-to-choose-ai-automation-agency';

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
  '/us': {
    routeKey: '/us',
    canonicalUrl: 'https://arenova.in/us/',
    title: 'AI Automation Agency for US Businesses | Arenova',
    description:
      'Arenova designs AI agents, workflow automation, and system integrations for US businesses, with remote delivery, documented controls, and human approval gates.',
    keywords:
      'AI automation agency USA, AI automation services US, AI workflow automation company, custom AI agents for US businesses, remote AI development agency',
    ogType: 'website',
  },
  '/privacy': {
    routeKey: '/privacy',
    canonicalUrl: 'https://arenova.in/privacy/',
    title: 'Privacy Policy | Arenova',
    description: 'How Arenova handles website inquiries, project information, analytics data, and data-subject requests.',
    keywords: 'Arenova privacy policy, website privacy, project data handling',
    ogType: 'website',
  },
  '/terms': {
    routeKey: '/terms',
    canonicalUrl: 'https://arenova.in/terms/',
    title: 'Website Terms | Arenova',
    description: 'Terms governing use of the Arenova website, published resources, estimates, and project inquiries.',
    keywords: 'Arenova website terms, service information terms',
    ogType: 'website',
  },
  '/services/ai-automation': {
    routeKey: '/services/ai-automation',
    canonicalUrl: 'https://arenova.in/services/ai-automation/',
    title: 'AI Automation Agency for Business Workflows | Arenova',
    description:
      'Arenova builds controlled AI automation for lead handling, customer operations, documents, and internal workflows, with validation and human approval gates.',
    keywords:
      'AI automation agency, AI automation company, AI automation services, AI automation agency India, enterprise AI automation, business automation agency, intelligent workflow automation',
    ogType: 'website',
  },
  '/services/ai-integration': {
    routeKey: '/services/ai-integration',
    canonicalUrl: 'https://arenova.in/services/ai-integration/',
    title: 'AI Integration Services for CRM, Support & Operations | Arenova',
    description:
      'Connect AI models to your CRM, help desk, documents, databases, and internal tools through secure APIs, validation rules, logs, and human review.',
    keywords:
      'AI integration services, AI systems integration company, CRM AI integration, generative AI integration services, LLM integration consulting',
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
  '/services/ai-chatbot-development': {
    routeKey: '/services/ai-chatbot-development',
    canonicalUrl: 'https://arenova.in/services/ai-chatbot-development/',
    title: 'AI Chatbot Development Company | Enterprise Conversational AI | Arenova',
    description:
      'Custom AI chatbot development company. We build intelligent, knowledge-grounded chatbots for customer support deflection, lead capture, and internal knowledge search.',
    keywords:
      'AI chatbot development company, custom AI chatbot development, enterprise AI chatbots, conversational AI agency, customer support chatbot development, LLM chatbot agency',
    ogType: 'website',
  },
  '/services/ai-voice-agents': {
    routeKey: '/services/ai-voice-agents',
    canonicalUrl: 'https://arenova.in/services/ai-voice-agents/',
    title: 'AI Voice Agent Development Company | Telephony & Voice AI | Arenova',
    description:
      'Engineered AI voice agents for enterprise phone systems. Sub-600ms latency, natural conversation flow, automated appointment scheduling, and CRM voice logging.',
    keywords:
      'AI voice agent development, voice AI agents for business, conversational voice AI company, inbound call automation AI, outbound voice scheduling, Twilio voice AI',
    ogType: 'website',
  },
  '/services/whatsapp-automation': {
    routeKey: '/services/whatsapp-automation',
    canonicalUrl: 'https://arenova.in/services/whatsapp-automation/',
    title: 'WhatsApp AI Automation Services | Official Cloud API Systems | Arenova',
    description:
      'Enterprise WhatsApp AI automation services built on official Meta Cloud API. 24/7 automated inquiry triage, catalog browsing, appointment booking, and CRM sync.',
    keywords:
      'WhatsApp AI automation, WhatsApp automation services, WhatsApp business API automation, WhatsApp customer support bot, WhatsApp CRM automation, Meta cloud API agency',
    ogType: 'website',
  },
  '/services/ai-customer-support': {
    routeKey: '/services/ai-customer-support',
    canonicalUrl: 'https://arenova.in/services/ai-customer-support/',
    title: 'AI Customer Support Automation | Autonomous Helpdesk Triage | Arenova',
    description:
      'Automate customer support triage and draft responses with grounded knowledge, help-desk integrations, policy checks, and human escalation for sensitive cases.',
    keywords:
      'AI customer support automation, customer service automation company, automated ticketing resolution, support ticket deflection AI, Zendesk AI automation, helpdesk AI',
    ogType: 'website',
  },
  '/services/ai-sales-automation': {
    routeKey: '/services/ai-sales-automation',
    canonicalUrl: 'https://arenova.in/services/ai-sales-automation/',
    title: 'AI Sales Automation Agency | Inbound Speed-to-Lead & Outreach | Arenova',
    description:
      'AI sales automation agency engineering sub-60-second inbound speed-to-lead, waterfall prospect enrichment, customized email sequences, and automated pipeline updates.',
    keywords:
      'AI sales automation agency, AI lead generation automation, automated sales pipeline, speed to lead automation, B2B sales automation company, inbound qualification AI',
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
  '/industries/recruitment': {
    routeKey: '/industries/recruitment',
    canonicalUrl: 'https://arenova.in/industries/recruitment/',
    title: 'AI Automation for Recruitment & Staffing Agencies | Arenova',
    description:
      'Automate recruitment workflows: resume parsing against role rubrics, WhatsApp candidate pre-screening, automated interview scheduling, and bidirectional ATS sync.',
    keywords:
      'AI automation for recruitment, staffing automation company, automated candidate screening, ATS automation, recruitment agency AI workflows, Greenhouse automation',
    ogType: 'website',
  },
  '/industries/marketing-agencies': {
    routeKey: '/industries/marketing-agencies',
    canonicalUrl: 'https://arenova.in/industries/marketing-agencies/',
    title: 'AI Automation for Marketing Agencies | Client Reporting & Ops | Arenova',
    description:
      'Automate marketing agency operations: multi-platform client reporting aggregation (GA4, Meta, Google Ads), intake-to-Slack onboarding, and content QA pipelines.',
    keywords:
      'AI automation for marketing agencies, agency operations automation, automated client reporting, marketing workflow automation, client onboarding automation agency',
    ogType: 'website',
  },
  '/industries/saas': {
    routeKey: '/industries/saas',
    canonicalUrl: 'https://arenova.in/industries/saas/',
    title: 'AI Automation for B2B SaaS Companies | Churn Alerts & Onboarding | Arenova',
    description:
      'Automate B2B SaaS operations: product telemetry churn warning triggers, automated guided onboarding, bug report reproduction extraction, and billing dispute triage.',
    keywords:
      'AI automation for SaaS, SaaS operations automation, product churn alert automation, SaaS user onboarding automation, SaaS customer support AI',
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
  '/blog': {
    routeKey: '/blog',
    canonicalUrl: 'https://arenova.in/blog/',
    title: 'Engineering Blog & Technical Playbooks | Arenova',
    description:
      'In-depth technical guides, systems architecture playbooks, and business automation frameworks written by the engineers at Arenova.',
    keywords:
      'AI automation blog, systems architecture guides, enterprise AI playbooks, business process automation engineering, autonomous agent architecture',
    ogType: 'website',
  },
  '/blog/deterministic-ai-playbook': {
    routeKey: '/blog/deterministic-ai-playbook',
    canonicalUrl: 'https://arenova.in/blog/deterministic-ai-playbook/',
    title: 'The Deterministic AI Playbook for Reliable Workflows | Arenova',
    description:
      'Why prompt-only automations fail at scale and how to build dual-layer deterministic automation architectures with strict schemas and dead-letter queues.',
    keywords:
      'deterministic AI, why zapier breaks at scale, enterprise workflow automation architecture, LLM validation schemas, fault tolerant automation',
    ogType: 'article',
  },
  '/blog/ai-agents-vs-chatbots': {
    routeKey: '/blog/ai-agents-vs-chatbots',
    canonicalUrl: 'https://arenova.in/blog/ai-agents-vs-chatbots/',
    title: 'Autonomous AI Agents vs Traditional Chatbots: Production Architecture Guide | Arenova',
    description:
      'The definitive engineering comparison between rule-based chatbots and autonomous AI agents: memory management, tool execution schemas, and multi-step planning.',
    keywords:
      'AI agents vs chatbots, autonomous AI agent architecture, tool execution LLM, multi-agent orchestration, enterprise conversational AI',
    ogType: 'article',
  },
  '/blog/calculating-automation-roi': {
    routeKey: '/blog/calculating-automation-roi',
    canonicalUrl: 'https://arenova.in/blog/calculating-automation-roi/',
    title: 'How to Calculate Business Process Automation ROI (With Real Math) | Arenova',
    description:
      'A practical mathematical framework for calculating business automation ROI: labor cost reclamation, error reduction, maintenance budgets, and payback velocity.',
    keywords:
      'calculating automation ROI, business process automation return on investment, automation cost formula, operational efficiency metrics',
    ogType: 'article',
  },
  '/blog/ai-automation-cost': {
    routeKey: '/blog/ai-automation-cost',
    canonicalUrl: 'https://arenova.in/blog/ai-automation-cost/',
    title: 'AI Automation Cost: Scope, Pricing Drivers & Budget | Arenova',
    description: 'A practical guide to AI automation cost, including workflow scope, integrations, testing, model usage, maintenance, and the questions to price first.',
    keywords: 'AI automation cost, AI automation pricing, cost to automate a business process, AI workflow budget',
    ogType: 'article',
  },
  '/blog/ai-agent-evaluation-checklist': {
    routeKey: '/blog/ai-agent-evaluation-checklist',
    canonicalUrl: 'https://arenova.in/blog/ai-agent-evaluation-checklist/',
    title: 'AI Agent Evaluation Checklist for Business Workflows | Arenova',
    description: 'Evaluate an AI agent before production with test cases for permissions, source grounding, tool failures, escalation, logging, and rollback.',
    keywords: 'AI agent evaluation checklist, AI agent testing, AI agent production readiness, agentic AI evaluation',
    ogType: 'article',
  },
  '/blog/n8n-vs-custom-code': {
    routeKey: '/blog/n8n-vs-custom-code',
    canonicalUrl: 'https://arenova.in/blog/n8n-vs-custom-code/',
    title: 'n8n vs Custom Code for Production Automation | Arenova',
    description: 'Choose between n8n and custom code by comparing workflow complexity, failure handling, security, maintainability, volume, and ownership.',
    keywords: 'n8n vs custom code, n8n for production, workflow automation platform vs custom software',
    ogType: 'article',
  },
  '/blog/ai-crm-integration-guide': {
    routeKey: '/blog/ai-crm-integration-guide',
    canonicalUrl: 'https://arenova.in/blog/ai-crm-integration-guide/',
    title: 'How to Integrate AI With a CRM Safely | Arenova',
    description: 'A technical guide to CRM AI integration covering identity, permissions, duplicate handling, validation, approval gates, and audit logs.',
    keywords: 'CRM AI integration, integrate AI with CRM, HubSpot AI integration, Salesforce AI workflow',
    ogType: 'article',
  },
  '/blog/how-to-choose-ai-automation-agency': {
    routeKey: '/blog/how-to-choose-ai-automation-agency',
    canonicalUrl: 'https://arenova.in/blog/how-to-choose-ai-automation-agency/',
    title: 'How to Choose an AI Automation Agency | Buyer Checklist | Arenova',
    description: 'A buyer checklist for evaluating an AI automation agency: workflow fit, proof, security, testing, ownership, support, pricing, and exit terms.',
    keywords: 'how to choose an AI automation agency, AI automation agency checklist, hire AI automation company',
    ogType: 'article',
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
