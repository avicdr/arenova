import { useState } from 'react';
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react';

type FormState = 'idle' | 'sending' | 'sent' | 'error';

const initialData = {
  fullName: '',
  workEmail: '',
  companyName: '',
  region: 'United States & Canada (EST / CST / MST / PST)',
  serviceInterest: 'Workflow automation',
  message: '',
};

export function AscentSection() {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>('idle');

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) nextErrors.fullName = 'Enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(formData.workEmail)) nextErrors.workEmail = 'Enter a valid work email address.';
    if (!formData.companyName.trim()) nextErrors.companyName = 'Enter your company or practice name.';
    if (formData.message.trim().length < 10) nextErrors.message = 'Describe the workflow in at least 10 characters.';
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) document.getElementById(firstInvalid)?.focus();
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setFormState('sending');
    try {
      const response = await fetch('https://formsubmit.co/ajax/avi@arenova.in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New Arenova automation audit: ${formData.companyName} (${formData.region})`,
          _template: 'table',
          _captcha: 'false',
          name: formData.fullName,
          email: formData.workEmail,
          company: formData.companyName,
          region: formData.region,
          service: formData.serviceInterest,
          workflow: formData.message,
        }),
      });
      if (!response.ok) throw new Error(`Form service returned ${response.status}`);
      setFormState('sent');
    } catch {
      setFormState('error');
    }
  };

  const update = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }));
  };

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="page-frame contact-grid">
        <div className="contact-copy">
          <p className="section-index">Automation audit</p>
          <h2 id="contact-title">Bring us one workflow that should run better.</h2>
          <p>Tell us where work slows down, which tools are involved, and what a good handoff looks like. We’ll use that context to assess the fit.</p>
          <dl className="contact-notes">
            <div>
              <dt>Global delivery & invoicing</dt>
              <dd>
                Bengaluru engineering hub with dedicated US (EST/PST) and India (IST) overlap. Invoiced in USD (Stripe/ACH with Form W-8BEN-E) & INR (GST 18% Input Tax Credit).
              </dd>
            </div>
            <div>
              <dt>Useful context</dt>
              <dd>Current tools, monthly volume, failure points, and required human checks.</dd>
            </div>
            <div>
              <dt>Good starting scope</dt>
              <dd>One repeated process with a clear trigger, owner, and outcome.</dd>
            </div>
          </dl>
        </div>

        <div className="contact-form-wrap">
          {formState === 'sent' ? (
            <div className="form-result" role="status">
              <Check aria-hidden="true" />
              <h3>Audit request sent</h3>
              <p>We received the workflow details for {formData.companyName}.</p>
              <button className="text-link" onClick={() => { setFormData(initialData); setFormState('idle'); }}>
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <Field label="Name" id="fullName" error={errors.fullName}>
                  <input id="fullName" name="fullName" autoComplete="name" value={formData.fullName}
                    aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    onChange={(event) => update('fullName', event.target.value)} />
                </Field>
                <Field label="Work email" id="workEmail" error={errors.workEmail}>
                  <input id="workEmail" name="workEmail" type="email" autoComplete="email" value={formData.workEmail}
                    aria-invalid={Boolean(errors.workEmail)} aria-describedby={errors.workEmail ? 'workEmail-error' : undefined}
                    onChange={(event) => update('workEmail', event.target.value)} />
                </Field>
              </div>
              <div className="form-row">
                <Field label="Company or practice" id="companyName" error={errors.companyName}>
                  <input id="companyName" name="companyName" autoComplete="organization" value={formData.companyName}
                    aria-invalid={Boolean(errors.companyName)} aria-describedby={errors.companyName ? 'companyName-error' : undefined}
                    onChange={(event) => update('companyName', event.target.value)} />
                </Field>
                <Field label="Region & Timezone" id="region">
                  <select id="region" name="region" value={formData.region}
                    onChange={(event) => update('region', event.target.value)}>
                    <option>United States & Canada (EST / CST / MST / PST)</option>
                    <option>India & South Asia (IST)</option>
                    <option>United Kingdom & Europe (GMT / CET)</option>
                    <option>Australia & Asia-Pacific (AEST / SGT)</option>
                    <option>Other / Global</option>
                  </select>
                </Field>
              </div>
              <Field label="System to discuss" id="serviceInterest">
                <select id="serviceInterest" name="serviceInterest" value={formData.serviceInterest}
                  onChange={(event) => update('serviceInterest', event.target.value)}>
                  <option>Workflow automation</option><option>Sales outreach system</option><option>AI front desk</option><option>Custom AI agent</option>
                </select>
              </Field>
              <Field label="Current workflow and bottleneck" id="message" error={errors.message}>
                <textarea id="message" name="message" rows={5} value={formData.message}
                  aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined}
                  onChange={(event) => update('message', event.target.value)} />
              </Field>
              {formState === 'error' && (
                <p className="form-error" role="alert">The form could not be sent. Email <a href="mailto:avi@arenova.in">avi@arenova.in</a> instead.</p>
              )}
              <button className="button button--primary form-submit" type="submit" disabled={formState === 'sending'}>
                {formState === 'sending' ? <><LoaderCircle className="spinner" aria-hidden="true" /> Sending request</> : <>Request an automation audit <ArrowUpRight aria-hidden="true" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return <div className="field"><label htmlFor={id}>{label}</label>{children}{error && <p id={`${id}-error`} className="field-error">{error}</p>}</div>;
}
