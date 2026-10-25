import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import arenovaLogo from '../../arenova.png';

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
              <img
                src={arenovaLogo}
                alt="ARENOVA Brand Emblem"
                width="40"
                height="40"
                className="h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(232,75,44,0.3)]"
              />
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
            <nav aria-label="Core Services" className="flex flex-col gap-3">
              <span className="uppercase tracking-widest text-[#E84B2C] font-bold">
                Services
              </span>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('services');
                }}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                AI Front Desk Agents
              </a>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('services');
                }}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                Workflow Automation
              </a>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('services');
                }}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                Custom AI Agents
              </a>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('services');
                }}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                Google Ads & Growth
              </a>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('services');
                }}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                Websites That Convert
              </a>
            </nav>

            {/* EXPLORATION */}
            <nav aria-label="Journey Sections" className="flex flex-col gap-3">
              <span className="uppercase tracking-widest text-[#E84B2C] font-bold">
                Journey
              </span>
              <a
                href="#awakening"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('awakening');
                }}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                01 Awakening
              </a>
              <a
                href="#problem"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('problem');
                }}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                02 The Problem
              </a>
              <a
                href="#transformation"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('transformation');
                }}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                03 Transformation
              </a>
              <a
                href="#workflow-demo"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('workflow-demo');
                }}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                04 System Demo
              </a>
              <a
                href="#industries"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('industries');
                }}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                05 Industries
              </a>
              <a
                href="#approach"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('approach');
                }}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                06 Delivery Approach
              </a>
              <a
                href="#ascent"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('ascent');
                }}
                className="text-left text-[#A39E93] hover:text-[#F3F0E8] transition-colors cursor-pointer"
              >
                07 The Ascent
              </a>
            </nav>

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
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('contact');
                  }}
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
          <p>© 2026 ARENOVA. All systems engineered with precision.</p>
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
