/**
 * Accessibility utilities for EasyIo.tech
 * Includes ARIA helpers, keyboard navigation, and screen reader support
 */

import { useEffect, useRef } from 'react';

/**
 * Generate unique IDs for ARIA attributes
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Hook for managing focus trap in modals/dialogs
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Trigger close action - this should be handled by parent component
        container.dispatchEvent(new CustomEvent('escape-pressed'));
      }
    };

    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('keydown', handleEscapeKey);
    
    // Focus first element when trap becomes active
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isActive]);

  return containerRef;
}

/**
 * Hook for managing skip links
 */
export function useSkipLink() {
  useEffect(() => {
    const skipLink = document.querySelector('[data-skip-link]') as HTMLElement;
    if (!skipLink) return;

    const handleSkipLinkClick = (e: Event) => {
      e.preventDefault();
      const target = skipLink.getAttribute('href');
      if (target) {
        const targetElement = document.querySelector(target) as HTMLElement;
        if (targetElement) {
          targetElement.focus();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    skipLink.addEventListener('click', handleSkipLinkClick);
    return () => skipLink.removeEventListener('click', handleSkipLinkClick);
  }, []);
}

/**
 * Hook for announcing content changes to screen readers
 */
export function useScreenReaderAnnouncement() {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return announce;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers high contrast
 */
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Keyboard navigation helpers
 */
export const keyboardNavigation = {
  /**
   * Handle arrow key navigation in lists/grids
   */
  handleArrowKeys: (
    e: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    orientation: 'horizontal' | 'vertical' | 'grid' = 'vertical'
  ) => {
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowUp':
        if (orientation === 'vertical' || orientation === 'grid') {
          newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          e.preventDefault();
        }
        break;
      case 'ArrowDown':
        if (orientation === 'vertical' || orientation === 'grid') {
          newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          e.preventDefault();
        }
        break;
      case 'ArrowLeft':
        if (orientation === 'horizontal' || orientation === 'grid') {
          newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          e.preventDefault();
        }
        break;
      case 'ArrowRight':
        if (orientation === 'horizontal' || orientation === 'grid') {
          newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          e.preventDefault();
        }
        break;
      case 'Home':
        newIndex = 0;
        e.preventDefault();
        break;
      case 'End':
        newIndex = items.length - 1;
        e.preventDefault();
        break;
    }

    if (newIndex !== currentIndex) {
      items[newIndex]?.focus();
      return newIndex;
    }
    return currentIndex;
  },

  /**
   * Handle Enter and Space key activation
   */
  handleActivation: (e: KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  }
};

/**
 * ARIA helpers
 */
export const aria = {
  /**
   * Create ARIA label for complex elements
   */
  createLabel: (text: string, element?: string) => {
    return element ? `${text} ${element}` : text;
  },

  /**
   * Create ARIA description for additional context
   */
  createDescription: (description: string, instructions?: string) => {
    return instructions ? `${description}. ${instructions}` : description;
  },

  /**
   * Generate ARIA attributes for expandable content
   */
  expandable: (isExpanded: boolean, controlsId?: string) => ({
    'aria-expanded': isExpanded,
    ...(controlsId && { 'aria-controls': controlsId })
  }),

  /**
   * Generate ARIA attributes for selected items
   */
  selectable: (isSelected: boolean) => ({
    'aria-selected': isSelected,
    role: 'option'
  })
};

/**
 * Color contrast utilities
 */
export const colorContrast = {
  /**
   * Calculate relative luminance
   */
  getLuminance: (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  /**
   * Calculate contrast ratio between two colors
   */
  getContrastRatio: (color1: [number, number, number], color2: [number, number, number]): number => {
    const lum1 = colorContrast.getLuminance(...color1);
    const lum2 = colorContrast.getLuminance(...color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  },

  /**
   * Check if contrast ratio meets WCAG standards
   */
  meetsWCAG: (ratio: number, level: 'AA' | 'AAA' = 'AA'): boolean => {
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  }
};
