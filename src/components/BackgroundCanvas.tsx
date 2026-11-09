import React, { useEffect, useRef } from 'react';
import type { SceneController } from '../three/SceneController';

export const BackgroundCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SceneController | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let controller: SceneController | null = null;
    let scrollFrame = 0;
    let initialCleanup = () => {};
    let activeCleanup = () => {};

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined' && container) {
      observer = new IntersectionObserver(
        ([entry]) => {
          controller?.setVisible(entry.isIntersecting);
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    const startPhoenix = () => {
      if (disposed || controller) return;

      import('../three/SceneController').then(({ createSceneController }) => {
        if (disposed) return;
        const sceneController = createSceneController();
        if (!sceneController.init(container)) {
          sceneController.dispose();
          return;
        }
        controller = sceneController;
        controllerRef.current = sceneController;

        let lastScrollY = window.scrollY;
        let lastScrollTime = performance.now();
        let cachedScrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

        const updateScrollMetrics = () => {
          cachedScrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        };

        const progressAt = () => {
          return THREEClamp(window.scrollY / cachedScrollable);
        };

        const syncScroll = () => {
          const now = performance.now();
          const dt = Math.max((now - lastScrollTime) / 1000, 0.001);
          const currentY = window.scrollY;
          const velocity = ((currentY - lastScrollY) / cachedScrollable) / dt;
          lastScrollY = currentY;
          lastScrollTime = now;
          sceneController.setScrollProgress(progressAt(), velocity);
        };

        let mouseTicking = false;
        const handleMouseMove = (event: MouseEvent) => {
          if (!mouseTicking) {
            const mx = (event.clientX / window.innerWidth) * 2 - 1;
            const my = -(event.clientY / window.innerHeight) * 2 + 1;
            requestAnimationFrame(() => {
              sceneController.setMouse(mx, my);
              mouseTicking = false;
            });
            mouseTicking = true;
          }
        };

        const handleResize = () => {
          updateScrollMetrics();
          sceneController.resize();
          syncScroll();
        };
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleMotionPreference = () => sceneController.setReducedMotion(motionPreference.matches);
        const handleScroll = () => {
          if (scrollFrame) return;
          scrollFrame = requestAnimationFrame(() => {
            scrollFrame = 0;
            syncScroll();
          });
        };

        sceneController.setReducedMotion(motionPreference.matches);
        syncScroll();
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        motionPreference.addEventListener('change', handleMotionPreference);
        activeCleanup = () => {
          if (scrollFrame) cancelAnimationFrame(scrollFrame);
          observer?.disconnect();
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('resize', handleResize);
          motionPreference.removeEventListener('change', handleMotionPreference);
        };
      }).catch((error: unknown) => {
        console.warn('Phoenix experience could not be loaded.', error);
      });
    };

    // Start Phoenix immediately on mount so the hero kinetic sculpture is visible right away
    const initTimer = requestAnimationFrame(() => {
      startPhoenix();
    });

    initialCleanup = () => {
      cancelAnimationFrame(initTimer);
    };

    return () => {
      disposed = true;
      initialCleanup();
      activeCleanup();
      controller?.dispose();
      controllerRef.current = null;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 68% 48%, rgba(255, 103, 29, 0.14), transparent 46%), #080505' }}
    >
      <div ref={containerRef} className="w-full h-full max-md:opacity-70" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#080505]/20 to-[#080505]/80" />
      <div className="absolute top-1/2 left-[68%] -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full bg-[#ff6d00]/[.06] blur-[150px]" />
    </div>
  );
};

function THREEClamp(value: number) {
  return Math.max(0, Math.min(1, value));
}
