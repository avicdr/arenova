import { ArrowUpRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

type LegalKind = 'privacy' | 'terms';

interface LegalSection {
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

const privacySections: LegalSection[] = [
  {
    number: '01',
    title: 'Scope & data controller',
    paragraphs: [
      'This Privacy Policy explains how ARENOVA Systems Architecture ("Arenova", "we", "us") collects, uses, and protects information submitted through https://arenova.in/ and direct business communications.',
      'Arenova operates globally from Bengaluru, India. When we build and deploy production automation systems for enterprise clients, data handling is governed separately by our written Master Services Agreement, Mutual NDA, and Data Processing Addendum (DPA).',
    ],
  },
  {
    number: '02',
    title: 'Information you provide',
    paragraphs: [
      'When you submit an automation audit request, send an email, or schedule a discovery call, we collect only the details you choose to share—typically your name, work email address, company name, service interest, and workflow description.',
      'Please do not submit API keys, passwords, payment card details, protected health records, or regulated personal data through public website forms.',
    ],
  },
  {
    number: '03',
    title: 'How we use information',
    paragraphs: [
      'We use inquiry information strictly to operate our business and evaluate potential projects:',
    ],
    bullets: [
      'Respond to your audit request, assess technical feasibility, and prepare a documented scope.',
      'Communicate regarding active engagements, invoicing, and support requests.',
      'Maintain accurate accounting, tax, and compliance records.',
    ],
  },
  {
    number: '04',
    title: 'No data sales or model training',
    paragraphs: [
      'We never sell, rent, or broker your personal or company information to third parties.',
      'Workflow descriptions and proprietary business context shared with Arenova are never used to train third-party foundation AI models.',
    ],
  },
  {
    number: '05',
    title: 'Website measurement & cookies',
    paragraphs: [
      'The website may use privacy-conscious aggregate analytics (such as Google Analytics, where configured) to measure page performance, broken routes, and high-level traffic patterns.',
      'You can restrict or disable cookies and analytics scripts at any time through your browser privacy controls without losing access to any page or interactive tool on this site.',
    ],
  },
  {
    number: '06',
    title: 'Service providers & global transfers',
    paragraphs: [
      'We rely on vetted infrastructure providers for hosting, CDN/security (Cloudflare and GitHub Pages), transactional form delivery, business email, and project tooling. These providers process limited operational data only to deliver their services.',
      'Because Arenova serves clients worldwide from our engineering hub in Bengaluru, inquiry records may be processed internationally subject to appropriate contractual and technical safeguards.',
    ],
  },
  {
    number: '07',
    title: 'Security, retention & your rights',
    paragraphs: [
      'All website traffic is encrypted in transit via HTTPS/TLS, and internal access to client correspondence is restricted on a least-privilege basis. Inquiry records are retained only as long as required for active correspondence, ongoing contracts, or statutory tax and legal obligations.',
      'Depending on your jurisdiction (including India’s Digital Personal Data Protection Act, GDPR, UK GDPR, and US state privacy frameworks such as CCPA/CPRA), you may request access to, correction of, export of, or deletion of your personal inquiry data. Email avi@arenova.in and we will respond within 30 days.',
    ],
  },
];

const termsSections: LegalSection[] = [
  {
    number: '01',
    title: 'Website information',
    paragraphs: [
      'The materials on https://arenova.in/ describe Arenova’s engineering services, technical architecture, and working approach. Content is provided for general informational purposes and does not constitute a binding proposal, performance guarantee, or legal, financial, or compliance advice.',
    ],
  },
  {
    number: '02',
    title: 'Estimates, pricing & calculators',
    paragraphs: [
      'Published pricing tiers, timelines, ROI calculator outputs, and architectural diagrams are starting points and illustrative estimates until a written project scope is confirmed.',
      'Actual delivery schedules and operational savings depend on source data quality, third-party API limits, system complexity, and stakeholder review cadence.',
    ],
  },
  {
    number: '03',
    title: 'Intellectual property',
    paragraphs: [
      'Arenova owns the website design, editorial copy, architecture diagrams, and original published playbooks unless otherwise noted. Third-party product names, logos, and trademarks referenced for integration context remain the property of their respective owners.',
      'Ownership and intellectual property transfer for custom client systems are defined explicitly in your written project agreement.',
    ],
  },
  {
    number: '04',
    title: 'External links & third-party tools',
    paragraphs: [
      'This website links to standalone Arenova products (such as Frontdesk, Menzy, and Outreacher) as well as external software platforms. External websites operate under their own terms and privacy policies, and Arenova does not control third-party availability or content.',
    ],
  },
  {
    number: '05',
    title: 'Paid engagements & governing agreements',
    paragraphs: [
      'All paid engineering retainers and custom automation builds are governed exclusively by a separate written Master Services Agreement and Statement of Work defining scope, fees, confidentiality, intellectual property assignment, data handling, support, and liability.',
    ],
  },
];

export function LegalPage({ kind }: { kind: LegalKind }) {
  const { navigate } = useRouter();
  const privacy = kind === 'privacy';
  const sections = privacy ? privacySections : termsSections;
  const siblingHref = privacy ? '/terms/' : '/privacy/';
  const siblingLabel = privacy ? 'Read Website Terms' : 'Read Privacy Policy';

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Legal & Governance</p>
            <h1>{privacy ? 'Privacy policy.' : 'Website terms.'}</h1>
          </div>
          <div>
            <p>
              Effective November 16, 2026. Arenova Systems Architecture is a founder-led AI engineering company
              operating globally from Bengaluru, India.
            </p>
            <div style={{ marginTop: '20px' }}>
              <a
                href={siblingHref}
                className="text-link"
                onClick={(event) => {
                  event.preventDefault();
                  navigate(siblingHref);
                }}
              >
                {siblingLabel} <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section legal-section" aria-label={privacy ? 'Privacy policy details' : 'Website terms details'}>
        <div className="page-frame">
          <div className="legal-list">
            {sections.map((section) => (
              <article key={section.title}>
                <div className="legal-list__head">
                  <span className="legal-list__index">Section {section.number}</span>
                  <h2>{section.title}</h2>
                </div>
                <div className="legal-list__body">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="legal-contact">
            <div>
              <h3>{privacy ? 'Privacy inquiries & data requests' : 'Contract & compliance questions'}</h3>
              <p>
                {privacy
                  ? 'To request access, correction, or deletion of your inquiry data—or to request our standard Mutual NDA / DPA—contact us directly.'
                  : 'For questions regarding these terms or enterprise Master Services Agreements, contact us directly.'}
              </p>
            </div>
            <a href="mailto:avi@arenova.in" className="button button--primary">
              Email avi@arenova.in <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

LegalPage.displayName = 'LegalPage';
