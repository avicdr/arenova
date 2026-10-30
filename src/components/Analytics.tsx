import React, { useEffect } from 'react';
import { SEO_CONFIG } from '../config/seo';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Non-blocking, privacy-conscious Google Analytics 4 integration.
 * Injects gtag.js asynchronously ONLY when a valid VITE_GA4_ID is provided.
 * Does not block main thread rendering or degrade Core Web Vitals (LCP/INP).
 */
export const Analytics: React.FC = () => {
  const measurementId = SEO_CONFIG.analytics.ga4MeasurementId;

  useEffect(() => {
    if (!measurementId || typeof window === 'undefined') return;

    // Prevent duplicate injection
    if (document.getElementById('ga4-script')) return;

    // Load gtag script asynchronously
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', measurementId, {
      anonymize_ip: true,
      send_page_view: true,
    });
  }, [measurementId]);

  return null;
};
