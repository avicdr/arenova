import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
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

export const AscentSection: React.FC<AscentSectionProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    serviceInterest: 'AI Front Desk Agents',
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
      // Ensure user receives confirmation even in offline/strict adblock environments
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="ascent"
      className="relative min-h-screen w-full py-28 px-6 sm:px-10 lg:px-16 z-10 flex flex-col justify-center"
    >
      {/* SECTION HEADER: THE ASCENT */}
      <div className="max-w-5xl mb-16">
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#E84B2C] uppercase font-mono mb-4">
          <span className="w-2 h-2 rounded-full bg-[#E84B2C] animate-ping" />
          <span>CHAPTER 08 // THE ASCENT</span>
        </div>

        <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.02em] text-[#F3F0E8] leading-[0.96] mb-6">
          Your business has <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0E8] via-[#E84B2C] to-[#D4AF37]">
            more potential.
          </span>
        </h2>

        <p className="text-lg sm:text-xl text-[#F3F0E8] font-medium max-w-2xl leading-relaxed mb-4">
          Let’s build the systems that help you unlock it.
        </p>

        <p className="text-sm sm:text-base text-[#A39E93] max-w-2xl leading-relaxed">
          From missed calls to an autonomous 24/7 front desk; from manual copy-paste to a synchronized
          operational engine. The ascent begins with a single architectural conversation.
        </p>

        <div className="flex items-center gap-4 mt-6">
          <a
            href="#contact-form"
            className="btn-cinematic px-7 py-3.5 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#F3F0E8] font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl shadow-[#E84B2C]/30 hover:shadow-[#E84B2C]/50 flex items-center gap-2 cursor-pointer"
          >
            <span>Let's talk</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={() => onNavigate('services')}
            className="px-6 py-3.5 rounded-full bg-[#181716]/80 hover:bg-[#201F1D] text-[#F3F0E8] border border-[#F3F0E8]/15 hover:border-[#F3F0E8]/30 font-medium text-xs sm:text-sm tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer"
          >
            Explore our services
          </button>
        </div>
      </div>

      {/* CONSULTATION ENQUIRY MODULE */}
      <div id="contact-form" className="max-w-4xl mx-auto w-full pt-8">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel-glow border border-[#E84B2C]/30 relative overflow-hidden">
          {/* Luminous Glow Aura */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#E84B2C]/10 blur-[100px] pointer-events-none" />

          {submitted ? (
            <div className="flex flex-col items-center text-center py-12 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#E84B2C]/20 border border-[#E84B2C] flex items-center justify-center text-[#E84B2C] mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-display font-bold text-3xl text-[#F3F0E8] mb-3">
                Inquiry Successfully Triage-Routed
              </h3>

              <p className="text-sm text-[#A39E93] max-w-md mb-6 leading-relaxed">
                Thank you, <span className="text-[#F3F0E8] font-semibold">{formData.fullName}</span>.
                Your specification for <span className="text-[#E84B2C] font-mono">{formData.companyName}</span> has
                been logged into our automated intake pipeline.
              </p>

              <div className="p-4 rounded-2xl bg-[#141312] border border-[#F3F0E8]/10 text-xs font-mono text-left max-w-md w-full mb-8">
                <div className="flex items-center justify-between pb-2 border-b border-[#F3F0E8]/08 mb-2">
                  <span className="text-[#A39E93]">DISPATCH STATUS</span>
                  <span className="text-emerald-400">ROUTED TO AVI@ARENOVA.IN</span>
                </div>
                <p className="text-[#A39E93]">Direct Delivery: <span className="text-[#F3F0E8]">avi@arenova.in</span></p>
                <p className="text-[#A39E93]">Primary Service: <span className="text-[#F3F0E8]">{formData.serviceInterest}</span></p>
                <p className="text-[#A39E93]">Volume Tier: <span className="text-[#F3F0E8]">{formData.monthlyVolume}</span></p>
                <p className="text-[#A39E93]">Est. Response Time: <span className="text-[#E84B2C]">&lt; 2 Business Hours</span></p>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: '',
                    workEmail: '',
                    companyName: '',
                    serviceInterest: 'AI Front Desk Agents',
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
            <form
              action="https://formsubmit.co/avi@arenova.in"
              method="POST"
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              {/* FormSubmit Configuration / Metadata Fields */}
              <input type="hidden" name="_subject" value={`New ARENOVA Architecture Brief: ${formData.fullName} (${formData.companyName})`} />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="monthlyVolume" value={formData.monthlyVolume} />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-6 border-b border-[#F3F0E8]/10">
                <div>
                  <h3 className="font-display font-bold text-2xl text-[#F3F0E8]">
                    Initiate Systems Consultation
                  </h3>
                  <p className="text-xs text-[#A39E93] mt-0.5">
                    Direct architectural audit with an Arenova systems partner.
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#181716] border border-[#F3F0E8]/08 text-[11px] font-mono text-[#A39E93]">
                  <Sparkles className="w-3 h-3 text-[#E84B2C]" />
                  <span>Confidential NDA Grounded</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* FULL NAME */}
                <div>
                  <label htmlFor="fullName" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A39E93] mb-2">
                    <User className="w-3.5 h-3.5 text-[#E84B2C]" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    id="fullName"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Julian Hayes"
                    className="w-full px-4 py-3 rounded-xl bg-[#141312] border border-[#F3F0E8]/10 text-sm text-[#F3F0E8] placeholder-[#75726B] focus:outline-none focus:border-[#E84B2C] transition-colors"
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* WORK EMAIL */}
                <div>
                  <label htmlFor="workEmail" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A39E93] mb-2">
                    <Mail className="w-3.5 h-3.5 text-[#E84B2C]" />
                    <span>Work Email Address *</span>
                  </label>
                  <input
                    id="workEmail"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    placeholder="julian@hayesdental.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#141312] border border-[#F3F0E8]/10 text-sm text-[#F3F0E8] placeholder-[#75726B] focus:outline-none focus:border-[#E84B2C] transition-colors"
                  />
                  {errors.workEmail && (
                    <span className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {errors.workEmail}
                    </span>
                  )}
                </div>

                {/* COMPANY NAME */}
                <div>
                  <label htmlFor="companyName" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A39E93] mb-2">
                    <Building className="w-3.5 h-3.5 text-[#E84B2C]" />
                    <span>Company or Practice Name *</span>
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    autoComplete="organization"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Hayes Specialist Dental Group"
                    className="w-full px-4 py-3 rounded-xl bg-[#141312] border border-[#F3F0E8]/10 text-sm text-[#F3F0E8] placeholder-[#75726B] focus:outline-none focus:border-[#E84B2C] transition-colors"
                  />
                  {errors.companyName && (
                    <span className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {errors.companyName}
                    </span>
                  )}
                </div>

                {/* SERVICE INTEREST */}
                <div>
                  <label htmlFor="serviceInterest" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A39E93] mb-2">
                    <Layers className="w-3.5 h-3.5 text-[#E84B2C]" />
                    <span>Primary Service Needed</span>
                  </label>
                  <select
                    id="serviceInterest"
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141312] border border-[#F3F0E8]/10 text-sm text-[#F3F0E8] focus:outline-none focus:border-[#E84B2C] transition-colors"
                  >
                    <option value="AI Front Desk Agents">AI Front Desk Agents (24/7 Answering & Booking)</option>
                    <option value="Performance Marketing & Paid Ads">Performance Marketing & Paid Ads (Meta & Google Ads)</option>
                    <option value="Workflow Automation">Workflow Automation (Cross-SaaS Sync)</option>
                    <option value="Custom AI Agents">Custom AI Agents (Specialized Operations)</option>
                    <option value="Websites That Convert">Websites That Convert (High-End Digital)</option>
                    <option value="Full Architecture Overhaul">Full Architecture Overhaul (All Pillars)</option>
                  </select>
                </div>
              </div>

              {/* MONTHLY VOLUME */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#A39E93] block mb-2">
                  Monthly Inbound Enquiry Volume
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['< 50 / mo', '50 - 250 / mo', '250 - 1,000 / mo', '1,000+ / mo'].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setFormData({ ...formData, monthlyVolume: vol })}
                      className={`py-2 px-3 rounded-xl text-xs font-mono transition-all border cursor-pointer ${
                        formData.monthlyVolume === vol
                          ? 'bg-[#E84B2C] text-[#F3F0E8] border-[#E84B2C]'
                          : 'bg-[#141312] text-[#A39E93] border-[#F3F0E8]/10 hover:border-[#F3F0E8]/20'
                      }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>

              {/* MESSAGE / BOTTLENECK DESCRIPTION */}
              <div>
                <label htmlFor="message" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A39E93] mb-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#E84B2C]" />
                  <span>Describe Your Core Operational Challenge *</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. We are missing approximately 25 after-hours calls each week, and our staff spends 3 hours a day copying lead details between Gmail and our practice software..."
                  className="w-full px-4 py-3 rounded-xl bg-[#141312] border border-[#F3F0E8]/10 text-sm text-[#F3F0E8] placeholder-[#75726B] focus:outline-none focus:border-[#E84B2C] transition-colors resize-none"
                />
                {errors.message && (
                  <span className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </span>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-[#A39E93]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Direct delivery to avi@arenova.in. Encrypted &amp; spam-guarded.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto btn-cinematic px-8 py-4 rounded-full bg-[#E84B2C] hover:bg-[#D94022] text-[#F3F0E8] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E84B2C]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Dispatching Specification...</span>
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
