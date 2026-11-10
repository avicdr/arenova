import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ROUTE_SEO } from '../config/seo';
import { generateSchemaGraph } from '../seo/schema';

type CanonicalRouteKey = '/' | '/pricing' | '/about';

function normalizeRouteKey(rawPath: string): CanonicalRouteKey {
  const cleaned = rawPath
    .split('#')[0]
    .split('?')[0]
    .replace(/\/index\.html$/, '')
    .replace(/\/+$/, '');

  if (cleaned === '/pricing') return '/pricing';
  if (cleaned === '/about') return '/about';
  return '/';
}

function getCanonicalHrefPath(routeKey: CanonicalRouteKey): string {
  if (routeKey === '/pricing') return '/pricing/';
  if (routeKey === '/about') return '/about/';
  return '/';
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
  const meta = ROUTE_SEO[routeKey];

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
    jsonLdScript.textContent = JSON.stringify(generateSchemaGraph(routeKey));
  }
}

export const RouterProvider: React.FC<{
  children: React.ReactNode;
  initialPathname?: string;
}> = ({ children, initialPathname }) => {
  const [pathname, setPathname] = useState<CanonicalRouteKey>(() => {
    if (typeof window === 'undefined') {
      return normalizeRouteKey(initialPathname || '/');
    }
    return normalizeRouteKey(window.location.pathname);
  });

  // Synchronize <head> canonical, title, description, OG & JSON-LD with active route
  useEffect(() => {
    syncHeadForRoute(pathname);
  }, [pathname]);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(normalizeRouteKey(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('//')) {
      window.location.href = to;
      return;
    }

    const [pathPart, hashPart] = to.split('#');
    const targetRoute = normalizeRouteKey(pathPart || '/');
    const canonicalPath = getCanonicalHrefPath(targetRoute);
    const currentRoute = normalizeRouteKey(window.location.pathname);
    const browserTarget = hashPart ? `${canonicalPath}#${hashPart}` : canonicalPath;

    if (targetRoute === currentRoute) {
      if (hashPart) {
        const el = document.getElementById(hashPart);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `#${hashPart}`);
          return;
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', canonicalPath);
      }
    } else {
      window.history.pushState(null, '', browserTarget);
      setPathname(targetRoute);
      if (hashPart) {
        setTimeout(() => {
          const el = document.getElementById(hashPart);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0 });
          }
        }, 150);
      } else {
        window.scrollTo({ top: 0 });
      }
    }
  }, []);

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);
