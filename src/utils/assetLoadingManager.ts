/**
 * Asset Loading Manager
 * 
 * Comprehensive utility for managing asset loading in production environments
 * with fallback mechanisms and error recovery
 */

// Asset loading configuration
interface AssetConfig {
  retryAttempts: number;
  retryDelay: number;
  timeout: number;
  fallbackEnabled: boolean;
}

const DEFAULT_CONFIG: AssetConfig = {
  retryAttempts: 3,
  retryDelay: 1000,
  timeout: 10000,
  fallbackEnabled: true,
};

// Asset loading state management
class AssetLoadingManager {
  private config: AssetConfig;
  private loadingAttempts: Map<string, number> = new Map();
  private failedAssets: Set<string> = new Set();
  private loadedAssets: Set<string> = new Set();

  constructor(config: Partial<AssetConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.initializeErrorHandling();
  }

  /**
   * Initialize global error handling for asset loading
   */
  private initializeErrorHandling(): void {
    // Handle script loading errors
    window.addEventListener('error', (event) => {
      if (event.target && (event.target as any).tagName === 'SCRIPT') {
        const script = event.target as HTMLScriptElement;
        this.handleAssetLoadError(script.src, 'script');
      }
    });

    // Handle CSS loading errors
    window.addEventListener('error', (event) => {
      if (event.target && (event.target as any).tagName === 'LINK') {
        const link = event.target as HTMLLinkElement;
        if (link.rel === 'stylesheet') {
          this.handleAssetLoadError(link.href, 'stylesheet');
        }
      }
    });

    // Handle module loading errors
    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason && typeof event.reason === 'object') {
        const error = event.reason as any;
        if (error.message && error.message.includes('Failed to fetch')) {
          console.warn('Module loading failed, attempting recovery:', error);
          this.handleModuleLoadError(error);
        }
      }
    });
  }

  /**
   * Handle asset loading errors with retry mechanism
   */
  private async handleAssetLoadError(assetUrl: string, assetType: 'script' | 'stylesheet'): Promise<void> {
    const attempts = this.loadingAttempts.get(assetUrl) || 0;
    
    if (attempts < this.config.retryAttempts) {
      this.loadingAttempts.set(assetUrl, attempts + 1);
      
      console.warn(`Asset loading failed (attempt ${attempts + 1}/${this.config.retryAttempts}):`, assetUrl);
      
      // Wait before retry
      await this.delay(this.config.retryDelay * (attempts + 1));
      
      // Retry loading the asset
      try {
        await this.loadAsset(assetUrl, assetType);
      } catch (error) {
        console.error(`Retry failed for asset:`, assetUrl, error);
      }
    } else {
      this.failedAssets.add(assetUrl);
      console.error(`Asset loading failed permanently after ${this.config.retryAttempts} attempts:`, assetUrl);
      
      if (this.config.fallbackEnabled) {
        this.handleAssetFallback(assetUrl, assetType);
      }
    }
  }

  /**
   * Handle module loading errors (for dynamic imports)
   */
  private async handleModuleLoadError(error: any): Promise<void> {
    // Extract module path from error if possible
    const modulePath = this.extractModulePathFromError(error);
    
    if (modulePath) {
      console.warn('Attempting to recover from module loading error:', modulePath);
      
      // Try to reload the page as a last resort
      if (this.shouldReloadPage()) {
        this.reloadPageWithDelay();
      }
    }
  }

  /**
   * Load asset with timeout and error handling
   */
  private loadAsset(url: string, type: 'script' | 'stylesheet'): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Asset loading timeout: ${url}`));
      }, this.config.timeout);

      if (type === 'script') {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
          clearTimeout(timeout);
          this.loadedAssets.add(url);
          resolve();
        };
        script.onerror = () => {
          clearTimeout(timeout);
          reject(new Error(`Script loading failed: ${url}`));
        };
        document.head.appendChild(script);
      } else if (type === 'stylesheet') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = () => {
          clearTimeout(timeout);
          this.loadedAssets.add(url);
          resolve();
        };
        link.onerror = () => {
          clearTimeout(timeout);
          reject(new Error(`Stylesheet loading failed: ${url}`));
        };
        document.head.appendChild(link);
      }
    });
  }

  /**
   * Handle fallback for failed assets
   */
  private handleAssetFallback(assetUrl: string, assetType: 'script' | 'stylesheet'): void {
    console.warn(`Implementing fallback for failed asset:`, assetUrl);
    
    // For critical assets, try alternative CDN or local fallback
    if (assetUrl.includes('data-layer') || assetUrl.includes('react-core')) {
      this.implementCriticalAssetFallback(assetUrl);
    }
  }

  /**
   * Implement fallback for critical assets
   */
  private implementCriticalAssetFallback(assetUrl: string): void {
    // Show user-friendly error message for critical asset failures
    const errorMessage = document.createElement('div');
    errorMessage.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fee;
        border: 2px solid #f00;
        padding: 20px;
        border-radius: 8px;
        z-index: 10000;
        font-family: Arial, sans-serif;
        text-align: center;
        max-width: 400px;
      ">
        <h3 style="margin: 0 0 10px 0; color: #c00;">Loading Error</h3>
        <p style="margin: 0 0 15px 0;">Some resources failed to load. Please refresh the page.</p>
        <button onclick="window.location.reload()" style="
          background: #007cba;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        ">Refresh Page</button>
      </div>
    `;
    document.body.appendChild(errorMessage);
  }

  /**
   * Extract module path from error object
   */
  private extractModulePathFromError(error: any): string | null {
    if (error.stack) {
      const match = error.stack.match(/\/assets\/[^)]+\.js/);
      return match ? match[0] : null;
    }
    return null;
  }

  /**
   * Check if page should be reloaded
   */
  private shouldReloadPage(): boolean {
    const reloadKey = 'asset-loading-reload-count';
    const reloadCount = parseInt(sessionStorage.getItem(reloadKey) || '0');
    
    if (reloadCount < 2) {
      sessionStorage.setItem(reloadKey, (reloadCount + 1).toString());
      return true;
    }
    
    return false;
  }

  /**
   * Reload page with delay
   */
  private reloadPageWithDelay(): void {
    console.warn('Reloading page due to asset loading failures...');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get loading statistics
   */
  public getStats(): {
    loaded: number;
    failed: number;
    failedAssets: string[];
  } {
    return {
      loaded: this.loadedAssets.size,
      failed: this.failedAssets.size,
      failedAssets: Array.from(this.failedAssets),
    };
  }

  /**
   * Preload critical assets
   */
  public async preloadCriticalAssets(): Promise<void> {
    const criticalAssets = [
      '/assets/react-core-5r9A1-Sy.js',
      '/assets/data-layer-C7ZUTe9p.js',
      '/assets/main-ByvOuAZZ.css',
    ];

    const preloadPromises = criticalAssets.map(asset => {
      return this.preloadAsset(asset);
    });

    try {
      await Promise.allSettled(preloadPromises);
    } catch (error) {
      console.warn('Some critical assets failed to preload:', error);
    }
  }

  /**
   * Preload individual asset
   */
  private preloadAsset(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = url;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Preload failed: ${url}`));
      document.head.appendChild(link);
    });
  }
}

// Create singleton instance
export const assetLoadingManager = new AssetLoadingManager();

// Initialize on module load
if (typeof window !== 'undefined') {
  // Preload critical assets
  assetLoadingManager.preloadCriticalAssets().catch(error => {
    console.warn('Critical asset preloading failed:', error);
  });
}

export default AssetLoadingManager;
