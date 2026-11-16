import { ArrowUpRight } from 'lucide-react';
import type { CanonicalRouteKey } from '../../config/seo';
import { useRouter } from '../../context/RouterContext';

type GuideRoute = Extract<CanonicalRouteKey,
  | '/blog/ai-automation-cost'
  | '/blog/ai-agent-evaluation-checklist'
  | '/blog/n8n-vs-custom-code'
  | '/blog/ai-crm-integration-guide'
  | '/blog/how-to-choose-ai-automation-agency'>;

interface Guide {
  kicker: string;
  title: string;
  intro: string;
  answer: string;
  sections: Array<{ title: string; body: string; points: string[] }>;
  relatedHref: string;
  relatedLabel: string;
}

const guides: Record<GuideRoute, Guide> = {
  '/blog/ai-automation-cost': {
    kicker: 'AI automation planning',
    title: 'AI automation cost: what changes the budget.',
    intro: 'The cost of an AI automation project is driven less by the model than by the workflow boundary: systems, permissions, exceptions, testing, and ownership after launch.',
    answer: 'A useful estimate starts with one workflow and its operating constraints. Count the integrations, decision branches, data sensitivity, exception volume, and support requirement before comparing vendor prices.',
    sections: [
      { title: 'Price the workflow boundary', body: 'A form-to-spreadsheet flow and an agent that reads email, updates a CRM, creates a quote, and requests approval are different products. Document the trigger, final action, systems touched, and people responsible for exceptions.', points: ['Number and quality of APIs', 'Read, draft, and write permissions', 'Expected event volume', 'Required review and audit trail'] },
      { title: 'Budget for failure handling', body: 'Production work includes duplicate events, malformed input, expired credentials, API rate limits, model uncertainty, and downstream outages. A quote that excludes these cases is pricing a demonstration, not an operating system.', points: ['Retries and dead-letter handling', 'Idempotency and duplicate protection', 'Alerts and exception queues', 'Rollback and recovery procedures'] },
      { title: 'Separate build and run costs', body: 'Implementation covers discovery, engineering, testing, and launch. Running costs include hosting, model and messaging usage, monitoring, maintenance, and changes to third-party APIs. Ask for both views.', points: ['One-time implementation', 'Variable usage charges', 'Maintenance ownership', 'Change-request assumptions'] },
    ],
    relatedHref: '/pricing/', relatedLabel: 'Review Arenova pricing and scope',
  },
  '/blog/ai-agent-evaluation-checklist': {
    kicker: 'Production readiness',
    title: 'AI agent evaluation checklist for business workflows.',
    intro: 'A fluent demo does not prove that an agent can operate safely. Production evaluation must test the tools, permissions, source data, failure paths, and human handoffs around the model.',
    answer: 'Evaluate an agent against representative tasks and adversarial cases. A release candidate should fail predictably, preserve an audit trail, and refuse actions outside its permissions.',
    sections: [
      { title: 'Test the task, not the conversation', body: 'Define pass or fail from the business result: the right record found, the correct fields proposed, the required approval requested, and no action taken beyond scope.', points: ['Golden task set from real workflows', 'Required and forbidden actions', 'Field-level accuracy checks', 'Repeat runs for variable output'] },
      { title: 'Break every dependency', body: 'Disable a tool, return a malformed payload, expire a credential, slow the API, and remove a required source document. The agent should surface the limitation instead of inventing a path forward.', points: ['Tool timeout and rate limit', 'Missing or conflicting source data', 'Invalid structured output', 'Unavailable reviewer'] },
      { title: 'Verify operational control', body: 'A production agent needs ownership beyond launch. Confirm who receives exceptions, how a bad release is stopped, what is logged, and how permissions are reviewed.', points: ['Human escalation queue', 'Kill switch and rollback', 'Decision and tool-call logs', 'Scheduled access review'] },
    ],
    relatedHref: '/services/ai-agents/', relatedLabel: 'See custom AI agent development',
  },
  '/blog/n8n-vs-custom-code': {
    kicker: 'Architecture decision',
    title: 'n8n vs custom code for production automation.',
    intro: 'n8n is useful when a workflow is visible, connector-driven, and easy to operate. Custom code becomes valuable when rules, throughput, testing, or failure recovery exceed what a visual workflow can express cleanly.',
    answer: 'Choose the simplest system your team can operate reliably. Use n8n for bounded orchestration; introduce custom services only where complexity, security, or scale creates a clear reason.',
    sections: [
      { title: 'Where n8n fits', body: 'Visual orchestration is strong for scheduled syncs, notifications, approval requests, and API flows with a manageable number of branches. It also makes the process easier for non-developers to inspect.', points: ['Stable connectors', 'Moderate event volume', 'Simple retries', 'Operations team ownership'] },
      { title: 'Where custom code fits', body: 'Code is easier to test and reason about when workflows require complex state, strict transactions, high volume, custom authentication, or reusable business rules shared across channels.', points: ['Transactional writes', 'Complex state machines', 'High-volume queues', 'Custom security boundaries'] },
      { title: 'Use a hybrid boundary', body: 'Many production systems use n8n for visible orchestration and a small custom service for the hard part: validation, identity resolution, pricing rules, or idempotent writes. The boundary should be explicit.', points: ['Keep business rules in one place', 'Return typed success and error states', 'Log a shared correlation ID', 'Document who owns each layer'] },
    ],
    relatedHref: '/services/ai-workflow-automation/', relatedLabel: 'See AI workflow automation',
  },
  '/blog/ai-crm-integration-guide': {
    kicker: 'CRM integration',
    title: 'How to integrate AI with a CRM safely.',
    intro: 'The main risk in CRM automation is not a bad sentence. It is a plausible model output changing the wrong account, duplicating a contact, or advancing a deal without the evidence your team expects.',
    answer: 'Treat the model as an interpreter and the CRM integration as controlled software. Resolve identity, validate every proposed field, and require approval for commitments or irreversible changes.',
    sections: [
      { title: 'Resolve the record first', body: 'Match on stable identifiers before names. When identity is ambiguous, return candidates for review instead of selecting the first similar company or contact.', points: ['CRM record ID where available', 'Normalized email and domain', 'Duplicate-candidate handling', 'No automatic merge without policy'] },
      { title: 'Split read, draft, and write', body: 'Most useful AI work can begin in draft mode. The system can summarize a call, propose fields, and prepare a follow-up while a person approves the changes that affect pipeline or customer commitments.', points: ['Read approved context', 'Draft proposed changes', 'Validate fields and enums', 'Write only after policy checks'] },
      { title: 'Make changes traceable', body: 'Every mutation should record the source event, old value, proposed value, rule or reviewer that authorized it, and the downstream response. This turns debugging into a record review instead of guesswork.', points: ['Correlation ID', 'Before-and-after values', 'Authorization source', 'Retry and rollback status'] },
    ],
    relatedHref: '/services/crm-automation/', relatedLabel: 'See CRM automation services',
  },
  '/blog/how-to-choose-ai-automation-agency': {
    kicker: 'Buyer checklist',
    title: 'How to choose an AI automation agency.',
    intro: 'A credible agency should be able to explain the workflow, failure modes, permissions, testing, ownership, and support model before selling a broad transformation program.',
    answer: 'Choose the team that can define a small production boundary, show how it will be tested, state what remains human, and give you clear ownership and exit terms.',
    sections: [
      { title: 'Ask for workflow proof', body: 'A portfolio screenshot proves very little. Ask for an architecture, test plan, redacted log, demo environment, or code sample that shows how the team handles the kind of system you need.', points: ['Relevant artifact, not only a logo', 'Visible exception path', 'Named system boundary', 'Clear statement of what is not automated'] },
      { title: 'Inspect the operating model', body: 'Clarify who owns credentials, hosting, monitoring, incident response, and changes after launch. Confirm whether the code and documentation remain usable if the engagement ends.', points: ['Account and credential ownership', 'Source-code and IP terms', 'Documentation and handover', 'Support response and exclusions'] },
      { title: 'Compare scope, not headlines', body: 'A lower quote may exclude data cleanup, testing, monitoring, or maintenance. Ask each vendor to price the same workflow and list assumptions, third-party fees, and client responsibilities.', points: ['Same acceptance criteria', 'Included integrations', 'Usage and hosting costs', 'Change and cancellation terms'] },
    ],
    relatedHref: '/us/', relatedLabel: 'Review Arenova’s US delivery model',
  },
};

export function UsSeoGuidePage({ routeKey, onNavigate }: { routeKey: GuideRoute; onNavigate?: (sectionId: string) => void }) {
  const guide = guides[routeKey];
  const { navigate } = useRouter();
  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));
  return (
    <main className="subpage">
      <article>
        <header className="subpage-hero"><div className="page-frame subpage-hero__grid"><div><p className="section-index">{guide.kicker}</p><h1>{guide.title}</h1></div><div><p>{guide.intro}</p><p style={{ marginTop: 20 }}><strong>Short answer:</strong> {guide.answer}</p></div></div></header>
        {guide.sections.map((section, index) => (
          <section className={index % 2 ? 'section section--ink' : 'section'} key={section.title}>
            <div className="page-frame"><div className="section-heading"><p className="section-index">{index + 1} of {guide.sections.length}</p><h2>{section.title}</h2><p style={index % 2 ? { color: 'var(--inverse-muted)' } : undefined}>{section.body}</p></div><ul className="detail-list">{section.points.map((point) => <li key={point}>{point}</li>)}</ul></div>
          </section>
        ))}
        <section className="page-close"><div className="page-frame"><h2>Turn the checklist into a scoped system.</h2><p><a href={guide.relatedHref}>{guide.relatedLabel}</a>, or bring one workflow for a technical review.</p><button className="button button--primary" onClick={contact}>Request a workflow review <ArrowUpRight aria-hidden="true" /></button></div></section>
      </article>
    </main>
  );
}

