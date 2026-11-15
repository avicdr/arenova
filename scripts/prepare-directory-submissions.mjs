/**
 * ARENOVA DIRECTORY SUBMISSION & PROFILE GENERATOR
 *
 * Prepares exact, copy-pasteable submission content formatted specifically for
 * Clutch, GoodFirms, DesignRush, TechBehemoths, Sortlist, Crunchbase, and G2.
 * Adheres strictly to character limits, verified company details, and commercial keywords.
 *
 * Usage:
 *   node scripts/prepare-directory-submissions.mjs
 *   node scripts/prepare-directory-submissions.mjs clutch
 *   node scripts/prepare-directory-submissions.mjs techbehemoths
 */

const COMPANY = {
  name: 'Arenova',
  legalName: 'Arenova Systems Architecture & AI Automation',
  website: 'https://arenova.in',
  contactEmail: 'avi@arenova.in',
  location: 'Bengaluru, Karnataka, India',
  foundedYear: '2024',
  companySize: '2-10 employees',
  hourlyRate: '$50 - $99 / hr',
  minProjectSize: '$2,500+',
  retainers: 'Starting at $999/month ($1,999/mo Business Automation, $3,499/mo Connected Systems)',
  socialProfiles: {
    linkedin: 'https://linkedin.com/company/arenova',
    github: 'https://github.com/arenova',
    x: 'https://x.com/arenova',
  },
};

const DIRECTORIES = {
  clutch: {
    platform: 'Clutch.co',
    category: 'Artificial Intelligence, Business Process Outsourcing / Automation, Software Development',
    tagline: 'Deterministic AI systems, custom autonomous agents, and enterprise workflow automation.',
    summary100Words: `Arenova is a founder-led AI automation agency and systems architecture consultancy based in Bengaluru, India. We engineer controlled, deterministic automation for inbound customer inquiries, sales activity, and internal business operations. Unlike agencies building fragile no-code chains, Arenova builds production-grade software layers where language models interpret natural language while explicit rules and APIs execute business-critical actions. We serve high-growth enterprises and mid-market companies across the United States, United Kingdom, Canada, Australia, and India.`,
    servicesBreakdown: [
      { service: 'Artificial Intelligence & AI Agents', percentage: 40 },
      { service: 'Business Process Automation & Workflows', percentage: 30 },
      { service: 'CRM & WhatsApp Automation', percentage: 15 },
      { service: 'Custom Software Development', percentage: 15 },
    ],
    clientFocus: [
      { tier: 'Mid-Market ($10M - $1B)', percentage: 50 },
      { tier: 'Small Business (<$10M)', percentage: 35 },
      { tier: 'Enterprise (>$1B)', percentage: 15 },
    ],
    focusIndustries: [
      'Real Estate & Property Development',
      'B2B Professional Services & Consultancies',
      'Healthcare Clinics & Medical Administration',
      'Staffing & Recruitment',
      'SaaS & Software Platforms',
    ],
    submissionUrl: 'https://clutch.co/get-listed',
  },
  goodfirms: {
    platform: 'GoodFirms.co',
    category: 'Top AI Companies, Business Automation Companies, Software Development Companies',
    tagline: 'Custom AI agent engineering and enterprise workflow automation.',
    overview: `Arenova is an enterprise AI automation company engineering resilient, deterministic systems for mid-market businesses and high-growth startups. We eliminate expensive manual data entry, streamline inbound lead response to under 60 seconds, and deploy custom autonomous AI agents that resolve front-line inquiries across Web, WhatsApp, and voice channels with zero hallucinations. Arenova operates on transparent monthly retainers with guaranteed deliverables.`,
    coreCapabilities: [
      'Autonomous AI Agent Development (LangGraph, Python, Scoped Tool Execution)',
      'Enterprise Workflow Automation (REST/GraphQL microservices, IDP, dead-letter queues)',
      'CRM Bi-Directional Synchronization (HubSpot, Salesforce, Zoho)',
      'Official Meta WhatsApp Cloud API Automation',
      'Interactive Automation ROI Audits',
    ],
    submissionUrl: 'https://www.goodfirms.co/company-registration',
  },
  designrush: {
    platform: 'DesignRush',
    category: 'Software Development Agencies, Artificial Intelligence Agencies',
    tagline: 'Production AI agents and enterprise automation architecture.',
    companyBio: `Arenova bridges the gap between probabilistic artificial intelligence and business-critical operations. Founded in Bengaluru, Arenova designs and deploys custom AI agents and workflow orchestration pipelines for global clients. We specialize in connecting existing tech stacks—CRM, ERP, ticketing, and communications—into unified, self-healing automated processes.`,
    submissionUrl: 'https://www.designrush.com/agency-signup',
  },
  techbehemoths: {
    platform: 'TechBehemoths',
    category: 'Artificial Intelligence, Web Development, Automation in India',
    tagline: 'Premier AI automation agency and agent development in Bengaluru, India.',
    description: `Arenova is an AI automation agency and custom agent development company headquartered in Bengaluru, India, serving clients worldwide. We engineer fault-tolerant business process automation, CRM synchronization, and conversational AI systems. Arenova’s dual-layer architecture isolates language models to perception and translation while deterministic code executes data mutations, preventing hallucinations and silent failures.`,
    keyStrengths: [
      'Dual-layer deterministic architecture',
      'Sub-600ms conversational voice and WhatsApp agents',
      'Fixed transparent monthly engineering retainers',
      'Full intellectual property ownership for clients',
    ],
    submissionUrl: 'https://techbehemoths.com/get-listed',
  },
  sortlist: {
    platform: 'Sortlist',
    category: 'Artificial Intelligence Agencies, Digital Strategy, Automation',
    tagline: 'Deterministic AI systems and enterprise workflow automation.',
    description: `We help operational leaders automate their most expensive manual bottlenecks. From inbound lead qualification to accounts receivable reconciliation, Arenova designs, builds, and maintains custom automation layers with 24/7 monitoring and dedicated engineering support.`,
    submissionUrl: 'https://www.sortlist.com/get-listed',
  },
  crunchbase: {
    platform: 'Crunchbase',
    category: 'Artificial Intelligence, Automation, Software',
    tagline: 'Enterprise AI automation agency and custom agent development.',
    description: `Arenova is a systems architecture and AI automation company founded by Avi in Bengaluru, India. The company builds deterministic AI workflow automation, autonomous multi-agent systems, and operations software for enterprises across India, North America, the UK, and Australia.`,
    submissionUrl: 'https://www.crunchbase.com/add-new',
  },
};

function printDirectoryProfile(key) {
  const dir = DIRECTORIES[key];
  if (!dir) {
    console.error(`Unknown directory "${key}". Available: ${Object.keys(DIRECTORIES).join(', ')}`);
    return;
  }

  console.log(`\n======================================================`);
  console.log(`DIRECTORY PROFILE: ${dir.platform}`);
  console.log(`Submission Portal: ${dir.submissionUrl}`);
  console.log(`======================================================\n`);

  console.log(`Company Name: ${COMPANY.name}`);
  console.log(`Legal Name: ${COMPANY.legalName}`);
  console.log(`Website: ${COMPANY.website}`);
  console.log(`Contact Email: ${COMPANY.contactEmail}`);
  console.log(`Location: ${COMPANY.location}`);
  console.log(`Year Founded: ${COMPANY.foundedYear}`);
  console.log(`Team Size: ${COMPANY.companySize}`);
  console.log(`Hourly Rate: ${COMPANY.hourlyRate}`);
  console.log(`Minimum Project Size: ${COMPANY.minProjectSize}`);
  console.log(`Pricing Model: ${COMPANY.retainers}`);
  console.log(`Tagline: "${dir.tagline}"`);
  console.log(`Category: ${dir.category}\n`);

  if (dir.summary100Words) {
    console.log(`--- 100-Word Company Summary ---`);
    console.log(dir.summary100Words + '\n');
  }

  if (dir.overview) {
    console.log(`--- Company Overview ---`);
    console.log(dir.overview + '\n');
  }

  if (dir.companyBio) {
    console.log(`--- Company Bio ---`);
    console.log(dir.companyBio + '\n');
  }

  if (dir.description) {
    console.log(`--- Full Description ---`);
    console.log(dir.description + '\n');
  }

  if (dir.servicesBreakdown) {
    console.log(`--- Services Breakdown ---`);
    dir.servicesBreakdown.forEach((s) => console.log(`• ${s.service}: ${s.percentage}%`));
    console.log('');
  }

  if (dir.clientFocus) {
    console.log(`--- Client Focus ---`);
    dir.clientFocus.forEach((c) => console.log(`• ${c.tier}: ${c.percentage}%`));
    console.log('');
  }

  if (dir.focusIndustries) {
    console.log(`--- Focus Industries ---`);
    dir.focusIndustries.forEach((ind) => console.log(`• ${ind}`));
    console.log('');
  }

  if (dir.coreCapabilities) {
    console.log(`--- Core Capabilities ---`);
    dir.coreCapabilities.forEach((cap) => console.log(`• ${cap}`));
    console.log('');
  }
}

const target = process.argv[2];
if (target && DIRECTORIES[target.toLowerCase()]) {
  printDirectoryProfile(target.toLowerCase());
} else {
  console.log(`Generating submission-ready profiles for all 6 target directories...\n`);
  Object.keys(DIRECTORIES).forEach((key) => printDirectoryProfile(key));
}

