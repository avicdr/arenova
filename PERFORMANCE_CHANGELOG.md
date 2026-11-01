# ARENOVA.IN — PERFORMANCE OPTIMIZATION CHANGELOG
**Date:** November 2, 2026  
**Engineering Discipline:** Performance Engineering, React Optimization, WebGL & Asset Architecture  

---

## 1. Summary of Changes by File

### `index.html`
- **Typography:** Removed render-blocking external Google Fonts stylesheet requests to `fonts.googleapis.com` and `fonts.gstatic.com`.
- **Preloading:** Added critical `<link rel="preload">` directives for self-hosted `/fonts/syne-bold.woff2` and `/fonts/plus-jakarta-sans.woff2`.
- **OpenGraph Dimensions:** Updated `og:image:width` to `1200` and `og:image:height` to `630` matching optimized metadata image dimensions.

### `src/index.css`
- **Self-Hosted `@font-face`:** Added definitions for `Syne` (weights 600-800) and `Plus Jakarta Sans` (weights 400-700) using local `/fonts/*.woff2` with `font-display: swap` and unicode-range targeting Latin characters.
- **Font Fallbacks:** Updated `.font-display` and `.font-body` to include modern system font fallbacks (`system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto`) to eliminate FOUT and layout shifts.
- **Dead Style Cleanup:** Removed unused `.font-serif-display` (`Cinzel`) rule.

### `src/App.tsx`
- **Root State Decoupling:** Removed `scrollProgress` and `progressPercentRef` from root React state. This eliminates hundreds of redundant component tree re-renders during scrolling.
- **Touch-Aware Lenis:** Converted `Lenis` from a static bundle import to a conditional dynamic import (`import('lenis')`). Disabled Lenis on mobile/touch screens (`pointer: coarse` or `< 768px`) to allow native 120Hz/60Hz hardware momentum scrolling.
- **Callback Memoization:** Wrapped `handleNavigate` in `useCallback` to maintain referential equality across renders.

### `src/components/Navigation.tsx`
- **Component Memoization:** Wrapped `Navigation` in `React.memo`.
- **Scroll Optimization:** Batched header scroll background state updates via `requestAnimationFrame`.
- **Responsive Logo:** Replaced 134 kB bundled logo with `<picture>` utilizing modern responsive WebP formats (`/arenova-128.webp` 1x, `/arenova-256.webp` 2x) and exact width/height attributes.
- **Accessibility & Contrast:** Updated CTA button and mobile Audit pill to `text-[#111110] font-bold bg-[#E84B2C]` achieving 4.92:1 WCAG AA contrast compliance.

### `src/components/HeroSection.tsx`
- **Component Memoization:** Wrapped in `React.memo`.
- **Accessibility & Contrast:** Upgraded CTA button to `text-[#111110] font-bold` for 4.92:1 contrast against `#E84B2C`.

### `src/components/ProblemSection.tsx`
- **Component Memoization:** Wrapped in `React.memo`.
- **Accessibility & Contrast:** Updated bottleneck badges (`LEAD LEAK`, `CONVERSION FAILURE`, `CAPACITY DRAIN`) from low-contrast red to `#FFAA3D` font-semibold (6.2:1 contrast). Upgraded CTA button text to `text-[#111110] font-bold`.

### `src/components/ServicesSection.tsx`
- **Component Memoization:** Wrapped in `React.memo`.
- **Accessibility & Contrast:** Updated CTA button to `text-[#111110] font-bold`.

### `src/components/WorkflowDemoSection.tsx`
- **Component Memoization:** Wrapped in `React.memo`.
- **Scenario Tabs Contrast:** Changed active scenario tab text to `text-[#111110] font-bold` on `#E84B2C` background (4.92:1 contrast).
- **CTA Contrast:** Updated CTA button to `text-[#111110] font-bold`.

### `src/components/IndustriesSection.tsx`
- **Component Memoization:** Wrapped in `React.memo`.
- **CTA Contrast:** Updated CTA button to `text-[#111110] font-bold`.

### `src/components/AscentSection.tsx`
- **Component Memoization:** Wrapped in `React.memo`.
- **Accessible Form Controls:** Linked `<label htmlFor="...">` to matching `id` attributes on all form elements (`fullName`, `workEmail`, `companyName`, `serviceInterest`, `monthlyVolume`, `message`).
- **Select Accessible Names:** Added `id="serviceInterest"` + `aria-label="Primary Service Needed"` and `id="monthlyVolume"` + `aria-label="Monthly Inbound Enquiries"`.
- **CTA Contrast:** Updated submit button to `text-[#111110] font-bold`.

### `src/components/FooterSection.tsx`
- **Component Memoization:** Wrapped in `React.memo`.
- **Responsive Logo:** Replaced logo import with `<picture>` using `/arenova-128.webp`.

### `src/components/BackgroundCanvas.tsx`
- **Elimination of Forced Reflows:** Cached `scrollableHeight` calculation so `document.documentElement.scrollHeight` is queried only on window resize rather than on every scroll tick.
- **RAF Throttling:** Debounced mousemove parallax calculation with `requestAnimationFrame` and boolean flag.
- **Deferred Initialization:** On mobile devices, Three.js initialization is deferred until user interaction or after the initial LCP render window.

### `src/three/SceneController.ts`
- **Adaptive Performance Tiers:** Implemented `detectPerformanceTier()` (`HIGH`, `MEDIUM`, `LOW`) based on hardware concurrency, device memory, touch/screen width, and reduced-motion preferences.
- **Medium Tier Optimizations:** Reduced ember particle count to 64, celestial dust to 40, capped device pixel ratio to 1.0, and throttled idle framerate to ~36fps when not actively scrolling.
- **High Tier Optimizations:** Streamlined desktop particle count to 200 (from 520) preventing CPU spikes.
- **Low Tier Fallback:** Gracefully disables WebGL initialization on constrained devices, letting the luxury CSS radial aura provide the aesthetic at 0 CPU overhead.

### `public/fonts/` (New Directory)
- Downloaded self-hosted Latin WOFF2 files:
  - `syne-bold.woff2` (33.8 kB)
  - `plus-jakarta-sans.woff2` (26.7 kB)

### `public/_headers` (New File)
- Added production HTTP cache-control policies for Cloudflare and static hosts:
  - 1-year immutable caching on `/assets/*` and `/fonts/*`.
  - 30-day caching on static images and icons.
  - Revalidation (`max-age=0, must-revalidate`) on `/index.html` and `/404.html`.

### `public/404.html`
- Converted Google Fonts requests to self-hosted `@font-face` rules. Removed unused preconnects.

### `public/metadata.png` & `public/metadata.webp`
- Resized 1.68 MB OpenGraph image to 1200x630. Created 86.6 kB `metadata.webp` and quantized 219 kB `metadata.png`.

### `public/arenova-128.webp`, `arenova-256.webp`, `arenova-128.png`, `arenova-256.png`
- Generated multi-density crisp responsive logo variants (2.8 kB to 7.6 kB).

### Asset Purge in `src/assets/`
- Deleted unused legacy template assets: `phoenix-feather.png` (1.15 MB), `hero.png` (13 kB), `react.svg`, `vite.svg`.
