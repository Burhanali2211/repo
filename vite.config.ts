import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      host: "::",
      port: 8080,
      // Improve WebSocket stability
      hmr: {
        // Increase timeout for WebSocket connections
        timeout: 5000,
        // Specify protocol to improve connection reliability
        protocol: 'ws',
        // Use port 0 to auto-detect available port for HMR
        port: 0,
        // Avoid random disconnections
        overlay: true,
      },
      // Increase watch timeout to prevent disconnections
      watch: {
        usePolling: false, // Disable polling for better performance
        interval: 1000,
      },
      // Configure CORS for external resources
      cors: true,
    },
    plugins: [
      react(),
      mode === 'development' ? componentTagger() : null,
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Add optimizeDeps to improve build reliability
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: [],
    },
    // Improve build performance
    build: {
      // Use minimum target for better compatibility
      target: 'es2015',
      // Generate sourcemaps for easier debugging
      sourcemap: mode === 'development',
      // Split chunks for better caching
      chunkSizeWarningLimit: 1000,
      // Copy additional files for hosting configuration
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html')
        },
        output: {
          // Improved code splitting
          manualChunks: {
            // Vendor chunks
            'react-vendor': ['react', 'react-dom'],
            'router-vendor': ['react-router-dom'],
            'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
            'animation-vendor': ['framer-motion'],
            'supabase-vendor': ['@supabase/supabase-js'],
            'query-vendor': ['@tanstack/react-query'],
            // Utility chunks
            'utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
            'icons': ['lucide-react'],
            'forms': ['react-hook-form', '@hookform/resolvers', 'zod']
          },
          // Better chunk naming
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop().replace('.tsx', '').replace('.ts', '') : 'chunk';
            return `assets/${facadeModuleId}-[hash].js`;
          }
        }
      }
    },
    // Ensure hosting configuration files are included in build
    publicDir: 'public'
  };
});
