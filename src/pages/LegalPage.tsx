type LegalKind = 'privacy' | 'terms';

const privacySections = [
  ['Information you provide', 'When you send an inquiry, Arenova receives the contact and project information you choose to provide. Do not submit confidential credentials, production data, or regulated personal data through the public form.'],
  ['How information is used', 'Inquiry information is used to respond, assess project fit, prepare a scope, and maintain necessary business records. It is not sold.'],
  ['Website measurement', 'The site may use privacy-conscious analytics to understand aggregate traffic and page performance. Availability and configuration can change; browser controls may limit this collection.'],
  ['Service providers and transfers', 'Hosting, email, analytics, and project tools may process limited information on Arenova’s behalf. Because Arenova operates from India and serves customers remotely, information may be processed outside your country.'],
  ['Retention and requests', 'Inquiry records are retained only as long as needed for the conversation, legal obligations, and legitimate business records. Email avi@arenova.in to request access, correction, or deletion where applicable.'],
];

const termsSections = [
  ['Website information', 'The website describes Arenova’s current services and working approach. It is general information, not a binding proposal, guarantee, or professional legal, financial, or compliance advice.'],
  ['Estimates and examples', 'Timelines, prices, calculator outputs, architectures, and potential outcomes are estimates until a written project scope is agreed. Results depend on the workflow, source data, third-party systems, and client participation.'],
  ['Intellectual property', 'Arenova owns the website design, copy, and original published materials unless stated otherwise. Third-party names and trademarks remain the property of their owners.'],
  ['External services', 'Links to third-party sites are provided for context. Arenova does not control their availability, security, terms, or content.'],
  ['Project agreements', 'Paid work is governed by a separate written agreement that defines scope, fees, ownership, confidentiality, data handling, support, and liability.'],
];

export function LegalPage({ kind }: { kind: LegalKind }) {
  const privacy = kind === 'privacy';
  const sections = privacy ? privacySections : termsSections;
  return (
    <main className="subpage">
      <section className="subpage-hero"><div className="page-frame subpage-hero__grid"><div><p className="section-index">Company information</p><h1>{privacy ? 'Privacy policy.' : 'Website terms.'}</h1></div><div><p>Effective November 16, 2026. Arenova is a founder-led business based in Bengaluru, India.</p></div></div></section>
      <section className="section"><div className="page-frame"><div className="friction-list">{sections.map(([title, body]) => <article key={title}><h2>{title}</h2><p>{body}</p></article>)}</div><p style={{ marginTop: 40 }}>Questions: <a href="mailto:avi@arenova.in">avi@arenova.in</a></p></div></section>
    </main>
  );
}

