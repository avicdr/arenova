import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { ProblemSection } from '../components/ProblemSection';
import { ServicesSection } from '../components/ServicesSection';
import { WorkflowDemoSection } from '../components/WorkflowDemoSection';
import { IndustriesSection } from '../components/IndustriesSection';
import { AscentSection } from '../components/AscentSection';

interface HomePageProps {
  onNavigate: (sectionId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = React.memo(({ onNavigate }) => {
  return (
    <main className="relative z-10 flex flex-col w-full max-w-7xl mx-auto">
      {/* HERO */}
      <HeroSection onNavigate={onNavigate} />

      {/* THE BOTTLENECKS */}
      <ProblemSection onNavigate={onNavigate} />

      {/* WHAT WE BUILD / 3 CORE PILLARS */}
      <ServicesSection onNavigate={onNavigate} />

      {/* SEE THE SYSTEM WORK (INTERACTIVE BROWSER LAB) */}
      <div className="cv-auto">
        <WorkflowDemoSection onNavigate={onNavigate} />
      </div>

      {/* PROVEN RESULTS ACROSS SECTORS */}
      <div className="cv-auto">
        <IndustriesSection onNavigate={onNavigate} />
      </div>

      {/* CONSULTATION & APPOINTMENT BOOKING */}
      <div className="cv-auto">
        <AscentSection onNavigate={onNavigate} />
      </div>
    </main>
  );
});

HomePage.displayName = 'HomePage';
