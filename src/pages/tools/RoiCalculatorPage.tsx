import { useState, useMemo } from 'react';
import { ArrowUpRight, Check, Copy, TrendingUp, Clock } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface ToolPageProps {
  onNavigate?: (sectionId: string) => void;
}

type Currency = 'USD' | 'INR';

export const RoiCalculatorPage = ({ onNavigate }: ToolPageProps) => {
  const { navigate } = useRouter();

  // Region & Currency
  const [currency, setCurrency] = useState<Currency>('USD');

  // Inputs
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(8);
  const [hourlyRate, setHourlyRate] = useState<number>(35);
  const [softwareSpend, setSoftwareSpend] = useState<number>(350);
  const [copied, setCopied] = useState(false);

  const handleCurrencyChange = (nextCurrency: Currency) => {
    if (nextCurrency === currency) return;
    setCurrency(nextCurrency);
    if (nextCurrency === 'INR') {
      setHourlyRate(800);
      setSoftwareSpend(25000);
    } else {
      setHourlyRate(35);
      setSoftwareSpend(350);
    }
  };

  const formatCurrency = (val: number) => {
    const rounded = Math.round(val);
    if (currency === 'INR') {
      return `₹${rounded.toLocaleString('en-IN')}`;
    }
    return `$${rounded.toLocaleString('en-US')}`;
  };

  // Calculations
  const metrics = useMemo(() => {
    const WEEKS_PER_YEAR = 50;
    const AUTOMATION_EFFICIENCY_RATE = 0.75; // 75% of routine coordination is automated

    const totalAnnualHours = teamSize * hoursPerWeek * WEEKS_PER_YEAR;
    const annualLaborCost = totalAnnualHours * hourlyRate;
    const annualSoftwareWaste = softwareSpend * 12;
    const totalCurrentWaste = annualLaborCost + annualSoftwareWaste;

    const hoursSavedAnnually = Math.round(totalAnnualHours * AUTOMATION_EFFICIENCY_RATE);
    const grossSavings = Math.round(totalCurrentWaste * AUTOMATION_EFFICIENCY_RATE);

    // Calibrated investment baseline based on team scale ($1,999–$3,499/mo or ₹79,000–₹1,59,000/mo)
    const monthlyInvestment =
      currency === 'INR'
        ? (teamSize > 10 ? 159000 : 79000)
        : (teamSize > 10 ? 3499 : 1999);
    const annualAutomationInvestment = monthlyInvestment * 12;
    const netAnnualSavings = Math.max(0, grossSavings - annualAutomationInvestment);
    const monthlyGrossSavings = grossSavings / 12;
    const paybackWeeks =
      monthlyGrossSavings > 0
        ? Math.max(3, Math.round(monthlyInvestment / (monthlyGrossSavings / 4.33)))
        : 8;
    const roiPercentage = Math.round((netAnnualSavings / annualAutomationInvestment) * 100);

    return {
      totalAnnualHours,
      totalCurrentWaste,
      hoursSavedAnnually,
      grossSavings,
      netAnnualSavings,
      paybackWeeks,
      roiPercentage,
      monthlyInvestment,
    };
  }, [teamSize, hoursPerWeek, hourlyRate, softwareSpend, currency]);

  const copySummary = () => {
    const text = `Arenova AI Automation ROI Estimate (${currency}):
- Currency: ${currency === 'INR' ? 'INR (₹)' : 'USD ($)'}
- Team Members Handling Repetitive Work: ${teamSize}
- Hours Spent/Week/Person: ${hoursPerWeek} hrs
- Current Annual Inefficiency Cost: ${formatCurrency(metrics.totalCurrentWaste)}
- Projected Hours Saved Annually: ${metrics.hoursSavedAnnually.toLocaleString()} hrs
- Estimated Net Annual Savings: ${formatCurrency(metrics.netAnnualSavings)}
- Estimated Payback Period: ~${metrics.paybackWeeks} weeks
- Projected First-Year ROI: +${metrics.roiPercentage}%
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
            <p className="section-index">Interactive Decision Tool · US ($) & India (₹) Benchmarks</p>
            <h1>AI automation ROI & cost savings calculator.</h1>
          </div>
          <div>
            <p>
              Quantify the real cost of repetitive manual handoffs across your team. Switch between USD ($) and INR (₹)
              to calibrate regional salary benchmarks and calculate projected payback periods.
            </p>
            <div style={{ marginTop: '24px' }}>
              <div className="billing-toggle" aria-label="Currency selection">
                <button
                  type="button"
                  aria-pressed={currency === 'USD'}
                  onClick={() => handleCurrencyChange('USD')}
                >
                  USD ($) · US / Global
                </button>
                <button
                  type="button"
                  aria-pressed={currency === 'INR'}
                  onClick={() => handleCurrencyChange('INR')}
                >
                  INR (₹) · India / GST
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ minHeight: 'auto', padding: '40px 0 100px' }}>
        <div
          className="page-frame"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Controls */}
          <div
            style={{
              background: 'var(--surface)',
              padding: '36px',
              borderRadius: '12px',
              border: '1px solid var(--line)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.45rem', margin: 0, letterSpacing: '-0.02em' }}>
                1. Operational Inputs ({currency})
              </h2>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: 'var(--line)',
                  color: 'var(--ink)',
                }}
              >
                {currency === 'INR' ? 'Indian Benchmarks' : 'US / Global'}
              </span>
            </div>

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
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                Operations, sales reps, administrative staff, coordinators
              </span>
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
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                Copy-pasting leads, checking status, updating spreadsheets, scheduling
              </span>
            </div>

            {/* Slider 3 */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 600 }}>
                <label htmlFor="hourly-rate">
                  {currency === 'INR' ? 'Loaded employee hourly cost (₹/hr)' : 'Loaded employee hourly cost ($/hr)'}
                </label>
                <span style={{ color: 'var(--accent-dark)', fontWeight: 700 }}>
                  {formatCurrency(hourlyRate)}/hr
                </span>
              </div>
              <input
                id="hourly-rate"
                type="range"
                min={currency === 'INR' ? 300 : 15}
                max={currency === 'INR' ? 3500 : 150}
                step={currency === 'INR' ? 50 : 1}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                {currency === 'INR'
                  ? 'Salary + PF + benefits (Standard Indian enterprise range: ₹500–₹1,800/hr)'
                  : 'Salary + payroll taxes + benefits (Standard US range: $25–$85/hr)'}
              </span>
            </div>

            {/* Slider 4 */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 600 }}>
                <label htmlFor="software-spend">
                  {currency === 'INR'
                    ? 'Monthly spend on fragmented tools & duct-tape (₹/mo)'
                    : 'Monthly spend on disconnected tools & duct-tape ($/mo)'}
                </label>
                <span style={{ color: 'var(--accent-dark)', fontWeight: 700 }}>
                  {formatCurrency(softwareSpend)}/mo
                </span>
              </div>
              <input
                id="software-spend"
                type="range"
                min={currency === 'INR' ? 5000 : 50}
                max={currency === 'INR' ? 150000 : 2500}
                step={currency === 'INR' ? 5000 : 50}
                value={softwareSpend}
                onChange={(e) => setSoftwareSpend(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                {currency === 'INR'
                  ? 'Manual Zapier subscriptions, form builders, unintegrated CRM addons'
                  : 'Miscellaneous Zapier tiers, form tools, scrapers, and manual software add-ons'}
              </span>
            </div>
          </div>

          {/* Results Board */}
          <div
            style={{
              background: 'var(--inverse)',
              color: 'white',
              padding: '36px',
              borderRadius: '12px',
              border: '1px solid var(--line-inverse)',
              boxShadow: '0 24px 60px rgba(19, 36, 32, 0.16)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <p className="section-index" style={{ color: '#ff8064', margin: 0 }}>
                Projected Business Impact
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--inverse-muted)' }}>
                {currency === 'INR' ? 'INR (₹) Model' : 'USD ($) Model'}
              </span>
            </div>
            <h2 style={{ color: 'white', fontSize: '1.85rem', marginBottom: '28px', letterSpacing: '-0.03em' }}>
              Automation Return on Investment
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px' }}>
                <span
                  style={{
                    color: 'var(--inverse-muted)',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Clock style={{ width: '14px', height: '14px', color: '#ff8064' }} /> Hours Returned/Year
                </span>
                <strong style={{ fontSize: '1.9rem', color: 'white', display: 'block', marginTop: '6px' }}>
                  {metrics.hoursSavedAnnually.toLocaleString()} hrs
                </strong>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px' }}>
                <span
                  style={{
                    color: 'var(--inverse-muted)',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <TrendingUp style={{ width: '14px', height: '14px', color: '#ff8064' }} /> Estimated Net Savings
                </span>
                <strong style={{ fontSize: '1.9rem', color: 'white', display: 'block', marginTop: '6px' }}>
                  {formatCurrency(metrics.netAnnualSavings)}
                </strong>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--line-inverse)', paddingTop: '20px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--inverse-muted)' }}>Current Annual Inefficiency Cost:</span>
                <strong style={{ color: '#ff8064' }}>{formatCurrency(metrics.totalCurrentWaste)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--inverse-muted)' }}>Baseline Engineering Tier:</span>
                <strong style={{ color: 'white' }}>{formatCurrency(metrics.monthlyInvestment)} / mo</strong>
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
            <h2 style={{ color: 'white' }}>How this dual-market ROI model is constructed.</h2>
            <p style={{ color: 'var(--inverse-muted)' }}>
              Projections are calibrated against real-world enterprise workflow deployments across North America and India.
              When repetitive manual data movement is replaced with deterministic API integrations, teams routinely recover
              70–80% of manual coordination overhead. The remaining 20–30% represents necessary human exception handling and
              strategic customer interaction.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

RoiCalculatorPage.displayName = 'RoiCalculatorPage';
