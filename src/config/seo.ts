/**
 * ARENOVA ECOSYSTEM SEO CONFIGURATION
 * 
 * Centralized, production-grade SEO parameters for the Arenova parent domain (https://arenova.in).
 * All metadata, canonical policies, Schema.org entities, and ecosystem links are configured here.
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

export const SEO_CONFIG = {
  domain: 'https://arenova.in',
  siteUrl: 'https://arenova.in',
  brandName: 'ARENOVA',
  companyName: 'ARENOVA Systems Architecture & AI Automation',
  locale: 'en_US',
  language: 'English',
  themeColor: '#111110',
  title: 'ARENOVA | Enterprise AI Automation, Meta & Google Ads, and Lead Generation Systems',
  titleTemplate: '%s | ARENOVA',
  description:
    'Arenova builds high-converting marketing engines (Meta Ads & Google Ads) paired with 24/7 AI front desk automation and autonomous operations to capture qualified leads and scale enterprise revenue.',
  keywords: [
    'AI automation agency',
    'Meta ads agency',
    'Google ads management',
    'lead generation agency',
    'AI front desk',
    'conversion rate optimization',
    'performance marketing',
    'B2B lead generation',
    'paid social ads',
    'enterprise AI agents',
    'Arenova',
  ],
  slogan: 'Transform the way your business works',
  manifesto: 'RISE BEYOND ROUTINE.',
  contactEmail: 'avi@arenova.in',
  
  openGraph: {
    type: 'website',
    url: 'https://arenova.in/',
    title: 'ARENOVA | Enterprise AI Automation, Meta & Google Ads, and Lead Generation Systems',
    description:
      'Turn ad spend into closed revenue. High-converting Meta & Google Ads, 24/7 AI front desk agents, workflow automation, and digital growth engines.',
    siteName: 'ARENOVA',
    images: [
      {
        url: 'https://arenova.in/metadata.png',
        secureUrl: 'https://arenova.in/metadata.png',
        width: 2912,
        height: 1440,
        alt: 'ARENOVA — Transform The Way Your Business Works',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ARENOVA | AI Automation, Meta & Google Ads, and Lead Generation',
    description:
      'Turn ad spend into closed revenue. High-converting Meta & Google Ads, 24/7 AI front desk agents, workflow automation, and digital growth engines.',
    image: 'https://arenova.in/metadata.png',
    imageAlt: 'ARENOVA — Transform The Way Your Business Works',
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
      tagline: 'AI WhatsApp receptionist and appointment booking for clinics & businesses.',
      description:
        'Automated WhatsApp patient enquiries, triage, instant calendar scheduling, and 24/7 multi-turn clinic support.',
      category: 'BusinessApplication',
    },
    {
      id: 'arova',
      name: 'Arova',
      url: 'https://arova.arenova.in',
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
      id: 'ai-front-desk',
      name: 'AI Front Desk Agents',
      headline: 'Every enquiry deserves an answer.',
      description:
        '24/7 voice and chat agents that greet, qualify, book, and route inquiries across phone, web chat, SMS, and WhatsApp with zero hallucination.',
      url: 'https://arenova.in/#services',
    },
    {
      id: 'workflow-automation',
      name: 'Workflow Automation',
      headline: 'Let the work move itself.',
      description:
        'End-to-end operational pipelines connecting CRMs, payment gateways, scheduling, and fulfillment without manual data re-entry.',
      url: 'https://arenova.in/#services',
    },
    {
      id: 'custom-ai-agents',
      name: 'Custom AI Agents',
      headline: 'Intelligence with a purpose.',
      description:
        'Domain-specific autonomous agents trained on proprietary company knowledge, vector databases, and enterprise SOPs.',
      url: 'https://arenova.in/#services',
    },
    {
      id: 'performance-marketing',
      name: 'Performance Marketing & Revenue Engines',
      headline: 'Engineered to capture. Trained to convert.',
      description:
        'High-converting Meta Ads and Google Ads paired with conversion-engineered funnels and <15 second lead follow-up.',
      url: 'https://arenova.in/#marketing',
    },
    {
      id: 'web-experiences',
      name: 'Conversion-Engineered Web Experiences',
      headline: 'Cinematic digital flagships.',
      description:
        'High-speed, cinematic, high-converting digital platforms engineered for enterprise credibility and maximum commercial capture.',
      url: 'https://arenova.in/#services',
    },
  ] as ServiceOffering[],

  verification: {
    google: import.meta.env?.VITE_GSC_VERIFICATION || '',
  },

  analytics: {
    ga4MeasurementId: import.meta.env?.VITE_GA4_ID || '',
  },
};

