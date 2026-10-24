import React from 'react';
import { Flame, ArrowUpRight } from 'lucide-react';

interface FooterSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onNavigate }) => {
  return (
    <footer className="relative w-full bg-[#0D0D0C] border-t border-[#F3F0E8]/08 pt-20 pb-12 px-6 sm:px-10 lg:px-16 z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* TOP ROW: BRAND & MANIFESTO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1A1918] border border-[#E84B2C]/40 flex items-center justify-center">
                <Flame className="w-4 h-4 text-[#E84B2C]" />
              </div>
              <span className="font-display tracking-[0.22em] text-2xl font-bold text-[#F3F0E8]">
                ARENOVA
              </span>
            </div>

            <p className="font-serif-display text-xl sm:text-2xl text-[#F3F0E8] leading-snug">
              "RISE BEYOND ROUTINE."
            </p>

            <p className="text-sm text-[#A39E93] leading-relaxed max-w-sm">
              Arenova builds AI-powered operations, intelligent front desk experiences, and digital
              growth systems that help businesses move forward.
            </p>

            {/* LIVE SYSTEM STATUS */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#161514] border border-[#F3F0E8]/08 text-xs font-mono text-[#A39E93] w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All automation clusters operational — 99.98% SLA</span>
            </div>
          </div>

          {/* COLUMNS */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            {/* CORE DISCIPLINES */}
            <div className="flex flex-col gap-3">
              <span className="uppercase tracking-widest text-[#E84B2C] font-bold">
                Services
              </span>
              <button
                onClick={() => onNavigate('services')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                AI Front Desk Agents
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                Workflow Automation
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                Custom AI Agents
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                Google Ads & Growth
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                Websites That Convert
              </button>
            </div>

            {/* EXPLORATION */}
            <div className="flex flex-col gap-3">
              <span className="uppercase tracking-widest text-[#E84B2C] font-bold">
                Journey
              </span>
              <button
                onClick={() => onNavigate('awakening')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                01 Awakening
              </button>
              <button
                onClick={() => onNavigate('problem')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                02 The Problem
              </button>
              <button
                onClick={() => onNavigate('transformation')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                03 Transformation
              </button>
              <button
                onClick={() => onNavigate('workflow-demo')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                04 System Demo
              </button>
              <button
                onClick={() => onNavigate('industries')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                05 Industries
              </button>
              <button
                onClick={() => onNavigate('approach')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                06 Delivery Approach
              </button>
              <button
                onClick={() => onNavigate('ascent')}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                07 The Ascent
              </button>
            </div>

            {/* HUBS & CONNECT */}
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="uppercase tracking-widest text-[#E84B2C] font-bold">
                Deployments
              </span>
              <p className="text-[#A39E93]">Global Inbound Systems</p>
              <p className="text-[#A39E93]">Custom API Integrations</p>
              <p className="text-[#A39E93]">Cloud Infrastructure</p>
              <div className="pt-3">
                <a
                  href="#contact-form"
                  className="inline-flex items-center gap-1.5 text-[#E84B2C] hover:underline"
                >
                  <span>Request System Audit</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM METRICS & COPYRIGHT */}
        <div className="pt-8 border-t border-[#F3F0E8]/08 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A39E93]">
          <p>© {new Date().getFullYear()} ARENOVA. All systems engineered with precision.</p>
          <div className="flex items-center gap-6">
            <span>Security: Zero-Trust TLS 1.3</span>
            <span>•</span>
            <span>Engine: Three.js WebGL Core</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
