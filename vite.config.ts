import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'arenova-seo-transform',
        transformIndexHtml(html) {
          let modified = html;
          // Inject Google Search Console verification meta tag if configured
          if (env.VITE_GSC_VERIFICATION) {
            const verificationTag = `    <meta name="google-site-verification" content="${env.VITE_GSC_VERIFICATION}" />\n`;
            modified = modified.replace('</head>', `${verificationTag}</head>`);
          }
          return modified;
        },
      },
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/three/')) {
              return 'vendor-three';
            }
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor-react';
            }
          },
        },
      },
    },
    preview: {
      host: true,
      port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4173,
      allowedHosts: true,
    },
  };
});
