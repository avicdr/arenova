import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RouterContextType {
  pathname: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  pathname: '/',
  navigate: () => {},
});

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pathname, setPathname] = useState(() => {
    if (typeof window === 'undefined') return '/';
    return window.location.pathname.replace(/\/$/, '') || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const clean = window.location.pathname.replace(/\/$/, '') || '/';
      setPathname(clean);
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
    const targetPath = (pathPart.replace(/\/$/, '') || '/');
    const currentPath = (window.location.pathname.replace(/\/$/, '') || '/');

    if (targetPath === currentPath) {
      if (hashPart) {
        const el = document.getElementById(hashPart);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `#${hashPart}`);
          return;
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', targetPath);
      }
    } else {
      window.history.pushState(null, '', to);
      setPathname(targetPath);
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

