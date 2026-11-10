import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export function render(pathname: '/' | '/pricing' | '/about'): string {
  return renderToString(
    <StrictMode>
      <App initialPathname={pathname} />
    </StrictMode>
  );
}
