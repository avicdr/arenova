import { useEffect, useState, useRef, useCallback } from 'react';
import type Lenis from 'lenis';
import { Navigation } from './components/Navigation';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ServicesSection } from './components/ServicesSection';
import { WorkflowDemoSection } from './components/WorkflowDemoSection';
import { IndustriesSection } from './components/IndustriesSection';
import { AscentSection } from './components/AscentSection';
import { FooterSection } from './components/FooterSection';
import { Analytics } from './components/Analytics';

export function App() {
  const [activeSection, setActiveSection] = useState('awakening');
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll conditionally on desktop with fine pointer only
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchOrMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (prefersReducedMotion || isTouchOrMobile) {
      return;
    }

    let disposed = false;
    let rafId = 0;

    import('lenis').then(({ default: LenisClass }) => {
      if (disposed) return;
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

    return () => {
      disposed = true;
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
        <WorkflowDemoSection onNavigate={handleNavigate} />

        {/* INDUSTRIES */}
        <IndustriesSection onNavigate={handleNavigate} />

        {/* GET AN AUDIT / CONSULTATION BRIEF */}
        <AscentSection onNavigate={handleNavigate} />
      </main>

      {/* FOOTER */}
      <FooterSection onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
