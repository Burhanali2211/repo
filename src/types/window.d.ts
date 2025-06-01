// Type declarations for custom window properties
interface Window {
  // React initialization tracking
  __REACT_INITIALIZED__?: boolean;
  __storeRealReactMethods?: () => void;
  __restoreRealReactMethods?: () => boolean;
  
  // Module registry
  __MODULE_REGISTRY__?: {
    modules: Record<string, boolean>;
    callbacks: Record<string, Array<() => void>>;
    registerModule: (name: string) => void;
    isModuleLoaded: (name: string) => boolean;
    onModuleLoaded: (name: string, callback: () => void) => void;
  };
  
  // React preloader
  reactPreloader?: {
    modules: Record<string, boolean>;
    ensureReact: () => void;
    onReactReady: (callback: () => void) => void;
  };
  
  // React globals
  React: any;
  ReactDOM: any;
}
