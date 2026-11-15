const friction = [
  ['Disconnected operations', 'Staff copy the same information between inboxes, spreadsheets, CRMs, calendars, and billing tools.'],
  ['Slow lead handling', 'New enquiries wait for someone to read, qualify, assign, and answer them.'],
  ['Outbound without a system', 'Research, personalisation, sending, follow-up, and CRM updates live in separate workflows.'],
];

export function ProblemSection() {
  return (
    <section className="section section--ink" aria-labelledby="friction-title">
      <div className="page-frame split-heading">
        <div>
          <p className="section-index">The operating problem</p>
          <h2 id="friction-title">Software is installed. The handoffs are still manual.</h2>
        </div>
        <div className="friction-list">
          {friction.map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
