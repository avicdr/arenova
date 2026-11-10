/**
 * ARENOVA ECOSYSTEM SEO CONFIGURATION
 *
 * Centralized, production-grade SEO parameters for the Arenova parent domain (https://arenova.in/).
 * Canonical URLs strictly match the GitHub Pages 200 OK trailing-slash endpoints (/, /pricing/, /about/).
 */

export interface EcosystemProduct {
  id: string;
  name: string;
  url: string;
  badge: string;
  tagline: string;
  description: string;
  category: string;
}

export interface ServiceOffering {
  id: string;
  name: string;
  headline: string;
  description: string;
  url: string;
}

export interface RouteSeoMeta {
  routeKey: '/' | '/pricing' | '/about';
  canonicalUrl: string;
  title: string;
  description: string;
  keywords: string;
  ogType: 'website';
}

export const ROUTE_SEO: Record<'/' | '/pricing' | '/about', RouteSeoMeta> = {
  '/': {
    routeKey: '/',
    canonicalUrl: 'https://arenova.in/',
    title: 'ARENOVA | Enterprise AI Automation, Sales Outreach & Autonomous Systems',
    description:
      'Arenova engineers custom AI automation systems for modern businesses: end-to-end business workflow automation, cold outreach engines, and 24/7 AI frontdesk capture.',
    keywords:
      'AI automation agency, business workflow automation, cold outreach automation, AI front desk receptionist, CRM automation, enterprise AI agents, Arenova',
    ogType: 'website',
  },
  '/pricing': {
    routeKey: '/pricing',
    canonicalUrl: 'https://arenova.in/pricing/',
    title: 'ARENOVA Pricing | Enterprise AI Automation & Revenue Systems',
    description:
      'Transparent pricing for enterprise AI automation: Sales & Outreach ($999/mo), Business Automation ($1,999/mo), Autonomous Enterprise ($3,499/mo), and AI Frontdesk ($490/mo).',
    keywords:
      'AI automation pricing, workflow automation cost, cold outreach agency pricing, AI front desk cost, enterprise AI ROI, Arenova pricing',
    ogType: 'website',
  },
  '/about': {
    routeKey: '/about',
    canonicalUrl: 'https://arenova.in/about/',
    title: 'About ARENOVA | Engineering the Autonomous Enterprise',
    description:
      'Discover Arenova’s engineering philosophy: eliminating brittle software duct tape with deterministic AI automation across workflows, outreach, and 24/7 triage.',
    keywords:
      'About Arenova, AI automation agency, systems architecture, deterministic AI, workflow automation engineering, Avi Arenova',
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
  themeColor: '#111110',
  title: ROUTE_SEO['/'].title,
  titleTemplate: '%s | ARENOVA',
  description: ROUTE_SEO['/'].description,
  keywords: [
    'AI automation agency',
    'business workflow automation',
    'sales and outreach automation',
    'AI front desk receptionist',
    'enterprise AI agents',
    'CRM and ERP synchronization',
    'B2B outbound systems',
    'deterministic AI architecture',
    'Arenova',
  ],
  slogan: 'Autonomous systems that scale revenue',
  manifesto: 'RISE BEYOND ROUTINE.',
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
        secureUrl: 'https://arenova.in/metadata.png',
        width: 1200,
        height: 630,
        alt: 'ARENOVA — Autonomous Systems That Scale Revenue',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: ROUTE_SEO['/'].title,
    description: ROUTE_SEO['/'].description,
    image: 'https://arenova.in/metadata.png',
    imageAlt: 'ARENOVA — Autonomous Systems That Scale Revenue',
  },

  robots: {
    index: true,
    follow: true,
    maxImagePreview: 'large',
    maxSnippet: -1,
    maxVideoPreview: -1,
  },

  ecosystem: [
    {
      id: 'frontdesk',
      name: 'Arenova Frontdesk',
      url: 'https://frontdesk.arenova.in',
      badge: 'WHATSAPP RECEPTIONIST',
      tagline: 'AI voice & WhatsApp receptionist and appointment booking for clinics & businesses.',
      description:
        'Automated WhatsApp patient enquiries, triage, instant calendar scheduling, and 24/7 multi-turn client support.',
      category: 'BusinessApplication',
    },
    {
      id: 'arova',
      name: 'Arova Intelligence',
      url: '/#ascent',
      badge: 'LEAD INTELLIGENCE',
      tagline: 'B2B lead intelligence and qualified business leads discovery platform.',
      description:
        'Discover high-intent accounts, verified decision-maker intelligence, deep enrichment, and pipeline discovery.',
      category: 'BusinessApplication',
    },
    {
      id: 'outreacher',
      name: 'Outreacher',
      url: 'https://outreacher.arenova.in',
      badge: 'OUTREACH AUTOMATION',
      tagline: 'Email outreach and multi-stage sales automation engine.',
      description:
        'Deliver personalized cold outreach at scale, dynamic sequences, automated deliverability monitoring, and pipeline tracking.',
      category: 'BusinessApplication',
    },
  ] as EcosystemProduct[],

  services: [
    {
      id: 'business-automation',
      name: 'Business & Workflow Automation',
      headline: 'Eliminate repetitive manual work.',
      description:
        'End-to-end operational pipelines connecting CRMs, ERPs, payment gateways, Slack, and scheduling without manual data re-entry.',
      url: 'https://arenova.in/#services',
    },
    {
      id: 'sales-outreach',
      name: 'Sales & Outreach Automation',
      headline: 'Outbound pipeline on autopilot.',
      description:
        'Dedicated cold outreach infrastructure (15+ warmed domains, SPF/DKIM/DMARC), AI hyper-personalization, lead enrichment, and automated calendar booking.',
      url: 'https://arenova.in/#services',
    },
    {
      id: 'ai-front-desk',
      name: '24/7 AI Front Desk & Receptionist',
      headline: 'Every lead answered in under 15 seconds.',
      description:
        'Voice telephony, WhatsApp, SMS, and web receptionists that greet, qualify, book, and route inquiries 24/7 with zero hallucination.',
      url: 'https://arenova.in/#services',
    },
    {
      id: 'custom-ai-agents',
      name: 'Custom AI Agents',
      headline: 'Intelligence with a purpose.',
      description:
        'Domain-specific autonomous agents trained on proprietary company knowledge, vector databases, and deterministic enterprise SOPs.',
      url: 'https://arenova.in/pricing/',
    },
  ] as ServiceOffering[],

  verification: {
    google: import.meta.env?.VITE_GSC_VERIFICATION || '',
  },

  analytics: {
    ga4MeasurementId: import.meta.env?.VITE_GA4_ID || '',
  },
};
