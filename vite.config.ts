import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    plugins: [
      react(),
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
        input: {
          main: resolve(import.meta.dirname, 'index.html'),
          pricing: resolve(import.meta.dirname, 'pricing/index.html'),
          about: resolve(import.meta.dirname, 'about/index.html'),
          aiAutomation: resolve(import.meta.dirname, 'services/ai-automation/index.html'),
          aiAgents: resolve(import.meta.dirname, 'services/ai-agents/index.html'),
          bpa: resolve(import.meta.dirname, 'services/business-process-automation/index.html'),
          aiWorkflow: resolve(import.meta.dirname, 'services/ai-workflow-automation/index.html'),
          crmAutomation: resolve(import.meta.dirname, 'services/crm-automation/index.html'),
          customAi: resolve(import.meta.dirname, 'services/custom-ai-development/index.html'),
          aiChatbot: resolve(import.meta.dirname, 'services/ai-chatbot-development/index.html'),
          aiVoiceAgents: resolve(import.meta.dirname, 'services/ai-voice-agents/index.html'),
          whatsappAutomation: resolve(import.meta.dirname, 'services/whatsapp-automation/index.html'),
          aiCustomerSupport: resolve(import.meta.dirname, 'services/ai-customer-support/index.html'),
          aiSalesAutomation: resolve(import.meta.dirname, 'services/ai-sales-automation/index.html'),
          realEstate: resolve(import.meta.dirname, 'industries/real-estate/index.html'),
          b2bServices: resolve(import.meta.dirname, 'industries/b2b-services/index.html'),
          healthcare: resolve(import.meta.dirname, 'industries/healthcare/index.html'),
          recruitment: resolve(import.meta.dirname, 'industries/recruitment/index.html'),
          marketingAgencies: resolve(import.meta.dirname, 'industries/marketing-agencies/index.html'),
          saas: resolve(import.meta.dirname, 'industries/saas/index.html'),
          roiCalculator: resolve(import.meta.dirname, 'tools/automation-roi-calculator/index.html'),
          blog: resolve(import.meta.dirname, 'blog/index.html'),
          blogPlaybook: resolve(import.meta.dirname, 'blog/deterministic-ai-playbook/index.html'),
          blogAgentsVsBots: resolve(import.meta.dirname, 'blog/ai-agents-vs-chatbots/index.html'),
          blogRoi: resolve(import.meta.dirname, 'blog/calculating-automation-roi/index.html'),
        },
        output: {
          manualChunks(id: string) {
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
