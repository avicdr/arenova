import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const rootEl = document.getElementById('root')!;
const hasPrerenderedContent = Array.from(rootEl.childNodes).some(
  (node) => node.nodeType === Node.ELEMENT_NODE
);

const appElement = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (hasPrerenderedContent) {
  hydrateRoot(rootEl, appElement);
} else {
  createRoot(rootEl).render(appElement);
}
