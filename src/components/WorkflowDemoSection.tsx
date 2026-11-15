import { useState } from 'react';

const workflows = [
  {
    id: 'inbound', tab: 'Inbound enquiry', title: 'One enquiry, one controlled path',
    intro: 'A front-desk workflow can identify intent, check approved information, book against live availability, and route exceptions to staff.',
    steps: [
      ['Receive', 'Voice, WhatsApp, web form, or email enters one queue.'],
      ['Understand', 'The system extracts intent and the details your team needs.'],
      ['Validate', 'Business rules check availability, required fields, and escalation conditions.'],
      ['Act', 'The system books, updates records, and notifies the right person.'],
    ],
  },
  {
    id: 'outbound', tab: 'Outbound sales', title: 'Research and follow-up without losing context',
    intro: 'A managed outbound workflow keeps research, relevance, delivery, replies, and CRM state connected instead of passing spreadsheets between tools.',
    steps: [
      ['Select', 'Accounts are filtered against an agreed market and buying signals.'],
      ['Enrich', 'Decision-makers and public business context are verified.'],
      ['Contact', 'Approved sequences send through configured infrastructure.'],
      ['Route', 'Replies and booked calls move into the CRM with their context.'],
    ],
  },
  {
    id: 'operations', tab: 'Operations', title: 'Events move work between systems',
    intro: 'A signed deal, paid invoice, uploaded document, or status change can trigger a dependable sequence with validation at each boundary.',
    steps: [
      ['Trigger', 'A trusted system emits a specific business event.'],
      ['Transform', 'Data is checked and converted to the receiving schema.'],
      ['Execute', 'Documents, records, tasks, and notifications are created.'],
      ['Observe', 'Failures are logged and routed for recovery rather than hidden.'],
    ],
  },
];

export function WorkflowDemoSection() {
  const [activeId, setActiveId] = useState(workflows[0].id);
  const active = workflows.find((workflow) => workflow.id === activeId) ?? workflows[0];

  return (
    <section id="system" className="section system-section" aria-labelledby="system-title">
      <div className="page-frame">
        <div className="system-section__head">
          <div><p className="section-index">System design</p><h2 id="system-title">Automation that explains itself.</h2></div>
          <p>Every workflow has a visible trigger, decision points, actions, and exception handling. AI handles interpretation; deterministic rules control critical changes.</p>
        </div>
        <div className="workflow-panel">
          <div className="workflow-tabs" role="tablist" aria-label="Workflow examples">
            {workflows.map((workflow) => (
              <button key={workflow.id} type="button" role="tab" aria-selected={activeId === workflow.id}
                aria-controls={`workflow-${workflow.id}`} onClick={() => setActiveId(workflow.id)}>
                {workflow.tab}
              </button>
            ))}
          </div>
          <div id={`workflow-${active.id}`} role="tabpanel" className="workflow-content" tabIndex={0}>
            <div className="workflow-content__intro"><h3>{active.title}</h3><p>{active.intro}</p></div>
            <ol className="workflow-steps">
              {active.steps.map(([title, body], index) => (
                <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{title}</strong><p>{body}</p></div></li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
