import { ArrowUpRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

const useCases = [
  {
    title: 'Clinics and medical practices',
    slug: '/industries/healthcare/',
    body: 'Administrative enquiry handling, appointment booking, reminders, intake routing, and human escalation. Clinical decisions remain with qualified medical staff.',
  },
  {
    title: 'B2B services, consultancies & agencies',
    slug: '/industries/b2b-services/',
    body: 'Research accounts, enrich decision-makers, trigger onboarding checklists, reconcile retainer hours, and eliminate manual spreadsheet glue.',
  },
  {
    title: 'Real estate agencies & developers',
    slug: '/industries/real-estate/',
    body: '24/7 WhatsApp and phone lead qualification, property showing booking, MLS CRM synchronization, and post-viewing feedback capture.',
  },
];

export function IndustriesSection() {
  const { navigate } = useRouter();

  return (
    <section id="use-cases" className="section use-cases" aria-labelledby="use-cases-title">
      <div className="page-frame use-cases__grid">
        <div className="section-heading">
          <p className="section-index">Industry Solutions</p>
          <h2 id="use-cases-title">Workflows with high volume, strict rules, and expensive delays.</h2>
          <p>
            Arenova is a practical fit when the same handoff happens dozens of times a week, touches several tools, and needs
            an explicit human exception path.
          </p>
        </div>
        <div className="use-case-list">
          {useCases.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <a
                href={item.slug}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.slug);
                }}
                className="text-link"
                style={{ marginTop: '12px', fontSize: '0.85rem' }}
              >
                View industry workflows <ArrowUpRight aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
