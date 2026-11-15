import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import type { CanonicalRouteKey } from './config/seo';

export function render(pathname: CanonicalRouteKey = '/'): string {
  return renderToString(
    <StrictMode>
      <App initialPathname={pathname} />
    </StrictMode>
  );
}
