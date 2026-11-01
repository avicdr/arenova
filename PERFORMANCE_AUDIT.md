# ARENOVA.IN — PERFORMANCE ENGINEERING AUDIT & ROOT CAUSE ANALYSIS
**Date:** November 1, 2026  
**Auditor:** Principal Frontend Performance Engineer & React Architect  
**Domain:** `https://arenova.in`  

---

## 1. Existing Architecture & Stack Map

| Architectural Layer | Implementation | Notes |
|---|---|---|
| **Framework & Version** | React 19.3.1 (React DOM 19.3.1) | Running client-side hydration with prerendered semantic fallback in `index.html`. |
| **Build Engine** | Vite 8.3.5 / Rolldown / Tailwind CSS v4 | Build time ~470ms. Chunk splitting configured in `vite.config.ts`. |
| **Styling** | Tailwind CSS v4.3.3 (`@tailwindcss/vite`) | Custom obsidian/ember theme with luxury glassmorphism utilities (`src/index.css`). |
| **Animation & 3D** | Three.js 0.186.1, Lenis 1.3.27 | Cinematic articulated 3D phoenix model, PBR shaders, particle systems, smooth scrolling. |
| **Hosting & CDN** | GitHub Pages (`.github/workflows/deploy.yml`) with CNAME `arenova.in` | Serves static assets from `/dist`. Default CDN cache-control 600s. |
| **Routing Strategy** | Single-page continuous chapter journey | Dynamic in-page hash/scroll navigation (`#awakening`, `#problem`, `#services`, etc.). |

---

## 2. Initial Performance Baseline (November 1, 2026)

### Mobile (Throttled Moto G / Chrome Lighthouse)
- **Lighthouse Performance Score:** `47 / 100`
- **Total Blocking Time (TBT):** `37,860 ms` (Critical Failure)
- **Largest Contentful Paint (LCP):** `4.3 s`
- **First Contentful Paint (FCP):** `1.5 s`
- **Speed Index:** `8.7 s`
- **Cumulative Layout Shift (CLS):** `0.00`
- **Accessibility:** `89 / 100`
- **Best Practices:** `100 / 100`
- **SEO:** `100 / 100`

### Desktop
- **Lighthouse Performance Score:** `64 / 100`
- **Total Blocking Time (TBT):** `30,890 ms` (Critical Failure)
- **Largest Contentful Paint (LCP):** `0.7 s`
- **First Contentful Paint (FCP):** `0.4 s`
- **Speed Index:** `2.5 s`
- **Cumulative Layout Shift (CLS):** `0.028`
- **Accessibility:** `89 / 100`

---

## 3. Initial Bundle Composition & Asset Inventory

| Chunk / Asset | Raw Size | Gzip Size | Nature / Purpose | Critical Bottleneck |
|---|---|---|---|---|
| `vendor-three.js` | 551.15 kB | 136.66 kB | Three.js WebGL 3D Core | Synchronous eager import on mount; blocks main thread |
| `vendor-react.js` | 218.74 kB | 68.27 kB | React 19 Core & React DOM | Main execution block attributed during TBT |
| `index.js` (App) | 89.57 kB | 24.43 kB | UI Components & Sections | Rerendered repeatedly due to scroll state |
| `SceneController.js` | 38.96 kB | 14.38 kB | Phoenix kinematics & math | Heavy matrix calculations & buffer attributes |
| `index.css` | 40.83 kB | 7.80 kB | Tailwind styles & utilities | Critical styles |
| `public/metadata.png` | 1,685.08 kB | Uncompressed | Open Graph image | 1.68 MB data transfer; resized to 1200x630 (219 kB PNG, 86 kB WebP) |
| `public/arenova.png` | 137.41 kB | Uncompressed | Brand Logo (1587x1587) | Overkill for 48px header display; resized to 128px/256px variants |
| Google Fonts (External) | ~60 kB (3 CSS + WOFF2) | Transferred | Syne, Plus Jakarta Sans, Cinzel | Render-blocking critical request chain (~1,509ms latency) |

---

## 4. Root Cause Analysis: The 5 Critical Killers

### A. Root Re-rendering on Scroll (`App.tsx` State Propagation)
- **Root Cause:** `App.tsx` stored `scrollProgress` in root React state (`const [scrollProgress, setScrollProgress] = useState(0)`).
- **Impact:** On every single wheel tick, `App` re-rendered the entire tree (Navigation, HeroSection, ProblemSection, ServicesSection, WorkflowDemoSection, IndustriesSection, AscentSection, FooterSection).
- **Irony:** `scrollProgress` was never even consumed by `Navigation.tsx`. The 3D canvas had its own internal listener. This generated hundreds of redundant React reconciliations during user interactions.

### B. Layout Thrashing & Forced Reflows (~94ms)
- **Root Cause:** Both `App.tsx` and `BackgroundCanvas.tsx` called `document.documentElement.scrollHeight - window.innerHeight` on high-frequency scroll ticks.
- **Impact:** Reading `scrollHeight` immediately after React DOM writes forced the browser engine to perform synchronous layout recalculations and reflows.

### C. Uncontrolled Main-Thread Three.js Initialization
- **Root Cause:** `BackgroundCanvas.tsx` fired `import('../three/SceneController')` synchronously in `useEffect` on page mount.
- **Impact:** On low-power mobile CPUs, downloading 550 kB of Three.js, compiling shaders, allocating 520 particle arrays, and calculating Catmull-Rom curves pegged the CPU at 100% capacity right when Lighthouse was measuring FCP and TBT.

### D. Continuous Main-Thread Loops (Lenis + 60fps RAF)
- **Root Cause:** Lenis smooth scrolling was running an infinite `requestAnimationFrame` loop on mobile touch devices.
- **Impact:** Touch devices have hardware momentum scrolling built in. Lenis was consuming CPU cycles every 16ms even when idle, inflating TBT to 37,860ms.

### E. Render-Blocking External Webfonts
- **Root Cause:** Synchronous `<link rel="stylesheet">` to `fonts.googleapis.com` requesting unused font family `Cinzel` and multiple unused weights.
- **Impact:** Network dependency tree showed 1,509ms critical latency before initial text rendering.

---

## 5. Prioritized Engineering Action Plan

1. **State Isolation & Component Decoupling:**
   - Remove unused `scrollProgress` state from `App.tsx`.
   - Wrap `handleNavigate` in `useCallback`.
   - Apply `React.memo` to all major sections (`HeroSection`, `ProblemSection`, `ServicesSection`, `WorkflowDemoSection`, `IndustriesSection`, `AscentSection`, `FooterSection`).

2. **Elimination of Forced Reflows:**
   - Cache document scrollable height. Only recalculate on window resize or debounced layout mutation.
   - Zero DOM reads inside high-frequency scroll loops.

3. **Adaptive 3D Performance Architecture:**
   - Tiered hardware profiling (`HIGH`, `MEDIUM`, `LOW` based on cores, memory, touch, and reduced motion).
   - Defer Three.js loading until after initial critical render window via `requestIdleCallback` (or post-first-interaction on mobile).
   - Reduce mobile particle count to 48–80 (desktop 220), cap mobile DPR at 1.0, and pause render loop when off-screen or idle.

4. **Self-Hosted Variable WOFF2 Fonts:**
   - Download Latin WOFF2 subsets for `Syne` and `Plus Jakarta Sans` into `public/fonts/`.
   - Declare local `@font-face` with `font-display: swap`. Preload critical `syne-bold.woff2`.
   - Remove all external Google Fonts HTTP requests.

5. **Responsive Modern Image Delivery:**
   - Deploy `arenova-128.webp` (2.8 kB) and `arenova-256.webp` (7.6 kB) with `<picture>` and `srcset`.
   - Explicit `width` and `height` on all images to guarantee zero CLS.

6. **Accessibility & Contrast Compliance:**
   - Add explicit `id` and `htmlFor` associations on all audit form elements (`serviceInterest`, `monthlyVolume`, etc.).
   - Elevate badge and CTA button contrast ratios to meet WCAG AA standards (≥ 4.5:1).

7. **Production Verification & Lighthouse Audit:**
   - Verify build, TypeScript, zero console errors, and execute fresh Lighthouse audits on mobile and desktop.
