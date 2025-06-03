import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
    host: true,
    hmr: {
      timeout: 5000,
      protocol: 'ws',
      port: 0, // Auto-detect available port
      overlay: true,
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'react-core': ['react', 'react-dom'],

          // Router
          'react-router': ['react-router-dom'],

          // Data layer
          'data-layer': ['@supabase/supabase-js', '@tanstack/react-query'],

          // UI components
          'ui-components': ['@radix-ui/react-slot', '@radix-ui/react-separator'],

          // Radix UI - Forms
          'radix-forms': [
            '@radix-ui/react-label',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-select',
            '@radix-ui/react-slider',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
          ],

          // Radix UI - Navigation
          'radix-navigation': [
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-menubar',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-context-menu',
          ],

          // Radix UI - Overlays
          'radix-overlays': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-popover',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-toast',
          ],

          // Radix UI - Misc
          'radix-misc': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-progress',
            '@radix-ui/react-scroll-area',
          ],

          // Animations
          'animations': ['framer-motion'],

          // Utilities
          'utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],

          // Notifications
          'notifications': ['sonner'],

          // Vendor misc
          'vendor-misc': ['date-fns', 'zod', 'uuid'],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js',
      '@tanstack/react-query',
    ],
  },
})