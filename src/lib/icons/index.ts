/**
 * Optimized Icon Loading System
 *
 * This module provides lazy-loaded icons from lucide-react to dramatically reduce bundle size.
 * Icons are loaded on-demand and cached for performance.
 */

import React, { ComponentType, lazy, Suspense, memo } from 'react';

// Icon props interface
export interface IconProps {
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  onClick?: () => void;
}

// Icon loading cache
const iconCache = new Map<string, ComponentType<IconProps>>();

// Default icon placeholder
const IconPlaceholder: React.FC<IconProps> = ({ className = '', size = 24 }) => {
  return React.createElement('div', {
    className: `inline-block bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`,
    style: { width: size, height: size },
    'aria-hidden': 'true'
  });
};

// Loading icon component
const IconLoader: React.FC<IconProps> = ({ className = '', size = 24 }) => {
  return React.createElement('div', {
    className: `inline-block bg-gray-300 dark:bg-gray-600 rounded animate-pulse ${className}`,
    style: { width: size, height: size },
    'aria-hidden': 'true'
  });
};

/**
 * Creates a lazy-loaded icon component
 */
function createLazyIcon(iconName: string): ComponentType<IconProps> {
  // Check cache first
  if (iconCache.has(iconName)) {
    return iconCache.get(iconName)!;
  }

  // Create lazy component
  const LazyIcon = lazy(async () => {
    try {
      const module = await import('lucide-react');
      const IconComponent = (module as Record<string, ComponentType<IconProps>>)[iconName];

      if (!IconComponent) {
        console.warn(`Icon "${iconName}" not found in lucide-react`);
        return { default: IconPlaceholder };
      }

      return { default: IconComponent };
    } catch (error) {
      console.error(`Failed to load icon "${iconName}":`, error);
      return { default: IconPlaceholder };
    }
  });

  // Wrap with Suspense and memo for performance
  const WrappedIcon = memo<IconProps>((props) => {
    return React.createElement(Suspense, {
      fallback: React.createElement(IconLoader, props)
    }, React.createElement(LazyIcon, props));
  });

  WrappedIcon.displayName = `LazyIcon(${iconName})`;

  // Cache the component
  iconCache.set(iconName, WrappedIcon);

  return WrappedIcon;
}

/**
 * Hook for using lazy-loaded icons
 */
export function useIcon(iconName: string): ComponentType<IconProps> {
  return React.useMemo(() => createLazyIcon(iconName), [iconName]);
}

/**
 * Pre-defined commonly used icons for better performance
 * These are the most frequently used icons that should be loaded immediately
 */

// Navigation icons
export const ArrowRight = createLazyIcon('ArrowRight');
export const ArrowLeft = createLazyIcon('ArrowLeft');
export const ArrowUp = createLazyIcon('ArrowUp');
export const ChevronLeft = createLazyIcon('ChevronLeft');
export const ChevronRight = createLazyIcon('ChevronRight');
export const ChevronDown = createLazyIcon('ChevronDown');
export const ChevronUp = createLazyIcon('ChevronUp');
export const ExternalLink = createLazyIcon('ExternalLink');

// Common UI icons
export const Menu = createLazyIcon('Menu');
export const X = createLazyIcon('X');
export const Search = createLazyIcon('Search');
export const Star = createLazyIcon('Star');
export const Check = createLazyIcon('Check');
export const CheckCircle = createLazyIcon('CheckCircle');
export const Plus = createLazyIcon('Plus');
export const Minus = createLazyIcon('Minus');

// Business icons
export const Globe = createLazyIcon('Globe');
export const Code = createLazyIcon('Code');
export const Palette = createLazyIcon('Palette');
export const TrendingUp = createLazyIcon('TrendingUp');
export const Megaphone = createLazyIcon('Megaphone');
export const Shield = createLazyIcon('Shield');
export const Cloud = createLazyIcon('Cloud');
export const Smartphone = createLazyIcon('Smartphone');

// Industry icons
export const Building2 = createLazyIcon('Building2');
export const Users = createLazyIcon('Users');
export const GraduationCap = createLazyIcon('GraduationCap');
export const Leaf = createLazyIcon('Leaf');
export const Wrench = createLazyIcon('Wrench');

// Quality indicators
export const Award = createLazyIcon('Award');
export const Zap = createLazyIcon('Zap');
export const Sparkles = createLazyIcon('Sparkles');

/**
 * Icon component that loads icons dynamically
 */
export const Icon: React.FC<IconProps & { name: string }> = memo(({ name, ...props }) => {
  const IconComponent = useIcon(name);
  return React.createElement(IconComponent, props);
});

Icon.displayName = 'Icon';

/**
 * Preload commonly used icons for better performance
 */
export function preloadCommonIcons() {
  const commonIcons = [
    'ArrowRight', 'ArrowLeft', 'ChevronDown', 'Menu', 'X', 'Search',
    'Star', 'Check', 'CheckCircle', 'Globe', 'Code', 'Palette'
  ];

  commonIcons.forEach(iconName => {
    createLazyIcon(iconName);
  });
}

/**
 * Clear icon cache (useful for testing or memory management)
 */
export function clearIconCache() {
  iconCache.clear();
}

export default {
  useIcon,
  Icon,
  preloadCommonIcons,
  clearIconCache,
  // Export all pre-defined icons
  ArrowRight, ArrowLeft, ArrowUp, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ExternalLink,
  Menu, X, Search, Star, Check, CheckCircle, Plus, Minus,
  Globe, Code, Palette, TrendingUp, Megaphone, Shield, Cloud, Smartphone,
  Building2, Users, GraduationCap, Leaf, Wrench, Award, Zap, Sparkles
};
