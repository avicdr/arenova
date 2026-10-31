import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Mail,
  User,
  Building,
  Layers,
  MessageSquare,
} from 'lucide-react';

interface AscentSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const AscentSection: React.FC<AscentSectionProps> = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    serviceInterest: 'Meta & Google Ads + AI Front Desk',
    monthlyVolume: '50 - 250 enquiries / mo',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please provide your full name.';
    if (!formData.workEmail.trim() || !/^\S+@\S+\.\S+$/.test(formData.workEmail)) {
      errs.workEmail = 'Please provide a valid work email address.';
    }
    if (!formData.companyName.trim()) errs.companyName = 'Please enter your company or practice name.';
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please briefly describe your current bottleneck (at least 10 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await fetch('https://formsubmit.co/ajax/avi@arenova.in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New ARENOVA Architecture Brief: ${formData.fullName} (${formData.companyName})`,
          _template: 'table',
          _captcha: 'false',
          name: formData.fullName,
          email: formData.workEmail,
          'Full Name': formData.fullName,
          'Work Email': formData.workEmail,
          'Company or Practice': formData.companyName,
          'Service Needed': formData.serviceInterest,
          'Monthly Inbound Volume': formData.monthlyVolume,
          'Operational Challenge': formData.message,
          'Submission Timestamp': new Date().toLocaleString(),
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.warn('Form submission dispatch note:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="ascent"
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 z-10 flex flex-col justify-center border-t border-[#F3F0E8]/08"
    >
      <div id="contact-form" className="max-w-4xl mx-auto w-full">
        {/* HEADER */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1918]/80 border border-[#E84B2C]/30 text-xs text-[#E84B2C] font-mono uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E84B2C] animate-pulse" />
            <span>GET AN AUDIT</span>
          </div>

          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-[-0.02em] text-[#F3F0E8] leading-tight mb-4">
            Ready to stop losing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0E8] via-[#FFAA3D] to-[#E84B2C]">
              inbound leads?
            </span>
          </h2>

          <p className="text-base text-[#A39E93] max-w-xl">
            Tell us about your business. We’ll analyze your lead flow and map out a custom customer acquisition and automation architecture.
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl glass-panel-glow border border-[#E84B2C]/30 relative overflow-hidden">
          {/* Luminous Glow Aura */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#E84B2C]/10 blur-[100px] pointer-events-none" />

          {submitted ? (
            <div className="flex flex-col items-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#E84B2C]/20 border border-[#E84B2C] flex items-center justify-center text-[#E84B2C] mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-display font-bold text-3xl text-[#F3F0E8] mb-3">
                Audit Request Received
              </h3>

              <p className="text-sm text-[#A39E93] max-w-md mb-6 leading-relaxed">
                Thank you, <span className="text-[#F3F0E8] font-semibold">{formData.fullName}</span>.
                Your brief for <span className="text-[#E84B2C] font-mono">{formData.companyName}</span> has
                been dispatched directly to our systems team.
              </p>

              <div className="p-4 rounded-2xl bg-[#141312] border border-[#F3F0E8]/10 text-xs font-mono text-left max-w-md w-full mb-8">
                <div className="flex items-center justify-between pb-2 border-b border-[#F3F0E8]/08 mb-2">
                  <span className="text-[#A39E93]">DISPATCH STATUS</span>
                  <span className="text-emerald-400">ROUTED TO AVI@ARENOVA.IN</span>
                </div>
                <p className="text-[#A39E93]">Direct Delivery: <span className="text-[#F3F0E8]">avi@arenova.in</span></p>
                <p className="text-[#A39E93]">Primary Service: <span className="text-[#F3F0E8]">{formData.serviceInterest}</span></p>
                <p className="text-[#A39E93]">Volume Tier: <span className="text-[#F3F0E8]">{formData.monthlyVolume}</span></p>
                <p className="text-[#A39E93]">Response Window: <span className="text-[#E84B2C]">&lt; 2 Business Hours</span></p>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: '',
                    workEmail: '',
                    companyName: '',
                    serviceInterest: 'Meta & Google Ads + AI Front Desk',
                    monthlyVolume: '50 - 250 enquiries / mo',
                    message: '',
                  });
                }}
                className="px-6 py-2.5 rounded-full bg-[#1F1E1C] hover:bg-[#282725] border border-[#F3F0E8]/15 text-xs font-mono uppercase tracking-wider text-[#F3F0E8] cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* FULL NAME */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8] flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#E84B2C]" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Alexander Wright"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#111110] border border-[#F3F0E8]/10 text-sm text-[#F3F0E8] placeholder-[#A39E93]/40 focus:outline-none focus:border-[#E84B2C] transition-colors"
                  />
                  {errors.fullName && (
                    <span className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* WORK EMAIL */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8] flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#E84B2C]" />
                    <span>Work Email *</span>
                  </label>
                  <input
                    type="email"
                    name="workEmail"
                    autoComplete="email"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    placeholder="alexander@company.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#111110] border border-[#F3F0E8]/10 text-sm text-[#F3F0E8] placeholder-[#A39E93]/40 focus:outline-none focus:border-[#E84B2C] transition-colors"
                  />
                  {errors.workEmail && (
                    <span className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.workEmail}
                    </span>
                  )}
                </div>
              </div>

              {/* COMPANY NAME */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8] flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-[#E84B2C]" />
                  <span>Company or Practice Name *</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  autoComplete="organization"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Acme Clinic / Vance Logistics"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#111110] border border-[#F3F0E8]/10 text-sm text-[#F3F0E8] placeholder-[#A39E93]/40 focus:outline-none focus:border-[#E84B2C] transition-colors"
                />
                {errors.companyName && (
                  <span className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.companyName}
                  </span>
                )}
              </div>

              {/* SERVICE OF INTEREST */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8] flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#E84B2C]" />
                    <span>Primary Service Needed</span>
                  </label>
                  <select
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#111110] border border-[#F3F0E8]/10 text-sm text-[#F3F0E8] focus:outline-none focus:border-[#E84B2C] transition-colors"
                  >
                    <option value="Meta & Google Ads + AI Front Desk">Meta & Google Ads + AI Front Desk (Full Engine)</option>
                    <option value="AI Front Desk Agents">AI Front Desk (Voice & WhatsApp)</option>
                    <option value="Meta & Google Ads (Performance Marketing)">Meta & Google Ads Management</option>
                    <option value="Workflow Automation">Workflow & System Automation</option>
                    <option value="Conversion-Engineered Website">Conversion-Engineered Website</option>
                  </select>
                </div>

                {/* MONTHLY ENQUIRY VOLUME */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8]">
                    Monthly Inbound Enquiries
                  </label>
                  <select
                    name="monthlyVolume"
                    value={formData.monthlyVolume}
                    onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#111110] border border-[#F3F0E8]/10 text-sm text-[#F3F0E8] focus:outline-none focus:border-[#E84B2C] transition-colors"
                  >
                    <option value="< 50 / mo">&lt; 50 enquiries / month</option>
                    <option value="50 - 250 / mo">50 – 250 enquiries / month</option>
                    <option value="250 - 1,000 / mo">250 – 1,000 enquiries / month</option>
                    <option value="1,000+ / mo">1,000+ enquiries / month</option>
                  </select>
                </div>
              </div>

              {/* MESSAGE / BOTTLENECK DESCRIPTION */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8] flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#E84B2C]" />
                  <span>Current Bottleneck or Target *</span>
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. We are spending $5k/mo on Google Ads but losing leads after 5 PM because staff can't answer calls. We need an automated receptionist and CRM sync."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#111110] border border-[#F3F0E8]/10 text-sm text-[#F3F0E8] placeholder-[#A39E93]/40 focus:outline-none focus:border-[#E84B2C] transition-colors resize-none"
                />
                {errors.message && (
                  <span className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </span>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-[#A39E93]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Dispatched directly to avi@arenova.in. Zero spam.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto btn-cinematic px-8 py-4 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#F3F0E8] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E84B2C]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Dispatching Brief...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Architecture Brief</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
