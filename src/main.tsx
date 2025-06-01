// Import React first to ensure it's available globally
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/animations.css'

// Ensure React is available globally
if (typeof window !== 'undefined') {
    (window as any).React = React;
    (globalThis as any).React = React;
}

// Simple app rendering
const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Root element not found");
}

const root = createRoot(rootElement);
root.render(<App />);
