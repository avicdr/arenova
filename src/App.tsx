import { useEffect, useState, useRef, useCallback, lazy, Suspense } from 'react';
import type Lenis from 'lenis';
import { Navigation } from './components/Navigation';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ServicesSection } from './components/ServicesSection';
import { Analytics } from './components/Analytics';

// Code-split heavy below-the-fold interactive components to eliminate main-thread long tasks during initial hydration
const WorkflowDemoSection = lazy(() => import('./components/WorkflowDemoSection').then((m) => ({ default: m.WorkflowDemoSection })));
const IndustriesSection = lazy(() => import('./components/IndustriesSection').then((m) => ({ default: m.IndustriesSection })));
const AscentSection = lazy(() => import('./components/AscentSection').then((m) => ({ default: m.AscentSection })));
const FooterSection = lazy(() => import('./components/FooterSection').then((m) => ({ default: m.FooterSection })));

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
      {shouldRender ? (
        <Suspense fallback={null}>
          {children}
        </Suspense>
      ) : null}
    </div>
  );
}

export function App() {
  const [activeSection, setActiveSection] = useState('awakening');
  const [mountBelowFold, setMountBelowFold] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll on desktop upon user interaction
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchOrMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (prefersReducedMotion || isTouchOrMobile) {
      return;
    }

    let disposed = false;
    let rafId = 0;

    const startLenis = () => {
      if (disposed || lenisRef.current) return;
      cleanupTriggers();

      import('lenis').then(({ default: LenisClass }) => {
        if (disposed || lenisRef.current) return;
        const lenis = new LenisClass({
          duration: 1.0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1.15,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      });
    };

    const cleanupTriggers = () => {
      window.removeEventListener('wheel', startLenis);
      window.removeEventListener('scroll', startLenis);
    };

    window.addEventListener('wheel', startLenis, { passive: true, once: true });
    window.addEventListener('scroll', startLenis, { passive: true, once: true });

    return () => {
      disposed = true;
      cleanupTriggers();
      if (rafId) cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    const sectionIds = [
      'awakening',
      'problem',
      'services',
      'workflow-demo',
      'industries',
      'ascent',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    setMountBelowFold(true);
    requestAnimationFrame(() => {
      if (sectionId === 'contact') {
        const contactEl = document.getElementById('contact-form') || document.getElementById('ascent');
        if (contactEl) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(contactEl, { offset: -80 });
          } else {
            contactEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
        return;
      }

      const targetEl = document.getElementById(sectionId);
      if (targetEl) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(targetEl, { offset: -60 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#111110] text-[#F3F0E8] overflow-x-hidden selection:bg-[#E84B2C] selection:text-white">
      {/* ANALYTICS INJECTION (CONFIG-AWARE) */}
      <Analytics />

      {/* PERSISTENT 3D PHOENIX & ENVIRONMENTAL CANVAS */}
      <BackgroundCanvas />

      {/* TOP FLOATING NAVIGATION */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* MAIN PUNCHY CONTENT FLOW */}
      <main className="relative z-10 flex flex-col w-full max-w-7xl mx-auto">
        {/* HERO */}
        <HeroSection onNavigate={handleNavigate} />

        {/* THE BOTTLENECKS */}
        <ProblemSection onNavigate={handleNavigate} />

        {/* WHAT WE BUILD / 3 CORE PILLARS */}
        <ServicesSection onNavigate={handleNavigate} />

        {/* SEE THE SYSTEM WORK (INTERACTIVE BROWSER LAB) */}
        <LazySection forceMount={mountBelowFold} minHeight="720px">
          <WorkflowDemoSection onNavigate={handleNavigate} />
        </LazySection>

        {/* PROVEN RESULTS ACROSS SECTORS */}
        <LazySection forceMount={mountBelowFold} minHeight="540px">
          <IndustriesSection onNavigate={handleNavigate} />
        </LazySection>

        {/* CONSULTATION & APPOINTMENT BOOKING */}
        <LazySection forceMount={mountBelowFold} minHeight="680px">
          <AscentSection onNavigate={handleNavigate} />
        </LazySection>
      </main>

      {/* FOOTER */}
      <LazySection forceMount={mountBelowFold} minHeight="240px">
        <FooterSection onNavigate={handleNavigate} />
      </LazySection>
    </div>
  );
}

export default App;
