import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  return {
    // Define mode in env for runtime checks
    define: {
      __APP_ENV__: JSON.stringify(mode),
      '__APP_VERSION__': JSON.stringify(process.env.npm_package_version || '1.0.0'),
    },
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
    // Ensure assets are served correctly - use relative paths for better compatibility
    base: './',
    plugins: [
      react(),
      mode === 'development' ? componentTagger() : null,
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Simplified optimizeDeps
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@supabase/supabase-js',
        '@tanstack/react-query'
      ],
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
          drop_console: isProd,
          drop_debugger: isProd,
        },
        mangle: {
          // Preserve function names for better error debugging in development
          keep_fnames: !isProd,
        },
      },
      // Ensure proper asset handling
      assetsDir: 'assets',
      assetsInlineLimit: 4096,
      // Copy additional files for hosting configuration
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html')
        },
        // Ensure proper external dependencies handling
        external: [],
        output: {
          // Prevent code splitting for critical functionality
          inlineDynamicImports: false,
          // Simplified chunk splitting
          manualChunks: (id) => {
            // React and related packages
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }

            // UI component libraries
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }

            // Data fetching libraries
            if (id.includes('@supabase') || id.includes('@tanstack/react-query')) {
              return 'data-vendor';
            }

            // Dashboard components
            if (id.includes('/dashboard/') || id.includes('Dashboard')) {
              return 'dashboard';
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
