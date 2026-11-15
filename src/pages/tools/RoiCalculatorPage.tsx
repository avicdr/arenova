import { useState, useMemo } from 'react';
import { ArrowUpRight, Check, Copy, TrendingUp, Clock } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface ToolPageProps {
  onNavigate?: (sectionId: string) => void;
}

export const RoiCalculatorPage = ({ onNavigate }: ToolPageProps) => {
  const { navigate } = useRouter();

  // Inputs
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(8);
  const [hourlyRate, setHourlyRate] = useState<number>(35);
  const [softwareSpend, setSoftwareSpend] = useState<number>(350);
  const [copied, setCopied] = useState(false);

  // Calculations
  const metrics = useMemo(() => {
    const WEEKS_PER_YEAR = 50;
    const AUTOMATION_EFFICIENCY_RATE = 0.75; // 75% of routine coordination is automated

    const totalAnnualHours = teamSize * hoursPerWeek * WEEKS_PER_YEAR;
    const annualLaborCost = totalAnnualHours * hourlyRate;
    const annualSoftwareWaste = softwareSpend * 12;
    const totalCurrentWaste = annualLaborCost + annualSoftwareWaste;

    const hoursSavedAnnually = Math.round(totalAnnualHours * AUTOMATION_EFFICIENCY_RATE);
    const grossDollarSavings = Math.round(totalCurrentWaste * AUTOMATION_EFFICIENCY_RATE);

    // Approximate Arenova business automation tier investment ($1,999/mo)
    const annualAutomationInvestment = 1999 * 12;
    const netAnnualSavings = Math.max(0, grossDollarSavings - annualAutomationInvestment);
    const monthlyGrossSavings = grossDollarSavings / 12;
    const paybackWeeks = monthlyGrossSavings > 0 ? Math.max(3, Math.round((1999 / (monthlyGrossSavings / 4.33)))) : 8;
    const roiPercentage = Math.round((netAnnualSavings / annualAutomationInvestment) * 100);

    return {
      totalAnnualHours,
      totalCurrentWaste,
      hoursSavedAnnually,
      grossDollarSavings,
      netAnnualSavings,
      paybackWeeks,
      roiPercentage,
    };
  }, [teamSize, hoursPerWeek, hourlyRate, softwareSpend]);

  const copySummary = () => {
    const text = `Arenova AI Automation ROI Estimate:
- Team Members: ${teamSize}
- Hours Spent/Week/Person: ${hoursPerWeek} hrs
- Current Annual Cost of Inefficiency: $${metrics.totalCurrentWaste.toLocaleString()}
- Projected Hours Saved Annually: ${metrics.hoursSavedAnnually.toLocaleString()} hrs
- Estimated Net Annual Savings: $${metrics.netAnnualSavings.toLocaleString()}
- Estimated Payback Period: ~${metrics.paybackWeeks} weeks
Generated at: https://arenova.in/tools/automation-roi-calculator/`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const contact = () => (onNavigate ? onNavigate('contact') : navigate('/#contact'));

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <div className="page-frame subpage-hero__grid">
          <div>
            <p className="section-index">Interactive Decision Tool · Free Linkable Resource</p>
            <h1>AI automation ROI & cost savings calculator.</h1>
          </div>
          <div>
            <p>
              Quantify the real cost of repetitive manual handoffs across your team. Adjust the sliders below to calculate
              your annual labor waste, hours returned to revenue tasks, and projected break-even period.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ minHeight: 'auto', padding: '40px 0 100px' }}>
        <div className="page-frame" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
          {/* Controls */}
          <div style={{ background: 'var(--surface)', padding: '36px', borderRadius: '12px', border: '1px solid var(--line)' }}>
            <h2 style={{ fontSize: '1.45rem', marginBottom: '28px', letterSpacing: '-0.02em' }}>1. Your Current Operational Inputs</h2>

            {/* Slider 1 */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 600 }}>
                <label htmlFor="team-size">Team members handling repetitive tasks</label>
                <span style={{ color: 'var(--accent-dark)', fontWeight: 700 }}>{teamSize} people</span>
              </div>
              <input
                id="team-size"
                type="range"
                min="1"
                max="50"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Operations, sales reps, administrative staff, coordinators</span>
            </div>

            {/* Slider 2 */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 600 }}>
                <label htmlFor="hours-week">Hours spent/employee/week on manual data entry</label>
                <span style={{ color: 'var(--accent-dark)', fontWeight: 700 }}>{hoursPerWeek} hrs/wk</span>
              </div>
              <input
                id="hours-week"
                type="range"
                min="2"
                max="30"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Copy-pasting leads, checking status, updating spreadsheets, scheduling</span>
            </div>

            {/* Slider 3 */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 600 }}>
                <label htmlFor="hourly-rate">Average loaded employee hourly cost</label>
                <span style={{ color: 'var(--accent-dark)', fontWeight: 700 }}>${hourlyRate}/hr</span>
              </div>
              <input
                id="hourly-rate"
                type="range"
                min="15"
                max="120"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Salary + benefits + operational overhead</span>
            </div>

            {/* Slider 4 */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 600 }}>
                <label htmlFor="software-spend">Monthly spend on disconnected tools & duct-tape</label>
                <span style={{ color: 'var(--accent-dark)', fontWeight: 700 }}>${softwareSpend}/mo</span>
              </div>
              <input
                id="software-spend"
                type="range"
                min="50"
                max="2500"
                step="50"
                value={softwareSpend}
                onChange={(e) => setSoftwareSpend(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Miscellaneous Zapier, form builders, scrapers, and manual software add-ons</span>
            </div>
          </div>

          {/* Results Board */}
          <div style={{ background: 'var(--inverse)', color: 'white', padding: '36px', borderRadius: '12px', border: '1px solid var(--line-inverse)', boxShadow: '0 24px 60px rgba(19, 36, 32, 0.16)' }}>
            <p className="section-index" style={{ color: '#ff8064', marginBottom: '12px' }}>Projected Business Impact</p>
            <h2 style={{ color: 'white', fontSize: '1.85rem', marginBottom: '28px', letterSpacing: '-0.03em' }}>Automation Return on Investment</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--inverse-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock style={{ width: '14px', height: '14px', color: '#ff8064' }} /> Hours Returned/Year
                </span>
                <strong style={{ fontSize: '1.9rem', color: 'white', display: 'block', marginTop: '6px' }}>
                  {metrics.hoursSavedAnnually.toLocaleString()} hrs
                </strong>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--inverse-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp style={{ width: '14px', height: '14px', color: '#ff8064' }} /> Estimated Net Savings
                </span>
                <strong style={{ fontSize: '1.9rem', color: 'white', display: 'block', marginTop: '6px' }}>
                  ${metrics.netAnnualSavings.toLocaleString()}
                </strong>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--line-inverse)', paddingTop: '20px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--inverse-muted)' }}>Current Annual Inefficiency Cost:</span>
                <strong style={{ color: '#ff8064' }}>${metrics.totalCurrentWaste.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--inverse-muted)' }}>Estimated Payback Period:</span>
                <strong style={{ color: 'white' }}>~{metrics.paybackWeeks} weeks</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--inverse-muted)' }}>Projected First-Year ROI:</span>
                <strong style={{ color: 'white' }}>+{metrics.roiPercentage}%</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button className="button button--primary" onClick={contact} style={{ flex: '1 1 200px' }}>
                Claim your audit & savings <ArrowUpRight aria-hidden="true" />
              </button>
              <button
                className="button button--secondary"
                onClick={copySummary}
                style={{ color: 'white', borderColor: 'var(--line-inverse)', flex: '0 0 auto' }}
              >
                {copied ? <Check style={{ width: '16px', height: '16px' }} /> : <Copy style={{ width: '16px', height: '16px' }} />}
                {copied ? 'Copied' : 'Share Results'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="section section--ink" style={{ minHeight: 'auto', padding: '80px 0' }}>
        <div className="page-frame">
          <div className="section-heading">
            <p className="section-index">Calculation Methodology</p>
            <h2 style={{ color: 'white' }}>How this ROI model is constructed.</h2>
            <p style={{ color: 'var(--inverse-muted)' }}>
              We base our projections on real-world workflow automation benchmarks. When repetitive manual handoffs are
              replaced with deterministic API integrations, teams recover an average of 70–80% of manual coordination time.
              The remaining 20–30% represents necessary human exception handling and complex customer consultations.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

RoiCalculatorPage.displayName = 'RoiCalculatorPage';
