/* oxlint-disable react/only-export-components -- Provider and its hook intentionally share this module. */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CanonicalRouteKey } from '../config/seo';
import { ROUTE_SEO } from '../config/seo';
import { generateSchemaGraph } from '../seo/schema';

const VALID_ROUTES: CanonicalRouteKey[] = [
  '/',
  '/pricing',
  '/about',
  '/us',
  '/privacy',
  '/terms',
  '/services/ai-automation',
  '/services/ai-integration',
  '/services/ai-agents',
  '/services/business-process-automation',
  '/services/ai-workflow-automation',
  '/services/crm-automation',
  '/services/custom-ai-development',
  '/services/ai-chatbot-development',
  '/services/ai-voice-agents',
  '/services/whatsapp-automation',
  '/services/ai-customer-support',
  '/services/ai-sales-automation',
  '/industries/real-estate',
  '/industries/b2b-services',
  '/industries/healthcare',
  '/industries/recruitment',
  '/industries/marketing-agencies',
  '/industries/saas',
  '/tools/automation-roi-calculator',
  '/blog',
  '/blog/deterministic-ai-playbook',
  '/blog/ai-agents-vs-chatbots',
  '/blog/calculating-automation-roi',
  '/blog/ai-automation-cost',
  '/blog/ai-agent-evaluation-checklist',
  '/blog/n8n-vs-custom-code',
  '/blog/ai-crm-integration-guide',
  '/blog/how-to-choose-ai-automation-agency',
];

export function normalizeRouteKey(rawPath: string): CanonicalRouteKey {
  const cleaned = rawPath
    .split('#')[0]
    .split('?')[0]
    .replace(/\/index\.html$/, '')
    .replace(/\/+$/, '');

  const matched = VALID_ROUTES.find((r) => r === cleaned || (r === '/' && cleaned === ''));
  return matched || '/';
}

export function getCanonicalHrefPath(routeKey: CanonicalRouteKey): string {
  if (routeKey === '/') return '/';
  return `${routeKey}/`;
}

interface RouterContextType {
  pathname: CanonicalRouteKey;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  pathname: '/',
  navigate: () => {},
});

function syncHeadForRoute(routeKey: CanonicalRouteKey) {
  if (typeof document === 'undefined') return;
  const meta = ROUTE_SEO[routeKey] || ROUTE_SEO['/'];

  document.title = meta.title;

  const setMeta = (selector: string, attr: string, value: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute(attr, value);
    }
  };

  setMeta('meta[name="title"]', 'content', meta.title);
  setMeta('meta[name="description"]', 'content', meta.description);
  setMeta('meta[name="keywords"]', 'content', meta.keywords);
  setMeta('link[rel="canonical"]', 'href', meta.canonicalUrl);
  setMeta('meta[property="og:url"]', 'content', meta.canonicalUrl);
  setMeta('meta[property="og:title"]', 'content', meta.title);
  setMeta('meta[property="og:description"]', 'content', meta.description);
  setMeta('meta[name="twitter:url"]', 'content', meta.canonicalUrl);
  setMeta('meta[name="twitter:title"]', 'content', meta.title);
  setMeta('meta[name="twitter:description"]', 'content', meta.description);

  const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
  if (jsonLdScript) {
    jsonLdScript.textContent = JSON.stringify(generateSchemaGraph(routeKey), null, 2);
  }
}

export const RouterProvider: React.FC<{ children: React.ReactNode; initialPathname?: CanonicalRouteKey }> = ({
  children,
  initialPathname,
}) => {
  const [pathname, setPathname] = useState<CanonicalRouteKey>(() => {
    if (initialPathname) return initialPathname;
    if (typeof window !== 'undefined') {
      return normalizeRouteKey(window.location.pathname);
    }
    return '/';
  });

  const navigate = useCallback((to: string) => {
    if (typeof window === 'undefined') return;

    if (to.includes('#') && !to.startsWith('/#')) {
      const parts = to.split('#');
      const routePart = parts[0];
      const hashPart = parts[1];
      const targetRoute = normalizeRouteKey(routePart);

      if (window.location.pathname !== getCanonicalHrefPath(targetRoute)) {
        window.history.pushState(null, '', `${getCanonicalHrefPath(targetRoute)}#${hashPart}`);
        setPathname(targetRoute);
        syncHeadForRoute(targetRoute);
      }
      setTimeout(() => {
        const el = document.getElementById(hashPart);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return;
    }

    if (to.startsWith('/#')) {
      const hash = to.replace('/#', '');
      if (window.location.pathname !== '/') {
        window.history.pushState(null, '', `/#${hash}`);
        setPathname('/');
        syncHeadForRoute('/');
      } else {
        window.history.pushState(null, '', `/#${hash}`);
      }
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return;
    }

    const nextRoute = normalizeRouteKey(to);
    const targetHref = getCanonicalHrefPath(nextRoute);

    if (window.location.pathname !== targetHref) {
      window.history.pushState(null, '', targetHref);
      setPathname(nextRoute);
      syncHeadForRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const currentRoute = normalizeRouteKey(window.location.pathname);
      setPathname(currentRoute);
      syncHeadForRoute(currentRoute);
    };

    window.addEventListener('popstate', handlePopState);
    syncHeadForRoute(pathname);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [pathname]);

  return <RouterContext.Provider value={{ pathname, navigate }}>{children}</RouterContext.Provider>;
};

export const useRouter = () => useContext(RouterContext);
