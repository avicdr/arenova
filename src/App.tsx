import { useEffect, useState, useRef, useCallback, lazy, Suspense } from 'react';
import type Lenis from 'lenis';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navigation } from './components/Navigation';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Analytics } from './components/Analytics';
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';

const FooterSection = lazy(() =>
  import('./components/FooterSection').then((m) => ({ default: m.FooterSection }))
);

function AppContent() {
  const { pathname, navigate } = useRouter();
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

  // Update active section based on scroll position (when on homepage)
  useEffect(() => {
    if (pathname !== '/') return;

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
  }, [pathname]);

  const handleNavigate = useCallback(
    (sectionId: string) => {
      setMountBelowFold(true);

      if (pathname !== '/') {
        navigate(`/#${sectionId === 'contact' ? 'ascent' : sectionId}`);
        return;
      }

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
    },
    [pathname, navigate]
  );

  return (
    <div className="relative min-h-screen bg-[#111110] text-[#F3F0E8] overflow-x-hidden selection:bg-[#E84B2C] selection:text-white">
      {/* ANALYTICS INJECTION (CONFIG-AWARE) */}
      <Analytics />

      {/* PERSISTENT 3D PHOENIX & ENVIRONMENTAL CANVAS */}
      <BackgroundCanvas />

      {/* TOP FLOATING NAVIGATION */}
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

      {/* ROUTE-BASED CONTENT */}
      {pathname === '/pricing' ? (
        <PricingPage onNavigate={handleNavigate} />
      ) : pathname === '/about' ? (
        <AboutPage onNavigate={handleNavigate} />
      ) : (
        <HomePage onNavigate={handleNavigate} mountBelowFold={mountBelowFold} />
      )}

      {/* FOOTER */}
      <Suspense fallback={null}>
        <FooterSection onNavigate={handleNavigate} />
      </Suspense>
    </div>
  );
}

export function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

export default App;
