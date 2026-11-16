import { ArrowUpRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

interface AboutPageProps { onNavigate?: (sectionId: string) => void }

const principles = [
  ['Rules around reasoning', 'Language models interpret unstructured input. Explicit rules, validation, and API permissions govern business-critical actions.'],
  ['Integration before replacement', 'Arenova works with the software a team already relies on, replacing manual handoffs before proposing another system.'],
  ['Observable operations', 'Automations need logs, ownership, error paths, and a way for staff to intervene when reality does not match the happy path.'],
  ['Boundaries by design', 'Approved knowledge, scoped access, and human escalation are part of the workflow—not an afterthought added before launch.'],
];

const products = [
  { name: 'Menzy', type: 'Restaurant AI & QR Menus', description: 'Interactive 3D digital menus, contactless QR ordering, and live kitchen display for modern dining venues.', href: 'https://menzy.arenova.in' },
  { name: 'Arenova Frontdesk', type: 'Voice and WhatsApp', description: 'Handles routine enquiries, booking, approved answers, and staff escalation.', href: 'https://frontdesk.arenova.in' },
  { name: 'Outreacher', type: 'Outbound infrastructure', description: 'Supports managed email outreach and multi-stage sales workflows.', href: 'https://outreacher.arenova.in' },
  { name: 'Arova Intelligence', type: 'Lead intelligence', description: 'Research and enrichment workflows for evidence-backed B2B prospecting.', href: '/#contact' },
];

export const AboutPage = ({ onNavigate }: AboutPageProps) => {
  const { navigate } = useRouter();
  const contact = () => onNavigate ? onNavigate('contact') : navigate('/#contact');

  return (
    <main className="subpage">
      <section className="subpage-hero about-hero">
        <div className="page-frame subpage-hero__grid">
          <div><p className="section-index">About Arenova</p><h1>A small software company for complicated business handoffs.</h1></div>
          <div><p>Arenova designs automation systems for customer enquiries, sales activity, and internal operations. The work combines software integration, applied AI, and explicit operational controls.</p></div>
        </div>
      </section>

      <section className="section about-origin">
        <div className="page-frame about-origin__grid">
          <div><p className="section-index">Why the company exists</p><h2>Most automation problems are coordination problems.</h2></div>
          <div className="long-copy"><p>Teams often have capable software but still rely on people to move information between it: reading an enquiry, checking a spreadsheet, updating a CRM, booking a slot, notifying a colleague, then repeating the same details elsewhere.</p><p>Arenova replaces those handoffs with controlled workflows. The objective is not autonomy for its own sake. It is a system that does routine work consistently and makes exceptions clear to the people responsible.</p></div>
        </div>
      </section>

      <section className="section principles-section" aria-labelledby="principles-title">
        <div className="page-frame">
          <div className="section-heading"><p className="section-index">Engineering principles</p><h2 id="principles-title">How Arenova builds production workflows.</h2></div>
          <div className="principle-grid">{principles.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
        </div>
      </section>

      <section className="section products-section" aria-labelledby="products-title">
        <div className="page-frame products-layout">
          <div className="section-heading"><p className="section-index">Product demonstrations</p><h2 id="products-title">Software Arenova has built.</h2><p>These are Arenova products and engineering demonstrations, not client case studies or customer results.</p></div>
          <div className="product-list">{products.map((product) => <a key={product.name} href={product.href} target={product.href.startsWith('http') ? '_blank' : undefined} rel={product.href.startsWith('http') ? 'noopener noreferrer' : undefined} onClick={product.href.startsWith('/') ? (e) => { e.preventDefault(); navigate(product.href); } : undefined}><span>{product.type}</span><h3>{product.name}</h3><p>{product.description}</p><ArrowUpRight aria-hidden="true" /></a>)}</div>
        </div>
      </section>

      <section className="founder-section"><div className="page-frame founder-grid"><div><p className="section-index">Founder</p><h2>Built by Avi in Bengaluru.</h2></div><div><p>Arenova is founder-led and works with businesses globally. Product decisions, workflow design, and implementation stay close to the technical work.</p><a href="mailto:avi@arenova.in" className="text-link">Email Avi <ArrowUpRight aria-hidden="true" /></a></div></div></section>
      <section className="page-close"><div className="page-frame"><h2>Bring the workflow that keeps breaking.</h2><p>We’ll map the handoffs, define the controls, and decide whether automation is the right fix.</p><button className="button button--primary" onClick={contact}>Request an automation audit <ArrowUpRight aria-hidden="true" /></button></div></section>
    </main>
  );
};

AboutPage.displayName = 'AboutPage';
