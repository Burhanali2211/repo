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
        // Improve connection reliability
        clientPort: 8080,
        // Avoid random disconnections
        overlay: true,
      },
      // Increase watch timeout to prevent disconnections
      watch: {
        usePolling: true,
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
        }
      }
    },
    // Ensure hosting configuration files are included in build
    publicDir: 'public'
  };
});
