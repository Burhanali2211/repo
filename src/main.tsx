import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/animations.css'

// Add error boundary for the entire application
const renderApp = () => {
    try {
        const rootElement = document.getElementById("root");
        if (!rootElement) {
            throw new Error("Root element not found");
        }

        const root = createRoot(rootElement);
        root.render(<App />);
    } catch (error) {
        console.error("Failed to render app:", error);
        // Fallback rendering
        const rootElement = document.getElementById("root");
        if (rootElement) {
            rootElement.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: system-ui, sans-serif;">
          <h1 style="color: #dc2626; margin-bottom: 16px;">Application Error</h1>
          <p style="color: #6b7280; margin-bottom: 24px;">There was an error loading the application.</p>
          <button onclick="window.location.reload()" style="background: #3b82f6; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
            Reload Page
          </button>
        </div>
      `;
        }
    }
};

// Add global error handlers
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// Render the app
renderApp();
