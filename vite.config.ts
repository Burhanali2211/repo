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
    // Enhanced optimizeDeps for better build performance and bundle splitting
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        // Pre-bundle heavy dependencies for better performance
        'framer-motion',
        '@supabase/supabase-js',
        '@tanstack/react-query',
        'lucide-react',
        'recharts'
      ],
      exclude: [
        // Exclude heavy components that should be lazy loaded
        '@/components/dashboard',
        '@/pages/Dashboard'
      ],
      // Force pre-bundling of React to ensure it's available
      force: true,
    },
    // Improve build performance
    build: {
      // Use modern target for better performance
      target: 'es2020',
      // Generate sourcemaps for easier debugging
      sourcemap: mode === 'development',
      // Optimize chunk size warning limit
      chunkSizeWarningLimit: 500,
      // Minify options for better compression
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
          pure_funcs: mode === 'production' ? ['console.log', 'console.info'] : [],
        },
        mangle: {
          safari10: true,
        },
      },
      // Copy additional files for hosting configuration
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html')
        },
        // Ensure proper external dependencies handling
        external: [],
        output: {
          // Enhanced chunk splitting for optimal performance
          manualChunks: (id) => {
            // React core and routing
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }

            // Supabase and data fetching
            if (id.includes('@supabase') || id.includes('@tanstack/react-query')) {
              return 'data-vendor';
            }

            // UI component libraries (Radix UI)
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }

            // Animation libraries
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }

            // Chart libraries
            if (id.includes('recharts')) {
              return 'chart-vendor';
            }

            // Form libraries
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
              return 'form-vendor';
            }

            // Icon libraries - split into smaller chunks
            if (id.includes('lucide-react')) {
              return 'icon-vendor';
            }

            // Utility libraries
            if (id.includes('class-variance-authority') || id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'utils-vendor';
            }

            // Dashboard components - separate chunk for admin functionality
            if (id.includes('/dashboard/') || id.includes('Dashboard')) {
              return 'dashboard';
            }

            // Large page components
            if (id.includes('/pages/') && (
              id.includes('Home') ||
              id.includes('Contact') ||
              id.includes('OurWork') ||
              id.includes('BlogPost')
            )) {
              return 'pages-heavy';
            }

            // Service pages
            if (id.includes('/pages/services/') || id.includes('ServiceDetail')) {
              return 'service-pages';
            }

            // Other vendor dependencies
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          // Better chunk naming with hash for caching
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        }
      }
    },
    // Ensure hosting configuration files are included in build
    publicDir: 'public'
  };
});
