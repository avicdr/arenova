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
    <main>
      <HeroSection onNavigate={onNavigate} />
      <ProblemSection />
      <ServicesSection onNavigate={onNavigate} />
      <WorkflowDemoSection />
      <IndustriesSection />
      <AscentSection />
    </main>
  );
});

HomePage.displayName = 'HomePage';
