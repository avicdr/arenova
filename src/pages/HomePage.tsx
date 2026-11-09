import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { ProblemSection } from '../components/ProblemSection';
import { ServicesSection } from '../components/ServicesSection';

// Code-split heavy below-the-fold interactive components to eliminate main-thread long tasks during initial hydration
const WorkflowDemoSection = lazy(() =>
  import('../components/WorkflowDemoSection').then((m) => ({ default: m.WorkflowDemoSection }))
);
const IndustriesSection = lazy(() =>
  import('../components/IndustriesSection').then((m) => ({ default: m.IndustriesSection }))
);
const AscentSection = lazy(() =>
  import('../components/AscentSection').then((m) => ({ default: m.AscentSection }))
);

function LazySection({
  children,
  forceMount,
  minHeight = '320px',
}: {
  children: React.ReactNode;
  forceMount?: boolean;
  minHeight?: string;
}) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView || forceMount) return;
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, forceMount]);

  const shouldRender = inView || forceMount;

  return (
    <div ref={containerRef} style={shouldRender ? undefined : { minHeight }}>
      {shouldRender ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
}

interface HomePageProps {
  onNavigate: (sectionId: string) => void;
  mountBelowFold: boolean;
}

export const HomePage: React.FC<HomePageProps> = React.memo(({ onNavigate, mountBelowFold }) => {
  return (
    <main className="relative z-10 flex flex-col w-full max-w-7xl mx-auto">
      {/* HERO */}
      <HeroSection onNavigate={onNavigate} />

      {/* THE BOTTLENECKS */}
      <ProblemSection onNavigate={onNavigate} />

      {/* WHAT WE BUILD / 3 CORE PILLARS */}
      <ServicesSection onNavigate={onNavigate} />

      {/* SEE THE SYSTEM WORK (INTERACTIVE BROWSER LAB) */}
      <LazySection forceMount={mountBelowFold} minHeight="720px">
        <WorkflowDemoSection onNavigate={onNavigate} />
      </LazySection>

      {/* PROVEN RESULTS ACROSS SECTORS */}
      <LazySection forceMount={mountBelowFold} minHeight="540px">
        <IndustriesSection onNavigate={onNavigate} />
      </LazySection>

      {/* CONSULTATION & APPOINTMENT BOOKING */}
      <LazySection forceMount={mountBelowFold} minHeight="680px">
        <AscentSection onNavigate={onNavigate} />
      </LazySection>
    </main>
  );
});

HomePage.displayName = 'HomePage';

