import { ArrowLeft, ArrowUpRight, Calendar, Clock, User, Calculator } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface GuideProps {
  onNavigate?: (sectionId: string) => void;
}

export const CalculatingAutomationRoiPage = ({ onNavigate }: GuideProps) => {
  const { navigate } = useRouter();

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      {/* Article Header */}
      <section className="subpage-hero">
        <div className="page-frame" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <button
            onClick={() => navigate('/blog/')}
            style={{
              background: 'none',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--ink-2)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '24px',
              padding: 0,
            }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px' }} /> Back to all articles
          </button>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '0.85rem', color: 'var(--ink-2)', marginBottom: '16px' }}>
            <span
              style={{
                background: 'var(--line)',
                padding: '4px 10px',
                borderRadius: '4px',
                fontWeight: 600,
                color: 'var(--ink)',
              }}
            >
              Operations &amp; Strategy
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Calendar style={{ width: '14px', height: '14px' }} /> Published January 2026
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Clock style={{ width: '14px', height: '14px' }} /> 7 min read
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <User style={{ width: '14px', height: '14px' }} /> By Avi, Systems Architect
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15, marginBottom: '24px' }}>
            How to Accurately Calculate Business Process Automation ROI (With Real Operational Math)
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            Most corporate ROI calculators are superficial marketing gimmicks that multiply an arbitrary hourly rate by an
            imaginary number of hours saved. Here is the rigorous financial model operations leaders need to calculate true
            business automation return on investment.
          </p>
        </div>
      </section>

      {/* Main Body */}
      <section className="section" style={{ paddingTop: '16px' }}>
        <div className="page-frame" style={{ maxWidth: '860px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--ink)' }}>
          <h2>1. Why Most Automation ROI Projections Fail</h2>
          <p>
            When leadership considers an investment in <a href="/services/business-process-automation/" onClick={(e) => { e.preventDefault(); navigate('/services/business-process-automation/'); }}>business process automation</a>, they are often presented with one of two extremes:
          </p>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <strong>The Vendor Hyperbole:</strong> <em>&ldquo;This tool saves 20 hours per week for every employee!&rdquo;</em> (Ignoring implementation costs, API fees, and maintenance drag).
            </li>
            <li>
              <strong>The Skeptical Controller:</strong> <em>&ldquo;Unless we fire three full-time employees, we haven’t saved a dollar.&rdquo;</em> (Ignoring revenue acceleration, error remediation, and employee turnover costs).
            </li>
          </ul>
          <p>
            Accurate capital budgeting requires a multidimensional operational model that accounts for fully loaded labor costs,
            rework expense, customer churn velocity, and ongoing infrastructure maintenance.
          </p>

          <h2>2. The Total Direct Labor Cost Formula</h2>
          <p>
            Direct labor savings represents the foundational tier of automation return. However, calculating it simply with base
            salary drastically understates the true cost:
          </p>
          <div
            style={{
              background: 'var(--surface)',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid var(--line)',
              fontFamily: 'monospace',
              fontSize: '1.15rem',
              margin: '24px 0',
            }}
          >
            Annual Labor Waste (L) = N × H × 50 × W × (1 + B)
          </div>
          <p>Where:</p>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>N:</strong> Number of employees performing the repetitive workflow.</li>
            <li><strong>H:</strong> Weekly hours spent on repetitive manual data entry, formatting, or triage.</li>
            <li><strong>50:</strong> Working weeks per operational year.</li>
            <li><strong>W:</strong> Base hourly wage (Annual Salary ÷ 2,000 hours).</li>
            <li><strong>B:</strong> Employee fringe benefit &amp; overhead multiplier (typically <strong>0.25 to 0.35</strong> for healthcare, payroll taxes, software licenses, and office overhead).</li>
          </ul>
          <p>
            <strong>Example:</strong> A team of 5 account coordinators spending 12 hours/week manually entering invoices and updating CRM records at $60,000 base salary ($30/hr) with 30% overhead costs an organization:
            <br />
            <code>5 × 12 × 50 × $30 × 1.30 = $117,000 annually</code> in wasted labor.
          </p>

          <h2>3. The Error Remediation &amp; Rework Multiplier</h2>
          <p>
            Manual data entry carries an industry-standard error rate of 1% to 4%. When a human mistypes a billing address,
            inverts account numbers, or forgets an email attachment, the cost to detect, investigate, and correct the error is
            typically <strong>5x to 10x</strong> the cost of the initial entry:
          </p>
          <div
            style={{
              background: 'var(--surface)',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid var(--line)',
              fontFamily: 'monospace',
              fontSize: '1.15rem',
              margin: '24px 0',
            }}
          >
            Annual Error Cost (E) = M × R × C
          </div>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>M:</strong> Total annual transactions or records processed.</li>
            <li><strong>R:</strong> Human error rate (typically 0.02 = 2%).</li>
            <li><strong>C:</strong> Average remediation cost per error (customer support time, credit card chargeback fees, accounting adjustments, manager escalation).</li>
          </ul>

          <h2>4. The Revenue Acceleration &amp; Latency Cost</h2>
          <p>
            Speed is a decisive competitive moat. When a qualified inbound enterprise lead submits a web form, Harvard Business
            Review research proves that reaching out within 5 minutes increases conversion odds by <strong>21x</strong> compared to
            a 30-minute delay.
          </p>
          <p>
            If manual triage causes a 4-hour delay, your sales pipeline suffers a measurable latency penalty. Automating inbound
            qualification with sub-60-second speed-to-lead routinely increases pipeline conversion by 15% to 30% without spending
            an additional dollar on marketing.
          </p>

          <h2>5. The Complete Net ROI Equation</h2>
          <p>To determine true annual net return, deduct all implementation and operational expenses:</p>
          <div
            style={{
              background: 'var(--surface)',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid var(--line)',
              fontFamily: 'monospace',
              fontSize: '1.15rem',
              margin: '24px 0',
            }}
          >
            Net Annual ROI = (Labor Saved + Errors Avoided + Revenue Lift) - (Retainer Fees + API Costs)
          </div>
          <p>
            And the <strong>Payback Period (Months)</strong> is calculated as:
          </p>
          <div
            style={{
              background: 'var(--surface)',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid var(--line)',
              fontFamily: 'monospace',
              fontSize: '1.15rem',
              margin: '24px 0',
            }}
          >
            Payback Timeline = Total Upfront Implementation Cost ÷ Monthly Net Savings
          </div>
          <p>
            In well-architected systems, modern business process automation achieves full break-even payback within <strong>2 to 4 months</strong> of production deployment.
          </p>

          {/* Interactive Tool Callout */}
          <div
            style={{
              margin: '48px 0',
              padding: '36px',
              background: 'var(--ink)',
              color: 'var(--inverse)',
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <Calculator style={{ width: '40px', height: '40px', color: 'var(--accent)', margin: '0 auto 16px' }} />
            <h3 style={{ color: 'white', marginTop: 0, fontSize: '1.5rem' }}>Calculate Your Company&apos;s Exact ROI</h3>
            <p style={{ color: 'var(--inverse-muted)', maxWidth: '540px', margin: '0 auto 24px' }}>
              We built an interactive calculator using this exact financial model. Adjust team size, hourly rates, and hours
              spent to calculate your annual savings in real time.
            </p>
            <button
              className="button button--primary"
              onClick={() => navigate('/tools/automation-roi-calculator/')}
            >
              Open Interactive ROI Calculator <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="page-close">
        <div className="page-frame">
          <h2>Ready to eliminate manual operational waste?</h2>
          <p>Request an automation audit. We’ll calculate your process bottlenecks and deliver a fixed-fee proposal.</p>
          <button className="button button--primary" onClick={contact}>
            Request automation audit <ArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

CalculatingAutomationRoiPage.displayName = 'CalculatingAutomationRoiPage';

